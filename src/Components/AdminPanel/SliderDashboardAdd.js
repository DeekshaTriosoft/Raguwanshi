import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar.js";
import AdminFooter from "./AdminFooter.js";
import AdminHeader from "./AdminHeader.js";
import {
  server_post_data,
  save_update_silder_image,
  get_all_slider_image,
} from "../../ServiceConnection/serviceconnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  empty_form,
  handleSuccessSession,
  handleError,
  handleAphabetsChange,
} from "../../CommonJquery/CommonJquery.js";
import { useLocation, Link } from "react-router-dom";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
function SliderDashboardAdd() {
  const location = useLocation();
  const currentUrl = location.pathname.substring(1);
  const [editorDataMainID, setEditorDatMainID] = useState("0");
  const [editBlogData, seteditBlogData] = useState([]);
  const [editOldImageData, seteditOldImageData] = useState([]);
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const retrievedAdminId = retrieveData("staff_id");
  const [dynaicimage, setDynaicimage] = useState(null);
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
    await server_post_data(get_all_slider_image, fd)
      .then((Response) => {
        console.log(Response.data);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          seteditBlogData(Response.data.message.data_slider[0]);
          setEditorDatMainID(Response.data.message.data_slider[0].primary_id);
          seteditOldImageData(
            Response.data.message.data_slider[0].silder_image_name
          );
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
      let fd_from = combiled_form_data(form_data, dynaicimage);
      fd_from.append("admin_id", retrievedAdminId);
      fd_from.append("main_id", editorDataMainID);
      fd_from.append("old_image_link", editOldImageData);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          console.log(Response.data.message);
          setshowLoaderAdmin(false);
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
            handleSuccessSession(Response.data.message, "/sliderDashboardView");
          }
        })
        .catch((error) => {
          setshowLoaderAdmin(false);
        });
    }
  };

  const handleFileChangedynamic = (keyname) => (event) => {
    const file = event.target.files[0];

    let new_file_name = keyname + "_show";

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setDynaicimage((prevImages) => ({
          ...prevImages,
          [keyname]: file,
          [new_file_name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setDynaicimage((prevImages) => ({
        ...prevImages,
        [keyname]: null,
        [new_file_name]: null,
      }));
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
                  Website Management &gt; Slider
                    <div className="page-title-subheading">
                      Add and Edit Slider
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-card mb-3 card">
              <div className="card-body">
                <h5 className="card-title">Add/Edit Slider</h5>
                <form className="needs-validation" id="CarrerformData">
                  <div className="form-row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="validationCustom01">
                        {" "}
                        Slider Content<span className="red_show">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control  trio_mandatory"
                        name="silder_content"
                        id="silder_content"
                        maxLength={50}
                        onInput={handleAphabetsChange}
                        placeholder="Enter Slider Content"
                        defaultValue={editBlogData.silder_content || ""}
                      />
                      <span className="condition_error"></span>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">Slider Type<span className="red_show">*</span></label>
                      <select
                        className="form-control trio_mandatory"
                        name="silder_image_type"
                        id="silder_image_type"
                      >
                        <option
                          value="1"
                          selected={
                            editBlogData.silder_image_type === "1" || false
                          }
                        >
                          Front Image
                        </option>
                        <option
                          value="2"
                          selected={
                            editBlogData.silder_image_type === "2" || false
                          }
                        >
                          About Image
                        </option>
                        <option
                          value="3"
                          selected={
                            editBlogData.silder_image_type === "3" || false
                          }
                        >
                          Event Image
                        </option>
                        <option
                          value="4"
                          selected={
                            editBlogData.silder_image_type === "4" || false
                          }
                        >
                          Front 2 Silder
                        </option>
                      </select>

                      <span className="condition_error"></span>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="validationCustom01">Images</label><br></br>
                      <input
                        className="inputEditFile"
                        type="file"
                        name="silder_image_name"
                        onChange={handleFileChangedynamic("silder_image_name")}
                        accept=".jpg,.jpeg,.png"
                      />
                      <div className="previewEditBox">
                        {dynaicimage && dynaicimage.silder_image_name_show && (
                          <img
                            src={dynaicimage.silder_image_name_show}
                            alt="Preview"
                            className="imgEditMaster"
                          />
                        )}
                      </div>
                      <span className="condition_error"></span>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() =>
                      handleSaveChangesdynamic(
                        "CarrerformData",
                        save_update_silder_image
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
export default SliderDashboardAdd;
