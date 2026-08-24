$(function () {
    // Quick Navigation
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

    // Documents Library
    $('.documents-library__filter-toggle').on('click', function () {
        var $filter = $(this).closest('.documents-library__filter');
        var $body = $filter.find('.documents-library__filter-body');

        if ($filter.hasClass('is-open')) {
            $filter.removeClass('is-open');
            $body.slideUp(200);
        } else {
            $filter.addClass('is-open');
            $body.slideDown(200);
        }
    });

    // Featured Videos
    var $items = $('.featured-videos__item');

    $items.each(function () {
        var $item = $(this);
        var type = $item.data('video-type'); // "video" hoặc "iframe"
        var $play = $item.find('.featured-videos__play');
        var $media = type === 'iframe'
            ? $item.find('iframe')
            : $item.find('video');

        $play.on('click', function () {
            $items.not($item).each(function () {
                resetItem($(this));
            });

            $item.addClass('is-playing');

            if (type === 'iframe') {
                var src = $media.attr('data-src') || $media.attr('src');
                if (src.indexOf('autoplay=1') === -1) {
                    src += (src.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1';
                }
                $media.attr('src', src);
            } else {
                $media[0].play();
            }
        });

        if (type !== 'iframe') {
            $media.on('ended', function () {
                resetItem($item);
            });
        }
    });

    function resetItem($item) {
        $item.removeClass('is-playing');
        var type = $item.data('video-type');
        var $media = type === 'iframe'
            ? $item.find('iframe')
            : $item.find('video');

        if (type === 'iframe') {
            var baseSrc = $media.attr('src').split('?')[0];
            $media.attr('src', baseSrc);
        } else {
            $media[0].pause();
            $media[0].currentTime = 0;
        }
    }
});
