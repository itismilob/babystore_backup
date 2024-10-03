import * as api from "../utils/api"
import * as storage from "../utils/storage"

const API_URL = 'http://kdt-sw-7-team02.elicecoding.com/api';

const findButtonEl = document.querySelector(".findButton");
findButtonEl.addEventListener("click", clickFindButton);

const emailRegexp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
const checkEmailValid = (targetEmail) => {
  return emailRegexp.test(targetEmail);
}

function clickFindButton(e) {

  const nameEl = document.querySelector("#nameInput");
  const name = nameEl.value;
  const emailEl = document.querySelector("#emailInput");
  const email = emailEl.value;

  if (name === '') {
    alert('이름을 입력해주세요.');
    nameEl.focus();
    return false;
  }

  if (email === '') {
    alert('이메일을 입력해주세요.');
    passwordEl.focus();
    return false;
  }

  if (!checkEmailValid(email)) {
    alert('올바른 이메일 주소를 입력해주세요.');
    emailEl.focus();
    return false;
  }

  // API Request
  const params = {
    UserName: name,
    Email: email,
  };

  fetch(`${API_URL}/users/id`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })

    .then(res => {
      console.log(res, res.ok, res.text, res.status);
      
      if (res.ok) {
        return res.text();
      } else {
        alert('이름이나 이메일이 일치하지 않습니다.');
        location.href = '/find-id/';
      }
    })
    .then(userId => {
      alert(`사용자 ID는 ${userId} 입니다.`);
      location.href = `/login/`;
    })
    .catch(err => {
      console.error(err);
    });
}