$(function () {
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

        if (filter === "all" || type === filter) {
          $product.fadeIn(250);
        } else {
          $product.fadeOut(250);
        }
      });
    });
  });
});
