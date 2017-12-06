(function(){



	angular
	.module('playven')
	.controller('landingpageCtrl', ['$scope','dataFactory','$state','$mdDialog','$location','$window','$element', function($scope,dataFactory,$state,$mdDialog,$location,$element){
	dataFactory.getvalue(null,null).then(function(res){
		$scope.flexs = res;
		//console.log($scope.flexs);
	})
	//parallax transition effext
	var parallax = $('.player-parallax');
	var parallaxValue=parallax.length;
	$(window).on('scroll',function(){
		window.requestAnimationFrame(function(){
				var parallaxNew = parallax;
				var scrolled = $(window).scrollTop();
				parallaxNew.css({
					'transform':'translate3d(0,'+scrolled * 0.22 +'px,0)'
				});
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

	$scope.rightarrow = function(){
		var carousel = angular.element(document.getElementById('card_flex_main'));
		var style = window.getComputedStyle(carousel.get(0));  // Need the DOM object
		var matrix = new WebKitCSSMatrix(style.transform);

		var matrixval = matrix.m41 - 272;
		carousel.css({
			'transform':'translate3d('+matrixval+'px,0,0)',
			'transition':'transform 0.4s'
		})
	}

	$scope.leftarrow = function(){
		var carousel = angular.element(document.getElementById('card_flex_main'));
		var style = window.getComputedStyle(carousel.get(0));  // Need the DOM object
		var matrix = new WebKitCSSMatrix(style.transform);

		var matrixval = matrix.m41 + 272;
		carousel.css({
			'transform':'translate3d('+matrixval+'px,0,0)',
			'transition':'transform 0.4s'
		})
	}







}])



})();