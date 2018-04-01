var app = angular.module("BTAPP");
app.directive("user", ['$compile', function ($compile) {
   
    return {
        restirct : 'E',
        templateUrl : 'ng/directives/User/user.tmpl.html',
        replace:true,
        controller : function ($scope, $state, $http, $log, $q, $timeout, $window,$location) {
    
        
        }
    }
    
    
}])