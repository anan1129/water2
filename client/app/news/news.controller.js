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
        var pageObj=$scope.pageObj={
            '重要活动':{
                numPerPage:3,
                sort:'',
                currentPage:0,
                totalElements:'',
                totalPages:0,
                busy:false,
                loadMore:function(name,index){
                    console.log(name);
                    $scope.getData(name,index);
                }
            },
            '工作进展':{
                numPerPage:3,
                sort:'',
                currentPage:0,
                totalElements:'',
                totalPages:0,
                busy:false,
                loadMore:function(name,index){
                    $scope.getData(name,index);
                }
            },
            '街镇动态':{
                numPerPage:3,
                sort:'',
                currentPage:0,
                totalElements:'',
                totalPages:0,
                busy:false,
                loadMore:function(name,index){
                    $scope.getData(name,index);
                }
            },
            '媒体精选':{
                numPerPage:3,
                sort:'',
                currentPage:0,
                totalElements:'',
                totalPages:0,
                busy:false,
                loadMore:function(name,index){
                    $scope.getData(name,index);
                }
            },
        }

        initData();

        function initData(){
            getNewsTypes();
            // getListData();
        }

        function getNewsTypes(){
            RestangularService.all('api/news-types').customGET().then(function(result){
                if(result.status==200){
                    $scope.listObj.types=result.data;
                    // $scope.listObj.types=$scope.listObj.types.reverse();
                }
            }).then(function(){
                angular.forEach($scope.listObj.types,function(val,key){
                    val.content=[];
                    // $scope.getData(val.name,key);
                })
                $scope.getData('重要活动',0);
            })
        }

        $scope.getData=function(name,index){
            $scope.pageObj[name].busy=true;
            var data={
                // size:$scope.pageObj[name].numPerPage,
                // page:$scope.pageObj[name].currentPage,
            };
            RestangularService.all('api/news-show-second?newsType=新闻动态&newsType2='+name).customGET('',data).then(function(result){
                if(result.status==200){
                    $scope.listObj.types[index].content=$scope.listObj.types[index].content.concat(result.data.content);
                    $scope.pageObj[name].totalElements=result.data.totalElements;
                    $scope.pageObj[name].totalPages=result.data.totalPages;
                    $scope.pageObj[name].busy=false;
                    if($scope.pageObj[name].currentPage>=$scope.pageObj[name].totalPages){
                        $scope.pageObj[name].busy=true;
                    }
                    $scope.pageObj[name].currentPage++;
                }
            })
        }

        $scope.loadMore=function(name,index){
            console.log(name,index);
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
