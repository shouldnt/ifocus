export default function() {
	
	var homeSlide = new HomeSlide();

	var player = new VideoFrame();

	$('.js-fx-target').on('mouseenter', function() {
		window.currentSlide = parseInt($(this).attr('data-index'), 10) - 1;
	});
	$('.js-fx-target').on('click', function() {
		$('.js-slide-toggle').trigger('click');
	})

	return homeSlide; 
}
// mouse scroll direction;
var SCROLLDOWN = 'mouse scrolling down';
var SCROLLUP = 'mouse scroll up';
var SCROLLSTILL = 'mouse not scroll';

function HomeSlide() {
	this.init();
	this.initEvent();
	this.canvas();
}

HomeSlide.prototype.init = function() {

	window.scrollTo(0, 0);
	$('body').addClass('home-page');

	var _this = this;
	_this.$slideContainer = $('.js-home-slider');
	// _this.$slidesWrapper = _this.$slideContainer.find('.js-home-wrapper');
	_this._options = {
		scrollThreshold: 7,
		wheelDelta: 0,
		duration: 1.8
	};

	_this.isScrollEventOn = false;

	_this.isSlideActive = true;
	_this.animating = false;
	_this.scrollOff = false;
	_this.current = 0;
	_this.$slides = _this.$slideContainer.find('.home-slide-item');
	_this.$images = _this.$slides.find('img.bg-img');
	_this.videoManager = new VideoBg();
	_this.videoManager.show(_this.current);
	_this.textureArr = [];




	TweenMax.set(_this.$slides, {
		autoAlpha: 0
	})
	TweenMax.set(_this.$slides[0], {
		autoAlpha: 1
	})

	$(_this.$slides[0]).addClass('slide-active');

}

HomeSlide.prototype.initEvent = function() {
	var _this = this;
	_this._onScroll = this._onScroll.bind(this);
	$(window).on('DOMMouseScroll mousewheel', this._onScroll);

	$('.home-slide-nav .nav-prev').click(function() {
		_this.prevSlide();
	});
	$('.home-slide-nav .nav-next').click(function() {
		_this.nextSlide();
	});

	$(document).on('PLAYER_OPEN', function() {
	 	_this.scrollOff = true;
	})
	$(document).on('PLAYER_CLOSE', function() {
	 	_this.scrollOff = false;
	})
	
	$(document).on("HIDE_SLIDE", function() {
		$('body').removeClass('home-page');
		$('.site-header').addClass('_black')
		_this.isSlideActive = false;
		_this.animateOut();
	});
	$(document).on("SHOW_SLIDE", function() {
		$('body').addClass('home-page');
		$('.site-header').removeClass('_black')
		_this.isSlideActive = true;
		_this.animateIn(window.currentSlide);
	})

	$('.js-slide-toggle').click(function() {
		if(_this.animating) return;
		if(_this.isSlideActive) {
			$(this).addClass('active');
			$(document).trigger("HIDE_SLIDE");
		} else {
			$(this).removeClass('active');
			$(document).trigger("SHOW_SLIDE", );
		}
	})

	$('.js-logo').click(function(e) {
		e.preventDefault();
		if(!_this.isSlideActive) {
			$('.js-slide-toggle').trigger('click');
		}
	})

	$('.js-about').click(function() {
		if(_this.isSlideActive) {
			$('.js-slide-toggle').trigger('click');
		}
		$('html, body').animate({
            scrollTop: $("#footer").offset().top
        }, 2000);
	})
}

