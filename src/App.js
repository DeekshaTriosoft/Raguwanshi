import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./Components/AdminPanel/AdminLogin";
import AdminDashboard from "./Components/AdminPanel/AdminDashboard";
import BlogDashboardView from "./Components/AdminPanel/BlogDashboardView";
import BlogDashboardAdd from "./Components/AdminPanel/BlogDashboardAdd";
import SeoDashboardView from "./Components/AdminPanel/SeoDashboardView";
import SeoDashboardAdd from "./Components/AdminPanel/SeoDashboardAdd";
import ImageDashboardView from "./Components/AdminPanel/ImageDashboardView";
import ImageDashboardAdd from "./Components/AdminPanel/ImageDashboardAdd";
// import MenuDashboardView from "./Components/AdminPanel/MenuDashboardView";
// import MenuDashboardAdd from "./Components/AdminPanel/MenuDashboardAdd";
// import TestimonialDashboardView from "./Components/AdminPanel/TestimonialDashboardView";
import WebsiteDashboardAdd from "./Components/AdminPanel/WebsiteDashboardAdd";
// import TestimonialDashboardAdd from "./Components/AdminPanel/TestimonialDashboardAdd";
// import TeamDashboardView from "./Components/AdminPanel/TeamDashboardView";
// import TeamDashboardAdd from "./Components/AdminPanel/TeamDashboardAdd";
// import SubscribeDashboardView from "./Components/AdminPanel/SubscribeDashboardView";
import SliderDashboardView from "./Components/AdminPanel/SliderDashboardView";
import SliderDashboardAdd from "./Components/AdminPanel/SliderDashboardAdd";
// import HallDashboardView from "./Components/AdminPanel/HallDashboardView";
// import HallDashboardAdd from "./Components/AdminPanel/HallDashboardAdd";
// import EventTimingDashboardView from "./Components/AdminPanel/EventTimingDashboardView";
// import EventTimingDashboardAdd from "./Components/AdminPanel/EventTimingDashboardAdd";
// import EventListDashboardView from "./Components/AdminPanel/EventListDashboardView";
// import EventListDashboardAdd from "./Components/AdminPanel/EventListDashboardAdd";
// import GalleryWebsiteDashboardView from "./Components/AdminPanel/GalleryWebsiteDashboardView";
// import GalleryWebsiteDashboardAdd from "./Components/AdminPanel/GalleryWebsiteDashboardAdd";
// import StaffDashboardView from "./Components/AdminPanel/StaffDashboardView";
// import StaffDashboardAdd from "./Components/AdminPanel/StaffDashboardAdd";
// import EnquiryDashboardAdd from "./Components/AdminPanel/EnquiryDashboardAdd";
// import EnquiryDashboardView from "./Components/AdminPanel/EnquiryDashboardView";
// import EnquiryDashboardDetails from "./Components/AdminPanel/EnquiryDashboardDetails";
// import EnquiryDashboardAskAgain from "./Components/AdminPanel/EnquiryDashboardAskAgain";
// import EnquiryDashboardConfirm from "./Components/AdminPanel/EnquiryDashboardConfirm";
// import CustomerBookingDashboardView from "./Components/AdminPanel/CustomerBookingDashboardView";
// import CustomerBookingDashboardDetails from "./Components/AdminPanel/CustomerBookingDashboardDetails";
// import CustomerBookingInvoice from "./Components/AdminPanel/CustomerBookingInvoice";
// import EnquiryAssignDashboardView from "./Components/AdminPanel/EnquiryAssignDashboardView";
// import EnquiryCompleteDashboardView from "./Components/AdminPanel/EnquiryCompleteDashboardView";
// import FeedbackDashboardView from "./Components/AdminPanel/FeedbackDashboardView";
// import LandmarkDashboardView from "./Components/AdminPanel/LandmarkDashboardView";
// import LandmarkDashboardAdd from "./Components/AdminPanel/LandmarkDashboardAdd";
// import UserMasterDashboardView from "./Components/AdminPanel/UserMasterDashboardView";
// import UserMasterDashboardAdd from "./Components/AdminPanel/UserMasterDashboardAdd";
// import UserMasterStaffDashboardEdit from "./Components/AdminPanel/UserMasterStaffDashboardEdit";
// import LeadDashboardView from "./Components/AdminPanel/LeadDashboardView";
import "font-awesome/css/font-awesome.min.css";
import "./Css/AdminPanel.css";
import "./Css/Loading.css";
import "./Css/AdminLogin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./Components/Website/Home";
// import AboutUs from "./Components/Website/AboutUs";
import Gallery from "./Components/Website/Gallery";
import Blog from "./Components/Website/Blog";
import ScrollToTop from "./ScrollToTop";
import CheckAvail from "./Components/Website/CheckAvail";
import AOS from "aos";
import "aos/dist/aos.css";
import ExtraPage from "./Components/Website/ExtraPage";
import PageNotFound from "./Components/Website/404";
import {
  server_post_data,
  seo_data_url,
} from "./ServiceConnection/serviceconnection.js";
// import EnquiryDashboardViewDetails from "./Components/AdminPanel/EnquiryDashboardViewDetails.js";
function App() {
  const [SEOloop, setSEOloop] = useState([]);
  const match_and_return_seo_link_and_page = (
    call_function_name,
    pretty_function_name,
    dynamic_title_ss,
    favicon_sss
  ) => {
    let data_seo_link_final = "";

    if (call_function_name === "/") {
      data_seo_link_final = pretty_function_name + "~@~1";
    } else if (call_function_name === "/AboutUS") {
      data_seo_link_final = pretty_function_name + "~@~2";
    } else if (call_function_name === "/Gallery") {
      data_seo_link_final = pretty_function_name + "~@~3";
    } else if (call_function_name === "/BookHall") {
      data_seo_link_final = pretty_function_name + "~@~4";
    } else if (call_function_name.includes("blog/blog_detail")) {
      data_seo_link_final = pretty_function_name + "~@~5";
    }
    return data_seo_link_final;
  };

  const get_page_name = (page_number) => {
    let data_seo_link_final = "";

    if (page_number === "1") {
      data_seo_link_final = <Home />;
    } else if (page_number === "3") {
      data_seo_link_final = <Gallery />;
    } else if (page_number === "4") {
      data_seo_link_final = <CheckAvail />;
    } else if (page_number === "5") {
      data_seo_link_final = <Blog />;
    }

    return data_seo_link_final;
  };

  const handleFetchData = async () => {
    await server_post_data(seo_data_url, null)
      .then((Response) => {
        if (!Response.data.error) {
          setSEOloop(Response.data.message.seo_loop);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    handleFetchData();
    AOS.init();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Website Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/BookHall" element={<CheckAvail />} />
        <Route path="/ExtraPage" element={<ExtraPage />} />
        <Route path="/blog/blog_detail/:id" element={<Blog />} />

        {SEOloop.map((data, index) => {
          const for_loop_come = match_and_return_seo_link_and_page(
            data.call_function_name,
            data.pretty_function_name,
            data.title,
            data.favicon
          );
          const stringArray = for_loop_come.split("~@~");

          return (
            <Route
              key={index}
              path={stringArray[0]}
              element={get_page_name(stringArray[1])}
            />
          );
        })}

        {/* Website Pages */}
        {/* admin panel */}
        <Route path="/adminlogin*" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/blogDashboardView" element={<BlogDashboardView />} />
        <Route path="/BlogDashboardAdd" element={<BlogDashboardAdd />} />
        <Route path="/BlogDashboardEdit/:id" element={<BlogDashboardAdd />} />
        <Route path="/seoDashboardView" element={<SeoDashboardView />} />
        <Route path="/SeoDashboardAdd" element={<SeoDashboardAdd />} />
        <Route path="/SeoDashboardEdit/:id" element={<SeoDashboardAdd />} />
        <Route path="/imageDashboardView" element={<ImageDashboardView />} />
        <Route path="/ImageDashboardAdd" element={<ImageDashboardAdd />} />
        <Route path="/ImageDashboardEdit/:id" element={<ImageDashboardAdd />} />
        <Route path="/sliderDashboardView" element={<SliderDashboardView />} />
        <Route path="/sliderDashboardAdd" element={<SliderDashboardAdd />} />
        <Route
          path="/sliderDashboardEdit/:id"
          element={<SliderDashboardAdd />}
        />
        
       

        <Route path="/*" element={<PageNotFound />} />
        {/* admin panel */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
