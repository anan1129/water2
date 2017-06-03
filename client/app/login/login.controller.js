/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.login.controller', [])
        .controller('LoginCtrl', ['$scope','$rootScope','$state', LoginCtrl])
    ;

    function LoginCtrl($scope,$rootScope,$state) {
        $scope.user={};
        // $scope.login=login;

        function login(){
            if($rootScope.loginObj[$scope.user.login]==$scope.user.pwd){
                console.log('yes');
                $scope.success=true;
                $scope.err=false;
                $rootScope.logined={
                  login:$scope.user.login
                };
                $state.go('home');
            }else{
                console.log('no');
                $scope.err=true;
                $scope.success=false;
            }
        }
    }
})();