HomeSlide.prototype._onScroll = function(e) {
	var _this = this;

	if(_this.animating) {
		return;
	}
	if(_this.scrollOff) {
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


	if(_this.animating) {
		return;
	}

	var current = _this.current;
	var prev = _this.current > 0 ? _this.current - 1 : _this.$slides.length - 1;

	var currentSlideEl = _this.$slides[current];
	var $currentFxTargets = $(currentSlideEl).find('.fx-target');
	var $currentFxTargetsScale = $(currentSlideEl).find('.fx-target-scale');


	var prevSlideEl = _this.$slides[prev];
	var $prevFxTargets = $(prevSlideEl).find('.fx-target');
	var $prevFxTargetsScale = $(prevSlideEl).find('.fx-target-scale');


	// nav content update
	var nextNavContent = currentSlideEl.querySelector('.nav-content').innerHTML;
	var prevNavContent = prev - 1 < 0 ?
		_this.$slides[_this.$slides.length - 1].querySelector('.nav-content').innerHTML
		:
		_this.$slides[prev - 1 ].querySelector('.nav-content').innerHTML;

	
	if(true) {
		_this.animating = true;


		TweenMax.killTweensOf(_this.obj);



		TweenMax.set(_this.obj, {
			trans: 1
		});

		let ctn = 0;
		for(let i = 0; i < 2; i++) {
			let index = i;

			let img = new Image();
			img.onload = function(_index, _img){
				let texture = _this.textureArr[_index];
				texture.image = _img;
				texture.needsUpdate = true;
				
				ctn++;
				if(ctn = 2) {

					_this.mat.uniforms.uTexture0.value = _this.textureArr[0];
					_this.mat.uniforms.uTexture1.value = _this.textureArr[1];
					TweenMax.to(_this.obj, 2.5, {
						trans: 0, 
						delay: .5,
						onUpdate() {
							_this.mat.uniforms.uTrans.value = _this.obj.trans;
							_this.renderer.render(_this.scene, _this.camera);
						}
					});
				}
			}.bind(this, index, img);
			
			// img.crossOrigin = "Anonymous";

			i == 1 && (img.src = currentSlideEl.querySelector('.bg-img').getAttribute('src'));
			i == 0 && (img.src = prevSlideEl.querySelector('.bg-img').getAttribute('src'));
		}
		

		TweenMax.set($currentFxTargets, {
			transformOrigin: "bottom left",
		});

		currentSlideEl.classList.remove('slide-active');
		TweenMax.fromTo($currentFxTargetsScale, .7, {
			scale: 1,
			opacity: 1
		}, {
			scale: .3,
			opacity: 0,
			delay: .5,
			ease:  Back.easeIn
		})
		TweenMax.fromTo($currentFxTargets, 1.2,{
			y: "0%",
			skewY: "-0deg",
			opacity: 1
		}, {
			y: '150%',
			skewY: "-10deg",
			opacity: 0,
			ease: Expo.easeIn,
			onComplete () {
				TweenMax.set(currentSlideEl, {
					autoAlpha: 0
				})

				prevSlideEl.classList.add('slide-active');
				TweenMax.set(prevSlideEl, {
					autoAlpha: 1
				});

				TweenMax.fromTo($prevFxTargetsScale, 1, {
					scale: .3,
					opacity: 0
				}, {
					scale: 1,
					opacity: 1,
					ease:  Back.easeOut
				})
				TweenMax.set($prevFxTargets, {
					transformOrigin: "bottom left",
				});

				TweenMax.fromTo($prevFxTargets, 2,{
					y: "-150%",
					skewY: "-10deg",
					opacity: 0,
				}, {
					y: "0%",
					skewY: "-0deg",
					opacity: 1,
					ease: Expo.easeOut,
					onComplete() {
						_this.animating = false;
						_this.current = prev;
					}
				})
			}
		});

		// nav update
		TweenMax.to('.home-slide-nav > *', .5, {
			transformOrigin: "bottom left",
			scaleY: 0,
			delay: .5,
			onComplete() {
				$('.home-slide-nav .nav-prev').empty().append(prevNavContent);
				$('.home-slide-nav .nav-next').empty().append(nextNavContent);

				TweenMax.to('.home-slide-nav > *', .5, {
					transformOrigin: "bottom left",
					scaleY: 1,
					delay: .2
				});
			}
		})
		
		
		
	}
}


HomeSlide.prototype.nextSlide = function() {
	var _this = this;

	if(_this.animating) {
		return;
	}

	var current = _this.current;
	var next = current < _this.$slides.length - 1 ? _this.current + 1 : 0;

	var currentSlideEl = _this.$slides[current];
	var $currentFxTargets = $(currentSlideEl).find('.fx-target');
	var $currentFxTargetsScale = $(currentSlideEl).find('.fx-target-scale');

	var nextSlideEl = _this.$slides[next];
	var $nextFxTargets = $(nextSlideEl).find('.fx-target');
	var $nextFxTargetsScale = $(nextSlideEl).find('.fx-target-scale');


	// nav content update
	var prevNavContent = currentSlideEl.querySelector('.nav-content').innerHTML;
	var nextNavContent = next + 1 >= _this.$slides.length ?
		_this.$slides[0].querySelector('.nav-content').innerHTML
		:
		_this.$slides[next + 1].querySelector('.nav-content').innerHTML;


	if(true) {

		TweenMax.killTweensOf(_this.obj);
		TweenMax.set(_this.obj, {
			trans: 0
		})

		let ctn = 0;
		for(let i = 0; i < 2; i++) {
			let index = i;

			let img = new Image();
			img.onload = function(_index, _img){
				let texture = _this.textureArr[_index];
				texture.image = _img;
				texture.needsUpdate = true;
				
				ctn++;
				if(ctn = 2) {

					_this.mat.uniforms.uTexture0.value = _this.textureArr[0];
					_this.mat.uniforms.uTexture1.value = _this.textureArr[1];
					TweenMax.to(_this.obj, 2.5, {
						trans: 1, 
						delay: .5,
						onUpdate() {
							_this.mat.uniforms.uTrans.value = _this.obj.trans;
							_this.renderer.render(_this.scene, _this.camera);
						}
					});
				}
			}.bind(this, index, img);
			
			// img.crossOrigin = "Anonymous";

			i == 0 && (img.src = currentSlideEl.querySelector('.bg-img').getAttribute('src'));
			i == 1 && (img.src = nextSlideEl.querySelector('.bg-img').getAttribute('src'));
		}
		


		// let img2 = new Image();
		// img2.src = currentSlideEl.querySelector('.bg-img').getAttribute('src');
		// _this.textureArr[0].img = img2;
		// _this.textureArr[0].needsUpdate = true;

		// console.log(_this.textureArr);


		


		_this.animating = true;

		_this.videoManager.hide(_this.current);
		_this.current + 1 < _this.$slides.length ? this.videoManager.show(_this.current + 1) : this.videoManager.show(0);

		TweenMax.set($currentFxTargets, {
			transformOrigin: "bottom left",
		});

		currentSlideEl.classList.remove('slide-active');

		TweenMax.fromTo($currentFxTargetsScale, .7, {
			scale: 1,
			opacity: 1
		}, {
			scale: .3,
			opacity: 0,
			delay: .5,
			ease:  Back.easeIn
		})
		TweenMax.fromTo($currentFxTargets, 1.2,{
			y: "0%",
			skewY: "-0deg",
			delay: 0,
			opacity: 1
		}, {
			y: '-150%',
			skewY: "-10deg",
			opacity: 0,
			ease: Expo.easeIn,
			onComplete () {
				TweenMax.set(currentSlideEl, {
					autoAlpha: 0
				})

				nextSlideEl.classList.add('slide-active');
				TweenMax.set(nextSlideEl, {
					autoAlpha: 1
				});

				TweenMax.fromTo($nextFxTargetsScale, 1, {
					scale: .3,
					opacity: 0
				}, {
					scale: 1,
					opacity: 1,
					ease:  Back.easeOut
				})
				TweenMax.set($nextFxTargets, {
					transformOrigin: "bottom left",
				});

				TweenMax.fromTo($nextFxTargets, 2,{
					y: "150%",
					skewY: "-10deg",
					opacity: 0,
				}, {
					y: "0%",
					skewY: "-0deg",
					opacity: 1,
					ease: Expo.easeOut,
					onComplete() {
						_this.animating = false;
						_this.current = next;
					}
				})
			}
		});


		// nav update
		TweenMax.to('.home-slide-nav > *', .5, {
			transformOrigin: "bottom left",
			scaleY: 0,
			delay: .5,
			onComplete() {
				$('.home-slide-nav .nav-prev').empty().append(prevNavContent);
				$('.home-slide-nav .nav-next').empty().append(nextNavContent);

				TweenMax.to('.home-slide-nav > *', .5, {
					transformOrigin: "bottom left",
					scaleY: 1,
					delay: .2
				});
			}
		})
		

		
	}
}


HomeSlide.prototype.animateOut = function() {
	var _this = this;

	_this.animating = true;
	var current = _this.current;
	window.currentSlide = _this.current;

	_this.mat.uniforms.uTexture0.value = _this.textureArr[1];
	_this.mat.uniforms.uTexture1.value = _this.textureArr[1];

	var currentSlideEl = _this.$slides[current];
	var $currentFxTargets = $(currentSlideEl).find('.fx-target');
	var $currentFxTargetsScale = $(currentSlideEl).find('.fx-target-scale');


	TweenMax.set($currentFxTargets, {
		transformOrigin: "bottom left",
	});

	currentSlideEl.classList.remove('slide-active');
	TweenMax.fromTo($currentFxTargetsScale, .7, {
		scale: 1,
		opacity: 1
	}, {
		scale: .3,
		opacity: 0,
		delay: .5,
		ease:  Back.easeIn
	})
	TweenMax.fromTo($currentFxTargets, 1.2,{
		y: "0%",
		skewY: "-0deg",
		opacity: 1
	}, {
		y: '150%',
		skewY: "-10deg",
		opacity: 0,
		ease: Expo.easeIn,
	});


	TweenMax.set(_this.obj, {
		trans: 1
	})
	let img = new Image();
	img.onload = function(_img){
		let texture = _this.textureArr[0];
		texture.image = _img;
		texture.needsUpdate = true;

		_this.mat.uniforms.uTexture0.value = _this.textureArr[0];
		_this.mat.uniforms.uTexture1.value = _this.textureArr[0];

		TweenMax.to(_this.obj, 2, {
			trans: 0,
			onUpdate() {
				_this.mat.uniforms.uTrans.value = _this.obj.trans;
				_this.renderer.render(_this.scene, _this.camera);
				_this.animating = false;
			}
		});
		
	}.bind(this, img);

	img.src = _this.$images[_this.current].getAttribute('src');
	
	

	TweenMax.to(_this.$slideContainer, 1, {
		opacity: 0,
		delay:.51,
		onComplete() {
			TweenMax.set(_this.$slideContainer, {
				autoAlpha: 0
			})
		}
	})
}

HomeSlide.prototype.animateIn = function(index) {

	var _this = this;

	_this.animating = true;
	var current = _this.current;

	var currentSlideEl = _this.$slides[current];
	currentSlideEl.classList.remove('slide-active');

	TweenMax.set(currentSlideEl, {
		autoAlpha: 0
	})
	TweenMax.to(_this.$slideContainer, 1, {
		autoAlpha: 1,
	})

	TweenMax.set(_this.obj, {
		trans: 0
	})
	window.scrollTo(0, 0);

	let img = new Image();
	img.onload = function(_img){
		let texture = _this.textureArr[0];
		texture.image = _img;
		texture.needsUpdate = true;

		_this.mat.uniforms.uTexture0.value = _this.textureArr[0];
		_this.mat.uniforms.uTexture1.value = _this.textureArr[0];

		TweenMax.to(_this.obj, 2, {
			trans: 1,
			onUpdate() {
				_this.mat.uniforms.uTrans.value = _this.obj.trans;
				_this.renderer.render(_this.scene, _this.camera);
			}
		});		
		
	}.bind(this, img);

	img.src = _this.$images[window.currentSlide].getAttribute('src');
	
	_this.current = window.currentSlide;
	var nextSlideEl = _this.$slides[window.currentSlide];
	var $nextFxTargets = $(nextSlideEl).find('.fx-target');
	var $nextFxTargetsScale = $(nextSlideEl).find('.fx-target-scale');

	nextSlideEl.classList.add('slide-active');
	TweenMax.set(nextSlideEl, {
		autoAlpha: 1
	});

	TweenMax.fromTo($nextFxTargetsScale, 1, {
		scale: .3,
		opacity: 0
	}, {
		scale: 1,
		opacity: 1,
		ease:  Back.easeOut
	})
	TweenMax.set($nextFxTargets, {
		transformOrigin: "bottom left",
	});

	TweenMax.fromTo($nextFxTargets, 2,{
		y: "150%",
		skewY: "-10deg",
		opacity: 0,
	}, {
		y: "0%",
		skewY: "-0deg",
		opacity: 1,
		ease: Expo.easeOut,
		onComplete() {
			_this.animating = false;
			
		}
	})

}


HomeSlide.prototype.resetPosition = function() {
	
}

HomeSlide.prototype.resize = function() {
	
}
HomeSlide.prototype.scrollEventOn = function() {
	this.scrollOff = false;
}
HomeSlide.prototype.scrollEventOff = function() {
	this.scrollOff = true;
}



HomeSlide.prototype.canvas = function() {

	var _this = this;

	const vertexSrc = `
	precision mediump float;

	attribute vec4 position;
	attribute vec2 uv;

	varying vec2 vUv;

	void main() {
		gl_Position = position;
		vUv = vec2( (position.x + 1.)/2., (-position.y + 1.)/2.);
	}
	`

	const fragmentSrc = `
	precision mediump float;

		uniform float uTrans;
		uniform sampler2D uTexture0;
		uniform sampler2D uTexture1;
		uniform sampler2D uDisp;

		varying vec2 vUv;

		float quarticInOut(float t) {
		  return t < 0.5
		    ? +8.0 * pow(t, 4.0)
		    : -8.0 * pow(t - 1.0, 4.0) + 1.0;
		}

		void main() {
			// https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/gl_FragCoord.xhtml
			
			vec4 disp = texture2D(uDisp, vec2(0., 0.5) + (vUv - vec2(0., 0.5)) * (0.2 + 0.8 * (1.0 - uTrans)) );
			float trans = clamp(1.6  * uTrans - disp.r * 0.4 - vUv.x * 0.2, 0.0, 1.0);
			trans = quarticInOut(trans);
			vec4 color0 = texture2D(uTexture0, vec2(0.5 - 0.3 * trans, 0.5) + (vUv - vec2(0.5)) * (1.0 - 0.2 * trans));
			vec4 color1 = texture2D(uTexture1, vec2(0.5 + sin( (1. - trans) * 0.1), 0.5 ) + (vUv - vec2(0.5)) * (0.9 + 0.1 * trans));


			gl_FragColor = mix(color0, color1 , trans);
		}
	`;

	// デモに使用する画像URL
	const assetUrls = [
		_this.$images[0].getAttribute('src'),
		_this.$images[0].getAttribute('src'),
		document.querySelector('.distor-img').getAttribute('src')
	];

	/**
	** 初期化開始
	*/

	// レンダラーの初期化
	_this.renderer = new THREE.WebGLRenderer();
	_this.canvas = _this.renderer.domElement;
	document.getElementById('homeSlide').appendChild( _this.canvas );

	_this.scene = new THREE.Scene();

	_this.obj = {trans: 0};

	var cnt = 0;

	// カメラの初期化
	_this.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 1, 1000  );
	_this.camera.position.z = 1;

	// テクスチャの初期化
	assetUrls.forEach( (url, index) =>{
		let img = new Image();
		
		let texture = new THREE.Texture();
		texture.flipY= false;
		_this.textureArr.push(texture);
		
		img.onload = function(_index, _img){
			let texture = _this.textureArr[_index];
			texture.image = _img;
			texture.needsUpdate = true;
			
			cnt++;
			if(cnt == 3) start();
		}.bind(this, index, img);
		
		img.crossOrigin = "Anonymous";
		img.src = url;
	})
	_this.mat = new THREE.RawShaderMaterial( {
		uniforms: {
			uTrans: { value: _this.obj.trans },
			uTexture0: {value: _this.textureArr[0]},
			uTexture1: {value: _this.textureArr[1]},
			uDisp: {value: _this.textureArr[2]},
		},
		vertexShader: vertexSrc,
		fragmentShader: fragmentSrc
	} );

	// let mat = _this.mat;

	_this.geo = new THREE.PlaneGeometry(2, 2);
	_this.mesh = new THREE.Mesh(_this.geo, _this.mat)
	_this.scene.add(_this.mesh);

	resize();

	function start(){
		loop();
	}

	function loop(){
		_this.mat.uniforms.uTrans.value = _this.obj.trans;
		_this.mat.uniforms.uTexture0.value = _this.textureArr[0];
		_this.mat.uniforms.uTexture1.value = _this.textureArr[1];
		_this.renderer.render(_this.scene, _this.camera);
		
		// requestAnimationFrame(loop);
	}

	function resize(){

		var imgRatio = 1280 / 689; 

		var size = coverSize(1280, 689, window.innerWidth, window.innerHeight);
		_this.renderer.setSize(size[0], size[1]);
	}

	window.addEventListener("resize", function() {
	    resize();
	});

}


