(function () {
    'use strict';

    angular.module('app.page')
        .directive('customPage', customPage);


    // add class for specific pages to achieve fullscreen, custom background etc.
    function customPage() {
        var directive = {
            restrict: 'A',
            controller: ['$scope', '$element', '$location', customPageCtrl]
        };

        return directive;

        function customPageCtrl($scope, $element, $location) {
            var addBg, path;

            path = function() {
                return $location.path();
            };

            addBg = function(path) {
                $element.removeClass('on-canvas');
                $element.removeClass('body-wide body-err body-lock body-auth');
                switch (path) {
                    case '/404':
                    case '/page/404':
                    case '/page/500':
                        return $element.addClass('body-wide body-err');
                    case '/page/signin':
                    case '/page/signup':
                    case '/page/forgot-password':
                        return $element.addClass('body-wide body-auth');
                    case '/page/lock-screen':
                        return $element.addClass('body-wide body-lock');
                    case '/water/01-1':
                    case '/water/01-2-1':
                    case '/water/01-2-2':
                    case '/water/01-3':
                    case '/water/02-1':
                    case '/water/02-2':
                    case '/water/02-3':
                    case '/water/03-2':
                    case '/water/03-1':
                    case '/water/04-1':
                    case '/water/04-2':
                    case '/water/05-1':
                    case '/water/06-1':
                    case '/water/07-1':
                    case '/water/07-2':
                    case '/water/08-1':
                    case '/water/09-1':
                    case '/water/132':
                    case '/comp-control':
                    case '/water-list':
                    case '/home':
                    case '/news':
                    case '/login':
                        return $element.addClass('body-wide body-water');
                }
                if(path.indexOf('water/')>0||path.indexOf('new-detail')>0){
                    return $element.addClass('body-wide body-water');
                }
            };

            addBg($location.path());

            $scope.$watch(path, function(newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                return addBg($location.path());
            });


        }
    }

})();


