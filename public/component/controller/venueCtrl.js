(function(){
	angular
		.module('playven')
		.controller('venueCtrl', ['$scope','$http','querydata','dataFactory','$stateParams','$state','$location','$timeout', function($scope,$http,querydata ,dataFactory,$stateParams,$state,$location,$timeout){
			var game =$stateParams.game;
			var venue =$stateParams.venue;
			var time =$stateParams.time;
			var hour =$stateParams.hour;

			$scope.currentPage = 0;
			$scope.itemperpage = 9;
			var searchparams = $location.search();
			//$scope.$on('$viewContentLoaded',function(){
			$scope.$watch('currentPage',function(newvalue,oldvalue){
			$timeout(function(){

  			var offset= newvalue * $scope.itemperpage;
			$scope.flexs = querydata.slice(offset,offset+$scope.itemperpage);
			})
  			})
			//})
			//$scope.flexs = querydata;
  				var page = querydata.length;
				 $scope.pageSize = [];
				var count = null;

				$scope.pagelimit = Math.ceil(page/$scope.itemperpage);

				for(var i=1;i<=$scope.pagelimit;i++){
						count++;
						$scope.pageSize.push(count);
				}

				//console.log(carddetail);
			
			$scope.pageActive = function(index){
				return $scope.currentPage === index ? "pagination-active-no" : "";
			}
		$scope.nextPage = function(){
			$scope.currentPage++;

		}
		$scope.previousPage = function(){
			$scope.currentPage--;
		//console.log($scope.currentPage);
		}
		$scope.prevPageDisabled = function() {
    	return $scope.currentPage === 0 ? "disabled" : "";
  		};
  		$scope.currPageDisabled = function() {
    	return $scope.currentPage === $scope.pagelimit ? "disabled" : "";
  		};

  		

			
		}])
		.filter('offset',function(){
			return function(input,start){
				start = parseInt(start,10);
				return input.slice(start);
			}
		})



})();