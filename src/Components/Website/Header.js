// import React, { useEffect, useState } from "react";
// import "./Css/Header.css";
// import CompanyLogo from "../../Assests/images/Raghuwanshihall.svg";
// import { Link as RouterLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { Link as ScrollLink } from "react-scroll";
// import { useLocation } from "react-router-dom";
// import { handleLinkClick } from "../../CommonJquery/CommonJquery.js";

// function Header() {
//   const { pathname } = useLocation();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const navigate = useNavigate();

//   const handleAmenities = () => {
//     // Navigate to the home page
//     navigate("/");

//     setTimeout(() => {
//       document.getElementById("amenities").scrollIntoView({
//         behavior: "smooth",
//       });
//     }, 3);
//   };

//   const handleLAndmark = () => {
//     // Navigate to the home page
//     navigate("/");

//     setTimeout(() => {
//       document.getElementById("landmarksRef").scrollIntoView({
//         behavior: "smooth",
//       });
//     }, 3);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 0) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div className="header">
//       <nav
//         className={`navbar navbar-expand-lg ${
//           isScrolled ? "navbarSolid" : ""
//         } ${pathname === "/BookHall" ? "navbarRelative" : ""}`}
//       >
//         <div className="container-fluid">
//           <a className="navbar-brand" href="/">
//             <img
//               src={CompanyLogo}
//               title="Raghuvanshi Hall"
//               alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
//             />
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNavDropdown"
//             aria-controls="navbarNavDropdown"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div
//             className="collapse navbar-collapse"
//             style={{ flexGrow: "inherit" }}
//             id="navbarNavDropdown"
//           >
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <RouterLink
//                   className={`nav-link ${
//                     pathname === "/Gallery" ? "activeNavLink" : ""
//                   }`}
//                   onClick={() => handleLinkClick("/Gallery")}
//                 >
//                   GALLERY
//                 </RouterLink>
//               </li>
//               <li className="nav-item">
//                 <ScrollLink
//                   className="nav-link"
//                   to="amenities"
//                   smooth={true}
//                   duration={200}
//                   offset={-window.innerHeight / 18}
//                   onClick={handleAmenities}
//                 >
//                   AMENITIES
//                 </ScrollLink>
//               </li>
//               <li className="nav-item">
//                 <ScrollLink
//                   className="nav-link"
//                   to="landmarksRef"
//                   smooth={true}
//                   duration={200}
//                   onClick={handleLAndmark}
//                   offset={-window.innerHeight / 2}
//                 >
//                   NEARBY LANDMARKS
//                 </ScrollLink>
//               </li>
//               <li className="nav-item">
//                 <RouterLink
//                   className={`nav-link ${
//                     pathname === "/AboutUS" ? "activeNavLink" : ""
//                   }`}
//                   onClick={() => handleLinkClick("/AboutUS")}
//                 >
//                   ABOUT US
//                 </RouterLink>
//               </li>
//             </ul>
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <RouterLink
//                   className="nav-link"
//                   onClick={() => handleLinkClick("/BookHall")}
//                 >
//                   <button className="avilbtn">CHECK AVAILABILITY</button>
//                 </RouterLink>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Header;
