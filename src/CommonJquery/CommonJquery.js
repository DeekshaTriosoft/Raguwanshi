import $ from "jquery";
import { toast } from "react-toastify";
import { storeData, retrieveData } from "../LocalConnection/LocalConnection.js";
const validateEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

const validateName = (name) => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
};

const validateMobile = (mobile) => {
  // Remove leading and trailing whitespaces
  const trimmedMobile = mobile.trim();

  // Check if the trimmed mobile number is either a 10-digit numeric string or a "+91" followed by 10 digits
  const mobileRegex = /^(?:\+91)?[0-9]{10}$/;
  return mobileRegex.test(trimmedMobile);
};
const validateZip = (zip) => {
  const zipRegex = /^\d{6}$/;
  return zipRegex.test(zip);
};

const validatePassword = (value_send) => {
  const mobileRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{8,}$/g;
  return mobileRegex.test(value_send);
};

const check_vaild_save = (class_name) => {
  var isValid = true;
  let triocity_search = false;
  let searchInput_google;
  let triocity_search_id;
  $("#" + class_name + " #searchInput").each(function () {
    triocity_search = $(this).attr("id").includes("searchInput");
    triocity_search_id = $(this);
  });
  $("#" + class_name + " .searchInput_google").each(function () {
    searchInput_google = $(this).val();
  });

  $("#" + class_name + " .form-control").each(function () {
    let triotrio_mandatory = $(this).attr("class").includes("trio_mandatory");
    let trioEmailElement = $(this).attr("class").includes("trio_email");

    let trioMobnolElement = $(this).attr("class").includes("trio_no");
    let triopasswordlElement = $(this).attr("class").includes("trio_password");
    let triocountlElement = $(this).attr("class").includes("trio_count");
    let trioNamelElement = $(this).attr("class").includes("trio_name");
    let trioZiplElement = $(this).attr("class").includes("trio_zip");
    let length_min = $(this).attr("class").includes("length_min");
    let value_show = $(this).val();
    let minlength_data = 3;
    if ($(this).is("select")) {
      minlength_data = 1;
    }
    if (length_min) {
      minlength_data = 1;
    }

    $(this).css({
      border: "",
      background: "",
    });
    $(this).nextAll(".condition_error:first").hide();
    if (triotrio_mandatory) {
      if (
        value_show === "" ||
        value_show === null ||
        value_show.length < minlength_data
      ) {
        isValid = false;
        $(this).css({
          border: "1px solid red",
          width: "50px !important",
        });
        $(this)
          .nextAll(".condition_error:first")
          .html("Please Fill The Mandatory Information")
          .show();
      } else {
        if (trioEmailElement) {
          if (!validateEmail(value_show)) {
            $(this).css({
              border: "1px solid red",
              width: "50px !important",
            });
            isValid = false;
            $(this)
              .nextAll(".condition_error:first")
              .html("Please Fill Valid Email Id")
              .show();
          }
        }
        if (trioZiplElement) {
          if (!validateZip(value_show)) {
            $(this).css({
              border: "1px solid red",
              width: "50px !important",
            });
            isValid = false;
            $(this)
              .nextAll(".condition_error:first")
              .html("Please Enter Valid Zip Code")
              .show();
          }
        }
        if (trioNamelElement) {
          if (!validateName(value_show)) {
            isValid = false;
            $(this).css({
              border: "1px solid red",
              width: "50px !important",
            });
            $(this)
              .nextAll(".condition_error:first")
              .html("Please Fill Valid Name")
              .show();
          }
        }
        if (trioNamelElement) {
          if (value_show.length < 3) {
            isValid = false;
            $(this).css({
              border: "1px solid red",
              width: "50px !important",
            });
            $(this)
              .nextAll(".condition_error:first")
              .html("Please Fill Valid Name")
              .show();
          }
        }
        if (trioMobnolElement) {
          if (!validateMobile(value_show)) {
            isValid = false;
            $(this).css({
              border: "1px solid red",
              width: "50px !important",
            });
            $(this)
              .nextAll(".condition_error:first")
              .html("Please Enter Valid Mobile No")
              .show();
          }
        }
        if (triopasswordlElement) {
          if (!validatePassword(value_show)) {
            $(this).css({
              border: "1px solid red",
              width: "50px !important",
            });
            $(this)
              .nextAll(".condition_error:first")
              .html(
                "Password length must be 8 characters or longer .Include A-Z, a-z,0-9 and symbol like @,#$%..etc."
              )
              .show();
            isValid = false;
          }
        }
        if (triocountlElement) {
          if (Number(value_show) === 0) {
            alert("Please Add Items");
            isValid = false;
          }
        }
      }
    } else {
      if (value_show !== "") {
        if (trioEmailElement) {
          if (!validateEmail(value_show)) {
            $(this).css({
              border: "1px solid red",
              width: "50px !important",
            });
            isValid = false;
            $(this)
              .nextAll(".condition_error:first")
              .html("Please Fill Valid Email Id")
              .show();
          }
        }
        if (trioZiplElement) {
          if (!validateZip(value_show)) {
            $(this).css({
              border: "1px solid red",
              width: "50px !important",
            });
            isValid = false;
            $(this)
              .nextAll(".condition_error:first")
              .html("Please Enter Valid Zip Code")
              .show();
          }
        }
        if (trioNamelElement) {
          if (!validateName(value_show)) {
            isValid = false;
            $(this).css({
              border: "1px solid red",
              width: "50px !important",
            });
            $(this)
              .nextAll(".condition_error:first")
              .html("Please Fill Valid Name")
              .show();
          }
        }
        if (trioNamelElement) {
          if (value_show.length < 3) {
            isValid = false;
            $(this).css({
              border: "1px solid red",
              width: "50px !important",
            });
            $(this)
              .nextAll(".condition_error:first")
              .html("Please Fill Valid Name")
              .show();
          }
        }
        if (trioMobnolElement) {
          if (!validateMobile(value_show)) {
            isValid = false;
            $(this).css({
              border: "1px solid red",
              width: "50px !important",
            });
            $(this)
              .nextAll(".condition_error:first")
              .html("Please Enter Valid Mobile No")
              .show();
          }
        }
        if (triopasswordlElement) {
          if (!validatePassword(value_show)) {
            $(this).css({
              border: "1px solid red",
              width: "50px !important",
            });
            $(this)
              .nextAll(".condition_error:first")
              .html(
                "Password length must be 8 characters or longer .Include A-Z, a-z,0-9 and symbol like @,#$%..etc."
              )
              .show();
            isValid = false;
          }
        }
        if (triocountlElement) {
          if (Number(value_show) === 0) {
            alert("Please Add Items");
            isValid = false;
          }
        }
      }
    }
  });

  if (triocity_search) {
    console.log(searchInput_google);
    if (searchInput_google === "") {
      triocity_search_id
        .nextAll(".condition_error:first")
        .html("Please Select City From Search")
        .show();
      isValid = false;
    } else {
      triocity_search_id.css({
        border: "",
        background: "",
      });
      triocity_search_id.nextAll(".condition_error:first").hide();
    }
  }

  $(".invalid_data").hide();
  if ($("#" + class_name).hasClass("login_condition")) {
    let emailid = $(".trio_email").val();
    let pass_no = $(".trio_password").val();

    if (emailid === "" && pass_no === "") {
      $(".trio_password").css({
        border: "1px solid red",
        width: "50px !important",
      });
      $(".trio_email").css({
        border: "1px solid red",
        width: "50px !important",
      });
      isValid = false;
      $(".invalid_data").html(
        "Username and Password can't be empty. Please enter valid credentials!"
      );
      $(".invalid_data").show();
    } else if (!validateEmail(emailid)) {
      $(".trio_email").css({
        border: "1px solid red",
        width: "50px !important",
      });
      isValid = false;
      $(".invalid_data").html("Username Invaild. Please enter valid username!");
      $(".invalid_data").show();
    } else if (pass_no.length < Number(8)) {
      $(".trio_password").css({
        border: "1px solid red",
        width: "50px !important",
      });
      isValid = false;
      $(".invalid_data").html(
        "Password can't be empty. Please enter valid password!"
      );
      $(".invalid_data").show();
    }
  }

  return isValid;
};

