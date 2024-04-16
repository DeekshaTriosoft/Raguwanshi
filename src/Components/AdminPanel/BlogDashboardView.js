  import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import {
  server_post_data,
  get_all_blogs,
  delete_update_data,
} from "../../ServiceConnection/serviceconnection.js";
import {
  fnExcelReport,
  handleLinkClick,
  handleConfimDeleteClick,
  handleSuccess,
  handleError,
  formatDateString,
} from "../../CommonJquery/CommonJquery.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
function BlogDashboardView() {
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [BlogData, setsBlogData] = useState([]);
  const [SingleBlogData, setsSingleBlogData] = useState([]);
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
    await server_post_data(get_all_blogs, fd)
      .then((Response) => {
        console.log(Response.data.message);
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          setsBlogData(Response.data.message);
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
      fd.append("flag_for", "1");
      fd.append("for_status_final", "d");
      console.log(call_id);
      await server_post_data(delete_update_data, fd)
        .then((Response) => {
          setshowLoaderAdmin(false);
          console.log(Response.data);
          if (Response.data.error) {
            handleError(Response.data.message);
          } else {
            handleSuccess(Response.data.message);
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
                    Website Management &gt; Blogs
                    <div className="page-title-subheading">
                      Where You Can Check Blogs
                    </div>
                  </div>
                </div>
                <div className="page-title-actions add_funtion_call">
                  <Link onClick={() => handleLinkClick("/BlogDashboardAdd")}>
                    <button
                      type="button"
                      className="btn-shadow mr-3 btn btn-dark"
                    >
                      <i className="fa fa-plus">&nbsp;Add Blog</i>
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
                            Join
                            Date
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
                          <th className="text-center">Details</th>
                          <th className="text-center">Entry Date</th>
                          <th className="text-center">Images</th>
                          <th className="text-center">Title</th>
                          <th className="text-center">Author</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {!BlogData ? [] : BlogData.map((blogddd, index) => (
                          <tr key={index}>
                            <td className="text-center text-muted">
                              {index + 1}
                            </td>
                            <td className="text-center">
                              <button
                                type="button"
                                className="btn mr-2 mb-2 btn-primary table-detail"
                                data-toggle="modal"
                                data-target="#exampleModal"
                                onClick={() => setsSingleBlogData(blogddd)}
                              >
                                See More
                              </button>
                            </td>
                            <td className="text-center">
                              {formatDateString(blogddd.entry_date)}
                            </td>
                            <td className="text-center">
                              <img
                                className="width_height_50px"
                                src={blogddd.image_url}
                              ></img>
                            </td>

                            <td className="text-center">
                              {blogddd.title_name}
                            </td>
                            <td className="text-center">{blogddd.author}</td>

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
                                        "/BlogDashboardEdit/" +
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

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {SingleBlogData.title_name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(SingleBlogData.description),
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BlogDashboardView;
