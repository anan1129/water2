(function(){
	/**
	* app.user Module
	*
	* Description
	*/
	angular.module('app.user').service('UserService', UserService);

	UserService.$inject = ['Restangular'];

	function UserService(Restangular) {
		return Restangular.all('/users');
	}
})();