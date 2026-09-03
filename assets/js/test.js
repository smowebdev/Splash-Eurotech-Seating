$(function () {
  $color1 = $(".color-option");
  initColorPicker({
    $colors: $color1,
    $indicator: $(".color-options .cs-color-indicator"),
  });
  const $configurator = $("#chairConfigurator");
  const $fullscreenBtn = $("#fullscreenBtn");
  const model = $("#chairModel")[0];

  $fullscreenBtn.on("click", function () {
    $configurator.toggleClass("is-fullscreen");

    const active = $configurator.hasClass("is-fullscreen");

    $(this).html(
      active
        ? '<span class="fullscreen-icon">⛶</span> Exit Fullscreen'
        : '<span class="fullscreen-icon">⛶</span> Fullscreen',
    );
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

  $(".chair-type").on("click", function () {
    $(".chair-type").removeClass("active");

    $(this).addClass("active");
  });

  $(".color-option").on("click", function () {
    $(".color-option").removeClass("active");
    $(this).addClass("active");

    const url = $(this).data("url");
    const model = $("#chairModel")[0];

    model.src = url;
  });
});
