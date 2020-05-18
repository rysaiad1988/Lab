$(function () {

    // Menu opener hamburger
    $('.menu-open, .menu a').click(function () {
        $('.menu-collapse').toggleClass('d-none').css('order', '1');
        $('.menu').toggleClass('menu-opened');
    });


    // Preloader
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');

    // плавное перемещение страницы к нужному блоку
    $("a.go").click(function (e) {
        e.preventDefault();
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top;
        $("body,html").animate({scrollTop: destination }, 800);
    });

    // Таймер обратного отсчета
    var current_date = new Date();// текущая дата
        current_date.setDate(current_date.getDate())
        curDay = current_date.getDate(),
        curMonth = current_date.getMonth(),
        curYear = current_date.getFullYear();
        // curDay = 2,
        // curMonth = 4,
        // curYear = 2018;

    $('#counter1').countMe(curYear, curMonth, curDay+4, '#counter1');

    // Параллакс от скролла
    $(window).bind('scroll',function(e){
        parallaxScroll();
    });
    function parallaxScroll(){
        var scrolled = $(window).scrollTop();
        $('.boy').css('top',(0-(scrolled*0.75))+'px');
    }

    // Параллакс от движения мыши
    if ($(window).width() > 960)
    {
        $('body').parallax({
            'elements': [
                {
                    'selector': '.circle',
                    'properties': {
                        'x': {
                            'right': {
                                'initial': 0,
                                'multiplier': 0.04,
                                'unit': 'px',
                                'invert': false
                            }
                        },
                        'y': {
                            'top': {
                                'initial': 0,
                                'multiplier': 0.1,
                                'unit': 'px',
                                'invert': true
                            }
                        }
                    }
                }
            ]
        });
    }

    // Анимация

    $(window).scroll(function() {
        $('.circle').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+550) {
                $(this).addClass("fadeInRight");
            }
        });
        $('.section-title, .about-finish, .timer').each(function(){
            var imagePos = $(this).offset().top;

            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow+550) {
                $(this).addClass("fadeInLeft");
            }
        });
    });

    // Fixed navigation

    $(window).scroll(function() {
        if ($(this).scrollTop() > 700){  
            $('nav').addClass("sticky");
        }
        else{
            $('nav').removeClass("sticky");
        }
    });

    // Всплывающее окно

    $('.parallax-btn').click(function (e) {
        e.preventDefault();
        $('#exampleModal').arcticmodal();
    });

    // Большой слайдер
    
    $('.big-slider').slick({
        dots: true,
        infinite: false,
        autoplay: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
    });

    // Большой слайдер
    
    $('.car-slider').slick({
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-arrow-alt-circle-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-arrow-alt-circle-right"></i></button>',
        responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        },   
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            arrows: false
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });

    // Кастомная Я.Карта

    ymaps.ready(init);
        var myMap, 
            myPlacemark;

        function init(){ 
            myMap = new ymaps.Map("map", {
                center: [46.47412857, 30.74600850],
                zoom: 7
            }); 
            
            myPlacemark = new ymaps.Placemark([46.47412857, 30.74600850], {
                hintContent: 'Москва!',
                balloonContent: 'Столица России'
            });
            
            myMap.geoObjects.add(myPlacemark);
        }
    
});