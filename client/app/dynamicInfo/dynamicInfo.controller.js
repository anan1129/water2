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
                getListData();
            }
        }
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
            var data={
                size:pagObj.numPerPage,
                page:pagObj.currentPage-1,
                sort:pagObj.sort,
            };
            RestangularService.all('api/news-page').customGET(id?id:'',data).then(function(result){
               if(result.status==200){
                   $scope.listObj.data=result.data.content;
                   $scope.pagObj.totalElements=result.data.totalElements;
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

        // function orderBy(name){
        //     console.log(name);
        //     $scope.row=name;
        //     $scope.listObj.data=$filter('orderBy')($scope.listObj.data,name||'newsType2');
        // }
        function orderBy(name){
            if(name.indexOf('-')>-1){
                name=name.slice(1)+',desc';
            }
            $scope.pagObj.sort=name;
            console.log(name);
            getListData();
        }

        function editInfo(obj) {
            $state.go('edit-info', obj);
        }
    }
})();
