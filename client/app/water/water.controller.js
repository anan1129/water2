/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.water.controller',[])
        .controller('WaterCtrl',['$scope','$stateParams','RestangularService','$state','$timeout',WaterCtrl])
    ;

    function WaterCtrl($scope,$stateParams,RestangularService,$state,$timeout){
        var stateParams=$scope.stateParams=$stateParams;
        var map=$scope.map;
        var pointArr=[];
        var point;
        var echartOpt=$scope.echartOpt={};
        $scope.waterColors=['#14c1fb','#17a7e6','#54da17','#73c642','#ffbe14','#f35a00'];
        $scope.setEchartOpt=setEchartOpt;
        // if(stateParams.id=="01-1"){
        //     $state.go('home');
        // }
        $scope.logDetail=logDetail;
        $scope.riverName='';
        console.log(stateParams);
        $scope.dataObj={};
        $scope.news=[
            {title:'一河一策',content:null},
            {title:'一河一档',content:null},

        ];
        initData();

        function initData(){
            getRivers();
        }

        function getRivers(){
            RestangularService.all('api/rivers').customGET(stateParams.id).then(function(result){
                if(result.status==200){
                    console.log(result.data);
                    $scope.dataObj=result.data;
                    $scope.dataObj.addresses=$scope.dataObj.addresses.replace(/\'/g,'\"');
                    $scope.dataObj.addresses=angular.fromJson($scope.dataObj.addresses);
                    // $scope.$broadcast('map');
                    $timeout(function(){
                        $scope.$broadcast('map');
                    },100);
                    // init();
                }
            }).then(function(){
                getNewsType('一河一策');
                getNewsType('一河一档');
            })
        }

        function init(){
            map=new BMap.Map('baiduMap');
            point = new BMap.Point(121.500757,31.3884);
            map.centerAndZoom(point,13);
            // map.addControl(new BMap.MapTypeControl());
            map.setCurrentCity('上海');
            map.enableScrollWheelZoom(true);
        }

        function setPolyline(){
            angular.forEach($scope.dataObj.addresses,function(val){
                var x=val.longitude;
                var y=val.latitude;
                pointArr.push(new BMap.Point(x,y));
            });
            var polyline=new BMap.Polyline(pointArr);
            map.addOverlay(polyline);
        }

        function getNewsType(newsType){
            RestangularService.all('api/news-show-top?newsType='+newsType+'&riverId='+stateParams.id).customGET().then(function(result){
                if(result.status==200){
                    console.log(result.data);
                    if(newsType=='一河一策'){
                        $scope.news[0].content=result.data;

                    }else{
                        $scope.news[1].content=result.data;
                    }
                }
            })
        }

        $scope.dataObj;
        function logDetail(id){
            $state.go('log-detail',{id:id});
        }

        function setEchartOpt(){
            $scope.echartOpt= {
                grid: {
                    x: 50,
                    y: 50,
                    x2: 50,
                    y2: 10,
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    show:false,
                    data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'邮件营销',
                        type:'line',
                        stack: '总量',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'联盟广告',
                        type:'line',
                        stack: '总量',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'视频广告',
                        type:'line',
                        stack: '总量',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'直接访问',
                        type:'line',
                        stack: '总量',
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'搜索引擎',
                        type:'line',
                        stack: '总量',
                        data:[820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };
        }
    }
})();
