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

//password

 const togglePassword = document.getElementById("togglePassword");
 const passwordInput = document.getElementById("password");

 togglePassword.addEventListener("click", function () {
   // Toggle the type attribute
   const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
   passwordInput.setAttribute("type", type);

   // Toggle the eye icon
   const eyeIcon = this.querySelector("svg");
   if (type === "password") {
     eyeIcon.innerHTML =
       '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
   } else {
     eyeIcon.innerHTML =
       '<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>';
   }
 });

//slider-section

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".sliders__img");
  const slides = document.querySelectorAll(".slides__img");
  const slideCount = slides.length;
  let currentIndex = 0;
  let startX, moveX;
  let interval;

  function positionSlider() {
    const slideWidth = slides[0].offsetWidth;
    const containerWidth = document.querySelector(".slider-container").offsetWidth;
    const offset = (containerWidth - slideWidth) / 8; 

    slider.style.transform = `translateX(${offset}px)`;

    slides.forEach((slide) => {
      slide.style.marginLeft = "10px";
      slide.style.marginRight = "10px";
    });
  }

  function goToSlide(index) {
    if (index < 0) {
      currentIndex = slideCount - 1;
    } else if (index >= slideCount) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    const slideWidth = slides[0].offsetWidth;
    const containerWidth = document.querySelector(".slider-container").offsetWidth;
    const offset = (containerWidth - slideWidth) / 8;

    const position = offset - currentIndex * (slideWidth + 20); 

    slider.style.transform = `translateX(${position}px)`;

    resetInterval();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function startAutoSlide() {
    interval = setInterval(nextSlide, 3000); 
  }

  function resetInterval() {
    clearInterval(interval);
    startAutoSlide();
  }

  slider.addEventListener("mousedown", function (e) {
    e.preventDefault();
    startX = e.clientX;
    slider.style.transition = "none";
    slider.style.cursor = "grabbing";

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  function onMouseMove(e) {
    moveX = e.clientX - startX;
    const slideWidth = slides[0].offsetWidth;
    const containerWidth = document.querySelector(".slider-container").offsetWidth;
    const offset = (containerWidth - slideWidth) / 8; 
    const position = offset - currentIndex * (slideWidth + 20) + moveX;

    slider.style.transform = `translateX(${position}px)`;
  }

  function onMouseUp() {
    slider.style.transition = "transform 0.5s ease";
    slider.style.cursor = "grab";

    if (moveX < -100) {
      
      nextSlide();
    } else if (moveX > 100) {
     
      goToSlide(currentIndex - 1);
    } else {
      
      goToSlide(currentIndex);
    }

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  slider.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    slider.style.transition = "none";

    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  });

  function onTouchMove(e) {
    moveX = e.touches[0].clientX - startX;
    const slideWidth = slides[0].offsetWidth;
    const containerWidth = document.querySelector(".slider-container").offsetWidth;
    const offset = (containerWidth - slideWidth) / 8; 
    const position = offset - currentIndex * (slideWidth + 20) + moveX;

    slider.style.transform = `translateX(${position}px)`;
  }

  function onTouchEnd() {
    slider.style.transition = "transform 0.5s ease";

    if (moveX < -50) {
    
      nextSlide();
    } else if (moveX > 50) {
     
      goToSlide(currentIndex - 1);
    } else {

      goToSlide(currentIndex);
    }

    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  }


  window.addEventListener("load", function () {
    positionSlider();
    startAutoSlide();
  });


  window.addEventListener("resize", positionSlider);
});

//galerry 

document.addEventListener("DOMContentLoaded", function () {
  const galleryInner = document.querySelector(".gallery-inner");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const itemCount = galleryItems.length;

  let startX, moveX;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;
  let currentIndex = 0;
  let animationID = 0;
  let interval;

  function setupGallery() {
    const trackWidth = document.querySelector(".gallery-track").offsetWidth;
    const itemWidth = galleryItems[0].offsetWidth;
    const itemMargin = 10; // margin-left + margin-right
    const totalItemWidth = itemWidth + itemMargin;

    const totalWidth = itemCount * totalItemWidth;

    galleryInner.style.width = `${totalWidth}px`;

    // Start from left side instead of center
    const offset = 0;
    galleryInner.style.transform = `translateX(${offset}px)`;

    currentTranslate = offset;
    prevTranslate = offset;
  }

  function startAutoSlide() {
    interval = setInterval(() => {
      const trackWidth = document.querySelector(".gallery-track").offsetWidth;
      const itemWidth = galleryItems[0].offsetWidth;
      const itemMargin = 10;
      const totalItemWidth = itemWidth + itemMargin;

      currentTranslate -= totalItemWidth;

      const maxTranslate = -(galleryInner.offsetWidth - trackWidth);

      if (currentTranslate < maxTranslate) {
        currentTranslate = 0; // Reset to left side
      }

      prevTranslate = currentTranslate;
      setSliderPosition();
    }, 3000);
  }

  function setSliderPosition() {
    galleryInner.style.transform = `translateX(${currentTranslate}px)`;
  }

  function resetInterval() {
    clearInterval(interval);
    startAutoSlide();
  }

  galleryItems.forEach((item) => {
    const preventDragHandler = (e) => {
      e.preventDefault();
    };

    item.addEventListener("dragstart", preventDragHandler);

    item.addEventListener("mousedown", startDrag);
    item.addEventListener("touchstart", startDrag, { passive: true });
  });

  function startDrag(event) {
    isDragging = true;
    startX = event.type.includes("mouse") ? event.clientX : event.touches[0].clientX;

    cancelAnimationFrame(animationID);
    clearInterval(interval);

    galleryInner.style.transition = "none";
  }

  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag, { passive: false });

  function drag(event) {
    if (!isDragging) return;

    const currentX = event.type.includes("mouse") ? event.clientX : event.touches[0].clientX;

    moveX = currentX - startX;
    currentTranslate = prevTranslate + moveX;

    setSliderPosition();

    if (event.type.includes("touch")) {
      event.preventDefault();
    }
  }

  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;

    galleryInner.style.transition = "transform 0.5s ease";

    prevTranslate = currentTranslate;

    resetInterval();
  }

  window.addEventListener("load", function () {
    setupGallery();
    startAutoSlide();
  });

  window.addEventListener("resize", function () {
    clearInterval(interval);
    setupGallery();
    startAutoSlide();
  });
});

