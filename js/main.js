document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const burgerBtn = header.querySelector(".burger-btn");

  burgerBtn.addEventListener("click", function () {
    header.classList.toggle("menu-open");
  });
});
