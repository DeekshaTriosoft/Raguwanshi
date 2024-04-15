import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar.js";
import AdminFooter from "./AdminFooter.js";
import AdminHeader from "./AdminHeader.js";
import {
  server_post_data,
  get_all_slider_image,
  delete_update_data,
  APL_LINK,
} from "../../ServiceConnection/serviceconnection.js";
import {
  fnExcelReport,
  handleLinkClick,
  handleConfimDeleteClick,
  formatDateString,
  handleError,
} from "../../CommonJquery/CommonJquery.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import { Link } from "react-router-dom";
function SliderDashboardView() {
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [BlogData, setsBlogData] = useState([]);
  const [BlogImageData, setsBlogImageData] = useState([]);
  const retrievedAdminId = retrieveData("staff_id");

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const formattedSevenDaysAgo = sevenDaysAgo.toISOString().split("T")[0];

  // Initialize end date as today
  const today = new Date();
  const formattedToday = today.toISOString().split("T")[0];

  // Set initial state using useState hook
  const [startDate, setStartDate] = useState(formattedSevenDaysAgo);
  const [endDate, setEndDate] = useState(formattedToday);
  useEffect(() => {
    const start_date = "";
    const end_date = "";
    const flag = "1";
    const call_id = "0";
    master_data_get(start_date, end_date, flag, call_id);
  }, []);

  const search_data = () => {
    const flag = "2";
    const call_id = "0";
    master_data_get(startDate, endDate, flag, call_id);
  };

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
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          setsBlogData(Response.data.message.data_slider);
          setsBlogImageData(Response.data.message.data_slider_image);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const master_data_action = async (call_id) => {
    if (handleConfimDeleteClick()) {
      setshowLoaderAdmin(true);
      const fd = new FormData();
      fd.append("id_for_delete", call_id);
      fd.append("flag_for", "7");
      fd.append("for_status_final", "d");
      console.log(call_id);
      await server_post_data(delete_update_data, fd)
        .then((Response) => {
          setshowLoaderAdmin(false);
          console.log(Response.data);
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
            master_data_get(startDate, endDate, "1", "0");
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
                    Website Management &gt; Slider
                    <div className="page-title-subheading">
                      Where You Can Check slider
                    </div>
                  </div>
                </div>
                <div className="page-title-actions add_funtion_call">
                  <Link onClick={() => handleLinkClick("/sliderDashboardAdd")}>
                    <button
                      type="button"
                      className="btn-shadow mr-3 btn btn-dark"
                    >
                      <i className="fa fa-plus">&nbsp;Add slider</i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="main-card mb-3 card">
                  <div className="card-header card-header-view">
                    <div className="btn-actions-pane-left row">
                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            <b>Start Date</b>
                          </label>
                          <input
                            type="date"
                            className="form-control trio_search_ajax trio_mandatory_view"
                            name="start_date"
                            id="start_date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-sm-3">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            <b>End Date</b>
                          </label>
                          <input
                            type="date"
                            className="form-control trio_search_ajax trio_mandatory_view"
                            name="end_date"
                            id="end_date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-sm-1">
                        <div className="form-group">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              <b>&nbsp;</b>
                            </label>
                            <button
                              type="button"
                              className="form-control  btn btn-primary btn-sm"
                              name="end_date"
                              onClick={() => search_data()}
                            >
                              <i className="ace-icon fa fa-search icon-on-right bigger-110"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="btn-actions-pane-right btn-actions-pane-right-float ">
                        <div role="group" className="btn-group-sm btn-group">
                          <button
                            className="active btn btn-focus"
                            onClick={fnExcelReport}
                          >
                            Download Excel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table
                      className="align-middle mb-0 table table-borderless table-striped table-hover"
                      id="dynamic-table1"
                    >
                      <thead>
                        <tr>
                          <th className="text-center">S.No</th>
                          <th className="text-center">Entry Date</th>
                          <th className="text-center">Images</th>
                          <th className="text-center">Image Show In</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {BlogData.map((blogddd, index) => (
                          <tr key={index}>
                            <td className="text-center text-muted">
                              {index + 1}
                            </td>
                            <td className="text-center">
                              {formatDateString(blogddd.entry_date)}
                            </td>
                            <td className="text-center">
                              <img
                                className="width_height_50px"
                                src={
                                  APL_LINK +
                                  BlogImageData +
                                  blogddd.silder_image_name
                                }
                              ></img>
                            </td>
                            <td className="text-center">
                              {blogddd.silder_image_type === "1"
                                ? "Front Image"
                                : blogddd.silder_image_type === "2"
                                ? "About Image"
                                : blogddd.silder_image_type === "3"
                                ? "Event Image"
                                : blogddd.silder_image_type === "4"
                                ? "Front 2 Silder"
                                : null}
                            </td>

                            <td className="text-center">
                              <div className="dropdown action_function_call">
                                <button
                                  type="button"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  data-toggle="dropdown"
                                  className="mb-2 mr-2 dropdown-toggle btn btn-outline-secondary "
                                >
                                  Action
                                </button>
                                <div
                                  tabIndex="-1"
                                  role="menu"
                                  aria-hidden="true"
                                  className="dropdown-menu"
                                  x-placement="top-start"
                                >
                                  <Link
                                    onClick={() =>
                                      handleLinkClick(
                                        "/sliderDashboardEdit/" +
                                          blogddd.primary_id
                                      )
                                    }
                                  >
                                    <button
                                      type="button"
                                      tabIndex="0"
                                      className="dropdown-item"
                                    >
                                      Edit
                                    </button>
                                  </Link>
                                  <Link
                                    onClick={() =>
                                      master_data_action(blogddd.primary_id)
                                    }
                                  >
                                    <button
                                      type="button"
                                      tabIndex="0"
                                      className="dropdown-item"
                                    >
                                      Delete
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}
export default SliderDashboardView;
