import React, { useState, useEffect } from "react";
import "./Css/CheckAvail.css";
import Footer from "./Footer";
import Header from "./Header";
import queryFormImg from "../../Assests/images/queryImg.png";
import { Dropdown } from "primereact/dropdown";
import Tick from "../../Assests/images/orangeTick.svg";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Right from "../../Assests/images/arrow6.svg";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  handleEmailChange,
  handleAphabetsChange,
  check_vaild_save,
  combiled_form_data,
  TimeformateChange,
  handleNumbersChange,
  validateMobile,
} from "../../CommonJquery/CommonJquery";
import {
  APL_LINK,
  server_post_data,
  save_enquiry_website,
  get_all_booking_data,
} from "../../ServiceConnection/serviceconnection.js";

import Succes from "../../Assests/images/greentick.png";

function CheckAvail() {
  const [value, setvalue] = React.useState(dayjs());
  const [selectedCardValue, setSelectedCardValue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedGuestCount, setSelectedGuestCount] = useState(null);
  const [userNumber, setUserNumber] = useState("");
  const [thankyouVisible, setthankyouVisibility] = useState(false);
  const [stepclick, setstepclick] = useState(0);

  const handleSelection = (valuedata) => {
    setstepclick(1);
    setSelectedCardValue(valuedata);
  };

  const handleDateSelection = (newValue) => {
    setSelectedDate(newValue);
    setstepclick(2);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setstepclick(3);
  };

  const handleGuestSelection = (guestOption) => {
    setSelectedGuestCount(guestOption);
    setstepclick(4);
  };

  const setstepcount = (count_no) => {
    setstepclick(count_no);
  };

  const [enterGuest, setEnterGuest] = useState(false);
  const handleManualGuestInput = () => {
    const inputValue = document.getElementById("guestCountInput").value;
    if (inputValue !== "") {
      setEnterGuest(false);
      handleGuestSelection(inputValue);
    } else {
      setEnterGuest(true);
    }
  };

  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [EventData, setEventData] = useState([]);
  const [EventTimingData, setEventTimingData] = useState([]);
  const [guetOptions, setguetOptions] = useState([]);
  const [EventImageData, setEventImageData] = useState("");

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
    fd.append("admin_id", "0");
    await server_post_data(get_all_booking_data, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setEventData(Response.data.message.data_event_list);
          setEventImageData(Response.data.message.data_eventlisting_image);
          setEventTimingData(Response.data.message.data_event_timing);
          setguetOptions(Response.data.message.guest_options);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    let vaild_data = check_vaild_save(form_data);
    const dateObject = new Date(selectedDate.$d);
    const formattedDate = dateObject.toISOString().split("T")[0];
    if (vaild_data) {
      if (validateMobile(userNumber)) {
        setshowLoaderAdmin(true);
        let fd_from = combiled_form_data(form_data, null);
        fd_from.append("admin_id", "0");
        fd_from.append("selectedGuestCount", selectedGuestCount);
        fd_from.append("lead_event_date", formattedDate);
        fd_from.append("event_list_name", selectedCardValue.event_list_name);
        fd_from.append("lead_type", "Enquiry");
        fd_from.append("lead_status", "none");
        fd_from.append("lead_source", "Website");
        fd_from.append(
          "lead_for_eventtiming_full",
          selectedTime.primary_id + "~@~" + selectedTime.timing_name
        );
        fd_from.append("lead_person_mobile_no", userNumber);
        await server_post_data(url_for_save, fd_from)
          .then((Response) => {
            setshowLoaderAdmin(false);
            if (Response.data.error) {
              alert(Response.data.message);
            } else {
              setthankyouVisibility(true);
            }
          })
          .catch((error) => {
            setshowLoaderAdmin(false);
          });
      } else {
        alert("Please Enter Valid Mobile No");
      }
    }
  };

  return (
    <div className="querypage">
      <div className={showLoaderAdmin ? "loading_website" : ""}></div>
      <Header />
      <div className="querypageContainer">
        {thankyouVisible ? (
          <div className="thanyoucontainer">
            <div className="thnkyMssg">
              <img
                src={Succes}
                alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
              />
              <h4>
                Thank you for your interest in our <br /> banquet hall services.
              </h4>
              <a href="/">
                <button>Return to Home</button>
              </a>
            </div>
          </div>
        ) : (
          <div className="queryForm">
            <div className="row rowSMreverse m-0">
              <div className="col-md-6 IMAGCOL p-0">
                <div className="queryFormImg">
                  <img
                    src={queryFormImg}
                    alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                  />
                </div>
              </div>
              <div className="col-xl-5 col-md-6 FORMCOL mx-auto">
                <div className="queryFormDetailsContainer">
                  <div className="col-xl-11 h-100 mx-auto padding0">
                    <div className="queryFormDetails h-100">
                      <div className="slctGcountContainer">
                        <div className="valueCard bg-white d-flex align-items-center justify-content-center">
                          <div
                            className={`round12 ${
                              stepclick > 0 ? "round12cmpltd" : ""
                            }`}
                          >
                            {stepclick === 0 ? (
                              <p>1</p>
                            ) : (
                              <img
                                src={Tick}
                                alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                                onClick={() => setstepcount(0)}
                              />
                            )}
                          </div>

                          <div
                            className={`horizonline ${
                              stepclick > 0 ? "horizonlineCompltd" : ""
                            }`}
                          ></div>
                          <div
                            className={`round12 ${
                              stepclick > 1 ? "round12cmpltd" : ""
                            }`}
                          >
                            {stepclick <= 1 ? (
                              <p>2</p>
                            ) : (
                              <img
                                src={Tick}
                                alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                                onClick={() => setstepcount(1)}
                              />
                            )}
                          </div>

                          <div
                            className={`horizonline ${
                              stepclick > 1 ? "horizonlineCompltd" : ""
                            }`}
                          ></div>
                          <div
                            className={`round12 ${
                              stepclick > 2 ? "round12cmpltd" : ""
                            }`}
                          >
                            {stepclick <= 2 ? (
                              <p>3</p>
                            ) : (
                              <img
                                src={Tick}
                                alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                                onClick={() => setstepcount(2)}
                              />
                            )}
                          </div>

                          <div
                            className={`horizonline ${
                              stepclick > 2 ? "horizonlineCompltd" : ""
                            }`}
                          ></div>
                          <div
                            className={`round12 ${
                              stepclick > 3 ? "round12cmpltd" : ""
                            }`}
                          >
                            {stepclick <= 3 ? (
                              <p>4</p>
                            ) : (
                              <img
                                src={Tick}
                                alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                                onClick={() => setstepcount(3)}
                              />
                            )}
                          </div>

                          <div
                            className={`horizonline ${
                              stepclick > 3 ? "horizonlineCompltd" : ""
                            }`}
                          ></div>
                          <div className="round12">
                            <p>5</p>
                          </div>
                        </div>
                        {stepclick === 0 && (
                          <div className="headandcarddiv">
                            <h4 className="margine_top_40px">
                              Select Occasion
                            </h4>
                            <div className="slctOcsnCards">
                              <div className="row m-0">
                                {EventData.map((option, index) => {
                                  if (option.event_list_front === "1") {
                                    return (
                                      <div
                                        key={index}
                                        className="col-4"
                                        onClick={() => handleSelection(option)}
                                      >
                                        <div className={`slctOcsnCard `}>
                                          <div className="slctOcsnCardimg">
                                            <img
                                              src={
                                                APL_LINK +
                                                EventImageData +
                                                option.event_list_image
                                              }
                                              alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                                            />
                                          </div>
                                          <div className="slctOcsnCardTxt">
                                            <p>{option.event_list_name}</p>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                              </div>

                              <div className="slctocsnDropdown">
                                <Dropdown
                                  value={
                                    selectedCardValue
                                      ? selectedCardValue.event_list_name
                                      : null
                                  }
                                  onChange={(e) => handleSelection(e.value)}
                                  options={EventData.filter(
                                    (option) => option.event_list_front === "0"
                                  )}
                                  optionLabel="event_list_name"
                                  placeholder="Others"
                                  className="ocsnDopdown"
                                  appendTo={document.body}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {stepclick === 1 && (
                          <div className="headandcarddiv">
                            <h4>
                              When is your{" "}
                              {selectedCardValue
                                ? selectedCardValue.event_list_name
                                : null}
                              ?
                            </h4>

                            <div className="calenderDiv">
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                  value={value}
                                  onChange={(newValue) =>
                                    handleDateSelection(newValue)
                                  }
                                  minDate={dayjs()}
                                />
                              </LocalizationProvider>
                            </div>
                          </div>
                        )}
                        {stepclick === 2 && (
                          <div className="headandcarddiv">
                            <h4>
                              What Time is your{" "}
                              {selectedCardValue
                                ? selectedCardValue.event_list_name
                                : null}{" "}
                              ?
                            </h4>
                            <div className="timeslctDiv">
                              <div className="selectTimecards">
                                <div className="row justify-content-center-lg m-0">
                                  {EventTimingData.map((timeOption, index) => (
                                    <div
                                      key={index}
                                      className="col-lg-4 col-6"
                                      onClick={() =>
                                        handleTimeSelection(timeOption)
                                      }
                                    >
                                      <div className="selectTimecard">
                                        <p>
                                          {timeOption.timing_name}
                                          <br />
                                          {TimeformateChange(
                                            timeOption.timing_from
                                          )}{" "}
                                          To{" "}
                                          {TimeformateChange(
                                            timeOption.timing_to
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {stepclick === 3 && (
                          <div className="headandcarddiv">
                            <h4>
                              How many guests do you expect for your{" "}
                              {selectedCardValue
                                ? selectedCardValue.event_list_name
                                : null}{" "}
                              ?
                            </h4>
                            <div className="timeslctDiv">
                              <div className="selectTimecards">
                                <div className="row justify-content-center-lg m-0">
                                  {guetOptions.map((guestOption, index) => (
                                    <div key={index} className="col-lg-4 col-6">
                                      <div
                                        className="selectTimecard selectguestcard"
                                        onClick={() =>
                                          handleGuestSelection(
                                            guestOption.guest_no
                                          )
                                        }
                                      >
                                        <p>{guestOption.range}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="gCountInput">
                              <input
                                id="guestCountInput"
                                type="text"
                                placeholder="Enter No of Guests Manually"
                                onInput={handleNumbersChange}
                                maxLength="6"
                              />
                              <div
                                className="gCountInputImg"
                                onClick={handleManualGuestInput}
                              >
                                <img
                                  src={Right}
                                  alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                                />
                              </div>
                            </div>
                            {enterGuest && (
                              <p className="condition_error">
                                Please select number of guests or enter
                                manually.
                              </p>
                            )}
                          </div>
                        )}
                        {stepclick === 4 && (
                          <div className="headandcarddiv">
                            <h4>Please Enter Your Details to Get A Quote</h4>
                            <form
                              className="needs-validation width_100_per"
                              id="CarrerformData2"
                            >
                              <div className="detailsInputContaienr">
                                <input
                                  type="text"
                                  placeholder="Enter Your Name"
                                  className="form-control  trio_mandatory trio_name mt-0"
                                  name="admin_name"
                                  id="admin_name"
                                  maxLength={50}
                                  onInput={handleAphabetsChange}
                                />
                                <span
                                  style={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                    marginTop: "-0.5rem",
                                  }}
                                  className="condition_error"
                                ></span>
                                <PhoneInput
                                  id="phone"
                                  name="phone"
                                  className="mt-2"
                                  defaultCountry="in"
                                  value={userNumber}
                                  onChange={(phone) => setUserNumber(phone)}
                                />
                                <span
                                  style={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                  }}
                                  className="condition_error"
                                ></span>
                                <input
                                  type="text"
                                  className="form-control  trio_email"
                                  name="admin_email"
                                  id="admin_email"
                                  maxLength={100}
                                  onInput={handleEmailChange}
                                  placeholder="Enter Email Id"
                                />
                                <span
                                  style={{
                                    fontWeight: "400",
                                    fontSize: "13px",
                                  }}
                                  className="condition_error "
                                ></span>
                              </div>
                            </form>
                            <div className="detailsBtns">
                              <button
                                className="pricebnt"
                                onClick={() =>
                                  handleSaveChangesdynamic(
                                    "CarrerformData2",
                                    save_enquiry_website
                                  )
                                }
                              >
                                <p>Check Price and Availability</p>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div>
                    <div className="adressContiaer">
                      <img src={Phone}  alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues" />
                      <p style={{ cursor: "pointer" }} onClick={openModal}>
                        {websitedata.website_contact_no_first}
                      </p>
                      <p> {websitedata.website_contact_no_second}</p>
                    </div>
                    <div className="emailCOnriaenr">
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={handleEmailClick}
                      >
                        Email: {websitedata.website_email}
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default CheckAvail;
