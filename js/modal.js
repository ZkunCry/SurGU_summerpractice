function _createButton(buttons = []) {
  const $buttons = document.createElement("div");
  $buttons.classList.add("modal-footer");
  buttons.forEach((btn) => {
    const tempBtn = document.createElement("button");
    tempBtn.textContent = btn.text;
    tempBtn.classList = `btn btn-${btn.type}`;
    tempBtn.onclick = btn.handler || function () {};
    $buttons.appendChild(tempBtn);
  });

  return $buttons;
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
      <div class="modal-content style =${
        modal.options.maxWidth || DEAFULT_WIDTH
      }">
        <div class="modal-header">
          <span>Модальние окно</span>
          ${
            modal.options.closable
              ? `<i class="fa fa-times close" data-close="true" aria-hidden="true"></i>`
              : ``
          }
        </div>
        <div class="modal-inner">
          ${modal.options.content || ``}
        </div>

      </div>
    </div>`
  );
  modal.querySelector(".modal-inner").after(_createButton(options.footer));
  document.body.appendChild(modal);
  return modal;
}

$.modal = function (options) {
  let modalWindow = template(options);
  let destroyed = false;
  const modal = {
    open() {
      if (destroyed) console.log("Modal window has been destroyed");
      modalWindow.classList.add("active");
    },

    close() {
      if (destroyed) console.log("Modal window has been destroyed");
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
      modalWindow.querySelector(".modal-inner").innerHTML = html;
    },
  });
};
