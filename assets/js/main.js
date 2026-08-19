$(function () {
  const exploreCollectionSwiper = new Swiper(".expolore-coll__slider", {
    slidesPerView: "auto",
    spaceBetween: 10,
    speed: 700,
    grabCursor: true,

    navigation: {
      nextEl: ".expolore-coll__next",
      prevEl: ".expolore-coll__prev",
    },

    scrollbar: {
      el: ".expolore-coll__scrollbar",
      draggable: true,
    },

    // breakpoints: {
    //   0: {
    //     slidesPerGroup: 1,
    //   },

    //   768: {
    //     slidesPerGroup: 1,
    //   },

    //   1024: {
    //     slidesPerGroup: 1,
    //   },
    // },
  });
});
