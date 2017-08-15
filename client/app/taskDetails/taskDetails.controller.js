/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.taskDetails.controller',[])
        .controller('TaskDetailsCtrl',['$scope','$stateParams','RestangularService','$window',TaskDetailsCtrl])
        .controller('TaskDetails2Ctrl',['$scope','$stateParams','RestangularService',TaskDetails2Ctrl])
    ;

    function TaskDetailsCtrl($scope,$stateParams,RestangularService,$window){
        $scope.stateParams=$stateParams;
        $scope.download=download;
        console.log($stateParams.users);
        initData();

        function initData(){
            getData();
        }

        function download(filePath){
            var url=$scope.host+'/api/file-download?filepath='+filePath;
            $window.open(url);
        }

        function getData(){
            RestangularService.all('api/jobs').customGET($stateParams.id).then(function(result){
                if(result.status==200){
                    $scope.data=result.data;
                }
            })
        }
    }

    function TaskDetails2Ctrl($scope,$stateParams,RestangularService){
        $scope.stateParams=$stateParams;
        console.log($stateParams.users);
        initData();

        function initData(){
            getData();
        }

        function getData(){
            RestangularService.all('api/readily-jobs').customGET($stateParams.id).then(function(result){
                if(result.status==200){
                    $scope.data=result.data;
                }
            })
        }
    }
})();
