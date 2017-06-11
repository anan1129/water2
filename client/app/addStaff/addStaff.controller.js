/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addStaff.controller',[])
        .controller('AddStaffCtrl',['$scope','RestangularService','$mdToast','$stateParams',AddStaffCtrl])
    ;

    function AddStaffCtrl($scope,RestangularService,$mdToast,$stateParams){
        var stateParams=$scope.stateParams=$stateParams;
        $scope.getSubGroups=getSubGroups;
        initData();

        // var uploader = $scope.uploader = new FileUploader({
        //     url: 'http://upload.qiniu.com/'
        // });

        function initData(){
            $scope.formObj={};
            $scope.groups=[];
            $scope.pidArr=[];
            getGroups();
            getUsers(stateParams.login);
        }

        function getUsers(login){
            if(login){
                RestangularService.all('api/users/'+stateParams.login).customGET().then(function(result){
                    if(result.status==200){
                        $scope.formObj=result.data;
                    }
                })
            }
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
            console.log(angular.fromJson(id));
            id=angular.fromJson(id).id;
            if(id){
                RestangularService.all('api/groups-childs').customGET(id).then(function(result){
                    if(result.status==200){
                        console.log(result.data);
                        if(result.data.length>0){
                            $scope.groups=$scope.groups.slice(0,index+1);
                            $scope.groups[index+1]=result.data;
                        }else{
                            $scope.groups.length=index+1;
                            $scope.pidArr.length=index+1;
                        }
                    }
                });
            }

        }


        $scope.save=function(){
            var data=$scope.formObj;
            var groupObj=angular.fromJson($scope.pidArr[$scope.pidArr.length-1]);
            if(!data.groupId) data.groupId=groupObj.id;
            if(!data.groupName) data.groupName=groupObj.name;
            console.log(data);
            if(stateParams.login){
                RestangularService.all('api/users').customPUT(data).then(function(result){
                    console.log(result);
                    if(result.status==200){
                        $mdToast.show(
                            $mdToast.simple()
                                .content('修改成功！')
                                .position('top right')
                                .hideDelay(2000)
                        );
                        // initData();
                    }else{
                        $mdToast.show(
                            $mdToast.simple()
                                .content('修改失败！')
                                .position('top right')
                                .hideDelay(2000)
                        );
                    }
                })
            }else{
                RestangularService.all('api/register').customPOST(data).then(function(result){
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
    }
})();
