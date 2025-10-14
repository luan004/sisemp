angular.module('App').component('sideBar', {
    templateUrl: "/components/SideBar/SideBar.template.html",
    transclude: true,
    bindings: {
        content: '@'
    },
    controller: function($location) {
        var $ctrl = this;

        $ctrl.states = {
            isActive: false
        }

        $ctrl.items = [
            {
                title: "Início",
                url: "/",
                icon: "fa fa-home"
            },
            {
                title: "Teste",
                url: "/teste",
                icon: "fa fa-home"
            }
        ];

        $ctrl.helpers = {
            itemIsActive: (path) => {
                return $location.path() === path
            }
        }

        $ctrl.events = {
            hide: () => {
                if ($ctrl.states.isActive) {
                    $ctrl.states.isActive = false
                }
            }
        }
    }
});
