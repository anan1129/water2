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
                    var p,map,point,myGeo;
                    scope.$on('map',function(e){
                        p="上海市杨浦区"+scope.dataObj.riverName;
                        myGeo.getPoint(p, function(point){
                            console.log(p);
                            if (point) {
                                map.centerAndZoom(point, 16);
                                map.addOverlay(new BMap.Marker(point));
                            }
                        }, "北京市");
                    })

                    var map=new BMap.Map(ele[0]);
                    var point = new BMap.Point(121.500757,31.3884);
                    map.centerAndZoom(point,15);
                    map.addControl(new BMap.MapTypeControl());
                    map.setCurrentCity('上海');
                    map.enableScrollWheelZoom(true);

                    // 创建地址解析器实例
                    var myGeo = new BMap.Geocoder();

                }
            }
        })
})();
