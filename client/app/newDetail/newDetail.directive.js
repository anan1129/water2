/**
 * Created by zhengan on 2017/6/1.
 */
(function(){
    'use strict';

    angular.module('app.newDetail.directive', [])
        .directive('showHtml',function(){
            return {
                restrict:'A',
                link:function(scope,ele,attr){
                    scope.$on('showContent',function(e,data){
                        ele.append(data);
                        var imgs=ele.find('img');
                        angular.forEach(imgs,function(val){
                            $(val).css('width','100%');
                        });
                        // scope.$digest();
                    })
                }
            }
        })

    ;
})();
