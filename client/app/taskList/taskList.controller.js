/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.taskList.controller', [])
        .controller('TaskListCtrl', ['$scope', '$state', '$mdToast','RestangularService','$filter', TaskListCtrl])
    ;

    function TaskListCtrl($scope, $state, $mdToast,RestangularService,$filter) {
        var toast;
        $scope.toTaskDetails = toTaskDetails;
        $scope.editTask = editTask;
        $scope.edit = edit;
        $scope.orderBy=orderBy;
        $scope.listObj = {
            del: del,
            data:[]
        };

        initData();

        function initData(){
           getJobs();
        }

        function getJobs(){
            RestangularService.all('api/jobs').customGET().then(function(result){
                if(result.status==200){
                    console.log(result);
                    $scope.listObj.data=result.data;
                }
            });
        }

        function orderBy(name){
            console.log(name);
            $scope.row=name;
            $scope.listObj.data=$filter('orderBy')($scope.listObj.data,name);
        }


        function del(obj) {
            if(!toast){
                toast = $mdToast.simple()
                    .content('确定要删除该任务？')
                    .action('确定')
                    .highlightAction(true)
                    .position('top right');
                $mdToast.show(toast).then(function (response) {
                    console.log(response);
                    if(response=='ok'){
                        console.log(obj);
                        RestangularService.all('api/jobs').customDELETE(obj.id).then(function(result){
                           if(result.status==200){
                               initData();
                               toast=null;
                           }
                        });
                    }

                });
            }
        }

        function toTaskDetails(obj) {
            $state.go('task-details', obj);
        }
        function editTask(obj){
            $state.go('edit-task', obj);
        }

        function edit(list){
            $state.go('edit-task',list);
        }
    }
})();
