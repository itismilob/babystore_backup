import * as storage from "../utils/storage.js";
import * as api from "../utils/api.js";
import { clickZipButtonEvent } from "../utils/address.js";

const token = storage.getItem("token");

const urlParams = new URLSearchParams(window.location.search);
const buyNow = urlParams.get("buyNow");

const userNameEl = document.querySelector(".user-name");
const userEmailEl = document.querySelector(".user-email");
// const userPhoneEl = document.querySelector(".user-phone");
const zipCodeButtonEl = document.querySelector(".zip-code-button");
const userAddrEl = document.querySelector(".user-addr");
const zipEl = document.querySelector(".input-zip");
const detailEl = document.querySelector(".input-detail-addr");

zipCodeButtonEl.addEventListener("click", function () {
  clickZipButtonEvent(zipEl, detailEl);
});

let user = {};
if (token) {
  user = await api.sendGet("/users");
  userNameEl.parentElement.innerHTML = user.UserName;
  userNameEl.readOnly = true;
  userNameEl.style.outline = "none";
  userEmailEl.parentElement.innerHTML = user.Email;
  userEmailEl.readOnly = true;
  userEmailEl.style.outline = "none";
  userAddrEl.innerText = user.Address;
  // zipEl.value = addr.zip;
  // detailEl = addr.addr;
}

//결제 정보
const cartProductsEl = document.querySelector(".cart-products");
const cartTotalPriceEl = document.querySelector(".cart-total-price");

const payInfo = getPayInfo();
cartProductsEl.innerText = payInfo.name;
cartTotalPriceEl.innerText = payInfo.totalPrice + "원";

//결제 확인 버튼
const payButtonEl = document.querySelector(".payment-button");
payButtonEl.addEventListener("click", clickPayButtonEvent);

function getPayInfo() {
  // web storage에 저장된 장바구니 정보

  if (buyNow !== "true") {
    const cart = storage.getItem("cart");
    console.log(cart);
    let payName = "";

    if (cart.length > 1) {
      payName = `${cart[0].productName} 외 ${cart.length - 1}종`;
    } else {
      payName = cart[0].productName;
    }

    const totalPrice = cart.reduce(
      (acc, el) => (acc += el.price * el.amount),
      0
    );
    return {
      name: payName,
      totalPrice: totalPrice.toLocaleString(),
    };
  } else {
    const prod = storage.getItem("buyNow");

    return {
      name: prod.name,
      totalPrice: (prod.price * prod.amount).toLocaleString(),
    };
  }
}

let lastImg = "";
let isSuccess = false;
async function clickPayButtonEvent(e) {
  const cart = storage.getItem("cart");
  //user 비회원이면 user데이터 변경
  if (!token) {
    user = {
      UserName: userNameEl.value,
      Address: `${zipEl.value} ${detailEl.value}`,
      Email: userEmailEl.value,
    };
    console.log(user);
  }
  if (buyNow !== "true") {
    const productInfos = cart.map((item) => {
      return {
        Price: item.price,
        Amount: item.amount,
        ProductName: item.productName,
        ProductImg: item.productImg,
        Detail: "디테일",
        Condition: "좋은상태",
      };
    });

    const response = await api.sendPostReturnResponse(`/orders`, {
      Name: user.UserName,
      Address: user.Address,
      Phone: user.Phone === undefined ? "전화번호 없음" : user.Phone,
      Email: user.Email,
      ProductInfos: productInfos,
    });
    if (response.status === 200) isSuccess = true;

    lastImg = productInfos[0].ProductImg;
  } else {
    const prod = storage.getItem("buyNow");

    const response = await api.sendPostReturnResponse(`/orders`, {
      Name: user.UserName,
      Address: user.Address,
      Phone: user.Phone === undefined ? "전화번호 없음" : user.Phone,
      Email: user.Email,
      ProductInfos: [
        {
          Price: prod.price,
          Amount: prod.amount,
          ProductName: prod.name,
          ProductImg: prod.img,
          Detail: "디테일",
          Condition: "좋은상태",
        },
      ],
    });

    if (response.status === 200) isSuccess = true;

    lastImg = prod.img;
  }

  if (isSuccess) {
    alert("결제 성공!");
    storage.removeItem("cart");
    window.location.href = "order-success.html?last-img=" + lastImg;
  } else {
    alert("결제 실패!");
  }
}
