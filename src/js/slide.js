export default function() {
	$('body').addClass('home-page');
	var homeSlide = new HomeSlide();

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
	var _this = this;
	_this.$slideContainer = $('.js-home-slider');
	// _this.$slidesWrapper = _this.$slideContainer.find('.js-home-wrapper');
	_this._options = {
		scrollThreshold: 7,
		wheelDelta: 0,
		duration: 1.8
	};

	_this.isScrollEventOn = false;

	_this.animating = false;
	_this.menuIsOpen = false;
	_this.current = 0;
	_this.$slides = _this.$slideContainer.find('.home-slide-item');
	_this.$images = _this.$slides.find('img.bg-img');

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
		TweenMax.to(_this.obj, 3, {
			trans: 0,
			delay: .5
		});

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
		TweenMax.to(_this.obj, 3, {
			trans: 1, 
			delay: .5
		});
		
		_this.animating = true;

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

HomeSlide.prototype.resetPosition = function() {
	
}

HomeSlide.prototype.resize = function() {
	
}
HomeSlide.prototype.scrollEventOn = function() {
	this.menuIsOpen = false;
}
HomeSlide.prototype.scrollEventOff = function() {
	this.menuIsOpen = true;
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
		_this.$images[1].getAttribute('src'),
		document.querySelector('.distor-img').getAttribute('src')
	];

	/**
	** 初期化開始
	*/

	// レンダラーの初期化
	let renderer = new THREE.WebGLRenderer();
	let canvas = renderer.domElement;
	document.getElementById('homeSlide').appendChild( canvas );

	let scene = new THREE.Scene();

	_this.obj = {trans: 0};

	let obj = _this.obj;

	var cnt = 0;

	let textureArr = _this.textureArr;

	// カメラの初期化
	let camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 1, 1000  );
	camera.position.z = 1;

	// テクスチャの初期化
	assetUrls.forEach( (url, index) =>{
		let img = new Image();
		
		let texture = new THREE.Texture();
		texture.flipY= false;
		textureArr.push(texture);
		
		img.onload = function(_index, _img){
			let texture = textureArr[_index];
			texture.image = _img;
			texture.needsUpdate = true;
			
			cnt++;
			if(cnt == 3) start();
		}.bind(this, index, img);
		
		img.crossOrigin = "Anonymous";
		img.src = url;
	})

	let mat = new THREE.RawShaderMaterial( {
		uniforms: {
			uTrans: { value: obj.trans },
			uTexture0: {value: textureArr[0]},
			uTexture1: {value: textureArr[1]},
			uDisp: {value: textureArr[2]},
		},
		vertexShader: vertexSrc,
		fragmentShader: fragmentSrc
	} );

	let geo = new THREE.PlaneGeometry(2, 2);
	let mesh = new THREE.Mesh(geo, mat)
	scene.add(mesh);

	resize();

	function start(){
		loop();
	}

	function loop(){
		mat.uniforms.uTrans.value = obj.trans;
		renderer.render(scene, camera);
		
		requestAnimationFrame(loop);
	}

	function resize(){
		let size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
		if(size > 450)  size = 450;
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	window.addEventListener("resize", function() {
	    resize();
	});

	canvas.addEventListener('mouseenter', function(){
		TweenMax.killTweensOf(obj);
		TweenMax.to(obj, 1.5, {trans: 1});
	});

	canvas.addEventListener('mouseleave', function(){
		TweenMax.killTweensOf(obj);
		TweenMax.to(obj, 1.5, {trans: 0});
	});
}

