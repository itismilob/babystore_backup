import "../index.css";
import { getTagHTML } from "./tags.js";

export const getCardHTML = (id, name, price, img, tag) => {
  return `
      <div class="card relative ml-5 mt-5 w-auto h-full flex-none  bg-transparent">
        <a class="absolute top-0 left-0 w-full h-full cursor-pointer z-10" href="/details/?id=${id}"></a>
        <div class=" w-auto h-[250px] md:h-[300px] rounded-[10px]">
        <img class="w-full h-full rounded-lg mb-4 object-cover" src="${img}" />
        </div>
        <div class="text-center">
          ${getTagHTML(tag)}
        </div>

        <div>
          <p class="h-23 mt-4 text-base  text-left text-[#2f4f4f]">
            ${name}
          </p>
        </div>
        <div>
          <p class="mt-2 text-xl font-bold text-left text-black">${Number(
            price
          ).toLocaleString()}원</p>
        </div>
      </div>
    `;
};
