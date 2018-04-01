var app = angular.module('BTAPP');
app.directive('login', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directives/login/login.tmpl.html',
            replace: true,
            controller: function($scope,$location,$state) {

                $scope.login = function(username,password){

                      if(username!='undefined' || password !='undefined'){
                        $state.go("home.dashoard");
                      }

                }


            }
        };
    }]);