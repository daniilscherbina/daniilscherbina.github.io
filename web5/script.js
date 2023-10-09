
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

window.addEventListener("DOMContentLoaded", function () {
  let b = document.getElementById("calculate");
  b.addEventListener("click", onClick);
});