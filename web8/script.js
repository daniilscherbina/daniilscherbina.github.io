/*global document*/
/*global window*/
/*global localStorage*/
/*global history*/
/*global XMLHttpRequest*/
/*global FormData*/
/*global console*/
/*global location*/
/*global setTimeout*/
/*global $*/

$(document).ready(function () {
  var formData = new FormData();
  const form = document.getElementById("feedbackForm");
  const fullNameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const organizationInput = document.getElementById("organization");
  const messageInput = document.getElementById("message");
  const consentCheckbox = document.getElementById("consent");
  const overlay = document.getElementById("overlay");

  const formDataLoad = JSON.parse(localStorage.getItem("formData"));
  var formDataSave;
  var popup = document.getElementById("popup");

  const formUrl = "#popup";

  const currentUrl = window.location.href;

  if (currentUrl.includes(formUrl)) {
    openPopup();
  }

  function closePopup(event) {
    if (!popup.contains(event.target) && event.target) {
      if (event.target.id !== "but_popup") {
        popup.style.display = "none";
        overlay.style.display = "none";
        window.removeEventListener("click", closePopup);
        history.back();
      }
    }
  }

  function openPopup() {
    document.getElementById("popup").style.display = "block";
    overlay.style.display = "block";
    history.pushState({popupOpen: true}, "", formUrl);
    window.addEventListener("click", closePopup);
  }

  function loadFormData() {
    if (formDataLoad) {
      fullNameInput.value = formDataLoad.fullName;
      emailInput.value = formDataLoad.email;
      phoneInput.value = formDataLoad.phone;
      organizationInput.value = formDataLoad.organization;
      messageInput.value = formDataLoad.message;
      consentCheckbox.checked = formDataLoad.consent;
    }
  }

  function saveFormData() {
    formDataSave = {
      consent: consentCheckbox.checked,
      email: emailInput.value,
      fullName: fullNameInput.value,
      message: messageInput.value,
      organization: organizationInput.value,
      phone: phoneInput.value
    };
    localStorage.setItem("formData", JSON.stringify(formDataSave));
  }

  function clearFormData() {
    localStorage.removeItem("formData");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    formData.append("fullName", fullNameInput.value);
    formData.append("email", emailInput.value);
    formData.append("phone", phoneInput.value);
    formData.append("organization", organizationInput.value);
    formData.append("message", messageInput.value);
    formData.append("consent", consentCheckbox.checked);

    fetch("https://formcarry.com/s/hOd4opxWKz", {
      body: formData,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then(function (response) {
      if (response.ok) {
        document.getElementById("result").innerHTML =
        "Данные формы успешно отправлены на сервер";
        clearFormData();
      } else {
        document.getElementById("result").innerHTML =
        "Ошибка при отправке данных формы на сервер";
      }
    }).catch(function (error) {
      document.getElementById("result").innerHTML = "Произошла ошибка:" + error;
    });

    document.getElementById("feedbackForm").reset();
  });

  document.getElementById("but_popup").addEventListener("click", openPopup);

  loadFormData();

  window.addEventListener("popstate", function (event) {
    if (event.state !== null && event.state.popupOpen) {
      openPopup();
    } else {
      popup.style.display = "none";
      overlay.style.display = "none";
      window.removeEventListener("click", closePopup);
    }
  });

  fullNameInput.addEventListener("blur", saveFormData);
  emailInput.addEventListener("blur", saveFormData);
  phoneInput.addEventListener("blur", saveFormData);
  organizationInput.addEventListener("blur", saveFormData);
  messageInput.addEventListener("blur", saveFormData);
  consentCheckbox.addEventListener("change", saveFormData);
});
