/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.editTask.controller', [])
        .controller('EditTaskCtrl', ['$scope', '$stateParams', '$mdToast','RestangularService','$state', EditTaskCtrl])
    ;

    function EditTaskCtrl($scope, $stateParams, $mdToast,RestangularService,$state) {
        var stateParams=$scope.stateParams=$stateParams;
        $scope.getSubGroups=getSubGroups;
        $scope.save=save;
        $scope.data;

        initData();
        function initData(){
            $scope.groups=[];
            $scope.pidArr=[];
            getData(stateParams.id);
            getJob(stateParams.id);
            getGroups();
        }

        function getData(id){
            RestangularService.all('api/readily-jobs').customGET(id).then(function(result){
                if(result.status==200){
                    $scope.data=result.data;
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

        function getUsers(id){
            RestangularService.all('api/users/byGroup/'+id+'?size=10000').customGET(id).then(function(result){
                if(result.status==200){
                    $scope.users=result.data;
                }
            })
        }

        function getSubGroups(id,index){
            id=angular.fromJson(id).id;
            if(id){
                RestangularService.all('api/groups-childs').customGET(id).then(function(result){
                    if(result.status==200){
                        if(result.data.length>0){
                            $scope.groups=$scope.groups.slice(0,index+1);
                            $scope.groups[index+1]=result.data;
                        }else{
                            $scope.groups.length=index+1;
                            $scope.pidArr.length=index+1;
                            getUsers(id);
                        }
                    }
                });
            }
        }

        function getJob(id){
            RestangularService.all('api/readily-jobs').customGET(id).then(function(result){
                if(result.status==200){
                    $scope.formObj=result.data;
                }
            })
        }

        function save(){
            // $scope.user=angular.fromJson($scope.user);
            // var data=$scope.formObj;
            // data.users.push({user:$scope.user.login});

            var pid=angular.fromJson($scope.pidArr[$scope.pidArr.length-1]);
            var data={
                name:stateParams.title,
                sourceId:stateParams.id,
                source:stateParams.type,
                groupId:pid.id,
                groupName:pid.name,
                status:'已下发'
            }

            console.log(data);

            RestangularService.all('api/jobs-issued').customPOST(data).then(function(result){
                if(result.status==201){
                    console.log(result.data);
                    $state.go('task-list');
                }
            })
        }
    }
})();
