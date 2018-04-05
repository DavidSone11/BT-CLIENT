var app = angular.module('BTAPP');
app.directive('sidebar', ['$compile', function ($compile) {
    return {
        restrict: 'E',
        templateUrl: 'ng/directives/sidebar/sidebar.tmpl.html',
        replace: true,
        controller: function ($scope, $location, $state, authFactory, $window, $timeout) {

            $scope.logout = function () {
                $timeout(function () {
                    authFactory.dologout().then(function success(res) {
                        console.log(res);
                        if (res.status == 200) {
                            $window.localStorage.removeItem("token");
                            $window.localStorage.removeItem("username");
                            $window.localStorage.removeItem("role");
                            $window.sessionStorage.removeItem("token");
                            $window.sessionStorage.removeItem("username");
                            $window.sessionStorage.removeItem("role");
                            $state.go("login");
                        }

                    }, function error(err) {
                        console.log(err);
                    })

                }, 2000);
            }



        }
    };
}]);