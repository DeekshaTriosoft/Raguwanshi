import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar.js";
import AdminFooter from "./AdminFooter.js";
import AdminHeader from "./AdminHeader.js";
import {
  server_post_data,
  save_update_website_data,
  get_all_website_data,
} from "../../ServiceConnection/serviceconnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleEmailChange,
  handleIaphabetnumbercommaChange,
  handleNumbersChange,
  handleURLChange,
  handleSuccess,
  handleError,
} from "../../CommonJquery/CommonJquery.js";
import { useLocation, Link } from "react-router-dom";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
function WebsiteDashboardAdd() {
  const location = useLocation();
  const currentUrl = location.pathname.substring(1);
  const [editorDataMainID, setEditorDatMainID] = useState("0");
  const [editBlogData, seteditBlogData] = useState([]);
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const retrievedAdminId = retrieveData("staff_id");
  useEffect(() => {
    const start_date = "";
    const end_date = "";
    const flag = "3";
    const call_id = "0";
    master_data_get(start_date, end_date, flag, call_id);
  }, []);

  const master_data_get = async (start_date, end_date, flag, call_id) => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("admin_id", retrievedAdminId);
    fd.append("start_date", start_date);
    fd.append("end_date", end_date);
    fd.append("flag", flag);
    fd.append("call_id", call_id);
    await server_post_data(get_all_website_data, fd)
      .then((Response) => {
        console.log(Response.data);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          seteditBlogData(Response.data.message.data_website[0]);
          setEditorDatMainID(Response.data.message.data_website[0].primary_id);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    if (vaild_data) {
      setshowLoaderAdmin(true);
      let fd_from = combiled_form_data(form_data, null);
      fd_from.append("admin_id", retrievedAdminId);
      fd_from.append("main_id", editorDataMainID);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          console.log(Response.data.message);
          setshowLoaderAdmin(false);
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
            handleSuccess(Response.data.message);
            if (editorDataMainID === "0") {
              empty_form(form_data);
            }
          }
        })
        .catch((error) => {
          setshowLoaderAdmin(false);
        });
    }
  };

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-header">
      <div className={showLoaderAdmin ? "loading_website" : ""}></div>
      <AdminHeader />

      <div className="app-main">
        <AdminSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div className="app-page-title">
              <div className="page-title-wrapper">
                <div className="page-title-heading">
                  <Link to="/admindashboard">
                    <div className="page-title-icon">
                      <i className="fa fa-home icon-gradient bg-mean-fruit"></i>
                    </div>
                  </Link>
                  <div>
                    Website Management &gt; Website Info
                    <div className="page-title-subheading">
                      Add and Edit Website
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-card mb-3 card">
              <div className="card-body">
                <h5 className="card-title">Add/Edit Website Address</h5>
                <form className="needs-validation" id="CarrerformData">
                  <div className="form-row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="validationCustom01">
                        Website Contact Number
                        <span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="website_contact_no_first"
                        id="website_contact_no_first"
                        maxLength={12}
                        onInput={handleNumbersChange}
                        placeholder="Enter Website Contact 1"
                        defaultValue={
                          editBlogData.website_contact_no_first || ""
                        }
                      />
                      <span className="condition_error"></span>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="validationCustom01">
                        Website Alternate Contact Number
                        <span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="website_contact_no_second"
                        id="website_contact_no_second"
                        maxLength={12}
                        onInput={handleNumbersChange}
                        placeholder="Enter Website Contact 2"
                        defaultValue={
                          editBlogData.website_contact_no_second || ""
                        }
                      />
                      <span className="condition_error"></span>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="validationCustom01">
                        Website Email Address<span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control trio_email  trio_mandatory"
                        name="website_email"
                        id="website_email"
                        maxLength={120}
                        onInput={handleEmailChange}
                        placeholder="Enter Website Email"
                        defaultValue={editBlogData.website_email || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label htmlFor="validationCustom01">
                        Website Address<span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="website_address"
                        id="website_address"
                        maxLength={100}
                        onInput={handleIaphabetnumbercommaChange}
                        placeholder="Enter Website Address"
                        defaultValue={editBlogData.website_address || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">
                        FaceBook link (Only paste)
                        <span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="website_facebook_link"
                        id="website_facebook_link"
                        onInput={handleURLChange}
                        placeholder="Enter FaceBook link (Only paste)"
                        defaultValue={editBlogData.website_facebook_link || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">
                        Instagram link (Only paste)
                        <span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="website_instagram_link"
                        id="website_instagram_link"
                        onInput={handleURLChange}
                        placeholder="Enter Instagram link (Only paste)"
                        defaultValue={editBlogData.website_instagram_link || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">
                        Pinterest link (Only paste)
                        <span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="website_pinterest_link"
                        id="website_pinterest_link"
                        onInput={handleURLChange}
                        placeholder="Enter Pinterest link (Only paste)"
                        defaultValue={editBlogData.website_pinterest_link || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">
                        Youtube link (Only paste)
                        <span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="website_youtube_link"
                        id="website_youtube_link"
                        onInput={handleURLChange}
                        placeholder="Enter Youtube link (Only paste)"
                        defaultValue={editBlogData.website_youtube_link || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">
                        Snap link (Only paste)
                        <span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="website_snap_link"
                        id="website_snap_link"
                        onInput={handleURLChange}
                        placeholder="Enter Snap link (Only paste)"
                        defaultValue={editBlogData.website_snap_link || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() =>
                      handleSaveChangesdynamic(
                        "CarrerformData",
                        save_update_website_data
                      )
                    }
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
export default WebsiteDashboardAdd;
