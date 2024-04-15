import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar.js";
import AdminFooter from "./AdminFooter.js";
import AdminHeader from "./AdminHeader.js";
import {
  server_post_data,
  Website_URL,
  save_update_seo,
  get_all_seo,
} from "../../ServiceConnection/serviceconnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  handleIaphabetnumberkeywordChange,
  handleIaphabetnumberChange,
  handleAphabetswithhashChange,
  handleURLChange,
  handleSuccessSession,
  handleError,
} from "../../CommonJquery/CommonJquery.js";
import { useLocation, Link } from "react-router-dom";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
function SeoDashboardAdd() {
  const location = useLocation();
  const currentUrl = location.pathname.substring(1);
  const [editorDataMainID, setEditorDatMainID] = useState("0");
  const [editBlogData, seteditBlogData] = useState([]);
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const retrievedAdminId = retrieveData("staff_id");

  useEffect(() => {
    const url = currentUrl;
    const parts = url.split("/");
    if (parts.length !== 1) {
      const start_date = "";
      const end_date = "";
      const flag = "3";
      const call_id = parts[1];
      master_data_get(start_date, end_date, flag, call_id);
    }
  }, []);

  const master_data_get = async (start_date, end_date, flag, call_id) => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("admin_id", retrievedAdminId);
    fd.append("start_date", start_date);
    fd.append("end_date", end_date);
    fd.append("flag", flag);
    fd.append("call_id", call_id);
    await server_post_data(get_all_seo, fd)
      .then((Response) => {
        console.log(Response.data);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          seteditBlogData(Response.data.message.data_seo[0]);
          setEditorDatMainID(Response.data.message.data_seo[0].primary_id);
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
      fd_from.append("website_url", Website_URL);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          console.log(Response.data.message);
          setshowLoaderAdmin(false);
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
            handleSuccessSession(Response.data.message, "/seoDashboardView");
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
                    Website Management &gt; SEO Section
                    <div className="page-title-subheading">
                      Add and Edit SEO
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-card mb-3 card">
              <div className="card-body">
                <h5 className="card-title">Add/Edit SEO</h5>
                <form className="needs-validation" id="CarrerformData">
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label htmlFor="validationCustom01">
                        Actual Link<span className="red_show">*</span>
                      </label>
                      <div className="display_flex">
                        <input
                          type="text"
                          readonly=""
                          value={Website_URL}
                          autocomplete="off"
                          className="width_33_per"
                        />
                        <input
                          type="text"
                          className="form-control  trio_mandatory"
                          name="call_function_name"
                          id="call_function_name"
                          maxLength={100}
                          onInput={handleAphabetswithhashChange}
                          placeholder="Enter Actual Link"
                          defaultValue={editBlogData.call_function_name || ""}
                        />
                      </div>
                      <span className="condition_error"></span>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="validationCustom01">
                        Pretty Link<span className="red_show">*</span>
                      </label>
                      <div className="display_flex">
                        <input
                          type="text"
                          readonly=""
                          value={Website_URL}
                          autocomplete="off"
                          className="width_33_per"
                        />
                        <input
                          type="text"
                          className="form-control  trio_mandatory"
                          name="pretty_function_name"
                          id="pretty_function_name"
                          maxLength={100}
                          onInput={handleAphabetswithhashChange}
                          placeholder="Enter Actual Link"
                          defaultValue={editBlogData.pretty_function_name || ""}
                        />
                      </div>

                      <span className="condition_error"></span>
                    </div>
                  </div>
                  <div className="form-row"></div>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label htmlFor="validationCustom01">
                        Title<span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="title_name"
                        id="title_name"
                        maxLength={100}
                        onInput={handleIaphabetnumberChange}
                        placeholder="Enter Title"
                        defaultValue={editBlogData.title_name || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">
                        Favicon Images (Only Paste)
                        <span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="favicon"
                        id="favicon"
                        maxLength={300}
                        onInput={handleURLChange}
                        placeholder="Enter Favicon url"
                        defaultValue={editBlogData.favicon || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">
                        Page Images (Only Paste)
                        <span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="image"
                        id="image"
                        maxLength={300}
                        onInput={handleURLChange}
                        placeholder="Enter Page Images"
                        defaultValue={editBlogData.image || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label htmlFor="validationCustom01">
                        Description<span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="description"
                        id="description"
                        maxLength={500}
                        onInput={handleIaphabetnumberChange}
                        placeholder="Enter Description"
                        defaultValue={editBlogData.description || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label htmlFor="validationCustom01">
                        Keywords<span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="keywords"
                        id="keywords"
                        placeholder="Enter Keywords"
                        maxLength={700}
                        onInput={handleIaphabetnumberkeywordChange}
                        defaultValue={editBlogData.keywords || ""}
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
                        save_update_seo
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
export default SeoDashboardAdd;
