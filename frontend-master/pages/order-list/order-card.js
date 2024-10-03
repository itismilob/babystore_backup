import "../index.css";

export const getOrderCardHTML = (id, dateNumber, img, name, total, state) => {
  return `<div class="list-main mt-5 h-[150px] shadow-md grid grid-cols-6   px-4">
            <div class="order-date flex items-center">${dateNumber}</div>
            <div class="order-product flex items-center col-span-2">
              <div class="">
                <img
                  class="w-[80px] h-[120px] rounded-[5px] object-cover"
                  src="${img}"
                  alt=""
                />
              </div>
              <div class="px-2 w-[180px]">${name}</div>
            </div>
            <div class="order-total flex items-center">${total}원</div>
            <div class="flex items-center col-span-2">
              <p class="order-state ml-4">${state}</p>
                            <p
                class="${
                  state === "주문취소" ? "hidden" : ""
                } order-change-button ml-10 bg-gray-200 rounded-lg px-2 cursor-pointer" id="${id}"
              >
                주문변경/취소
              </p>
            </div>

          </div>`;
};
