import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {
  retrieveData,
  removeData,
} from "../../LocalConnection/LocalConnection.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import { handleError, handleSuccess } from "../../CommonJquery/CommonJquery.js";
import {
  server_post_data,
  get_userright_data,
  Website_URL,
} from "../../ServiceConnection/serviceconnection.js";
function AdminHeader() {
  const adminName = retrieveData("admin_name");
  const adminImg = retrieveData("admin_image");
  const admin_profession = retrieveData("admin_profession");
  const location = useLocation();
  const currentUrl = location.pathname;
  const retrievedAdminId = retrieveData("staff_id");
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const retrievedDataFind = retrieveData("admin_email");
    const retrivemsg = retrieveData("session_msg");
    if (
      retrievedDataFind === "null" ||
      retrievedDataFind === null ||
      retrievedDataFind === "0"
    ) {
      navigate("/adminlogin");
    }
    if (retrivemsg !== "" && retrivemsg !== null && retrivemsg !== "0") {
      handleSuccess(retrivemsg, 1);
    }
  }, [navigate]);

  const Logout = () => {
    removeData();
    window.location.href = Website_URL;
  };

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

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
          if (Response.data.message.seo_loop.length > 0) {
            let user_action = Response.data.message.seo_loop[0].user_action;
            let user_other_action =
              Response.data.message.seo_loop[0].user_other_action;
            if (user_action === "1") {
              // If the element is found, hide elements with class 'action_function_call'
              $(".add_funtion_call").hide();
            }

            if (user_other_action === "1") {
              // If the element is found, hide elements with class 'action_function_call'
              $(".action_function_call").hide();
            }
            console.log(user_other_action);
          }
          if (Number(Response.data.message.total_pending_booking) > 0) {
            handleSuccess("New Enquiry Found");
          }
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
      const flag = "2";
      const call_id = parts[1];
      master_data_get(start_date, end_date, flag, call_id);
    }
  }, []);

  return (
    <div className="app-header header-shadow">
      <div className="app-header__logo">
        <div className="logo-src"></div>
        <div className="header__pane ml-auto">
          <div>
            <button
              type="button"
              className="hamburger close-sidebar-btn hamburger--elastic"
              data-class="closed-sidebar"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="app-header__mobile-menu">
        <div>
          <button
            type="button"
            className="hamburger hamburger--elastic mobile-toggle-nav"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
      <div className="app-header__menu">
        <span>
          <button
            type="button"
            className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
          >
            <span className="btn-icon-wrapper">
              <i className="fa fa-ellipsis-v fa-w-6"></i>
            </span>
          </button>
        </span>
      </div>
      <div className="app-header__content">
        <div className="app-header-left">
          <div
            className="search-wrapper"
            style={{ cursor: "pointer" }}
            onClick={openModal}
          >
            <i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Logout
          </div>
        </div>
        <div className="app-header-right">
          <div className="header-btn-lg pr-0">
            <div className="widget-content p-0">
              <div className="widget-content-wrapper">
                <div className="widget-content-left">
                  <div className="btn-group">
                    <a
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="p-0 btn"
                    >
                      <img
                        width="42"
                        height="42"
                        className="rounded-circle"
                        src={adminImg}
                        alt=""
                      />
                    </a>
                  </div>
                </div>
                <div className="widget-content-left  ml-3 header-user-info">
                  <div className="widget-heading">{adminName}</div>
                  <div className="widget-subheading">
                    {" "}
                    {admin_profession === "0" && "Super Admin"}
                    {admin_profession === "1" && "Staff"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        id="myModal"
        show={showModal}
        onHide={closeModal}
        centered
        backdrop="static"
      >
        <Modal.Body className="modal_body">
          <p>Do you want to Logout? please confirm!</p>
        </Modal.Body>
        <Modal.Footer>
          <div onClick={closeModal} className="btn go_to_login cancelLogout">
            Cancel
          </div>
          <div onClick={Logout} className="btn go_to_login confirmLogout">
            Confirm
          </div>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default AdminHeader;
