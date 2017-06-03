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
        var isPC = isPCFun();
        function isPCFun(){
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
            var flag=true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
            }
            return flag;
        }
        console.log(isPC);

        function login(){
            RestangularService.all('api/authenticate').customPOST($scope.user).then(function(result){
               console.log(result);
                if(result.status==200){
                    // $window.localStorage.id_token=result.data.id_token;
                    // $window.localStorage.username=$scope.user.username;
                    // $window.localStorage.password=$scope.user.password;
                    localStorage.removeItem('id_token');
                    localStorage.removeItem('username');

                    $window.sessionStorage.id_token=result.data.id_token;
                    $window.sessionStorage.username=$scope.user.username;
                    $scope.success=true;
                        $scope.err=false;
                        $rootScope.user={
                            username:$window.sessionStorage.username,
                            id_token:$window.sessionStorage.id_token,
                        };
                        if(isPC){
                            $state.go('dynamic-info');
                        }else{
                            $state.go('news');
                        }
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
