
function isValid(input) {
  return input.value !== "" && (/^[0-9]+$/).test(input);
}

function onClick(e) {
  e.preventDefault();
  let count = document.getElementById("count");
  let book = document.getElementById("book");
  let result = document.getElementById("result");
  if (isValid(count.value)) {
    result.innerHTML = "<h3>Стоимость заказа: " +
    (parseInt(book.value) * parseInt(count.value)) + "р.</h3>";
  } else {
    result.innerHTML = "В поле ввода количества находятся" +
    "недопустимые символы!";
  }
  return false;
}

function updatePrice() {
  let count = document.getElementById("count-1");
  let options = document.getElementById("options");
  let result = document.getElementById("result-1");
  let prices = getPrices();

  let value = 0;
  if (isValid(count.value)) {
    let priceIndex = -1;
    let radios = document.getElementsByName("prod");
    radios.forEach(function (radio) {
      if (radio.checked) {
        let optionPrice = radio.value;
        if (optionPrice !== undefined) {
          priceIndex += parseInt(optionPrice);
        }
      }
    });
    if (priceIndex >= 0) {
      value = prices.prodTypes[priceIndex];
    }
    value *= parseInt(count.value);
    if (priceIndex >= 1) {
      value += prices.option[options.value];
    }
    if (priceIndex === 2) {
      let checkboxes = document.querySelectorAll("#checkboxes input");
      checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          let propPrice = prices.prodProperties[checkbox.name];
          if (propPrice !== undefined) {
            value += parseInt(propPrice);
          }
        }
      });
    }
    result.innerHTML = "<h3>Стоимость заказа: " + value + "р.</h3>";
  } else {
    result.innerHTML = "В поле ввода количества находятся" +
    "недопустимые символы!";
  }
}

function getPrices() {
  return {
    option: {
      "1": 10,
      "2": 500,
      "3": 150
    },
    prodProperties: {
      prop1: 10,
      prop2: 110,
      prop3: 400,
      prop4: 300
    },
    prodTypes: [3000, 3500, 4000]
  };
}

function updateUi() {
  let options = document.getElementById("options");
  let boxes = document.getElementById("checkboxes");

  let priceIndex = -1;
  let radios = document.getElementsByName("prod");
  radios.forEach(function (radio) {
    if (radio.checked) {
      let optionPrice = radio.value;
      if (optionPrice !== undefined) {
        priceIndex += parseInt(optionPrice);
      }
    }
  });

  if (priceIndex <= 1) {
    boxes.style.display = "none";
  } else {
    boxes.style.display = "block";
  }

  if (priceIndex >= 1) {
    options.style.display = "block";
  } else {
    options.style.display = "none";
  }

  return false;
}

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("count-1").addEventListener("blur", updatePrice);
  document.getElementById("options").addEventListener("change", updatePrice);
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      updatePrice();
    });
  });
  let radios = document.querySelectorAll("#myradios input");
  radios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      updateUi();
      updatePrice();
    });
  });
  let b = document.getElementById("calculate");
  b.addEventListener("click", onClick);
});