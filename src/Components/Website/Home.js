// import React, { useEffect, useState, useRef } from "react";
// import "./Css/Home.css";
// import Header from "./Header";
// import SliderImg2 from "../../Assests/images/sliderimg2.png";
// import Loacator from "../../Assests/images/locator.png";
// import CIrcle from "../../Assests/images/luxury.svg";
// import CIrcle1 from "../../Assests/images/music.svg";
// import CIrcle2 from "../../Assests/images/exlntservice.svg";
// import appontSvg from "../../Assests/images/cloackCal.png";
// import WlcmImg from "../../Assests/images/residence-area.png";
// import BeautifulImg1 from "../../Assests/images/beauty1.png";
// import BeautifulImg2 from "../../Assests/images/beauty2.png";
// import ExploreIcon from "../../Assests/images/exploreIcon.svg";
// import Catering from "../../Assests/images/catering.svg";
// import Staff from "../../Assests/images/staff.svg";
// import BridalRoom from "../../Assests/images/bridalroom.svg";
// import Decor from "../../Assests/images/decor.svg";
// import Cuisines from "../../Assests/images/cuisins.svg";
// import Prev from "../../Assests/images/prev.svg";
// import Next from "../../Assests/images/next.svg";
// import EvntImg1 from "../../Assests/images/eventimg1.png";
// import EvntImg2 from "../../Assests/images/eventimg2.png";
// import EvntImg3 from "../../Assests/images/eventimg3.png";
// import RatingStar from "../../Assests/images/stars.svg";
// import OwlCarousel from "react-owl-carousel";
// import QuoteImg from "../../Assests/images/Quotation.svg";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Footer from "./Footer";
// import { Link } from "react-router-dom";
// import { Link as ScrollLink } from "react-scroll";
// import {
//   APL_LINK,
//   server_post_data,
//   get_all_home_front,
// } from "../../ServiceConnection/serviceconnection.js";
// import {
//   handleLinkClick,
//   DateormateBlogChange,
// } from "../../CommonJquery/CommonJquery.js";
// import $ from "jquery";
// import { width } from "@mui/system";
// function Home() {
//   const sliderRef1 = useRef(null);
//   const sliderRef2 = useRef(null);

//   const [showFullText, setShowFullText] = useState(false);
//   const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
//   const [silderImage, setsilderImage] = useState([]);
//   const [silderImage2, setsilderImage2] = useState([]);
//   const [LandmarkImage2, setLandmarkImage2] = useState([]);
//   const [TesmonialsImage2, setTesmonialsImage2] = useState([]);
//   const [SEOloop, setSEOloop] = useState([]);
//   const [addBlog, setaddBlog] = useState([]);
//   const [Imagedata, setImagedata] = useState([]);
//   const toggleText = () => {
//     setShowFullText(!showFullText);
//   };
//   const description = `The team of Raghuvanshi Hall offers an array of multi-cuisine menus for your event. On the vegetarian side, they have North Indian, South Indian, and Rajasthani, with Indian street food, Pans, churans, etc. along with this they have Italian under western cuisine section and Chinese under the Oriental section. Their arrangements and fresh usage of ingredients will give you the best food that will make all the guests have a delicious night on your wedding day.`;

//   // Display only the first 3 lines on mobile
//   const truncatedText = showFullText
//     ? description
//     : `${description.slice(0, 150)}...`;

//   const optionsFront = {
//     items: 1,
//     loop: true,
//     autoplay: true,
//     margin: 0,
//     center: true,
//     nav: true,
//     dots: false,
//   };

//   const options = {
//     loop: true,
//     margin: 10,
//     nav: false,
//     responsive: {
//       0: {
//         items: 1,
//       },
//       500: {
//         items: 2,
//       },
//       900: {
//         items: 3,
//       },
//     },
//   };

//   const setEqualHeight = () => {
//     const items = document.querySelectorAll(".owl-theme2 .testicontainer");

//     let maxHeight = 0;

//     // Reset the height to 'auto' before recalculating
//     items.forEach((item) => {
//       item.style.height = "auto";
//       maxHeight = Math.max(maxHeight, item.offsetHeight);
//     });

//     // Set the height of all items to the maximum height
//     items.forEach((item) => {
//       item.style.height = `${maxHeight}px`;
//     });
//   };

