import { search } from "./new.data.js";
import { searchAll } from "./data.js";

const lawyersCardList = document.querySelector(".lawyers__card-list");
const searchField = document.querySelector("#search-field");

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

function onSearchChange(e) { 
  e.preventDefault(); 
  const searchEl = e.target.value.toLowerCase();

  const searchedLawyers = searchAll.filter(({ name, jobTitle, practiceArea, profileDescription}) =>
    name.toLowerCase().includes(searchEl) || 
    jobTitle.toLowerCase().includes(searchEl) ||  
    practiceArea.toLowerCase().includes(searchEl) 
    // profileDescription.toLowerCase().includes(filter) 
  );

  lawyersCardList.innerHTML = createLawyersMarkup(searchedLawyers);
}


searchField.addEventListener('input', _.debounce(onSearchChange, 1500));

