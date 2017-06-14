/**
 * Created by zhengan on 2017/6/14.
 */
(function(){
    'use strict';

    angular.module('app.userList.filter',[])
        .filter('filterGroupName',function(){
            return function(input){
                var str;
                if(input){
                    var arr=input.split('/');
                    str=arr[arr.length-1];
                }
                return str;
            }
        })
})();
