'use strict';

app.controller('signInCtrl', ['$scope', '$state', '$localStorage', 'httpService', 'globalFunction',
function($scope, $state, $localStorage, httpService, globalFunction){
	$scope.password = "";
	
	$scope.signIn = function(){
		var postData = {};
		postData.password = $scope.password;
		httpService.dataTrans("GetAdminSignInOp", postData).then(function (data){
			if(1 == data.length && data[0]){
				$scope.app.isSignIn = true;
				$state.go('admin');
			}else{
				globalFunction.popMessage("error", "密码错误", "密码无效。");
			}
		},
		function(){
			globalFunction.popMessage("error", "通信错误", "httpService failed.");
		});
	}
	
	//初始化
	document.title = $scope.app.title.signIn + " - " + $scope.app.title.home;
}]);