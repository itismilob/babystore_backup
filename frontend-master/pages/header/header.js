const token = "1";

const logoutEl = document.querySelector(".logout");
const logoutHeaderEl = document.querySelector(".header-logout");
const loginHeaderEl = document.querySelector(".header-login");

if (token === null) {
  //logout상태
  logoutHeaderEl.classList.remove("hidden");
  loginHeaderEl.classList.add("hidden");
} else {
  logoutHeaderEl.classList.add("hidden");
  loginHeaderEl.classList.remove("hidden");
}

const clickLogoutEvent = () => {
  storage.removeItem("token");
  logoutHeaderEl.classList.remove("hidden");
  loginHeaderEl.classList.add("hidden");
  alert("로그아웃 되었습니다!");
  location.href = "/main/";
};

logoutEl.addEventListener("click", clickLogoutEvent);

const mobileSearchBarEl = document.querySelector(".mobile-search-bar");
const mobileSearchIconEl = document.querySelector(".mobile-search-icon");
const mobileUserIconEl = document.querySelector(".mobile-user-icon");
const mobileMenuEl = document.querySelector(".mobile-menu");
const mobileSkipIconEl = document.querySelector(".mobile-skip-icon");
const mobileUserMenuEl = document.querySelector(".mobile-user-menu");
const mobileLogoutEl = document.querySelector(".mobile-logout");

const clickSearchIconEvent = () => {
  mobileSkipIconEl.classList.remove("hidden");
  mobileSearchBarEl.classList.remove("hidden");
  mobileMenuEl.classList.remove("hidden");
};

const clickSkipIconEvent = () => {
  mobileSkipIconEl.classList.add("hidden");
  mobileSearchBarEl.classList.add("hidden");
  mobileMenuEl.classList.add("hidden");
};

const clickUserIconEvent = () => {
  if (token) {
    mobileUserMenuEl.classList.remove("hidden");
  } else {
    location.href = "/login/";
  }
};

mobileSearchIconEl.addEventListener("click", clickSearchIconEvent);
mobileSkipIconEl.addEventListener("click", clickSkipIconEvent);
mobileUserIconEl.addEventListener("click", clickUserIconEvent);
mobileLogoutEl.addEventListener("click", clickLogoutEvent);

// mobileMenuEl.addEventListener("mouseleave", clickSkipIconEvent);

const mobileHeaderEl = document.querySelector(".mobile-header");

let isMouseOver = false;
mobileMenuEl.addEventListener("mouseover", (e) => {
  isMouseOver = true;
});

mobileMenuEl.addEventListener("mouseout", (e) => {
  isMouseOver = false;
});

mobileHeaderEl.addEventListener("mouseleave", (e) => {
  if (isMouseOver) {
    mobileMenuEl.classList.add("hidden");
  }
});
