var app = angular.module('BTAPP');
app.factory('authFactory', function ($window, $http) {


    return {
        isLoggedIn: false,
        isLoggedIncheck: function () {
            if ($window.sessionStorage.token && $window.sessionStorage.username && $window.sessionStorage.role,
                $window.localStorage.token && $window.localStorage.username && $window.localStorage.role
            ) {
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
                delete this.username;
                delete this.role;
                delete this.token;
                $window.localStorage.removeItem("token");
                $window.localStorage.removeItem("username");
                $window.localStorage.removeItem("role");
                $window.sessionStorage.removeItem("token");
                $window.sessionStorage.removeItem("username");
                $window.sessionStorage.removeItem("role");
            }
            return (this.isLoggedIn) ? this.isLoggedIn : false;
           // return this.isLoggedIn;
        },

        dologin: function (username, password) {
            var authdata = btoa(username + ':' + password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            return $http.post("http://localhost:4000/login");

        },

        dologout: function () {



        }

    }


});