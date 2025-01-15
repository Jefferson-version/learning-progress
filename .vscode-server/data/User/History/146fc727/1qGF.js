var swiper = new Swiper(".slide-characters", {
  slidesPerView: 3.5,
  spaceBetween: 19,
  freeMode: true,
  breakpoints: {
    320: {
      slidesPerView: 1.1,
      spaceBetween: 19,
    },
    768: {
      slidesPerView: 2.2,
      spaceBetween: 19,
    },
  },
});
