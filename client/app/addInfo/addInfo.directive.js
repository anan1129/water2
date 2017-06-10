/**
 * Created by zhengan on 2017/6/10.
 */
(function(){
    'use strict';

    angular.module('app.addInfo.directive', [])
        .directive('dropdownToggle', ['$document', '$location', function ($document, $location) {
            var openElement = null,
                closeMenu = angular.noop;
            return {
                restrict: 'CA',
                link: function (scope, element, attrs) {
                    console.log($location.path);
                    scope.$watch('$location.path', function () { closeMenu(); });
                    element.parent().bind('click', function () { closeMenu(); });
                    element.bind('click', function (event) {

                        var elementWasOpen = (element === openElement);

                        event.preventDefault();
                        event.stopPropagation();

                        if (!!openElement) {
                            closeMenu();
                        }

                        if (!elementWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
                            element.parent().addClass('open');
                            openElement = element;
                            closeMenu = function (event) {
                                if (event) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                                $document.unbind('click', closeMenu);
                                element.parent().removeClass('open');
                                closeMenu = angular.noop;
                                openElement = null;
                            };
                            $document.bind('click', closeMenu);
                        }
                    });
                }
            };
        }]);
})();
