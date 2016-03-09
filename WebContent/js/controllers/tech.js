'use strict';

app.controller('techCtrl', ['$scope', '$localStorage', 'httpService', 'globalFunction',
function($scope, $localStorage, httpService, globalFunction){
	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.perPageMaxItems = 10;
	$scope.articleList = [];
	
	$scope.dateConvent = function(dateNum){
		return globalFunction.conventNumToDate(dateNum);
	};
	
	//初始化
	document.title = $scope.app.title.tech + " - " + $scope.app.title.home;
	var postData = {};
	postData.category = 1;	//类型为"技术"
	httpService.dataTrans("GetArticleListOp", postData).then(function (data){
		$scope.totalItems = data.length;
		$scope.articleList = data;
	},
	function(){
		globalFunction.popMessage("error", "通信错误", "httpService failed.");
	});
}]);