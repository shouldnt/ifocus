
import HomeSlide from './slide.js'
import BehindScene from './behind-the-scene.js'
window.currentSlide = 0;

$(document).ready(function() {

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
		
	}, 2000)

	$('.home-slider')[0] && HomeSlide();

	$('.behind-the-scene-page')[0] && BehindScene();

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

		var scene = new ScrollMagic.Scene({triggerElement: "#" + id, triggerHook: 0.7})
					.setTween(tween)
					// .addIndicators() // add indicators (requires plugin)
					.addTo(controller);
	})

	
	$('.text-fx-block').each(function( index, el) {
		var id = "fx-text-" + index;

		var $this = $(this);
		$this.attr('id', id);


		var tween = TweenMax.fromTo("#" + id + " .text-fx-target", .7, {
			y: 100,
			opacity: 0
		}, {
			opacity: 1,
			y: 0
		})

		var scene = new ScrollMagic.Scene({triggerElement: "#" + id, triggerHook: .7})
					.setTween(tween)
					// .addIndicators() // add indicators (requires plugin)
					.addTo(controller);
	})



	$('.js-to-top').click(function() {
		$('html, body').stop().animate({scrollTop:0}, 500, 'swing', function() { 
		   // alert("Finished animating");s
		});
	})
})