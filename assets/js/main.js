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
  const workspaceSwiper = new Swiper(".workspace-slider", {
    slidesPerView: "auto",
    spaceBetween: 10,
    speed: 700,
    grabCursor: true,
    navigation: {
      nextEl: ".workspace__next",
      prevEl: ".workspace__prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  $(".workspace-card").each(function () {
    const $card = $(this);

    $card.find(".hotspot-btn").on("click", function (e) {
      e.stopPropagation();

      const $hotspot = $(this).closest(".product-hotspot");

      const isActive = $hotspot.hasClass("active");

      $card.find(".product-hotspot").removeClass("active");

      if (!isActive) {
        $hotspot.addClass("active");
      }
    });
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".product-hotspot").length) {
      $(".product-hotspot").removeClass("active");
    }
  });
});
