import * as storage from "../utils/storage.js";
import * as api from "../utils/api.js";
import { checkPassword, checkEmail } from "../utils/commonRegex.js";

const memNameEl = document.querySelector(".member-name");
const memIdEl = document.querySelector(".member-id");
const passEl = document.querySelector(".input-pass");
const passCheckEl = document.querySelector(".input-pass-check");
const emailEl = document.querySelector(".input-email");
const zipEl = document.querySelector(".input-zip");
const addrEl = document.querySelector(".input-detail-addr");

const zipBtnEl = document.querySelector(".zip-button");
const modifyBtnEl = document.querySelector(".modify-button");
const withdrawBtnEl = document.querySelector(".withdraw-button");

const userId = storage.getItem("user-id");

const userData = await api.sendGet("/users");

let fullAddr = "";

if (userData !== undefined) {
  memNameEl.innerText = userData.UserName;
  memIdEl.innerText = userData.UserId;
}

const clickWithdrawButtonEvent = async () => {
  //await api.sendDelete(`/users/${userId}`);
  storage.clear();
  alert("회원탈퇴 성공!");
  location.href = "/main/";
};

const clickModifyButtonEvent = async () => {
  if (!checkPassword(passEl.value)) {
    alert(
      "올바른 비밀번호를 입력해주세요!\n비밀번호는 8자 이상이어야 하며, 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다."
    );
    passwordEl.focus();
    return false;
  }
  if (passCheckEl.value === "") {
    alert("입력한 비밀번호와 일치하지 않습니다!");
    passCheckEl.focus();
    return false;
  }
  if (!checkEmail(emailEl.value)) {
    alert("올바른 이메일 주소를 입력해주세요!");
    emailEl.focus();
    return false;
  }
  if (zipEl.value === "") {
    alert("우편번호가 없습니다!");
    return false;
  }

  if (addrEl.value === "") {
    alert("주소가 없습니다!");
    addrEl.focus();
    return false;
  }
  fullAddr += zipEl.value + addrEl.value;
  const data = api.sendPut("/users", {
    UserId: userData.UserId,
    UserName: userData.UserName,
    Address: fullAddr,
    HashPwd: passCheckEl.value,
    Email: emailEl.value,
  });

  alert("수정되었습니다!");
  //await api.sendPut('/')
  window.location.reload();
};

const clickZipButtonEvent = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        //document.getElementById("sample6_extraAddress").value = extraAddr;
      } else {
        //document.getElementById("sample6_extraAddress").value = "";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      zipEl.value = "(" + data.zonecode + ") " + addr;

      // 커서를 상세주소 필드로 이동한다.
      addrEl.value = `${extraAddr} `;
      addrEl.focus();
    },
  }).open();
};

zipBtnEl.addEventListener("click", clickZipButtonEvent);
modifyBtnEl.addEventListener("click", clickModifyButtonEvent);
withdrawBtnEl.addEventListener("click", clickWithdrawButtonEvent);