//linf-for-form

 document.addEventListener("DOMContentLoaded", function () {
   // Select all links with class "link__free"
   const freeLinks = document.querySelectorAll("a.link__free");

   // Add click event listener to each link
   freeLinks.forEach((link) => {
     link.addEventListener("click", function (e) {
       e.preventDefault(); // Prevent default anchor behavior

       // Find the form container
       const formContainer = document.querySelector(".container__form");

       // Scroll to the form container smoothly if it exists
       if (formContainer) {
         formContainer.scrollIntoView({
           behavior: "smooth",
           block: "start"
         });
       }
     });
   });
 });

 //adaptive slider

 document.addEventListener("DOMContentLoaded", function () {
   // Select all blocks and containers
   const blocks = document.querySelectorAll(".block__join");
   const sliderContainer = document.querySelector(".slider-container__join");
   const slider = document.querySelector(".slideres");
   const paginationContainer = document.querySelector(".slider-pagination");

   // Create slider from blocks
   blocks.forEach((block, index) => {
     // Create slide
     const slide = document.createElement("div");
     slide.classList.add("slidee");
     slide.innerHTML = block.innerHTML;
     slider.appendChild(slide);

     // Create pagination dot
     const dot = document.createElement("div");
     dot.classList.add("dot");
     if (index === 0) dot.classList.add("active");
     dot.setAttribute("data-index", index);
     dot.addEventListener("click", () => goToSlide(index));
     paginationContainer.appendChild(dot);
   });

   // Slider functionality
   let currentSlide = 0;
   const slidesCount = blocks.length;
   let autoSlideInterval;

   // Function to go to specific slide
   function goToSlide(index) {
     currentSlide = index;
     slider.style.transform = `translateX(-${currentSlide * 100}%)`;

     // Update active dot
     document.querySelectorAll(".dot").forEach((dot, i) => {
       dot.classList.toggle("active", i === currentSlide);
     });
   }

   // Function for next slide
   function nextSlide() {
     goToSlide((currentSlide + 1) % slidesCount);
   }

   // Function for previous slide
   function prevSlide() {
     goToSlide((currentSlide - 1 + slidesCount) % slidesCount);
   }

   // Touch swipe functionality
   let touchStartX = 0;
   let touchEndX = 0;

   slider.addEventListener(
     "touchstart",
     (e) => {
       touchStartX = e.changedTouches[0].screenX;
       clearInterval(autoSlideInterval); // Pause auto-sliding when user touches
     },
     { passive: true }
   );

   slider.addEventListener(
     "touchend",
     (e) => {
       touchEndX = e.changedTouches[0].screenX;
       handleSwipe();
       startAutoSlide(); // Resume auto-sliding
     },
     { passive: true }
   );

   function handleSwipe() {
     const swipeThreshold = 50; // Minimum swipe distance

     if (touchStartX - touchEndX > swipeThreshold) {
       // Swipe left - next slide
       nextSlide();
     } else if (touchEndX - touchStartX > swipeThreshold) {
       // Swipe right - previous slide
       prevSlide();
     }
   }

   // Auto-sliding functionality
   function startAutoSlide() {
     clearInterval(autoSlideInterval);
     autoSlideInterval = setInterval(() => {
       nextSlide();
     }, 4000); // Change slide every 4 seconds
   }

   // Check screen width to initialize slider if needed
   function checkWidth() {
     if (window.innerWidth <= 500) {
       startAutoSlide();
     } else {
       clearInterval(autoSlideInterval);
     }
   }

   // Check width on load and window resize
   window.addEventListener("resize", checkWidth);
   checkWidth();
 });