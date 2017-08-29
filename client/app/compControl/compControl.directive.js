/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.compControl.directive',[])
        .directive('baiduMap',["$timeout",function($timeout){
            return {
                restrict:'A',
                link:function(scope,ele,attr){

                    if(!window.bmapLoaded){
                        $timeout(function(){
                            var p="上海市杨浦区五角场";
                            var map=new BMap.Map(ele[0]);
                            var point = new BMap.Point(121.500757,31.3884);
                            map.centerAndZoom(point,15);
                            map.addControl(new BMap.MapTypeControl());
                            map.setCurrentCity('上海');
                            map.enableScrollWheelZoom(true);

                            // 创建地址解析器实例
                            var myGeo = new BMap.Geocoder();
                            myGeo.getPoint(p, function(point){
                                if (point) {
                                    map.centerAndZoom(point, 16);
                                    map.addOverlay(new BMap.Marker(point));
                                }else{
                                    alert("您选择地址没有解析到结果!");
                                }
                            }, "北京市");
                        },1000);
                    }else{
                        var p="上海市杨浦区五角场";
                        var map=new BMap.Map(ele[0]);
                        var point = new BMap.Point(121.500757,31.3884);
                        map.centerAndZoom(point,15);
                        map.addControl(new BMap.MapTypeControl());
                        map.setCurrentCity('上海');
                        map.enableScrollWheelZoom(true);

                        // 创建地址解析器实例
                        var myGeo = new BMap.Geocoder();
                        myGeo.getPoint(p, function(point){
                            if (point) {
                                map.centerAndZoom(point, 16);
                                map.addOverlay(new BMap.Marker(point));
                            }else{
                                alert("您选择地址没有解析到结果!");
                            }
                        }, "北京市");
                    }

                }
            }
        }])
})();
