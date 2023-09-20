const secondHeader = document.querySelector(".secondheader");
const header = document.querySelector(".header");
const burgerBody = document.querySelector(".burger-body");
const computerSection = document.querySelector(".computer");
const line = document.querySelector(".progress-line__item");

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
const headerEvent = (event) => {
  event.preventDefault();
  const { target } = event;
  if (target.closest(".dropdown__link")) {
    const dropBtn = document.querySelector(".dropbtn");
    dropBtn.innerText = target.innerText;
  } else if (target.closest(".header__burger-btn")) {
    header.classList.toggle("open")
      ? document.body.classList.add("hidden")
      : document.body.classList.remove("hidden");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const dropDown = document.querySelector(".dropdown");
  burgerBody.addEventListener("click", () => {
    header.classList.remove("open");
    document.body.classList.toggle("hidden");
  });
  header.addEventListener("click", headerEvent);
  const modalWindow = document.querySelector(".modal-content");

  modalWindow.addEventListener("click", async (event) => {
    const { target } = event;
    const { type } = event.target.dataset;
    if (target.closest(".registration")) {
      modal.close();
      setTimeout(() => {
        modal.setTitle(optionsRegister.title);
        modal.setContent(optionsRegister.content);
        modal.setFooter(optionsRegister.footer);
      }, 500);

      setTimeout(() => {
        modal.open();
      }, 500);
    } else if (target.closest(".loginForm")) {
      modal.close();
      setTimeout(() => {
        modal.setTitle(options.title);
        modal.setContent(options.content);
        modal.setFooter(options.footer);
      }, 500);
      setTimeout(() => {
        modal.open();
      }, 500);
    } else if (type === "login") {
      const { email, password, username } = event.target.closest(".authForm");
      const headers = {
        "Content-Type": "application/json;charset=utf-8",
      };
      const response = await fetch("/login", {
        headers: headers,
        method: "POST",
        body: JSON.stringify({
          email: email.value,
          login: username.value,
          password: password.value,
        }),
      });
      if (response.ok) {
        console.log(response.text());

        alert(response.text());
      } else {
        response.text().then(value=>alert(value));
      }
    } else if (type === "registration") {
      const { email, password, confirmpassword, username } =
        event.target.closest(".authForm");

      if (
        !email.validity.typeMismatch &&
        !password.validity.typeMismatch &&
        !confirmpassword.validity.typeMismatch &&
        !username.validity.typeMismatch
      ) {
        const headers = {
          "Content-Type": "application/json;charset=utf-8",
        };
        const response = await fetch("/registration", {
          headers: headers,
          method: "POST",
          body: JSON.stringify({
            email: email.value,
            login: username.value,
            password: password.value,
          }),
        });
        if (response.ok) {
          alert("Success registration!");
        } else {
          alert("Error: ", response.json());
        }
      }
    }
  });
  fixedHeader();
  progressAnimation();
  window.addEventListener("scroll", () => {
    progressAnimation();
    fixedHeader();
  });
});
