import { searchAll } from './data.js';
const lawyersCardList = document.querySelector('.lawyers__card-list');
const searchField = document.querySelector('#search-field');
const showMoreBtn = document.querySelector('.showMore');
const selectFormSpecialization = document.querySelector('#specialization');
const selectFormLocation = document.querySelector('#location');

function createLawyersMarkup(lawyers) {

  return lawyers
    .filter(lawyer => lawyer.profilePhoto != '/cdn/img/attorney-vatar.jpg')
    .map(lawyer => {
      if (lawyer.profileRating === 'N/A') {
        lawyer.profileRating = 0;
      }
      if (lawyer.profileAddress === 'N/A') {
        lawyer.profileAddress = '';
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
      }) => `
            <li class="lawyers__card-item">
            <a href="${profileUrl}" class="lawyers__card-link link">
                <div class="lawyers__image-wrapper">
                    <img src="https://www.wikipropedia.com${profilePhoto}" alt="">
                </div>
                <div class="lawyers__card-content">
                    <p class="lawyers__card-name">${name}</p>
                    <div class="rating">
                    <div class="rating__body">
                      <div class="rating__active">
                        <div class="rating__items">
                          <input type="radio" class="rating__item" value="1" name="rating">
                          <input type="radio" class="rating__item" value="2" name="rating">
                          <input type="radio" class="rating__item" value="3" name="rating">
                          <input type="radio" class="rating__item" value="4" name="rating">
                          <input type="radio" class="rating__item" value="5" name="rating">
                        </div>
                      </div>
                    </div>
                    <div class="rating__value">${profileRating}</div>
                  </div>
                    <p class="lawyers__card-specialization">${jobTitle}</p>
                    <p class="lawyers__card-practice-area">Practice area: ${practiceArea}</p>
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
    ({ name, jobTitle, practiceArea, profileAddress }) =>
      name.toLowerCase().includes(searchEl) ||
      jobTitle.toLowerCase().includes(searchEl) ||
      practiceArea.toLowerCase().includes(searchEl) ||
      profileAddress.toLowerCase().includes(searchEl),
  );
  if (searchedLawyers.length > 12) {
    onClickShowMore(),
      (showMoreBtn.style.display = 'block'),
      showMoreBtn.addEventListener('click', onClickShowMore);

    function onClickShowMore() {
      setTimeout(() => {
        const ratings = document.querySelectorAll('.rating');
        if (ratings.length > 0) {
          initRatings();
        }
        function initRatings() {
          let ratingActive, ratingValue;
          for (let index = 0; index < ratings.length; index++) {
            const rating = ratings[index];
            initRating(rating);
          }
          function initRating(rating) {
            initRatingVars(rating);
            setRatingActiveWidth();
          }
          function initRatingVars(rating) {
            ratingActive = rating.querySelector('.rating__active');
            ratingValue = rating.querySelector('.rating__value');
          }
          function setRatingActiveWidth(index = ratingValue.textContent) {
            const ratingActiveWidth = index / 0.05;
            ratingActive.style.width = `${ratingActiveWidth}%`;
          }
        }
      },0);
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
selectFormSpecialization.addEventListener("change", onFilterSearchSpecialization,);
selectFormSpecialization.addEventListener("change", _.debounce(onSearchChange, 1000));
selectFormLocation.addEventListener("change", onFilterSearchLocation);
selectFormLocation.addEventListener("change", _.debounce(onSearchChange, 1000));

function onFilterSearchSpecialization() {
  const selectedOptionValueSpecialization = selectFormSpecialization.value;
  searchField.value = selectedOptionValueSpecialization;
  searchField.scrollIntoView({behavior: "smooth"}); 
}

function onFilterSearchLocation() {
  const selectedOptionValueLocation = selectFormLocation.value;
  searchField.value = selectedOptionValueLocation; 
  searchField.scrollIntoView({behavior: "smooth"}); 
}


