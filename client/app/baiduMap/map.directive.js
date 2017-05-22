/**
 * Created by zhengan on 2017/5/22.
 */
(function(){
    'use strict';

    angular.module('app.map.directive',[])
        .directive('mapContainer',['$window',mapContainer])
    ;

    function mapContainer($window){
        var key="daGGpUQFoA5uW36vmK0xMhCVu38YrXtO";
        return {
            restrict:'A',
            template:'<div></div>',
            link:function(scope,ele,attr){
                init();
                function init(){
                    var map=new BMap.Map(ele[0]);
                    map.centerAndZoom('上海五角场',15);
                    map.addControl(new BMap.MapTypeControl());
                    map.setCurrentCity('BEIJING');
                    map.enableScrollWheelZoom(true);
                }
            }
        }
    }
})();
