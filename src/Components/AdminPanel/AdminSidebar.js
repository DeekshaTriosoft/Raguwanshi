import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  handleLinkClick,
  handleError,
} from "../../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  get_userright_data,
} from "../../ServiceConnection/serviceconnection.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
function AdminSidebar() {
  const location = useLocation();
  const currentUrl = location.pathname;
  const retrievedAdminId = retrieveData("staff_id");
  const retrievedAdminProfession = retrieveData("admin_profession");
  const [editBlogData, seteditBlogData] = useState([]);
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const master_data_get = async (start_date, end_date, flag, call_id) => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("admin_id", retrievedAdminId);
    fd.append("start_date", start_date);
    fd.append("end_date", end_date);
    fd.append("flag", flag);
    fd.append("call_id", call_id);
    await server_post_data(get_userright_data, fd)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          console.log(Response.data.message.seo_loop);
          seteditBlogData(Response.data.message.seo_loop);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  useEffect(() => {
    const url = currentUrl;
    const parts = url.split("/");
    if (parts.length !== 1) {
      const start_date = "";
      const end_date = "";
      const flag = "1";
      const call_id = parts[1];
      master_data_get(start_date, end_date, flag, call_id);
    }
  }, []);

  const match_and_return_seo_link = (data_seo_link_final) => {
    let data_seo_link = false;
    if (editBlogData) {
      const matchedItem = editBlogData.find(
        (data) => data_seo_link_final === data.fun_url
      );

      if (matchedItem) {
        data_seo_link = true;
      }
    }

    return data_seo_link;
  };

  return (
    <div className="app-sidebar sidebar-shadow">
      <div class="app-header__logo">
        <div class="logo-src"></div>
        <div class="header__pane ml-auto">
          <div>
            <button
              type="button"
              class="hamburger close-sidebar-btn hamburger--elastic"
              data-class="closed-sidebar"
            >
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="app-header__mobile-menu">
        <div>
          <button
            type="button"
            class="hamburger hamburger--elastic mobile-toggle-nav"
          >
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
      <div class="app-header__menu">
        <span>
          <button
            type="button"
            class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
          >
            <span class="btn-icon-wrapper">
              <i class="fa fa-ellipsis-v fa-w-6"></i>
            </span>
          </button>
        </span>
      </div>
      <div class="scrollbar-sidebar ps ps--active-y">
        <div class="app-sidebar__inner">
          <ul class="vertical-nav-menu metismenu"><ul
              
              >
                  <li>
                    <Link
                      onClick={() => handleLinkClick("/imageDashboardView")}
                      className={
                        currentUrl.toLowerCase() ===
                          "/imageDashboardView".toLowerCase() ||
                        currentUrl.toLowerCase() ===
                          "/ImageDashboardAdd".toLowerCase() ||
                        currentUrl
                          .toLowerCase()
                          .includes("/BlogDashboardEdit".toLowerCase())
                          ? "mm-active"
                          : ""
                      }
                    >
                      <i class="metismenu-icon"></i>
                      Image Links
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => handleLinkClick("/BlogDashboardView")}
                      className={
                        currentUrl.toLowerCase() ===
                          "/BlogDashboardView".toLowerCase() ||
                        currentUrl.toLowerCase() ===
                          "/BlogDashboardAdd".toLowerCase() ||
                        currentUrl
                          .toLowerCase()
                          .includes("/BlogDashboardEdit".toLowerCase())
                          ? "mm-active"
                          : ""
                      }
                    >
                      <i class="metismenu-icon"></i>
                      Blogs
                    </Link>
                  </li>
    
                  <li>
                    <Link
                      onClick={() => handleLinkClick("/SeoDashboardView")}
                      className={
                        currentUrl.toLowerCase() ===
                          "/SeoDashboardView".toLowerCase() ||
                        currentUrl.toLowerCase() ===
                          "/SeoDashboardAdd".toLowerCase() ||
                        currentUrl
                          .toLowerCase()
                          .includes("/SeoDashboardEdit".toLowerCase())
                          ? "mm-active"
                          : ""
                      }
                    >
                      <i class="metismenu-icon"></i>
                      Seo Section
                    </Link>
                  </li>
  
              </ul>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