const combiled_form_data = (form_name, dynaicimage) => {
  const fd = new FormData(document.getElementById(form_name));
  for (const [key, value] of fd.entries()) {
    if (value.type && dynaicimage != null) {
      fd.append(key + "_new", dynaicimage[key]);
    }
  }
  return fd;
};

const empty_form = (class_name) => {
  if (class_name !== "form_data_profile") {
    $("#" + class_name + " .trio_mandatory").each(function () {
      $(this).val("");
      $(this).css({
        border: "",
        background: "",
      });
    });
  }
};

const getRandomSixLetterString = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let randomString = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomString += alphabet[randomIndex];
  }
  return randomString;
};

const fnExcelReport = () => {
  var tab_text = "<table border='1px'><tr bgcolor='#ffffff'>";
  var j = 0;
  var tab = document.getElementById("dynamic-table1"); // id of table
  if (tab.rows.length > 1) {
    for (j = 0; j < tab.rows.length; j++) {
      if (!tab.rows[j].innerHTML.includes("table-detail")) {
        let datata = tab.rows[j].innerHTML.replace(
          '<button type="button" class="btn mr-2 mb-2 btn-primary" data-toggle="modal" data-target="#exampleModal">See More</button>',
          ""
        ); // remove if you want links in your table
        datata = datata.replace(
          '<button type="button" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" class="mb-2 mr-2 dropdown-toggle btn btn-outline-secondary ">Action</button>',
          ""
        ); // remove if you want links in your table

        tab_text = tab_text + datata + "</tr>";
      }
    }

    tab_text = tab_text.replace(/<a[^>]*>|<\/a>/g, ""); // remove if you want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if you want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // removes input params
    tab_text = tab_text.replace(/<button[^>]*>|<\/button>/gi, ""); // removes input params
    tab_text = tab_text + "</table>";

    // Create a Blob containing the table data
    var blob = new Blob([tab_text], {
      type: "application/vnd.ms-excel",
    });

    // Create a URL for the Blob
    var url = URL.createObjectURL(blob);

    // Create an anchor element and trigger a download
    var a = document.createElement("a");
    a.href = url;
    a.download = "table_data.xls";
    a.click();
    // Clean up the URL object to release resources
    URL.revokeObjectURL(url);
  }
};

