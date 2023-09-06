const secondHeader = document.querySelector(".secondheader");
const headerBurgerBtn = document.querySelector(".header__burger-btn");
const header = document.querySelector(".header");
const burgerBody = document.querySelector(".burger-body");
const computerSection = document.querySelector(".computer");

document.addEventListener("DOMContentLoaded", () => {
  burgerBody.addEventListener("click", () => {
    header.classList.remove("open");
    document.body.classList.toggle("hidden");
  });
  headerBurgerBtn.addEventListener("click", () => {
    header.classList.toggle("open")
      ? document.body.classList.add("hidden")
      : document.body.classList.remove("hidden");
  });
  window.addEventListener("scroll", () => {
    const visible = window.getComputedStyle(secondHeader).display;
    if (visible !== "none") {
      const scrollDistance = window.scrollY;
      if (header.classList.contains("fixed")) header.classList.remove("fixed");
      if (scrollDistance > 0) {
        secondHeader.classList.add("fixed");
      } else {
        secondHeader.classList.remove("fixed");
      }
    } else {
      if (secondHeader.classList.contains("fixed"))
        secondHeader.classList.remove("fixed");
      header.classList.add("fixed");
      computerSection.style.marginTop = `${header.offsetHeight}px`;
    }
  });
});
