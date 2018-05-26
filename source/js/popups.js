var form = document.querySelector(".competition__form");
var required = document.querySelectorAll(".competition__input--required");
var error = document.querySelector(".modal--error");
var success = document.querySelector(".modal--success");
var closeError = document.querySelector(".modal__button--error");
var closeSuccess = document.querySelector(".modal__button--success");

form.addEventListener("submit", function (evt) {
  evt.preventDefault();
  for (var i = 0; i < required.length; i++) {
    if (!required[i].value) {
      error.classList.add("modal--show");
    } else if(required[i].value) {
      success.classList.add("modal--show");
    }
  }
});

closeError.addEventListener("click", function(evt) {
  evt.preventDefault();
  error.classList.remove("modal--show");
});

closeSuccess.addEventListener("click", function(evt) {
  evt.preventDefault();
  success.classList.remove("modal--show");
});
