//selectors
const sliderContainer = document.querySelector(".slider__container");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const indicatorsContainer = document.querySelector(".slider__indicators");

//arrays (photos, indicators)
const photos = Array.from(sliderContainer.querySelectorAll(".slider__img"));
const indicators = Array.from(
    indicatorsContainer.querySelectorAll(".indicator")
);

//count, index
const sliderCount = photos.length;
let sliderIndex = 0;

// updating
function updateSlider() {
    photos.forEach((slider, index) => {
        if (index === sliderIndex) {
            indicators[index].classList.add("active");
            slider.classList.remove("hidden"); // показать слайд
        } else {
            slider.classList.add("hidden"); // убрать слайд
            indicators[index].classList.remove("active");
        }
    });
}

// show next photo
function showNextSlide() {
    sliderIndex = (sliderIndex + 1) % sliderCount;
    updateSlider();
}
// show prev photo
function showPrevSlide() {
    sliderIndex = (sliderIndex - 1 + sliderCount) % sliderCount;
    updateSlider();
}

// listeners
prevButton.addEventListener("click", showPrevSlide);
nextButton.addEventListener("click", showNextSlide);
indicatorsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('indicator')) {
        const indicator = event.target.closest('div');
        sliderIndex = indicators.indexOf(indicator);
        updateSlider();
    }
});

//updating
updateSlider();