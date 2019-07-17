

$(document).ready(function() {

	$('.niceSelect__ select').niceSelect();

	 $('#datetimepicker1').datetimepicker();

	new Swiper('.page-banner-swiper', {
		slidesPerView: 1,
		speed: 800,
		autoplay: {
			delay: 6000
		},
		navigation: {
			nextEl: '.page-banner-nav.next',
			prevEl: '.page-banner-nav.prev',
		}
	});


	$('#appointment-date').datetimepicker({
		format: 'DD-MM-YYYY'
	});
	$('#appointment-time').datetimepicker({
		format: 'LT'
	});


	$('.date-component').each(function() {
		var $date_component = $(this);
		$date_component.on('change', 'input', function() {
			var value = $(this).val();
			console.log(value);
			if(value == null || value == "") {
				$date_component.removeClass('selected');
			} else {
				$date_component.addClass('selected');
			}
		});
	})


	$('.date-component')[0] && checkDateSelected($('.date-component'));
	$('.date-component').click(function() {
		var $date_component = $(this);

		checkDateSelected($date_component);
		
	});

	function checkDateSelected($date_component) {

		var value = $date_component.find('input').val();

		if(value == null || value == "") {
			$date_component.removeClass('selected');
		} else {
			$date_component.addClass('selected');
		}

	}

})