//   const master_data_get = async (start_date, end_date, flag, call_id) => {
//     setshowLoaderAdmin(true);
//     const fd = new FormData();
//     fd.append("admin_id", "0");
//     await server_post_data(get_all_home_front, fd)
//       .then((Response) => {
//         if (Response.data.error) {
//           alert(Response.data.message);
//         } else {
//           console.log(Response.data.message);

//           setsilderImage2(Response.data.message.data_silder2);
//           setLandmarkImage2(Response.data.message.data_silder3);
//           setTesmonialsImage2(Response.data.message.data_tesmonial);
//           setSEOloop(Response.data.message.data_seo);
//           setaddBlog(Response.data.message.data_blog);
//           setImagedata(Response.data.message.data_silder_image);

//           const sliderImageData = [];

//           Response.data.message.data_silder.map((item, index) => {
//             sliderImageData.push({
//               image_link:
//                 APL_LINK +
//                 Response.data.message.data_silder_image +
//                 item.silder_image_name,
//               silder_content: item.silder_content,
//             });
//           });

//           setsilderImage(sliderImageData);
//         }

//         setshowLoaderAdmin(false);
//       })
//       .catch((error) => {
//         setshowLoaderAdmin(false);
//       });
//   };

//   const handleNextClick = () => {
//     // Access the Owl Carousel instance and trigger the next slide
//     sliderRef1.current.next();
//     sliderRef2.current.next();
//   };

//   const handlePrevClick = () => {
//     // Access the Owl Carousel instance and trigger the previous slide
//     sliderRef1.current.prev();
//     sliderRef2.current.prev();
//   };

//   useEffect(() => {
//     // Event delegation to handle dynamic content
//     $(document).on("click", ".custom-next", handleNextClick);
//     $(document).on("click", ".custom-prev", handlePrevClick);

//     // Cleanup the event listeners when the component unmounts
//     return () => {
//       $(document).off("click", ".custom-next", handleNextClick);
//       $(document).off("click", ".custom-prev", handlePrevClick);
//     };
//   }, []);

//   useEffect(() => {
//     const start_date = "";
//     const end_date = "";
//     const flag = "3";
//     const call_id = "0";

//     master_data_get(start_date, end_date, flag, call_id);

//     // Call the setEqualHeight function initially and on window resize
//     setEqualHeight();
//     window.addEventListener("touchstart", setEqualHeight, { passive: true });

//     // Clean up the event listener when the component is unmounted
//     return () => {
//       window.removeEventListener("touchstart", setEqualHeight);
//     };
//   }, []);

//   const match_and_return_seo_link = (v_id) => {
//     let data_seo_link_final = "/blog/blog_detail/" + v_id;
//     let data_seo_link = data_seo_link_final;
//     if (SEOloop) {
//       const matchedItem = SEOloop.find((data) => {
//         return data_seo_link === data.call_function_name;
//       });

//       if (matchedItem) {
//         data_seo_link_final = matchedItem.pretty_function_name;
//       }
//     }
//     return data_seo_link_final;
//   };

//   const frontSlides = silderImage.map((item, index) => (
//     <div className="sliderItem" key={index}>
//       <img
//         src={item.image_link}
//         title="Raghuvanshi Hall"
//         alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//       />
//       <div className="sliderItemTextCntr">
//         <h2 className="carousel-text sliderItemText">{item.silder_content}</h2>
//       </div>
//     </div>
//   ));

//   return (
//     <div className="home">
//       <h1 className="cursiveHead hidden">
//         Raghuvanshi Hall - Perfect Wedding Venue in Thane, Maharashtra
//       </h1>
//       <Header />
//       <div className="home_Container">
//         <section className="frontScreen">
//           <div className="frontScreenContainer">
//             {silderImage.length > 0 && (
//               <OwlCarousel className="owl-theme3" {...optionsFront}>
//                 {frontSlides}
//               </OwlCarousel>
//             )}
            
