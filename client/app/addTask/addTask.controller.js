/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.addTask.controller', [])
        .controller('AddTaskCtrl', ['$scope', 'RestangularService', '$filter','$mdToast', AddTaskCtrl])
    ;

    function AddTaskCtrl($scope, RestangularService, $filter,$mdToast) {
        var users = [],resultData;

        initData();

        function initData(){
            $scope.formObj = {
                users:[]
            };
            $scope.filterUsers=[];
            users=[];
            getUsers();
        }

        function getUsers(){
            RestangularService.all('api/users').customGET().then(function(result){
               if(result.status==200){
                   console.log(result);
                   resultData=result.data;
                   angular.forEach(result.data,function(val){
                       users.push(val.firstName);
                   })

               }
            });
        }

        $scope.save = function () {
            console.log($scope.formObj);
            var data=$scope.formObj;
            angular.forEach($scope.filterUsers,function(val1){
               angular.forEach(resultData,function(val2){
                   if(val2.firstName==val1){
                        console.log(val1);
                       $scope.formObj.users.push({user:val2.login});
                       console.log($scope.formObj.users);
                   }
               })
            });
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

            if (!$scope.formObj.keyword) {
                $scope.formObj.users = [];
                return;
            }
            $scope.filterUsers = $filter('filter')(users, n);
            console.log(n, $scope.filterUsers);
        })
    }
})();
