import React, { useEffect, useState } from "react";
import "./Css/Blog.css";
import Header from "./Header";
import Footer from "./Footer";
import AuthorImg from "../../Assests/images/AuthorImage.svg";
import { Link } from "react-router-dom";
import {
  server_post_data,
  get_blog_details_url,
} from "../../ServiceConnection/serviceconnection.js";
import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  handleLinkClick,
  DateormateBlogChange,
} from "../../CommonJquery/CommonJquery.js";
function Blog() {
  const [showLoader, setShowLoader] = useState(false);
  const [VacancytData, setVacancytData] = useState([]);
  const [data_blog_extra, setdata_blog_extra] = useState([]);
  const [SEOloop, setSEOloop] = useState([]);
  const location = useLocation();
  const currentUrl = location.pathname.substring(1);

  const handleFetchData = async () => {
    setShowLoader(true);

    var form_data = new FormData();
    form_data.append("current_url", "/" + currentUrl);
    console.log(currentUrl);
    await server_post_data(get_blog_details_url, form_data)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          setVacancytData(Response.data.message.data_blog[0]);
          setdata_blog_extra(Response.data.message.data_blog_extra);
          setSEOloop(Response.data.message.data_seo);
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const match_and_return_seo_link = (v_id) => {
    let data_seo_link_final = "/blog/blog_detail/" + v_id;
    let data_seo_link = data_seo_link_final;
    if (SEOloop) {
      const matchedItem = SEOloop.find(
        (data) => data_seo_link === data.call_function_name
      );

      if (matchedItem) {
        data_seo_link_final = matchedItem.pretty_function_name;
      }
    }

    return data_seo_link_final;
  };

  return (
    <div className="readblog">
      <div className={showLoader ? "loading" : ""}></div>
      <Header />
      <div className="readblogContaienr">
        <div className="container-lg">
          <div className="bloghead">
            <h2>{VacancytData.title_name}</h2>
          </div>
          <div className="blogImgcontianer">
            <div className="blogbydetails">
              <img
                src={AuthorImg}
                alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
              />
              <div className="authorDetains">
                <p>
                  By {VacancytData.tag_line} | Published on{" "}
                  {DateormateBlogChange(VacancytData.entry_date)} | 4 min read
                </p>
              </div>
            </div>
            <div className="blogMAinImg">
              <img
                src={VacancytData.image_name}
                alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
              />
            </div>
          </div>
          <div className="col-lg-12 col-md-11 m-auto">
            <div className="blogTextContainer">
              <div className="row m-0">
                <div className="col-lg-8 col-md-7">
                  <div className="readblogtext">{VacancytData.tag_line}</div>
                  <div className="readblogtext">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(VacancytData.description),
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-5 padright">
                  <div className="blogListContaienr">
                    <h5 style={{ color: "#42526E" }}>Popular Blogs</h5>
                    <div className="blogList">
                      <ul>
                        {data_blog_extra.map((landmar, index) => (
                          <Link
                            onClick={() =>
                              handleLinkClick(
                                match_and_return_seo_link(landmar.primary_id)
                              )
                            }
                          >
                            <li>
                              <div className="blogListItem">
                                <img
                                  src={landmar.image_name}
                                  alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                                />
                                <div className="blogListItemHead">
                                  <h6>
                                    {DateormateBlogChange(landmar.entry_date)} |{" "}
                                    {landmar.author}
                                  </h6>
                                  <p>{landmar.title_name}</p>
                                </div>
                              </div>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                    <div className="gotoquery">
                      <div className="gotoqueryContaienr">
                        <h5>Get More Done Together With US</h5>
                        <p>
                          Craft timeless memories at Raghuvanshi Hall – where
                          enchantment meets celebration.
                        </p>
                        <Link onClick={() => handleLinkClick("/BookHall")}>
                          <button className="avilbtn2">
                            CHECK AVAILABILITY
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Blog;
