
function isValid(input) {
	return input.value != "" && /^[0-9]+$/.test(input);
}

function onClick(event) {
	event.preventDefault();
	let count = document.getElementById("count");
	if (isValid(count.value)) {
		let book = document.getElementById("book");
		let result = document.getElementById("result");
		result.innerHTML = "<h3>Стоимость заказа: " + (parseInt(book.value) * parseInt(count.value)) + "р.</h3>";
	} else {
		alert("В поле ввода количества находятся недопустимые символы!");
	}
}

window.addEventListener('DOMContentLoaded', function (event) {
  console.log("DOM fully loaded and parsed");
  
  let b = document.getElementById("calculate");
  b.addEventListener("click", onClick);
});