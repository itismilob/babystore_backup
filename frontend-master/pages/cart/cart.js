import { addCommasToNumber } from "../utils/addCommasToNumber.js";
import { getTagHTML } from "../utils/tags.js";
import { getItem, removeCartItem } from "../utils/storage.js";

let cart = getItem("cart") || [];

document.body.addEventListener("click", function (event) {
  if (event.target.matches(".purchase-button")) {
    purchase();
  }
});

function addToCart(item) {
  if (
    typeof item.name !== "string" ||
    typeof item.img !== "string" ||
    typeof item.price !== "number" ||
    typeof item.amount !== "number"
  ) {
    console.error("유효하지 않은 상품 정보입니다.");
    return;
  }

  const existingItem = cart.find(cartItem => cartItem.name === item.name);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

document.body.addEventListener("click", e => {
  if (e.target.matches(".quantity-button")) {
    const index = Number(e.target.getAttribute("data-index"));
    const operation = e.target.getAttribute("data-operation");
    updateQuantity(index, operation);
  }
});

function updateQuantity(index, operation) {
  const item = cart[index];
  if (item) {
    if (operation === "increase") {
      item.amount++;
    } else if (operation === "decrease") {
      item.amount > 1 ? item.amount-- : alert("최소 수량은 1개입니다.");
    }
    cart[index] = item;

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
  }
}

document.body.addEventListener("click", e => {
  if (e.target.matches(".remove-button")) {
    const productId = e.target.getAttribute("data-product-id");
    cart = removeCartItem(productId); // removeCartItem 함수의 반환값으로 cart를 업데이트합니다.
    renderCart();
  }
});

function renderCart() {
  const cartElement = document.getElementById("cart");
  const cardBoxElement = document.getElementById("card-box");
  const cartTotalElement = document.getElementById("cart-total");
  const totalElement = document.getElementById("total");

  if (cart.length === 0) {
    cardBoxElement.innerHTML = `
    <div class="flex items-center justify-center h-screen max-h-25">
  <h1>장바구니에 담긴 상품이 없습니다.</h1>
</div>

    `;
    return;
  }

  let totalAmount = 0;

  cartElement.innerHTML = cart
    .map((item, index) => {
      totalAmount += item.price * item.amount;

      return `
      <div class="cart-item border-b border-t flex px-10">

        <div class="w-1/2 border-r">
          <div class="flex p-10">
            <div>
              <img class="w-32 h-32" src="${item.productImg}" alt="${
        item.name
      }" />
            </div>
            <div class="pr-3 ml-16 font-bold text-2xl">
              <p>${item.productName}</p>
              <p>${getTagHTML("new")}</p>
            </div>
          </div>
        </div>

        <div class="flex-grow border-r">
          <div class="flex items-center justify-center p-20 w-30">
          <button class="border w-10 h-10 bg-white-300 quantity-button" data-index="${index}" data-operation="decrease">-</button>
          <input class="border w-10 h-10 bg-white-500 text-center appearance-none" type="number" value="${
            item.amount
          }" />
          <button class="border w-10 h-10 bg-white-300 quantity-button" data-index="${index}" data-operation="increase">+</button>
          </div> 
        </div>

        <div class="flex-grow flex items-center justify-center border-r font-bold text-2xl">
          <h1>${addCommasToNumber(item.price)}원</h1>
        </div>

        <div class="flex-grow flex items-center justify-end">
          
<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" onclick="removeProduct(${
        item.productId
      })">
삭제
</button>
        </div>
      </div>

      `;
    })
    .join("");
  window.removeProduct = function (productId) {
    cart = removeCartItem(productId);
    totalAmount = cart.reduce((acc, item) => (acc += item.price * item.amount));
    renderCart();
  };

  cartTotalElement.innerHTML = `
      <div class="cart-total flex text-center justify-center border-b items-center px-20">
 
        <div class="p-8">
          <p>총 주문금액</p>
          <p class="font-bold text-lg">${totalAmount.toLocaleString()}원</p>
        </div>
    </div>

    `;

  totalElement.innerHTML = `
  <div class="flex mt-20  border-t-2 border-red-400">
    <div class="p-10 flex-grow border-r border-b text-center">
      <p>총 상품금액</p>
      <p class="text-black">${addCommasToNumber(totalAmount)}원</p>
    </div>

    <div class="p-10 w-1/2 border-b flex justify-end items-center space-x-4">
      <h4>결제금액</h4>
      <h4 class="text-red-400 font-bold">${addCommasToNumber(
        totalAmount
      )}원</h4>
      <button class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md inline-flex items-center w-100 h-20 flex-shrink-0 purchase-button">
        구매하기
      </button>
    </div>
  </div>`;
}

function purchase() {
  cart = [];
  renderCart();
  location.href = "/order/";
}

renderCart();
