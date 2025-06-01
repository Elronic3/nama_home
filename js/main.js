// js/menu.js

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const burgerBtn = header.querySelector(".burger-btn");

  burgerBtn.addEventListener("click", function () {
    // Переключаем класс menu-open у .header
    header.classList.toggle("menu-open");
  });
});
