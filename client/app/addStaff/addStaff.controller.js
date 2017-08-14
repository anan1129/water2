/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addStaff.controller',[])
        .controller('AddStaffCtrl',['$scope','RestangularService','$mdToast','$stateParams','$state',AddStaffCtrl])
    ;

    function AddStaffCtrl($scope,RestangularService,$mdToast,$stateParams,$state){
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
            getUsers(stateParams.login);
            getGroups();

        }

        function getUsers(login){
            if(login){
                RestangularService.all('api/users/'+stateParams.login).customGET().then(function(result){
                    if(result.status==200){
                        $scope.formObj=result.data;
                        defaultGroup();
                        // $scope.formObj.groupName=$scope.formObj.groupName.replace('/一级节点','杨浦河长制');
                        //
                        // $scope.pidArr=$scope.formObj.groupName.split('/');
                        // console.log($scope.pidArr);
                    }
                })
            }
        }

        function getGroups(){
            RestangularService.all('api/groups-level/1').customGET().then(function(result){
                if(result.status==200){
                    $scope.groups.push(result.data);
                    if(stateParams.login){
                        $scope.pidArr[0]=angular.toJson(result.data[0]);
                        // console.log($scope.pidArr);
                        // angular.forEach(result.data,function(v,k){
                        //     if()
                        // })
                    }
                }
            });
        }

        function getSubGroups(id,index,b){
            if(!id) return;
            id=angular.fromJson(id).id;
            if(id){
                RestangularService.all('api/groups-childs').customGET(id).then(function(result){
                    if(result.status==200){
                        if(result.data.length>0){
                            // $scope.groups=$scope.groups.slice(0,index+1);
                            $scope.groups[index+1]=result.data;
                            console.log(index, $scope.groups);
                            if(b){
                                if($scope.arr[index+1]){

                                    console.log($scope.arr[index+1]);
                                    angular.forEach($scope.groups[index+1],function(v,k){
                                        if(v.name==$scope.arr[index+1]){
                                            $scope.pidArr[index+1]=angular.toJson(v);
                                        }
                                    })
                                }
                            }
                        }else{
                            if(!b){
                                $scope.groups.length=index+1;
                                $scope.pidArr.length=index+1;
                            }

                        }
                    }
                });
            }

        }

        // function defaultGroup(){
        //     if($scope.formObj.groupName){
        //         var groupName=$scope.formObj.groupName;
        //         if(groupName.indexOf('/')==0) groupName=groupName.slice(1);
        //         groupName=groupName.replace('一级节点','杨浦河长制');
        //         var arr=$scope.arr=groupName.split('/');
        //         angular.forEach(arr,function(v,k){
        //             angular.forEach($scope.groups[k],function(v2,k2){
        //                 console.log($scope.groups[k]);
        //                 if(v==v2.name){
        //                     $scope.pidArr[k]=angular.toJson(v2);
        //                     getSubGroups($scope.pidArr[k],k,true);
        //                 }
        //             })
        //         })
        //     }
        // }


        function defaultGroup(){
            if($scope.formObj.groupId){
                RestangularService.all('api/groups').customGET($scope.formObj.groupId).then(function(result){
                    if(result.status==200){
                        var allId=$scope.allId=result.data.longPid+'/'+result.data.id;
                        if(allId.indexOf('/')==0) allId=allId.slice(1);
                        allId=allId.split('/');
                        $scope.pidArr.length=allId.length;

                        $scope.arr=result.data.longPname.slice(1)+'/'+result.data.name;
                        $scope.arr=$scope.arr.replace('一级节点','杨浦河长制');
                        $scope.arr=$scope.arr.split('/');

                        angular.forEach(allId,function(v,k){
                            if(v){
                                RestangularService.all('api/groups').customGET(v).then(function(res){
                                    if(res.status==200){
                                        var data=angular.toJson(res.data);
                                        getSubGroups(data,k,true);
                                        // $scope.pidArr[k]=data;
                                    }
                                })
                            }

                        })
                    }
                })
            }
        }


        $scope.save=function(){
            var data=angular.copy($scope.formObj);
            var groupObj=angular.fromJson($scope.pidArr[$scope.pidArr.length-1]);
            if(groupObj.id) data.groupId=groupObj.id;
            if(groupObj.name) data.groupName=groupObj.name;
            delete data.password;
            console.log(data);
            if(stateParams.login){
                RestangularService.all('api/users').customPUT(data).then(function(result){
                    console.log(result);
                }).then(function(){
                    RestangularService.all('api/users-change_password/'+$scope.formObj.login).withHttpConfig({transformRequest: angular.identity}).customPOST($scope.formObj.password,undefined,undefined,{'Content-Type':'text/plain'}).then(function(result){
                        if(result.status==200){
                            $mdToast.show(
                                $mdToast.simple()
                                    .content('修改成功！')
                                    .position('top right')
                                    .hideDelay(2000)
                            );
                            $state.go('user-list');
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
                })
            }else{
                RestangularService.all('api/register').customPOST($scope.formObj.password).then(function(result){
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
