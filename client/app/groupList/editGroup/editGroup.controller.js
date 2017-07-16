/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.editGroup.controller',[])
        .controller('EditGroupCtrl',['$scope','$mdToast','$filter','RestangularService','$stateParams','$window',EditGroupCtrl])
    ;

    function EditGroupCtrl($scope,$mdToast,$filter,RestangularService,$stateParams,$window){
        var statePararms=$scope.stateParams=$stateParams;
        console.log(statePararms);
        $scope.getSubGroups=getSubGroups;
        $scope.pidArr=[];
        $scope.users=[];
        $scope.groups=[];
        initData();
        function initData(){
            $scope.formObj={};
            $scope.pidArr=[];
            $scope.users=[];
            $scope.groups=[];
            getGroups();
        }


        function getGroups(){
            RestangularService.all('api/groups-level/1').customGET().then(function(result){
                if(result.status==200){
                    $scope.groups.push(result.data);
                    // getSubGroups(result.data[0].id,0);
                }
            });
            RestangularService.all('api/groups').customGET(statePararms.id).then(function(result){
                if(result.status==200){
                    $scope.formObj=result.data;
                }
            })
        }

        function getSubGroups(id,index){
            console.log(id);
            if(id){
                RestangularService.all('api/groups-childs').customGET(id).then(function(result){
                    if(result.status==200){
                        console.log(result.data);
                        if(result.data.length>0){
                            $scope.groups=$scope.groups.slice(0,index+1);
                            $scope.groups[index+1]=result.data;
                            console.log(index);
                        }else{
                            $scope.groups.length=index+1;
                        }
                    }
                });
            }

        }

        // function getMaxL(){
        //     RestangularService.all('api/groups-maxLevel').customGET().then(function(result){
        //         if(result.status==200){
        //             console.log(result.data);
        //             $scope.levelArr=[];
        //             $scope.levelArr.length=result.data;
        //             console.log($scope.levelArr);
        //         }
        //     })
        // }

        $scope.save=function(){

            var data=$scope.formObj;
            if(statePararms.pid) data.pid=statePararms.pid;
            if($scope.pidArr.length>0) data.pid=$scope.pidArr[$scope.pidArr.length-1];
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
                            .content('修改成功！')
                            .position('top right')
                            .hideDelay(2000)
                    );
                    // initData();
                    $window.history.go(-1);
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
