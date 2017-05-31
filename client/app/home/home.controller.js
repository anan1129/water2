/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.home.controller',[])
        .controller('HomeCtrl',['$scope','RestangularService',HomeCtrl])
    ;

    function HomeCtrl($scope,RestangularService){
        initData()

        function initData(){
            getRivers();
        }
        $scope.customClass={

        }

        function getRivers(){
            RestangularService.all('api/rivers').customGET().then(function(result){
                if(result.status==200){
                    $scope.riverData=result.data;

                    // angular.forEach($scope.riverData,function(val){
                    //     console.log(val.riverName);
                    // })
                }
            })
        }
    }
})();
