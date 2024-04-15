import axios from "axios";

const appauth_key = "Rahuwanshi@2029";
let APL_LINK = "http://192.168.1.17:8000";
APL_LINK = "https://api.raghuvanshihall.com";
let Website_URL = "https://www.raghuvanshihall.com/";
let local_server_link_react = APL_LINK + "/api/admin_link/";
let local_server_link_website = APL_LINK + "/api/website_link/";
let feedback_online_link = "https://www.wowreviews.co/Adminmaster/";

/**admin panel */
const login_to_superadmin = local_server_link_react + "login_to_superadmin/";
const save_update_blog = local_server_link_react + "save_update_blog/";
const get_all_blogs = local_server_link_react + "get_all_blogs/";
const save_update_seo = local_server_link_react + "save_update_seo/";
const update_assign_staff = local_server_link_react + "update_assign_staff/";
const get_all_seo = local_server_link_react + "get_all_seo/";
const save_update_imagelink =
  local_server_link_react + "save_update_imagelink/";
const get_all_imagelink = local_server_link_react + "get_all_imagelink/";
const save_update_menu = local_server_link_react + "save_update_menu/";
const get_all_menu = local_server_link_react + "get_all_menu/";
const save_update_website_data =
  local_server_link_react + "save_update_website_data/";
const get_all_website_data = local_server_link_react + "get_all_website_data/";
const get_all_subscribe = local_server_link_react + "get_all_subscribe/";
const save_update_testimonial =
  local_server_link_react + "save_update_testimonial/";
const get_all_testimonial = local_server_link_react + "get_all_testimonial/";
const save_update_team = local_server_link_react + "save_update_team/";
const get_all_team = local_server_link_react + "get_all_team/";
const save_update_silder_image =
  local_server_link_react + "save_update_silder_image/";
const get_all_slider_image = local_server_link_react + "get_all_slider_image/";
const save_update_hall = local_server_link_react + "save_update_hall/";
const get_all_hall = local_server_link_react + "get_all_hall/";
const save_update_landmark = local_server_link_react + "save_update_landmark/";
const get_all_landmark = local_server_link_react + "get_all_landmark/";
const save_update_event_timing =
  local_server_link_react + "save_update_event_timing/";
const get_all_event_timing = local_server_link_react + "get_all_event_timing/";

const save_update_event_listing =
  local_server_link_react + "save_update_event_listing/";
const get_all_event_listing =
  local_server_link_react + "get_all_event_listing/";
const save_update_gallerywebsite =
  local_server_link_react + "save_update_gallerywebsite/";
const get_all_gallerywebsite =
  local_server_link_react + "get_all_gallerywebsite/";
const get_all_staff = local_server_link_react + "get_all_staff/";
const save_update_staff = local_server_link_react + "save_update_staff/";
const save_update_main_lead =
  local_server_link_react + "save_update_main_lead/";
const get_all_main_lead = local_server_link_react + "get_all_main_lead/";

const save_again_date_remark =
  local_server_link_react + "save_again_date_remark/";
const confirm_enquiry = local_server_link_react + "confirm_enquiry/";
const get_all_customer_booking =
  local_server_link_react + "get_all_customer_booking/";
const save_amount_pay_remaing =
  local_server_link_react + "save_amount_pay_remaing/";
const delete_update_data = local_server_link_react + "delete_master_data/";
const feedback_online_link_main = feedback_online_link + "bad_bus_search_api";

const admin_dashboard_url = local_server_link_react + "admin_dashboard_url/";
const get_all_usermaster = local_server_link_react + "get_all_usermaster/";
const save_update_usermaster =
  local_server_link_react + "save_update_usermaster/";
const save_assign_rights = local_server_link_react + "save_assign_rights/";
const get_userright_data = local_server_link_react + "get_userright_data/";
const get_all_leads = local_server_link_react + "get_all_leads/";
/**admin  panel */

/**Website Panel */
const save_subscribe = local_server_link_website + "save_subscribe/";
const get_all_booking_data =
  local_server_link_website + "get_all_booking_data/";
const save_enquiry_website =
  local_server_link_website + "save_enquiry_website/";
const get_all_home_front = local_server_link_website + "get_all_home_front/";
const get_all_home_gallery =
  local_server_link_website + "get_all_home_gallery/";
const seo_data_url = local_server_link_website + "get_seo_data/";
const get_blog_details_url =
  local_server_link_website + "get_blog_details_url/";
const get_all_home_about = local_server_link_website + "get_all_home_about/";
/**Website  panel */

// Retrieving data
const server_post_data = async (url_for, form_data) => {
  // const headers = {
  //   "Content-Type": "application/json",
  // };

  if (form_data === null) {
    form_data = new FormData();
  }

  form_data.append("appauth_key", appauth_key);
  form_data.append("res_name", "10099");
  return axios.post(url_for, form_data);
};

export {
  APL_LINK,
  Website_URL,
  appauth_key,
  server_post_data,

  /*Admin api */
  login_to_superadmin,
  save_update_blog,
  get_all_blogs,
  delete_update_data,
  save_update_seo,
  get_all_seo,
  save_update_imagelink,
  get_all_imagelink,
  save_update_menu,
  get_all_menu,
  save_update_website_data,
  get_all_website_data,
  save_update_testimonial,
  get_all_testimonial,
  save_update_team,
  get_all_team,
  get_all_subscribe,
  save_update_silder_image,
  get_all_slider_image,
  save_update_hall,
  get_all_hall,
  save_update_event_timing,
  get_all_event_timing,
  save_update_event_listing,
  get_all_event_listing,
  save_update_gallerywebsite,
  get_all_gallerywebsite,
  save_update_staff,
  get_all_staff,
  get_all_main_lead,
  save_update_main_lead,
  save_again_date_remark,
  confirm_enquiry,
  get_all_customer_booking,
  save_amount_pay_remaing,
  feedback_online_link_main,
  save_update_landmark,
  get_all_landmark,
  admin_dashboard_url,
  get_all_usermaster,
  save_update_usermaster,
  save_assign_rights,
  get_userright_data,
  update_assign_staff,
  get_all_leads,
  /*Admin api */
  /**Website  panel */
  save_subscribe,
  get_all_booking_data,
  save_enquiry_website,
  get_all_home_front,
  seo_data_url,
  get_all_home_gallery,
  get_all_home_about,
  get_blog_details_url,
  /**Website  panel */
};
