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

        var pagObj=$scope.pagObj={
            finishing:{
                numPerPageOpt:[5,10,15],
                numPerPage:10,
                sort:'',
                onNumPerPageChange:function(){
                    $scope.pagObj.select(1);
                    return $scope.pagObj.currentPage = 1;
                },
                currentPage:1,
                totalElements:'',
                select:function(page){
                    $scope.pagObj.currentPage =page;
                    getJobs();
                }
            },
            finished:{
                numPerPageOpt:[5,10,15],
                numPerPage:10,
                sort:'',
                onNumPerPageChange:function(){
                    $scope.pagObj.select(1);
                    return $scope.pagObj.currentPage = 1;
                },
                currentPage:1,
                totalElements:'',
                select:function(page){
                    $scope.pagObj.currentPage =page;
                    getFinsihedJobs();
                }
            }

        }

        initData();

        function initData(){
           getJobs();
        }

        function getJobs(){
            var data={
                size:pagObj.finishing.numPerPage,
                page:pagObj.finishing.currentPage-1,
                sort:pagObj.finishing.sort,
            };
            RestangularService.all('api/my-jobs?isOver=false').customGET('',data).then(function(result){
                if(result.status==200){
                    console.log(result);
                    $scope.listObj.data=result.data.content;
                    $scope.pagObj.finishing.totalElements=result.data.totalElements;
                }
            });
        }

        function getFinsihedJobs(){
            var data={
                size:pagObj.finished.numPerPage,
                page:pagObj.finished.currentPage-1,
                sort:pagObj.finished.sort,
            };
            RestangularService.all('api/my-jobs?isOver=true').customGET('',data).then(function(result){
                if(result.status==200){
                    console.log(result);
                    $scope.listObj.dataed=result.data.content;
                    $scope.pagObj.finished.totalElements=result.data.totalElements;
                }
            });
        }


        function orderBy(name){
            if(name.indexOf('-')>-1){
                name=name.slice(1)+',desc';
            }
            $scope.pagObj.finishing.sort=name;
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

        $scope.loadMore = function() {
            // getJobs
            console.log(111);
        };
    }
})();
