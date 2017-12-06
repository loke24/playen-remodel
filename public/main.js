$(document).ready(function(){
	var parallax = $('.player-parallax');
	var parallaxValue=parallax.length;
	$(window).on('scroll',function(){
		window.requestAnimationFrame(function(){
			// for(var i=0 ;i<parallaxValue;i++){
				var parallaxNew = parallax;
				var scrolled = $(window).scrollTop();
				parallaxNew.css({
					'transform':'translate3d(0,'+scrolled * 0.22 +'px,0)'
				});
			// }
		})
	})


	var RightballParallax= $('.ball-right-parallax');
	$(window).on('scroll',function(){
		window.requestAnimationFrame(function(){
			
			var ballParallaxNew = RightballParallax;
			var scrolle = $(window).scrollTop();
			ballParallaxNew.css({
				'transform':'translate3d(0,'+scrolle * 0.30+'px,0)'
			})
		})
	})

	var leftballParallax= $('.ball-left-parallax');
	$(window).on('scroll',function(){
		window.requestAnimationFrame(function(){
			
			var ballParallaxNew = leftballParallax;
			var scrolle = $(window).scrollTop();
			ballParallaxNew.css({
				'transform':'translate3d(0,'+scrolle * 0.22+'px,0)'
			})
		})
	})
















});