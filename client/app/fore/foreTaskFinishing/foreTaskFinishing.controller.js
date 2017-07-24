/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.foreTaskFinishing.controller', [])
        .controller('ForeTaskFinishingCtrl', ['$scope', '$state', '$mdToast','RestangularService','$filter','$timeout', ForeTaskFinishingCtrl])
    ;

    function ForeTaskFinishingCtrl($scope, $state, $mdToast,RestangularService,$filter,$timeout) {
        var toast;
        $scope.orderBy=orderBy;
        $scope.title='已接受任务';
        $scope.getFinsihedJobs=getFinsihedJobs;
        $scope.getJobs=getJobs;
        $scope.download=download;
        $scope.listObj = {
            data:[],
            dataed:[]
        };
        $scope.jobsExecute=jobsExecute;

        var pageObj=$scope.pageObj={
            finishing:{
                numPerPage:5,
                sort:'',
                currentPage:0,
                totalElements:'',
                totalPages:0,
                busy:false
            },
            finished:{
                numPerPage:5,
                sort:'',
                currentPage:0,
                totalElements:'',
                totalPages:0,
                busy:false,
            }
        }

        initData();

        function initData(){

           getJobs();
        }

        function getJobs(){
            $scope.pageObj.finishing.busy=true;
            $scope.pageObj.currentType='finishing';
            var data={
                size:pageObj.finishing.numPerPage,
                page:pageObj.finishing.currentPage,
            };
            RestangularService.all('api/my-jobs?isOver=false').customGET('',data).then(function(result){
                if(result.status==200){
                    $scope.listObj.data=$scope.listObj.data.concat(result.data.content);
                    $scope.pageObj.finishing.totalElements=result.data.totalElements;
                    $scope.pageObj.finishing.totalPages=result.data.totalPages;
                    $scope.pageObj.finishing.busy=false;
                    if($scope.pageObj.finishing.currentPage>=$scope.pageObj.finishing.totalPages){
                        $scope.pageObj.finishing.busy=true;
                    }
                    $scope.pageObj.finishing.currentPage++;
                }
            });
        }

        function getFinsihedJobs(){
            $scope.pageObj.finished.busy=true;
            $scope.pageObj.currentType='finished';
            var data={
                size:pageObj.finished.numPerPage,
                page:pageObj.finished.currentPage,
                sort:pageObj.finished.sort,
            };
            RestangularService.all('api/my-jobs?isOver=true').customGET('',data).then(function(result){
                if(result.status==200){
                    $scope.listObj.dataed= $scope.listObj.dataed.concat(result.data.content);
                    $scope.pageObj.finished.totalElements=result.data.totalElements;
                    $scope.pageObj.finished.totalPages=result.data.totalPages;
                    $scope.pageObj.finished.busy=false;
                    if($scope.pageObj.finished.currentPage>=$scope.pageObj.finished.totalPages){
                        $scope.pageObj.finished.busy=true;
                    }
                    $scope.pageObj.finished.currentPage++;
                }
            });
        }


        function orderBy(name){
            if(name.indexOf('-')>-1){
                name=name.slice(1)+',desc';
            }
            $scope.pageObj.finishing.sort=name;
            console.log(name);
            getJobs();
        }

        function jobsExecute(job){
            console.log(job);
            $state.go('jobs-execute',job);
        }

        function download(filePath){
            var url=$rootScope.host+'/api/file-download?filepath='+filePath;
            $window.open(url);
        }

        $scope.loadMoreFinishing = function() {
            getJobs();

        };
        $scope.loadMoreFinished = function() {
            getFinsihedJobs();

        };
    }
})();
