/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addGroup.controller',[])
        .controller('AddGroupCtrl',['$scope','$mdToast','$filter','RestangularService',AddGroupCtrl])
    ;

    function AddGroupCtrl($scope,$mdToast,$filter,RestangularService){

        $scope.getSubGroups=getSubGroups;
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

        $scope.save=function(){
           console.log($scope.formObj);
            var data=$scope.formObj;
            RestangularService.all('api/groups').customPOST(data).then(function(result){
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
