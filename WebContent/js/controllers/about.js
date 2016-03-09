'use strict';

app.controller('aboutCtrl', ['$scope',
function($scope){
	//初始化
	document.title = $scope.app.title.about + " - " + $scope.app.title.home;
}]);