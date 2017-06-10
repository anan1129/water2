/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.waterTable.controller', [])
        .controller('WaterTableCtrl', ['$scope', '$state', '$mdToast','RestangularService', WaterTableCtrl])
    ;

    function WaterTableCtrl($scope, $state, $mdToast,RestangularService) {
        var toast;
        $scope.toRiverInfo=toRiverInfo;
        $scope.listObj = {
            del: del,
            data:[]
        };

        initData();

        function initData(){
           getRivers();
        }

        function getRivers(){
            RestangularService.all('api/rivers').customGET().then(function(result){
                if(result.status==200){
                    console.log(result);
                    $scope.listObj.data=result.data;
                }
            });
        }
        $scope.toWaterDetails = toWaterDetails;
        $scope.editTask = editTask;

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
    }
})();
