/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.pointDetail.controller', [])
        .controller('PointDetailCtrl', ['$scope', '$state', '$mdToast','RestangularService','$stateParams','$window','$timeout', PointDetailCtrl])
    ;

    function PointDetailCtrl($scope, $state, $mdToast,RestangularService,$stateParams,$window,$timeout) {
        var stateParams=$scope.stateParams=$stateParams;
        var map=$scope.map;
        var point=$scope.point;
        console.log(stateParams);
        $scope.back=back;
        $scope.save=save;

        initData();

        function initData(){
            $scope.formObj={};
            createMap();
            getFormData();
            getRiver();
        }

        function back(){
            console.log($window);
            $window.history.go('-1');
        }

        function getFormData(){
            if(stateParams.id){
                RestangularService.all('api/river-points').customGET(stateParams.id).then(function(res){
                    if(res.status==200){
                        $scope.formObj=res.data;
                    }
                })
            }
        }

        function getRiver(){
            RestangularService.all('api/rivers').customGET(stateParams.riverId).then(function(res){
                if(res.status==200){
                    $scope.dataObj=res.data;
                    $scope.dataObj.addresses=$scope.dataObj.addresses.replace(/\'/g,'\"');
                    $scope.dataObj.addresses=angular.fromJson($scope.dataObj.addresses);
                    $timeout(function(){
                        $scope.$broadcast('map');
                        $scope.$broadcast('clickMapAddPos');
                    },100);
                }
            })
        }


        function createMap(){
            map=new BMap.Map('baiduMap');
            point = new BMap.Point(121.500757,31.3884);
            map.centerAndZoom(point,13);
            // map.addControl(new BMap.MapTypeControl());
            map.setCurrentCity('上海');
            map.enableScrollWheelZoom(true);
        }

        function save(){
            console.log($scope.formObj);
            var data=$scope.formObj;
            data.riverId=stateParams.riverId;
            RestangularService.all('api/river-points').customPOST(data).then(function(res){
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
})();
