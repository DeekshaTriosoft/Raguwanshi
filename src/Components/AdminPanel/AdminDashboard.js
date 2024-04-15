import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import {
  server_post_data,
  admin_dashboard_url,
} from "../../ServiceConnection/serviceconnection.js";
import {
  handleLinkClick,
  inputdateformateChange,
  handleSuccess,
  handleError,
} from "../../CommonJquery/CommonJquery.js";
import { retrieveData } from "../../LocalConnection/LocalConnection.js";
import { Link } from "react-router-dom";
import PendingPng from "../../Assests/images/pendingEnq.png";
import CompletedPng from "../../Assests/images/completeEnq.png";
import Bookings from "../../Assests/images/compbk.png";
import FInalAmount from "../../Assests/images/totalAmn.png";
import DueAmnt from "../../Assests/images/pendingAmn.png";
import SubscribersPng from "../../Assests/images/subscribeSS.png";
function AdminDashboard() {
  const retrievedAdminId = retrieveData("staff_id");
  const retrievedAdminProfession = retrieveData("admin_profession");
  const [TotalPendingEnquiry, setTotalPendingEnquiry] = useState(0);
  const [TotalCompleteEnquiry, setTotalCompleteEnquiry] = useState(0);
  const [TotalCompleteBooking, setTotalCompleteBooking] = useState(0);
  const [TotalFinalAmount, setTotalFinalAmount] = useState(0);
  const [TotalAdvanceAmount, setTotalAdvanceAmount] = useState(0);
  const [TotalSuscribe, setTotalSuscribe] = useState(0);
  const [rupess_icon, setrupess_icon] = useState("");
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [BlogData, setsBlogData] = useState([]);
  useEffect(() => {
    const flag = "1";
    const call_id = "0";
    const startDate = "";
    const endDate = "";
    master_data_get(startDate, endDate, flag, call_id);
  }, []);

  const master_data_get = async (start_date, end_date, flag, call_id) => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("admin_id", retrievedAdminId);
    fd.append("admin_type", retrievedAdminProfession);
    await server_post_data(admin_dashboard_url, fd)
      .then((Response) => {
        if (Response.data.error) {
          handleError(Response.data.message);
        } else {
          console.log(Response.data.message);
          setsBlogData(Response.data.message.data_main_lead);
          setTotalPendingEnquiry(Response.data.message.total_pending);
          setTotalCompleteEnquiry(Response.data.message.total_complete);
          setTotalCompleteBooking(Response.data.message.totol_complete_booking);
          setTotalFinalAmount(Response.data.message.total_final_amount);
          setTotalSuscribe(Response.data.message.total_suscribe);
          setrupess_icon(Response.data.message.rupess_icon);
          setTotalAdvanceAmount(Response.data.message.advance_amount_amount);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const totalDueAmount = TotalFinalAmount - TotalAdvanceAmount;

  return (
    <div className="app-container app-theme-white body-tabs-shadow fixed-header">
      <AdminHeader />

      <div className="app-main">
        <AdminSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div className="app-page-title">
              <div className="page-title-wrapper">
                <div className="page-title-heading">
                  <div className="page-title-icon">
                    <i className="fa fa-tachometer icon-gradient bg-mean-fruit"></i>
                  </div>
                  <div>
                    Dashboard
                    <div className="page-title-subheading">See Analytics</div>
                  </div>
                </div>
                <div className="page-title-actions">
                  <Link onClick={() => handleLinkClick("/enquiryDashboardAdd")}>
                    <button
                      type="button"
                      className="btn-shadow mr-3 btn btn-dark"
                    >
                      <i className="fa fa-plus">&nbsp;Add Enquiry</i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-4">
                <Link
                  onClick={() =>
                    handleLinkClick(
                      retrievedAdminProfession === "0"
                        ? "/enquiryDashboardView"
                        : "/enquiryAssignDashboardView"
                    )
                  }
                >
                  <div className="card mb-3 widget-content">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left displayFlex1">
                        <img src={PendingPng} alt="Pending Enquiries" />
                        <div>
                          <div className="widget-heading">
                            {retrievedAdminProfession === "0"
                              ? " Enquiries"
                              : " Enquiries"}
                          </div>

                          <div className="widget-subheading">
                            Total Enquiries
                          </div>
                        </div>
                      </div>
                      <div className="widget-content-right ">
                        <div className="widget-numbers text-success">
                          {TotalPendingEnquiry}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-xl-4">
                <Link to="/enquiryCompleteDashboardView">
                  <div className="card mb-3 widget-content">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left displayFlex1">
                        <img src={CompletedPng} alt="Pending Enquiries" />
                        <div>
                          <div className="widget-heading">Completed</div>
                          <div className="widget-subheading">
                            Total Enquiries
                          </div>
                        </div>
                      </div>
                      <div className="widget-content-right ">
                        <div className="widget-numbers text-warning">
                          {TotalCompleteEnquiry}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-6 col-xl-4">
                <Link to="/CustomerBookingDashboardView">
                  <div className="card mb-3 widget-content">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left displayFlex1">
                        <img src={Bookings} alt="Pending Enquiries" />
                        <div>
                          <div className="widget-heading">Bookings</div>
                          <div className="widget-subheading">
                            Total Bookings
                          </div>
                        </div>
                      </div>
                      <div className="widget-content-right ">
                        <div className="widget-numbers text-danger">
                          {TotalCompleteBooking}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-4">
                <div className="card mb-3 widget-content">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left displayFlex1">
                      <img src={FInalAmount} alt="Pending Enquiries" />
                      <div>
                        <div className="widget-heading">Final Amount</div>
                        <div className="widget-subheading">Total Amount</div>
                      </div>
                    </div>
                    <div className="widget-content-right ">
                      <div className="widget-numbers text-success">
                        {rupess_icon} {Number(TotalFinalAmount).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-4">
                {/* <Link to="/subscribeDashboardView"> */}
                <div className="card mb-3 widget-content">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left displayFlex1">
                      <img src={DueAmnt} alt="Pending Enquiries" />
                      <div>
                        <div className="widget-heading">Due Amount</div>
                        <div className="widget-subheading">
                          Total Due Amount
                        </div>
                      </div>
                    </div>
                    <div className="widget-content-right ">
                      <div className="widget-numbers text-danger">
                        {totalDueAmount}
                      </div>
                    </div>
                  </div>
                </div>
                {/* </Link> */}
              </div>

              <div className="col-md-6 col-xl-4">
                <Link to="/subscribeDashboardView">
                  <div className="card mb-3 widget-content">
                    <div className="widget-content-wrapper">
                      <div className="widget-content-left displayFlex1">
                        <img src={SubscribersPng} alt="Pending Enquiries" />
                        <div>
                          <div className="widget-heading">Subscribers</div>
                          <div className="widget-subheading">Total Subscribers</div>
                        </div>
                      </div>
                      <div className="widget-content-right ">
                        <div className="widget-numbers text-danger">
                          {TotalSuscribe}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="main-card mb-3 card">
                  <div className="card-header">
                    {retrievedAdminProfession === "0"
                      ? "Pending Enquiry"
                      : "Total Enquiry"}
                  </div>
                  <div className="table-responsive">
                    <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                      <thead>
                        <tr>
                          <th className="text-center">S.No</th>
                          <th>Name</th>
                          <th className="text-center">Mobile No</th>
                          <th className="text-center">Email Id</th>
                          <th className="text-center">Status</th>
                          <th className="text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {BlogData.map((blogddd, index) => (
                          <tr key={index}>
                            <td className="text-center text-muted">
                              {index + 1}
                            </td>
                            <td>{blogddd.lead_person_name}</td>
                            <td className="text-center">
                              {blogddd.lead_person_mobile_no} &nbsp;
                            </td>
                            <td className="text-center">
                              {blogddd.lead_person_email_id}
                            </td>
                            <td className="d-flex justify-content-center align-items-center">
                              <div
                                className={`badge icon_right  card-brage${blogddd.lead_status}`}
                                style={{
                                  fontSize: "12px",
                                  padding: "0.5rem 0.8rem",
                                }}
                              >
                                {blogddd.lead_status}
                              </div>
                            </td>
                            <td className="text-center">
                              <Link
                                onClick={() =>
                                  handleLinkClick(
                                    retrievedAdminProfession === "0"
                                      ? "/enquiryDashboardView"
                                      : "/enquiryAssignDashboardView"
                                  )
                                }
                              >
                                <button
                                  type="button"
                                  id="PopoverCustomT-1"
                                  className="btn btn-primary btn-sm"
                                >
                                  Details
                                </button>
                              </Link>
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
export default AdminDashboard;
