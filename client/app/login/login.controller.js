/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.login.controller', [])
        .controller('LoginCtrl', ['$scope','$rootScope','$state','RestangularService','$window', LoginCtrl])
    ;

    function LoginCtrl($scope,$rootScope,$state,RestangularService,$window) {
        $scope.user={};
        $scope.login=login;

        function login(){
            RestangularService.all('api/authenticate').customPOST($scope.user).then(function(result){
               console.log(result);
                if(result.status==200){
                    // $window.localStorage.id_token=result.data.id_token;
                    // $window.localStorage.username=$scope.user.username;
                    // $window.localStorage.password=$scope.user.password;
                    localStorage.removeItem('id_token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');

                    $window.sessionStorage.id_token=result.data.id_token;
                    $window.sessionStorage.username=$scope.user.username;
                    $window.sessionStorage.password=$scope.user.password;
                    $scope.success=true;
                        $scope.err=false;
                        $rootScope.user={
                            username:$window.sessionStorage.username,
                            password:$window.sessionStorage.password,
                            id_token:$window.sessionStorage.id_token,
                        };
                        $state.go('home');
                }
            },function(result){
                $scope.err=true;
                $scope.success=false;
            });
            // if($rootScope.loginObj[$scope.user.login]==$scope.user.pwd){
            //     console.log('yes');
            //     $scope.success=true;
            //     $scope.err=false;
            //     $rootScope.logined={
            //       login:$scope.user.login
            //     };
            //     $state.go('home');
            // }else{
            //     console.log('no');
            //     $scope.err=true;
            //     $scope.success=false;
            // }
        }
    }
})();
