/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.dynamicInfo.controller', [])
        .controller('DynamicInfoCtrl', ['$scope', '$state', '$mdToast','RestangularService','$filter', DynamicInfoCtrl])
    ;

    function DynamicInfoCtrl($scope, $state, $mdToast,RestangularService,$filter) {
        var toast;
        $scope.orderBy=orderBy;
        $scope.listObj = {
            del: del,
            data:[],
            types:[],
            type:null
        };
        $scope.getListData=getListData;
        initData();

        function initData(){
            getNewsTypes();
            getListData();
        }

        function getNewsTypes(){
            RestangularService.all('api/news-types').customGET().then(function(result){
                if(result.status==200){
                    $scope.listObj.types=result.data;
                    return  $scope.listObj.types;
                }
            });
        }

        function getListData(id){
            console.log(id);
            RestangularService.all('api/news').customGET(id?id:'').then(function(result){
               if(result.status==200){
                   $scope.listObj.data=result.data;
               }
            });
        }
        $scope.editInfo = editInfo;

        function del(id) {
            if(!toast){
                toast = $mdToast.simple()
                    .content('确定要删除该任务？')
                    .action('确定')
                    .highlightAction(true)
                    .position('top right');
                $mdToast.show(toast).then(function (response) {
                    console.log(response);
                    if(response=='ok'){
                        RestangularService.all('api/news').customDELETE(id).then(function(result){
                            if(result.status==200){
                                getListData();
                            }
                        })
                    }
                    toast=null;
                });
            }
        }

        function orderBy(name){
            console.log(name);
            $scope.row=name;
            $scope.listObj.data=$filter('orderBy')($scope.listObj.data,name||'newsType2');
        }

        function editInfo(obj) {
            $state.go('edit-info', obj);
        }
    }
})();
