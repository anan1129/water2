/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.home.controller',[])
        .controller('HomeCtrl',['$scope','RestangularService','$state','$window','$rootScope','$mdDialog',HomeCtrl])
    ;

    function HomeCtrl($scope,RestangularService,$state,$window,$rootScope,$mdDialog){
        // console.log($window.localStorage);
        $scope.username=$window.sessionStorage.username;
        console.log($scope.username);
        $scope.toDetail=toDetail;
        $scope.login=login;
        $scope.logout=logout;


        initData();

        function initData(){
            getJobs();
            getRivers();
            getAccount();
        }
        $scope.customClass={

        }

        function getJobs(){
            RestangularService.all('api/jobs-status/page?status=已下发').customGET().then(function(res){
                if(res.status==200&&res.data.content.length>0&&!$rootScope.openDialog){
                    // $state.go('fore-task-list');
                    $mdDialog.show({
                        templateUrl:'app/home/dialog.html',
                        // template:'<div class="modal-body"><div ng-include="\'app/fore/foreTaskList/foreTaskList.html\'"></div></div>',
                        clickOutsideToClose:true,
                        controller:['$scope','$mdDialog',function($scope,$mdDialog){
                            $scope.title='任务单';
                            $scope.hideHeader=true;
                            $scope.close=function(){
                                $mdDialog.cancel();
                            }
                        }]
                    });
                    $rootScope.openDialog=true;
                }
            });
        }

        function getAccount(){
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
        }

        function getRivers(){
            RestangularService.all('api/rivers').customGET().then(function(result){
                if(result.status==200){
                    $scope.riverData=result.data;

                    // angular.forEach($scope.riverData,function(val){
                    //     console.log(val.riverName);
                    // })
                }
            })
        }

        function toDetail(river){

            // if(river.riverName=="吉浦河"||river.riverName=="小吉浦"||river.riverName=="东走马塘"||river.riverName=="复兴岛运河"||river.riverName=="虬江"||river.riverName=="钱家浜"||river.riverName=="杨浦滨江"||river.riverName=="杨树浦港"||river.riverName=="纬一河"||river.riverName=="纬二河"||river.riverName=="纬三河"||river.riverName=="纬四河"||river.riverName=="纬五河"||river.riverName=="纬六河"||river.riverName=="纬七河"||river.riverName=="经一河"||river.riverName=="经二河"||river.riverName=="经三河"){
            //     console.log(river);
            //     $state.go('water',river);
            // }
            $state.go('water',river);

        }

        function login(){
            $state.go('login');
        }

        function logout(){
            $window.sessionStorage.removeItem('username');
            $window.sessionStorage.removeItem('id_token');
            $rootScope.user={};
            $rootScope.userName=null;
        }
    }
})();
