/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.groupList.controller',[])
        .controller('GroupListCtrl',['$scope','$mdToast','$filter','RestangularService',GroupListCtrl])
    ;

    function GroupListCtrl($scope,$mdToast,$filter,RestangularService){
        $scope.listArr;
        $scope.del=del;
        $scope.orderBy = orderBy;
        var toast;
        initData();

        function initData(){
            getGroups();
        }


        function orderBy(name){
            console.log(name);
            $scope.row=name;
            $scope.listArr=$filter('orderBy')($scope.listArr,name);
        }

        function getGroups(){
            RestangularService.all('api/groups').customGET().then(function(result){
               if(result.status==200){
                   console.log(result.data);
                   $scope.listArr=result.data;
               }
            });
        }

        function del(list){
            if(!toast){
                toast=$mdToast.simple()
                    .content('是否确定删除？')
                    .action('确定')
                    .highlightAction(true)
                    .position('top right');
                $mdToast.show(toast).then(function(res){
                    if(res=='ok'){
                        RestangularService.all('api/groups').customDELETE(list.id).then(function(result){
                            if(result.status==200){
                                $mdToast.show(
                                    $mdToast.simple()
                                        .content('删除成功！')
                                        .position('top right')
                                        .hideDelay(2000)
                                ).then(initData);
                            }else{
                                $mdToast.show(
                                    $mdToast.simple()
                                        .content('删除失败！')
                                        .position('top right')
                                        .hideDelay(2000)
                                );
                            }
                        })
                    }
                    toast=null;
                })
            }

        }


    }
})();
