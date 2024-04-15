import React from "react";
import appontSvg from "../../Assests/images/cloackCal.png";
import { Link as RouterLink } from "react-router-dom";
import { handleLinkClick } from "../../CommonJquery/CommonJquery.js";
function CheckButton() {
  return (
    <div className={`frontBarItem checkAvailBtnFixed  d-md-none `}>
      <RouterLink onClick={() => handleLinkClick("/BookHall")}>
        <button>
          <img
            src={appontSvg}
            alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
          />
          <p style={{ textDecoration: "none" }}>Check Availability</p>
        </button>
      </RouterLink>
    </div>
  );
}

export default CheckButton;
