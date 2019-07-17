new WOW().init();


$(document).ready(function() {

	$('.nice-select__').niceSelect();
	new Swiper('.home-partner-swiper', {
		slidesPerView: 4,
		slidesPerGroup: 1,
		speed: 500,
		spaceBetween: 60,
		pagination: {
			el: '.home-partner-pagination',
			clickable: true
		},
		breakpoints: {
			767: {
				slidesPerView: 3
			},
			575: {
				slidesPerView: 2
			}
		}
	});

	$('.rangeSlider').each(function(index, el) {
		var $this = $(this);
		var rangeSliderId = 'rangeSlider-' + index;
		var min = parseInt($this.attr('min'), 10) || 0;
		var max = parseInt($this.attr('max'), 10) || 1000000;
		var step = parseInt($this.attr('step'), 10) || 1;

		$this.attr('id', rangeSliderId);
		var $instance = $('#' + rangeSliderId);

		$instance.slider({
			min: min,
			max: max,
			range: true,
			step: step,
			values: [min, max],
			create: function() {
				var start = parseInt($instance.siblings('.startVal').find('input').val(), 10) || min;
				var end = parseInt($instance.siblings('.endVal').find('input').val(), 10) || max;

				$instance.siblings('.startVal').find('.valueContainer').text(start);
				$instance.siblings('.endVal').find('.valueContainer').text(end);

				console.log(start, end);
				$instance.slider( "values", [ start, end ] );
			}
		})

		$instance.on('slidechange', function() {
			var values = $instance.slider("values");


			$instance.siblings('.startVal').find('input').val(values[0]);
			$instance.siblings('.endVal').find('input').val(values[1]);
			$instance.siblings('.startVal').find('.valueContainer').text(values[0]);
			$instance.siblings('.endVal').find('.valueContainer').text(values[1]);
		})
	})


	$(document).on('click', '.dropdown .dropdown-menu', function (e) {
	  e.stopPropagation();
	});


	var productThumbSwiper = new Swiper('.product-thumb-swiper', {
		slidesPerView: 4,
		freeMode: true,
		watchSlidesVisibility: true,
	    watchSlidesProgress: true,
	    spaceBetween: 10,
	    on: {
	    	init: function() {
	    		var _this = this;
	    		setTimeout(function() {
	    			_this.update();
	    		}, 200)
	    	}
	    }
	});

	var productFullsizeSwiper = new Swiper('.product-fullsize-swiper', {
		slidesPerView: 1,
		thumbs: {
			swiper: productThumbSwiper
		}
	});

	$('.shopRegisterForm-bg').each(function() {
		$this = $(this);

		$this.width($(window).width() - $(this).offset().left);
	});




	$('.product-swiper').each(function(index, el) {
		var $this = $(this);
		var swiperId = 'product-swiper-' + index;

		var navigation = $this.attr('navigation');

		$this.attr('id', swiperId);

		new Swiper('#' + swiperId, {
			slidesPerView: 4,
			slidesPerGroup: 4,
			spaceBetween: 30,
			breakpoints: {
				1199: {
					slidesPerView: 3,
					slidesPerGroup: 3
				},
				991: {
					slidesPerView: 2,
					slidesPerGroup: 2
				},
				575: {
					slidesPerView: 1,
					slidesPerGroup: 1
				}
			},
			navigation: {
				nextEl: navigation + ' .next',
				prevEl: navigation + ' .prev',
			}
		});
	})

	new Swiper('.shop-hot-swiper', {
		slidesPerView: 3,
		slidesPerGroup: 3,
		speed: 700,
		spaceBetween: 30,
		navigation: {
			nextEl: '.shop-hot-navigation .next',
			prevEl: '.shop-hot-navigation .prev',
		},
		breakpoints: {
			991: {
				slidesPerView: 2,
				slidesPerGroup: 2
			},
			775: {
				slidesPerView: 1,
				slidesPerGroup: 1
			}
		}
	})

	new Swiper('.shop-news-swiper', {
		slidesPerView: 3,
		slidesPerGroup: 3,
		speed: 700,
		spaceBetween: 30,
		navigation: {
			nextEl: '.shop-news-navigation .next',
			prevEl: '.shop-news-navigation .prev',
		},
		breakpoints: {
			991: {
				slidesPerView: 2,
				slidesPerGroup: 2
			},
			775: {
				slidesPerView: 1,
				slidesPerGroup: 1
			}
		}
	})

	new Swiper('.product-banner-swiper', {
		slidesPerView: 1,
		slidesPerGroup: 1,
		speed: 700,
		pagination: {
			el: '.product-banner-pagination',
			clickable: true
		},
		on: {
			init: function() {
				var _this = this;

				setTimeout(function() {
					_this.update();
				}, 300)
			}
		}
	})

	var focus = false
	$('.js-side-form input').focus(function() {
		$('.js-side-form-wrap').addClass('active');
	})

	$('.js-side-form-trigger').on('click', function() {
		focus && $('.js-side-form')[0].submit();
	})

	$('body').on("click", "*", function (e) {
	    if ($(this).attr("id") == "sideForm" || $(this).closest('#sideForm').length > 0) {
	        e.stopPropagation();
	        focus = true;
	    } else {
	    	focus = false;
	    }
	});

	$('.js-side-form input').blur(function() {
		$('.js-side-form-wrap').removeClass('active');
	})

	$(window).resize(function() {
		$('.shopRegisterForm-bg').each(function() {
			$this = $(this);

			$this.width($(window).width() - $(this).offset().left);
		});
	});

})
