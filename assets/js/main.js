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

  $(".model-filter__toggle").on("click", function () {
    const $filter = $(this).closest(".model-filter");

    $filter.toggleClass("is-newest");

    if ($filter.hasClass("is-newest")) {
      console.log("Show Newest");
    } else {
      console.log("Show Popular");
    }
  });
});
$(function () {
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
});
