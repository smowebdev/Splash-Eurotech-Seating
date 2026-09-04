$(function () {
  // Quick Navigation
  const $header = $(".header-site");
  const $nav = $(".quick-nav");
  const $target = $(".dealer-finder");
  const headerHeight = $header.outerHeight() || 85;

  function toggleNav() {
    if (!$target.length) return;

    const targetTop = $target.offset().top;
    const scrollTop = $(window).scrollTop();

    const reached = scrollTop + headerHeight >= targetTop;

    if (reached) {
      $nav.addClass("is-visible");
    } else {
      $nav.removeClass("is-visible");
    }
  }

  $(window).on("scroll resize", toggleNav);
  toggleNav();

  $nav.on("click", ".quick-nav__item[data-page]", function (e) {
    e.preventDefault();

    const $item = $(this);
    const page = $item.data("page");
    const $section = $("." + page);

    if (!$section.length) return;

    const offset = 150;
    const targetPosition = $section.offset().top - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });

  const $navItems = $nav.find(".quick-nav__item[data-page]");

  function updateActiveNav() {
    const scrollTop = $(window).scrollTop();
    let current = null;

    $navItems.each(function () {
      const page = $(this).data("page");
      const $section = $("." + page);
      if (!$section.length) return;

      const sectionTop = $section.offset().top - 150 - 10;
      if (scrollTop >= sectionTop) {
        current = $(this);
      }
    });

    $navItems.removeClass("quick-nav__item--active");
    if (current) {
      current.addClass("quick-nav__item--active");
    }
  }

  $(window).on("scroll resize", updateActiveNav);
  updateActiveNav();

  // Documents Library
  $(".documents-library__filter-toggle").on("click", function () {
    const $filter = $(this).closest(".documents-library__filter");
    const $body = $filter.find(".documents-library__filter-body");

    if ($filter.hasClass("is-open")) {
      $filter.removeClass("is-open");
      $body.slideUp(200);
    } else {
      $filter.addClass("is-open");
      $body.slideDown(200);
    }
  });

  // contract details Toggle
  $(".contract-details__toggle").on("click", function () {
    const $item = $(this).closest(".contract-details__item");
    const $body = $item.find(".contract-details__body");

    if ($item.hasClass("is-open")) {
      $item.removeClass("is-open");
      $body.slideUp(200);
    } else {
      $item.addClass("is-open");
      $body.slideDown(200);
    }
  });

  // Featured Videos
  const $items = $(".featured-videos__item");

  $items.each(function () {
    const $item = $(this);
    const type = $item.data("video-type"); // "video" hoặc "iframe"
    const $play = $item.find(".featured-videos__play");
    const $media =
      type === "iframe" ? $item.find("iframe") : $item.find("video");

    $play.on("click", function () {
      $items.not($item).each(function () {
        resetItem($(this));
      });

      $item.addClass("is-playing");

      if (type === "iframe") {
        let src = $media.attr("data-src") || $media.attr("src");
        if (src.indexOf("autoplay=1") === -1) {
          src += (src.indexOf("?") > -1 ? "&" : "?") + "autoplay=1";
        }
        $media.attr("src", src);
      } else {
        $media[0].play();
      }
    });

    if (type !== "iframe") {
      $media.on("ended", function () {
        resetItem($item);
      });
    }
  });

  function resetItem($item) {
    $item.removeClass("is-playing");
    const type = $item.data("video-type");
    const $media =
      type === "iframe" ? $item.find("iframe") : $item.find("video");

    if (type === "iframe") {
      const baseSrc = $media.attr("src").split("?")[0];
      $media.attr("src", baseSrc);
    } else {
      $media[0].pause();
      $media[0].currentTime = 0;
    }
  }
});
