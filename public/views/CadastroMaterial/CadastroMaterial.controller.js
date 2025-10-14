angular.module('App').controller('ProdutoController', function($timeout) {
    var ctrl = this;
    
    // Inicializa o formulário
    ctrl.form = {
        nome: '',
        descricao: '',
        preco: null,
        estoque: null,
        categoria: '',
        ativo: false
    };
    
    // Inicializa os estados - começa como false para não mostrar o alerta
    ctrl.states = {
        cadastroSucesso: false
    };
    
    // Função chamada ao submeter o formulário
    ctrl.submit = function() {
        // Aqui você faria a chamada para API/backend
        console.log('Material cadastrado:', ctrl.form);
        
        // Mostra o alerta de sucesso
        ctrl.states.cadastroSucesso = true;
        
        // Esconde o alerta após 4 segundos
        $timeout(function() {
            ctrl.states.cadastroSucesso = false;
        }, 4000);
        
        // Limpa o formulário após cadastro
        ctrl.form = {
            nome: '',
            descricao: '',
            preco: null,
            estoque: null,
            categoria: '',
            ativo: false
        };
    };
});