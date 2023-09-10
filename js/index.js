const options = {
  title: `<h2>Вход</h2>`,
  closable: true,
  content: `<div class="registration-cssave">
  <form>
     
      <div class="form-group">
          <input class="form-control item" type="text" name="username" maxlength="15" minlength="4" pattern="^[a-zA-Z0-9_.-]*$" id="username" placeholder="Логин" required>
      </div>
      <div class="form-group">
          <input class="form-control item" type="password" name="Пароль" minlength="6" id="password" placeholder="Пароль" required>
      </div>
      <div class="form-group">
          <input class="form-control item" type="email" name="email" id="email" placeholder="Email" required>
      </div>
      <div class="form-group">
          <button class="btn btn-primary btn-block create-account" type="submit">Войти</button>
      </div>
  </form>
</div>`,
  width: `500px`,
};

const modal = $.modal(options);
const login = document.querySelector(".login");
login.addEventListener("click", (event) => {
  event.preventDefault();
  modal.open();
});
