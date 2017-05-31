/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.waterInfo.controller',[])
        .controller('WaterInfoCtrl',['$scope','RestangularService','$mdToast',WaterInfoCtrl])
    ;

    function WaterInfoCtrl($scope,RestangularService,$mdToast){
        $scope.getLevel=getLevel;
        $scope.getUsers=getUsers;
        $scope.getGroups=getGroups;
        $scope.getSubGroups=getSubGroups;
        initData();

        function initData(){
            $scope.formObj={};
            getMaxL();
            getUsers();
            $scope.pidArr=[];
            $scope.groups=[];
            getGroups();
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

        function getLevel(level){
            console.log(level);
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

        function getUsers(id){
            console.log(id);
            if(id){
                RestangularService.all('api/groups').customGET(id).then(function(result){
                    if(result.status==200){
                        $scope.users=result.data.users;
                        console.log($scope.users);
                    }
                })
            }else{
                RestangularService.all('api/users').customGET().then(function(result){
                    if(result.status==200){
                        $scope.users=result.data;
                    }
                })
            }
            console.log($scope.users);

        }

        function getGroups(){
            RestangularService.all('api/groups-level/1').customGET().then(function(result){
                if(result.status==200){
                    $scope.groups.push(result.data);
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

        function getUser(){
            RestangularService.all('api/groups/users').get().then(function(result){
                console.log(result);
            })
        }

        $scope.save=function(){
            console.log($scope.formObj);
            var data=$scope.formObj;
            angular.forEach(data.secondManagers,function(val,key){
                if(val){
                    var json=angular.fromJson(val)
                    console.log(json);
                    data.secondManagers[key]={
                        user:json.login,
                    };
                }
            });
            data.manager={
                user:angular.fromJson(data.manager).login,
                // id:angular.fromJson(data.manager).id,
                // userName:angular.fromJson(data.manager).firstName,
                // department:angular.fromJson(data.manager).department
            }
            console.log(data);
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

