/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.editTask.controller', [])
        .controller('EditTaskCtrl', ['$scope', '$stateParams', '$mdToast','RestangularService', EditTaskCtrl])
    ;

    function EditTaskCtrl($scope, $stateParams, $mdToast,RestangularService) {
        var stateParams=$scope.stateParams=$stateParams;
        $scope.getSubGroups=getSubGroups;
        $scope.data;

        initData();
        function initData(){
            $scope.groups=[];
            $scope.pidArr=[];
            getData(stateParams.id);
            getGroups();
        }

        function getData(id){
            RestangularService.all('api/jobs').customGET(id).then(function(result){
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

        function getSubGroups(id,index){
            if(id){
                RestangularService.all('api/groups-childs').customGET(id).then(function(result){
                    if(result.status==200){
                        if(result.data.length>0){
                            $scope.groups=$scope.groups.slice(0,index+1);
                            $scope.groups[index+1]=result.data;
                        }else{
                            console.log($scope.pidArr);
                            RestangularService.all('api/groups').customGET(id).then(function(result){
                                if(result.status==200){
                                    console.log(result.data);
                                    $scope.users=result.data.users;
                                }
                            })
                        }
                    }
                });
            }

        }
    }
})();
