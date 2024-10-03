import * as api from "../utils/api.js";
import * as storage from "../utils/storage.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("order-id");

const zipEl = document.querySelector(".input-zip");
const addrEl = document.querySelector(".input-detail-addr");
let fullAddr = "";

async function getOrderDetails(Id) {
  try {
    const data = await api.sendGet(`/orders`);

    const targetData = data.find((item) => item.shortId === id);

    document.querySelector(".order-name").textContent = createProdName(
      targetData.ProductInfos
    );
    //document.querySelector("img").src = targetData.ProductInfos[0].ProductImg;
    document.querySelector(".order-price").textContent =
      targetData.TotalPrice.toLocaleString();
  } catch (error) {
    console.error(error);
  }
}

function createProdName(orderList) {
  if (orderList.length > 1) {
    return `${orderList[0].ProductName} 외 ${orderList.length - 1}종`;
  }
  return orderList[0].ProductName;
}

window.onload = () => getOrderDetails(id);

const clickZipButtonEvent = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }

        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }

        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      } else {
      }

      zipEl.value = "(" + data.zonecode + ") " + addr;

      addrEl.value = `${extraAddr} `;
      addrEl.focus();
    },
  }).open();
};

const zipCodeButton = document.querySelector(".zip-code-button");
const changeOrderButton = document.querySelector(".change-order-button");
zipCodeButton.addEventListener("click", clickZipButtonEvent);

changeOrderButton.addEventListener("click", async () => {
  const user = await api.sendGet("/users");
  fullAddr += zipEl.value + addrEl.value;

  try {
    const response = await fetch(`${api.API_URL}/orders`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `${storage.getItem("token")}`,
      },
      body: JSON.stringify({
        orderId: id,
        Name: user.UserName,
        Address: fullAddr,
        Phone: user.Phone,
      }),
    });

    if (response.ok) {
      alert("주소지 변경에 성공했습니다!");
      location.href = "/order-list/";
      return data;
    } else {
      alert("주소지 변경에 실패했습니다. 관리자에게 문의해주세요!");
    }
  } catch (error) {
    console.error(`오류발생 ${error}`);
  }
});

const cancelOrderButton = document.querySelector(".cancel-order-button");
cancelOrderButton.addEventListener("click", async () => {
  try {
    const response = await fetch(`${api.API_URL}/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: storage.getItem("token"),
      },
    });

    if (response.ok) {
      alert("주문이 취소되었습니다!");
      location.href = "/order-list/";
      return data;
    } else {
      alert("주문 취소에 실패했습니다. 관리자에게 문의해주세요!");
    }
  } catch (error) {
    //console.error(`오류발생 ${error}`);
  }
});
