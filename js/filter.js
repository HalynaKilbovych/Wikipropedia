import { searchAll } from "./data.js";

const lawyersCardList = document.querySelector(".lawyers__card-list");
const filterLinkEl = document.querySelectorAll("#filter__item__link");


const handleClick = () => {
  console.log("Button was clicked");
};

filterLinkEl.addEventListener("click", handleClick);


