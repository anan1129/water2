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
        $scope.pidArr=[];
        $scope.users=[];
        $scope.groups=[];
        initData();
        function initData(){
            $scope.formObj={
                users:[]
            };
            $scope.pidArr=[];
            $scope.users=[];
            $scope.groups=[];
            getGroups();
            // getMaxL();
            getUsers();
        }

        function getUsers(){
            RestangularService.all('api/users?size=999999').customGET().then(function(result){
                if(result.status==200){
                    console.log(result);
                    angular.forEach(result.data,function(val){
                        $scope.users.push({user:val.login,userName:val.firstName});
                    })
                    console.log($scope.users.length);
                }
            })
        }

        function getGroups(){
            RestangularService.all('api/groups-level/1').customGET().then(function(result){
                if(result.status==200){
                    $scope.groups.push(result.data);
                    // getSubGroups(result.data[0].id,0);
                }
            });
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
            data.pid=$scope.pidArr[$scope.pidArr.length-1];
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
