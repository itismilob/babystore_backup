//TODO: 무한스크롤 동작은 하지만 Type에러가 뜨는데 해당부분 확인해보기
//서버에서 card 불러오기

import { getCardHTML } from "../utils/card.js";
import * as api from "../utils/api.js";

let page = 1;
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const search = urlParams.get("search");

console.log("카테고리 : " + category);

let targetUrl = "/categories/products";
let targetValue = category;
let targetName = "en_name";

if (category === null) {
  targetUrl = "/products/search";
  targetValue = decodeURIComponent(search);
  targetName = "name";
}

const initList = async () => {
  try {
    const data = await api.sendGetWithQuery(targetUrl, {
      [targetName]: targetValue,
      page: page,
    });

    if (data.products.length > 0) {
      loadCards(data.products);
      page++;
    }
  } catch {
    alert("관련 상품이 없습니다!");
  }
};

await initList();

//intersection이 발생하는지 관찰할 대상
const target = document.querySelector("#observer-target");

const onIntersect = async ([entry], observer) => {
  if (entry.isIntersecting) {
    observer.unobserve(entry.target);
    await fetchData();

    observer.observe(entry.target);
  }
};

const options = {
  rootMargine: "100px",
  threshold: 0.5,
};

const observer = new IntersectionObserver(onIntersect, options);
observer.observe(target);

//백에서 상품 리스트 페이지로 가져오는 함수
const fetchData = async () => {
  const data = await api.sendGetWithQuery(targetUrl, {
    [targetName]: targetValue,
    page: page,
  });

  if (data.products.length > 0) {
    loadCards(data.products);
    page++;
  }
};

function loadCards(cards) {
  const cardBox = document.querySelector(".card-box");

  const cardFrame = document.createElement("div");
  cardFrame.classList.add("grid");
  cardFrame.classList.add("lg:grid-cols-6");
  cardFrame.classList.add("md:grid-cols-3");
  cardFrame.classList.add("gap-5");
  cardFrame.classList.add("justify-center");
  //console.log(cards);

  const frag = document.createDocumentFragment();

  cards.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML += getCardHTML(
      item.seq,
      item.name,
      item.price,
      `${api.API_URL}/images/${item.img[0]}`,
      item.condition
    );
    frag.appendChild(div);
  });

  cardBox.appendChild(frag);
}
