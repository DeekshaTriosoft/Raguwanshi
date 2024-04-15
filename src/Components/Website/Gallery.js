import React, { useState, useCallback, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Css/Gallery.css";
import SliderImg3 from "../../Assests/images/sliderimg3.png";
import ImageViewer from "react-simple-image-viewer";
import {
  APL_LINK,
  server_post_data,
  get_all_home_gallery,
} from "../../ServiceConnection/serviceconnection.js";

function Gallery() {
  const [showLoaderAdmin, setshowLoaderAdmin] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [categories, setcategories] = useState([]);

  const master_data_get = async (start_date, end_date, flag, call_id) => {
    setshowLoaderAdmin(true);
    const fd = new FormData();
    fd.append("admin_id", "0");
    await server_post_data(get_all_home_gallery, fd)
      .then((Response) => {
        if (Response.data.error) {
          alert(Response.data.message);
        } else {
          console.log(Response.data.message.data_silder2);
          const sliderImageData = [];
          Response.data.message.data_silder2.map((item, index) => {
            const image_data = [];

            Response.data.message.data_silder.find((itessss) => {
              if (Number(item.primary_id) === Number(itessss.event_list_id)) {
                image_data.push({
                  image_link:
                    APL_LINK +
                    Response.data.message.data_silder_image +
                    itessss.event_image_name,
                });
              }
            });

            if (image_data.length > 0) {
              sliderImageData.push({
                image_link: image_data[0].image_link,
                silder_content: item.event_list_name,
                silder_id: item.primary_id,
                full_image: image_data.map((image) => image.image_link),
              });
            }
          });
          console.log(sliderImageData);
          setcategories(sliderImageData);
        }

        setshowLoaderAdmin(false);
      })
      .catch((error) => {
        setshowLoaderAdmin(false);
      });
  };

  useEffect(() => {
    const start_date = "";
    const end_date = "";
    const flag = "3";
    const call_id = "0";

    master_data_get(start_date, end_date, flag, call_id);
  }, []);

  const openImageViewer = useCallback((categoryIndex) => {
    setCurrentImage(categoryIndex);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <div className="gallery">
      <Header />
      <div className="gallerycontaienr container-lg">
        <div className="galleryFront">
          <h4>Raghuvanshi Hall Gallery </h4>
          <div className="galleryFrontImg" data-aos="zoom-in">
            <img src={SliderImg3}  alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues" />
          </div>
        </div>

        <div className="galleyCata">
          <div className="galleyCataContaiwenr">
            <h4>Browse by Categories</h4>
            <div className="galleyCataTabs">
              <div className="row m-0">
                {categories.map((category, categoryIndex) => (
                  <div className="col-sm-4 col-11 m-auto">
                    <div
                      key={categoryIndex}
                      className="catatab"
                      data-aos="zoom-in"
                      data-aos-duration="800"
                      data-aos-delay={categoryIndex * 100}
                    >
                      <img
                        src={category.image_link} // Display the first image of each category
                        alt="Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues"
                        onClick={() => openImageViewer(categoryIndex)}
                      />
                      <h5>{category.silder_content}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {isViewerOpen && (
        <ImageViewer
          className="col-11"
          src={categories[currentImage].full_image}
          currentIndex={0}
          disableScroll={true}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
}

export default Gallery;
