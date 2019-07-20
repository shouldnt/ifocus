
import HomeSlide from './slide.js'
window.currentSlide = 0;

$(document).ready(function() {

	HomeSlide();

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

		var scene = new ScrollMagic.Scene({triggerElement: "#" + id})
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