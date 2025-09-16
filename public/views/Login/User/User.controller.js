angular.module('App').controller('LoginController', function ($routeParams) {
    this.message = $routeParams.id;
});
