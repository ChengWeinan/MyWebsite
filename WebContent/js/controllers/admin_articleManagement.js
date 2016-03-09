'use strict';

app.controller('adminArticleManagementCtrl', ['$scope', '$state', '$localStorage', '$sce', 'httpService', 'globalFunction', '$filter',
function($scope, $state, $localStorage, $sce, httpService, globalFunction, $filter){
	$scope.ABSTRACTMAXLENGTH = 200;	//摘要的最大长度限制
	$scope.tablePageSize = 10;
	$scope.isAllChecked = false;
	$scope.isEditing = false;
	$scope.UEditorInitOption = {
			initialFrameHeight: 600
	};
	$scope.articleCategoryList = [];
	$scope.currentLabel = '';
	$scope.editContent = {};
	
	$scope.dateConvent = function(dateNum){
		return $filter('date')(new Date(dateNum), "yyyy-MM-dd HH:mm:ss");
	};
	
	$scope.checkAll = function(){
		$scope.isAllChecked = !$scope.isAllChecked;
		for(var i=0; i < $scope.articleList.length; i++){
			$scope.articleList[i].isChecked = $scope.isAllChecked;
		}
	}
	
	$scope.deleteArticle = function(){
		$scope.deleteIdList = [];
		for(var i=0; i < $scope.articleList.length; i++){
			if($scope.articleList[i].isChecked){
				$scope.deleteIdList.push($scope.articleList[i].id);
			}
		}
		var postData = {};
		postData.idList = $scope.deleteIdList.join(',');
		httpService.dataTrans("DeleteArticleOp", postData).then(function (data){
			if(0 == data.status){
				globalFunction.popMessage("success", "删除成功", data.msg);
				$scope.refreshArticleList();
			}else{
				globalFunction.popMessage("error", "删除失败", data.msg);
			}
		},
		function(){
			globalFunction.popMessage("error", "通信错误", "httpService failed.");
		});
	}
	
	$scope.addLabel = function(){
		if(-1 == $.inArray($scope.currentLabel, $scope.editContent.labelList)){
			$scope.editContent.labelList.push($scope.currentLabel);
		}
	}
	
	$scope.deleteLabel = function(index){
		$scope.editContent.labelList.splice(index, 1);
	}
	
	$scope.editArticle = function(articleId){	
		$scope.isEditing = true;
		
		var postData = {};
		httpService.dataTrans("GetArticleCategoryListOp", postData).then(function (data){
			if(0 < data.length){
				$scope.articleCategoryList = data;
			}else{
				globalFunction.popMessage("error", "返回文章类型错误", "数据长度："+data.length);
			}
		},
		function(){
			globalFunction.popMessage("error", "通信错误", "httpService failed.");
		});
		
		postData = {};
		postData.id = articleId;
		httpService.dataTrans("GetArticleOp", postData).then(function (data){
			if(1 == data.length){
				$scope.editContent = data[0];
				$scope.editContent.labelList = $scope.editContent.labelList.split(',');
				
				UE.delEditor('oldArticleContainer');
				$scope.ueOld = UE.getEditor('oldArticleContainer', $scope.UEditorInitOption);
				$scope.ueOld.ready(function() {
					$scope.ueOld.setContent($scope.editContent.content);
				});
			}else{
				globalFunction.popMessage("error", "返回文章数据有误", "数据长度："+data.length);
			}
		},
		function(){
			globalFunction.popMessage("error", "通信错误", "httpService failed.");
		});
	};
	
	$scope.submitOldArticle = function(){
		var postData = {};
		postData.id = $scope.editContent.id;
		postData.title = $scope.editContent.title;
		postData.category = $scope.editContent.category;
		postData.labelList = $scope.editContent.labelList.join(",");
		var tmpContentTxt = $scope.ueOld.getContentTxt();
		postData.abstractTxt = ($scope.ABSTRACTMAXLENGTH < tmpContentTxt.length || 0 == tmpContentTxt.length)?
								tmpContentTxt.substr(0, $scope.ABSTRACTMAXLENGTH)+"..."
								:tmpContentTxt;
		postData.content = $scope.ueOld.getContent();

		//判断数据是否合法
		if("undefined" == typeof(postData.title) || "" == postData.title){
			globalFunction.popMessage("warring", "参数非法", "标题不能为空");
			return;
		}
		if("undefined" == typeof(postData.content) || "" == postData.content){
			globalFunction.popMessage("warring", "参数非法", "内容不能为空");
			return;
		}
		
		httpService.dataTrans("EditArticleOp", postData).then(function (data){
			if(0 == data.status){
				$scope.refreshArticleList();
				globalFunction.popMessage("success", "修改成功", "文章：《"+$scope.editContent.title+"》修改成功！");
				$scope.isEditing = false;
			}else{
				globalFunction.popMessage("error", "提交失败", data.msg);
			}
		},
		function(){
			globalFunction.popMessage("error", "通信错误", "httpService failed.");
		});
	};
	
	$scope.cancelEdit = function(){
		$scope.isEditing = false;
	};
	
	$scope.refreshArticleList = function(){
		var postData = {};
		httpService.dataTrans("GetArticleListOp", postData).then(function (data){
			if(0 < data.length){
				$scope.articleList = data;
				for(var i=0; i < $scope.articleList.length; i++){
					$scope.articleList[i].isChecked = $scope.isAllChecked;
				}
			}else{
				globalFunction.popMessage("warning", "返回文章列表为空", "数据长度："+data.length);
			}
		},
		function(){
			globalFunction.popMessage("error", "通信错误", "httpService failed.");
		});
	}
	
	//初始化
	if($scope.app.isSignIn == true){
		document.title = $scope.app.title.admin + " - " + $scope.app.title.home;
		$scope.refreshArticleList();
	}else{
		$state.go('signIn');
	}
}]);