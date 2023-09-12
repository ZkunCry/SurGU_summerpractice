function _createTemplate(elements = {}) {
  console.log("work");
  const $modalFooter = document.createElement("div");
  $modalFooter.classList.add("modal-footer");
  $modalFooter.insertAdjacentHTML("afterbegin", elements);

  return $modalFooter;
}

function template(options) {
  const DEAFULT_WIDTH = "600px";
  const modal = document.createElement("div");
  modal.options = options ?? {};
  console.log(modal.options);
  modal.classList.add("modal");

  modal.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal-body">
      <div class="modal-content" style ="max-width:${
        modal.options.width || DEAFULT_WIDTH
      }">
        <div class="modal-header">
          ${modal.options.title}
          ${
            modal.options.closable
              ? `<i class="fa fa-times close" data-close="true" aria-hidden="true" style="font-size:26px;cursor:pointer;"></i>`
              : ``
          }
        </div>
        <div class="modal-inner">
          ${modal.options.content || ``}
        </div>

      </div>
    </div>`
  );
  modal.querySelector(".modal-inner").after(_createTemplate(options.footer));
  document.body.appendChild(modal);
  return modal;
}

$.modal = function (options) {
  let modalWindow = template(options);
  let destroyed = false;
  let closing = false;
  const modal = {
    open() {
      if (destroyed) console.log("Modal window has been destroyed");
      !closing && modalWindow.classList.add("active");
    },

    close() {
      closing = true;
      if (destroyed) console.log("Modal window has been destroyed");
      modalWindow.classList.remove("active");
      modalWindow.classList.add("hide");

      setTimeout(() => {
        modalWindow.classList.remove("hide");

        closing = false;
      }, 200);
      modalWindow.classList.remove("active");
    },
  };
  function listener(event) {
    if (event.target.dataset.close) {
      modal.close();
    }
  }
  modalWindow.addEventListener("click", listener);

  return Object.assign(modal, {
    destroy() {
      modalWindow.parentNode.removeChild(modalWindow);
      modalWindow.removeEventListener("click", listener);
      destroyed = true;
    },
    setContent(html) {
      modalWindow.querySelector(".modal-inner").innerHTML = html ;
    },
    setTitle(html) {
      modalWindow.querySelector(".modal-header").innerHTML = options.closable? html +`<i class="fa fa-times close" data-close="true" aria-hidden="true" style="font-size:26px;cursor:pointer;"></i>` : html;
    },
    setFooter(html) {
      modalWindow.querySelector(".modal-footer").innerHTML = html;
    },
  });
};
