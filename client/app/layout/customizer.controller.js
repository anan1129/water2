(function () {
    angular.module('app.layout')
        .controller('CustomizerCtrl', ['$scope', CustomizerCtrl])
        .controller('SidebarCtrl',['$scope','$mdDialog',SidebarCtrl])
        .controller('DialogCtrl',['$scope','$mdDialog',DialogCtrl])
    ;

    function CustomizerCtrl ($scope) {

    }

    function SidebarCtrl($scope,$mdDialog){
        $scope.openModal=openModal;

        function openModal(){
            $mdDialog.show({
                controller:['$scope','$mdDialog',DialogCtrl],
                templateUrl:'app/layout/modal.html',
                clickOutsideToClose:true,
                size:'lg'
            })
        }
    }

    function DialogCtrl($scope,$mdDialog){
        $scope.hide=hide;

        function hide(){
            $mdDialog.hide();
        }
    }

})();
