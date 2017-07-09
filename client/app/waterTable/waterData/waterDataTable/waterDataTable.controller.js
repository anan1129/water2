/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.waterDataTable.controller', [])
        .controller('WaterDataTableCtrl', ['$scope', '$state', '$mdToast','RestangularService','$stateParams','$window', WaterDataTableCtrl])
    ;

    function WaterDataTableCtrl($scope, $state, $mdToast,RestangularService,$stateParams,$window) {
        var stateParams=$scope.stateParams=$stateParams;
        console.log(stateParams);
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
                rpid:stateParams.id
            };
            RestangularService.all('api/river-point-datas').customGET('',data).then(function(res){
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
            $state.go('water-data-detail-edit',data);
        }
        function del(data){
            if(true){
                toast = $mdToast.simple()
                    .content('确定要删除该任务？')
                    .action('确定')
                    .highlightAction(true)
                    .position('top right');
                $mdToast.show(toast).then(function (response) {
                    console.log(response);
                    if(response=='ok'){
                        RestangularService.all('api/river-point-datas').customDELETE(data.id).then(function(res){
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
            $state.go('water-data-detail-look',stateParams);
        }

        function back(){
            $window.history.go('-1');
        }

        $scope.submitExcel=submitExcel;
        function submitExcel(){
            var f=new FormData();
            var file = document.querySelector('input[type=file]').files[0];
            console.log(file);
            f.append('file',file);
            console.log(f);
            RestangularService.all('api/river-point-dataUpload/'+stateParams.id).withHttpConfig({transformRequest: angular.identity}).customPOST(f,undefined,undefined,{'Content-Type':undefined}).then(function(res){
                if(res.status==200){
                    // angular.forEach(res.data,function(val){
                    //
                    // })
                    getTableData();
                }
            })
        }
    }
})();