function coverSize(imgWidth, imgHeight, containerWidth, containerHeight) {


	var originalRatios = {
	  	width: containerWidth / imgWidth,
	  	height: containerHeight / imgHeight
	};

	// formula for cover:
	var coverRatio = Math.max(originalRatios.width, originalRatios.height); 

	// result:
	var newImageWidth = imgWidth * coverRatio;
	var newImageHeight = imgHeight * coverRatio;

	return [newImageWidth, newImageHeight];
}



function VideoFrame() {
	this.init();
	this.initEvent();
}

VideoFrame.prototype.init = function() {
	var _this = this;

	_this.$container = $('#video-frame');
	_this.$bg = _this.$container.find('.js-bg');
	
	TweenMax.set(_this.$container, {
		autoAlpha: 0
	})
}

VideoFrame.prototype.initEvent = function() {
	var _this = this;

	var player = null;


	$('.js-start-player').click(function(e) {

		$(document).trigger('PLAYER_OPEN');
		e.preventDefault();

		var $el = $(this);

		_this.iframe = _this.$container.find('iframe')[0];


		var bound = $el[0].getBoundingClientRect();

		


		var videoUrl = $(this).attr('href');

		$(_this.iframe).attr('src', videoUrl);

		player = new Vimeo.Player(_this.iframe);
		

		Promise.all([player.getVideoWidth(), player.getVideoHeight()]).then(function(dimensions) {
		    var width = dimensions[0];
		    var height = dimensions[1];

		    var iframeHeight = $(_this.iframe).width() * height / width;
		    $(_this.iframe).height(iframeHeight);
		    
		});


		TweenMax.set(_this.$bg, {
			top: bound.y,
			left: bound.x
		})
		TweenMax.to(_this.$bg, 3, {
			scale: 20,
			ease: Expo.easeOut,
		})
		setTimeout(() => {
			$(_this.iframe).addClass('active');
			player.play();
		}, 500)

		TweenMax.set(_this.$container, {
			autoAlpha: 1
		})

		
		

		
	});

	$('.js-stop-player').click(function() {

		$(document).trigger('PLAYER_CLOSE');

		TweenMax.to(_this.$container, .5, {
			autoAlpha: 0, 
			delay: 0,
			onComplete() {
				player.destroy().then(function() {
					_this.$container.append('<iframe src="" frameborder="0"></iframe>');
				})

			}
		})

		TweenMax.to(_this.$bg, 1, {
			scale: 1,
			ease: Expo.easeOut,
			onComplete() {
				TweenMax.set(_this.$container, {
					autoAlpha: 0
				})
			}
		})

		TweenMax.to(_this.$container.find('iframe'), .7, {
			scale: 1.5,
			opacity: 0,
			ease: Expo.easeInOut
		})
		
	})



}

function VideoBg() {
	this.$videoContainer = $('.home-slide-item .bg-video');
	this.$videos = this.$videoContainer.find('video');

	this.coverSize = coverSize(16 , 9, $(window).width(), $(window).height());
	console.log(this.coverSize);

	this.$videoContainer.css({width: this.coverSize[0], height: this.coverSize[1]});
}
VideoBg.prototype.hide = function(index) {
	var _this = this;
	TweenMax.to(_this.$videos[index], .5, {
		opacity: 0,
		onComplete: function() {
			_this.$videos[index].pause();
		}
	})
}
VideoBg.prototype.show = function(index) {
	var _this = this;
	TweenMax.to(_this.$videos[index], .5, {
		opacity: 1,
		delay: 1.2,
		onComplete: function() {
			_this.$videos[index].play();
		}
	})
}
