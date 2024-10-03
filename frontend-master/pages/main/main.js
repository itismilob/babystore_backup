//서버에서 card 불러오기

import { getCardHTML } from "../utils/card.js";
import * as api from "../utils/api.js";

const data = await api.sendGetWithQuery("/categories/products", {
  en_name: "goods",
  page: 1,
});

await initMain();
const cardElements = document.querySelectorAll(".card");

async function initMain() {
  const cardBox = document.querySelector(".card-box");

  const frag = document.createDocumentFragment();

  const data = await api.sendGetWithQuery("/categories/products", {
    en_name: "goods",
    page: 1,
  });

  data.products.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML += getCardHTML(
      item.seq,
      item.name,
      item.price,
      api.IMG_URL + item.img[0],
      item.condition
    );
    frag.appendChild(div);
  });

  cardBox.appendChild(frag);
}

function clickCardEvent(e) {
  //class 속성에 상품id 넣어둬야

  const id = 1;
  //상세페이지로
}
