import React, { useState, useEffect } from "react";
import CompanyLogoBlack from "../../Assests/images/RaghuvanshiBlack.svg";
import Marker from "../../Assests/images/icon _map marker_.svg";
import Phone from "../../Assests/images/icon _viber_.svg";
import SnapChat from "../../Assests/images/snapchat.png";
import {
  handleEmailChange,
  handleLinkClick,
  combiled_form_data,
  check_vaild_save,
  empty_form,
} from "../../CommonJquery/CommonJquery";
import FaceBook from "../../Assests/images/Facebook.svg";
import Instagrm from "../../Assests/images/Instagram.svg";
import Youtube from "../../Assests/images/Youtube.svg";
import Pintrst from "../../Assests/images/Social.svg";
import { Link as ScrollLink } from "react-scroll";
import { Link, Link as RouterLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import CheckButton from "./CheckButton";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  server_post_data,
  get_all_website_data,
  save_subscribe,
} from "../../ServiceConnection/serviceconnection.js";

function Footer() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const [isSubscriptionVisible, setIsSubscriptionVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailEmpty, setisEmailEmpty] = useState(false);
  const [email, setEmail] = useState("");
  const { pathname } = useLocation();
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [websitedata, setwebsitedata] = useState([]);
  const handleEmailClick = () => {
    window.location.href = `mailto:${"Contact@raghuvanshihall.com"}`;
  };

  const handlePhoneCall = (website_contact_no_first) => {
    handleLinkClick("tel:" + website_contact_no_first);
  };

  const handleWhatsAppMessage = (website_contact_no_first) => {
    handleLinkClick("https://wa.me/" + website_contact_no_first);
  };

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const [showModal1, setShowModal1] = useState(false);
  const openModal1 = () => {
    setShowModal1(true);
  };
  const closeModal1 = () => {
    setShowModal1(false);
  };

  const handleEvents = () => {
    // Navigate to the home page
    navigate("/");

    setTimeout(() => {
      document.getElementById("eventsref").scrollIntoView({
        behavior: "smooth",
      });
    }, 3);
  };

  useEffect(() => {
    const start_date = "";
    const end_date = "";
    const flag = "3";
    const call_id = "0";
    master_data_get(start_date, end_date, flag, call_id);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;

    // Check if there are multiple occurrences of '@' or '.'
    if (inputValue.split("@").length > 2 || inputValue.split(".").length > 2) {
      // Clear the input if it violates the condition
      e.target.value = "";
    } else if (!/^[a-zA-Z0-9@.]*$/.test(inputValue)) {
      // If the input contains any other invalid character, clear the input
      e.target.value = "";
    }
    setIsEmailValid(true);
    setisEmailEmpty(false);
  };

  const master_data_get = async (start_date, end_date, flag, call_id) => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("admin_id", "0");
    await server_post_data(get_all_website_data, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setwebsitedata(Response.data.message.data_website[0]);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  const handleSaveChangesdynamic = async (form_data, url_for_save) => {
    setIsSubscriptionVisible(true);
    // setIsEmailValid(true);
    if (email.trim() === "") {
      setIsSubscriptionVisible(true); // Show the subscription form
      setisEmailEmpty(true);
      let vaild_data = check_vaild_save(form_data);
      setisEmailEmpty(false);
      if (vaild_data) {
        setIsEmailValid(false);
        setshowLoaderAdmin(true);
        openModal1(true);
        let fd_from = combiled_form_data(form_data, null);
        await server_post_data(url_for_save, fd_from)
          .then((Response) => {
            setshowLoaderAdmin(false);
            setIsSubscriptionVisible(false);
            if (!Response.data.error) {
              alert(Response.data.message);
            }
            empty_form(form_data);
          })
          .catch((error) => {
            setshowLoaderAdmin(false);
          });
      }
    }
  };

  return (
    <>
      <div className="footer">
        {pathname !== "/BookHall" && <CheckButton />}
        <div className="footercontainer">
          <div className="companyBranding">
            <a href="/">
              <img
                src={CompanyLogoBlack}
                title="Raghuvanshi Hall"
                alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
              />
            </a>
          </div>
          <div className="footerDetails container-lg">
            <div className="footerDetailsContainer">
              <div className="row m-0 paddingZero">
                <div className="col-md-4 col-sm-6 col-10 bordernone1 borderVertical">
                  <div className="uselInks">
                    <h5>
                      <span style={{ textDecoration: "underline" }}>
                        Useful
                      </span>{" "}
                      Links
                    </h5>
                    <div className="uselInksCOntaier">
                      <ul>
                        {/* <li>
                        <RouterLink
                          className="nav-link"
                          onClick={() => handleLinkClick("/Gallery")}
                        >
                          LUXURY Hall
                        </RouterLink>
                      </li> */}
                        <li>
                          <ScrollLink
                            className="nav-link"
                            to="amenities"
                            smooth={true}
                            duration={200}
                            offset={-window.innerHeight / 18}
                          >
                            CUISINES
                          </ScrollLink>
                        </li>
                        <li>
                          <ScrollLink
                            className="nav-link"
                            to="amenities"
                            smooth={true}
                            duration={200}
                            offset={-window.innerHeight / 18}
                          >
                            IN HOUSE CATERING
                          </ScrollLink>
                        </li>
                        <li>
                          <ScrollLink
                            className="nav-link"
                            to="eventsref"
                            smooth={true}
                            duration={200}
                            offset={-window.innerHeight / 10}
                            onClick={handleEvents}
                          >
                            EVENTS
                          </ScrollLink>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <RouterLink
                            className="nav-link"
                            onClick={() => handleLinkClick("/AboutUS")}
                          >
                            ABOUT US
                          </RouterLink>
                        </li>
                        {/* <li>
                        <RouterLink
                          className="nav-link"
                          onClick={() => handleLinkClick("/AboutUS")}
                        >
                          OUR HISTORY
                        </RouterLink>
                      </li> */}
                        <li>
                          <RouterLink
                            className="nav-link"
                            onClick={() => handleLinkClick("/Gallery")}
                          >
                            GALLERY
                          </RouterLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 bordernone borderVertical">
                  <div id="contactus" className="contactCOntaier">
                    <div className="adressContiaer">
                      <img
                        src={Marker}
                        title="Raghuvanshi Hall"
                        alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                      />
                      <p>{websitedata.website_address}</p>
                    </div>
                    <div className="adressContiaer">
                      <img
                        src={Phone}
                        title="Raghuvanshi Hall"
                        alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                      />
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
                  </div>
                </div>
                <div className="col-md-4 col-sm-8">
                  <div className="followUs">
                    <div className="subscribe">
                      <h5>
                        <span style={{ textDecoration: "underline" }}>
                          Subscribe
                        </span>{" "}
                        Our Newsletter
                      </h5>
                      <form
                        className="needs-validation width_100_per"
                        id="CarrerformData"
                      >
                        <input
                          type="text"
                          className="form-control  trio_mandatory trio_email"
                          name="admin_email"
                          id="admin_email"
                          maxLength={60}
                          placeholder="Enter Your Email Id"
                          onInput={handleEmailChange}
                        />
                      </form>
                      <div style={{ position: "relative" }}>
                        <button
                          onClick={() =>
                            handleSaveChangesdynamic(
                              "CarrerformData",
                              save_subscribe
                            )
                          }
                        >
                          Subscribe Now
                        </button>
                        {isSubscriptionVisible && (
                          <div
                            id="subscriptionForm"
                            style={{
                              position: "absolute",
                              top: 0,
                              fontSize: "12px",
                              color: "red",
                            }}
                          >
                            {isEmailEmpty && "Please Fill Your Email ID"}
                            {isEmailValid && "Please Fill a Valid Email ID"}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="socialLink">
                      <h5>
                        <span style={{ textDecoration: "underline" }}>
                          Follow
                        </span>{" "}
                        Us
                      </h5>
                      <ul>
                        <li>
                          <a href={websitedata.website_facebook_link}>
                            <img
                              src={FaceBook}
                              title="Raghuvanshi Hall"
                              alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                            />
                          </a>
                        </li>
                        <li>
                          <a href={websitedata.website_instagram_link}>
                            <img
                              src={Instagrm}
                              title="Raghuvanshi Hall"
                              alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                            />
                          </a>
                        </li>
                        {/* <li>
                        <a href={websitedata.website_pinterest_link}>
                          <img
                            src={Pintrst}
                            title="Raghuvanshi Hall"
                            alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                          />
                        </a>
                      </li>
                      <li>
                        <a href={websitedata.website_youtube_link}>
                          <img
                            src={Youtube}
                            title="Raghuvanshi Hall"
                            alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                          />
                        </a>
                      </li>
                      <li>
                        <a href={websitedata.website_snap_link}>
                          <img
                            src={SnapChat}
                            title="Raghuvanshi Hall"
                            alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                          />
                        </a>
                      </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footerFoot">
          <div className="footerFootTxt">
            <span>&#169;</span> <span>All Rights Reserved. </span>
            <RouterLink to="/privacy_policy">| Privacy Policy </RouterLink>
            <Link to="/TermsofUse">| Terms & Conditions</Link>
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
        <Modal.Header
          style={{ borderBottom: "none", backgroundColor: "#ffffff" }}
          closeButton
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal_body">
          <p>
            "Would you prefer a call or a WhatsApp message? Your choice. Thank
            you!"
          </p>
        </Modal.Body>
        <Modal.Footer>
          {/* <div onClick={closeModal} className="btn go_to_login cancelLogout">
            Cancel
          </div> */}
          <div
            onClick={() =>
              handlePhoneCall(websitedata.website_contact_no_first)
            }
            className="btn go_to_login confirmLogout"
          >
            Call
          </div>
          <div
            onClick={() =>
              handleWhatsAppMessage(websitedata.website_contact_no_first)
            }
            className="btn go_to_login cancelLogout"
          >
            Whatsapp
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        id="myModal"
        show={showModal1}
        onHide={closeModal1}
        centered
        backdrop="static"
      >
        <Modal.Header
          style={{ borderBottom: "none", backgroundColor: "#ffffff" }}
          closeButton
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal_body">
          <p>
            Thank you for subscribing to our newsletter! 🌟 We're delighted to
            have you on board as we embark on a journey of love, joy, and
            beautiful celebrations.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div onClick={closeModal1} className="btn go_to_login cancelLogout">
            Close
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Footer;
