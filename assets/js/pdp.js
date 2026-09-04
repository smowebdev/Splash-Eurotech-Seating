$(function () {
  // Config Option - Start
  function initChairColorOptions() {
    const $chairModel = $("#chairModel");

    if (!$chairModel.length) return;

    $(".color-options").each(function () {
      const $wrapper = $(this);

      initColorPicker({
        $colors: $wrapper.find(".color-option"),
        $indicator: $wrapper.find(".cs-color-indicator"),
      });

      $wrapper.on("click", ".color-option", function () {
        const url = $(this).data("url");

        if (!url) return;

        $chairModel[0].src = url;
      });

      const $initialColor = $wrapper.find(".color-option.active").first();

      if ($initialColor.length) {
        const url = $initialColor.data("url");

        if (url) {
          $chairModel[0].src = url;
        }
      }
    });

    $(".option-cates").each(function () {
      const $wrapper = $(this);

      $wrapper.on("click", ".option-cate", function () {
        const $this = $(this);
        const url = $this.data("url");

        $wrapper.find(".option-cate").removeClass("selected");
        $this.addClass("selected");

        const text = $.trim($this.text());

        $wrapper
          .closest(".configure-option")
          .find(".configure-option__label span")
          .text(text);

        if (url) {
          $chairModel[0].src = url;
        }
      });
    });
  }

  initChairColorOptions();
  // Config Option - End

  // Config ToolBar - Start
  const $configurator = $("#chairConfigurator");
  const $fullscreenBtn = $("#fullscreenBtn");
  const model = $("#chairModel")[0];

  $fullscreenBtn.on("click", function () {
    $configurator.toggleClass("is-fullscreen");

    const active = $configurator.hasClass("is-fullscreen");

    $(this)
      .toggleClass("is-active", active)
      .find(".viewer-tool__label")
      .text(active ? "Exit Fullscreen" : "Fullscreen");
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $configurator.removeClass("is-fullscreen");

      $fullscreenBtn.html('<span class="fullscreen-icon">⛶</span> Fullscreen');
    }
  });
  $("#viewRoomBtn").on("click", function () {
    const $wrapper = $(this).closest(".view-room-wrapper");
    const $qrCode = $("#qrCode");

    if ($wrapper.hasClass("is-open")) {
      $wrapper.removeClass("is-open");
      return;
    }

    if (!$qrCode.children().length) {
      new QRCode($qrCode[0], {
        text: window.location.href,
        width: 160,
        height: 160,
        correctLevel: QRCode.CorrectLevel.H,
      });
    }

    $wrapper.addClass("is-open");
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".view-room-wrapper").length) {
      $(".view-room-wrapper").removeClass("is-open");
    }
  });
  const zoomStep = 0.5;

  $("#zoomIn").on("click", function () {
    const orbit = model.getCameraOrbit();

    orbit.radius = Math.max(1, orbit.radius - zoomStep);

    model.cameraOrbit = `${orbit.theta}rad ${orbit.phi}rad ${orbit.radius}m`;
  });

  $("#zoomOut").on("click", function () {
    const orbit = model.getCameraOrbit();

    orbit.radius = Math.min(8, orbit.radius + zoomStep);

    model.cameraOrbit = `${orbit.theta}rad ${orbit.phi}rad ${orbit.radius}m`;
  });

  $("#dimensionsBtn").on("click", function () {
    const $dimensions = $("#chairDimensions");

    $dimensions.toggleClass("is-visible");

    $(this).toggleClass("active", $dimensions.hasClass("is-visible"));
  });
  // Config ToolBar - Ebd

  $(".chair-accordion__question").on("click", function () {
    const $button = $(this);
    const $item = $button.closest(".chair-accordion__item");
    const $answer = $item.find(".chair-accordion__answer");

    if ($item.hasClass("is-open")) {
      $item.removeClass("is-open");
      $answer.stop(true, true).slideUp(300);
    } else {
      $(".chair-accordion__item")
        .removeClass("is-open")
        .find(".chair-accordion__answer")
        .stop(true, true)
        .slideUp(300);

      $item.addClass("is-open");

      $answer.stop(true, true).slideDown(300);
    }
  });

  function initChairSwiper(options) {
    const $swiperEl = $(options.slider);

    if (!$swiperEl.length) return;

    const $activeSlide = $swiperEl.find(".swiper-slide.is-active").first();

    let initialSlide = $swiperEl.find(".swiper-slide").index($activeSlide);

    if (initialSlide < 0) {
      initialSlide = 0;
    }

    const swiper = new Swiper($swiperEl[0], {
      slidesPerView: 3.75,
      spaceBetween: 24,

      speed: 400,

      loop: true,

      initialSlide: initialSlide,

      freeMode: false,

      pagination: {
        el: options.pagination,
        type: "progressbar",
      },

      navigation: {
        nextEl: options.next,
        prevEl: options.prev,
      },
    });

    swiper.on("click", function () {
      const $clickedSlide = $(swiper.clickedSlide);

      if (!$clickedSlide.length) return;

      const realIndex = $clickedSlide.attr("data-swiper-slide-index");

      if (realIndex === undefined) return;

      const index = Number(realIndex);

      // Active state
      $swiperEl.find(".chair-card").removeClass("is-active");
      $swiperEl.find(".swiper-slide").removeClass("is-active");

      $clickedSlide
        .addClass("is-active")
        .find(".chair-card")
        .addClass("is-active");

      const $section = $swiperEl.closest(".config-section");

      const chairName = $clickedSlide.find(".chair-card > span").text().trim();

      if (chairName) {
        $section
          .find(".config-section__toggle > span:first-child")
          .text(chairName);
      }

      const modelUrl = $clickedSlide.attr("data-url");

      if (modelUrl) {
        const model = $("#chairModel")[0];

        if (model) {
          model.setAttribute("src", modelUrl);
        }
      }

      if (index !== swiper.realIndex) {
        swiper.slideToLoop(index, 400);
      }
    });
  }

  initChairSwiper({
    slider: ".collection-swiper",

    pagination: ".collection-pagination",

    prev: ".collection-prev",

    next: ".collection-next",
  });

  initChairSwiper({
    slider: ".model-swiper",

    pagination: ".model-pagination",

    prev: ".model-prev",

    next: ".model-next",
  });

  const $firstConfigSection = $(".config-section").first();

  $firstConfigSection.addClass("is-open");
  $firstConfigSection.find(".config-slider-wrap").show();
  $(".config-section__header").on("click", function () {
    const $section = $(this).closest(".config-section");
    const $sliderWrap = $section.find(".config-slider-wrap");

    $section.toggleClass("is-open");

    if ($section.hasClass("is-open")) {
      $sliderWrap.stop(true, true).slideDown(300);
    } else {
      $sliderWrap.stop(true, true).slideUp(300);
    }
  });
});
