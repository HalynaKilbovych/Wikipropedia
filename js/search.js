import { search } from "./data.js";

const lawyersCardList = document.querySelector(".lawyers__card-list");
const filter = document.querySelector("#filter-name");

function createLawyersMarkup(lawyers) {
  return lawyers
    .map(
      ({
        profilePhoto,
        name,
        jobTitle,
        practiceArea,
        profileRating,
        profileDescription,
        profileUrl,
      }) => `
            <li class="lawyers__card-item">
            <a href="" class="lawyers__card-link link">
                <div class="lawyers__image-wrapper">
                    <img src="https://www.wikipropedia.com${profilePhoto}" alt="">
                </div>
                <div class="lawyers__card-content">
                    <p class="lawyers__card-name">${name}</p>
                    <p class="lawyers__card-specialization">${jobTitle}</p>
                    <p class="lawyers__card-practice-area">Practice area: ${practiceArea}</p>
                    <p class="lawyers__card-rating">Rating: <span>${profileRating}</span></p>
                    <p class="lawyers__card-text-about">${profileDescription}</p> 
                    <p class="lawyers__card-address">Address: N/A</p>
                </div>
            </a>
            </li>`
    )
    .join("");
}

lawyersCardList.innerHTML = createLawyersMarkup(search);

function onFilterChange(e) {
  const filter = e.target.value.toLowerCase();

  const filteredLawyers = search.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );

  lawyersCardList.innerHTML = createLawyersMarkup(filteredLawyers);
}

filter.addEventListener("input", onFilterChange);
