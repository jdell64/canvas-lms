/*
 * Copyright (C) 2021 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import formatMessage from '../../format-message'
import '../tinymce/hu_HU'

const locale = {
  "access_the_pretty_html_editor_37168efe": {
    "message": "Hozzáférés a remek HTML-szerkesztőhöz"
  },
  "accessibility_checker_b3af1f6c": { "message": "Akadálymentesség ellenőrző" },
  "add_8523c19b": { "message": "Hozzáadás" },
  "add_another_f4e50d57": { "message": "Másik hozzáadása" },
  "add_cc_subtitles_55f0394e": { "message": "Felirat hozzáadása" },
  "add_image_60b2de07": { "message": "Kép hozzáadása" },
  "additional_considerations_f3801683": { "message": "További szempontok" },
  "aleph_f4ffd155": { "message": "Aleph" },
  "align_11050992": { "message": "Igazítás" },
  "alignment_and_lists_5cebcb69": { "message": "Igazítások és listák" },
  "all_4321c3a1": { "message": "Összes" },
  "all_apps_a50dea49": { "message": "Minden alkalmazás" },
  "alpha_15d59033": { "message": "Alfa" },
  "alphabetical_55b5b4e0": { "message": "Betűrendben" },
  "alt_text_611fb322": { "message": "Alternatív szöveg" },
  "amalg_coproduct_c589fb12": { "message": "Amalg (társtermék)" },
  "an_error_occured_reading_the_file_ff48558b": {
    "message": "Hiba történt a fájl olvasásakor"
  },
  "an_error_occurred_making_a_network_request_d1bda348": {
    "message": "Hiba történt egy hálózati kérelem létrehozásakor"
  },
  "an_error_occurred_uploading_your_media_71f1444d": {
    "message": "Hiba történt a médiád feltöltése során."
  },
  "and_7fcc2911": { "message": "És" },
  "angle_c5b4ec50": { "message": "Szög" },
  "announcement_list_da155734": { "message": "Hirdetménylista" },
  "announcements_a4b8ed4a": { "message": "Hirdetmények" },
  "apply_781a2546": { "message": "Alkalmazás" },
  "apply_changes_to_all_instances_of_this_icon_maker__2642f466": {
    "message": "Alkalmazza a módosításokat az Ikonkészítő Ikon minden példányára a tanfolyamon"
  },
  "approaches_the_limit_893aeec9": { "message": "Közeledik a Határhoz" },
  "approximately_e7965800": { "message": "Körülbelül" },
  "apps_54d24a47": { "message": "Alkalmazások" },
  "are_you_sure_you_want_to_cancel_changes_you_made_m_c5210496": {
    "message": "Biztos benne, hogy mégsem? A változtatásai talán nincsenek elmentve."
  },
  "arrows_464a3e54": { "message": "Nyilak" },
  "art_icon_8e1daad": { "message": "Művészet ikon" },
  "aspect_ratio_will_be_preserved_cb5fdfb8": {
    "message": "Képarány megtartása"
  },
  "assignments_1e02582c": { "message": "Feladatok" },
  "asterisk_82255584": { "message": "Csillag" },
  "attributes_963ba262": { "message": "Attribútumok" },
  "audio_and_video_recording_not_supported_please_use_5ce3f0d7": {
    "message": "A hang- és videofelvétel nem támogatott; kérjük, használjon másik böngészőt."
  },
  "audio_options_feb58e2c": { "message": "Hangbeállítások" },
  "audio_options_tray_33a90711": { "message": "Hangbeállítások tálca" },
  "audio_player_for_title_20cc70d": {
    "message": "Audio lejátszó ehhez: { title }"
  },
  "auto_saved_content_exists_would_you_like_to_load_t_fee528f2": {
    "message": "Van automatikusan mentett tartalom. Szeretné inkább azt betölteni?"
  },
  "available_folders_694d0436": { "message": "Elérhető mappák" },
  "backslash_b2d5442d": { "message": "Visszafele perjel" },
  "bar_ec63ed6": { "message": "Bar" },
  "basic_554cdc0a": { "message": "Alap" },
  "because_501841b": { "message": "Mert" },
  "below_81d4dceb": { "message": "Lent" },
  "beta_cb5f307e": { "message": "Béta" },
  "big_circle_16b2e604": { "message": "Nagy Kör" },
  "binomial_coefficient_ea5b9bb7": { "message": "Binomiális együttható" },
  "black_4cb01371": { "message": "Fekete" },
  "blue_daf8fea9": { "message": "Kék" },
  "bottom_15a2a9be": { "message": "Alsó" },
  "bottom_third_5f5fec1d": { "message": "Alsó harmad" },
  "bowtie_5f9629e4": { "message": "Csokornyakkendő" },
  "brick_f2656265": { "message": "Tégla" },
  "c_2001_acme_inc_283f7f80": { "message": "(c) 2001 Acme Inc." },
  "cancel_caeb1e68": { "message": "Mégse" },
  "cap_product_3a5265a6": { "message": "Kupak termék" },
  "center_align_e68d9997": { "message": "Középre igazítás" },
  "centered_dot_64d5e378": { "message": "Középre helyezett pont" },
  "centered_horizontal_dots_451c5815": {
    "message": "Középre helyezett vízszintes pontok"
  },
  "changes_you_made_may_not_be_saved_4e8db973": {
    "message": "Előfordulhat, hogy a végrehajtott módosítások nem menthetők."
  },
  "characters_9d897d1c": { "message": "Karakterek" },
  "chi_54a32644": { "message": "Chi" },
  "choose_caption_file_9c45bc4e": { "message": "Feliratfájl választása" },
  "choose_usage_rights_33683854": {
    "message": "Válasszon a felhasználói jogokból..."
  },
  "circle_484abe63": { "message": "Kör" },
  "circle_unordered_list_9e3a0763": { "message": "rendezetlen lista körökkel" },
  "clear_2084585f": { "message": "Törlés" },
  "clear_image_3213fe62": { "message": "Üres kép" },
  "clear_selected_file_82388e50": { "message": "Kiválasztott fájl törlése" },
  "clear_selected_file_filename_2fe8a58e": {
    "message": "Kiválasztott fájl törlése: { filename }"
  },
  "click_or_shift_click_for_the_html_editor_25d70bb4": {
    "message": "Kattintson vagy a Shift billentyűt lenyomva tartva kattintson a html-szerkesztőhöz."
  },
  "click_to_embed_imagename_c41ea8df": {
    "message": "Kattintson a { imageName } kép beágyazásához."
  },
  "click_to_hide_preview_3c707763": {
    "message": "Kattintson az előnézet elrejtéséhez!"
  },
  "click_to_insert_a_link_into_the_editor_c19613aa": {
    "message": "Link beszúrásához kattintson ide."
  },
  "click_to_show_preview_faa27051": { "message": "Kattintson az előnézethez!" },
  "close_a_menu_or_dialog_also_returns_you_to_the_edi_739079e6": {
    "message": "Menü vagy párbeszéd bezárása. Ez visszavisz a szerkesztő területre."
  },
  "close_d634289d": { "message": "Bezár" },
  "closed_caption_file_must_be_less_than_maxkb_kb_5880f752": {
    "message": "A feliratfájlnak kisebbnek kell lennie, mint { maxKb } kb"
  },
  "closed_captions_subtitles_e6aaa016": { "message": "Zárt feliratok" },
  "clubs_suit_c1ffedff": { "message": "Treff (kártyaszín)" },
  "collaborations_5c56c15f": { "message": "Együttműködés" },
  "collapse_to_hide_types_1ab46d2e": {
    "message": "Összecsukás az elrejtéshez { types }"
  },
  "color_picker_6b359edf": { "message": "Színválasztó" },
  "color_picker_colorname_selected_ad4cf400": {
    "message": "Színválasztó ({ colorName } kiválasztva)"
  },
  "complex_numbers_a543d004": { "message": "Komplex számok" },
  "computer_1d7dfa6f": { "message": "Számítógép" },
  "congruent_5a244acd": { "message": "Egybevágó" },
  "contains_311f37b7": { "message": "Tartalmaz" },
  "content_1440204b": { "message": "Tartalom" },
  "content_is_still_being_uploaded_if_you_continue_it_8f06d0cb": {
    "message": "A tartalom feltöltése még folyamatban van. Ha folytatja, akkor nem lesz rendesen beágyazva."
  },
  "content_subtype_5ce35e88": { "message": "Tartalom altípusa" },
  "content_type_2cf90d95": { "message": "Tartalom típusa " },
  "coproduct_e7838082": { "message": "Társtermék" },
  "copyright_holder_66ee111": { "message": "Jog tulajdonosa:" },
  "count_40eced3b": { "message": "Számol" },
  "count_plural_0_0_words_one_1_word_other_words_acf32eca": {
    "message": "{ count, plural,\n     =0 {0 szó}\n    one {1 szó}\n  other {# szó}\n}"
  },
  "count_plural_one_item_loaded_other_items_loaded_857023b7": {
    "message": "{ count, plural,\n    one {# elem betöltve}\n  other {# elem betöltve}\n}"
  },
  "course_documents_104d76e0": { "message": "Kurzus dokumentumai" },
  "course_files_62deb8f8": { "message": "Kurzusfájlok" },
  "course_files_a31f97fc": { "message": "Tanfolyam fájlok" },
  "course_images_f8511d04": { "message": "Kurzus képei" },
  "course_link_b369426": { "message": "Kurzus link" },
  "course_links_b56959b9": { "message": "Kurzus linkjei" },
  "course_media_ec759ad": { "message": "Kurzus média" },
  "course_navigation_dd035109": { "message": "Kurzusnavigáció" },
  "create_icon_110d6463": { "message": "Ikon létrehozása" },
  "create_icon_maker_icon_c716bffe": {
    "message": "Hozzon létre Icon Maker ikont"
  },
  "creative_commons_license_725584ae": {
    "message": "Creative Commons licenc:"
  },
  "crop_image_41bf940c": { "message": "Kép körbevágása" },
  "crop_image_807ebb08": { "message": "Kép kivágása" },
  "cup_product_14174434": { "message": "Kupa termék" },
  "current_image_f16c249c": { "message": "Aktuális kép" },
  "current_volume_level_c55ab825": { "message": "Aktuális hangerőszint" },
  "custom_6979cd81": { "message": "Egyéni" },
  "cyan_c1d5f68a": { "message": "Cián" },
  "dagger_57e0f4e5": { "message": "Tőr" },
  "date_added_ed5ad465": { "message": "Dátum hozzáadva" },
  "decorative_icon_9a7f3fc3": { "message": "Dekoratív ikon" },
  "decorative_type_upper_f2c95e3": { "message": "Dekoratív { TYPE_UPPER }" },
  "decrease_indent_d9cf469d": { "message": "Behúzás csökkentése" },
  "deep_purple_bb3e2907": { "message": "Sötétlila" },
  "default_bulleted_unordered_list_47079da8": {
    "message": "alapértelmezett nem rendezett lista"
  },
  "default_numerical_ordered_list_48dd3548": {
    "message": "alapértelmezett sorszámozott lista"
  },
  "definite_integral_fe7ffed1": { "message": "Határozott integrál" },
  "degree_symbol_4a823d5f": { "message": "Fokozat szimbólum" },
  "delimiters_4db4840d": { "message": "Elválasztó jelek" },
  "delta_53765780": { "message": "Delta" },
  "describe_the_icon_f6a18823": { "message": "(Írja le az ikont)" },
  "describe_the_video_2fe8f46a": { "message": "(A videó leírása)" },
  "description_436c48d7": { "message": "Leírás" },
  "details_98a31b68": { "message": "Részletek" },
  "diagonal_dots_7d71b57e": { "message": "Átlós pontok" },
  "diamond_b8dfe7ae": { "message": "Gyémánt" },
  "diamonds_suit_526abaaf": { "message": "Káró (kártyaszín)" },
  "digamma_258ade94": { "message": "Digamma" },
  "dimension_type_f5fa9170": { "message": "Méret típusa" },
  "dimensions_45ddb7b7": { "message": "Méretek" },
  "directionality_26ae9e08": { "message": "Irányítottság" },
  "directly_edit_latex_b7e9235b": {
    "message": "Közvetlenül szerkesztheti a LaTeX-et"
  },
  "disable_preview_222bdf72": { "message": "Előnézet letiltása" },
  "discussions_a5f96392": { "message": "Fórumok" },
  "discussions_index_6c36ced": { "message": "Fórumok indexe" },
  "disjoint_union_e74351a8": { "message": "Diszjunkt únió" },
  "display_options_315aba85": { "message": "Megjelenítési beállítások" },
  "display_text_link_opens_in_a_new_tab_75e9afc9": {
    "message": "Szöveges link megjelenítése (új lapfülön jelenik meg)"
  },
  "division_sign_72190870": { "message": "Osztás jele" },
  "document_678cd7bf": { "message": "Dokumentum" },
  "documents_81393201": { "message": "Dokumentumok" },
  "done_54e3d4b6": { "message": "Kész" },
  "double_dagger_faf78681": { "message": "Dupla Tőr" },
  "down_5831a426": { "message": "Le" },
  "down_and_left_diagonal_arrow_40ef602c": {
    "message": "Le és Balra Átlós Nyíl"
  },
  "down_and_right_diagonal_arrow_6ea0f460": {
    "message": "Lefelé és Jobbra Átlós Nyíl"
  },
  "downward_arrow_cca52012": { "message": "Lefelé mutató nyíl" },
  "downward_pointing_triangle_2a12a601": {
    "message": "Lefelé mutató háromszög"
  },
  "drag_a_file_here_1bf656d5": { "message": "Húzzon ide egy fájlt" },
  "drag_and_drop_or_click_to_browse_your_computer_60772d6d": {
    "message": "Húzza ide a fájlt vagy tallózza ki a számítógépen"
  },
  "drag_handle_use_up_and_down_arrows_to_resize_e29eae5c": {
    "message": "Húzza a fogantyút. Átméretezéshez használja a fel és le nyilakat."
  },
  "due_multiple_dates_cc0ee3f5": {
    "message": "Határidő: Több határidő van érvényben"
  },
  "due_when_7eed10c6": { "message": "Határidő: { when }" },
  "edit_alt_text_for_this_icon_instance_9c6fc5fd": {
    "message": "Az ikonpéldány alternatív szövegének szerkesztése"
  },
  "edit_c5fbea07": { "message": "Szerkesztés" },
  "edit_course_link_5a5c3c59": { "message": "Kurzus hivatkozás szerkesztése" },
  "edit_equation_f5279959": { "message": "Egyenlet szerkesztése" },
  "edit_existing_icon_maker_icon_5d0ebb3f": {
    "message": "Meglévő Ikonkészítő Ikon szerkesztése"
  },
  "edit_icon_2c6b0e91": { "message": "Szerkesztés ikon" },
  "edit_link_7f53bebb": { "message": "Link szerkesztése" },
  "editor_statusbar_26ac81fc": { "message": "Szerkesztő állapotsor" },
  "embed_828fac4a": { "message": "Beágyaz" },
  "embed_code_314f1bd5": { "message": "Kód beágyazása" },
  "embed_content_from_external_tool_3397ad2d": {
    "message": "Tartalom beágyazása külső eszközről"
  },
  "embed_image_1080badc": { "message": "Beágyazott kép" },
  "embed_video_a97a64af": { "message": "Videó beágyazása" },
  "embedded_content_aaeb4d3d": { "message": "beágyazott tartalom" },
  "empty_set_91a92df4": { "message": "Üres készlet" },
  "encircled_dot_8f5e51c": { "message": "Bekerített pont" },
  "encircled_minus_72745096": { "message": "Bekerített mínusz" },
  "encircled_plus_36d8d104": { "message": "Bekerített Plusz" },
  "encircled_times_5700096d": { "message": "Bekerített idők" },
  "engineering_icon_f8f3cf43": { "message": "Mérnöki ikon" },
  "english_icon_25bfe845": { "message": "Angol ikon" },
  "enter_at_least_3_characters_to_search_4f037ee0": {
    "message": "Legalább 3 karaktert be kell írni a kereséshez"
  },
  "epsilon_54bb8afa": { "message": "Epsilon" },
  "epsilon_variant_d31f1e77": { "message": "Epsilon (változat)" },
  "equals_sign_c51bdc58": { "message": "Egyenlő jel" },
  "equation_1c5ac93c": { "message": "Egyenlet" },
  "equation_editor_39fbc3f1": { "message": "Egyenletszerkesztő" },
  "equivalence_class_7b0f11c0": { "message": "Egyenértékűségi osztály" },
  "equivalent_identity_654b3ce5": { "message": "Egyenértékű (identitás)" },
  "eta_b8828f99": { "message": "Eta" },
  "exists_2e62bdaa": { "message": "Létezik" },
  "expand_preview_by_default_2abbf9f8": {
    "message": "Az előnézet kibontása alapértelmezés szerint"
  },
  "expand_to_see_types_f5d29352": {
    "message": "Kiterjesztés a(z) { types } megtekintéséhez"
  },
  "external_link_d3f9e62a": { "message": "külső hivatkozás" },
  "external_tools_6e77821": { "message": "Külső eszközök" },
  "extra_large_b6cdf1ff": { "message": "Extra nagy" },
  "extra_small_9ae33252": { "message": "Extra kicsi" },
  "extracurricular_icon_67c8ca42": { "message": "Tanórán kívüli ikon" },
  "f_function_fe422d65": { "message": "F (függvény)" },
  "failed_getting_file_contents_e9ea19f4": {
    "message": "Nem sikerült beolvasni a fájl tartalmát"
  },
  "file_name_8fd421ff": { "message": "Fájlnév" },
  "file_storage_quota_exceeded_b7846cd1": {
    "message": "Túllépte a fájltárolási kvótát"
  },
  "file_url_c12b64be": { "message": "Fájl URL" },
  "filename_file_icon_602eb5de": { "message": "{ filename } fájl ikon" },
  "filename_image_preview_6cef8f26": { "message": "{ filename } kép előnézet" },
  "filename_text_preview_e41ca2d8": {
    "message": "{ filename } szöveg előnézet"
  },
  "files_c300e900": { "message": "Fájlok" },
  "files_index_af7c662b": { "message": "Fájlok indexe" },
  "finish_bc343002": { "message": "Befejezés" },
  "flat_music_76d5a5c3": { "message": "Lapos (zene)" },
  "focus_element_options_toolbar_18d993e": {
    "message": "Az elem opciók eszköztár fókuszba helyezése"
  },
  "folder_tree_fbab0726": { "message": "Könyvtárfa" },
  "for_all_b919f972": { "message": "Mindenkinek" },
  "format_4247a9c5": { "message": "Formátum" },
  "formatting_5b143aa8": { "message": "Formázás" },
  "forward_slash_3f90f35e": { "message": "Perjel" },
  "found_auto_saved_content_3f6e4ca5": {
    "message": "Automatikusan mentett tartalmat találtunk"
  },
  "found_count_plural_0_results_one_result_other_resu_46aeaa01": {
    "message": "{ count, plural,\n     =0 {# eredmény}\n    one {# eredmény}\n  other {# eredmény}\n} található"
  },
  "fraction_41bac7af": { "message": "Tört" },
  "fullscreen_873bf53f": { "message": "Teljes képernyő" },
  "gamma_1767928": { "message": "Gamma" },
  "generating_preview_45b53be0": { "message": "Előnézet generálása... " },
  "gif_png_format_images_larger_than_size_kb_are_not__7af3bdbd": {
    "message": "A(z) { size } KB-nál nagyobb GIF/PNG formátumú képek jelenleg nem támogatottak."
  },
  "go_to_the_editor_s_menubar_e6674c81": {
    "message": "Ugrás a szerkesztő menüsorhoz"
  },
  "go_to_the_editor_s_toolbar_a5cb875f": {
    "message": "Ugrás a szerkesztő eszköztárhoz"
  },
  "grades_a61eba0a": { "message": "Értékelések" },
  "greater_than_e98af662": { "message": "Nagyobb, mint" },
  "greater_than_or_equal_b911949a": { "message": "Nagyobb, mint vagy egyenlő" },
  "greek_65c5b3f7": { "message": "Görög" },
  "green_15af4778": { "message": "Zöld" },
  "grey_a55dceff": { "message": "Szürke" },
  "group_documents_8bfd6ae6": { "message": "Csoport dokumentumok" },
  "group_files_4324f3df": { "message": "Csoportfájlok" },
  "group_files_82e5dcdb": { "message": "Csoportfájlok" },
  "group_images_98e0ac17": { "message": "Csoport képek" },
  "group_isomorphism_45b1458c": { "message": "Csoport izomorfizmus" },
  "group_link_63e626b3": { "message": "Csoport hivatkozás" },
  "group_links_9493129e": { "message": "Csoport hivatkozások" },
  "group_media_2f3d128a": { "message": "Csoport média" },
  "group_navigation_99f191a": { "message": "Csoportnavigáció" },
  "h_bar_bb94deae": { "message": "H Bár" },
  "hat_ea321e35": { "message": "Kalap" },
  "heading_2_5b84eed2": { "message": "Címsor 2" },
  "heading_3_2c83de44": { "message": "Címsor 3" },
  "heading_4_b2e74be7": { "message": "Címsor 4" },
  "health_icon_8d292eb5": { "message": "Egészségügyi ikon" },
  "hearts_suit_e50e04ca": { "message": "Kőr (kártyaszín)" },
  "height_69b03e15": { "message": "Magasság" },
  "hexagon_d8468e0d": { "message": "Hatszög" },
  "hide_description_bfb5502e": { "message": "Leírás elrejtése" },
  "hide_title_description_caf092ef": {
    "message": "A { title } leírásának elrejtése"
  },
  "home_351838cd": { "message": "Kezdőlap" },
  "html_code_editor_fd967a44": { "message": "html kódszerkesztő" },
  "html_editor_fb2ab713": { "message": "HTML szerkesztő" },
  "i_have_obtained_permission_to_use_this_file_6386f087": {
    "message": "Szereztem jogosultságot ennek a fájlnak a használatához."
  },
  "i_hold_the_copyright_71ee91b1": { "message": "Megtartom a szerzői jogot" },
  "icon_215a1dc6": { "message": "Ikon" },
  "icon_8168b2f8": { "message": "ikon" },
  "icon_color_b86dd6d6": { "message": "Ikon színe" },
  "icon_maker_icons_cc560f7e": { "message": "Ikon készítő ikonok" },
  "icon_options_7e32746e": { "message": "Ikon Opciók" },
  "icon_options_tray_2b407977": { "message": "Ikon Lehetőségek tálca" },
  "icon_preview_1782a1d9": { "message": "Ikon előnézet" },
  "icon_shape_30b61e7": { "message": "Ikon alakja" },
  "icon_size_9353edea": { "message": "Ikon mérete" },
  "if_left_empty_link_text_will_display_as_course_lin_61087540": {
    "message": "Ha üresen hagyja a hivatkozást, a szöveg kurzushivatkozás neveként jelenik meg"
  },
  "if_you_do_not_select_usage_rights_now_this_file_wi_14e07ab5": {
    "message": "Ha nem választja ki most a felhasználási jogokat, a fájl nem lesz publikálva a feltöltés után."
  },
  "image_8ad06": { "message": "Kép" },
  "image_c1c98202": { "message": "kép" },
  "image_options_5412d02c": { "message": "Képbeállítások" },
  "image_options_tray_90a46006": { "message": "Képbeállítások tálca" },
  "image_to_crop_3a34487d": { "message": "Kép kivágása" },
  "images_7ce26570": { "message": "Képek" },
  "imaginary_portion_of_complex_number_2c733ffa": {
    "message": "Képzelt rész (komplex szám)"
  },
  "in_element_of_19ca2f33": { "message": "Ebben" },
  "increase_indent_6af90f7c": { "message": "Behúzás növelése" },
  "indefinite_integral_6623307e": { "message": "Határozatlan Integrál" },
  "indigo_2035fc55": { "message": "Indigókék" },
  "inference_fed5c960": { "message": "Következtetés" },
  "infinity_7a10f206": { "message": "Végtelen" },
  "insert_593145ef": { "message": "Beszúrás" },
  "insert_link_6dc23cae": { "message": "Link beszúrása" },
  "insert_math_equation_57c6e767": {
    "message": "Matematikai képlet beszúrása"
  },
  "integers_336344e1": { "message": "Egész számok" },
  "intersection_cd4590e4": { "message": "Metszet" },
  "invalid_entry_f7d2a0f5": { "message": "Érvénytelen bejegyzés." },
  "invalid_file_c11ba11": { "message": "Érvénytelen fájl." },
  "invalid_file_type_881cc9b2": { "message": "Érvénytelen fájltípus" },
  "invalid_url_cbde79f": { "message": "Helytelen webcím" },
  "iota_11c932a9": { "message": "Iota" },
  "kappa_2f14c816": { "message": "Kappa" },
  "kappa_variant_eb64574b": { "message": "Kappa (változat)" },
  "keyboard_shortcuts_ed1844bd": { "message": "Billentyűparancsok" },
  "lambda_4f602498": { "message": "Lambda" },
  "language_arts_icon_a798b0f8": { "message": "Nyelv Művészetek Ikon" },
  "languages_icon_9d20539": { "message": "Nyelvek ikon" },
  "large_9c5e80e7": { "message": "Nagy" },
  "left_align_43d95491": { "message": "Balra igazítás" },
  "left_angle_bracket_c87a6d07": { "message": "Bal csúcsos zárójel" },
  "left_arrow_4fde1a64": { "message": "Bal nyíl" },
  "left_arrow_with_hook_5bfcad93": { "message": "Balra nyíl Horoggal" },
  "left_ceiling_ee9dd88a": { "message": "Bal kerekítés (felső)" },
  "left_curly_brace_1726fb4": { "message": "Bal kapcsos zárójel" },
  "left_downard_harpoon_arrow_1d7b3d2e": {
    "message": "Bal lefelé mutató szigonynyíl"
  },
  "left_floor_29ac2274": { "message": "Bal kerekítés (alsó)" },
  "left_to_right_e9b4fd06": { "message": "Balról jobbra" },
  "left_upward_harpoon_arrow_3a562a96": {
    "message": "Bal felfelé mutató szigonynyíl"
  },
  "leftward_arrow_1e4765de": { "message": "Balra mutató nyíl" },
  "leftward_pointing_triangle_d14532ce": {
    "message": "Balra mutató háromszög"
  },
  "less_than_a26c0641": { "message": "Kevesebb, mint" },
  "less_than_or_equal_be5216cb": { "message": "Kevesebb, mint vagy egyenlő" },
  "library_icon_ae1e54cf": { "message": "Könyvtár ikon" },
  "light_blue_5374f600": { "message": "Világoskék" },
  "link_7262adec": { "message": "Hivatkozás" },
  "link_options_a16b758b": { "message": "Link beállításai" },
  "links_14b70841": { "message": "Linkek" },
  "links_to_an_external_site_de74145d": {
    "message": "Linkek egy külső oldalra"
  },
  "load_more_35d33c7": { "message": "Továbbiak betöltése" },
  "loading_25990131": { "message": "Betöltés..." },
  "loading_bde52856": { "message": "Töltődik" },
  "loading_closed_captions_subtitles_failed_95ceef47": {
    "message": "a feliratok betöltése nem sikerült."
  },
  "loading_failed_b3524381": { "message": "Sikertelen betöltés..." },
  "loading_failed_e6a9d8ef": { "message": "Sikertelen betöltés." },
  "loading_folders_d8b5869e": { "message": "Mappák betöltése" },
  "loading_please_wait_d276220a": { "message": "Betöltés, kérjük, várjon" },
  "loading_preview_9f077aa1": { "message": "Előnézet betöltése" },
  "locked_762f138b": { "message": "Zárolva" },
  "logical_equivalence_76fca396": { "message": "Logikai ekvivalencia" },
  "logical_equivalence_short_8efd7b4f": {
    "message": "Logikai ekvivalencia (rövid)"
  },
  "logical_equivalence_short_and_thick_1e1f654d": {
    "message": "Logikai ekvivalencia (rövid és vastag)"
  },
  "logical_equivalence_thick_662dd3f2": {
    "message": "Logikai ekvivalencia (vastag)"
  },
  "low_horizontal_dots_cc08498e": { "message": "Alacsony vízszintes pontok" },
  "magenta_4a65993c": { "message": "Magenta" },
  "maps_to_e5ef7382": { "message": "Térképek ide" },
  "math_icon_ad4e9d03": { "message": "Matek ikon" },
  "media_af190855": { "message": "Média" },
  "media_file_is_processing_please_try_again_later_58a6d49": {
    "message": "A médiafájl feldolgozás alatt áll. Kérlek, próbáld újra később."
  },
  "medium_5a8e9ead": { "message": "Közepes" },
  "mic_a7f3d311": { "message": "Mikrofon" },
  "middle_27dc1d5": { "message": "Középső" },
  "minimize_file_preview_da911944": {
    "message": "Fájl előnézet méretének csökkentése"
  },
  "minimize_video_20aa554b": { "message": "Videó méretének csökkentése" },
  "minus_fd961e2e": { "message": "Mínusz" },
  "minus_plus_3461f637": { "message": "Mínusz/Plusz" },
  "misc_3b692ea7": { "message": "Egyéb" },
  "miscellaneous_e9818229": { "message": "Egyéb" },
  "modules_c4325335": { "message": "Modulok" },
  "mu_37223b8b": { "message": "Mu" },
  "multi_color_image_63d7372f": { "message": "Többszínű kép" },
  "multiplication_sign_15f95c22": { "message": "Szorzás jele" },
  "music_icon_4db5c972": { "message": "Zene Ikon" },
  "must_be_at_least_width_x_height_px_41dc825e": {
    "message": "Legalább { width } x { height } pixel szükséges"
  },
  "my_files_2f621040": { "message": "Fájljaim" },
  "n_th_root_9991a6e4": { "message": "N-edik gyök" },
  "nabla_1e216d25": { "message": "Nabla" },
  "name_1aed4a1b": { "message": "Név" },
  "natural_music_54a70258": { "message": "Természetes (zene)" },
  "natural_numbers_3da07060": { "message": "Természetes számok" },
  "navigate_through_the_menu_or_toolbar_415a4e50": {
    "message": "Navigáljon a menün vagy eszköztáron át"
  },
  "nested_greater_than_d852e60d": { "message": "Beágyazott nagyobb, mint" },
  "nested_less_than_27d17e58": { "message": "Beágyazott kevesebb, mint" },
  "next_40e12421": { "message": "Következő" },
  "no_changes_to_save_d29f6e91": { "message": "Nincs mentendő módosítás." },
  "no_e16d9132": { "message": "Nem" },
  "no_file_chosen_9a880793": { "message": "Nincs fájl kiválasztva" },
  "no_preview_is_available_for_this_file_f940114a": {
    "message": "Ehhez a fájlhoz nincs előnézet."
  },
  "no_results_940393cf": { "message": "Nincs eredmény." },
  "no_results_found_for_filterterm_ad1b04c8": {
    "message": "Nincs találat a követezőre: { filterTerm }"
  },
  "no_video_1ed00b26": { "message": "Nincs videó" },
  "none_3b5e34d2": { "message": "Nincs" },
  "none_selected_b93d56d2": { "message": "Egy sincs kiválasztva" },
  "not_equal_6e2980e6": { "message": "Nem egyenlő" },
  "not_in_not_an_element_of_fb1ffb54": {
    "message": "Nincs benne (nem egy eleme)"
  },
  "not_negation_1418ebb8": { "message": "Nem (tagadás)" },
  "not_subset_dc2b5e84": { "message": "Nem részhalmaz" },
  "not_subset_strict_23d282bf": { "message": "Nem részhalmaz (szigorú)" },
  "not_superset_5556b913": { "message": "Nem Superset" },
  "not_superset_strict_24e06f36": { "message": "Nem szuperkészlet (szigorú)" },
  "nu_1c0f6848": { "message": "Nu" },
  "octagon_e48be9f": { "message": "Nyolcszög" },
  "olive_6a3e4d6b": { "message": "Olajbogyó" },
  "omega_8f2c3463": { "message": "Omega" },
  "one_of_the_following_styles_must_be_added_to_save__1de769aa": {
    "message": "Az ikonok mentéséhez a következő stílusok egyikét kell hozzáadni: Ikon színe, Körvonal mérete, Ikon szövege vagy Kép"
  },
  "open_circle_e9bd069": { "message": "Nyitott kör" },
  "open_this_keyboard_shortcuts_dialog_9658b83a": {
    "message": "Nyissa meg a billentyűkombinációk párbeszédablakot"
  },
  "open_title_application_fd624fc5": {
    "message": "Nyissa meg a { title } alkalmazást"
  },
  "operators_a2ef9a93": { "message": "Műveletek" },
  "or_9b70ccaa": { "message": "Vagy" },
  "orange_81386a62": { "message": "Narancs" },
  "ordered_and_unordered_lists_cfadfc38": {
    "message": "Rendezett és Rendezetlen Listák"
  },
  "other_editor_shortcuts_may_be_found_at_404aba4a": {
    "message": "További szerkesztési billentyűparancsokat találhat a következő helyen"
  },
  "outline_color_3ef2cea7": { "message": "Vázlat színe" },
  "outline_size_a6059a21": { "message": "Vázlat mérete" },
  "p_is_not_a_valid_protocol_which_must_be_ftp_http_h_adf13fc2": {
    "message": "{ p } nem egy érvényes protokoll; lehet ftp, http, https, mailto, skype, tel, vagy esetleg elhagyható"
  },
  "pages_e5414c2c": { "message": "Oldalak" },
  "paragraph_5e5ad8eb": { "message": "Bekezdés" },
  "parallel_d55d6e38": { "message": "Párhuzamos" },
  "partial_derivative_4a9159df": { "message": "Részleges (származék)" },
  "paste_5963d1c1": { "message": "Beillesztés" },
  "pause_12af3bb4": { "message": "Szünet" },
  "pentagon_17d82ea3": { "message": "Pentagon" },
  "people_b4ebb13c": { "message": "Résztvevők" },
  "percentage_34ab7c2c": { "message": "Százalék" },
  "percentage_must_be_a_number_8033c341": {
    "message": "A százaléknak számnak kell lennie"
  },
  "performing_arts_icon_f3497486": { "message": "Előadóművészeti ikon" },
  "perpendicular_7c48ede4": { "message": "Merőleges" },
  "phi_4ac33b6d": { "message": "Phi" },
  "phi_variant_c9bb3ac5": { "message": "Phi (változat)" },
  "physical_education_icon_d7dffd3e": { "message": "Testnevelés ikon" },
  "pi_dc4f0bd8": { "message": "Pi" },
  "pi_variant_10f5f520": { "message": "Pi (változat)" },
  "pink_68ad45cb": { "message": "Rózsaszín" },
  "pixels_52ece7d1": { "message": "Pixelek" },
  "play_1a47eaa7": { "message": "Lejátszás" },
  "play_media_comment_35257210": { "message": "Média megjegyzés lejátszása." },
  "please_allow_canvas_to_access_your_microphone_and__dc2c3079": {
    "message": "Kérjük, engedélyezze, hogy a Canvas hozzáférhessen a mikrofonhoz és a webkamerához!"
  },
  "plus_d43cd4ec": { "message": "Plusz" },
  "plus_minus_f8be2e83": { "message": "Plusz minusz" },
  "posted_when_a578f5ab": { "message": "Közzétéve: { when }" },
  "power_set_4f26f316": { "message": "Hatványhalmaz" },
  "precedes_196b9aef": { "message": "Megelőzi" },
  "precedes_equal_20701e84": { "message": "Megelőzi az egyenlőt" },
  "preformatted_d0670862": { "message": "Előre formázott" },
  "prev_f82cbc48": { "message": "Előző" },
  "preview_53003fd2": { "message": "Előnézet" },
  "preview_a3f8f854": { "message": "ELŐNÉZET" },
  "preview_in_overlay_ed772c46": { "message": "Előnézet a fedvényben" },
  "preview_inline_9787330": { "message": "Soron belüli előnézet" },
  "prime_917ea60e": { "message": "Prím" },
  "prime_numbers_13464f61": { "message": "Prímszámok" },
  "product_39cf144f": { "message": "Szorzat" },
  "proportional_f02800cc": { "message": "Arányos" },
  "protocol_must_be_ftp_http_https_mailto_skype_tel_o_73beb4f8": {
    "message": "A protokoll lehet ftp, http, https, mailto, skype, tel, vagy esetleg elhagyható "
  },
  "psi_e3f5f0f7": { "message": "Psi" },
  "published_c944a23d": { "message": "publikált" },
  "published_when_302d8e23": { "message": "Publikálva: { when }" },
  "pumpkin_904428d5": { "message": "Sütőtök" },
  "purple_7678a9fc": { "message": "Lila" },
  "quaternions_877024e0": { "message": "Kvaterniók" },
  "quizzes_7e598f57": { "message": "Kvízek" },
  "rational_numbers_80ddaa4a": { "message": "Racionális számok" },
  "real_numbers_7c99df94": { "message": "Valós számok" },
  "real_portion_of_complex_number_7dad33b5": {
    "message": "Valódi rész (a komplex számból)"
  },
  "record_7c9448b": { "message": "Felvétel" },
  "record_upload_media_5fdce166": {
    "message": "Médiafájl rögzítése/feltöltése"
  },
  "recording_98da6bda": { "message": "Felvétel" },
  "red_8258edf3": { "message": "Vörös" },
  "relationships_6602af70": { "message": "Kapcsolatok" },
  "religion_icon_246e0be1": { "message": "Vallás ikon" },
  "remove_link_d1f2f4d0": { "message": "Link eltávolítása" },
  "replace_e61834a7": { "message": "Csere" },
  "reset_95a81614": { "message": "Visszaállítás" },
  "resize_ec83d538": { "message": "Átméretezés" },
  "restore_auto_save_deccd84b": {
    "message": "Visszaállítás automatikus mentésből?"
  },
  "reverse_turnstile_does_not_yield_7558be06": {
    "message": "Reverse Turnstile (Does Not Yield)"
  },
  "rho_a0244a36": { "message": "Rho" },
  "rho_variant_415245cd": { "message": "Rho (változat)" },
  "rich_content_editor_2708ef21": { "message": "Vizuális szövegszerkesztő" },
  "right_align_39e7a32a": { "message": "Jobbra igazítás" },
  "right_angle_bracket_d704e2d6": { "message": "Jobb csúcsos zárójel" },
  "right_arrow_35e0eddf": { "message": "Jobb nyíl" },
  "right_arrow_with_hook_29d92d31": { "message": "Jobbra Nyíl Horoggal" },
  "right_ceiling_839dc744": { "message": "Jobb kerekítés (felső)" },
  "right_curly_brace_5159d5cd": { "message": "Jobb kapcsos zárójel" },
  "right_downward_harpoon_arrow_d71b114f": {
    "message": "Jobbra lefelé mutató szigonynyíl"
  },
  "right_floor_5392d5cf": { "message": "Jobb kerekítés (alsó)" },
  "right_to_left_9cfb092a": { "message": "Jobbról balra" },
  "right_upward_harpoon_arrow_f5a34c73": {
    "message": "Jobb felfelé szigony nyíl"
  },
  "rightward_arrow_32932107": { "message": "Jobbra nyíl" },
  "rightward_pointing_triangle_60330f5c": {
    "message": "Jobbra mutató háromszög"
  },
  "rotate_image_90_degrees_2ab77c05": {
    "message": "Kép elforgatása -90 fokkal"
  },
  "rotate_image_90_degrees_6c92cd42": {
    "message": "Kép elforgatása 90 fokkal"
  },
  "rotation_9699c538": { "message": "Forgatás" },
  "sadly_the_pretty_html_editor_is_not_keyboard_acces_50da7665": {
    "message": "Sajnos a szép HTML-szerkesztő nem érhető el billentyűzettel. Itt érheti el a nyers HTML-szerkesztőt."
  },
  "save_11a80ec3": { "message": "Mentés" },
  "saved_icon_maker_icons_df86e2a1": { "message": "Mentett Icon Maker ikonok" },
  "script_l_42a7b254": { "message": "Script L" },
  "search_280d00bd": { "message": "Keresés" },
  "select_crop_shape_d441feeb": { "message": "Válassza ki a kivágás alakját" },
  "select_language_7c93a900": { "message": "Válasszon nyelvet" },
  "selected_linkfilename_c093b1f2": {
    "message": "Kijelölve: { linkFileName }"
  },
  "set_minus_b46e9b88": { "message": "Mínusz beállítása" },
  "sharp_music_ab956814": { "message": "Kettőskereszt (zene)" },
  "shift_o_to_open_the_pretty_html_editor_55ff5a31": {
    "message": "Shift-O a szép html-szerkesztő megnyitásához."
  },
  "show_audio_options_b489926b": { "message": "Hangbeállítások megjelenítése" },
  "show_image_options_1e2ecc6b": { "message": "Képbeállítások mutatása" },
  "show_link_options_545338fd": { "message": "Linkbeállítások mutatása" },
  "show_video_options_6ed3721a": { "message": "Videóbeállítások mutatása" },
  "sigma_5c35e553": { "message": "Sigma" },
  "sigma_variant_8155625": { "message": "Sigma (változat)" },
  "single_color_image_4e5d4dbc": { "message": "Egyszínű kép" },
  "single_color_image_color_95fa9a87": { "message": "Egyszínű kép színe" },
  "size_b30e1077": { "message": "Méret" },
  "small_b070434a": { "message": "Kicsi" },
  "solid_circle_9f061dfc": { "message": "Kitöltött kör" },
  "something_went_wrong_89195131": { "message": "Hiba történt!" },
  "something_went_wrong_and_i_don_t_know_what_to_show_e0c54ec8": {
    "message": "Hiba történt! Nem tudom, mit mutassak."
  },
  "something_went_wrong_check_your_connection_reload__c7868286": {
    "message": "Valami elromlott. Ellenőrizze a kapcsolatot, töltse be újra az oldalt, és próbálja újra."
  },
  "something_went_wrong_d238c551": { "message": "Hiba történt!" },
  "sorry_we_don_t_support_multiple_files_fb9478b0": {
    "message": "Sajnáljuk, nem támogatunk több fájlt."
  },
  "sort_by_e75f9e3e": { "message": "Rendezés alapja" },
  "spades_suit_b37020c2": { "message": "Treff (kártyszín)" },
  "square_511eb3b3": { "message": "Négyzet" },
  "square_cap_9ec88646": { "message": "Négyzet alakú sapka" },
  "square_cup_b0665113": { "message": "Négyzetes kupa" },
  "square_root_e8bcbc60": { "message": "Négyzetgyök" },
  "square_root_symbol_d0898a53": { "message": "Négyzetgyök szimbólum" },
  "square_subset_17be67cb": { "message": "Négyzetes részhalmaz (szigorú)" },
  "square_subset_strict_7044e84f": {
    "message": "Négyzetes részhalmaz (szigorú)"
  },
  "square_superset_3be8dae1": { "message": "Négyzetes csoporthalmaz" },
  "square_superset_strict_fa4262e4": {
    "message": "Négyzetes csoporthalmaz (szigorú)"
  },
  "square_unordered_list_b15ce93b": {
    "message": "rendezetlen lista négyzetekkel"
  },
  "star_8d156e09": { "message": "Csillagozás" },
  "start_over_f7552aa9": { "message": "Újrakezdés" },
  "start_recording_9a65141a": { "message": "Felvétel elkezdése" },
  "steel_blue_14296f08": { "message": "Acélkék" },
  "styles_2aa721ef": { "message": "Stílusok" },
  "submit_a3cc6859": { "message": "Beküldés" },
  "subscript_59744f96": { "message": "alsó index" },
  "subset_19c1a92f": { "message": "Részhalmaz" },
  "subset_strict_8d8948d6": { "message": "részhalmaz (szigorú)" },
  "succeeds_9cc31be9": { "message": "Sikerül" },
  "succeeds_equal_158e8c3a": { "message": "Siker egyenlő" },
  "sum_b0842d31": { "message": "Összeg" },
  "superscript_8cb349a2": { "message": "felső index" },
  "superscript_and_subscript_37f94a50": {
    "message": "Felső index és alsó index"
  },
  "superset_c4db8a7a": { "message": "Csoporthalmaz" },
  "superset_strict_c77dd6d2": { "message": "Csoporthalmaz (szigorú)" },
  "supported_file_types_srt_or_webvtt_7d827ed": {
    "message": "Támogatott fájltípusok: SRT vagy WebVTT"
  },
  "switch_to_pretty_html_editor_a3cee15f": {
    "message": "Váltson a szép HTML-szerkesztőre"
  },
  "switch_to_raw_html_editor_f970ae1a": {
    "message": "Váltson a nyers HTML-szerkesztőre"
  },
  "switch_to_the_html_editor_146dfffd": {
    "message": "Váltson át a html szerkesztőre"
  },
  "switch_to_the_rich_text_editor_63c1ecf6": {
    "message": "Váltson a rich text szerkesztőre"
  },
  "syllabus_f191f65b": { "message": "Tematika" },
  "tab_arrows_4cf5abfc": { "message": "Tab/Nyilak" },
  "tau_880974b7": { "message": "Tau" },
  "teal_f729a294": { "message": "Kékeszöld" },
  "text_7f4593da": { "message": "Szöveg" },
  "text_background_color_16e61c3f": { "message": "Szöveg háttérszíne" },
  "text_color_acf75eb6": { "message": "Szöveg szín" },
  "text_optional_384f94f7": { "message": "Szöveg (nem kötelező)" },
  "text_position_8df8c162": { "message": "Szöveg pozíciója" },
  "text_size_887c2f6": { "message": "Szövegméret" },
  "the_document_preview_is_currently_being_processed__7d9ea135": {
    "message": "A dokumentum előnézete feldolgozás alatt. Kérjük, próbálja újra később."
  },
  "the_following_content_is_partner_provided_ed1da756": {
    "message": "A következő tartalmat partner biztosítja"
  },
  "the_material_is_in_the_public_domain_279c39a3": {
    "message": "Az anyag a közkincs kategóriába tartozik"
  },
  "the_material_is_licensed_under_creative_commons_3242cb5e": {
    "message": "Ezt az anyagot Creative Commons licenc alatt tették közzé."
  },
  "the_material_is_subject_to_an_exception_e_g_fair_u_a39c8ca2": {
    "message": "Az anyag kivételt képez- pl. tisztességes felhasználás, árajánlási jog vagy mások a vonatkozó szerzői jogi törvények alapján"
  },
  "the_preceding_content_is_partner_provided_d753928c": {
    "message": "Az előző tartalmat partner biztosítja"
  },
  "the_pretty_html_editor_is_not_keyboard_accessible__d6d5d2b": {
    "message": "A szép html-szerkesztő nem érhető el billentyűzettel. Nyomja meg a Shift O billentyűt a nyers html szerkesztő megnyitásához."
  },
  "therefore_d860e024": { "message": "Ezért" },
  "theta_ce2d2350": { "message": "Theta" },
  "theta_variant_fff6da6f": { "message": "Theta (változat)" },
  "thick_downward_arrow_b85add4c": { "message": "Vastag Lefelé nyíl" },
  "thick_left_arrow_d5f3e925": { "message": "Vastag bal nyíl" },
  "thick_leftward_arrow_6ab89880": { "message": "Vastag balra nyíl" },
  "thick_right_arrow_3ed5e8f7": { "message": "Vastag jobbra nyíl" },
  "thick_rightward_arrow_a2e1839e": { "message": "Vastag jobbra nyíl" },
  "thick_upward_arrow_acd20328": { "message": "Vastag Felfelé nyíl" },
  "this_document_cannot_be_displayed_within_canvas_7aba77be": {
    "message": "Ezt a dokumentumot nem lehet megtekinteni a Canvasban. "
  },
  "this_equation_cannot_be_rendered_in_basic_view_9b6c07ae": {
    "message": "Ezt az egyenletet nem lehet megjeleníteni alapnézetben."
  },
  "this_image_is_currently_unavailable_25c68857": {
    "message": "Ez a kép jelenleg nem érhető el"
  },
  "though_your_video_will_have_the_correct_title_in_t_90e427f3": {
    "message": "Bár a videója a megfelelő címmel jelenik majd meg a böngészőben, az adatbázisban nem sikerült frissíteni."
  },
  "title_ee03d132": { "message": "Cím" },
  "to_be_posted_when_d24bf7dc": { "message": "Időzített közzététel: { when }" },
  "to_do_when_2783d78f": { "message": "Teendő : { when }" },
  "toggle_tooltip_d3b7cb86": { "message": "Eszköztipp váltása" },
  "tools_2fcf772e": { "message": "Eszközök" },
  "top_66e0adb6": { "message": "Top" },
  "tray_839df38a": { "message": "Tálca" },
  "triangle_6072304e": { "message": "Háromszög" },
  "turnstile_yields_f9e76df1": { "message": "Forgóajtó (hozamok)" },
  "type_control_f9_to_access_image_options_text_a47e319f": {
    "message": "Nyomjon Control F9-et a kép opciók eléréséhez { text }"
  },
  "type_control_f9_to_access_link_options_text_4ead9682": {
    "message": "Nyomjon Control F9-et a link opciók eléréséhez { text }"
  },
  "type_control_f9_to_access_table_options_text_92141329": {
    "message": "Nyomjon Control F9-et a táblázat opciók eléréséhez { text }"
  },
  "union_e6b57a53": { "message": "Unió" },
  "unpublished_dfd8801": { "message": "nem publikált" },
  "untitled_16aa4f2b": { "message": "Cím nélküli" },
  "untitled_efdc2d7d": { "message": "névtelen" },
  "up_and_left_diagonal_arrow_e4a74a23": {
    "message": "Fel és Balra Átlós Nyíl"
  },
  "up_and_right_diagonal_arrow_935b902e": {
    "message": "Felfelé és Jobbra Átlós Nyíl"
  },
  "up_c553575d": { "message": "Fel" },
  "upload_document_253f0478": { "message": "Dokumentum feltöltése" },
  "upload_file_fd2361b8": { "message": "Fájl feltöltése" },
  "upload_image_6120b609": { "message": "Kép feltöltése" },
  "upload_media_ce31135a": { "message": "Médiafájl feltöltése" },
  "upload_record_media_e4207d72": { "message": "Média feltöltés/rögzítés" },
  "uploading_19e8a4e7": { "message": "Feltöltés" },
  "uppercase_alphabetic_ordered_list_3f5aa6b2": {
    "message": "nagybetűs lista abc sorrendbe rendezve"
  },
  "uppercase_delta_d4f4bc41": { "message": "Delta nagybetűvel" },
  "uppercase_gamma_86f492e9": { "message": "Gamma nagybetűvel" },
  "uppercase_lambda_c78d8ed4": { "message": "Nagybetűs Lambda" },
  "uppercase_omega_8aedfa2": { "message": "Nagy Omega" },
  "uppercase_phi_caa36724": { "message": "nagybetűs Phi" },
  "uppercase_pi_fcc70f5e": { "message": "Nagy Pi" },
  "uppercase_psi_6395acbe": { "message": "Nagy Psi" },
  "uppercase_roman_numeral_ordered_list_853f292b": {
    "message": "nagybetűs lista római számok szerint rendezve"
  },
  "uppercase_sigma_dbb70e92": { "message": "Nagy Sigma" },
  "uppercase_theta_49afc891": { "message": "Theta nagybetűvel" },
  "uppercase_upsilon_8c1e623e": { "message": "Upsilon nagybetűvel" },
  "uppercase_xi_341e8556": { "message": "Xi nagybetűvel" },
  "upsilon_33651634": { "message": "Upsilon" },
  "upward_and_downward_pointing_arrow_fa90a918": {
    "message": "Felfelé és Lefelé mutató nyíl"
  },
  "upward_and_downward_pointing_arrow_thick_d420fdef": {
    "message": "Felfelé és lefelé mutató nyíl (vastag)"
  },
  "upward_arrow_9992cb2d": { "message": "Felfelé mutató nyíl" },
  "upward_pointing_triangle_d078d7cb": {
    "message": "Felfelé mutató háromszög"
  },
  "url_22a5f3b8": { "message": "URL" },
  "usage_right_ff96f3e2": { "message": "Felhasználási jog:" },
  "usage_rights_required_5fe4dd68": {
    "message": "Felhasználási jogok (kötelező)"
  },
  "use_arrow_keys_to_navigate_options_2021cc50": {
    "message": "Használja a nyíl billentyűket az opció kiválasztására!"
  },
  "use_arrow_keys_to_select_a_shape_c8eb57ed": {
    "message": "A nyílbillentyűkkel válasszon ki egy alakzatot."
  },
  "use_arrow_keys_to_select_a_size_699a19f4": {
    "message": "Használja a nyílbillentyűket a méret kiválasztásához."
  },
  "use_arrow_keys_to_select_a_text_position_72f9137c": {
    "message": "A nyílbillentyűkkel válassza ki a szöveg pozícióját."
  },
  "use_arrow_keys_to_select_a_text_size_65e89336": {
    "message": "A nyílbillentyűkkel válassza ki a szöveg méretét."
  },
  "use_arrow_keys_to_select_an_outline_size_e009d6b0": {
    "message": "A nyílbillentyűkkel válassza ki a körvonal méretét."
  },
  "used_by_screen_readers_to_describe_the_content_of__4f14b4e4": {
    "message": "A képernyőolvasók egy { TYPE } tartalmának leírására használják"
  },
  "used_by_screen_readers_to_describe_the_content_of__b1e76d9e": {
    "message": "Képernyőolvasók által egy kép tartalmának leírásához használt szöveg"
  },
  "used_by_screen_readers_to_describe_the_video_37ebad25": {
    "message": "Képernyőolvasók által a videó leírásához használt szöveg"
  },
  "user_documents_c206e61f": { "message": "A felhasználó dokumentumai" },
  "user_files_78e21703": { "message": "A felhasználó fájlai" },
  "user_images_b6490852": { "message": "A felhsználó képei" },
  "user_media_14fbf656": { "message": "A felhasználó médiafájljai" },
  "vector_notation_cf6086ab": { "message": "Vektor (jelölés)" },
  "vertical_bar_set_builder_notation_4300495f": {
    "message": "Függőleges sáv (Set Builder Notation)"
  },
  "vertical_dots_bfb21f14": { "message": "Függőleges pontok" },
  "video_options_24ef6e5d": { "message": "Videóbeállítások" },
  "video_options_tray_3b9809a5": { "message": "Videóbeállítások tálca" },
  "video_player_b371005": { "message": "Videólejátszó" },
  "video_player_for_9e7d373b": { "message": "Audio lejátszó ehhez" },
  "video_player_for_title_ffd9fbc4": {
    "message": "Videólejátszó ehhez: { title }"
  },
  "view_ba339f93": { "message": "Megtekintés" },
  "view_description_30446afc": { "message": "Leírás megtekintése" },
  "view_keyboard_shortcuts_34d1be0b": {
    "message": "A gyors elérés billentyűkombinációk megtekintése"
  },
  "view_title_description_67940918": {
    "message": "Tekintse meg a { title } leírását"
  },
  "webcam_fe91b20f": { "message": "Webkamera" },
  "white_87fa64fd": { "message": "fehér" },
  "width_492fec76": { "message": "Szélesség" },
  "width_and_height_must_be_numbers_110ab2e3": {
    "message": "A szélességnek és a magasságnak számnak kell lenni"
  },
  "width_x_height_px_ff3ccb93": { "message": "{ width } x { height } pixel" },
  "wiki_home_9cd54d0": { "message": "Wiki kezdőlap" },
  "wreath_product_200b38ef": { "message": "Koszorú termék" },
  "xi_149681d0": { "message": "Xi" },
  "yes_dde87d5": { "message": "Igen" },
  "you_have_unsaved_changes_in_the_icon_maker_tray_do_e8cf5f1b": {
    "message": "Nem mentett módosítások vannak az Ikonkészítő tálcán. Folytatja a változtatások mentése nélkül?"
  },
  "you_may_not_upload_an_empty_file_11c31eb2": {
    "message": "Nem tölthet fel egy üres fájlt."
  },
  "your_webcam_may_already_be_in_use_6cd64c25": {
    "message": "Úgy tűnik a webkamera már használatban van."
  },
  "zeta_5ef24f0e": { "message": "Zeta" },
  "zoom_f3e54d69": { "message": "Zoomolás" },
  "zoom_in_image_bb97d4f": { "message": "Kép nagyítása" },
  "zoom_out_image_d0a0a2ec": { "message": "Kép kicsinyítése" }
}


formatMessage.addLocale({hu: locale})
