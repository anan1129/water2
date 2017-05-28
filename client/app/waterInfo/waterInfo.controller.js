/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.waterInfo.controller',[])
        .controller('WaterInfoCtrl',['$scope','RestangularService','$mdToast',WaterInfoCtrl])
    ;

    function WaterInfoCtrl($scope,RestangularService,$mdToast){
        $scope.getSubGroups=getSubGroups;
        $scope.getUser=getUser;
        initData();

        function initData(){
            $scope.formObj={};
            getGroups();
        }

        function getGroups(){
            RestangularService.all('api/groups').customGET().then(function(result){
                if(result.status==200){
                    $scope.groups=result.data;
                }
            })
        }

        function getSubGroups(id){
            RestangularService.all('api/groups').customGET(id).then(function(result){
                if(result.status==200){
                    $scope.longPid=result.data;
                }
            });
        }

        function getUser(id){
            RestangularService.all('api/groups/users').get(id).then(function(result){
                console.log(result);
            })
        }

        $scope.save=function(){
            console.log($scope.formObj);
            var data=$scope.formObj;
            RestangularService.all('api/rivers').customPOST(data).then(function(result){
                console.log(result);
                if(result.status==201){
                    $mdToast.show(
                        $mdToast.simple()
                            .content('添加成功！')
                            .position('top right')
                            .hideDelay(2000)
                    );
                    initData();
                }else{
                    $mdToast.show(
                        $mdToast.simple()
                            .content('添加失败！')
                            .position('top right')
                            .hideDelay(2000)
                    );
                }
            })

        }
    }
})();
