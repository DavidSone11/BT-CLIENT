var app = angular.module('BTAPP');
app.directive('mainHeader', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/header/header.tmpl.html',
            replace: true,
            controller: function($scope,$location,$state) {

              

            }
        };
    }]);