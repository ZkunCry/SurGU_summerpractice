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
const deleteCookies = () => {
  let cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie =
      name + "=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
};
const dropDownServicesEvent = (event) => {
  const { type } = event.target.dataset;
  const {target} = event
  if (type === "quit") {
    deleteCookies();

    location.reload();
  }
  else if(target.closest('.services__dropdown'))
  {
    document.querySelector('.dropdown-child').classList.toggle('hide')
    document.querySelector('.arrow').classList.toggle('rotate')
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const dropDownServices = document.querySelector(".services__dropdown");
  const modalWindow = document.querySelector(".modal-content");
  const dropDown = document.querySelector(".dropdown");

  burgerBody.addEventListener("click", () => {
    header.classList.remove("open");
    document.body.classList.toggle("hidden");
  });
  header.addEventListener("click", headerEvent);
  dropDownServices?.addEventListener("click", dropDownServicesEvent);

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
        location.reload();
      } else {
        response.text().then((value) => alert(value));
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
          location.reload();
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
