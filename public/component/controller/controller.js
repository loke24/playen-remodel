
(function(){


	angular
	.module('playven')
	.controller('controller', ['$rootScope','$scope','$mdDialog','$state','$location','$window','authService','storageService','authToken','Toaster', function($rootScope,$scope,$mdDialog,$state,$location,$window,authService,storageService,authToken,Toaster){
		

		$scope.games = ["tennis","soccer","badminton","volleyball","football"];
		$scope.venues = ["jolarpet","tirupattur","vaniyambadi","ambur"];
		$scope.timings =["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00"];
		$scope.hours  = ["30 min","60 min","1 hours","2 hours","3 hours"];
		$scope.game = $scope.games[0];
		$scope.venue =  $scope.venues[0]
		

		$scope.isloggedin =function(){
			$scope.username = storageService.getUsername();
			return authService.isloggedin()
			}

		$rootScope.$on("loginTosignin",function(){
						$scope.signin();
					})
		$rootScope.$on("signinTologin",function(){
						$scope.login();
					})
		$scope.signin = function(){
				$mdDialog.show({
					templateUrl:'component/directive/signup.dir.html',
					parent:angular.element(document.body),
					controller:signinCtrl,
					targetEvent:event,
					clickOutsideToClose:true,
					fullscreen:$scope.fullscreen

				});
				function signinCtrl($rootScope,$scope,$http,Toaster){
					$state.go('landingpage.register');

					$scope.signup = function(){
						if($scope.user.firstname == "" || $scope.user.lastname == "" || $scope.user.email == "" || $scope.user.password == "" || $scope.user.confirmpassword == ""){
							Toaster.warning("Enter Details!!!!!")
						}else{
							if($scope.user.password === $scope.user.confirmpassword){
								$http.post('/newuser',$scope.user).then(function(res){
									if(res.data.success == false && res.data.exist == true){
										Toaster.warning("User already Registered!!!!!")

									}else{

										console.log(res);
										$scope.user = "";
										$mdDialog.hide();
										Toaster.success("Signed In Successfully");	
										$state.go('landingpage');

									}

								})
							}
							else{
								Toaster.warning("Password mismatch");
								console.log('password wrong');
								$scope.user.password = "";
								$scope.user.confirmpassword = "";
							}	

						}
				}
					$scope.closeModal = function(){
						$mdDialog.hide();
						$state.go('landingpage');
					}
					$scope.login = function(){
						$rootScope.$emit("signinTologin");
						$mdDialog.hide();
						$state.go('landingpage.login');

					}
				}
			}

			$scope.login = function(){
				$mdDialog.show({
					templateUrl:'component/directive/login.dir.html',
					parent:angular.element(document.body),
					controller:loginCtrl,
					targetEvent:event,
					clickOutsideToClose:true,
					fullscreen:$scope.fullscreen

				});
				function loginCtrl($rootScope,$scope,$http,$state,$mdDialog,$window,authToken,storageService,Toaster){
					$state.go('landingpage.login');
					$scope.login = function(){
						console.log($scope.userlogin)
						if($scope.userlogin.email == "" || $scope.userlogin.password == ""){
								Toaster.warning("Enter Details!!!!");
								var label = document.getElementById('label');
								label.style.color="red";

						}else{
							$http.post('/login',$scope.userlogin).then(function(res){
								if(res.data.success === false && res.data.exist === false){
									console.log(res.data.exist);
									Toaster.warning("No user Found");

								}
								else if(res.data.success === true && res.data.exist === true){
									authToken.setitem(res.data.token)
									storageService.save('loggedin',true)
									storageService.setUsername(res.data.user[0].users.userdetail.firstname)
									$mdDialog.hide();
									Toaster.success("LoggedIn");	
									$state.go('landingpage');
									$scope.userlogin = "";
									console.log(res)
								}
								else
								{
									Toaster.warning("Incorrect Password");

								}

							})
						}
					}
					$scope.closeModal = function(){
						$mdDialog.hide();
						$state.go('landingpage');
					}

					$scope.signup = function(){
						$rootScope.$emit("loginTosignin");
						$mdDialog.hide();
						$state.go('landingpage.register');


					}
				}
			}

			$scope.logout = function(){
				storageService.remove('loggedin');
				authToken.removeitem();
				Toaster.warning("Logged Out")
			}
		
		


}])
.directive('emptyInput', function($parse) {
    return {
      require: '?ngModel',
      link: function(scope, element, attrs, ngModel) {
        //ngModel should be there & it should be of type text
        if (angular.isObject(ngModel) &&
          (!attrs.type || attrs.type === 'text')) {
          var model = $parse(attrs.ngModel);
          model.assign(scope, '');
        }
      }
    }
});




})();