const handleLinkClick = (link, blank = "") => {
  // Reload the page when the link is clicked
  if (blank === "") {
    window.location.href = link;
  } else {
    window.open(link, blank);
  }
};

const handleConfimDeleteClick = () => {
  // Display a confirmation dialog
  const isConfirmed = window.confirm("Are you sure you want to delete?");
  return isConfirmed;
};

const handleIaphabetnumberChange = (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]/g, "");
};
const handleEmailChange = (e) => {
  if (!/^[a-zA-Z0-9@.]*$/.test(e.target.value)) {
    e.target.value = ""; // Clear the input if it contains any other character
  }
};
const handleAphabetsChange = (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
};

const handleAlphabetsWithoutSpaceChange = (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-z]/g, "");
};

const handleNumbersChange = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");
};

const handleNumbersDecimalChange = (e) => {
  e.target.value = e.target.value.replace(/[^0-9.]/g, ""); // Allow only digits and decimal point
  e.target.value = e.target.value.replace(/(\d{0,9}(?:\.\d{0,2})?).*$/g, "$1"); // Limit to 3 digits before the decimal and 2 digits after
};
const handleURLChange = (e) => {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  e.target.value = e.target.value.match(urlRegex) ? e.target.value : "";
};

const handleAphabetswithhashChange = (e) => {
  e.target.value = e.target.value.replace(
    /[^A-Za-z0-9_/-]|\/{2,}|-{2,}/g,
    (match) => {
      // Replace consecutive slashes, hyphens, or underscores with a single instance
      return match.length === 2 ? match[0] : "";
    }
  );
};

