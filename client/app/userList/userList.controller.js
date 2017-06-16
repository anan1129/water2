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

        $scope.pagObj={
            numPerPageOpt:[5,10,15],
            numPerPage:10,
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
        }

        initData();

        function initData(){
           getJobs();
            getAllJobs();
        }

        function getJobs(){
            RestangularService.all('api/users?size=9999').customGET().then(function(result){
                if(result.status==200){
                    $scope.listObj.data=result.data;
                }
            });
        }

        function getAllJobs(){
            RestangularService.all('api/users?size=9999999').customGET().then(function(result){
                if(result.status==200){
                    $scope.pagObj.totalElements=result.data.length;
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