//             <div className="frontBar">
//               <div className="frontBarCol col-xl-10 col-md-11 m-auto">
//                 <div className="frontBarContaienr">
//                   <div className="frontBarItemList m-0">
//                     <div className="frontBarItem">
//                       <img
//                         src={CIrcle}
//                         title="Raghuvanshi Hall"
//                         alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                       />
//                       <div>
//                         <h5>Luxurious Hall</h5>
//                         <Link to="/AboutUs">
//                           <p>Learn more</p>
//                         </Link>
//                       </div>
//                     </div>
//                     <hr
//                       style={{
//                         borderLeft: "2px solid #FFF4E6",
//                         height: "60px",
//                         width: "2px",
//                       }}
//                     />
//                     <div className="frontBarItem">
//                       <img
//                         src={CIrcle1}
//                         title="Raghuvanshi Hall"
//                         alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                       />
//                       <div>
//                         <h5>Musical Dinning</h5>
//                         <Link to="/AboutUs">
//                           <p>Learn more</p>
//                         </Link>
//                       </div>
//                     </div>
//                     <hr
//                       style={{
//                         borderLeft: "2px solid #FFF4E6",
//                         height: "60px",
//                         width: "2px",
//                       }}
//                     />
//                     <div className="frontBarItem">
//                       <img
//                         src={CIrcle2}
//                         title="Raghuvanshi Hall"
//                         alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                       />
//                       <div>
//                         <h5>Excellent Service</h5>
//                         <Link to="/AboutUs">
//                           <p>Learn more</p>
//                         </Link>
//                       </div>
//                     </div>
//                     <hr
//                       className="d-none d-md-block"
//                       style={{
//                         borderLeft: "2px solid #FFF4E6",
//                         height: "60px",
//                         width: "2px",
//                       }}
//                     />
//                     <div className="frontBarItem d-none d-md-block">
//                       <Link onClick={() => handleLinkClick("/BookHall")}>
//                         <button>
//                           <img
//                             src={appontSvg}
//                             title="Raghuvanshi Hall"
//                             alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                           />
//                           <p style={{ textDecoration: "none" }}>
//                             Check Availability
//                           </p>
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="welcome">
//           <div className="welcomCOntainer">
//             <h2 className="cursiveHead">Welcome</h2>
//             <h3 className="normalHead">Celebrate with Elegance</h3>
//             <div className="wlcmimgtext">
//               <div className="row m-0">
//                 <div className="col-md-6">
//                   <div className="wlcmImg" data-aos="zoom-in">
//                     <img
//                       src={WlcmImg}
//                       title="Raghuvanshi Hall"
//                       alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                     />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="wlcmText">
//                     <p>
//                       Are you looking for a perfect wedding venue for your
//                       perfect wedding? You don’t have to look any further
//                       because Raghuvanshi Hall, one of the best marriage halls
//                       in Thane, Maharashtra, is here with its well-equipped
//                       facilities to make your special moment worth remembering
//                       for a lifetime.
//                     </p>
//                     <br className="brhide" />
//                     <h6>
//                       With easy access to services from all parts of the city,
//                       the team of professional staff can assure you to turn your
//                       event into an exceptional and unparalleled moment of your
//                       life.
//                     </h6>
//                     <br className="d-none d-block-lg" />
//                     <div className="wlcmSign">
//                       <h6>Mr.Hemant Palwankar</h6>
//                       <p>Banquet manager</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="highlights">
//           <div className="highlightsContaien">
//             <h2 className="cursiveHead">highlights</h2>
//             <h3 className="normalHead">Experience The Infinity</h3>
//             <div className="highImg">
//               <div className="col-sm-11 p-0 m-auto">
//                 <div className="highTextCOntiaenr">
//                   <img
//                     src={SliderImg2}
//                     title="Raghuvanshi Hall"
//                     alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                   />
//                   <div className="highTextCOl col-11 m-auto">
//                     <div className="highText" data-aos="fade-up">
//                       <h2 className="normalHead normalHead2 ">
//                         Raghuvanshi Hall
//                       </h2>
//                       <p className="d-none d-sm-block">
//                         With a perfect blend of cuisine from all over the world,
//                         Raghuvanshi Hall which is a Low budget wedding hall in
//                         Thane, ensures that your special event is wrapped with
//                         deliciousness. They offer you the best multi-cuisine
//                         menu comprising North Indian, South Indian, Rajasthani,
//                         and Indian street food on one side along with Italian
//                         under Western cuisine and Chinese under the oriental
//                         section. The best culinary experience is provided
//                         through perfect arrangements and fresh usage of
//                         ingredients, making every bite delightful.
//                       </p>
//                       <div
//                         className={`event-description ${
//                           showFullText ? "expanded" : "collapsed"
//                         }`}
//                       >
//                         <p className="d-block d-sm-none">
//                           {truncatedText}
//                           <span
//                             style={{
//                               textDecoration: "underline",
//                               cursor: "pointer",
//                               fontWeight: "500",
//                             }}
//                             onClick={toggleText}
//                           >
//                             {showFullText ? "Read Less" : "Read More"}
//                           </span>
//                         </p>
//                       </div>
//                       <div className="smallhighBorder"></div>
//                       <p className="hightimeTExt">Open Daily: 10:00am-6:00pm</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="welcome mt-0" id="amenities">
//           <div className="welcomCOntainer">
//             <h2 className="cursiveHead">explore</h2>
//             <h3 className="normalHead mb-0">Our services</h3>
//             <div className="exploreMoreBnt mt-0">
//               <button>
//                 <p>view all rooms</p>
//                 <img
//                   src={ExploreIcon}
//                   title="Raghuvanshi Hall"
//                   alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                 />
//               </button>
//             </div>
//             <div className="wlcmimgtext">
//               <div className="row m-0">
//                 <div className="col-xl-6 col-md-5 hallImgWrapper">
//                   {/* <div className="owl-carousel owl-carouselHall"> */}
//                   {silderImage2.length > 0 && (
//                     <OwlCarousel
//                       className="owl-theme3 owl-carouselHall"
//                       {...optionsFront}
//                       ref={sliderRef1}
//                     >
//                       {silderImage2.map((item, index) => (
//                         <div className="hallSuiteImgContaienr" key={index}>
//                           <img
//                             src={APL_LINK + Imagedata + item.silder_image_name}
//                             title="Raghuvanshi Hall"
//                             alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                           />
//                         </div>
//                       ))}
//                     </OwlCarousel>
//                   )}
//                   {/* </div> */}
//                   <div className="Hallcustom-nav">
//                     <button className="custom-prev">
//                       <img
//                         src={Prev}
//                         title="Raghuvanshi Hall"
//                         alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                       />
//                     </button>
//                     <div className="custom-saperation"></div>
//                     <button className="custom-next">
//                       <img
//                         src={Next}
//                         title="Raghuvanshi Hall"
//                         alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                       />
//                     </button>
//                   </div>
//                 </div>
//                 <div className="col-xl-6 col-md-7">
//                   <div className="wlcmText hallsuitestexts">
//                     <h4>Services Offered</h4>
//                     <div className="my-lg-3 my-sm-2 my-3">
//                       <p>
//                         All the arrangements are taken care of by them to make
//                         your special day enjoyable and hassle-free. To make your
//                         wedding ceremony even more memorable, there are a range
//                         of services provided by the best banquet hall in Thane
//                         West which include:
//                       </p>
//                       <div className="servicesImgCOntaienr">
//                         <div className="amenitiesCArds">
//                           <div
//                             className="amenitiesCArdsItem"
//                             data-aos="fade-down"
//                           >
//                             <img
//                               src={Catering}
//                               title="Raghuvanshi Hall"
//                               alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                             />
//                             <p>In-house catering</p>
//                           </div>
//                           <div
//                             className="amenitiesCArdsItem"
//                             data-aos="fade-down"
//                             data-aos-delay="100"
//                           >
//                             <img
//                               src={Staff}
//                               title="Raghuvanshi Hall"
//                               alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                             />
//                             <p>Services staff</p>
//                           </div>
//                           <div
//                             className="amenitiesCArdsItem hideInMob"
//                             data-aos="fade-down"
//                             data-aos-delay="200"
//                           >
//                             <img
//                               src={BridalRoom}
//                               title="Raghuvanshi Hall"
//                               alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                             />
//                             <p>Bridal room</p>
//                           </div>
//                           <div
//                             className="amenitiesCArdsItem hideInMob"
//                             data-aos="fade-down"
//                             data-aos-delay="300"
//                           >
//                             <img
//                               src={Decor}
//                               title="Raghuvanshi Hall"
//                               alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                             />
//                             <p>In-house décor</p>
//                           </div>
//                           <div
//                             className="amenitiesCArdsItem"
//                             data-aos="fade-down"
//                             data-aos-delay="400"
//                           >
//                             <img
//                               src={Cuisines}
//                               title="Raghuvanshi Hall"
//                               alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                             />
//                             <p>Cuisines</p>
//                           </div>
//                         </div>
//                         <div className="amenitiesCArds hiddenAmenities">
//                           <div
//                             className="amenitiesCArdsItem"
//                             data-aos="fade-down"
//                             data-aos-delay="300"
//                           >
//                             <img
//                               src={Decor}
//                               title="Raghuvanshi Hall"
//                               alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                             />
//                             <p>In-house décor</p>
//                           </div>
//                           <div
//                             className="amenitiesCArdsItem"
//                             data-aos="fade-down"
//                             data-aos-delay="400"
//                           >
//                             <img
//                               src={BridalRoom}
//                               title="Raghuvanshi Hall"
//                               alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                             />
//                             <p>Bridal room</p>
//                           </div>
//                           <div
//                             style={{ opacity: "0" }}
//                             className="amenitiesCArdsItem"
//                           >
//                             <img
//                               src={Cuisines}
//                               title="Raghuvanshi Hall"
//                               alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                             />
//                             <p>Cuisines</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="contactNowBtn">
//                       <Link to="/BookHall">
//                         <button>Check Availability</button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="nearby" id="eventsref">
//           <div className="nearbyContainer">
//             <h2 className="cursiveHead">events</h2>
//             <h3 className="normalHead">
//               Make your moments unforgettable with Personalised Events.
//             </h3>
//             <div className="eventsSLiderContainer container-lg">
//               <OwlCarousel className="owl-theme" {...options}>
//                 <div className="hallSuiteImgContaienr">
//                   <img
//                     src={EvntImg1}
//                     title="Raghuvanshi Hall"
//                     alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                   />
//                   <div className="imgHead">HIGHLIGHTS</div>
//                   <div className="px-2">
//                     <h5>Meetings & Conferences</h5>
//                     <div className="exploreMoreBnt mt-0">
//                       <Link to="/Gallery">
//                         <button>
//                           <p>explore more</p>
//                           <img
//                             src={ExploreIcon}
//                             title="Raghuvanshi Hall"
//                             alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                           />
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="hallSuiteImgContaienr">
//                   <img
//                     src={EvntImg2}
//                     title="Raghuvanshi Hall"
//                     alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                   />
//                   <div className="imgHead">HIGHLIGHTS</div>
//                   <div className="px-2">
//                     <h5>Meetings & Conferences</h5>
//                     <div className="exploreMoreBnt mt-0">
//                       <Link to="/Gallery">
//                         <button>
//                           <p>explore more</p>
//                           <img
//                             src={ExploreIcon}
//                             title="Raghuvanshi Hall"
//                             alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                           />
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="hallSuiteImgContaienr">
//                   <img
//                     src={EvntImg3}
//                     title="Raghuvanshi Hall"
//                     alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                   />
//                   <div className="imgHead">HIGHLIGHTS</div>
//                   <div className="px-2">
//                     <h5>Meetings & Conferences</h5>
//                     <div className="exploreMoreBnt mt-0">
//                       <Link to="/Gallery">
//                         <button>
//                           <p>explore more</p>
//                           <img
//                             src={ExploreIcon}
//                             title="Raghuvanshi Hall"
//                             alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                           />
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </OwlCarousel>
//             </div>
//           </div>
//         </section>
//         {LandmarkImage2.length > 0 && (
//           <section className="nearby" id="landmarksRef">
//             <div className="nearbyContainer">
//               <h4>Nearby Landmarks</h4>
//               <div className="nearyByCards">
//                 <div className="row m-0 col-xl-8 col-lg-10 col-md-11 m-auto">
//                   <div className="tech-slideshowContainer">
//                     <div className="tech-slideshow to-left">
//                       <div className="nearyByCardsContaienr">
//                         {LandmarkImage2.map((landmar, index) => (
//                           <div
//                             key={index}
//                             className="nearyByCardDetail"
//                             data-aos="zoom-in"
//                           >
//                             <img
//                               src={
//                                 APL_LINK +
//                                 Imagedata +
//                                 landmar.landmark_image_name
//                               }
//                               title="Raghuvanshi Hall"
//                               alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                             />
//                             <p className="mb-0">{landmar.landmark_name}</p>
//                             <p
//                               style={{
//                                 fontSize: "16px",
//                                 color: "#a3a3a3",
//                                 fontWeight: "500",
//                               }}
//                             >
//                               <span>
//                                 <img
//                                   style={{ width: "1rem" }}
//                                   src={Loacator}
//                                   alt="icon"
//                                 />
//                               </span>
//                               {landmar.landmark_km_show} KM
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                       <div className="nearyByCardsContaienr d-block d-md-none">
//                         {LandmarkImage2.map((landmar, index) => (
//                           <div key={index} className="nearyByCardDetail">
//                             <img
//                               src={
//                                 APL_LINK +
//                                 Imagedata +
//                                 landmar.landmark_image_name
//                               }
//                               title="Raghuvanshi Hall"
//                               alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                             />
//                             <p className="mb-0">{landmar.landmark_name}</p>
//                             <p
//                               style={{
//                                 fontSize: "16px",
//                                 color: "#a3a3a3",
//                                 fontWeight: "500",
//                               }}
//                             >
//                               <span>
//                                 <img
//                                   style={{ width: "1rem" }}
//                                   src={Loacator}
//                                   alt="icon"
//                                 />
//                               </span>
//                               {landmar.landmark_km_show} KM
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>
//         )}

