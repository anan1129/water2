/**
 * Created by zhengan on 2017/5/22.
 */
(function () {
    'use strict';

    angular.module('app.news.controller', [])
        .controller('NewsCtrl', ['$scope', '$state', '$mdToast','RestangularService', NewsCtrl])
    ;

    function NewsCtrl($scope, $state, $mdToast,RestangularService) {
        var toast;
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
                console.log(result);
                if(result.status==200){
                    $scope.listObj.types=result.data;
                }
            }).then(function(){
                RestangularService.all('api/news-show-top?newsType=新闻动态&newsType2='+$scope.listObj.types[0].name).customGET().then(function(result){
                    if(result.status==200){
                        console.log( $scope.listObj.types);
                        $scope.listObj.types[0].body=result.data;
                    }
                })
            })
        }

        $scope.getData=function(name,index){
            console.log(name);
            RestangularService.all('api/news-show-top?newsType=新闻动态&newsType2='+name).customGET().then(function(result){
                if(result.status==200){
                    console.log( $scope.listObj.types);
                    $scope.listObj.types[index].body=result.data;
                }
            })
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

        function del(index) {
            if(!toast){
                toast = $mdToast.simple()
                    .content('确定要删除该任务？')
                    .action('确定')
                    .highlightAction(true)
                    .position('top right');
                $mdToast.show(toast).then(function (response) {
                    console.log(response);
                    if(response=='ok'){
                        $scope.listObj.data.splice(index,1);
                    }
                    toast=null;
                });
            }
        }

        function editInfo(obj) {
            $state.go('edit-info', obj);
        }
    }
})();
