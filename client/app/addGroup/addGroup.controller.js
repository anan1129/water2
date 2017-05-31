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
        $scope.users=[];
        initData();
        function initData(){
            $scope.formObj={
                users:[]
            };
            getGroups();
            getMaxL();
            getUsers();
        }

        function getUsers(){
            RestangularService.all('api/users').customGET().then(function(result){
                if(result.status==200){
                    console.log(result);
                    angular.forEach(result.data,function(val){
                        $scope.users.push({user:val.login,userName:val.firstName});
                    })
                    console.log($scope.users);
                }
            })
        }

        function getGroups(){
            RestangularService.all('api/groups').customGET().then(function(result){
                if(result.status==200){
                    $scope.groups=result.data;
                }
            })
        }

        function getSubGroups(level){

            if(level){
                RestangularService.all('api/groups-level').customGET(level).then(function(result){
                    if(result.status==200){
                        $scope.groups=result.data;
                    }
                });
            }else{
                getGroups();
            }

        }

        function getMaxL(){
            RestangularService.all('api/groups-maxLevel').customGET().then(function(result){
                if(result.status==200){
                    console.log(result.data);
                    $scope.levelArr=[];
                    $scope.levelArr.length=result.data;
                    console.log($scope.levelArr);
                }
            })
        }

        $scope.save=function(){

            var data=$scope.formObj;
            data.pid=data.pid?data.pid:$scope.level;
            // data.users=angular.fromJson(data.users);
            angular.forEach(data.users,function(val,key){
                data.users[key]=angular.fromJson(val);
            })
            console.log(data.users);
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
