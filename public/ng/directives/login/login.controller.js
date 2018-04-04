var app = angular.module('BTAPP');
app.controller('loginCtrl', function ($scope, $state, $window,authFactory) {




    $scope.login = function (username, password) {

        if (username != 'undefined' || password != 'undefined') {
            
            //angular.element(document.querySelector('[id="dim_wrapper"]')).addClass('dim');

            authFactory.dologin(username, password).then(function success(res) {
                $window.sessionStorage.setItem("token", res.data.token);
                $window.sessionStorage.setItem("username", res.data.username);
                $window.sessionStorage.setItem("role", res.data.role);
                 $state.go("home.dashoard");

            });
        }



    }


});