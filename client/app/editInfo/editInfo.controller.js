/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.editInfo.controller',[])
        .controller('EditInfoCtrl',['$scope','$stateParams','$state','RestangularService',EditInfoCtrl])
    ;

    function EditInfoCtrl($scope,$stateParams,$state,RestangularService){
        console.log($stateParams);
        var users=[];
        $scope.formObj={
            type:'',
        };
        initData();

        function initData(){
            getNews();
            $scope.formObj={
                type:'',
            };
            // getNewsTypes();
        }


        function getNews(){
            RestangularService.all('/api/news').customGET($stateParams.id).then(function(result){
                if(result.status==200){
                    $scope.formObj=result.data;
                    console.log($scope.formObj);
                }
            }).then(getNewsTypes).then(getRivers);
        }

        function getNewsTypes(){
            RestangularService.all('api/news-types').customGET().then(function(result){
                if(result.status==200){
                    $scope.types=result.data;
                }
            });
        }

        function getRivers(){
            RestangularService.all('api/rivers').customGET().then(function(result){
                if(result.status==200){
                    $scope.rivers=result.data;
                }
            })
        }



        $scope.save=function(){
            console.log($scope.formObj.id);
            var data=$scope.formObj;
            console.log(data);

            RestangularService.all('api/news').customPOST(data).then(function(result){
                if(result.status==201){
                    $state.go('dynamic-info');
                }
            })

        }

        // angular.forEach(GlobalData.users,function(val){
        //     users.push(val.name);
        // });

    }
})();
