const secondHeader = document.querySelector(".secondheader");
const headerBurgerBtn = document.querySelector(".header__burger-btn");
const header = document.querySelector(".header");
const burgerBody = document.querySelector(".burger-body");
const computerSection = document.querySelector(".computer");
const line = document.querySelector(".progress-line__item");

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

  const fixedHeader = () => {
    const visible = window.getComputedStyle(secondHeader).display;
    if (visible !== "none") {
      const scrollDistance = window.scrollY;
      if (header.classList.contains("fixed")) {
        header.classList.remove("fixed");
        computerSection.style.marginTop = `0px`;
      }
      if (scrollDistance > 0) {
        secondHeader.classList.add("fixed");
        line.parentNode.classList.remove("none");
        line.parentNode.style.top = `${header.children[1].offsetHeight}px`;
      } else {
        secondHeader.classList.remove("fixed");
        line.parentNode.classList.add("none");
      }
    } else {
      if (secondHeader.classList.contains("fixed")) {
        progressAnimation();
        secondHeader.classList.remove("fixed");
      }
      header.classList.add("fixed");
      line.parentNode.classList.remove("none");
      line.parentNode.style.top = `${header.offsetHeight}px`;
      computerSection.style.marginTop = `${header.offsetHeight}px`;
    }
  };
  const progressAnimation = () => {
    let scrollTop = window.scrollY;
    let windowHeight = window.innerHeight;
    let siteHeight = document.documentElement.scrollHeight;
    let percentageProgress = Math.floor(
      (scrollTop / (siteHeight - windowHeight)) * 101
    );
    line.style.width = `${percentageProgress}%`;
  };
  window.addEventListener("scroll", () => {
    progressAnimation();
    fixedHeader();
  });
});