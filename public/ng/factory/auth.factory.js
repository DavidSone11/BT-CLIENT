var app = angular.module('BTAPP');
app.factory('authFactory', function ($window,$http) {


     return {
         isLoggedIn : false,
         isLoggedIncheck:function(){
            console.log("in isLoggedInCheck");
            if ($window.sessionStorage.token && $window.sessionStorage.username && $window.sessionStorage.role) {
                this.isLoggedIn = true;

            }else{
                this.isLoggedIn = false;
            }
         },

         dologin: function(username, password) {
            var authdata = btoa(username + ':' + password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            return $http.post("http://localhost:4000/login");

         },
         
         dologout: function() {

         
        
        }
     
    }
    

});