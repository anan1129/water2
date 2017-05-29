/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.home.directive',[])
        .directive('homeBaiduMap',function(){
            return {
                restrict:'A',
                link:function(scope,ele,attr){
                    var map=new BMap.Map(ele[0]);
                    var point = new BMap.Point(121.500757,31.3884);
                    map.centerAndZoom(point,15);
                    map.addControl(new BMap.MapTypeControl());
                    map.setCurrentCity('上海');
                    map.enableScrollWheelZoom(true);
                    // map.disableDragging();

                    // 创建地址解析器实例
                    var myGeo = new BMap.Geocoder();
                    myGeo.getPoint(point, function(point){
                        if (point) {
                            map.centerAndZoom(point, 16);
                            map.addOverlay(new BMap.Marker(point));
                        }
                    }, "北京市");
                    getBoundary();//获取行政区域
                    setMapStyle();

                    function getBoundary(){
                        var bdary = new BMap.Boundary();
                        bdary.get("上海市杨浦区", function(rs){
                            map.clearOverlays();        //清除地图覆盖物
                            var count = rs.boundaries.length; //行政区域的点有多少个
                            if (count === 0) {
                                alert('未能获取当前输入行政区域');
                                return ;
                            }
                            var pointArray = [];
                            for (var i = 0; i < count; i++) {
                                var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 5, strokeColor: "#005bac",fillColor:"#005bac",fillColorOpacity:"0.4"}); //建立多边形覆盖物
                                map.addOverlay(ply);  //添加覆盖物
                                pointArray = pointArray.concat(ply.getPath());
                            }
                            map.setViewport(pointArray);    //调整视野
                        });
                    }

                    function setMapStyle(){
                        map.setMapStyle({
                            styleJson:[
                                {
                                    "featureType": "water",
                                    "elementType": "all",
                                    "stylers": {
                                        "color": "#005bac"
                                    }
                                },
                                // {
                                //     "featureType": "road",
                                //     "elementType": "all",
                                //     "stylers": {
                                //         "visibility": "off"
                                //     }
                                // },
                                {
                                    "featureType": "poi",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off",
                                        "color": "#005bac"
                                    }
                                },
                                {
                                    "featureType": "background",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "no",
                                    }
                                },
                                {
                                    "featureType": "administrative",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off",
                                        // "color": "#005bac"
                                    }
                                }
                            ],
                        });
                    }

                }
            }
        })
})();
