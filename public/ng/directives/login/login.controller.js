var app = angular.module('BTAPP');
app.controller('loginCtrl', function ($scope, $state,authFactory) {


    

    $scope.login = function (username, password) {

        if (username != 'undefined' || password != 'undefined') {
          //  $state.go("home.dashoard");
          //angular.element(document.querySelector('[id="dim_wrapper"]')).addClass('dim');

          authFactory.dologin(username,password).then(function success(res){
              console.log(res);

          });
        }



    }


});