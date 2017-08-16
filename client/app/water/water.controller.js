/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.water.controller',[])
        .controller('WaterCtrl',['$scope','$stateParams','RestangularService','$state','$timeout','$filter',WaterCtrl])
    ;

    function WaterCtrl($scope,$stateParams,RestangularService,$state,$timeout,$filter){

        var stateParams=$scope.stateParams=$stateParams;
        var map=$scope.map;
        var pointArr=[];
        var point;
        var echartOpt=$scope.echartOpt={};
        $scope.waterColors=['#14c1fb','#17a7e6','#54da17','#73c642','#ffbe14','#f35a00'];
        $scope.setEchartOpt=setEchartOpt;
        $scope.logDetail=logDetail;
        $scope.riverName='';
        $scope.dataObj={};
        $scope.news=[
            {title:'一河一策',content:null},
            {title:'一河一档',content:null},
        ];
        $scope.getNewsType=getNewsType;
        $scope.riverPoints;//河道上所有监测点
        $scope.pointObj={};//监测点对象
        $scope.pointData;//水质数据
        $scope.getRiverPoints=getRiverPoints;//水质数据
        $scope.getJobs=getJobs;//获取任务
        $scope.zhzl=zhzl;//综合治理点击
        $scope.download=download;//综合治理点击
        $scope.listObj={
            data:[]
        };
        var pageObj=$scope.pageObj={
            zlgs:{
                numPerPage:5,
                sort:'issueDate,desc',
                currentPage:0,
                totalElements:'',
                totalPages:0,
                busy:false
            },
        };
        initData();

        function initData(){
            getRivers();
        }

        function getRivers(){
            return RestangularService.all('api/rivers').customGET(stateParams.id).then(function(result){
                if(result.status==200){
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

            })
        }

        function init(){
            $scope.map=new BMap.Map('baiduMap');
            point = new BMap.Point(121.500757,31.3884);
            $scope.map.centerAndZoom(point,13);
            // $scope.map.addControl(new BMap.MapTypeControl());
            $scope.map.setCurrentCity('上海');
            $scope.map.enableScrollWheelZoom(true);
        }

        function setPolyline(){
            angular.forEach($scope.dataObj.addresses,function(val){
                var x=val.longitude;
                var y=val.latitude;
                pointArr.push(new BMap.Point(x,y));
            });
            var polyline=new BMap.Polyline(pointArr);
            $scope.map.addOverlay(polyline);
        }

        function getNewsType(newsType){
            RestangularService.all('api/news-show-top?newsType='+newsType+'&riverId='+stateParams.id).customGET().then(function(result){
                if(result.status==200){
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
                    y2: 50,
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    show:true,
                    data:['DO(溶解氧)','CODmn(高锰酸钾指数)','NH3-N(氨氧)','TP(总磷)']
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
                        data : $scope.pointData.map(function(val){
                            console.log(val.checkdate);
                            return $filter('date')(val.checkdate,'MM-dd');
                        })
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        // scale: true,
                        // precision: 2,
                        // splitNumber: 9,
                        // boundaryGap: [0.01, 0.01],
                        // splitArea: { show: true }
                    }
                ],
                series : [
                    {
                        name:'DO(溶解氧)',
                        type:'line',
                        // stack: '总量',
                        data:$scope.pointData.map(function(val){
                            return val.oxygen;
                        })
                        // data:[1.1,1.2,1.3]
                    },
                    {
                        name:'CODmn(高锰酸钾指数)',
                        type:'line',
                        // stack: '总量',
                        data:$scope.pointData.map(function(val){
                            return val.permanganate;
                        })
                        // data:[2.1,2.2,2.3]
                    },
                    {
                        name:'NH3-N(氨氧)',
                        type:'line',
                        // stack: '总量',
                        data:$scope.pointData.map(function(val){
                            return val.ammonia;
                        })
                        // data:[3.1,4.2,4.4]
                    },
                    {
                        name:'TP(总磷)',
                        type:'line',
                        // stack: '总量',
                        data:$scope.pointData.map(function(val){
                            return val.phosphorus;
                        })
                        // data:[6.1,6.2,6.4]
                    }
                ]
            };
            // getRiverPoints();
        }

        function getRiverPoints(){
            var data={
                riverId:stateParams.id
            }
            RestangularService.all('api/river-points').customGET('',data).then(function(res){
                if(res.status==200){
                    console.log($scope.map);
                    $scope.riverPoints=res.data;
                    angular.forEach(res.data,function(val){
                        var marker=new BMap.Marker(new BMap.Point(val.longitude,val.latitude));
                        marker.pointData=val;
                        marker.addEventListener('click',function(val){
                            console.log(val);
                            console.log(marker);
                            $scope.pointObj=marker.pointData;
                            getPointData($scope.pointObj.id);
                        })
                        setMapMarker(marker);
                    });
                    // setEchartOpt();
                    // $scope.$broadcast('addMarker',res);
                }
            })
        }

        function setMapMarker(marker){
            console.log(marker);
            $scope.map.addOverlay(marker);
        }

        function getPointData(id){
            var data={
                rpid:id
            }
            RestangularService.all('api/river-point-datas/page').customGET('',data).then(function(res){
                if(res.status==200){
                    $scope.pointData=res.data.content;
                    console.log($scope.pointData);
                }
            }).then(function(){
                setEchartOpt();
            })
        }

        function getJobs(){
            $scope.pageObj.zlgs.busy=true;
            var data={
                size:pageObj.zlgs.numPerPage,
                page:pageObj.zlgs.currentPage,
                sort:pageObj.zlgs.sort,
                riverId:stateParams.id,
            };
            RestangularService.all('/api/jobs/page').customGET('',data).then(function(result){
                if(result.status==200){
                    console.log(result);
                    $scope.listObj.data=$scope.listObj.data.concat(result.data.content);
                    $scope.pageObj.zlgs.totalElements=result.data.totalElements;
                    $scope.pageObj.zlgs.totalPages=result.data.totalPages;
                    $scope.pageObj.zlgs.busy=false;
                    console.log($scope.pageObj.zlgs.currentPage,$scope.pageObj.zlgs.totalPages);
                    if($scope.pageObj.zlgs.currentPage>=$scope.pageObj.zlgs.totalPages){
                        $scope.pageObj.zlgs.busy=true;
                    }
                    $scope.pageObj.zlgs.currentPage++;
                }
            });
        }

        function zhzl(){
            pageObj.zlgs.currentPage=0;
            $scope.listObj.data=[];
            getJobs();
        }

        function download(filePath){
            var url=$rootScope.host+'/api/file-download?filepath='+filePath;
            $window.open(url);
        }

        $scope.loadMoreZlgs = function() {
            console.log('111');
            getJobs();
        };
    }
})();
