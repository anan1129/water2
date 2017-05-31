/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.water.controller',[])
        .controller('WaterCtrl',['$scope','$stateParams','RestangularService',WaterCtrl])
    ;

    function WaterCtrl($scope,$stateParams,RestangularService){
        var stateParams=$scope.stateParams=$stateParams;
        $scope.riverName='';
        console.log(stateParams);
        $scope.dataObj={
            riverName:''
        }
        initData();
        $scope.color="005bac";

        function initData(){
            getRivers();
        }
        // $scope.src='assets/images/water/xjp.png';

        function getRivers(){
            RestangularService.all('api/rivers').customGET(stateParams.id).then(function(result){
                if(result.status==200){
                    console.log(result.data);
                    $scope.dataObj=result.data;
                    $scope.$broadcast('map');
                    switch($scope.dataObj.riverName){
                        case '吉浦河' :
                            $scope.src='assets/images/water/xjp.png';
                            break;
                        case '东走马塘' :
                            $scope.src='assets/images/water/dzmt.png';
                            break;
                        case '复兴岛运河' :
                            $scope.src='assets/images/water/fxdyh.png';
                            break;
                        case '虬江' :
                            $scope.src='assets/images/water/qj.png';
                            break;
                        case '钱家浜' :
                            $scope.src='assets/images/water/qjb.png';
                            break;
                        case '纬一河' :
                        case '纬二河' :
                        case '纬三河' :
                        case '纬四河' :
                        case '纬五河' :
                        case '纬六河' :
                        case '纬七河' :
                        case '经一河' :
                        case '经二河' :
                        case '经三河' :
                            $scope.src='assets/images/water/xjwcsx.png';
                            break;
                        case '杨浦滨江' :
                            $scope.src='assets/images/water/ypbj.png';
                            break;
                        case '杨树浦港' :
                            $scope.src='assets/images/water/yspg.png';
                            break;
                    }

                    // $(".map").css('background-image','url('+$scope.src+')');
                    // console.log( 'url('+$scope.src+')');
                }
            })
        }
        function getNewsType(){
            RestangularService.all('api/news-show-top?newsType')
        }

        $scope.dataObj;
        // switch($scope.name){
        //     case '01-1':
        //     case '01-2-1':
        //     case '01-2-2':
        //     case '01-3':
        //         $scope.dataObj=GlobalData.rivers[0];
        //         break;
        //     case '02-1':
        //     case '02-2':
        //     case '02-3':
        //         $scope.dataObj=GlobalData.rivers[1];
        //         break;
        //     case '03-2':
        //     case '03-1':
        //         $scope.dataObj=GlobalData.rivers[2];
        //         break;
        //     case '04-1':
        //     case '04-2':
        //         $scope.dataObj=GlobalData.rivers[3];
        //         break;
        //     case '05-1':
        //         $scope.dataObj=GlobalData.rivers[4];
        //         break;
        //     case '06-1':
        //         $scope.dataObj=GlobalData.rivers[5];
        //         break;
        //     case '07-1':
        //     case '07-2':
        //         $scope.dataObj=GlobalData.rivers[6];
        //         break;
        //     case '08-1':
        //         $scope.dataObj=GlobalData.rivers[7];
        //         break;
        //     case '09-1':
        //         $scope.dataObj=GlobalData.rivers[8];
        //         break;
        // }
    }
})();
