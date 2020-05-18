$(function () {
	$('.carusel').slick({
		dots: true,
		infinite: false,
		autoplay: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>'
	});

	// Menu opener hamburger
	$('.bar').click(function () {
		$('.menu-collapse').toggleClass('d-none').css('order', '1');
		$('.menu').toggleClass('menu-opened');
	});
	//Bar class
	$('.bar').click(function () {
		$('.bar').toggleClass('bar__active');
	});
	//Bar class

	// Smooth scroll and pageup
	$(window).scroll(function () {
		if ($(this).scrollTop() > 700) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});
	// Smooth scroll and pageup
	//scrollTop animate
	$('a[href="#up"]').click(function () {
		$('html, body').animate({
				scrollTop: 0
			},
			'slow'
		);
		return false;
	});
	//scrollTop animate

	//Call form
	$('[data-modal=call]').click(function () {
		$('.overlay, #call').fadeIn('slow');
	});
	$('.call__close').on('click', function () {
		$('.overlay, #call').fadeOut('slow');
	});
	//Call form

	// Кастомная Я.Карта
	ymaps.ready(init);
	var myMap, myPlacemark;

	function init() {
		myMap = new ymaps.Map('map', {
			center: [46.47412857, 30.7460085],
			zoom: 15
		});

		myPlacemark = new ymaps.Placemark([46.47412857, 30.7460085], {});

		myMap.geoObjects.add(myPlacemark);
	}
	// Кастомная Я.Карта

	AOS.init();

	// паралакс фона
	if ($(window).width() > 960) {
		// Кешируем объект окна
		$window = $(window);

		$('[data-type="background"]').each(function () {
			var $bgobj = $(this); // Назначаем объект

			$(window).scroll(function () {

				// Прокручиваем фон со скоростью var.
				// Значение yPos отрицательное, так как прокручивание осуществляется вверх!
				var yPos = -($window.scrollTop() / $bgobj.data('speed'));

				// Размещаем все вместе в конечной точке
				var coords = '50% ' + yPos + 'px';

				// Смещаем фон
				$bgobj.css({
					backgroundPosition: coords
				});

			});
		});
	}
	// паралакс фона
	// Preloader
	var $preloader = $('#page-preloader'),
		$spinner = $preloader.find('.spinner');
	$spinner.fadeOut();
	$preloader.delay(350).fadeOut('slow');
	// Preloader
	// плавное перемещение страницы к нужному блоку
	$('a[href*="#"]').on('click', function (e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 600, 'linear');
	});

	function createCookie(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		} else var expires = "";
		document.cookie = name + "=" + value + expires + "; path=/";
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}

	function eraseCookie(name) {
		createCookie(name, "", -1);
	}


	$('ul.navigation-area__list').each(function (i) {
		var cookie = readCookie('tabCookie' + i);
		if (cookie) {
			$(this).find('li').removeClass('active').eq(cookie).addClass('active')
				.closest('div.row').find('p.second-area__text').removeClass('active').eq(cookie).addClass('active');
		}
	});

	$('ul.navigation-area__list').on('click', 'li:not(.active)', function () {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('div.row').find('p.second-area__text').removeClass('active').eq($(this).index()).addClass('active');
		var ulIndex = $('ul.navigation-area__list').index($(this).parents('ul.navigation-area__list'));
		eraseCookie('tabCookie' + ulIndex);
		createCookie('tabCookie' + ulIndex, $(this).index(), 365);
	});


});