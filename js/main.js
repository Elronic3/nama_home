document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const burgerBtn = header.querySelector(".burger-btn");

  burgerBtn.addEventListener("click", function () {
    header.classList.toggle("menu-open");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("callbackModal");
  const openBtns = document.querySelectorAll(".open-modal");
  const closeBtn = modal.querySelector(".modal__close");
  const overlay = modal.querySelector(".modal__overlay");

  openBtns.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
    })
  );

  closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  overlay.addEventListener("click", () => modal.classList.remove("active"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") modal.classList.remove("active");
  });
});
