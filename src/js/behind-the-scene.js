function parseVideo (url) {
    // - Supported YouTube URL formats:
    //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
    //   - http://youtu.be/My2FRPA3Gf8
    //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
    // - Supported Vimeo URL formats:
    //   - http://vimeo.com/25451551
    //   - http://player.vimeo.com/video/25451551
    // - Also supports relative URLs:
    //   - //player.vimeo.com/video/25451551

    url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

    if (RegExp.$3.indexOf('youtu') > -1) {
        var type = 'youtube';
    } else if (RegExp.$3.indexOf('vimeo') > -1) {
        var type = 'vimeo';
    }

    return {
        type: type,
        id: RegExp.$6
    };
}
function createVideo (url) {
    // Returns an iframe of the video with the specified URL.
    var videoObj = parseVideo(url);
    var url = '';
    if (videoObj.type == 'youtube') {
        url = 'https://www.youtube.com/embed/' + videoObj.id;
    } else if (videoObj.type == 'vimeo') {
        url = 'https://player.vimeo.com/video/' + videoObj.id;
    }
    return url;
}
export default(function() {

	$('.site-header').addClass('_black');
	$('body').addClass('behind-the-scene');

	// $('.js-fx-target').on('mouseenter', function() {

	// 	$(this).addClass('hover');
	// 	$(this).find('video')[0].play();
	// });
	// $('.js-fx-target').on('mouseleave', function() {

	// 	$(this).removeClass('hover');
	// 	$(this).find('video')[0].pause();
	// });

	$('.js-fx-target-2').click(function() {

		var videoUrl = $(this).attr('video-url');
        // var win = window.open(videoUrl, '_blank');
        // win.focus();
		$('#behind-scene-modal').find('iframe').attr('src', createVideo(videoUrl));


		$('#behind-scene-modal').modal('show');


	});

    $('.js-video-link').click(function() {

        var videoUrl = $(this).attr('video-url');
        var win = window.open(videoUrl, '_blank');
        win.focus();
        // $('#behind-scene-modal').find('iframe').attr('src', createVideo(videoUrl));


        // $('#behind-scene-modal').modal('show');


    });
	$('#behind-scene-modal').on('hide.bs.modal', function() {
		$(this).find('iframe').attr('src', '');
	});

	// $('.js-about').click(function() {
	// 	$('html, body').animate({
	//         scrollTop: $("#footer").offset().top
	//     }, 2000);
	// })
	
})