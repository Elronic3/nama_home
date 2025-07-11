document.addEventListener("DOMContentLoaded", function () {
  // --- Header burger menu ---
  const header = document.querySelector(".header");
  const burgerBtn = header.querySelector(".burger-btn");
  burgerBtn.addEventListener("click", function () {
    header.classList.toggle("menu-open");
  });

  // --- Modal open/close logic ---
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

  // --- Form submission via AJAX ---
  const form = document.getElementById("callback-form");
  const resultBox = document.getElementById("callback-result");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      resultBox.textContent = "Отправляем…";

      const formData = new FormData(form);
      try {
        const resp = await fetch(form.action, {
          method: "POST",
          body: formData,
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const json = await resp.json();

        if (json.status === "success") {
          resultBox.textContent = "Дякуємо! Ваша заявка відправлена.";
          resultBox.classList.remove("error");
          resultBox.classList.add("success");
          form.reset();
        } else {
          throw new Error(json.message || "Невідома помилка");
        }
      } catch (err) {
        resultBox.textContent = "Помилка: " + err.message;
        resultBox.classList.remove("success");
        resultBox.classList.add("error");
      }
    });
  }

  // --- Phone input mask and prefix lock ---
  function formatPhoneNumber(value) {
    let digits = value.replace(/\D/g, "");
    if (!digits.startsWith("38")) {
      digits = "38" + digits;
    }
    digits = digits.substring(0, 12);

    const parts = [];
    parts.push(digits.substring(0, 2)); // '38'
    if (digits.length > 2) parts.push(digits.substring(2, 5)); // first 3
    if (digits.length > 5) parts.push(digits.substring(5, 8)); // next 3
    if (digits.length > 8) parts.push(digits.substring(8, 12)); // lase 4

    return "+" + parts.filter(Boolean).join(" ");
  }

  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("focus", function () {
      if (!this.value.startsWith("+38 ")) {
        this.value = "+38 ";
      }
      setTimeout(
        () => this.setSelectionRange(this.value.length, this.value.length),
        0
      );
    });
    phoneInput.addEventListener("keydown", function (e) {
      const prefixLength = 4; // '+38 ' = 4 символа
      if (
        (e.key === "Backspace" || e.key === "Delete") &&
        this.selectionStart <= prefixLength
      ) {
        e.preventDefault();
      }
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        this.setSelectionRange(prefixLength, this.value.length);
      }
    });
    phoneInput.addEventListener("input", function () {
      const cursorPos = this.selectionStart;
      this.value = formatPhoneNumber(this.value);
      this.setSelectionRange(this.value.length, this.value.length);
    });
  }
});
