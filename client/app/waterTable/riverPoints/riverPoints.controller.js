/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.riverPoints.controller', [])
        .controller('RiverPointsCtrl', ['$scope', '$state', '$mdToast','RestangularService','$stateParams','$window', RiverPointsCtrl])
    ;

    function RiverPointsCtrl($scope, $state, $mdToast,RestangularService,$stateParams,$window) {
        var stateParams=$scope.stateParams=$stateParams;
        var toast;
        $scope.tableData;
        $scope.toDetail=toDetail;
        $scope.edit=edit;
        $scope.del=del;
        $scope.add=add;
        $scope.back=back;




        initData()

        function initData(){
            getTableData();
        }

        function getTableData(){
            var data={
                riverId:stateParams.id
            };
            RestangularService.all('api/river-points').customGET('',data).then(function(res){
                if(res.status==200){
                    console.log(res.data);
                    $scope.tableData=res.data;
                }
            })
        }

        function toDetail(data){
            console.log(data);
            $state.go('point-detail',angular.extend(data,{riverName:stateParams.riverName}));
        }
        function edit(data){

        }
        function del(data){


            if(!toast){
                toast = $mdToast.simple()
                    .content('确定要删除该任务？')
                    .action('确定')
                    .highlightAction(true)
                    .position('top right');
                $mdToast.show(toast).then(function (response) {
                    console.log(response);
                    if(response=='ok'){
                        RestangularService.all('api/river-points').customDELETE(data.id).then(function(res){
                            if(res.status==200){
                                toast=null;
                                getTableData();
                            }
                        });
                    }

                });
            }
        }

        function add(){
            $state.go('point-detail',{riverName:stateParams.riverName,riverId:stateParams.id});
        }

        function back(){
            $window.history.go('-1');
        }
    }
})();
