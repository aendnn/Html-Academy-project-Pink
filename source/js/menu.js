var button = document.querySelector(".main-nav__toggle");
var menu = document.querySelector(".site-nav");
var background = document.querySelector(".main-nav__wrap");

menu.classList.remove("site-nav--no-js");

button.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (menu.classList.contains("site-nav--opened")) {
    menu.classList.remove("site-nav--opened");
    menu.classList.add("site-nav--closed");
    background.classList.remove("main-nav__wrap--bg");
  }
    else {
    menu.classList.add("site-nav--opened");
    menu.classList.remove("site-nav--closed");
    background.classList.add("main-nav__wrap--bg");
  }
});
