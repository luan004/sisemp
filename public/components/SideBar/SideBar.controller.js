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
                title: "Meu perfil",
                url: "/profile",
                icon: "fa fa-user"
            },
            {
                title: "Materiais",
                icon: "fa fa-box",
                items: [
                    {
                        title:  "Listagem",
                        url: "/items"
                    },
                    {
                        title:  "Cadastro",
                        url: "/cadastro-material"
                    }
                ]
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
