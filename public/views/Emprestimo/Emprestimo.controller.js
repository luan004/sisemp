angular.module('App').controller('EmprestimoController', function($timeout) {
    var ctrl = this;
    
    // Categorias (EXATAMENTE iguais ao ItemList)
    ctrl.categories = {
        ELETRONIC: {
            title: "Eletrônicos",
            color: "primary"
        },
        SPORT: {
            title: "Esporte",
            color: "success"
        },
        UTILITARY: {
            title: "Utilitários",
            color: "warning"
        },
        OTHER: {
            title: "Outros",
            color: "secondary"
        }
    };
    
    // Helper para formatar preço (igual ao ItemList)
    ctrl.helpers = {
        getPriceValue: (value) =>
            new Intl.NumberFormat("pt-BR", { style: 'currency', currency: "BRL" }).format(value)
    };
    
    // Lista de materiais (mesma do ItemList)
    ctrl.materiais = [
        {
            uuid: "1a1b2411-f896-4fca-b27f-1d776cef8a01",
            title: "Calculadora Científica",
            description: "Utilizada em aulas de matemática e física.",
            category: "ELETRONIC",
            price: 120.00,
            isActive: true,
            estoque: 10
        },
        {
            uuid: "1a1b2411-f896-4fca-b27f-1d776cef8a02",
            title: "Notebook Educacional",
            description: "Equipamento para pesquisas e atividades escolares.",
            category: "ELETRONIC",
            price: 2500.00,
            isActive: true,
            estoque: 5
        },
        {
            uuid: "1a1b2411-f896-4fca-b27f-1d776cef8a03",
            title: "Projetor Multimídia",
            description: "Projetor para apresentações em sala de aula.",
            category: "ELETRONIC",
            price: 1800.00,
            isActive: true,
            estoque: 3
        },
        {
            uuid: "1a1b2411-f896-4fca-b27f-1d776cef8a04",
            title: "Tablet Educacional",
            description: "Tablet disponível para atividades digitais.",
            category: "ELETRONIC",
            price: 900.00,
            isActive: true,
            estoque: 8
        },
        {
            uuid: "2b2b2411-f896-4fca-b27f-1d776cef8b01",
            title: "Bola de Futebol",
            description: "Material de uso das aulas de educação física.",
            category: "SPORT",
            price: 70.00,
            isActive: true,
            estoque: 15
        },
        {
            uuid: "2b2b2411-f896-4fca-b27f-1d776cef8b02",
            title: "Bola de Basquete",
            description: "Bola oficial tamanho padrão.",
            category: "SPORT",
            price: 95.00,
            isActive: true,
            estoque: 12
        },
        {
            uuid: "2b2b2411-f896-4fca-b27f-1d776cef8b03",
            title: "Cordas de Pular",
            description: "Cordas usadas nas atividades esportivas.",
            category: "SPORT",
            price: 20.00,
            isActive: true,
            estoque: 20
        },
        {
            uuid: "2b2b2411-f896-4fca-b27f-1d776cef8b04",
            title: "Rede de Vôlei",
            description: "Rede para quadra de esportes.",
            category: "SPORT",
            price: 150.00,
            isActive: true,
            estoque: 4
        },
        {
            uuid: "3c3c2411-f896-4fca-b27f-1d776cef8c01",
            title: "Caixa de Ferramentas",
            description: "Usada pela manutenção e pequenos reparos.",
            category: "UTILITARY",
            price: 180.00,
            isActive: true,
            estoque: 6
        },
        {
            uuid: "3c3c2411-f896-4fca-b27f-1d776cef8c02",
            title: "Extensão Elétrica",
            description: "Cabo de energia de 10 metros.",
            category: "UTILITARY",
            price: 45.00,
            isActive: true,
            estoque: 10
        },
        {
            uuid: "3c3c2411-f896-4fca-b27f-1d776cef8c03",
            title: "Tripé para Câmera/Projetor",
            description: "Suporte ajustável para equipamentos.",
            category: "UTILITARY",
            price: 120.00,
            isActive: true,
            estoque: 7
        },
        {
            uuid: "4d4d2411-f896-4fca-b27f-1d776cef8d01",
            title: "Dicionário Português",
            description: "Uso comum pelos alunos.",
            category: "OTHER",
            price: 45.00,
            isActive: true,
            estoque: 25
        },
        {
            uuid: "4d4d2411-f896-4fca-b27f-1d776cef8d02",
            title: "Mapa Mundi",
            description: "Mapa físico disponível para atividades de geografia.",
            category: "OTHER",
            price: 30.00,
            isActive: true,
            estoque: 8
        },
        {
            uuid: "4d4d2411-f896-4fca-b27f-1d776cef8d03",
            title: "Globo Terrestre",
            description: "Material didático para estudos de geografia.",
            category: "OTHER",
            price: 110.00,
            isActive: true,
            estoque: 5
        },
        {
            uuid: "4d4d2411-f896-4fca-b27f-1d776cef8d04",
            title: "Estojo de Geometria",
            description: "Conjunto com régua, compasso e esquadros.",
            category: "OTHER",
            price: 25.00,
            isActive: true,
            estoque: 30
        }
    ];
    
    // Filtra apenas materiais ativos
    ctrl.materiais = ctrl.materiais.filter(function(item) {
        return item.isActive === true;
    });
    
    // Material selecionado
    ctrl.materialSelecionado = null;
    ctrl.quantidadeDisponivel = 0;
    
    // Inicializa o formulário
    ctrl.form = {
        nomeAluno: '',
        curso: '',
        serie: '',
        materialId: '',
        quantidade: 1,
        dataEmprestimo: new Date().toISOString().split('T')[0],
        horaEmprestimo: new Date().toTimeString().slice(0, 5),
        dataDevolucao: '',
        horaDevolucao: '',
        observacoes: ''
    };
    
    // Estados
    ctrl.states = {
        emprestimoSucesso: false,
        erro: false,
        salvando: false
    };
    
    ctrl.mensagemErro = '';
    
    // Quando seleciona um material
    ctrl.selecionarMaterial = function() {
        if (ctrl.form.materialId) {
            ctrl.materialSelecionado = ctrl.materiais.find(function(item) {
                return item.uuid === ctrl.form.materialId;
            });
            
            if (ctrl.materialSelecionado) {
                ctrl.quantidadeDisponivel = ctrl.materialSelecionado.estoque || 0;
                ctrl.form.quantidade = 1;
            }
        } else {
            ctrl.materialSelecionado = null;
            ctrl.quantidadeDisponivel = 0;
        }
    };
    
    // Valida o formulário
    ctrl.validarFormulario = function() {
        // Valida quantidade
        if (ctrl.form.quantidade > ctrl.quantidadeDisponivel) {
            ctrl.mensagemErro = 'Quantidade solicitada maior que a disponível.';
            return false;
        }
        
        if (ctrl.form.quantidade < 1) {
            ctrl.mensagemErro = 'Quantidade deve ser maior que zero.';
            return false;
        }
        
        // Valida datas
        var dataEmprestimo = new Date(ctrl.form.dataEmprestimo + ' ' + ctrl.form.horaEmprestimo);
        var dataDevolucao = new Date(ctrl.form.dataDevolucao + ' ' + ctrl.form.horaDevolucao);
        
        if (dataDevolucao <= dataEmprestimo) {
            ctrl.mensagemErro = 'A data de devolução deve ser posterior à data de empréstimo.';
            return false;
        }
        
        return true;
    };
    
    // Submete o formulário
    ctrl.submit = function() {
        if (!ctrl.validarFormulario()) {
            ctrl.states.erro = true;
            $timeout(function() {
                ctrl.states.erro = false;
            }, 5000);
            return;
        }
        
        ctrl.states.salvando = true;
        
        var dadosEmprestimo = {
            aluno: {
                nome: ctrl.form.nomeAluno,
                curso: ctrl.form.curso,
                serie: ctrl.form.serie
            },
            material: {
                uuid: ctrl.materialSelecionado.uuid,
                title: ctrl.materialSelecionado.title,
                category: ctrl.materialSelecionado.category
            },
            quantidade: ctrl.form.quantidade,
            dataEmprestimo: ctrl.form.dataEmprestimo + ' ' + ctrl.form.horaEmprestimo,
            dataDevolucao: ctrl.form.dataDevolucao + ' ' + ctrl.form.horaDevolucao,
            observacoes: ctrl.form.observacoes
        };
        
        console.log('Empréstimo registrado:', dadosEmprestimo);
        
        // Simulação de salvamento
        $timeout(function() {
            ctrl.states.salvando = false;
            ctrl.states.emprestimoSucesso = true;
            
            // Esconde o alerta após 4 segundos
            $timeout(function() {
                ctrl.states.emprestimoSucesso = false;
            }, 4000);
            
            // Limpa o formulário
            ctrl.limparFormulario();
        }, 1500);
    };
    
    // Limpa o formulário
    ctrl.limparFormulario = function() {
        ctrl.form = {
            nomeAluno: '',
            curso: '',
            serie: '',
            materialId: '',
            quantidade: 1,
            dataEmprestimo: new Date().toISOString().split('T')[0],
            horaEmprestimo: new Date().toTimeString().slice(0, 5),
            dataDevolucao: '',
            horaDevolucao: '',
            observacoes: ''
        };
        ctrl.materialSelecionado = null;
        ctrl.quantidadeDisponivel = 0;
    };
});