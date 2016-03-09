'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', '$locationProvider',
      function ($stateProvider,   $urlRouterProvider, $locationProvider) {
		  
		  $locationProvider.html5Mode(true);
          
          $urlRouterProvider
              .otherwise('/home');
          
          $stateProvider
              .state('/', {
                  abstract: true,
                  url: '/',
                  templateUrl: 'index.html'
              })
              .state('home', {
                  url: '/home',
                  templateUrl: 'tpl/controllers/home.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/home.js']);
                    }]
                  }
              })
              .state('signIn', {
                  url: '/signIn',
                  templateUrl: 'tpl/controllers/signIn.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/signIn.js']);
                    }]
                  }
              })
              .state('admin', {
                  url: '/admin',
                  templateUrl: 'tpl/controllers/admin.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/admin_newArticle.js',
                                                 'js/controllers/admin_articleManagement.js']);
                    }]
                  }
              })
              .state('article', {
                  url: '/article/:articleId',
                  templateUrl: 'tpl/controllers/article.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/article.js']);
                    }]
                  }
              })
              .state('tech', {
                  url: '/tech',
                  templateUrl: 'tpl/controllers/tech.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/tech.js']);
                    }]
                  }
              })
              .state('leisure', {
                  url: '/leisure',
                  templateUrl: 'tpl/controllers/leisure.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/leisure.js']);
                    }]
                  }
              })
              .state('search', {
                  url: '/search/:keyword',
                  templateUrl: 'tpl/controllers/search.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/search.js']);
                    }]
                  }
              })
              .state('about', {
                  url: '/about',
                  templateUrl: 'tpl/controllers/about.html',
                  resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load(['js/controllers/about.js']);
                    }]
                  }
              })
      }
    ]
  );