/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.taskList.controller', [])
        .controller('TaskListCtrl', ['$scope', '$state', '$mdToast','RestangularService','$filter','$rootScope', TaskListCtrl])
    ;

    function TaskListCtrl($scope, $state, $mdToast,RestangularService,$filter,$rootScope) {
        var toast;
        $scope.toTaskDetails = toTaskDetails;
        $scope.toTaskDetails2 = toTaskDetails2;
        $scope.editTask = editTask;
        $scope.edit = edit;
        $scope.orderBy=orderBy;
        $scope.listObj = {
            del: del,
            data:[]
        };

        var pagObj=$scope.pagObj={
            numPerPageOpt:[5,10,15],
            numPerPage:15,
            sort:'createdDate,desc',
            onNumPerPageChange:function(){
                $scope.pagObj.select(1);
                return $scope.pagObj.currentPage = 1;
            },
            currentPage:1,
            totalElements:'',
            busy:false,
            select:function(page){
                $scope.pagObj.currentPage =page;
                getJobs();
            }
        }

        initData();

        function initData(){
            if($scope.isPC){
                getJobs();
            }
        }

        function initObj(){
            $scope.pagObj.currentPage=1;
            $scope.listObj.data=[];
        }

        function getJobs(){
            $scope.pagObj.busy=true;
            var data={
                size:pagObj.numPerPage,
                page:pagObj.currentPage-1,
                sort:pagObj.sort,
            };
            RestangularService.all('api/readily-jobs/page').customGET('',data).then(function(result){
                if(result.status==200){
                    console.log(result);
                    if($scope.isPC){
                        $scope.listObj.data=result.data.content;
                        $scope.pagObj.totalElements=result.data.totalElements;
                    }else{
                        $scope.listObj.data=$scope.listObj.data.concat(result.data.content);
                        $scope.pagObj.totalElements=result.data.totalElements;
                        $scope.pagObj.totalPages=result.data.totalPages;
                        $scope.pagObj.busy=false;
                        if($scope.pagObj.currentPage>=$scope.pagObj.totalPages){
                            $scope.pagObj.busy=true;
                            $scope.noData='没有数据了！';
                        }
                        $scope.pagObj.currentPage++;
                    }
                }
            });
        }

        $scope.loadMore=loadMore;

        function loadMore(){
            getJobs();
        }

        // function orderBy(name){
        //     console.log(name);
        //     $scope.row=name;
        //     $scope.listObj.data=$filter('orderBy')($scope.listObj.data,name);
        // }
        function orderBy(name){
            if(name.indexOf('-')>-1){
                name=name.slice(1)+',desc';
            }
            $scope.pagObj.sort=name;
            console.log(name);
            getJobs();
        }


        function del(obj) {
            console.log(obj);
            if(true){
                toast = $mdToast.simple()
                    .content('确定要删除该任务？')
                    .action('确定')
                    .highlightAction(true)
                    .position('top right');
                $mdToast.show(toast).then(function (response) {
                    console.log(response);
                    if(response=='ok'){
                        console.log(obj);
                        RestangularService.all('api/readily-jobs').customDELETE(obj.id).then(function(result){
                           if(result.status==200){
                               initData();
                               toast=null;
                           }
                        }).then(function(){
                            initObj();
                            getJobs();
                        });
                    }

                });
            }
        }

        function toTaskDetails(obj) {
            if($scope.isPC){
                $state.go('task-details', obj);
            }else{
                $state.go('fore-task-details-manage', obj);
            }
        }

        function toTaskDetails2(obj) {
            $state.go('fore-task-details-manage2', obj);
        }

        function editTask(obj){
            $state.go('edit-task', obj);
        }

        function edit(list){
            console.log(list);
            if($rootScope.isPC){
                $state.go('edit-task',list);
            }else{
                $state.go('fore-edit-task-manage',list);
            }

        }
    }
})();
