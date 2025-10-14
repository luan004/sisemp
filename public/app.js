/* 
 * Incia o componente App e carrega as rotas definidas em routes.js
 *
 * @author Luan Gabriel
 */

angular.module('App', ['ngRoute', 'oc.lazyLoad', 'ngAnimate']).config(function ($routeProvider, $locationProvider) {

    routes.forEach(route => {
        $routeProvider.when(route.route, getView(route))
    });

    $routeProvider.otherwise({templateUrl: `views/_ErrorPages/NotFound.html`});

    $locationProvider.html5Mode(true);
})

angular.module('App').controller('AppController', function () {
    this.showSidebarButtonNames = true;
    
    this.tabs = routes.filter(function (i) {
        return i.showInSidebar != false;
    })
})

// Atualiza o elemento title da página de acordo com a rota atual
angular.module('App').run(function ($rootScope, $route) {
    $rootScope.showSidebar = true;

    $rootScope.$on('$routeChangeSuccess', function () {

        if ($route.current) {
            if ($route.current.title) {
                $rootScope.pageTitle = $route.current.title;
                document.title = $route.current.title;
            } else {
                document.title = '';
            }

            $rootScope.showSidebar = $route.current.hideSidebar
        }
    });
});

const getView = function (route) {
    let component = route.view.split('/').pop();

    route.templateUrl = `views/${route.view}/${component}.template.html`
    route.resolve = {
        loadController: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({
                name: 'App',
                files: [`views/${route.view}/${component}.controller.js`]
            });
        }]
    }

    return route
}