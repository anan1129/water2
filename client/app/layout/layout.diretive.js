(function () {
    'use strict';

    angular.module('app.layout')
        // quickview
        .directive('toggleQuickview', toggleQuickview)

        .directive('uiPreloader', ['$rootScope', uiPreloader])

        .directive('ngMaxPic',['$mdDialog',ngMaxPic])
    ;


    function toggleQuickview() {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, el, attrs) {
            var $el = $(el[0]);
            // #app not #body
            var $body = $('#app');

            $el.on('click', function(e) {
                var qvClass = 'quickview-open';

                if (attrs.target) {
                    var qvClass = qvClass + '-' + attrs.target;
                }

                // CSS class on body instead of #quickview
                // because before ng-include load quickview.html, you'll fail to get $('#')
                $body.toggleClass(qvClass);
                e.preventDefault();
            });

        }
    }

    function uiPreloader($rootScope) {
        return {
            restrict: 'A',
            template:'<span class="bar"></span>',
            link: function(scope, el, attrs) {
                el.addClass('preloaderbar hide');
                scope.$on('$stateChangeStart', function(event) {
                    el.removeClass('hide').addClass('active');
                });
                scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
                    event.targetScope.$watch('$viewContentLoaded', function(){
                        el.addClass('hide').removeClass('active');
                    })
                });

                scope.$on('preloader:active', function(event) {
                    el.removeClass('hide').addClass('active');
                });
                scope.$on('preloader:hide', function(event) {
                    el.addClass('hide').removeClass('active');
                });
            }
        };
    }

    function ngMaxPic($mdDialog){
        return {
            restrict:'A',
            link:function(scope,ele,attrs){
                ele.click('image',function(e){
                    if(e.target.nodeName=='IMG'){
                        var target=e.target;
                        var div=document.createElement('div');
                        var ele=angular.element(div).append(angular.copy(angular.element(target)));
                        console.log(ele.html());
                        $mdDialog.show({
                            template:ele.html(),
                            clickOutsideToClose:true,
                            parent:angular.element(document.body),
                            targetEvent:e
                        });
                    }
                })
            }
        }
    }
})();

