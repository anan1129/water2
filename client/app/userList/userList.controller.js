/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.userList.controller', [])
        .controller('UserListCtrl', ['$scope', '$state', '$mdToast','RestangularService', UserListCtrl])
    ;

    function UserListCtrl($scope, $state, $mdToast,RestangularService) {
        var toast;
        $scope.listObj = {
            del: del,
            data:[]
        };

        initData();

        function initData(){
           getJobs();
        }

        function getJobs(){
            RestangularService.all('api/users').customGET().then(function(result){
                if(result.status==200){
                    $scope.listObj.data=result.data;
                }
            });
        }
        $scope.toTaskDetails = toTaskDetails;
        $scope.editTask = editTask;

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
                        RestangularService.all('api/users?size=9999').customDELETE(obj.id).then(function(result){
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
            $state.go('add-staff', obj);
        }
        function editTask(obj){
            $state.go('add-staff', obj);
        }
    }
})();
