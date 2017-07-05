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
        var pagObj=$scope.pagObj={
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
                getTableData();
            }
        }




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
                    $scope.pagObj.totalElements=res.data.totalElements;
                }
            })
        }

        function orderBy(name){
            if(name.indexOf('-')>-1){
                name=name.slice(1)+',desc';
            }
            $scope.pagObj.sort=name;
            console.log(name);
            getTableData();
        }

        function toDetail(data){
            console.log(data);
            $state.go('point-detail',angular.extend(data,{riverName:stateParams.riverName}));
        }
        function edit(data){
            console.log(data);
            $state.go('point-detail',angular.extend(data,{riverName:stateParams.riverName}));
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
