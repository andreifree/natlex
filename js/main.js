/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);

let currentSlide = 0;
const totalSlides = 3;
let autoSlideInterval;
let bulletAnimationTimeout;

function goToSlide(slideIndex) {
  document.querySelectorAll('.hero__slide-content').forEach((content, index) => {
    content.classList.toggle('hero__slide-content--active', index === slideIndex);
  });
  document.querySelectorAll('.hero__image-wrapper').forEach((wrapper, index) => {
    wrapper.classList.toggle('hero__image-wrapper--active', index === slideIndex);
  });
  document.querySelectorAll('.hero__bullet').forEach((bullet, index) => {
    bullet.classList.remove('hero__bullet--active');
    if (index < slideIndex) {
      bullet.classList.add('hero__bullet--completed');
    } else if (index === slideIndex) {
      bullet.classList.remove('hero__bullet--completed');
      bullet.classList.add('hero__bullet--active');
    } else {
      bullet.classList.remove('hero__bullet--completed');
    }
  });
  currentSlide = slideIndex;
  resetAutoSlide();
}

function nextSlide() {
  const next = (currentSlide + 1) % totalSlides;
  goToSlide(next);
}

function prevSlide() {
  const prev = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(prev);
}

function resetAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
  if (bulletAnimationTimeout) {
    clearTimeout(bulletAnimationTimeout);
  }
  const activeBullet = document.querySelector('.hero__bullet--active');
  if (activeBullet) {
    activeBullet.style.animation = 'none';
    setTimeout(() => {
      activeBullet.style.animation = '';
    }, 10);
  }
  autoSlideInterval = setInterval(nextSlide, 5000);
}

const heroNextBtn = document.querySelector('.hero__next');
const heroPrevBtn = document.querySelector('.hero__prev');
const heroBullets = document.querySelectorAll('.hero__bullet');

if (heroNextBtn) {
  heroNextBtn.addEventListener('click', nextSlide);
}
if (heroPrevBtn) {
  heroPrevBtn.addEventListener('click', prevSlide);
}
heroBullets.forEach((bullet, index) => {
  bullet.addEventListener('click', () => goToSlide(index));
});

resetAutoSlide();

// projectsslider

const projectsSlider = new Swiper('.projects__slider', {
  navigation: {
    nextEl: '.projects__next',
    prevEl: '.projects__prev'
  },
  on: {
    slideChange: function() {
      const activeSlide = this.slides[this.activeIndex];
      const subtitle = document.querySelector('.projects__subtitle');
      const text = document.querySelector('.projects__text');
      const btn = document.querySelector('.projects__btn');
      
      if (activeSlide && subtitle && text && btn) {
        subtitle.innerHTML = activeSlide.dataset.subtitle || '';
        text.textContent = activeSlide.dataset.text || '';
        btn.href = activeSlide.dataset.link || '#';
      }
    }
  }
});

const initProjectsContent = () => {
  const firstSlide = document.querySelector('.projects__slide');
  if (firstSlide) {
    const subtitle = document.querySelector('.projects__subtitle');
    const text = document.querySelector('.projects__text');
    const btn = document.querySelector('.projects__btn');
    
    if (subtitle && text && btn) {
      subtitle.innerHTML = firstSlide.dataset.subtitle || '';
      text.textContent = firstSlide.dataset.text || '';
      btn.href = firstSlide.dataset.link || '#';
    }
  }
};

if (document.querySelector('.projects__slider')) {
  initProjectsContent();
}

//faq

const accordionItems = document.querySelectorAll('.accordion__item');
accordionItems.forEach(item => {
  const top = item.querySelector('.accordion__top');
  const answer = item.querySelector('.accordion__answer');
  top.addEventListener('click', () => {
    accordionItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion__answer').style.maxHeight = null;
      }
    });
    item.classList.toggle('active');
    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = null;
    }
  });
  answer.style.maxHeight = null;
});

//why-us slider

const whyUsSlider = new Swiper('.why-us__slider', {
  slidesPerView: 'auto'
});

//tabs

const tabs = document.querySelectorAll('.tabs__btn'); // Все кнопки категорий
const content = document.querySelectorAll('.tabs__content'); // Все блоки контента

function changeClass(target) {
  // Удаляем класс 'active' со всех кнопок
  tabs.forEach(tab => tab.classList.remove('active'));
  // Добавляем класс 'active' к нажатой кнопке
  target.classList.add('active');
}
tabs.forEach(tab => {
  // Важно! Цикл forEach вместо добавления обработчика только к элементу
  tab.addEventListener('click', function (e) {
    var currTab = e.target.dataset.btn;
    changeClass(e.target);
    content.forEach(item => {
      //Цикл forEach для обработки всех элементов content
      item.classList.remove('active');
      if (item.dataset.content === currTab) {
        item.classList.add('active');
      }
    });
  });
});

//show all

const historyWrapper = document.querySelector('.history__wrapper');
const showAllButton = document.querySelector('.history__all');
if (showAllButton && historyWrapper) {
  showAllButton.addEventListener('click', function () {
    historyWrapper.classList.add('history--show-all');
    // Опционально: скрыть кнопку после нажатия
    showAllButton.style.display = 'none';
  });
}
const teamWrapper = document.querySelector('.team__wrapper');
const teamshowAllButton = document.querySelector('.team__all');
if (teamshowAllButton && teamWrapper) {
  teamshowAllButton.addEventListener('click', function () {
    teamWrapper.classList.add('team-show-all');
    teamshowAllButton.style.display = 'none';
  });
}

const heroSocialNext = document.querySelector('.hero__social-next');
if (heroSocialNext) {
  heroSocialNext.addEventListener('click', function (e) {
    e.preventDefault();
    const socialTop = document.querySelector('.hero__social-top');
    if (socialTop) {
      const itemHeight = socialTop.querySelector('.hero__social-item').offsetHeight;
      const maxScroll = socialTop.scrollHeight - socialTop.clientHeight;
      if (socialTop.scrollTop >= maxScroll - 10) {
        socialTop.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        socialTop.scrollBy({
          top: itemHeight + 24,
          behavior: 'smooth'
        });
      }
    }
  });
}

const burger = document.querySelector('.burger');
const nav = document.querySelector('.header__nav');
const body = document.body;
const contactModal = document.getElementById('contactModal');
const successModal = document.getElementById('successModal');
const modalTriggers = document.querySelectorAll('.header__btn, .nav__btn, .footer .btn');
const modalClose = document.querySelector('.modal__close');
const modalOverlays = document.querySelectorAll('.modal__overlay');
const successBtn = document.querySelector('.modal__success-btn');

modalTriggers.forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    if (burger && nav) {
      burger.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('menu-open');
    }
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});
if (modalClose) {
  modalClose.addEventListener('click', function () {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
  });
}
modalOverlays.forEach(overlay => {
  overlay.addEventListener('click', function () {
    contactModal.classList.remove('active');
    successModal.classList.remove('active');
    document.body.style.overflow = '';
  });
});
if (successBtn) {
  successBtn.addEventListener('click', function () {
    successModal.classList.remove('active');
    document.body.style.overflow = '';
  });
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    contactModal.classList.remove('active');
    successModal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

if (burger && nav) {
  burger.addEventListener('click', function() {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  const navLinks = nav.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      burger.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  document.addEventListener('click', function(e) {
    if (nav.classList.contains('active') && !nav.contains(e.target) && !burger.contains(e.target)) {
      burger.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      burger.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components.js */ "./src/js/_components.js");

})();

/******/ })()
;