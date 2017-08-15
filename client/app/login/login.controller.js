/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.login.controller', [])
        .controller('LoginCtrl', ['$scope','$rootScope','$state','RestangularService','$window', LoginCtrl])
        .controller('MLoginCtrl', ['$scope','$rootScope','$state','RestangularService','$window', MLoginCtrl])
    ;

    function LoginCtrl($scope,$rootScope,$state,RestangularService,$window) {
        $scope.user={};
        $scope.login=login;
        $scope.cancel=cancel;
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
            $window.sessionStorage.removeItem('id_token');
            $window.sessionStorage.removeItem('username');
            $rootScope.username='';
            $rootScope.user={
                username:'',
                id_token:'',
            };
            RestangularService.all('api/authenticate').customPOST($scope.user).then(function(result){
                if(result.status==200){
                    // $window.localStorage.id_token=result.data.id_token;
                    // $window.localStorage.username=$scope.user.username;
                    // $window.localStorage.password=$scope.user.password;
                    // localStorage.removeItem('id_token');
                    // localStorage.removeItem('username');
                    console.log($scope.user);

                    $window.sessionStorage.id_token=result.data.id_token;
                    $window.sessionStorage.username=$scope.user.username;
                    $rootScope.username=$scope.user.username;
                    $scope.success=true;
                    $scope.err=false;
                    $rootScope.user={
                        username:$window.sessionStorage.username,
                        id_token:$window.sessionStorage.id_token,
                    };
                    getAccount();
                }
            },function(result){
                $scope.err=true;
                $scope.success=false;
            });
        }

        function getAccount(){

                RestangularService.all('api/account').customGET().then(function(res){
                    if(res.status==200){
                        console.log(res);
                    }
                }).then(function(){
                RestangularService.all('api/my-group').customGET().then(function(res){
                    if(res.status==200){
                        $rootScope.account=res.data;
                    }
                },function(res){
                    console.log(res);
                    if(res.status==404){
                        $rootScope.account.guest=true;
                    }
                })
            }).then(function(){
                if(isPC){
                    // $state.go('dynamic-info');
                    $state.go('dashboard');
                }else{
                    $state.go('home');
                }
            })
        }

        function cancel(){
            $window.history.go(-1);
        }
    }

    function MLoginCtrl($scope,$rootScope,$state,RestangularService,$window) {
        $scope.user={};
        $scope.login=login;
        $scope.cancel=cancel;
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
            $window.sessionStorage.removeItem('id_token');
            $window.sessionStorage.removeItem('username');
            $rootScope.username='';
            $rootScope.user={
                username:'',
                id_token:'',
            };
            RestangularService.all('api/authenticate').customPOST($scope.user).then(function(result){
                if(result.status==200){
                    // $window.localStorage.id_token=result.data.id_token;
                    // $window.localStorage.username=$scope.user.username;
                    // $window.localStorage.password=$scope.user.password;
                    // localStorage.removeItem('id_token');
                    // localStorage.removeItem('username');
                    console.log($scope.user);

                    $window.sessionStorage.id_token=result.data.id_token;
                    $window.sessionStorage.username=$scope.user.username;
                    $rootScope.username=$scope.user.username;
                    $scope.success=true;
                    $scope.err=false;
                    $rootScope.user={
                        username:$window.sessionStorage.username,
                        id_token:$window.sessionStorage.id_token,
                    };
                    getAccount();
                }
            },function(result){
                $scope.err=true;
                $scope.success=false;
            });
        }

        function getAccount(){

            RestangularService.all('api/account').customGET().then(function(res){
                if(res.status==200){
                    console.log(res);
                }
            }).then(function(){
                RestangularService.all('api/my-group').customGET().then(function(res){
                    if(res.status==200){
                        $rootScope.account=res.data;
                    }
                },function(res){
                    console.log(res);
                    if(res.status==404){
                        $rootScope.account.guest=true;
                    }
                })
            }).then(function(){
                if(isPC){
                    // $state.go('dynamic-info');
                    $state.go('dashboard');
                }else{
                    $state.go('home');
                }
            })
        }

        function cancel(){
            $window.history.go(-1);
        }
    }
})();
