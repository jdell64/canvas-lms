# frozen_string_literal: true

#
# Copyright (C) 2012 - present Instructure, Inc.
#
# This file is part of Canvas.
#
# Canvas is free software: you can redistribute it and/or modify it under
# the terms of the GNU Affero General Public License as published by the Free
# Software Foundation, version 3 of the License.
#
# Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
# A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
# details.
#
# You should have received a copy of the GNU Affero General Public License along
# with this program. If not, see <http://www.gnu.org/licenses/>.
#

describe ContentMigration do
  before :once do
    course_with_teacher
    @cm = ContentMigration.create!(context: @course, user: @teacher)
  end

  describe "#trigger_live_events!" do
    subject do
      content_migration.instance_variable_set(:@imported_migration_items_hash, migration_items)
      content_migration
    end

    let(:content_migration) do
      ContentMigration.create!(
        context: destination,
        workflow_state: workflow_state,
        user: user,
        migration_type: "course_copy_importer",
        source_course: context
      )
    end
    let(:user) do
      teacher_in_course(course: context)
      @teacher
    end
    let(:context) { course_model }
    let(:destination) { course_model }
    let(:workflow_state) { "started" }
    let(:migration_items) { {} }

    before do
      allow(Canvas::LiveEventsCallbacks).to receive(:after_update).and_return(true)
      allow(Canvas::LiveEventsCallbacks).to receive(:after_create).and_return(true)
    end

    context "when the class is not observed by live events observer" do
      let(:migration_items) do
        {
          "ContextExternalTool" => {
            SecureRandom.uuid => external_tool
          }
        }
      end
      let(:external_tool) do
        ContextExternalTool.create!(
          context: context,
          url: "https://www.test.com",
          name: "test tool",
          shared_secret: "secret",
          consumer_key: "key"
        )
      end

      it "does not trigger an event" do
        expect(Canvas::LiveEventsCallbacks).not_to receive(:after_create).with(external_tool)
        expect(Canvas::LiveEventsCallbacks).not_to receive(:after_update).with(external_tool)
        subject.trigger_live_events!
      end
    end

    context "when an item is created after the started_at time" do
      let(:start_time) { Time.zone.now }
      let(:assignment) { Assignment.create(course: context, name: "Test Assignment") }
      let(:migration_items) do
        {
          "Assignment" => {
            SecureRandom.uuid => assignment
          }
        }
      end

      before do
        content_migration.update!(started_at: start_time)
        migration_items
      end

      it 'triggers a "created" event' do
        expect(Canvas::LiveEventsCallbacks).to receive(:after_create).with(assignment)
        expect(Canvas::LiveEventsCallbacks).not_to receive(:after_update).with(assignment)
        subject.trigger_live_events!
      end
    end

    context "when an item was created before the started_at time" do
      let(:assignment) { Assignment.create(course: context, name: "Test Assignment") }
      let(:migration_items) do
        {
          "Assignment" => {
            SecureRandom.uuid => assignment
          }
        }
      end

      before do
        migration_items
        content_migration.update!(started_at: assignment.created_at + 10.seconds)
      end

      it 'triggers an "updated" event' do
        expect(Canvas::LiveEventsCallbacks).not_to receive(:after_create).with(assignment)
        expect(Canvas::LiveEventsCallbacks).to receive(:after_update).with(assignment, anything)
        subject.trigger_live_events!
      end
    end
  end

  describe "#prepare_data" do
    it "strips invalid utf8" do
      data = {
        "assessment_questions" => [{
          "question_name" => +"hai\xfbabcd"
        }]
      }
      expect(ContentMigration.new.prepare_data(data)[:assessment_questions][0][:question_name]).to eq "haiabcd"
    end
  end

  context "import_object?" do
    it "returns true for everything if there are no copy options" do
      expect(@cm.import_object?("content_migrations", CC::CCHelper.create_key(@cm))).to eq true
    end

    it "returns true for everything if 'everything' is selected" do
      @cm.migration_ids_to_import = { copy: { everything: "1" } }
      expect(@cm.import_object?("content_migrations", CC::CCHelper.create_key(@cm))).to eq true
    end

    it "returns true if there are no copy options" do
      @cm.migration_ids_to_import = { copy: {} }
      expect(@cm.import_object?("content_migrations", CC::CCHelper.create_key(@cm))).to eq true
    end

    it "returns false for nil objects" do
      expect(@cm.import_object?("content_migrations", nil)).to eq false
    end

    it "returns true for all object types if the all_ option is true" do
      @cm.migration_ids_to_import = { copy: { all_content_migrations: "1" } }
      expect(@cm.import_object?("content_migrations", CC::CCHelper.create_key(@cm))).to eq true
    end

    it "returns false for objects not selected" do
      @cm.save!
      @cm.migration_ids_to_import = { copy: { all_content_migrations: "0" } }
      expect(@cm.import_object?("content_migrations", CC::CCHelper.create_key(@cm))).to eq false
      @cm.migration_ids_to_import = { copy: { content_migrations: {} } }
      expect(@cm.import_object?("content_migrations", CC::CCHelper.create_key(@cm))).to eq false
      @cm.migration_ids_to_import = { copy: { content_migrations: { CC::CCHelper.create_key(@cm) => "0" } } }
      expect(@cm.import_object?("content_migrations", CC::CCHelper.create_key(@cm))).to eq false
    end

    it "returns true for selected objects" do
      @cm.save!
      @cm.migration_ids_to_import = { copy: { content_migrations: { CC::CCHelper.create_key(@cm) => "1" } } }
      expect(@cm.import_object?("content_migrations", CC::CCHelper.create_key(@cm))).to eq true
    end
  end

  it "excludes user-hidden migration plugins" do
    ab = Canvas::Plugin.find(:academic_benchmark_importer)
    expect(ContentMigration.migration_plugins(true)).not_to include(ab)
  end

  context "zip file import" do
    def setup_zip_import(context, filename = "file.zip", import_immediately: false)
      zip_path = File.join(File.dirname(__FILE__) + "/../fixtures/migration/#{filename}")
      cm = ContentMigration.new(context: context, user: @user)
      cm.migration_type = "zip_file_importer"
      cm.migration_settings[:folder_id] = Folder.root_folders(context).first.id
      cm.migration_settings["import_immediately"] = import_immediately
      cm.save!

      attachment = Attachment.new
      attachment.context = cm
      attachment.uploaded_data = File.open(zip_path, "rb")
      attachment.filename = filename
      attachment.save!

      cm.attachment = attachment
      cm.save!

      cm.queue_migration
      cm
    end

    def test_zip_import(context, content_migration, filecount = 1)
      run_jobs
      expect(content_migration.reload).to be_imported
      expect(context.reload.attachments.count).to eq filecount
    end

    it "imports into a course" do
      cm = setup_zip_import(@course)
      expect(cm.root_account).to eq @course.root_account
      test_zip_import(@course, cm)
    end

    it "records the job id" do
      allow(Delayed::Worker).to receive(:current_job).and_return(double("Delayed::Job", id: 123))
      cm = setup_zip_import(@course)
      test_zip_import(@course, cm)
      expect(cm.reload.migration_settings[:job_ids]).to eq([123])
    end

    it "goes through instfs if enabled" do
      cm = setup_zip_import(@course)
      allow(InstFS).to receive(:enabled?).and_return(true)
      @uuid = "1234-abcd"
      allow(InstFS).to receive(:direct_upload).and_return(@uuid)

      test_zip_import(@course, cm)
      attachment = @course.attachments.last
      expect(attachment.instfs_uuid).to eq(@uuid)
    end

    it "imports into a user" do
      cm = setup_zip_import(@user)
      expect(cm.root_account_id).to eq 0
      test_zip_import(@user, cm)
    end

    it "imports into a group" do
      group_with_user
      cm = setup_zip_import(@group)
      expect(cm.root_account).to eq @group.root_account
      test_zip_import(@group, cm)
    end

    it "does not expand the mac system folder" do
      cm = setup_zip_import(@course, "macfile.zip")
      test_zip_import(@course, cm, 4)
      expect(@course.folders.pluck(:name)).to_not include("__MACOSX")
    end

    it "updates unzip progress often" do
      cm = setup_zip_import(@course, "macfile.zip")
      expect_any_instantiation_of(cm).to receive(:update_import_progress).exactly(6).times
      run_jobs
    end

    it "updates unzip progress often with fast import" do
      cm = setup_zip_import(@course, "macfile.zip", import_immediately: true)
      expect_any_instantiation_of(cm).to receive(:update_import_progress).exactly(6).times
      run_jobs
    end
  end

  it "uses url for migration file" do
    cm = @cm
    cm.migration_type = "zip_file_importer"
    cm.migration_settings[:folder_id] = Folder.root_folders(@course).first.id
    # the double below should prevent it from actually hitting the url
    cm.migration_settings[:file_url] = "http://localhost:3000/file.zip"
    cm.save!

    expect_any_instance_of(Attachment).to receive(:clone_url).with(cm.migration_settings[:file_url], false, true, quota_context: cm.context)

    cm.queue_migration
    worker = CC::Importer::CCWorker.new
    worker.perform(cm)
  end

  context "copying only some content" do
    let(:content_migration) do
      ContentMigration.create(context: destination_course, user: user_model, source_course: course,
                              migration_type: "course_copy_importer", copy_options: copy_options,
                              migration_settings: {
                                import_immediately: true,
                                migration_ids_to_import: {
                                  copy: copy_options
                                }
                              })
    end
    let(:course) { course_model }
    let(:destination_course) { course_model }

    shared_examples_for "a migration that automatically copies over tools" do |num_tools_copied: 1|
      it "copies over tools without issues" do
        content_migration.queue_migration
        expect { run_jobs }.to change { destination_course.context_external_tools.count }.by(num_tools_copied)
        expect(content_migration.migration_issues.count).to be(0)
      end
    end

    shared_examples_for "a migration that doesn't copy any tools" do
      it "doesn't copy any tools" do
        content_migration.queue_migration
        expect { run_jobs }.not_to change { destination_course.context_external_tools.count }
      end
    end

    context "and we're copying an assignment that uses an LTI tool" do
      let(:copy_options) do
        ContentMigration.process_copy_params({ "assignments" => [assignment.id] },
                                             global_identifiers: true,
                                             for_content_export: true)
      end
      let(:dev_key) { DeveloperKey.create! }
      let(:tool) do
        # ContentMigrations change things that were nil to their default values,
        # like an empty array or hash. This changes the identity hash, so we
        # have to make everything *exactly* the same, very explicitly >:(
        tool = external_tool_1_3_model(context: course,
                                       opts: {
                                         settings: { vendor_extensions: [], custom_fields: {},
                                                     client_id: dev_key.global_id.to_s },
                                         developer_key: dev_key,
                                         name: "first tool"
                                       })
        tool.update!(description: "")
        tool
      end
      let(:assignment) do
        assignment_model({ course: course,
                           submission_types: "external_tool",
                           external_tool_tag_attributes: { content: tool, url: tool.url } })
      end

      it_behaves_like "a migration that automatically copies over tools"

      context "the tool uses custom params" do
        let(:custom_params) { { "custom" => "params" } }
        let(:assignment) do
          a = super()
          a.primary_resource_link.update!(custom: custom_params)
          a
        end

        it "copies them over" do
          content_migration.queue_migration
          run_jobs
          expect(destination_course.assignments.last.primary_resource_link.custom).to eq(custom_params)
        end
      end

      context "but the destination course already has an identical tool installed" do
        before do
          dup = tool.dup
          dup.context = destination_course
          dup.save!
        end

        it_behaves_like "a migration that doesn't copy any tools"
      end

      context "and the destination course has a similar tool installed" do
        let(:other_tool) do
          external_tool_1_3_model(context: destination_course,
                                  opts: {
                                    settings: { icon_url: "icon.com", other_setting: "foobar" },
                                    developer_key: dev_key,
                                    name: "other tool"
                                  })
        end

        it_behaves_like "a migration that automatically copies over tools"

        it "doesn't change the existing tool" do
          other_tool
          content_migration.queue_migration
          expect { run_jobs }.not_to change { other_tool.reload.settings }
        end
      end
    end

    context "we're copying multiple assignments" do
      let(:assignments) do
        assignments = []
        3.times do
          assignments << assignment_model({ course: course })
        end
        assignments
      end
      let(:copy_options) do
        ContentMigration.process_copy_params({ "assignments" => assignments.map { |a| a.id.to_i } },
                                             global_identifiers: true,
                                             for_content_export: true)
      end

      it_behaves_like "a migration that doesn't copy any tools"

      context "that all use an LTI tool" do
        let(:assignments) do
          assignments = []
          3.times do |i|
            dev_key = DeveloperKey.create!
            tool = external_tool_1_3_model(context: course,
                                           opts: {
                                             developer_key: dev_key,
                                             name: "tool #{i}"
                                           })
            assignments << assignment_model({ course: course,
                                              submission_types: "external_tool",
                                              external_tool_tag_attributes: { content: tool, url: tool.url } })
          end
          assignments
        end

        it_behaves_like "a migration that automatically copies over tools", num_tools_copied: 3
      end
    end
  end

  context "account-level import" do
    it "imports question banks from qti migrations" do
      skip unless Qti.qti_enabled?

      account = Account.create!(name: "account")
      account.account_users.create!(user: @user)
      cm = ContentMigration.new(context: account, user: @user)
      cm.migration_type = "qti_converter"
      cm.migration_settings["import_immediately"] = true
      qb_name = "Import Unfiled Questions Into Me"
      cm.migration_settings["question_bank_name"] = qb_name
      cm.save!
      expect(cm.root_account_id).to eq account.id

      package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/cc_default_qb_test.zip")
      attachment = Attachment.new
      attachment.context = cm
      attachment.uploaded_data = File.open(package_path, "rb")
      attachment.filename = "file.zip"
      attachment.save!

      cm.attachment = attachment
      cm.save!

      cm.queue_migration
      run_jobs

      expect(cm.migration_issues).to be_empty

      expect(account.assessment_question_banks.count).to eq 1
      bank = account.assessment_question_banks.first
      expect(bank.title).to eq qb_name

      expect(bank.assessment_questions.count).to eq 1
    end

    it "imports questions from quizzes into question banks" do
      skip unless Qti.qti_enabled?

      account = Account.create!(name: "account")
      account.account_users.create!(user: @user)
      cm = ContentMigration.new(context: account, user: @user)
      cm.migration_type = "qti_converter"
      cm.migration_settings["import_immediately"] = true
      cm.save!

      package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/quiz_qti.zip")
      attachment = Attachment.new
      attachment.context = cm
      attachment.uploaded_data = File.open(package_path, "rb")
      attachment.filename = "file.zip"
      attachment.save!

      cm.attachment = attachment
      cm.save!

      cm.queue_migration
      run_jobs

      expect(cm.migration_issues).to be_empty

      expect(account.assessment_question_banks.count).to eq 1
      bank = account.assessment_question_banks.first
      expect(bank.title).to eq "Unnamed Quiz"

      expect(bank.assessment_questions.count).to eq 1
    end

    it "does not re-use the question_bank without overwrite_quizzes" do
      skip unless Qti.qti_enabled?

      account = Account.create!(name: "account")
      account.account_users.create!(user: @user)
      cm = ContentMigration.new(context: account, user: @user)
      cm.migration_type = "qti_converter"
      cm.migration_settings["import_immediately"] = true
      cm.save!

      package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/quiz_qti.zip")
      attachment = Attachment.new
      attachment.context = cm
      attachment.uploaded_data = File.open(package_path, "rb")
      attachment.filename = "file.zip"
      attachment.save!

      cm.attachment = attachment
      cm.save!

      cm.queue_migration
      run_jobs

      # run again
      cm.queue_migration
      run_jobs

      expect(cm.migration_issues).to be_empty

      expect(account.assessment_question_banks.count).to eq 2
      account.assessment_question_banks.each do |bank|
        expect(bank.title).to eq "Unnamed Quiz"
        expect(bank.assessment_questions.count).to eq 1
      end
    end

    it "re-uses the question_bank (and everything else) with overwrite_quizzes" do
      skip unless Qti.qti_enabled?

      account = Account.create!(name: "account")
      account.account_users.create!(user: @user)
      cm = ContentMigration.new(context: account, user: @user)
      cm.migration_type = "qti_converter"
      cm.migration_settings["import_immediately"] = true

      # having this set used to always prepend the id, and it would get set it there were any other imported quizzes/questions
      cm.migration_settings["id_prepender"] = "thisusedtobreakstuff"
      cm.save!

      package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/quiz_qti.zip")
      attachment = Attachment.new
      attachment.context = cm
      attachment.uploaded_data = File.open(package_path, "rb")
      attachment.filename = "file.zip"
      attachment.save!

      cm.attachment = attachment
      cm.save!

      cm.queue_migration
      run_jobs

      cm.migration_settings["overwrite_quizzes"] = true
      cm.migration_settings["id_prepender"] = "somethingelse"
      cm.save!
      # run again
      cm.queue_migration
      run_jobs

      expect(cm.migration_issues).to be_empty

      expect(account.assessment_question_banks.count).to eq 1
      bank = account.assessment_question_banks.first
      expect(bank.title).to eq "Unnamed Quiz"

      expect(bank.assessment_questions.count).to eq 1
    end
  end

  it "does not overwrite deleted quizzes unless overwrite_quizzes is true" do
    skip unless Qti.qti_enabled?

    cm = @cm
    cm.migration_type = "qti_converter"
    cm.migration_settings["import_immediately"] = true

    # having this set used to always prepend the id, and it would get set it there were any other imported quizzes/questions
    cm.migration_settings["id_prepender"] = "thisusedtobreakstuff"
    cm.save!

    package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/quiz_qti.zip")
    attachment = Attachment.new
    attachment.context = cm
    attachment.uploaded_data = File.open(package_path, "rb")
    attachment.filename = "file.zip"
    attachment.save!

    cm.attachment = attachment
    cm.save!

    cm.queue_migration
    run_jobs

    expect(@course.quizzes.count).to eq 1
    orig_quiz = @course.quizzes.first
    qq = orig_quiz.quiz_questions.first
    qq.question_data[:question_text] = "boooring"
    qq.save!
    orig_quiz.destroy

    cm.migration_settings["id_prepender"] = "somethingelse"
    cm.save!
    # run again, should create a new quiz
    cm.queue_migration
    run_jobs

    @course.reload
    expect(@course.quizzes.count).to eq 2
    expect(@course.quizzes.active.count).to eq 1

    new_quiz = @course.quizzes.active.first

    cm.migration_settings["overwrite_quizzes"] = true
    cm.migration_settings["id_prepender"] = "somethingelse_again"
    cm.save!
    # run again, but this time restore the deleted quiz
    cm.queue_migration
    run_jobs

    @course.reload
    expect(@course.quizzes.count).to eq 2
    expect(@course.quizzes.active.count).to eq 2

    orig_quiz.reload
    # should overwrite the old quiz question data
    expect(orig_quiz.quiz_questions.first.question_data[:question_text]).to eq(
      new_quiz.quiz_questions.first.question_data[:question_text]
    )
  end

  it "selectively imports quizzes when id_prepender is in use" do
    skip unless Qti.qti_enabled?

    cm = @cm
    cm.migration_type = "qti_converter"
    cm.migration_settings["import_immediately"] = true
    cm.save!

    package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/quiz_qti.zip")
    attachment = Attachment.new
    attachment.context = cm
    attachment.uploaded_data = File.open(package_path, "rb")
    attachment.filename = "file.zip"
    attachment.save!

    cm.attachment = attachment
    cm.save!

    cm.queue_migration
    run_jobs

    expect(@course.quizzes.count).to eq 1
    teh_quiz = @course.quizzes.first
    teh_quiz.destroy!

    cm.migration_settings["id_prepender"] = "blah!"
    cm.migration_settings["migration_ids_to_import"] = { "copy" => { "quizzes" => { teh_quiz.migration_id => "1" } } }
    cm.save!
    cm.queue_migration
    run_jobs
    expect(@course.quizzes.active.find_by(migration_id: "blah!_#{teh_quiz.migration_id}")).not_to be_nil
  end

  it "escapes html in plain text nodes into qti" do
    skip unless Qti.qti_enabled?

    cm = @cm
    cm.migration_type = "qti_converter"
    cm.migration_settings["import_immediately"] = true
    cm.save!

    package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/plaintext_qti.zip")
    attachment = Attachment.create!(context: cm, uploaded_data: File.open(package_path, "rb"), filename: "file.zip")
    cm.attachment = attachment
    cm.save!

    cm.queue_migration
    run_jobs

    html_text = @course.quiz_questions.where(migration_id: "5eb2ac5ba1c19_100").first.question_data[:question_text]
    expect(html_text).to eq "This is <b>Bold</b>"
    plain_text = @course.quiz_questions.where(migration_id: "5eb2ac5ba1c19_104").first.question_data[:question_text]
    expect(plain_text).to eq "This is &lt;b&gt;Bold&lt;/b&gt;"
  end

  it "identifies and import compressed tarball archives" do
    skip unless Qti.qti_enabled?

    cm = @cm
    cm.migration_type = "qti_converter"
    cm.migration_settings["import_immediately"] = true
    cm.save!

    package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/cc_default_qb_test.tar.gz")
    attachment = Attachment.new
    attachment.context = cm
    attachment.uploaded_data = File.open(package_path, "rb")
    attachment.filename = "file.zip"
    attachment.save!

    cm.attachment = attachment
    cm.save!

    cm.queue_migration
    run_jobs

    expect(cm.migration_issues).to be_empty

    expect(@course.assessment_question_banks.count).to eq 1
  end

  it "tries to handle utf-16 encoding errors" do
    cm = @cm
    cm.migration_type = "canvas_cartridge_importer"
    cm.migration_settings["import_immediately"] = true
    cm.save!

    package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/canvas_cc_utf16_error.zip")
    attachment = Attachment.new
    attachment.context = cm
    attachment.uploaded_data = File.open(package_path, "rb")
    attachment.filename = "file.zip"
    attachment.save!

    cm.attachment = attachment
    cm.save!

    cm.queue_migration
    run_jobs

    expect(cm.migration_issues).to be_empty
  end

  it "correclties handle media comment resolution in quizzes" do
    skip "Requires QtiMigrationTool" unless Qti.qti_enabled?

    cm = @cm
    cm.migration_type = "canvas_cartridge_importer"
    cm.migration_settings["import_immediately"] = true
    cm.save!

    package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/canvas_quiz_media_comment.zip")
    attachment = Attachment.new
    attachment.context = cm
    attachment.uploaded_data = File.open(package_path, "rb")
    attachment.filename = "file.zip"
    attachment.save!

    cm.attachment = attachment
    cm.save!

    cm.queue_migration
    run_jobs

    expect(cm.migration_issues).to be_empty
    quiz = @course.quizzes.available.first
    expect(quiz.quiz_data).to be_present
    expect(quiz.quiz_data.to_yaml).to include("/media_objects/m-5U5Jww6HL7zG35CgyaYGyA5bhzsremxY")

    qq = quiz.quiz_questions.first
    expect(qq.question_data).to be_present
    expect(qq.question_data.to_yaml).to include("/media_objects/m-5U5Jww6HL7zG35CgyaYGyA5bhzsremxY")
  end

  context "migrations with skip_job_progress enabled" do
    before :once do
      @account = Account.create!(name: "account")
    end

    def create_ab_cm
      cm = ContentMigration.new(context: @account)
      cm.migration_settings[:migration_type] = "academic_benchmark_importer"
      cm.migration_settings[:import_immediately] = true
      cm.migration_settings[:no_archive_file] = true
      cm.migration_settings[:skip_import_notification] = true
      cm.migration_settings[:skip_job_progress] = true
      cm.save!
      cm
    end

    it "does not throw an error when checking if blocked by current migration" do
      cm = create_ab_cm
      cm.queue_migration
      cm = create_ab_cm
      expect(cm).to be_blocked_by_current_migration(nil, 0, nil)
    end

    it "does not throw an error checking for blocked migrations on save" do
      cm1 = create_ab_cm
      cm1.queue_migration
      cm2 = create_ab_cm
      cm2.queue_migration
      cm1.workflow_state = "imported"
      expect { cm1.save! }.not_to raise_error
    end
  end

  it "expires migration jobs after 48 hours" do
    cm = @cm
    cm.migration_type = "common_cartridge_importer"
    cm.workflow_state = "created"
    cm.save!
    cm.queue_migration

    expect_any_instance_of(CC::Importer::CCWorker).not_to receive(:perform)
    Timecop.travel(50.hours.from_now) do
      run_jobs
    end

    cm.reload
    expect(cm).to be_failed
    expect(cm.migration_issues).not_to be_empty
    expect(cm.migration_issues.last.error_report.message).to include "job expired"

    cm.queue_migration
    expect(cm.migration_issues).to be_empty
  end

  it "expires import jobs after 48 hours" do
    cm = @cm
    cm.migration_type = "common_cartridge_importer"
    cm.workflow_state = "exported"
    cm.save!
    expect(CC::Importer::CCWorker).not_to receive(:new)
    cm.queue_migration

    expect_any_instance_of(ContentMigration).not_to receive(:import_content)
    Timecop.travel(50.hours.from_now) do
      run_jobs
    end

    cm.reload
    expect(cm).to be_failed
    expect(cm.migration_issues).not_to be_empty
    expect(cm.migration_issues.last.error_report.message).to include "job expired"
  end

  it "delays queueing imports if one in course is already running" do
    cms = []
    Timecop.freeze(Time.zone.now) do
      2.times do
        cm = ContentMigration.new(context: @course, user: @teacher)
        cm.migration_type = "common_cartridge_importer"
        cm.workflow_state = "exported"
        cm.save!
        cm.queue_migration
        cms << cm
      end

      dj = Delayed::Job.last
      expect(dj.tag).to eq "ContentMigration#queue_migration"
      expect(dj.run_at > 30.minutes.from_now).to be_truthy # should run in the future if something goes wrong
    end

    expect_any_instantiation_of(cms[1]).to receive(:queue_migration) do |_plugin, opts|
      expect(opts[:retry_count]).to eq 1
      expect(opts[:expires_at]).to be_present
    end

    run_jobs # even though the requeue is set to happen in the future, it should get run right away after the first one completes
  end

  it "tries to handle zip files with a nested root directory" do
    cm = @cm
    cm.migration_type = "common_cartridge_importer"
    cm.migration_settings["import_immediately"] = true
    cm.save!

    package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/cc_nested.zip")
    attachment = Attachment.new(context: cm, filename: "file.zip")
    attachment.uploaded_data = File.open(package_path, "rb")
    attachment.save!

    cm.update_attribute(:attachment, attachment)
    cm.queue_migration
    run_jobs

    expect(cm.reload.migration_issues).to be_empty
  end

  describe "#expired?" do
    it "marks as expired after X days" do
      ContentMigration.where(id: @cm.id).update_all(created_at: 405.days.ago)
      expect(@cm.reload).to be_expired
    end

    it "does not mark new exports as expired" do
      expect(@cm.reload).not_to be_expired
    end

    it "does not mark as expired if setting is 0" do
      Setting.set("content_migrations_expire_after_days", "0")
      ContentMigration.where(id: @cm.id).update_all(created_at: 405.days.ago)
      expect(@cm.reload).not_to be_expired
    end
  end

  describe "#expired" do
    it "marks as expired after X days" do
      ContentMigration.where(id: @cm.id).update_all(created_at: 405.days.ago)
      expect(ContentMigration.expired.pluck(:id)).to eq [@cm.id]
    end

    it "does not mark new exports as expired" do
      expect(ContentMigration.expired.pluck(:id)).to be_empty
    end

    it "does not mark as expired if setting is 0" do
      Setting.set("content_migrations_expire_after_days", "0")
      ContentMigration.where(id: @cm.id).update_all(created_at: 405.days.ago)
      expect(ContentMigration.expired.pluck(:id)).to be_empty
    end
  end

  context "Quizzes.Next CC import" do
    before do
      allow(@cm.context)
        .to receive(:feature_enabled?)
        .with(:quizzes_next)
        .and_return(true)
      allow(@cm.migration_settings)
        .to receive(:[])
        .with(:import_quizzes_next)
        .and_return(true)
    end

    let(:importer) { instance_double("QuizzesNext::Importers::CourseContentImporter") }

    it "calls QuizzesNext::Importers" do
      expect(@cm.migration_settings)
        .to receive(:[])
        .with(:migration_ids_to_import)
      expect(Importers).not_to receive(:content_importer_for)
      expect(QuizzesNext::Importers::CourseContentImporter)
        .to receive(:new).and_return(importer)
      expect(importer).to receive(:import_content)
      @cm.import!({})
    end
  end

  context "importing to NQ with the new_quizzes_bank_migrations FF enabled" do
    before do
      allow_any_instance_of(ContentMigration).to receive(:quizzes_next_banks_migration?).and_return(true)
      allow_any_instance_of(ContentMigration).to receive(:quizzes_next_migration?).and_return(true)
      allow(NewQuizzesFeaturesHelper).to receive(:new_quizzes_bank_migrations_enabled?).and_return(true)
    end

    it "creates a quiz migration alert for the user and course" do
      expect do
        cm = @cm
        cm.migration_type = "qti_converter"
        cm.migration_settings["import_immediately"] = true
        cm.save!

        package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/plaintext_qti.zip")
        attachment = Attachment.create!(context: cm, uploaded_data: File.open(package_path, "rb"), filename: "file.zip")
        cm.attachment = attachment
        cm.save!

        cm.queue_migration
        run_jobs
      end.to change { QuizMigrationAlert.count }
        .from(0).to(1)
        .and change { @teacher.quiz_migration_alerts.count }
        .from(0).to(1)
    end

    context "when the same migration is queued multiple times" do
      it "does not produce multiple quiz migration alerts" do
        expect do
          cm = @cm
          cm.migration_type = "qti_converter"
          cm.migration_settings["import_immediately"] = true
          cm.save!

          package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/plaintext_qti.zip")
          attachment = Attachment.create!(context: cm, uploaded_data: File.open(package_path, "rb"), filename: "file.zip")
          cm.attachment = attachment
          cm.save!

          2.times do
            cm.queue_migration
            run_jobs
          end
        end.to change { QuizMigrationAlert.count }.from(0).to(1)
      end
    end

    it "imports assignments from a qti zip file without creating assessment_question_banks" do
      cm = @cm
      cm.migration_type = "qti_converter"
      cm.migration_settings["import_immediately"] = true
      cm.save!

      package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/plaintext_qti.zip")
      attachment = Attachment.create!(context: cm, uploaded_data: File.open(package_path, "rb"), filename: "file.zip")
      cm.attachment = attachment
      cm.save!

      cm.queue_migration
      run_jobs

      expect(@course.assessment_question_banks.count).to eq 0
      expect(AssessmentQuestion.count).to eq 0
      expect(@course.quiz_questions.count).to eq 0

      expect(@course.assignments.count).to eq 1
    end

    it "imports assignments from a common_cartridge zip file without creating assessment_question_banks" do
      cm = @cm
      cm.migration_type = "common_cartridge_importer"
      cm.migration_settings["import_immediately"] = true
      cm.save!

      package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/cc_nested.zip")
      attachment = Attachment.new(context: cm, filename: "file.zip")
      attachment.uploaded_data = File.open(package_path, "rb")
      attachment.save!

      cm.update_attribute(:attachment, attachment)
      cm.queue_migration
      run_jobs

      expect(cm.reload.migration_issues).to be_empty

      expect(@course.assessment_question_banks.count).to eq 0
      expect(AssessmentQuestion.count).to eq 0
      expect(@course.quiz_questions.count).to eq 0

      expect(@course.assignments.count).to eq 1
    end
  end

  context "when importing to NQ with the new_quizzes_bank_migrations FF turned off" do
    it "does not produce quiz migration alerts" do
      expect do
        cm = @cm
        cm.migration_type = "qti_converter"
        cm.migration_settings["import_immediately"] = true
        cm.save!

        package_path = File.join("#{File.dirname(__FILE__)}/../fixtures/migration/plaintext_qti.zip")
        attachment = Attachment.create!(context: cm, uploaded_data: File.open(package_path, "rb"), filename: "file.zip")
        cm.attachment = attachment
        cm.save!

        cm.queue_migration
        run_jobs
      end.to not_change { QuizMigrationAlert.count }
    end
  end

  context "migration issues" do
    let(:err) { StandardError.new("TestError") }

    it "doesn't overreeact to todo issues" do
      expect do
        @cm.add_todo("test todo", { exception: err })
      end.to change { ErrorReport.count }.by(0)
    end

    it "doesn't overreeact to warning issues" do
      expect do
        @cm.add_warning("test warn", { exception: err })
      end.to change { ErrorReport.count }.by(0)
    end

    it "reports error issues appropriately" do
      expect do
        @cm.add_error("test error", { exception: err })
      end.to change { ErrorReport.count }.by(1)
    end

    it "accepts downgrades for real errors" do
      expect do
        @cm.add_error("test error", { exception: err, issue_level: :warning })
      end.to change { ErrorReport.count }.by(0)
    end

    it "accepts issue level option when failing a migration" do
      expect do
        @cm.fail_with_error!(err, error_message: "foo", issue_level: :warning)
      end.to change { ErrorReport.count }.by(0)
    end
  end

  describe "imported_migration_items_for_insert_type" do
    it "does not explode if the import type isn't in the migration item hash" do
      @cm.migration_settings[:insert_into_module_type] = "assignment"
      output = @cm.imported_migration_items_for_insert_type
      expect(output).to eq([])
    end
  end

  describe "import_class_name" do
    it "converts various forms of name to the proper AR class name" do
      expect(ContentMigration.import_class_name("assignment")).to eq "Assignment"
      expect(ContentMigration.import_class_name("assignments")).to eq "Assignment"
      expect(ContentMigration.import_class_name("announcement")).to eq "DiscussionTopic"
      expect(ContentMigration.import_class_name("announcements")).to eq "DiscussionTopic"
      expect(ContentMigration.import_class_name("discussion_topic")).to eq "DiscussionTopic"
      expect(ContentMigration.import_class_name("discussion_topics")).to eq "DiscussionTopic"
      expect(ContentMigration.import_class_name("attachment")).to eq "Attachment"
      expect(ContentMigration.import_class_name("attachments")).to eq "Attachment"
      expect(ContentMigration.import_class_name("file")).to eq "Attachment"
      expect(ContentMigration.import_class_name("files")).to eq "Attachment"
      expect(ContentMigration.import_class_name("page")).to eq "WikiPage"
      expect(ContentMigration.import_class_name("pages")).to eq "WikiPage"
      expect(ContentMigration.import_class_name("wiki_page")).to eq "WikiPage"
      expect(ContentMigration.import_class_name("wiki_pages")).to eq "WikiPage"
      expect(ContentMigration.import_class_name("quiz")).to eq "Quizzes::Quiz"
      expect(ContentMigration.import_class_name("quizzes")).to eq "Quizzes::Quiz"
      expect(ContentMigration.import_class_name("module")).to eq "ContextModule"
      expect(ContentMigration.import_class_name("modules")).to eq "ContextModule"
      expect(ContentMigration.import_class_name("context_module")).to eq "ContextModule"
      expect(ContentMigration.import_class_name("context_modules")).to eq "ContextModule"
      expect(ContentMigration.import_class_name("module_item")).to eq "ContentTag"
      expect(ContentMigration.import_class_name("module_items")).to eq "ContentTag"
      expect(ContentMigration.import_class_name("content_tag")).to eq "ContentTag"
      expect(ContentMigration.import_class_name("content_tags")).to eq "ContentTag"
    end
  end

  describe "find_source_course_for_import" do
    specs_require_sharding

    before :once do
      @shard1.activate do
        @other_account = Account.create! name: "Source Account"
        @other_account.account_domains.create! host: "pineapple.127.0.0.1.xip.io"
        @other_course = course_factory(account: @other_account)
      end

      @course = course_factory
    end

    it "finds a course when root account global id lines up" do
      @course.full_migration_hash = {
        context_info: {
          course_id: @other_course.local_id,
          root_account_id: @other_account.global_id,
          root_account_uuid: @other_account.uuid
        }
      }
      migration = @course.content_migrations.create!
      migration.find_source_course_for_import
      expect(migration.source_course).to eq @other_course
    end

    it "finds root account by domain when context account id doesn't exist" do
      @course.full_migration_hash = {
        context_info: {
          course_id: @other_course.local_id,
          root_account_id: -1,
          root_account_uuid: @other_account.uuid,
          canvas_domain: "pineapple.127.0.0.1.xip.io"
        }
      }
      migration = @course.content_migrations.create!
      migration.find_source_course_for_import
      expect(migration.source_course).to eq @other_course
    end

    it "finds root account by domain when context global account uuid doesn't match" do
      decoy_account = @shard1.activate { Account.create! }
      @course.full_migration_hash = {
        context_info: {
          course_id: @other_course.local_id,
          root_account_id: decoy_account.global_id,
          root_account_uuid: @other_account.uuid,
          canvas_domain: "pineapple.127.0.0.1.xip.io"
        }
      }
      migration = @course.content_migrations.create!
      migration.find_source_course_for_import
      expect(migration.source_course).to eq @other_course
    end

    it "doesn't find a course when the account uuid doesn't match" do
      @course.full_migration_hash = {
        context_info: {
          course_id: @other_course.local_id,
          root_account_id: @other_account.global_id,
          root_account_uuid: "nope"
        }
      }
      migration = @course.content_migrations.create!
      migration.find_source_course_for_import
      expect(migration.source_course).to be_nil
    end
  end

  describe "asset_map_url" do
    before :once do
      # not actually doing a course copy here, just simulating a finished one
      @src = course_factory
      @dst = course_factory
      @old = @src.assignments.create! title: "foo"
      @new = @dst.assignments.create! title: "foo", migration_id: CC::CCHelper.create_key(@old, global: true)
      @cm = @dst.content_migrations.build(migration_type: "course_copy_importer")
      @cm.workflow_state = "imported"
      @cm.source_course = @src
      @cm.save!
    end

    it "returns a url to a file containing the asset map" do
      allow(HostUrl).to receive(:default_host).and_return("pineapple.edu")
      url = @cm.asset_map_url(generate_if_needed: true)
      @cm.reload
      expect(url).to include "/files/#{@cm.asset_map_attachment.id}/download"
      expect(url).to include "verifier=#{@cm.asset_map_attachment.uuid}"
      expect(@cm.asset_map_attachment.context).to eq @cm
      json = JSON.parse(@cm.asset_map_attachment.open.read)
      expect(json).to eq({ "source_course" => @src.id.to_s,
                           "source_host" => "pineapple.edu",
                           "resource_mapping" => {
                             "assignments" => { @old.id.to_s => @new.id.to_s }
                           } })
    end

    context "when not on a test cluster" do
      let(:content_migration) do
        @cm.update!(source_course: source_course)

        @cm
      end
      let(:source_course) { course_factory }

      before do
        allow(ApplicationController).to receive(:test_cluster_name).and_return nil
        allow(content_migration.context.root_account).to receive(:domain).and_return "pineapple.edu"
      end

      it "uses the 'production' host" do
        expect(content_migration.context.root_account).to receive(:domain).with(nil)

        content_migration.asset_map_url(generate_if_needed: true)
      end
    end

    context "when on a test cluster" do
      let(:content_migration) do
        @cm.update!(source_course: source_course)

        @cm
      end
      let(:source_course) { course_factory }

      before do
        allow(ApplicationController).to receive(:test_cluster_name).and_return "banana"
        allow(content_migration.context.root_account).to receive(:domain).and_return "pineapple.edu"
      end

      it "uses the test host" do
        expect(content_migration.context.root_account).to receive(:domain).with("banana")

        content_migration.asset_map_url(generate_if_needed: true)
      end
    end
  end

  context "outcomes" do
    def context_outcome(context)
      outcome_group ||= context.root_outcome_group
      outcome = context.created_learning_outcomes.create!(title: "outcome")
      outcome_group.add_outcome(outcome)
      outcome
    end

    def mig_id(obj)
      @template.migration_id_for(obj)
    end

    def run_migration
      @migration = MasterCourses::MasterMigration.start_new_migration!(@template, @user)
      @cm = @course_to.content_migrations.build
      @cm.migration_type = "master_course_import"
      @cm.migration_settings[:master_migration_id] = @migration.id
      @cm.migration_settings["import_immediately"] = true
      @cm.child_subscription_id = @sub.id
      @cm.save!
      run_jobs
      @migration.reload
    end

    def create_learning_outcome_resuls(outcome)
      student = user_factory
      @course_to.enroll_user(student, "StudentEnrollment", enrollment_state: "active")
      time = Time.zone.now
      rubric = outcome_with_rubric context: @course_to, outcome: outcome
      assignment1 = @course_to.assignments.create!(title: "Assignment 1")
      alignment1 = outcome.align(assignment1, @course_to)
      rubric_association1 = rubric.associate_with(assignment1, @course_to, purpose: "grading")
      LearningOutcomeResult.create!(
        learning_outcome: outcome,
        user: student,
        context: @course_to,
        alignment: alignment1,
        associated_asset: assignment1,
        association_type: "RubricAssociation",
        association_id: rubric_association1.id,
        title: "",
        score: 3,
        possible: 5,
        mastery: 3,
        created_at: time,
        updated_at: time,
        submitted_at: time,
        assessed_at: time
      )
    end

    before(:once) do
      @course_from = course_model
      @course_to = course_model
      @template = MasterCourses::MasterTemplate.set_as_master_course(@course_from)
      @sub = @template.add_child_course!(@course_to)
    end

    describe "course level outcomes" do
      before do
        @outcome_from = context_outcome(@course_from)
        run_migration
      end

      it "there are no learning outcome results nor authoritative results" do
        @outcome_to = @course_to.learning_outcomes.where(migration_id: mig_id(@outcome_from)).first
        @outcome_from.destroy!
        run_migration
        expect(@outcome_from.reload).to be_deleted
        expect(@outcome_to.reload).to be_deleted
      end

      it "there are learning outcome results" do
        mig_id = mig_id(@outcome_from)
        @outcome_to = @course_to.learning_outcomes.where(migration_id: mig_id).first
        create_learning_outcome_resuls(@outcome_to)
        @outcome_from.destroy!
        run_migration
        expect(@outcome_from.reload).to be_deleted
        expect(@outcome_to.reload).not_to be_deleted
        expect(@migration.migration_results.first.results[:skipped].first).to eq(mig_id)
      end

      it "there are authoritative results" do
        mig_id = mig_id(@outcome_from)
        @outcome_to = @course_to.learning_outcomes.where(migration_id: mig_id).first
        @outcome_from.destroy!
        allow_any_instance_of(ContentMigration).to receive(:outcome_has_authoritative_results?).and_return true
        run_migration
        expect(@outcome_from.reload).to be_deleted
        expect(@outcome_to.reload).not_to be_deleted
        expect(@migration.migration_results.first.results[:skipped].first).to eq(mig_id)
      end
    end

    describe "account level outcomes" do
      before(:once) do
        @account = @course_from.account
        @account_outcome = context_outcome(@account)
      end

      before do
        @course_root = @course_from.root_outcome_group
        @course_root.add_outcome(@account_outcome)
        run_migration
      end

      it "there are no learning outcome results nor authoritative results" do
        @ct_from = ContentTag.find_by!(content_id: @account_outcome.id, content_type: "LearningOutcome", context_type: "Course", context_id: @course_from.id)
        @ct_to = ContentTag.find_by!(content_id: @account_outcome.id, content_type: "LearningOutcome", context_type: "Course", context_id: @course_to.id)
        @ct_from.destroy!
        run_migration
        expect(@ct_from.reload).to be_deleted
        expect(@ct_to.reload).to be_deleted
      end

      it "there are learning outcome results" do
        create_learning_outcome_resuls(@account_outcome)
        @ct_from = ContentTag.find_by!(content_id: @account_outcome.id, content_type: "LearningOutcome", context_type: "Course", context_id: @course_from.id)
        @ct_to = ContentTag.find_by!(content_id: @account_outcome.id, content_type: "LearningOutcome", context_type: "Course", context_id: @course_to.id)
        mig_id = @ct_to.migration_id
        @ct_from.destroy!
        run_migration
        expect(@ct_from.reload).to be_deleted
        expect(@ct_to.reload).not_to be_deleted
        expect(@migration.migration_results.first.results[:skipped].first).to eq(mig_id)
      end

      it "there are authoritative results" do
        @ct_from = ContentTag.find_by!(content_id: @account_outcome.id, content_type: "LearningOutcome", context_type: "Course", context_id: @course_from.id)
        @ct_to = ContentTag.find_by!(content_id: @account_outcome.id, content_type: "LearningOutcome", context_type: "Course", context_id: @course_to.id)
        mig_id = @ct_to.migration_id
        @ct_from.destroy!
        allow_any_instance_of(ContentMigration).to receive(:outcome_has_authoritative_results?).and_return true
        run_migration
        expect(@ct_from.reload).to be_deleted
        expect(@ct_to.reload).not_to be_deleted
        expect(@migration.migration_results.first.results[:skipped].first).to eq(mig_id)
      end
    end
  end
end
