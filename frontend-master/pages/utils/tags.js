const newState = `<p
            class="w-12 rounded-[3px] mt-3 text-sm font-bold text-[#4d8eee] bg-[#cfdfff] text-center"
          >
            새상품
          </p>`;

const goodState = `<p
            class="w-16 rounded-[3px] mt-3 text-sm font-bold text-[#3CC85B] bg-[#d2ffe4] text-center"
          >
            좋은상태
          </p>`;

const normalState = `<p
            class="w-9 rounded-[3px] mt-3 text-sm font-bold text-[#727579] bg-[#D7D7D7] text-center"
          >
            보통
          </p>`;

const states = new Map();
states.set("new", newState);
states.set("good", goodState);
states.set("normal", normalState);

export function getTagHTML(tagState) {
  let localState = null;
  if (tagState === "새상품") {
    localState = "new";
  } else if (tagState === "좋은 상태" || tagState === "좋은 상품") {
    localState = "good";
  } else if (tagState === "보통") {
    localState = "normal";
  }
  return states.get(localState ?? tagState);
}
