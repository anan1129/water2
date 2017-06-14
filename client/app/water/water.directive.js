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
                    var p,map,point,myGeo,pointArr=[];
                    init();

                    function init(){
                        map=new BMap.Map(ele[0]);
                        point = new BMap.Point(121.500757,31.3884);
                        map.centerAndZoom(point,15);
                        map.addControl(new BMap.MapTypeControl());
                        map.setCurrentCity('上海');
                        map.enableScrollWheelZoom(true);
                    }

                    // 创建地址解析器实例
                    var myGeo = new BMap.Geocoder();

                    scope.$on('map',function(e){
                        pos();
                        setPolyline();
                    });

                    function pos(){
                        p="上海市杨浦区"+scope.dataObj.riverName;
                        myGeo.getPoint(p, function(point){
                            console.log(p);
                            if (point) {
                                map.centerAndZoom(point, 12);
                                map.addOverlay(new BMap.Marker(point));
                            }
                        }, "上海市");
                    }

                    function setPolyline(){
                        angular.forEach(scope.dataObj.addresses,function(val){
                            var x=val.longitude;
                            var y=val.latitude;
                            pointArr.push(new BMap.Point(x,y));
                        });
                        console.log(pointArr);
                        var polyline=new BMap.Polyline(pointArr);
                        map.addOverlay(polyline);

                    }

                    //
                    // map.setMapStyle({
                    //     styleJson:[
                    //         {
                    //             "featureType": "background",
                    //             "elementType": "all",
                    //             "stylers": {
                    //                 "color": "#cccccc",
                    //                 "hue": "#cccccc",
                    //                 "visibility": "on"
                    //             }
                    //         }
                    //     ]
                    // })

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
                    console.log(ele);
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
