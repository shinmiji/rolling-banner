;(function(global, $, undefined){
	'use strict';

	var $banner = null;		//div.banner
	var $banner_list = null;	// ul
	var $banner_img = null;	// img
	var banner_list_len = 0;	// img length
	var current_index = -1;
	var  banner_width=0;
	var current_index = 0;
	var timerID = -1;

	init();
	initEvent();
	autoPalyStart();

	function init () {
		$banner = $('.banner');
		$banner_list = $('ul',$banner);
		$banner_img = $('img', $banner_list);
		banner_list_len = $banner_img.length;

	};

	function initEvent () {
		// banner width setting
		bannerWidth();

		// auto play start button event
		$('.start').on('click', function(){
			autoPalyStart();
		});

		// auto play stop button event
		$('.stop').on('click', function(){
			autoPalyStop();
		});

		// next button event
		$('.next').on('click', function(){
			nextEvent();
		});

		// prev button event
		$('.prev').on('click', function(){
			prevEvent();
		});

	};

	function bannerWidth () {
		banner_width = parseInt($banner_img.eq(0).css('width'));

		$banner.css('width', banner_width);
		$banner_list.css('width', banner_width*banner_list_len);
	};

	function nextEvent () {
		selectBannerAt (current_index+1);
	};

	function prevEvent () {
		selectBannerAt (current_index-1);
	};

	function autoPalyStart () {
		if (timerID === -1) {
			timerID = setInterval(function(){
				nextEvent ();
			}, 1000);
		}
	};

	function autoPalyStop () {
		clearInterval(timerID);
		timerID = -1;
	};

	function selectBannerAt (index) {
		current_index = index;
		if (current_index >= banner_list_len) {
			current_index = 0;
		}
		else if (current_index < 0) {
			current_index = banner_list_len-1;
		}
		
		// $banner.scrollLeft(banner_width*current_index);

		$banner.stop().animate({
			scrollLeft:banner_width*current_index
		}, 300);
	}

})(window, window.jQuery);