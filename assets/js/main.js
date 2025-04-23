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

//slider-section

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".sliders__img");
  const slides = document.querySelectorAll(".slides__img");
  const slideCount = slides.length;
  let currentIndex = 0;
  let startX, moveX;
  let interval;

  // Налаштовуємо початковий відступ, щоб показати частини сусідніх слайдів
  // Значно зменшуємо відступ, щоб перший слайд був ближче до краю
  function positionSlider() {
    const slideWidth = slides[0].offsetWidth;
    const containerWidth = document.querySelector(".slider-container").offsetWidth;
    const offset = (containerWidth - slideWidth) / 8; // Зменшено з /4 на /8

    // Це встановлює початковий відступ для першого слайду
    slider.style.transform = `translateX(${offset}px)`;

    // Додаємо відступи для слайдів, щоб вони були центровані
    slides.forEach((slide) => {
      slide.style.marginLeft = "10px";
      slide.style.marginRight = "10px";
    });
  }

  // Функція для переходу до конкретного слайду
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
    const offset = (containerWidth - slideWidth) / 8; // Зменшено з /4 на /8

    // Розрахунок зміщення для поточного слайду
    const position = offset - currentIndex * (slideWidth + 20); // 20 це сума відступів слайда (10px з кожного боку)

    slider.style.transform = `translateX(${position}px)`;

    // Перезапускаємо автоматичну зміну слайдів
    resetInterval();
  }

  // Функція для переходу до наступного слайду
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  // Функція для запуску автоматичної зміни слайдів
  function startAutoSlide() {
    interval = setInterval(nextSlide, 3000); // Зміна кожні 3 секунди
  }

  // Функція для перезапуску автоматичної зміни слайдів
  function resetInterval() {
    clearInterval(interval);
    startAutoSlide();
  }

  // Обробники подій для перетягування слайдера мишею
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
    const offset = (containerWidth - slideWidth) / 8; // Зменшено з /4 на /8
    const position = offset - currentIndex * (slideWidth + 20) + moveX;

    slider.style.transform = `translateX(${position}px)`;
  }

  function onMouseUp() {
    slider.style.transition = "transform 0.5s ease";
    slider.style.cursor = "grab";

    if (moveX < -100) {
      // Свайп вліво - наступний слайд
      nextSlide();
    } else if (moveX > 100) {
      // Свайп вправо - попередній слайд
      goToSlide(currentIndex - 1);
    } else {
      // Повертаємось на поточний слайд, якщо зміщення невелике
      goToSlide(currentIndex);
    }

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  // Додаємо підтримку сенсорних пристроїв
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
    const offset = (containerWidth - slideWidth) / 8; // Зменшено з /4 на /8
    const position = offset - currentIndex * (slideWidth + 20) + moveX;

    slider.style.transform = `translateX(${position}px)`;
  }

  function onTouchEnd() {
    slider.style.transition = "transform 0.5s ease";

    if (moveX < -50) {
      // Свайп вліво - наступний слайд
      nextSlide();
    } else if (moveX > 50) {
      // Свайп вправо - попередній слайд
      goToSlide(currentIndex - 1);
    } else {
      // Повертаємось на поточний слайд, якщо зміщення невелике
      goToSlide(currentIndex);
    }

    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  }

  // Ініціалізація слайдера
  window.addEventListener("load", function () {
    positionSlider();
    startAutoSlide();
  });

  // Коригуємо позиціонування при зміні розміру вікна
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

   // Налаштування початкової позиції для показу частини першого і останнього слайдів
   function setupGallery() {
     const trackWidth = document.querySelector(".gallery-track").offsetWidth;
     const itemWidth = galleryItems[0].offsetWidth;
     const itemMargin = 10; // margin-left + margin-right
     const totalItemWidth = itemWidth + itemMargin;

     // Кількість елементів, що можуть поміститися у вікні перегляду
     const visibleItems = Math.floor(trackWidth / totalItemWidth);

     // Загальна ширина всіх елементів
     const totalWidth = itemCount * totalItemWidth;

     // Встановлюємо ширину для внутрішнього контейнера
     galleryInner.style.width = `${totalWidth}px`;

     // Центруємо галерею з видимими крайніми елементами
     const offset = (trackWidth - visibleItems * totalItemWidth) / 2;
     galleryInner.style.transform = `translateX(${offset}px)`;

     // Запам'ятовуємо поточне зміщення
     currentTranslate = offset;
     prevTranslate = offset;
   }

   // Функція для автоматичного гортання слайдів
   function startAutoSlide() {
     interval = setInterval(() => {
       const trackWidth = document.querySelector(".gallery-track").offsetWidth;
       const itemWidth = galleryItems[0].offsetWidth;
       const itemMargin = 10;
       const totalItemWidth = itemWidth + itemMargin;

       // Переміщуємо на ширину одного елемента
       currentTranslate -= totalItemWidth;

       // Перевіряємо чи дійшли до кінця
       const maxTranslate = -(galleryInner.offsetWidth - trackWidth + totalItemWidth / 2);

       if (currentTranslate < maxTranslate) {
         // Якщо дійшли до кінця, повертаємось на початок
         currentTranslate = (trackWidth - (itemWidth + itemMargin)) / 2;
       }

       prevTranslate = currentTranslate;
       setSliderPosition();
     }, 3000);
   }

   // Функція для встановлення позиції слайдера
   function setSliderPosition() {
     galleryInner.style.transform = `translateX(${currentTranslate}px)`;
   }

   // Функція для перезапуску автоматичного гортання
   function resetInterval() {
     clearInterval(interval);
     startAutoSlide();
   }

   // Обробники подій для перетягування мишею
   galleryItems.forEach((item) => {
     // Відключаємо вбудований drag & drop
     const preventDragHandler = (e) => {
       e.preventDefault();
     };

     item.addEventListener("dragstart", preventDragHandler);

     // Обробники подій мишею
     item.addEventListener("mousedown", startDrag);
     item.addEventListener("touchstart", startDrag, { passive: true });
   });

   function startDrag(event) {
     isDragging = true;
     startX = event.type.includes("mouse") ? event.clientX : event.touches[0].clientX;

     // Зупиняємо анімацію та автогортання під час перетягування
     cancelAnimationFrame(animationID);
     clearInterval(interval);

     // Прибираємо перехід для плавного перетягування
     galleryInner.style.transition = "none";
   }

   document.addEventListener("mousemove", drag);
   document.addEventListener("touchmove", drag, { passive: false });

   function drag(event) {
     if (!isDragging) return;

     const currentX = event.type.includes("mouse") ? event.clientX : event.touches[0].clientX;

     moveX = currentX - startX;
     currentTranslate = prevTranslate + moveX;

     // Оновлюємо позицію слайдера
     setSliderPosition();

     // Запобігаємо скролу сторінки під час свайпу на мобільних
     if (event.type.includes("touch")) {
       event.preventDefault();
     }
   }

   document.addEventListener("mouseup", endDrag);
   document.addEventListener("touchend", endDrag);

   function endDrag() {
     if (!isDragging) return;
     isDragging = false;

     // Повертаємо перехід для плавної анімації
     galleryInner.style.transition = "transform 0.5s ease";

     // Оновлюємо попередню позицію
     prevTranslate = currentTranslate;

     // Перезапускаємо автоматичне гортання
     resetInterval();
   }

   // Ініціалізація галереї при завантаженні
   window.addEventListener("load", function () {
     setupGallery();
     startAutoSlide();
   });

   // Оновлення при зміні розміру вікна
   window.addEventListener("resize", function () {
     clearInterval(interval);
     setupGallery();
     startAutoSlide();
   });
 });