'use strict';

app.controller('homeCtrl', ['$scope', '$localStorage', 'httpService', 'globalFunction',
function($scope, $localStorage, httpService, globalFunction){
	$scope.statusTotalCount = 0;//状态总数
	$scope.itemsStartIndex = 0;	//待请求条目位置
	$scope.itemsInitNum = 10;	//初始显示条目数
	$scope.itemsPlusNum = 5;	//单次增加条目数
	$scope.statusList = [];
	$scope.isLoading = true;
	$scope.showMoreButtonContent = "more";
	$scope.articleCategoryList = [];
	
	//显示更多状态
	$scope.showMore = function(){
		//$scope.itemsMaxNum += $scope.itemsAddNum;
		$scope.showMoreButtonContent = "loading...";
		var postData = {};
		postData.itemsStartIndex = $scope.itemsStartIndex;
		postData.itemsCount = $scope.itemsPlusNum;
		httpService.dataTrans("GetStatusListOp", postData).then(function (data){
			$scope.statusList = $scope.statusList.concat(data);
			$scope.itemsStartIndex = $scope.statusList.length;
			$scope.showMoreButtonContent = "more";
		},
		function(){
			globalFunction.popMessage("error", "通信错误", "获取更多状态失败");
		});
	};
	
	$scope.dateConvent = function(dateNum){
		return globalFunction.conventNumToDate(dateNum);
	};
	
	$scope.refreshStatusList = function(){
		$scope.itemsStartIndex = 0;	//待请求条目位置
		$scope.statusList = [];
		$scope.isLoading = true;
		var postData = {};
		httpService.dataTrans("GetStatusTotalCountOp", postData).then(function (data){
			if((1 == data.length) && ('undefined' != typeof(data[0].totalCount))){
				$scope.statusTotalCount = data[0].totalCount;
				postData.itemsStartIndex = $scope.itemsStartIndex;
				postData.itemsCount = $scope.itemsInitNum;
				httpService.dataTrans("GetStatusListOp", postData).then(function (data){
					$scope.statusList = $scope.statusList.concat(data);
					$scope.itemsStartIndex = $scope.statusList.length;
					$scope.isLoading = false;
				},
				function(){
					globalFunction.popMessage("error", "通信错误", "获取状态列表失败");
				});
			}else{
				globalFunction.popMessage("error", "参数错误", "获取状态总数失败");
			}
		},
		function(){
			globalFunction.popMessage("error", "通信错误", "获取状态总数失败");
		});
	};
	
	
	
	//初始化执行
	document.title = $scope.app.title.home;
	$scope.refreshStatusList();
}]);