
import HomeSlide from './slide.js'
import BehindScene from './behind-the-scene.js'
import Utils from './utils.js'
window.currentSlide = 0;
$('body').addClass('loading');
$(document).ready(function() {

	Utils.isMobileBrowser() && $('html').addClass('isMobile');
	setTimeout(function() {
		$('.loading-css').addClass('active');
		TweenMax.to('.loading-bar', .5, {
			// opacity: 0,
			scale: 0
		})
		TweenMax.fromTo('.loading-bar-full', 1, {
			scale: 0
		}, {
			scale: 1,
			onComplete() {
				TweenMax.to('.loading-css .logo', .3, {
					opacity: 0, 
					scale: 0
				})

				TweenMax.to('.loading-css .bg-top, .loading-css .bg-bottom', 1, {
					height: 0,
					delay: .2,
					ease: Expo.easeOut,
					onComplete() {
						TweenMax.set('.loading-css', {
							display: 'none'
						})
					}
				})
			}
		})
		$('body').removeClass('loading');
		
	}, 2000)

	$('.home-slider')[0] && HomeSlide();

	BehindScene();

	var controller = new ScrollMagic.Controller();

	$('.js-fx').each(function( index, el) {
		var id = "fx-" + index;

		var $this = $(this);
		$this.attr('id', id);


		var tween = TweenMax.fromTo("#" + id + " .js-fx-target", 1, {
			y: 200,
			opacity: 0
		}, {
			opacity: 1,
			y: 0
		})

		var scene = new ScrollMagic.Scene({triggerElement: "#" + id, triggerHook: 1})
					.setTween(tween)
					// .addIndicators() // add indicators (requires plugin)
					.addTo(controller);


		var tween2 = TweenMax.fromTo("#" + id + " .js-fx-target-2", 1, {
			y: 200,
			opacity: 0
		}, {
			opacity: 1,
			y: 0
		})

		var scene = new ScrollMagic.Scene({triggerElement: "#" + id, triggerHook: 1})
					.setTween(tween2)
					// .addIndicators() // add indicators (requires plugin)
					.addTo(controller);
	})

	
	var tween = TweenMax.staggerFrom(".text-fx-block", .7, {
			y: 80,
			opacity: 0
		}, .2)

	var scene = new ScrollMagic.Scene({triggerElement: "#footer", triggerHook: .7})
				.setTween(tween)
				// .addIndicators() // add indicators (requires plugin)
				.addTo(controller);



	$('.js-to-top').click(function() {
		$('html, body').stop().animate({scrollTop:0}, 500, 'swing', function() { 
		   // alert("Finished animating");s
		});
	})

	$('.js-search-toggle').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		var searchContainer = $(this).closest('.search-toggle');

		if(searchContainer.hasClass('open')) {
			searchContainer.removeClass('open');
		} else {
			searchContainer.addClass('open');
			setTimeout(() => {searchContainer.find('input').focus()}, 300);
		}
	})

	$('.site-header').on('mouseleave', function() {
		var searchContainer = $('.search-toggle');

			searchContainer.removeClass('open');
		
	});

	setTimeout(function() {
		$(window).resize();
	}, 2000);
})