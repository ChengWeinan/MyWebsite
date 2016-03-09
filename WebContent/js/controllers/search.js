'use strict';

app.controller('searchCtrl', ['$scope', '$localStorage', 'httpService', 'globalFunction', '$stateParams', '$state',
function($scope, $localStorage, httpService, globalFunction, $stateParams, $state){
	$scope.keyword = $stateParams.keyword;
	$scope.articleCategoryList = [];
	$scope.searchResult = {};
	$scope.resultTotalCount = 0;
	$scope.showResult = ("" == $scope.keyword)?false:true;
	
	
	//初始化
	document.title = $scope.app.title.search + "：" + $scope.keyword + " - " + $scope.app.title.home;
	if($scope.showResult){
		$scope.keywordStatic = $scope.keyword;
		var postData = {};
		httpService.dataTrans("GetArticleCategoryListOp", postData).then(function (data){
			if(0 < data.length){
				$scope.articleCategoryList = data;
				
				for(var i=0; i<$scope.articleCategoryList.length; i++){
					$scope.searchResult["category"+$scope.articleCategoryList[i].id] = {
							categoryName: $scope.articleCategoryList[i].name,
							data: [],
							count: 0
					};
					postData = {};
					postData.category = $scope.articleCategoryList[i].id;
					postData.keyword = $scope.keyword;
					httpService.dataTrans("SearchArticleListOp", postData).then(function (data){
						if(0 < data.length){
							var searchResultKey = "category"+data[0].category;
							$scope.searchResult[searchResultKey].data = data;
							$scope.searchResult[searchResultKey].count = data.length;
	
							$scope.resultTotalCount += $scope.searchResult[searchResultKey].count;
						}else{
						}
					},
					function(){
						globalFunction.popMessage("error", "通信错误", "httpService failed.");
					});
				}
				
			}else{
				globalFunction.popMessage("error", "数据错误", "获取文章类型失败，数据长度："+data.length);
			}
		},
		function(){
			globalFunction.popMessage("error", "通信错误", "httpService failed.");
		});
	}
}]);