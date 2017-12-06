(function(){
	angular
		.module('playven')
		.factory('dataFactory', ['$http','$q', function($http,$q){
				var datafactory = {};
				var updatedata;
				var getdata;
				var querydata;
				 		datafactory.sampleF=function(offset,limit){
				 			var def = $q.defer();
				 			if(getdata){
				 					updatedata = getdata.cards.slice(offset,limit);
				 					def.resolve(updatedata);
				 			
				 			}
				 			else{
				 				 $http.get('/carddetail').then(function(res){
				 				 	if(offset === null && limit === null){
				 				 		getdata = res.data[0];
				 				 		return def.resolve(getdata);
				 				 	}
				 				 	else{

				 					getdata = res.data[0];
				 					updatedata = getdata.cards.slice(offset,limit);
				 					 return def.resolve(updatedata);
				 				 	}
				 				})
				 			}
				 			//console.log(def.promise)
				 			return def.promise;
				 		}

				 		datafactory.newvalue = function(gameParam,venueParam){
				 			var def = $q.defer();
				 			// console.log(gameParam)
				 			// console.log(venueParam)
				 			$http.get('/querydata',{params:{venue:venueParam,game:gameParam}}).then(function(res){
				 				querydata = res.data[0].cards;
				 				return def.resolve(querydata);
				 			})
				 			return def.promise;
				 		}
				return{
					getvalue : function(offset,limit){
							return datafactory.sampleF(offset,limit);
								},
					querydata : function(gameParam,venueParam){
							return datafactory.newvalue(gameParam,venueParam);
							//console.log(datafactory.newvalue());
					}
				}
		}])
})();