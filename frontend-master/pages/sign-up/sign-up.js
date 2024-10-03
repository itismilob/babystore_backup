import { checkEmail } from "../utils/commonRegex.js";
import { checkPassword } from "../utils/commonRegex.js";
import { API_URL, sendPost } from "../utils/api.js";

let isIdAvailable = false; // 아이디 중복 여부를 저장하는 변수

const checkIdEl = document.getElementById("checkId");
const signupFormEl = document.getElementById("sign-up-form");

const checkId = async () => {
  const signUpIdEl = document.getElementById("sign-up-id");
  let userId;
  if (signUpIdEl) {
    userId = signUpIdEl.value;
  }

  if (!userId) return false;
  let isDuplicated = true;
  try {
    const response = await fetch(`${API_URL}/users/join/${userId}`, {
      method: "POST",
    });
    if (response.ok) {
      const result = await response.text();
      if (result === "중복 없음") isDuplicated = false;
    } else {
      console.error(`${response.status}: ${response.statusText}`);
      alert("사용할 수 없는 아이디 입니다.");
    }
  } catch (e) {
    console.error(e);
  }

  if (!isDuplicated) {
    alert("사용 가능한 ID 입니다.");
    isIdAvailable = true;
  }

  // const response = await sendPost(`/users/join/${userId}`);
  //
  // if (response.isDuplicated) {
  //   alert("이미 사용중인 아이디입니다.");
  //   isIdAvailable = false;
  // } else {
  //   alert("사용 가능한 아이디입니다.");
  //   isIdAvailable = true;
  // }
};

const registerUser = async (e) => {
  e.preventDefault();

  const nameEl = document.getElementById("sign-up-name");
  const idEl = document.getElementById("sign-up-id");
  const emailEl = document.getElementById("sign-up-email");
  const passwordEl = document.getElementById("sign-up-password");
  const passwordCheckEl = document.getElementById("sign-up-password-check");

  const name = nameEl.value;
  const id = idEl.value;
  const email = emailEl.value;
  const password = passwordEl.value;
  const passwordCheck = passwordCheckEl.value;

  if (name === "") {
    alert("이름을 입력해주세요!");
    nameEl.focus();
    return false;
  }
  if (id === "") {
    alert("id를 입력해주세요!");
    idEl.focus();
    return false;
  }
  if (!checkEmail(email)) {
    alert("올바른 이메일 주소를 입력해주세요!");
    emailEl.focus();
    return false;
  }
  if (!checkPassword(password)) {
    alert("올바른 비밀번호를 입력해주세요!");
    passwordEl.focus();
    return false;
  }
  if (passwordCheck === "") {
    alert("입력한 비밀번호와 일치하지 않습니다!");
    passwordCheckEl.focus();
    return false;
  }

  if (!isIdAvailable) {
    alert("아이디 중복 확인이 필요합니다.");
    return;
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    alert("유효한 이메일 주소를 입력해주세요.");
    return;
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다."
    );
    return;
  }

  if (password !== passwordCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const marketingAgreement = document.querySelector(
    'input[name="marketing"]'
  ).checked;

  const params = {
    UserId: id,
    UserName: name,
    Address: "주소 없음",
    HashPwd: password,
    Email: email,
  };

  try {
    const response = await fetch(`${API_URL}/users/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    console.log(response);
    if (response.ok) {
      // 가입 OK
      const result = await response.text();
      location.href = "/login/";
      alert("회원가입이 완료되었습니다.");
      console.log(result);
    } else {
      if (response.status === 404) {
        // 이미 가입된 계정
        const result = await response.text();
        console.log(result);
      } else {
        console.error(`${response.status}: ${response.statusText}`);
      }
    }
  } catch (e) {
    console.error(e);
  }
};

if (checkIdEl) {
  checkIdEl.addEventListener("click", checkId);
}

if (signupFormEl) {
  signupFormEl.addEventListener("submit", registerUser);
}
