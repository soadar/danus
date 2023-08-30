$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 20,
    center: true,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        620: {
            items: 2
        },
        768: {
            items: 2
        },
        920: {
            items: 2
        },
        1120: {
            items: 3
        },
        1500: {
            items: 3
        }
    }
})

var owl = $('.owl-carousel');

$('.play').on('click', function () {
    owl.trigger('play.owl.autoplay', [2500])
})
$('.stop').on('click', function () {
    owl.trigger('stop.owl.autoplay')
})