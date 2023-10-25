$(document).ready(function() {
  $(".responsive").slick({
    arrows:true,
    dots: true,
    infinite: false,
    mobileFirst: true,
    responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToScroll: 1,
                    slidesToShow: 1
                }
            }
        ],
    slidesToScroll: 4,
    slidesToShow: 4,
    speed: 500
  });
});