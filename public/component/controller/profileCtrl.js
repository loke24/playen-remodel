angular
	.module('playven')
	.controller('profileCtrl', ['$scope','Toaster','$http','authToken', function($scope,Toaster,$http,authToken){
			$scope.profileEdit = true;
		    $scope.indexs = 1;
		    $scope.update = {
		    	firstname:""
		    }
		    $http.get('/userinfo').then(function(res){
		    	$scope.update = res.data.decode[0].users.userdetail;
		    	console.log($scope.update)
		    })
			$scope.edit = function(index){
				$scope.indexs = 1;
				$scope.profileEdit = true;
				$scope.myactivity = false;
				$scope.mygamepasses = false;
				$scope.myemail = false;
				$scope.myinvoice = false;
			}
			$scope.activity = function(){
				$scope.indexs = 2;
				$scope.myactivity = true;
				$scope.profileEdit = false;
				$scope.mygamepasses = false;
				$scope.myemail = false;
				$scope.myinvoice = false;
			}
			$scope.gamepasses = function(){
				$scope.indexs = 3;
				$scope.mygamepasses = true;
				$scope.profileEdit = false;
				$scope.myactivity = false;
				$scope.myemail = false;
				$scope.myinvoice = false;
			}
			$scope.email = function(){
				$scope.indexs = 4;
				$scope.myemail = true;
				$scope.profileEdit = false;
				$scope.myactivity = false;
				$scope.mygamepasses = false;
				$scope.myinvoice = false;
			}
			$scope.invoice = function(){
				$scope.indexs = 5;
				$scope.myinvoice = true;
				$scope.profileEdit = false;
				$scope.myactivity = false;
				$scope.mygamepasses = false;
				$scope.myemail = false;
			}
			$scope.activetabs = function(index){
				return $scope.indexs === index ? "tabs-is-opened" : "";
			}
			//     
			$scope.saveChange = function(update){
				if(update.firstname == "" && update.lastname == "" && update.email == "" && update.phone == "" && update.city == "" && update.address == "" && update.oldpwd == "" && update.newpwd == "" && update.newconfirmpwd == "" ) {
					Toaster.warning("Enter something!!!!")
				}else{
					
						//with password update
					if( update.oldpwd && update.newpwd  && update.newconfirmpwd ){
						if(update.newpwd === update.newconfirmpwd){
							Toaster.success("password match")
							$http.post('/update',update).then(function(res){
								console.log(res);
								Toaster.success("password update success")
								authToken.setitem(res.data.token)
							})
						}
						else{
							Toaster.warning("password mismatch!!")
						}
						//without passeord update
					}else if(update.oldpwd == "" && update.newpwd == ""  && update.newconfirmpwd == ""){
							$http.post('/update',update).then(function(res){
								console.log(res);
								Toaster.success("no password update success")
							})
					}
					else{
						Toaster.warning("Wrong!!")
					}
				}
			}
			
	}])
	
