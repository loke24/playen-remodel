(function(){
	angular
	.module('playven')
	.directive('venueSearch',function(){
		return{
			restrict :"EA",
			templateUrl : "component/directive/venuesearch.html",
			controller : venuesearch

		}
		function venuesearch($scope,$state,$http,$stateParams,dataFactory,$mdDialog,$location,$stateParams,$element){

			$scope.games = ["tennis","soccer","badminton","volleyball","football"];
			$scope.venues = ["jolarpet","tirupattur","vaniyambadi","ambur"];
			$scope.timings =["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00"];
			$scope.hours  = ["30 min","60 min","1 hours","2 hours","3 hours"];

			$scope.gameOpen = null;
			$scope.venueOpen = null;
			$scope.timeOpen = null;
			$scope.hourOpen = null;


			$scope.gameActive = $scope.games[0];
			$scope.venueActive = $scope.venues[0];
			$scope.timeActive = $scope.timings[0];
			$scope.hourActive = $scope.hours[0];
			//$scope.sample="loke";

			var game =$stateParams.game;
			var venue =$stateParams.venue;
			var time =$stateParams.time;
			var hour =$stateParams.hour;
			//console.log(time)
			

		//select option toggle
		$scope.gamefun = function(){
			var toggle = $(event.target).closest('.select-line-outer').find('#select-line-inner');
			if($scope.gameOpen == false){
				$scope.gameOpen = true;
				toggle.addClass("is-open");
				toggle.removeClass("is-closed");
			}else{
				$scope.gameOpen = false;
				toggle.removeClass("is-open");
				toggle.addClass("is-closed");
			}
			
		}

		$scope.catogoryFunc =function(index){
			$scope.gameActive = $scope.games[index];
			$scope.gamefun();
		}


		$scope.venuefun = function(){
			var toggle = $(event.target).closest('.select-line-outer').find('#select-line-inner');
			if($scope.venueOpen == false){
				$scope.venueOpen = true;
				toggle.addClass("is-open");
				toggle.removeClass("is-closed");
			}else{
				$scope.venueOpen = false;
				toggle.removeClass("is-open");
				toggle.addClass("is-closed");
			}
			
		}
		$scope.venueSelec =function(index){
			$scope.venueActive = $scope.venues[index];
			$scope.venuefun();
		}
		$scope.timefun = function(){
			var toggle = $(event.target).closest('.select-line-outer').find('#select-line-inner');
			if($scope.timeOpen == false){
				$scope.timeOpen = true;
				toggle.addClass("is-open");
				toggle.removeClass("is-closed");
			}else{
				$scope.timeOpen = false;
				toggle.removeClass("is-open");
				toggle.addClass("is-closed");
			}
			
		}

		$scope.timeSelec =function(index){
			$scope.timeActive = $scope.timings[index];
			$scope.timefun();
		}
		$scope.hourfun = function(){
			//var toggle = $(event.target).closest('.select-line-outer').find('#select-line-inner');
			if($scope.hourOpen == false){
				$scope.hourOpen = true;
				/*toggle.addClass("is-open");
				toggle.removeClass("is-closed");*/
			}else{
				$scope.hourOpen = false;
				/*toggle.removeClass("is-open");
				toggle.addClass("is-closed");*/
			}
			
		}

		$scope.hourSelec =function(index){
			if($scope.hours[index])
				$scope.hourActive = $scope.hours[index];
			$scope.hourfun();
		}
		$scope.findvenue =function(){
			var gameval = angular.element(document.getElementsByName("gameValue")).val();
			var venueval = angular.element(document.getElementsByName('venueValue')).val();
			var timeval = angular.element(document.getElementsByName('timeValue')).val();
			var hourval = angular.element(document.getElementsByName('hourValue')).val();
			var pageval = 1;
			
			$state.go('venue',{
				game : gameval,
				venue : venueval,
				time : timeval,
				hour : hourval,
				page: pageval
			});

			 //console.log(gameval)
			// console.log(venueval)
			// console.log(timeval)
			// console.log(hourval)
		}
	}
})


})();