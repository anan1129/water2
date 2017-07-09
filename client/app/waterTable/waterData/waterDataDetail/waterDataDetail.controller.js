/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.waterDataDetail.controller', [])
        .controller('WaterDataDetailCtrl', ['$scope', '$state', '$mdToast','RestangularService','$stateParams','$window','$timeout','$filter', WaterDataDetailCtrl])
    ;

    function WaterDataDetailCtrl($scope, $state, $mdToast,RestangularService,$stateParams,$window,$timeout,$filter) {
        var stateParams=$scope.stateParams=$stateParams;
        var map=$scope.map;
        var point=$scope.point;
        console.log(stateParams);
        $scope.back=back;
        $scope.save=save;

        initData();

        function initData(){
            $scope.formObj={};
            getFormData();
        }

        function back(){
            console.log($window);
            $window.history.go('-1');
        }

        function getFormData(){
            if(stateParams.rpid){
                RestangularService.all('api/river-point-datas').customGET(stateParams.id).then(function(res){
                    if(res.status==200){
                        $scope.formObj=res.data;
                    }
                })
            }
        }


        function save(){
            console.log($scope.formObj);
            var data=$scope.formObj;
            data.checkdate=$filter('date')(data.checkdate,'yyyy-MM-dd');
            if(stateParams.rpid){
                RestangularService.all('api/river-point-datas').customPUT(data).then(function(res){
                    if(res.status==200){
                        // $mdToast.show(
                        //     $mdToast.simple()
                        //         .content('添加成功!')
                        //         .position('top right')
                        //         .hideDelay(2000)
                        // );
                        // initData();
                        $window.history.go('-1');
                    }else{
                        $mdToast.show(
                            $mdToast.simple()
                                .content('添加失败！')
                                .position('top right')
                                .hideDelay(2000)
                        );
                    }
                })
            }else{
                data.rpid=stateParams.id;
                console.log(data);
                RestangularService.all('api/river-point-datas').customPOST(data).then(function(res){
                    if(res.status==201){
                        // $mdToast.show(
                        //     $mdToast.simple()
                        //         .content('添加成功!')
                        //         .position('top right')
                        //         .hideDelay(2000)
                        // );
                        // initData();
                        $window.history.go('-1');
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
