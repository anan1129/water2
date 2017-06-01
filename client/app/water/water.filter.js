/**
 * Created by zhengan on 2017/6/1.
 */
(function(){
    'use strict';

    angular.module('app.water.filter',[])
        .filter('strToHtml',function(){
            return function(input){
                var div=document.createElement('div');
                var d=$(div).append(input);
                console.log(d);
                return d[0];
            }
        })
    ;
})();
