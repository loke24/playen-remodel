angular
	.module('playven')
	.service('authService', ['$window', function($window){
		this.isloggedin = function(){
			if($window.localStorage.getItem('loggedin')){
				return true
			}else{
				return false;
			}
		}
	}])
	.service('storageService', ['$window', function($window){
 		var localStorage = $window.localStorage
		this.save = function(key,value){
			console.log("save")
			return localStorage.setItem(key,value);
		}
		this.setUsername = function(value){
			return localStorage.setItem('username',value);
		}
		this.getUsername = function(key){
			return localStorage.getItem('username');
		}
		this.remove = function(key){
			return localStorage.removeItem(key)
		}
	}])
	.service('Toaster', ['$mdToast', function($mdToast){
			this.warning = function(content){
				$mdToast.show(
						$mdToast.simple()
								.textContent(content)
								.position('top right')
								.hideDelay(1000)
								.theme('warning-theme')
					)

			}	
			this.success =function(content){
				$mdToast.show(
						$mdToast.simple()
								.textContent(content)
								.position('top right')
								.hideDelay(1000)
								.theme('success-theme')
					)

			}


	}])