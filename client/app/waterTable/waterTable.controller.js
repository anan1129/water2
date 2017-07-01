/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.waterTable.controller', [])
        .controller('WaterTableCtrl', ['$scope', '$state', '$mdToast','RestangularService','$filter', WaterTableCtrl])
    ;

    function WaterTableCtrl($scope, $state, $mdToast,RestangularService,$filter) {
        var toast;
        $scope.toWaterDetails = toWaterDetails;
        $scope.editTask = editTask;
        $scope.orderBy = orderBy;
        $scope.toRiverInfo=toRiverInfo;
        $scope.toRiverPoints=toRiverPoints;
        $scope.listObj = {
            del: del,
            data:[]
        };
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
                getRivers();
            }
        }

        initData();

        function initData(){
           getRivers();
        }

        function getRivers(){
            var data={
                size:pagObj.numPerPage,
                page:pagObj.currentPage-1,
                sort:pagObj.sort,
            };
            RestangularService.all('api/rivers/page').customGET('',data).then(function(result){
                if(result.status==200){
                    console.log(result);
                    $scope.listObj.data=result.data.content;
                    $scope.pagObj.totalElements=result.data.totalElements;
                }
            });
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
            getRivers();
        }

        function del(obj) {
            // if(!toast){
            //     toast = $mdToast.simple()
            //         .content('确定要删除该任务？')
            //         .action('确定')
            //         .highlightAction(true)
            //         .position('top right');
            //     $mdToast.show(toast).then(function (response) {
            //         console.log(response);
            //         if(response=='ok'){
            //             console.log(obj);
            //             RestangularService.all('api/jobs').customDELETE(obj.id).then(function(result){
            //                if(result.status==200){
            //                    initData();
            //                    toast=null;
            //                }
            //             });
            //         }
            //
            //     });
            // }
        }

        function toWaterDetails(obj) {
            $state.go('edit-river', obj);
        }
        function editTask(obj){
            $state.go('edit-task', obj);
        }

        function toRiverInfo(list){
            $state.go('water',list);
        }

        function toRiverPoints(list){
            $state.go('river-points',list);
        }
    }
})();
