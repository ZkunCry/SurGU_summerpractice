const options = {
  title: `<h2>Вход</h2>`,
  closable: true,
  content: `<div class="authorization-cssave">
  <form method = "POST" target = "dummyframe" class = "authForm">
     
      <div class="form-group">
          <input class="form-control item" type="text" name="username" maxlength="15" minlength="4" pattern="^[a-zA-Z0-9_.-]*$" id="username" placeholder="Логин" required>
      </div>
      <div class="form-group">
          <input class="form-control item" type="password" name="Пароль" minlength="6" id="password" placeholder="Пароль" required>
      </div>
      
      <div class="form-group">
          <input class="form-control item" type="email" name="email" id="email" placeholder="Email"
          pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/" required>
      </div>
      <div class="form-group">
          <button class="button authtorization" data-type="login" type="submit">Войти</button>
      </div>
  </form>
</div>`,
  width: `500px`,
  footer: `<span>Еще не с нами? <a class="registration">Зарегистрируйтесь!</a></span>`,
};
const optionsRegister = {
  title: `<h2>Регистрация</h2>`,
  closable: true,
  content: `<div class="authorization-cssave">
  <form method = "POST" target = "dummyframe" class = "authForm">
      <div class="form-group">
          <input class="form-control item" type="text" name="username" maxlength="15" minlength="4" pattern="^[a-zA-Z0-9_.-]*$" id="username" placeholder="Логин" required>
      </div>
      <div class="form-group">
          <input class="form-control item" type="password" name="password" minlength="6" id="password" placeholder="Пароль" required>
      </div>
      <div class="form-group">
          <input class="form-control item" type="password" name = "confirmpassword"  minlength="6"  placeholder="Подтвердите пароль" required>
      </div>
      <div class="form-group">
          <input class="form-control item" type="email" name="email" id="email" placeholder="Email"  
          pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/" required>
      </div>
      <div class="form-group">
          <button class="button authtorization" data-type="registration" type="submit">Зарегистрироваться</button>
      </div>
  </form>
</div>`,
  width: `500px`,
  footer: `<span> <a class="loginForm">Вернуться к авторизации</a></span>`,
};
const modal = $.modal(options);
const loginOpen = (event) => {
  event.preventDefault();
  modal.open();
};
const login = document.querySelector(".login");
login.addEventListener("click", loginOpen);
