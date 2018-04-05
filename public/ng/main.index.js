(function(window) {
  'use strict';
  var app = angular.module("BTAPP", [
    'ui.router',
    'oc.lazyLoad',
    'ngRoute',
    'ngAnimate'
  ]);
app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$httpProvider','$locationProvider',
    function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider,$locationProvider) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
          });
        //Remove the '#' from URL.  
//   $urlRouterProvider.otherwise('/home/dashboard');
    $urlRouterProvider.otherwise('/login02');
  $stateProvider
      .state('home', {
          template: '<home></home>',
          url: '/home',
          resolve: {
              loadMyDirectives: function ($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      name: 'BTAPP',
                      files: [
                          'ng/directives/home/home.directive.js',
                          
                          
                      ]
                  });
              }
          }
      }).state('home.dashoard', {
        template: '<dashboard></dashboard>',
        url: '/dashboard',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'BTAPP',
                    files: [
                        'ng/directives/dashboard/dashboard.directive.js',
                        'ng/directives/sidebar/sidebar.directive.js',
                        'ng/directives/header/header.directive.js',
                        'ng/factory/auth.factory.js',
                    ]
                });
            }
        }
    }).state('login', {
        template: '<login></login>',
        url: '/login',
        controller:'loginCtrl',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'BTAPP',
                    files: [
                        'ng/directives/login/login.directive.js',
                        'ng/directives/login/login.controller.js',
                        'ng/factory/auth.factory.js',
                        
                    ]
                });
            }
        }
    }).state('login02', {
        template: '<login02></login02>',
        url: '/login02',
        controller:'login02Ctrl',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'BTAPP',
                    files: [
                        'ng/directives/login_02/login02.directive.js',
                        'ng/directives/login_02/login02.controller.js',
                        
                        
                    ]
                });
            }
        }
    }).state('home.user', {
        template: '<user></user>',
        url: '/user',
        resolve: {
            loadMyDirectives: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'BTAPP',
                    files: [
                        'ng/directives/User/user.directive.js',
                        
                    ]
                });
            }
        }
    });
   
    }]);

window.app = app;

}(window));

