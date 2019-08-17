export default(function() {

	$('.site-header').addClass('_black');
	$('body').addClass('behind-the-scene');

	$('.js-fx-target').on('mouseenter', function() {

		$(this).addClass('hover');
		$(this).find('video')[0].play();
	});
	$('.js-fx-target').on('mouseleave', function() {

		$(this).removeClass('hover');
		$(this).find('video')[0].pause();
	});

	$('.js-fx-target').click(function() {

		var videoUrl = $(this).attr('video-url');

		$(this).find('iframe').attr('src', videoUrl);


		$('#behind-scene-modal').modal('show');


	});

	$('#behind-scene-modal').on('hide.bs.modal', function() {
		$(this).find('iframe').attr('src', '');
	});

	$('.js-about').click(function() {
		$('html, body').animate({
	        scrollTop: $("#footer").offset().top
	    }, 2000);
	})
	
})