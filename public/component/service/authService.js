angular
	.module('playven')
	.factory('authToken', ['$window', function($window){
		var authToken = 'auth-token';
		return{
			getitem : getitem,
			setitem : setitem,
			removeitem :removeitem
		};
		function getitem(){
		return $window.localStorage.getItem(authToken)
			
		}
		function setitem(token){
			if(token){
				$window.localStorage.setItem(authToken,token);
			}
		}
		function removeitem(){
			$window.localStorage.removeItem(authToken)
		}
	}])
	.factory('authInterceptor', ['authToken', function(authToken){
		return {
			request : function(config){
				//console.log("auth request")
				var token = authToken.getitem();
				//console.log(token)
				if(token){
					config.headers = config.headers || {};
					config.headers.Authorization = token;
					//console.log(config)
				}
				// else{
				// 	console.log("no token provided")
				// }
					return config;
			},
			response : function(config){
				//console.log("auth response")
				var token = authToken.getitem();
				//console.log(token)
				if(token){
					config.headers = config.headers || {};
					config.headers.Authorization = token;
					//console.log(config)
				}
				// else{
				// 	console.log("no token provided")
				// }
					return config;
			}

		}
	}])