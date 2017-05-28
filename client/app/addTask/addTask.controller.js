/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.addTask.controller', [])
        .controller('AddTaskCtrl', ['$scope', 'RestangularService', '$filter', AddTaskCtrl])
    ;

    function AddTaskCtrl($scope, RestangularService, $filter) {
        $scope.users = [];
        initData();

        function initData(){
            $scope.formObj = {
                users:[]
            };
            getUsers();
        }

        function getUsers(){
            RestangularService.all('api/users').customGET().then(function(result){
               if(result.status==200){
                   console.log(result);
               }
            });
        }

        $scope.save = function () {
            console.log($scope.formObj);
            var data=$scope.formObj;
            // data.mangeuser=localStorage.mangeuser||'';
            // data.status="已上报";
            // data.source=""
            RestangularService.all('api/jobs').customPOST(data).then(function(result){
                console.log(result);
                if(result.status==201){
                    $mdToast.show(
                        $mdToast.simple()
                            .content('添加成功！')
                            .position('top right')
                            .hideDelay(2000)
                    );
                    initData();
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

        $scope.$watch('formObj.keyword', function (n, o) {
            if (angular.equals(n, o)) return;
            console.log(n);
            if (!$scope.formObj.keyword) {
                $scope.formObj.users = [];
                return;
            }
            $scope.formObj.users = $filter('filter')(users, n);
        })
    }
})();
