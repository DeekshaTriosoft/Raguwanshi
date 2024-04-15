const express = require("express");
const app = express();
const port = 7797;
const path = require("path");
const fs = require("fs");
const axios = require("axios");

let website_link = "https://www.raghuvanshihall.com/";
let website_link_api = "https://api.raghuvanshihall.com/";

let seoData_final = {
  title_seo: "Raghuvanshi Hall - Perfect Wedding Venue in Thane, Maharashtra",
  description_seo:
    "Celebrate your perfect wedding venue at Raghuvanshi Hall.Best wedding hall in Thane.Low budget wedding hall in Thane. Enjoy services  in Banquet hall in Thane.",
  keyword_seo:
    "Best marriage halls in thane,Wedding venues in thane,Low budget wedding hall in thane,best banquet halls in thane west,best wedding hall in thane,wedding hall in thane,Banquet Halls in Thane,perfect wedding venue,best wedding venue in thane west,perfect Banquets hall in Thane,Raghuvanshi Hall, wedding venue, Thane, Maharashtra, multi-cuisine, in-house catering, event services, bridal room, in-house décor, banquet hall, wedding testimonials, personalized events, meetings, conferences, venues",
  image_seo: website_link + "logo192.png",
  url_seo: website_link,
};

let seo_callink = website_link_api + "api/website_link/get_seo_data/";

app.get("/", async function (request, response) {
  const filePath = path.resolve(__dirname, "", "index.html");
  let url_got = request.originalUrl;
  let seoData = seoData_final;
  console.log("2", url_got);
  try {
    const apiResponse = await axios.post(
      seo_callink,
      { current_url: url_got },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const seoDataFromApi = apiResponse.data;
    if (!seoDataFromApi.error) {
      console.log(seoDataFromApi.message.seo_loop[0])
      seoData = {
        title_seo: seoDataFromApi.message.seo_loop[0].title_name,
        description_seo: seoDataFromApi.message.seo_loop[0].description,
        keyword_seo: seoDataFromApi.message.seo_loop[0].keywords,
        image_seo: seoDataFromApi.message.seo_loop[0].favicon,
        url_seo: seoDataFromApi.message.seo_loop[0].canonical_url,
      };
    }
  } catch (error) {
    ///err
    console.log(error);
  }

  // read in the index.html file
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, seoData.title_seo);
    data = data.replace(/\$OG_DESCRIPTION/g, seoData.description_seo);
    data = data.replace(/\$OG_Keyword/g, seoData.keyword_seo);
    data = data.replace(/\$OG_URL/g, seoData.url_seo);
    const result = data.replace(/\$OG_IMAGE/g, seoData.image_seo);
    response.send(result);
  });
});

app.use(express.static(path.resolve(__dirname, "")));
app.get("*", async function (request, response) {
  const filePath = path.resolve(__dirname, "", "index.html");
  let url_got = request.originalUrl;
  let seoData = seoData_final;
  console.log("1", url_got);
  try {
    const apiResponse = await axios.post(
      seo_callink,
      { current_url: url_got },
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const seoDataFromApi = apiResponse.data;
    if (!seoDataFromApi.error) {
      seoData = {
        title_seo: seoDataFromApi.message.seo_loop[0].title_name,
        description_seo: seoDataFromApi.message.seo_loop[0].description,
        keyword_seo: seoDataFromApi.message.seo_loop[0].keywords,
        image_seo: seoDataFromApi.message.seo_loop[0].favicon,
        url_seo: seoDataFromApi.message.seo_loop[0].canonical_url,
      };
    }
  } catch (error) {
    ///err
  }

  // read in the index.html file
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, seoData.title_seo);
    data = data.replace(/\$OG_DESCRIPTION/g, seoData.description_seo);
    data = data.replace(/\$OG_Keyword/g, seoData.keyword_seo);
    data = data.replace(/\$OG_URL/g, seoData.url_seo);
    const result = data.replace(/\$OG_IMAGE/g, seoData.image_seo);
    response.send(result);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
