var app = angular.module('BTAPP');
app.controller('loginCtrl', function ($scope, $state) {


    

    $scope.login = function (username, password) {

        if (username != 'undefined' || password != 'undefined') {
          //  $state.go("home.dashoard");
          angular.element(document.querySelector('[id="dim_wrapper"]')).addClass('dim');
        }



    }


});