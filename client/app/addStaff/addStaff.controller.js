/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.addStaff.controller',[])
        .controller('AddStaffCtrl',['$scope','RestangularService','$mdToast',AddStaffCtrl])
    ;

    function AddStaffCtrl($scope,RestangularService,$mdToast){
        $scope.getSubGroups=getSubGroups;
        initData();

        // var uploader = $scope.uploader = new FileUploader({
        //     url: 'http://upload.qiniu.com/'
        // });

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
})();
