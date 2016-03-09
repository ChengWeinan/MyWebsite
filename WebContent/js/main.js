'use strict';

/* Controllers */

app.controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', 'httpService', '$filter',
    function($scope, $translate, $localStorage, $window, httpService, $filter) {
		/**网站架构初始化**/
		function isSmartDevice( $window )
		{
		    // Adapted from http://www.detectmobilebrowsers.com
		    var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
		    // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
		    return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
		}
		// add 'ie' classes to html
		var isIE = !!navigator.userAgent.match(/MSIE/i);
		isIE && angular.element($window.document.body).addClass('ie');
		isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');
		
		$scope.app = {
			title:{
				home:'企鹅Sheldon看世界',
				about:'联系我 ',
				admin:'后台管理',
				leisure:'生活点滴',
				search:'全站搜索',
				signIn:'后台登录',
				tech:'技术分享'
			},
			navbar:[
			        {state:'home', title:'主页'},
			        {state:'tech', title:'技术'},
			        {state:'leisure', title:'生活'},
			        {state:'about', title:'关于'}
	        ],
	        authorInfo: {
	        	authorName: 'Cheng Weinan',
	        	emailId: 'chengwn1989@qq.com',
	        	authorBrief: 'Geek改变世界，一直在路上'
	        },
	        searchKey: '',
			copyrightDate: $filter('date')(new Date(), "yyyy"),
			isSignIn: false,
			// for chart colors
			color: {
			  primary: '#7266ba',
			  info:    '#23b7e5',
			  success: '#27c24c',
			  warning: '#fad733',
			  danger:  '#f05050',
			  light:   '#e8eff0',
			  dark:    '#3a3f51',
			  black:   '#1c2b36'
			},
			settings: {
			  themeID: 1,
			  navbarHeaderColor: 'bg-black',
			  navbarCollapseColor: 'bg-white-only',
			  asideColor: 'bg-black',
		      headerFixed: true,
		      asideFixed: true,
		      asideFolded: false,
		      asideDock: false,
		      container: true
		    }
		};

		  // save settings to local storage
		  if ( angular.isDefined($localStorage.settings) ) {
		    $scope.app.settings = $localStorage.settings;
		  } else {
		    $localStorage.settings = $scope.app.settings;
		  }
		  $scope.$watch('app.settings', function(){
			  if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
				  // aside dock and fixed must set the header fixed.
				  $scope.app.settings.headerFixed = true;
			  }
			  // save to local storage
			  $localStorage.settings = $scope.app.settings;
		  }, true);
		
		  // angular translate
		  $scope.lang = { isopen: false };
		  $scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
		  $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
		  $scope.setLang = function(langKey, $event) {
			  // set the current lang
			  $scope.selectLang = $scope.langs[langKey];
			  // You can change the language during runtime
			  $translate.use(langKey);
			  $scope.lang.isopen = !$scope.lang.isopen;
		  };

  }]);