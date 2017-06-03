/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.home.controller',[])
        .controller('HomeCtrl',['$scope','RestangularService','$state','$window',HomeCtrl])
    ;

    function HomeCtrl($scope,RestangularService,$state,$window){
        // console.log($window.localStorage);
        // $scope.username=
        $scope.toDetail=toDetail;
        $scope.login=login;
        initData();

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

        function toDetail(river){

            if(river.riverName=="吉浦河"||river.riverName=="小吉浦"||river.riverName=="东走马塘"||river.riverName=="复兴岛运河"||river.riverName=="虬江"||river.riverName=="钱家浜"||river.riverName=="杨浦滨江"||river.riverName=="杨树浦港"||river.riverName=="纬一河"||river.riverName=="纬二河"||river.riverName=="纬三河"||river.riverName=="纬四河"||river.riverName=="纬五河"||river.riverName=="纬六河"||river.riverName=="纬七河"||river.riverName=="经一河"||river.riverName=="经二河"||river.riverName=="经三河"){
                console.log(river);
                $state.go('water',river);
            }

        }

        function login(){
            $state.go('login');
        }
    }
})();
