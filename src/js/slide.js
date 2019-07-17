export default function() {
	$('body').addClass('home-page');
	var homeSlide = new HomeSlide();
	HomeSwiper();

	return homeSlide;
}
// mouse scroll direction;
var SCROLLDOWN = 'mouse scrolling down';
var SCROLLUP = 'mouse scroll up';
var SCROLLSTILL = 'mouse not scroll';

function HomeSlide() {
	this.init();
	this.initEvent();
}

HomeSlide.prototype.init = function() {
	var _this = this;
	_this.$slideContainer = $('.js-home-page');
	_this.$slidesWrapper = _this.$slideContainer.find('.js-home-wrapper');
	_this._options = {
		scrollThreshold: 7,
		wheelDelta: 0,
		duration: 1.8
	};

	_this.isScrollEventOn = false;

	_this.animating = false;
	_this.menuIsOpen = false;
	_this.current = 0;
	_this.$slides = _this.$slideContainer.find('.home-slide');
	_this.slideHeight = _this.$slidesWrapper.outerHeight() / _this.$slides.length;

	window.scrollTo(0, 0);

	_this.$slides[0].classList.add('slide-active');
	_this.$slides[0].classList.add('run-fx');

}

HomeSlide.prototype.initEvent = function() {
	var _this = this;
	_this._onScroll = this._onScroll.bind(this);
	_this.resize();
	// $(window).on('DOMMouseScroll mousewheel', this._onScroll);
	$(window).on('resize', function() {
		_this.resize();
	})
}

HomeSlide.prototype._onScroll = function(e) {
	var _this = this;

	if(_this.animating) {
		return;
	}
	if(_this.menuIsOpen) {
		return;
	}

	var _delta = _this._options.wheelDelta;
	var _scrollThreshold = _this._options.wheelDelta;

	this.scrollDirection = SCROLLSTILL;

	if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {
		_delta--;
		(Math.abs(_delta) >= _scrollThreshold) && (_this.scrollDirection = SCROLLUP, _this.prevSlide());
	} else {
		_delta++;
		(_delta >= _scrollThreshold) && (_this.scrollDirection = SCROLLDOWN, _this.nextSlide());
	}
}

HomeSlide.prototype.prevSlide = function() {
	var _this = this;
	
	if(_this.current > 0) {
		_this.animating = true;
		setTimeout(() => {
			_this.$slides[_this.current - 1].classList.add('run-fx');
		}, 1300);
		
		TweenMax.to(_this.$slidesWrapper[0], 2, {
			y: -(_this.current - 1) * _this.slideHeight,
			ease: Power4.easeInOut,
			onComplete: function() {

				$(_this.$slides[_this.current - 1]).siblings().removeClass('run-fx');
				// _this.$slides[_this.current - 1].addClass('run-fx');
				_this.$slides.removeClass('slide-active');
				_this.$slides[_this.current - 1].classList.add('slide-active');
				_this.current--;
				_this.animating = false;
			}

		})
		
	}
}
HomeSlide.prototype.nextSlide = function() {
	var _this = this;
	if(_this.current < _this.$slides.length - 1) {
		_this.animating = true;
		setTimeout(() => {
			_this.$slides[_this.current + 1].classList.add('run-fx');
		}, 1300);
		TweenMax.to(_this.$slidesWrapper[0], 2, {
			y: -(_this.current + 1) * _this.slideHeight,
			ease: Power4.easeInOut,
			onComplete: function() {
				_this.$slides.removeClass('slide-active');
				$(_this.$slides[_this.current + 1]).siblings().removeClass('run-fx');
				_this.$slides[_this.current + 1].classList.add('slide-active');
				_this.current++;
				_this.animating = false;
			}

		})
	}
}

HomeSlide.prototype.resetPosition = function() {
	var _this = this;
	TweenMax.to(_this.$slidesWrapper[0], 1, {
		y: 0,
		ease: Power4.easeInOut,
	});
	window.scrollTo(0, 0);
	_this.$slides[0].classList.add('slide-active');
	_this.$slides[0].classList.add('run-fx');
}

HomeSlide.prototype.resize = function() {
	var _this  = this;
	var width = $(window).width();
	if(width < 992 && _this.isScrollEventOn) {
		$(window).off('DOMMouseScroll mousewheel', this._onScroll);
		_this.current = 0;
		_this.isScrollEventOn = false;
		_this.resetPosition();

	} else if (width >= 992 && !_this.isScrollEventOn) {
		_this.isSmallScreen = false;
		$(window).on('DOMMouseScroll mousewheel', this._onScroll);
		_this.current = 0;
		_this.isScrollEventOn = true;
		_this.resetPosition();
	} else if (width >= 992) {
		_this.slideHeight = _this.$slidesWrapper.outerHeight() / _this.$slides.length;
		TweenMax.to(_this.$slidesWrapper[0], 2, {
			y: -(_this.current) * _this.slideHeight,
			ease: Power4.easeInOut,
			onComplete: function() {
			}

		})
	}
}
HomeSlide.prototype.scrollEventOn = function() {
	this.menuIsOpen = false;
}
HomeSlide.prototype.scrollEventOff = function() {
	this.menuIsOpen = true;
}

function HomeSwiper() {
	$('.home-page-swiper').each(function(index, el) {
		var $this = $(this);

		var id = 'home-page-swiper-' + index;
		var nextEl = 'home-page-nav-next-' + index;
		var prevEl = 'home-page-nav-prev-' + index;

		$this.attr('id', id);
		$this.find('.next').attr('id', nextEl);
		$this.find('.prev').attr('id', prevEl);

		new Swiper('#' + id, {
			slidesPerView: 1,
			speed: 800,
			navigation: {
				nextEl: '#' + nextEl,
				prevEl: '#' + prevEl
			}
		})
	})
}


// WEBPACK FOOTER //
// ./src/js/home.js