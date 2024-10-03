import * as api from "../utils/api.js";
import * as storage from "../utils/storage.js";

const loginButtonEl = document.querySelector(".login-button");

loginButtonEl.addEventListener("click", clickLoginButton);

async function clickLoginButton(e) {
  const email = document.querySelector("#emailInput").value;
  const password = document.querySelector("#passwordInput").value;

  //일단은 백엔드 보내는 부분은 제외해주세요.
  const response = await api.sendPost("/users/login", {
    UserId: email,
    HashPwd: password,
  });

  if (response !== undefined) {
    storage.setItem("token", response.token);
    storage.setItem("user-id", email);
    location.href = "/main/";
  } else {
    alert("아이디 또는 비밀번호가 다릅니다!");
  }
}

const signupButtonEl = document.querySelector(".signup-button");
signupButtonEl.addEventListener("click", (e) => {
  location.href = "/sign-up/";
});
