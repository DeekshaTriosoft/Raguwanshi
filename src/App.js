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
import SliderDashboardView from "./Components/AdminPanel/SliderDashboardView";
import SliderDashboardAdd from "./Components/AdminPanel/SliderDashboardAdd";
import "font-awesome/css/font-awesome.min.css";
import "./Css/AdminPanel.css";
import "./Css/Loading.css";
import "./Css/AdminLogin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ScrollToTop from "./ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  server_post_data,
  seo_data_url,
} from "./ServiceConnection/serviceconnection.js";
function App() {
  const [SEOloop, setSEOloop] = useState([]);
  // const match_and_return_seo_link_and_page = (
  //   call_function_name,
  //   pretty_function_name,
  //   dynamic_title_ss,
  //   favicon_sss
  // ) => {
    // let data_seo_link_final = "";

    // if (call_function_name === "/") {
    //   data_seo_link_final = pretty_function_name + "~@~1";
    // } else if (call_function_name === "/AboutUS") {
    //   data_seo_link_final = pretty_function_name + "~@~2";
    // } else if (call_function_name === "/Gallery") {
    //   data_seo_link_final = pretty_function_name + "~@~3";
    // } else if (call_function_name === "/BookHall") {
    //   data_seo_link_final = pretty_function_name + "~@~4";
    // } else if (call_function_name.includes("blog/blog_detail")) {
    //   data_seo_link_final = pretty_function_name + "~@~5";
    // }
    // return data_seo_link_final;
  // };

  // const get_page_name = (page_number) => {
  //   let data_seo_link_final = "";

  //   if (page_number === "1") {
  //     data_seo_link_final = <Home />;
  //   } else if (page_number === "3") {
  //     data_seo_link_final = <Gallery />;
  //   } else if (page_number === "5") {
  //     data_seo_link_final = <Blog />;
  //   }

  //   return data_seo_link_final;
  // };

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
// console.log(SEOloop)
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Website Pages */}
        <Route path="/" element={<AdminLogin />} />

        {/* {SEOloop.map((data, index) => {
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
              // element={get_page_name(stringArray[1])}
            />
          );
        })} */}

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
        
       

        {/* admin panel */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
