'use strict';

app.controller('adminNewArticleCtrl', ['$scope', '$state', '$localStorage', '$sce', 'httpService', 'globalFunction',
function($scope, $state, $localStorage, $sce, httpService, globalFunction){
	$scope.ABSTRACTMAXLENGTH = 200;	//摘要的最大长度限制
	$scope.articleCategoryList = [];
	$scope.currentLabel = '';
	$scope.UEditorInitOption = {
			initialFrameHeight: 600
	};
	$scope.submitContent = {
			title: '',
			articleCategory: 1,
			labelList: []
	};
	
	$scope.addLabel = function(){
		if(-1 == $.inArray($scope.currentLabel, $scope.submitContent.labelList)){
			$scope.submitContent.labelList.push($scope.currentLabel);
		}
	}
	
	$scope.deleteLabel = function(index){
		$scope.submitContent.labelList.splice(index, 1);
	}
	
	$scope.submitNewArticle = function(){
		var postData = {};
		postData.title = $scope.submitContent.title;
		postData.category = $scope.submitContent.articleCategory;
		postData.labelList = $scope.submitContent.labelList.join(",");
		var tmpContentTxt = $scope.ueNew.getContentTxt();
		postData.abstractTxt = ($scope.ABSTRACTMAXLENGTH < tmpContentTxt.length || 0 == tmpContentTxt.length)?
								tmpContentTxt.substr(0, $scope.ABSTRACTMAXLENGTH)+"..."
								:tmpContentTxt;
		postData.content = $scope.ueNew.getContent();
		
		//判断数据是否合法
		if("undefined" == typeof(postData.title) || "" == postData.title){
			globalFunction.popMessage("warring", "参数非法", "标题不能为空");
			return;
		}
		if("undefined" == typeof(postData.content) || "" == postData.content){
			globalFunction.popMessage("warring", "参数非法", "内容不能为空");
			return;
		}
		
		httpService.dataTrans("SubmitNewArticleOp", postData).then(function (data){
			if(0 == data.status){
				globalFunction.popMessage("success", "提交成功", data.msg);
				$state.go('home');
			}else{
				globalFunction.popMessage("error", "提交失败", data.msg);
			}
		},
		function(){
			globalFunction.popMessage("error", "通信错误", "httpService failed.");
		});
	}
	
	
	
	//初始化
	if($scope.app.isSignIn == true){
		document.title = $scope.app.title.admin + " - " + $scope.app.title.home;
		UE.delEditor('newArticleContainer');
		$scope.ueNew = UE.getEditor('newArticleContainer', $scope.UEditorInitOption);
		
		var postData = {};
		httpService.dataTrans("GetArticleCategoryListOp", postData).then(function (data){
			if(0 < data.length){
				$scope.articleCategoryList = data;
			}else{
				globalFunction.popMessage("error", "数据错误", "数据长度："+data.length);
			}
		},
		function(){
			globalFunction.popMessage("error", "通信错误", "httpService failed.");
		});
	}else{
		$state.go('signIn');
	}
}]);