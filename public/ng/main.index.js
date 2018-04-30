(function (window) {
    'use strict';
    var app = angular.module("btApp", [
        'ui.router',
        'oc.lazyLoad',
        'ngRoute',
        'ngAnimate'
    ]);

    app.run(function ($rootScope) {
        $rootScope.color = 'blue';
    });
    app.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$httpProvider', '$locationProvider',
        function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider, $locationProvider) {

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
            $urlRouterProvider.otherwise('/login');
            $stateProvider
                .state('home', {
                    template: '<home></home>',
                    url: '/home',
                    resolve: {
                        loadMyDirectives: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'btApp',
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
                                name: 'btApp',
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
                    controller: 'LoginController',
                    secure: true,
                    resolve: {
                        loadMyDirectives: function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                name: 'btApp',
                                files: [
                                    'ng/directives/login/login.directive.js',
                                    'ng/directives/login/login.controller.js',
                                    'ng/factory/auth.factory.js',

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
                                name: 'btApp',
                                files: [
                                    'ng/directives/User/user.directive.js',
                                    'ng/custom-directives/validation.directive.js',

                                ]
                            });
                        }
                    }
                });

        }]);

    window.app = app;

}(window));

