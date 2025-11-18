angular.module('App').component('sideBar', {
    templateUrl: "/components/SideBar/SideBar.template.html",
    transclude: true,
    bindings: {
        content: '@'
    },
    controller: function($location) {
        var $ctrl = this;

        $ctrl.states = {
            isActive: false,
            showNotification: false
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
                title: "Alunos",
                icon: "fa fa-users",
                url: "/alunos"
            },
            {
                title: "Materiais",
                icon: "fa fa-box",
                items: [
                    {
                        title:  "Listar Materiais",
                        url: "/items"
                    },
                    {
                        title:  "Cadastrar Material",
                        url: "/items/new"
                    }
                ]
            },
            {
                title: "Emprestimos",
                icon: "fa fa-handshake",
                items: [
                    {
                        title: "Listar Empréstimo",
                        url: "/loans"
                    },
                    {
                        title: "Realizar empréstimo",
                        url: "/loans/new"
                    }
                ]
            },
            {
                title: "Sair",
                icon: "fa-solid fa-right-from-bracket",
                url: "/login"
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
