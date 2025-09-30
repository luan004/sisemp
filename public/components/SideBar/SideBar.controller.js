angular.module('App').component('sideBar', {
    templateUrl: "/components/SideBar/SideBar.template.html",
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
            }
        ];

        $ctrl.helpers = {
            itemIsActive: (path) => {
                return $location.path() === path
            }
        }
    }
});
