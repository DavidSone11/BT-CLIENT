var app = angular.module('BTAPP');
app.controller('loginCtrl', function ($scope, $state, $window, authFactory) {




    if (authFactory.isLoggedIncheck()) {
        $state.go("home.dashoard");

    } else {
        $state.go("login");
    }

    $scope.login = function (username, password) {

        if (username != 'undefined' || password != 'undefined') {

            //angular.element(document.querySelector('[id="dim_wrapper"]')).addClass('dim');

            authFactory.dologin(username, password).then(function success(res) {
                $window.sessionStorage.setItem("token", res.data.token);
                $window.sessionStorage.setItem("username", res.data.username);
                $window.sessionStorage.setItem("role", res.data.role);

                $window.localStorage.setItem("token", res.data.token);
                $window.localStorage.setItem("username", res.data.username);
                $window.localStorage.setItem("role", res.data.role);
                authFactory.username = res.data.username;
                authFactory.role = res.data.role;
                authFactory.token = res.data.token;
                $state.go("home.dashoard");

            });
        }



    }


});