(function(){
	/**
	* app.user Module
	*
	* Description
	*/
	angular.module('app.user').controller('UserCtrl', UserCtrl);

	UserCtrl.$inject = ['$scope', 'UserService'];

	function UserCtrl($scope, UserService) {
		UserService.getList().then(function(rs){
			console.log(rs);
		});
	}
})();