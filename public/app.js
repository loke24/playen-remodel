angular
	.module('playven',['ngMaterial','ui.router','ui.router.state.events'])
	.config(['$httpProvider',function($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor')
	
	}])
	.config(function($mdThemingProvider) {
  		$mdThemingProvider.theme('success-theme')
  		$mdThemingProvider.theme('warning-theme')
	})
	.run(['$rootScope','authService', function($rootScope,authService,$state){
			console.log("state change")
		$rootScope.$on('$stateChangeStart',function(event,tostate,toparams,fromstate,fromparams){

			if(authService.isloggedin() === true){
				console.log("looged inn assholes")
			}else{
				console.log("not looged assholes")
			}
		})
		
	}])
	.config(["$locationProvider", function($locationProvider) {
  		$locationProvider.html5Mode(true);
	}])
	.config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider) {
		$urlRouterProvider.when('/index','');
		$urlRouterProvider.otherwise('');
		$stateProvider
			.state('landingpage',{
				url:'/',
				templateUrl:'component/directive/LandingPage.html',
				controller:'landingpageCtrl'
			})
			.state('VeDetails',{
				url : '/VenueDetails',
				templateUrl:'component/directive/venuedetails.html'
			})
			.state('venue',{
				// url:'/venue?game&venue',
				url:'/venue?page&game&venue&time&hour',
				templateUrl:'component/directive/venue.html',
				controller:'venueCtrl',
				params:{
					game : null,
					venue: null,
					time:null,
					hour:null,
					page:null
				},
				resolve:{
					querydata:function(dataFactory,$stateParams){
						var venue = $stateParams.venue;
						var game = $stateParams.game;
						console.log(venue)
						return dataFactory.querydata(game,venue)
					}
				}
			})
			.state('profile',{
				url:"/profile",
				templateUrl:"component/directive/profile.html",
				controller:"profileCtrl"
			})
			.state('landingpage.login',{
				url:'login'
			})
			.state('landingpage.register',{
				url:'register'
			})





			//$locationProvider.html5Mode(true);
	}])


