var app = angular.module('BTAPP');
app.directive('header', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/header/header.tmpl.html',
            replace: true,
            controller: function($scope,$location,$state) {

              

            }
        };
    }]);