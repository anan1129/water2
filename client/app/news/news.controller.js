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
        $scope.dataInfo=dataInfo;

        initData();

        function initData(){
            getNewsTypes();
            getListData();
        }

        function getNewsTypes(){
            RestangularService.all('api/news-types').customGET().then(function(result){
                if(result.status==200){
                    $scope.listObj.types=result.data;
                    $scope.listObj.types=$scope.listObj.types.reverse();
                }
            }).then(function(){
                // RestangularService.all('api/news-show-top?newsType=新闻动态&newsType2='+$scope.listObj.types[0].name).customGET().then(function(result){
                //     if(result.status==200){
                //         console.log( $scope.listObj.types);
                //         $scope.listObj.types[0].body=result.data;
                //     }
                // })
                angular.forEach($scope.listObj.types,function(val,key){
                    $scope.getData(val.name,key);
                })
            })
        }

        $scope.getData=function(name,index){
            RestangularService.all('api/news-show-second?newsType=新闻动态&newsType2='+name).customGET().then(function(result){
                if(result.status==200){
                    $scope.listObj.types[index].body=result.data;
                }
            })
        }



        function getListData(id){
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

        function dataInfo(data,index){
            data.index=index;
            $state.go('new-detail',data);
        }
    }
})();
