angular.module('App').controller('LoginController', function ($location) {

    this.form = {
        username: '',
        password: ''
    }

    this.states = {
        isFailed: false
    }
    
    this.submit = function () {
        this.states.isFailed = false

        /**
         * Falha usuário e senha incorretos
         */
        if (this.form.username != 'admin' || this.form.password != 'admin') {
            this.states.isFailed = true
            return;
        }

        $location.url('/')
    }
});
