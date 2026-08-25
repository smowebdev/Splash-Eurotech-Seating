$(function () {
  let lenis = null;

  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
  // Slider Explore Collections In Home Page - Start
  $("section")
    .has(".expolore-coll__slider")
    .each(function () {
      const $section = $(this);

      new Swiper($section.find(".expolore-coll__slider")[0], {
        slidesPerView: "auto",
        spaceBetween: 10,
        speed: 700,
        grabCursor: true,

        navigation: {
          nextEl: $section.find(".expolore-coll__next")[0],
          prevEl: $section.find(".expolore-coll__prev")[0],
        },

        scrollbar: {
          el: $section.find(".expolore-coll__scrollbar")[0],
          draggable: true,
        },
      });
    });
  // Slider Explore Collections In Home Page - End

  // Slider WorkSpace In Home Page - Start
  $("section")
    .has(".workspace-slider")
    .each(function () {
      const $section = $(this);

      new Swiper($section.find(".workspace-slider")[0], {
        slidesPerView: "auto",
        spaceBetween: 10,
        speed: 700,
        grabCursor: true,

        navigation: {
          nextEl: $section.find(".workspace__next")[0],
          prevEl: $section.find(".workspace__prev")[0],
        },

        pagination: {
          el: $section.find(".swiper-pagination")[0],
          clickable: true,
        },
      });
    });
  // Slider WorkSpace In Home Page - End

  // hotspot in WorkSpace Card - Start
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
  // hotspot in WorkSpace Card - End

  // Toggle Popular/Newest - Start
  $(".model-filter__toggle").on("click", function () {
    const $filter = $(this).closest(".model-filter");

    $filter.toggleClass("is-newest");

    if ($filter.hasClass("is-newest")) {
      console.log("Show Newest");
    } else {
      console.log("Show Popular");
    }
  });
  // Toggle Popular/Newest - End

  // Filter Product - Start
  const $filterProduct = $(".product-filter");
  const $itemsFilters = $filterProduct.find(".product-filter__item");

  function closeAllFilters() {
    $itemsFilters
      .removeClass("is-active")
      .find(".product-filter__trigger")
      .attr("aria-expanded", "false");
  }

  $filterProduct.on("click", ".product-filter__trigger", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const $trigger = $(this);
    const $item = $trigger.closest(".product-filter__item");
    const isActive = $item.hasClass("is-active");

    closeAllFilters();

    if (!isActive) {
      $item
        .addClass("is-active")
        .find(".product-filter__trigger")
        .attr("aria-expanded", "true");
    }
  });

  $filterProduct.on("click", ".product-filter__dropdown", function (e) {
    e.stopPropagation();
  });

  $(document).on("click", function () {
    closeAllFilters();
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      closeAllFilters();
    }
  });

  function updateFilterCount($item) {
    const count = $item.find('input[type="checkbox"]:checked').length;
    const $count = $item.find(".product-filter__count");

    $count.text(count || "").toggleClass("is-visible", count > 0);

    $item.toggleClass("has-value", count > 0);
  }

  $itemsFilters.each(function () {
    updateFilterCount($(this));
  });

  $filterProduct.on("change", 'input[type="checkbox"]', function () {
    updateFilterCount($(this).closest(".product-filter__item"));
  });

  $filterProduct.on("click", ".product-filter__clear", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const $item = $(this).closest(".product-filter__item");

    $item.find('input[type="checkbox"]').prop("checked", false);

    updateFilterCount($item);

    applyFilters();
  });

  $filterProduct.on("change", 'input[name="sort-by"]', function () {
    const $input = $(this);
    const $item = $input.closest(".product-filter__item");
    const value = $input.val();

    const text = $input
      .closest(".product-filter__option")
      .find("> span:last-child")
      .text()
      .trim();

    $item
      .find(".product-filter__selected")
      .css("display", value ? "inline" : "")
      .text(value ? text : "");

    $item.toggleClass("has-value", !!value);

    applyFilters();
  });

  function getSelectedFilters() {
    const filters = {};

    $filterProduct
      .find(".product-filter__item:not(.product-filter__item--sort)")
      .each(function () {
        const $inputs = $(this).find('input[type="checkbox"]:checked');

        if (!$inputs.length) {
          return;
        }

        const name = $inputs.first().attr("name");

        filters[name] = $inputs
          .map(function () {
            return $(this).val();
          })
          .get();
      });

    const sortValue = $filterProduct
      .find('input[name="sort-by"]:checked')
      .val();

    filters.sortBy = sortValue || "newest";

    return filters;
  }

  function getSelectedCategories() {
    return $(".browse-settings__cate-item.active")
      .map(function () {
        return $(this).data("value");
      })
      .get();
  }

  function applyFilters() {
    const filters = getSelectedFilters();

    filters.category = getSelectedCategories();

    console.log("Selected filters:", filters);
  }

  $filterProduct.on("change", "input", function () {
    applyFilters();
  });

  $(document).on("click", ".browse-settings__cate-item", function () {
    $(this).toggleClass("active");

    applyFilters();
  });
  // Filter Product - End

  // Collection Tabs - Start
  $(".collection-tabs-sec").each(function () {
    const $section = $(this);
    const $items = $section.find(".collection-tabs__item");
    const $contents = $section.find(".collection-tabs__content");
    $items.first().addClass("active");
    const firstTab = $items.first().data("tab");
    $contents.filter(`[data-content="${firstTab}"]`).addClass("active");
    $items.on("click", function () {
      const $this = $(this);
      const tab = $this.data("tab");

      $items.removeClass("active");
      $contents.removeClass("active");

      $this.addClass("active");
      $contents.filter(`[data-content="${tab}"]`).addClass("active");
    });
  });

  // Collection Tabs - End

  // Collection Explore Tab - Start
  $(".collection-explore-sec").each(function () {
    const $section = $(this);
    const $tabs = $section.find(".collection-explore__tab");
    const $products = $section.find(".cs-product__item");

    $tabs.on("click", function () {
      const $this = $(this);
      const filter = $this.data("filter");

      $tabs.removeClass("active");
      $this.addClass("active");

      $products.stop(true, true).each(function () {
        const $product = $(this);
        const type = $product.data("type");

        $product.css(
          "display",
          filter === "all" || type === filter ? "block" : "none",
        );
      });
    });
  });
  // Collection Explore Tab - End

  // Collection Video - Start
  $(".collection-video").each(function () {
    const $wrapper = $(this);
    const $video = $wrapper.find(".collection-video__video");
    const $playButton = $wrapper.find(".collection-video__play");

    $playButton.on("click", function () {
      $video.attr("controls", true);
      $video[0].play();

      $(this).addClass("is-hidden");
    });

    $video.on("ended", function () {
      $playButton.removeClass("is-hidden");
      $video.attr("controls", false);
    });
  });
  // Collection Video - End

  // Chair Options - Start
  const $chairOptions = $(".build-chair__option");
  const $annotations = $(".build-chair__annotation");
  const $buildChairColors = $(".build-chair__color");
  const $chairImage = $(".build-chair__image");
  const $indicator = $(".build-chair__color-indicator");

  const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

  function activeChairOption($option) {
    const id = $option.data("id");

    $chairOptions.removeClass("active");
    $option.addClass("active");

    $annotations.removeClass("active");
    $annotations.filter(`[data-id="${id}"]`).addClass("active");
  }

  function moveIndicator($color) {
    if (!$color.length || !$indicator.length) return;

    $indicator.css(
      "transform",
      `translate(${$color.position().left - 2.2}px, -50%)`,
    );
  }

  $chairOptions.on("mouseenter", function () {
    if (isDesktop()) {
      activeChairOption($(this));
    }
  });

  $chairOptions.on("click", function () {
    if (!isDesktop()) {
      activeChairOption($(this));
    }
  });

  $buildChairColors.on("click", function () {
    const $this = $(this);

    $buildChairColors.removeClass("active");
    $this.addClass("active");

    $chairImage.attr("src", $this.data("image"));

    moveIndicator($this);
  });

  moveIndicator($buildChairColors.filter(".active").first());

  $(window).on("resize", function () {
    moveIndicator($buildChairColors.filter(".active").first());
  });
  // Chair Options - End

  // Typing Text - Start
  $(".typing-fade-wrap").each(function () {
    const $container = $(this);
    const $typingText = $container.find("p, .typing-fade");

    if (!$typingText.length) return;

    const activeColor = $container.data("color") || "#000000";
    const fadeColor = $container.data("fade-color") || "#D9D9D9";

    let totalLetters = 0;

    $typingText.each(function () {
      const $el = $(this);

      const text = $el.text().replace(/\s+/g, " ").trim();

      $el.empty();

      [...text].forEach(function (char) {
        $("<span>", {
          text: char,
        })
          .css("color", fadeColor)
          .appendTo($el);

        totalLetters++;
      });
    });

    const $letters = $container.find("p span, .typing-fade span");

    function updateTypingByScroll() {
      const rect = $container[0].getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight * 0.8;
      const end = windowHeight * 0.2;

      let progress = (start - rect.top) / (start - end);

      progress = Math.max(0, Math.min(1, progress));

      const activeCount = Math.floor(progress * totalLetters);

      $letters.each(function (index) {
        $(this).css("color", index < activeCount ? activeColor : fadeColor);
      });
    }

    updateTypingByScroll();

    $(window).on("scroll", updateTypingByScroll);
  });
  // Typing Text - End
});
