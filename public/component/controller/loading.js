(function(){
	angular
		.module('playven')
		.directive('ngLoading',function($compile,$templateRequest){
			return{
				restrict:'A',
				scope:{
					flexs : "="
				},
				link:function(scope,element,attrs){
					var elem = element.html();
					scope.$watch(attrs.ngLoading,function(val){
						if(val){
							console.log(elem);
							var eleme = element.html(elem);
							$compile(element.contents())(scope);
							//element.append(eleme);
							console.log("1");
							//compiled(scope);
						}else{
							$templateRequest('component/directive/loading.html').then(function(val){
								var temp = angular.element(val);
								element.html(temp);
								console.log("2");
								$compile(temp)(scope);
							})
						}
					})
				}
			}
		})
})()