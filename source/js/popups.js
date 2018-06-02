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
      error.classList.add("modal--show-error");
    } else if(required[i].value) {
      success.classList.add("modal--show-success");
    }
  }
});

closeError.addEventListener("click", function(evt) {
  evt.preventDefault();
  error.classList.remove("modal--show-error");
});

closeSuccess.addEventListener("click", function(evt) {
  evt.preventDefault();
  success.classList.remove("modal--show-success");
});


window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (error.classList.contains("modal--show-error")) {
      error.classList.remove("modal--show-error");
    } else if (success.classList.contains("modal--show-success")) {
      success.classList.remove("modal--show-success");
    }
  }
});