//         <section className="beautyPlace">
//           <div className="beautyPlaceContaienr">
//             <h2 className="normalHead">
//               Paint the beautiful canvas of life{" "}
//               <br className="d-block-sm d-none" /> together with the best
//               wedding venue in Thane West.
//             </h2>
//             <div className="row m-0">
//               <div className="col-sm-6 marginAfterSm">
//                 <div className="beautyImg">
//                   <img
//                     src={BeautifulImg1}
//                     title="Raghuvanshi Hall"
//                     alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                   />
//                 </div>
//               </div>
//               <div className="col-sm-6">
//                 <div className="beautyImg">
//                   <img
//                     src={BeautifulImg2}
//                     title="Raghuvanshi Hall"
//                     alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="exploreMoreBnt">
//               <Link to="/Gallery">
//                 <button>
//                   <p>explore more</p>
//                   <img
//                     src={ExploreIcon}
//                     title="Raghuvanshi Hall"
//                     alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                   />
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </section>

//         <section className="nearby">
//           <div className="nearbyContainer">
//             <h2 className="cursiveHead">Testimonials</h2>
//             <h3 className="normalHead">Guest Feedback</h3>
//             <div className="eventsSLiderContainer container-lg">
//               {TesmonialsImage2.length > 0 && (
//                 <OwlCarousel
//                   className="owl-theme2"
//                   {...options}
//                   ref={sliderRef2}
//                 >
//                   {TesmonialsImage2.map((landmar, index) => (
//                     <div className="testicontainer" key={index}>
//                       <div className="quoteImg">
//                         <img
//                           src={QuoteImg}
//                           title="Raghuvanshi Hall"
//                           alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                         />
//                       </div>
//                       <div className="testitext">
//                         <div className="testitextContaienr">
//                           <h4 className="mb-0">{landmar.testimonial_title}</h4>
//                           <img
//                             src={RatingStar}
//                             title="Raghuvanshi Hall"
//                             alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                           />
//                           <p>{landmar.testimonial_details}</p>
//                         </div>
//                         <div className="testiby">
//                           <h6>{landmar.testimonial_name}</h6>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </OwlCarousel>
//               )}
//               <div className="testicustom-nav">
//                 <button className="custom-prev">
//                   <img
//                     src={Prev}
//                     title="Raghuvanshi Hall"
//                     alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                   />
//                 </button>
//                 <div className="custom-saperation"></div>
//                 <button className="custom-next">
//                   <img
//                     src={Next}
//                     title="Raghuvanshi Hall"
//                     alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                   />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="blog">
//           <div className="blogcontainer container-lg">
//             <h2 className="cursiveHead">Blogs</h2>
//             <h3 className="normalHead">Inspiring Your Next Journey</h3>
//             <div className="blogsCardsContaier">
//               <div className="row m-0">
//                 {addBlog.map((landmar, index) => (
//                   <div className="col-md-4 mb-3" key={index}>
//                     <Link
//                       onClick={() =>
//                         handleLinkClick(
//                           match_and_return_seo_link(landmar.primary_id)
//                         )
//                       }
//                     >
//                       <div className="bogscard" data-aos="fade-up">
//                         <img
//                           src={landmar.image_name}
//                           alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//                           title="Raghuvanshi Hall"
//                         />
//                         <div className="blogtext">
//                           <h6>{landmar.title_name}</h6>
//                           <p>
//                             {DateormateBlogChange(landmar.entry_date)} |{" "}
//                             {landmar.author}
//                           </p>
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Home;
