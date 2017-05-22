(function(){
	/**
	* app.user Module
	*
	* Description
	*/
	angular.module('app.user').config(['$stateProvider',function($stateProvider){
            $stateProvider
                .state('users', {
                    url: '/users',
                    templateUrl: 'app/user/users.html'
                })

        }])
})();