const handleIaphabetnumberkeywordChange = (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-z0-9\s,]/g, "");
};

const handleIaphabetnumbercommaChange = (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-z0-9\s,]/g, "");
};

const handlePasswordChange = (e) => {
  e.target.value = e.target.value.replace(
    /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{8,}$/g,
    ""
  );
};

const handleNumbersRatingChange = (e) => {
  e.target.value = e.target.value.replace(/[^0-9.]/g, ""); // Allow only digits and decimal point
  e.target.value = e.target.value.replace(/^(\d{1,2}(?:\.\d{0,1})?).*$/g, "$1"); // Limit to 2 digits before the decimal and 1 digit after

  // Ensure the value is less than or equal to 5.0
  const ratingValue = parseFloat(e.target.value);
  if (ratingValue > 5.0) {
    e.target.value = "5.0";
  }
};

const computeTodayDate = () => {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  );
  return maxDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

const computeFutureDate = () => {
  const today = new Date();
  const maxDate = new Date(
    today.getFullYear() + 1,
    today.getMonth(),
    today.getDate() + 1
  );
  return maxDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};
const handleDateChange = (e) => {
  e.target.value = e.target.value.replace(/[^0-9-]/g, ""); // Assuming you want to allow only digits and hyphen for date
};

const inputdateformateChange = (input_data) => {
  const inputDate = new Date(input_data);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[inputDate.getDay()];

  const options = { year: "numeric", month: "short", day: "2-digit" };

  const formattedDate = `${dayOfWeek} ${inputDate.toLocaleDateString(
    "en-US",
    options
  )}`;

  return formattedDate;
};
const TimeformateChange = (originalTime) => {
  const formattedTime = new Date(
    `2000-01-01T${originalTime}`
  ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return formattedTime;
};

const DateormateBlogChange = (originalDateString) => {
  const dateObject = new Date(originalDateString);

  const formattedDateString = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formattedDateString;
};

const handleSuccess = (message_show, show_msg_data = 0) => {
  toast.success(message_show, {
    position: "top-right",
    autoClose: 3000, // Duration in milliseconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "custom-toast-success",
  });
  if (show_msg_data == 1) {
    handleSuccessSession("", "");
  }
};

const handleSuccessSession = (message_show, link_call) => {
  storeData("session_msg", message_show);
  if (link_call !== "") {
    handleLinkClick(link_call);
  }
};

const handleError = (message_show) => {
  toast.error(message_show, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: "custom-toast-error",
  });
};

const formatDateString = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

export {
  empty_form,
  check_vaild_save,
  combiled_form_data,
  getRandomSixLetterString,
  handleLinkClick,
  handleIaphabetnumberChange,
  handleEmailChange,
  handleAphabetsChange,
  handleNumbersChange,
  handleNumbersDecimalChange,
  handleURLChange,
  fnExcelReport,
  handleConfimDeleteClick,
  handleAphabetswithhashChange,
  handleIaphabetnumberkeywordChange,
  handleIaphabetnumbercommaChange,
  handleNumbersRatingChange,
  computeTodayDate,
  handlePasswordChange,
  handleDateChange,
  computeFutureDate,
  inputdateformateChange,
  handleSuccess,
  handleError,
  handleSuccessSession,
  TimeformateChange,
  DateormateBlogChange,
  handleAlphabetsWithoutSpaceChange,
  formatDateString,
  validateMobile,
};
