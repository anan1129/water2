/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.water.controller',[])
        .controller('WaterCtrl',['$scope','$stateParams','RestangularService','$state',WaterCtrl])
    ;

    function WaterCtrl($scope,$stateParams,RestangularService,$state){
        var stateParams=$scope.stateParams=$stateParams;
        if(stateParams.id=="01-1"){
            $state.go('home');
        }
        $scope.riverName='';
        console.log(stateParams);
        $scope.dataObj={};
        $scope.news=[
            {title:'一河一档',content:null},
            {title:'一河一策',content:null},
        ];
        initData();

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
                        case '小吉浦' :
                            $scope.src='assets/images/water/xjp.png';
                            $scope.img='assets/images/water/05-1.jpg';
                            break;
                        case '东走马塘' :
                            $scope.src='assets/images/water/dzmt.png';
                            $scope.img='assets/images/water/02-1.jpg';
                            break;
                        case '复兴岛运河' :
                            $scope.src='assets/images/water/fxdyh.png';
                            $scope.img='assets/images/water/04-1.jpg';
                            break;
                        case '虬江' :
                            $scope.src='assets/images/water/qj.png';
                            $scope.img='assets/images/water/01-1.jpg';
                            break;
                        case '钱家浜' :
                            $scope.src='assets/images/water/qjb.png';
                            $scope.img='assets/images/water/06-1.jpg';
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
                            $scope.img='assets/images/water/08-1.jpg';
                            break;
                        case '杨浦滨江' :
                            $scope.src='assets/images/water/ypbj.png';
                            $scope.img='assets/images/water/03-2.jpg';
                            break;
                        case '杨树浦港' :
                            $scope.src='assets/images/water/yspg.png';
                            $scope.img='assets/images/water/07-1.jpg';
                            break;
                    }
                }
            }).then(function(){
                getNewsType('一河一档');
                getNewsType('一河一策');
            })
        }
        function getNewsType(newsType){
            RestangularService.all('api/news-show-top?newsType='+newsType+'&riverId='+stateParams.id).customGET().then(function(result){
                if(result.status==200){
                    console.log(result.data);
                    if(newsType=='一河一档'){
                        $scope.news[0].content=result.data;

                    }else{
                        $scope.news[1].content=result.data;
                        // console.log($scope.news[1].content.content);
                        // angular.forEach($scope.news[1].content.content,function(val){
                        //     if(val.content){
                        //         console.log(val.content);
                        //         $scope.$broadcast('showContent',val.content);
                        //     }
                        // })
                    }
                }
            })
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
