import React, { useState, useEffect } from "react";
import {
  APL_LINK,
  server_post_data,
  login_to_superadmin,
} from "../../ServiceConnection/serviceconnection.js";
import {
  check_vaild_save,
  combiled_form_data,
  handleError,
} from "../../CommonJquery/CommonJquery.js";
import {
  storeData,
  retrieveData,
} from "../../LocalConnection/LocalConnection.js";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
function AdminLogin() {
  const navigate = useNavigate();
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);

    if (vaild_data) {
      setshowLoaderAdmin(true);
      let fd_from = combiled_form_data(form_data, null);
      await server_post_data(url_for_save, fd_from)
        .then((Response) => {
          setshowLoaderAdmin(false);
          if (Response.data.error) {
            alert(Response.data.message);
          } else {
            console.log(Response.data);
            if (Response.data.message.data_admin.length > 0) {
              let Response_data = Response.data.message.data_admin[0];
              let data_doctor_image = Response.data.message.data_admin_image;
              if (Response_data.allow_access === "1") {
                storeData("allow_access", Response_data.allow_access);
                storeData("admin_email", Response_data.admin_email);
                storeData("admin_name", Response_data.admin_name);
                storeData("admin_profession", Response_data.admin_type);
                storeData(
                  "admin_image",
                  APL_LINK + data_doctor_image + Response_data.admin_image
                );
                storeData("admin_image_single", Response_data.admin_image);
                storeData("staff_id", Response_data.primary_id);
                navigate("/admindashboard");
              } else {
                handleError("User is Invalid. Please try again.");
              }
            } else {
              const invalidElement =
                document.getElementsByClassName("invalid_data")[0];
              if (invalidElement) {
                invalidElement.innerHTML =
                  "Wrong Username and password, Please enter valid credentials";
                invalidElement.style.display = "block"; // Assuming you want to show the element
              }
            }
          }
        })
        .catch((error) => {
          setshowLoaderAdmin(false);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const retrieveDatafind = retrieveData("admin_email");

    if (
      retrieveDatafind === "null" ||
      retrieveDatafind === null ||
      retrieveDatafind === "0"
    ) {
      //ss
    } else {
      navigate("/admindashboard");
    }
  }, [navigate]);

  return (
    <section className="secti">
      <div className={showLoaderAdmin ? "loading_website" : ""}></div>
      <form id="form_data_admin" className="login_condition">
        <div className="admin ">
          <button
            type="button"
            className="admin-lock"
            onClick={() =>
              handleSaveChangesdynamic("form_data_admin", login_to_superadmin)
            }
          >
            <i className="fa fa-angle-right"></i>
          </button>

          <div className="admin-content">
            <h3 className="admin-content-header">Raghuvanshi Hall</h3>
            <h6 className="invalid_data text-danger"></h6>

            <div className="cred">
              <div className="cred-input">
                <input
                  type="text"
                  name="useremail"
                  className="form-control trio_email trio_mandatory "
                  placeholder="User Id"
                  style={{ borderRadius: "5px" }}
                />
              </div>
              <div className="cred-input login_password">
                <input
                  type={showPassword ? "text" : "password"}
                  name="userpassword"
                  className="form-control trio_mandatory trio_password cred-input"
                  placeholder="Password"
                  style={{ borderRadius: "5px" }}
                />
                <button
                  className="eye_btn_"
                  type="button"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AdminLogin;
