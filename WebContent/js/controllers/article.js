'use strict';

app.controller('articleCtrl', ['$scope', '$state', '$localStorage', 'httpService', 'globalFunction', '$stateParams', '$sce',
function($scope, $state, $localStorage, httpService, globalFunction, $stateParams, $sce){
	
	$scope.articleId = $stateParams.articleId;
	$scope.articleData = {};
	$scope.preArticleInfo = {};
	$scope.postArticleInfo = {};

	$scope.trustAsHtml = function(text){
		return $sce.trustAsHtml(text);  
	};
	
	$scope.dateConvent = function(dateNum){
		return globalFunction.conventNumToDate(dateNum);
	};
	
	
	
	//初始化
	var postData = {};
	postData.id = $scope.articleId;
	httpService.dataTrans("GetArticleOp", postData).then(function (data){
		if(1 == data.length){
			$scope.articleData = data[0];
			document.title = $scope.articleData.title + " - " + $scope.app.title.home;
			
			postData.date = $scope.articleData.date;
			postData.category = $scope.articleData.category;
			httpService.dataTrans("GetPreArticleInfoOp", postData).then(function (data){
				if(1 == data.length){
					$scope.preArticleInfo = data[0];
					$scope.preArticleInfo.titleOrg = $scope.preArticleInfo.title;
					$scope.preArticleInfo.title = "《" + ((20 < $scope.preArticleInfo.title.length)?$scope.preArticleInfo.title.substr(0, 20)+"...":$scope.preArticleInfo.title) + "》";
					$scope.preArticleInfo.hasMore = true;
				}else if(0 == data.length){
					$scope.preArticleInfo = {
							title: '没有了',
							hasMore: false
					};
				}else{
					$scope.preArticleInfo = {
							title: '获取失败',
							hasMore: false
					};
					globalFunction.popMessage("error", "返回前一篇数据有误", "数据长度："+data.length);
				}
			},
			function(){
				globalFunction.popMessage("error", "通信错误", "httpService failed.");
			});
			httpService.dataTrans("GetPostArticleInfoOp", postData).then(function (data){
				if(1 == data.length){
					$scope.postArticleInfo = data[0];
					$scope.postArticleInfo.titleOrg = $scope.postArticleInfo.title;
					$scope.postArticleInfo.title = "《" + ((20 < $scope.postArticleInfo.title.length)?$scope.postArticleInfo.title.substr(0, 20)+"...":$scope.postArticleInfo.title) + "》";
					$scope.postArticleInfo.hasMore = true;
				}else if(0 == data.length){
					$scope.postArticleInfo = {
							title: '没有了',
							hasMore: false
					};
				}else{
					$scope.postArticleInfo = {
							title: '获取失败',
							hasMore: false
					};
					globalFunction.popMessage("error", "返回后一篇数据有误", "数据长度："+data.length);
				}
			},
			function(){
				globalFunction.popMessage("error", "通信错误", "httpService failed.");
			});
		}else{
			globalFunction.popMessage("warring", "抱歉，文章不存在", "已跳转至主页：  www.chegnweinan.com");
			$state.go('home');
		}
	},
	function(){
		globalFunction.popMessage("error", "通信错误", "httpService failed.");
	});
}]);