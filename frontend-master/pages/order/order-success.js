const urlParams = new URLSearchParams(window.location.search);
const lastImg = urlParams.get("last-img");

const lastImgEl = document.querySelector(".last-img");

lastImgEl.setAttribute("src", lastImg);
