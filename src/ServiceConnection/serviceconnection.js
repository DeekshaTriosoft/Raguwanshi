import axios from "axios";

const appauth_key = "Rahuwanshi@2029";
// let APL_LINK = "http://192.168.1.17:8000"; // Actual link
let APL_LINK = "http://192.168.1.9:8000"; // shivam sir link
// APL_LINK = "https://api.raghuvanshihall.com";
let Website_URL = "https://www.raghuvanshihall.com/";
let local_server_link_react = APL_LINK + "/api/auth/v1/";
let local_server_link_website = APL_LINK + "/api/website_link/";
// let feedback_online_link = "https://www.wowreviews.co/Adminmaster/";

/**admin panel */
const login_to_superadmin = local_server_link_react + "admin_Login_View/";
const save_update_blog = local_server_link_react + "add_blogs/";
const get_all_blogs = local_server_link_react + "Get_All_Blogs/";
const save_update_seo = local_server_link_react + "save_update_seo/";
const update_assign_staff = local_server_link_react + "update_assign_staff/";
const get_all_seo = local_server_link_react + "get_all_seo/";
const save_update_imagelink =
  local_server_link_react + "Add_Image_data/";
const get_all_imagelink = local_server_link_react + "Get_image_data/";
const Delete_Image_data = local_server_link_react + "Delete_Image_data/";
const save_update_menu = local_server_link_react + "save_update_menu/";
const get_all_menu = local_server_link_react + "get_all_menu/";
const save_update_website_data =
  local_server_link_react + "save_update_website_data/";
const get_all_website_data = local_server_link_react + "get_all_website_data/";
const save_update_silder_image =
  local_server_link_react + "save_update_silder_image/";
const get_all_slider_image = local_server_link_react + "get_all_slider_image/";
const delete_update_data = local_server_link_react + "Delete_blog/";
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
const get_all_home_front = local_server_link_website + "get_all_home_front/";
const get_all_home_gallery =
  local_server_link_website + "get_all_home_gallery/";
const seo_data_url = local_server_link_website + "get_seo_data/";
const get_blog_details_url =
  local_server_link_website + "get_blog_details_url/";

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
  Delete_Image_data,
  save_update_menu,
  get_all_menu,
  save_update_website_data,
  get_all_website_data,
  save_update_silder_image,
  get_all_slider_image,
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
  get_all_home_front,
  seo_data_url,
  get_all_home_gallery,
  get_blog_details_url,
  /**Website  panel */
};
