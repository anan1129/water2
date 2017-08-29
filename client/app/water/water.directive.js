/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.water.directive',[])
        .directive('baiduMap',['$timeout','$mdDialog','$window',function($timeout,$mdDialog,$window){
            return {
                restrict:'A',
                link:function(scope,ele,attr){
                    console.log(window.init);
                    if(!window.bmapLoaded){
                        console.log(8888);
                        $timeout(function(){
                            // if(scope.dataObj.riverName=='经一河*') scope.dataObj.riverName='新江湾城水系' ;
                            var p,map,point,myGeo,pointArr=[],marker;
                            // init();

                            function init(){
                                scope.map=map=new BMap.Map(ele[0]);
                                console.log(map);


                                pos();
                                map.setCurrentCity('上海');
                                map.enableScrollWheelZoom(true);
                            }

                            // 创建地址解析器实例
                            var myGeo = new BMap.Geocoder();

                            scope.$on('map',function(e){
                                init();
                                setStyle();
                                pos();
                                setPolyline();

                            });

                            scope.$on('clickMapAddPos',function(){
                                map.addEventListener('click',function(e){
                                    map.removeOverlay(marker);
                                    var pt=e.point;
                                    var obj={
                                        longitude:pt.lng+'',
                                        latitude:pt.lat+''
                                    };
                                    marker=new BMap.Marker(pt);
                                    map.addOverlay(marker);
                                    scope.$apply(function(){
                                        scope.formObj.longitude=pt.lng;
                                        scope.formObj.latitude=pt.lat;
                                    })
                                });
                            });

                            scope.$on('addMarker',function(e,data){
                                if(attr.mapType=='基础信息'){
                                    $timeout(function(){
                                        console.log(scope.map);
                                        map.addOverlay(data);
                                        scope.$apply();
                                    },5000);

                                }
                            })


                            function pos(){
                                var len=Math.ceil(scope.dataObj.addresses.length/2);
                                var centerP=scope.dataObj.addresses[len];
                                var point=new BMap.Point(centerP.longitude,centerP.latitude);
                                map.centerAndZoom(point, 14);
                            }

                            function setPolyline(){
                                angular.forEach(scope.dataObj.addresses,function(val){
                                    var x=val.longitude;
                                    var y=val.latitude;
                                    pointArr.push(new BMap.Point(x,y));
                                });
                                var polyline=new BMap.Polyline(pointArr,{strokeColor:'#3f2ce6'});
                                map.addOverlay(polyline);

                                var moNum=Math.floor(scope.dataObj.addresses.length/scope.dataObj.announcements.length)?Math.floor(scope.dataObj.addresses.length/scope.dataObj.announcements.length):1;
                                console.log(moNum);
                                for(var i=0,len=scope.dataObj.announcements.length;i<len;i++){
                                    scope.gspPiontArr.push(scope.dataObj.addresses[i*moNum]);
                                }

                                // if(attr.mapType=='基础信息'){
                                for(var i=0,len=scope.gspPiontArr.length;i<len;i++){
                                    var pt={
                                        longitude:scope.gspPiontArr[i].longitude,
                                        latitude:scope.gspPiontArr[i].latitude
                                    }
                                    var icon=new BMap.Icon('../assets/images/water/gsp.png',new BMap.Size(32,32));
                                    var marker=new BMap.Marker(new BMap.Point(pt.longitude,pt.latitude),{icon:icon});
                                    marker.gspData=scope.dataObj.announcements[i];
                                    marker.addEventListener('click',function(val){
                                        console.log(marker);
                                        $mdDialog.show({
                                            controller: ['$scope','$mdDialog','RestangularService',function($scope,$mdDialog,RestangularService){
                                                $scope.gspObj=marker.gspData;
                                                console.log($scope.gspObj);
                                                $scope.host='http://106.15.48.81:8080';
                                                $scope.cancel=function(){
                                                    console.log($mdDialog);
                                                    $mdDialog.cancel();
                                                }
                                                $scope.save=function(){
                                                    $mdDialog.hide();
                                                }
                                            }],
                                            templateUrl: 'app/water/dialog/gsp.html',
                                            parent: angular.element(document.body),
                                            // targetEvent: ev,
                                            clickOutsideToClose:false
                                        })
                                    })
                                    map.addOverlay(marker);
                                }
                                // }
                            }

                            function setStyle(){
                                map.setMapStyle({
                                    styleJson:[
                                        {
                                            "featureType": "background",
                                            "elementType": "all",
                                            "stylers": {
                                                // "color": "#f1f0f6",
                                                "hue": "#f1f0f6",
                                                "visibility": "on"
                                            }
                                        },
                                        {
                                            "featureType": "water",
                                            "elementType": "all",
                                            "stylers": {
                                                "color": "#c6c6c6",
                                                "hue": "#f1f0f6",
                                                "visibility": "on"
                                            }
                                        },
                                        {
                                            "featureType": "road",
                                            "elementType": "all",
                                            "stylers": {
                                                "color": "#737373",
                                                "visibility": "on"
                                            }
                                        },
                                        // 绿地
                                        {
                                            "featureType": "green",
                                            "elementType": "all",
                                            "stylers": {
                                                "color": "#c4c4c4",
                                                "visibility": "off"
                                            }
                                        },
                                        // 兴趣点
                                        {
                                            "featureType": "poi",
                                            "elementType": "geometry",
                                            "stylers": {
                                                "color": "#737373",
                                                "visibility": "off"
                                            }
                                        },
                                        //road
                                        // 高速及过道
                                        {
                                            "featureType": "highway",
                                            "elementType": "geometry",
                                            "stylers": {
                                                "color": "#828282",
                                                "visibility": "on"
                                            }
                                        },
                                        // 城市主路
                                        {
                                            "featureType": "arterial",
                                            "elementType": "all",
                                            "stylers": {
                                                "color": "#737373",
                                                "visibility": "off"
                                            }
                                        },
                                        // 普通道路
                                        {
                                            "featureType": "local",
                                            "elementType": "all",
                                            "stylers": {
                                                "color": "#737373",
                                                "visibility": "off"
                                            }
                                        },
                                        // 铁路
                                        {
                                            "featureType": "railway",
                                            "elementType": "all",
                                            "stylers": {
                                                "color": "#737373",
                                                "visibility": "off"
                                            }
                                        },
                                        // 地铁
                                        {
                                            "featureType": "subway",
                                            "elementType": "all",
                                            "stylers": {
                                                "color": "#737373",
                                                "visibility": "off"
                                            }
                                        }
                                    ]
                                });
                            }
                        },1000);
                    }else{
                        // if(scope.dataObj.riverName=='经一河*') scope.dataObj.riverName='新江湾城水系' ;
                        var p,map,point,myGeo,pointArr=[],marker;
                        // init();

                        function init(){
                            scope.map=map=new BMap.Map(ele[0]);
                            console.log(map);


                            pos();
                            map.setCurrentCity('上海');
                            map.enableScrollWheelZoom(true);
                        }

                        // 创建地址解析器实例
                        var myGeo = new BMap.Geocoder();

                        scope.$on('map',function(e){
                            init();
                            setStyle();
                            pos();
                            setPolyline();

                        });

                        scope.$on('clickMapAddPos',function(){
                            map.addEventListener('click',function(e){
                                map.removeOverlay(marker);
                                var pt=e.point;
                                var obj={
                                    longitude:pt.lng+'',
                                    latitude:pt.lat+''
                                };
                                marker=new BMap.Marker(pt);
                                map.addOverlay(marker);
                                scope.$apply(function(){
                                    scope.formObj.longitude=pt.lng;
                                    scope.formObj.latitude=pt.lat;
                                })
                            });
                        });

                        scope.$on('addMarker',function(e,data){
                            if(attr.mapType=='基础信息'){
                                $timeout(function(){
                                    console.log(scope.map);
                                    map.addOverlay(data);
                                    scope.$apply();
                                },5000);

                            }
                        })


                        function pos(){
                            var len=Math.ceil(scope.dataObj.addresses.length/2);
                            var centerP=scope.dataObj.addresses[len];
                            var point=new BMap.Point(centerP.longitude,centerP.latitude);
                            map.centerAndZoom(point, 14);
                        }

                        function setPolyline(){
                            angular.forEach(scope.dataObj.addresses,function(val){
                                var x=val.longitude;
                                var y=val.latitude;
                                pointArr.push(new BMap.Point(x,y));
                            });
                            var polyline=new BMap.Polyline(pointArr,{strokeColor:'#3f2ce6'});
                            map.addOverlay(polyline);

                            var moNum=Math.floor(scope.dataObj.addresses.length/scope.dataObj.announcements.length)?Math.floor(scope.dataObj.addresses.length/scope.dataObj.announcements.length):1;
                            console.log(moNum);
                            for(var i=0,len=scope.dataObj.announcements.length;i<len;i++){
                                scope.gspPiontArr.push(scope.dataObj.addresses[i*moNum]);
                            }

                            // if(attr.mapType=='基础信息'){
                            for(var i=0,len=scope.gspPiontArr.length;i<len;i++){
                                var pt={
                                    longitude:scope.gspPiontArr[i].longitude,
                                    latitude:scope.gspPiontArr[i].latitude
                                }
                                var icon=new BMap.Icon('../assets/images/water/gsp.png',new BMap.Size(32,32));
                                var marker=new BMap.Marker(new BMap.Point(pt.longitude,pt.latitude),{icon:icon});
                                marker.gspData=scope.dataObj.announcements[i];
                                marker.addEventListener('click',function(val){
                                    console.log(marker);
                                    $mdDialog.show({
                                        controller: ['$scope','$mdDialog','RestangularService',function($scope,$mdDialog,RestangularService){
                                            $scope.gspObj=marker.gspData;
                                            console.log($scope.gspObj);
                                            $scope.host='http://106.15.48.81:8080';
                                            $scope.cancel=function(){
                                                console.log($mdDialog);
                                                $mdDialog.cancel();
                                            }
                                            $scope.save=function(){
                                                $mdDialog.hide();
                                            }
                                        }],
                                        templateUrl: 'app/water/dialog/gsp.html',
                                        parent: angular.element(document.body),
                                        // targetEvent: ev,
                                        clickOutsideToClose:false
                                    })
                                })
                                map.addOverlay(marker);
                            }
                            // }
                        }

                        function setStyle(){
                            map.setMapStyle({
                                styleJson:[
                                    {
                                        "featureType": "background",
                                        "elementType": "all",
                                        "stylers": {
                                            // "color": "#f1f0f6",
                                            "hue": "#f1f0f6",
                                            "visibility": "on"
                                        }
                                    },
                                    {
                                        "featureType": "water",
                                        "elementType": "all",
                                        "stylers": {
                                            "color": "#c6c6c6",
                                            "hue": "#f1f0f6",
                                            "visibility": "on"
                                        }
                                    },
                                    {
                                        "featureType": "road",
                                        "elementType": "all",
                                        "stylers": {
                                            "color": "#737373",
                                            "visibility": "on"
                                        }
                                    },
                                    // 绿地
                                    {
                                        "featureType": "green",
                                        "elementType": "all",
                                        "stylers": {
                                            "color": "#c4c4c4",
                                            "visibility": "off"
                                        }
                                    },
                                    // 兴趣点
                                    {
                                        "featureType": "poi",
                                        "elementType": "geometry",
                                        "stylers": {
                                            "color": "#737373",
                                            "visibility": "off"
                                        }
                                    },
                                    //road
                                    // 高速及过道
                                    {
                                        "featureType": "highway",
                                        "elementType": "geometry",
                                        "stylers": {
                                            "color": "#828282",
                                            "visibility": "on"
                                        }
                                    },
                                    // 城市主路
                                    {
                                        "featureType": "arterial",
                                        "elementType": "all",
                                        "stylers": {
                                            "color": "#737373",
                                            "visibility": "off"
                                        }
                                    },
                                    // 普通道路
                                    {
                                        "featureType": "local",
                                        "elementType": "all",
                                        "stylers": {
                                            "color": "#737373",
                                            "visibility": "off"
                                        }
                                    },
                                    // 铁路
                                    {
                                        "featureType": "railway",
                                        "elementType": "all",
                                        "stylers": {
                                            "color": "#737373",
                                            "visibility": "off"
                                        }
                                    },
                                    // 地铁
                                    {
                                        "featureType": "subway",
                                        "elementType": "all",
                                        "stylers": {
                                            "color": "#737373",
                                            "visibility": "off"
                                        }
                                    }
                                ]
                            });
                        }
                    }

                }
            }
        }])
        .directive('aaa',function(){
            return {
                restrict:'A',
                scope:{
                    content:'='
                },
                link:function(scope,ele,attr){
                    // ele.append(scope.content);
                    // var imgs=ele.find('img');
                    //
                    // // angular.forEach(imgs,function(val){
                    // //
                    // //     $(val).css('width','100%');
                    // // });
                    var imgs=ele.find('img');

                    angular.forEach(imgs,function(val){

                        $(val).css('width','100%');
                    });
                    scope.$apply();
                }
            }
        })

    ;
})();
