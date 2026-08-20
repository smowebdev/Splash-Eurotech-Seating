$(function () {
    var $header = $('.header-site');
    var $nav = $('.quick-nav');
    var $target = $('.dealer-finder');
    var headerHeight = $header.outerHeight() || 85;

    function toggleNav() {
        if (!$target.length) return;

        var targetTop = $target.offset().top;
        var targetBottom = targetTop + $target.outerHeight();
        var scrollTop = $(window).scrollTop();

        var reached = scrollTop + headerHeight >= targetTop;
        var passed = scrollTop + headerHeight >= targetBottom;

        if (reached && !passed) {
            $nav.addClass('is-visible');
        } else {
            $nav.removeClass('is-visible');
        }
    }

    $(window).on('scroll resize', toggleNav);
    toggleNav();
});