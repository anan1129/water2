/**
 * Created by zhengan on 2017/6/1.
 */
(function(){
    'user strict';

    angular.module('app.news.filter', [])
        .filter('editDate', [function(){
            return function(input){
                var str;
                if(input){
                    // str=input.split('T').join(' ');
                    // str=str.split('Z').join('');
                    str=input.split(' ')[0];
                    str=str.split('T')[0];
                }
                return str;
            }
        }])
    ;
})();
