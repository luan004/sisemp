angular.module('App').controller('LoginController', function ($location, $timeout) {

    this.form = {
        username: '',
        password: ''
    };

    this.recoverEmail = '';

    this.states = {
        isFailed: false,
        recoverMode: false,
        recoverSuccess: false
    };

    this.submit = function () {
        this.states.isFailed = false;

        // Falha usuário e senha incorretos
        if (this.form.username != 'admin' || this.form.password != 'admin') {
            this.states.isFailed = true;
            return;
        }

        $location.url('/');
    };

    this.recover = function () {

        if (!this.recoverEmail) {
            alert("Informe um e-mail válido.");
            return;
        }

        this.recoverEmail = '';
        this.states.recoverMode = false;
        this.states.recoverSuccess = true;

        $timeout(() => {
            this.states.recoverSuccess = false;
        }, 5000);
    };

    this.backToLogin = function () {
        this.states.recoverMode = false;
        this.states.recoverSuccess = false;
    };

});