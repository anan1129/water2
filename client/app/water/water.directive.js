/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.water.directive',[])
        .directive('baiduMap',function(){
            return {
                restrict:'A',
                link:function(scope,ele,attr){
                    // if(scope.dataObj.riverName=='经一河*') scope.dataObj.riverName='新江湾城水系' ;
                    var p,map,point,myGeo,pointArr=[],marker;
                    // init();

                    function init(){
                        map=new BMap.Map(ele[0]);
                        pos();
                        // point = new BMap.Point(121.500757,31.3884);
                        // map.centerAndZoom(point,13);
                        // map.addControl(new BMap.MapTypeControl());
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
                    })

                    function pos(){
                        console.log(scope.dataObj.addresses);
                        var len=Math.ceil(scope.dataObj.addresses.length/2);
                        var centerP=scope.dataObj.addresses[len];

                        var point=new BMap.Point(centerP.longitude,centerP.latitude);
                        map.centerAndZoom(point, 14);
                        // var maker=new BMap.Marker(point);
                        // map.addOverlay(maker);
                        // p="上海市杨浦区"+scope.dataObj.riverName;
                        // myGeo.getPoint(p, function(point){
                        //     if (point) {
                        //         map.centerAndZoom(point, 13);
                        //         // map.addOverlay(new BMap.Marker(point));
                        //     }
                        // }, "上海市");
                    }

                    function setPolyline(){
                        angular.forEach(scope.dataObj.addresses,function(val){
                            var x=val.longitude;
                            var y=val.latitude;
                            pointArr.push(new BMap.Point(x,y));
                        });
                        var polyline=new BMap.Polyline(pointArr,{strokeColor:'#3f2ce6'});
                        map.addOverlay(polyline);
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
        })
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
