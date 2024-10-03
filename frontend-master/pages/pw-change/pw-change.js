import * as api from "../utils/api"
import * as storage from "../utils/storage"

// const UserId = req.decoded.UserId;
// const newHashPwd  = req.body.HashPwd;

const searchParams = new URL(location).searchParams;
const UserId = searchParams.get("UserId");
// if(UserId === undefined || UserId === '') {
//   alert('잘못된 접근입니다.');
//   location.href = '/pw-verification/';
// }

const API_URL = 'http://kdt-sw-7-team02.elicecoding.com/api';

const changeButtonEl = document.querySelector(".changeButton");
changeButtonEl.addEventListener("click", clickChangeButton);

const passwordRegexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const checkPwValid = (targetPassword) => {
    return passwordRegexp.test(targetPassword);
}

function clickChangeButton(e) {

    const passwordEl = document.querySelector("#password-input");
    const password = passwordEl.value;
    const passwordCheckEl = document.querySelector("#passwordCheck-input");
    const passwordCheck = passwordCheckEl.value;

    if (password === '') {
        alert('비밀번호를 입력해주세요.');
        passwordEl.focus();
        return false;
    }
    if (passwordCheck === '') {
        alert('비밀번호 확인을 입력해주세요.');
        passwordCheckEl.focus();
        return false;
    }
    if (!checkPwValid(password)) {
        alert('올바른 비밀번호를 입력해주세요!\n비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.');
        password.focus();
        return false;
    }
    if (password !== passwordCheck) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return false;
    }

    fetch(`${API_URL}/users/password/${UserId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            HashPwd: password
        }),
    })
        .then(res => {
            console.log(res, res.ok, res.status);
            if (res.ok) {
                alert('비밀번호가 변경되었습니다.');
                location.href = `/login/`;
            } else {
                alert('비밀번호가 일치하지 않습니다.');
                password.focus();
            }
        }).then(data => console.log(data))
        .catch(err => console.error(err));
}
