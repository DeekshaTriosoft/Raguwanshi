import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import CKEditor from "./MyEditor";
import {
  server_post_data,
  save_update_blog,
  get_all_blogs,
} from "../../ServiceConnection/serviceconnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleAphabetsChange,
  handleIaphabetnumberChange,
  handleURLChange,
  handleSuccess,
  handleError,
  handleSuccessSession,
} from "../../CommonJquery/CommonJquery.js";
import { useLocation, Link } from "react-router-dom";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
function BlogDashboardAdd() {
  const location = useLocation();

  const currentUrl = location.pathname.substring(1);
  const [editorData, setEditorData] = useState("");
  const [error_show, seterror_show] = useState("");
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
    await server_post_data(get_all_blogs, fd)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          seteditBlogData(Response.data.message.data_blog[0]);
          setEditorData(Response.data.message.data_blog[0].description);

          setEditorDatMainID(Response.data.message.data_blog[0].primary_id);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const handleEditorChange = (event, editor) => {
    setEditorData(editor.getData());
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    seterror_show("");
    if (editorData.length > 0) {
      if (vaild_data) {
        setshowLoaderAdmin(true);
        let fd_from = combiled_form_data(form_data, null);
        fd_from.append("description_data", editorData);
        fd_from.append("admin_id", retrievedAdminId);
        fd_from.append("main_id", editorDataMainID);
        await server_post_data(url_for_save, fd_from)
          .then((Response) => {
            console.log(Response);
            setshowLoaderAdmin(false);
            if (Response.data.error) {
              handleError(Response.data.message);
            } else {
              handleSuccessSession(Response.data.message, "/blogDashboardView");
            }
          })
          .catch((error) => {
            setshowLoaderAdmin(false);
          });
      }
    } else {
      seterror_show("Please Fill The Mandatory Information");
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
                  Website Management &gt; Blogs
                    <div className="page-title-subheading">
                      Add and Edit Blog
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-card mb-3 card">
              <div className="card-body">
                <h5 className="card-title">Add/Edit Blog</h5>
                <form className="needs-validation" id="CarrerformData">
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">
                        Images Url (Only Paste)
                        <span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="img_url"
                        id="img_url"
                        maxLength={300}
                        onInput={handleURLChange}
                        placeholder="Enter Images url"
                        defaultValue={editBlogData.image_name || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">
                        Title<span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="title_data"
                        id="title_data"
                        maxLength={100}
                        onInput={handleAphabetsChange}
                        placeholder="Enter Title"
                        defaultValue={editBlogData.title_name || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">
                        Introduction<span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="tagline_data"
                        id="tagline_data"
                        maxLength={300}
                        onInput={handleIaphabetnumberChange}
                        placeholder="Enter Introduction"
                        defaultValue={editBlogData.tag_line || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">
                        Author<span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="author_data"
                        id="author_data"
                        placeholder="Enter Author"
                        maxLength={100}
                        onInput={handleAphabetsChange}
                        defaultValue={editBlogData.author || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label htmlFor="validationCustom01">
                        Description<span className="red_show">*</span>
                      </label>
                      <CKEditor
                        data_showe={editorData}
                        onChange={handleEditorChange}
                      />
                      <span className="condition_error">{error_show}</span>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() =>
                      handleSaveChangesdynamic(
                        "CarrerformData",
                        save_update_blog
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
export default BlogDashboardAdd;
