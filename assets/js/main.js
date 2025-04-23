const slides = document.querySelector(".slides");
const dots = document.querySelectorAll(".pagination-dot");
let currentSlide = 0;

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  slides.style.transform = `translateX(-${slideIndex * 50}%)`;

  // Update active dot
  dots.forEach((dot, index) => {
    if (index === slideIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function selectGender(gender) {
  const options = document.querySelectorAll(".gender-option");
  options.forEach((option) => {
    if (option.textContent.toLowerCase() === gender) {
      option.classList.add("selected");
    } else {
      option.classList.remove("selected");
    }
  });
}
