import { searchAll } from './data.js';
const lawyersCardList = document.querySelector('.lawyers__card-list');
const searchField = document.querySelector('#search-field');
const showMoreBtn = document.querySelector('.showMore');
function createLawyersMarkup(lawyers) {
  return lawyers
  .filter(lawyer => lawyer.profilePhoto !="/cdn/img/attorney-vatar.jpg")
  .map(lawyer => {
  if (lawyer.profileRating === 'N/A') {
  lawyer.profileRating = 0
  }
  if (lawyer.profileAddress === 'N/A') {
  lawyer.profileAddress = ''
  }
  return lawyer;
  })
  .map(
  ({
  profilePhoto,
  name,
  jobTitle,
  practiceArea,
  profileRating,
  profileDescription,
  profileUrl,
  profileAddress,
  })  =>`
            <li class="lawyers__card-item">
            <a href="${profileUrl}" class="lawyers__card-link link">
                <div class="lawyers__image-wrapper">
                    <img src="https://www.wikipropedia.com${profilePhoto}" alt="">
                </div>
                <div class="lawyers__card-content">
                    <p class="lawyers__card-name">${name}</p>
                    <p class="lawyers__card-specialization">${jobTitle}</p>
                    <p class="lawyers__card-practice-area">Practice area: ${practiceArea}</p>
                    <p class="lawyers__card-rating">Rating: <span>${profileRating}</span></p>
                    <p class="lawyers__card-text-about">${profileDescription}</p> 
                    <p class="lawyers__card-address">${profileAddress}</p>
                </div>
            </a>
            </li>`,
    )
    .join('');
}
let show = 0;
function onSearchChange(e) {
  e.preventDefault();
  const searchEl = e.target.value.toLowerCase();
  if (searchEl.length === 0) {
    location.reload();
    return;
  }
  const searchedLawyers = searchAll.filter(
    ({ name, jobTitle, practiceArea, profileDescription, profileAddress}) =>
      name.toLowerCase().includes(searchEl) ||
      jobTitle.toLowerCase().includes(searchEl) ||
      practiceArea.toLowerCase().includes(searchEl) || 
      profileAddress.toLowerCase().includes(searchEl) ,
  );
  if (searchedLawyers.length > 12) {
    onClickShowMore(),
      (showMoreBtn.style.display = 'block'),
      showMoreBtn.addEventListener('click', onClickShowMore);
    function onClickShowMore() {
      show += 12;
      lawyersCardList.innerHTML = createLawyersMarkup(
        searchedLawyers.slice(0, show),
      );
    }
  } else {
    lawyersCardList.innerHTML = createLawyersMarkup(searchedLawyers);
  }
}
searchField.addEventListener('input', _.debounce(onSearchChange, 1000));
