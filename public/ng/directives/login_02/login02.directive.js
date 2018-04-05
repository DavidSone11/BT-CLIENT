var app = angular.module('BTAPP');
app.directive('login02', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/login_02/login02.tmpl.html',
            replace: true,
            controller: function($scope,$location,$state) {

              


            }
        };
    }]);