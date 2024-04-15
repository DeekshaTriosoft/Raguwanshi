import React from "react";
import "./Css/404.css";
import PageNotFoundImg from "../../Assests/images/page_not_found.gif";
import Header from "./Header";

function PageNotFound() {
  return (
    <div>
      <Header />

      <div className="page_not_found d-flex justify-content-center">
        <div id="social_icons_scrolling"></div>
        <div id="footer_icons_hide"></div>
        <div className="text-center d-flex flex-column align-items-center">
          <img
            src={PageNotFoundImg}
            alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
            title="Raghuvanshi Hall"
          />
          <div className="text_div">
            <h1>Sorry, this page isn't available.</h1>
            <h5>
              The link you followed isn't available now, or the page may have
              been removed.<br className="br_hidden"></br>{" "}
              <span>
                <a href="/">Go back to Home.</a>
              </span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
