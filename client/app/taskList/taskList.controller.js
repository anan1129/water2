/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.taskList.controller', [])
        .controller('TaskListCtrl', ['$scope', '$state', '$mdToast','GlobalData', TaskListCtrl])
    ;

    function TaskListCtrl($scope, $state, $mdToast,GlobalData) {
        var toast;
        // $scope.listObj = {
        //     del: del,
        //         data: [
        //         {id: 1, title: '平凉路渡口轻微污染', progress: '已上报', preson: ['张三', '李四', '王五']},
        //         {id: 2, title: '杨浦滨江段水有漂浮物', progress: '正在处理', preson: ['张三', '李四', '王五']},
        //         {id: 3, title: '翔殷路段水里有漂浮物', progress: '处理完成', preson: ['张三', '李四', '王五']}
        //     ]
        // }
        $scope.listObj = {
            del: del,
            data:GlobalData.jobs
        };
        $scope.toTaskDetails = toTaskDetails;
        $scope.editTask = editTask;

        function del(index) {
            if(!toast){
                toast = $mdToast.simple()
                    .content('确定要删除该任务？')
                    .action('确定')
                    .highlightAction(true)
                    .position('top right');
                $mdToast.show(toast).then(function (response) {
                    console.log(response);
                    if(response=='ok'){
                        $scope.listObj.data.splice(index,1);
                    }
                    toast=null;
                });
            }
        }

        function toTaskDetails(obj) {
            $state.go('task-details', obj);
        }
        function editTask(obj){
            $state.go('edit-task', obj);
        }
    }
})();
