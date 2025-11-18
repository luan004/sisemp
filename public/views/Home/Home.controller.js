angular.module('App').controller('HomeController', function () {

    const $ctrl = this

    $ctrl.cards = [
        {
            title: "Alunos",
            color: "primary",
            icon: "fa fa-users",
            url: "/alunos"
        },
        {
            title: "Materiais",
            color: "success",
            icon: "fa-solid fa-boxes-stacked",
            url: "/items"
        },
        {
            title: "Empréstimos",
            color: "danger",
            icon: "fa fa-handshake",
            url: "/loans"
        }
    ]

    $ctrl.status = {
        DEVOLVIDO: {
            title: "Devolvido",
            color: "success"
        },
        EMPRESTADO: {
            title: "Emprestado",
            color: "warning"
        },
        NAO_DEVOLVIDO: {
            title: "Não Devolvido",
            color: "danger"
        }
    };

    $ctrl.items = [
        {
            aluno: "Gabriel da Silva",
            item: "Bola de Vôlei",
            count: 1,
            dataInicio: "15/11/2025 10h10",
            dataFim: "15/11/2025 10h30",
            status: "DEVOLVIDO"
        },
        {
            aluno: "Maria Oliveira",
            item: "Corda de Pular",
            count: 1,
            dataInicio: "16/11/2025 09h00",
            dataFim: "16/11/2025 09h20",
            status: "DEVOLVIDO"
        },
        {
            aluno: "Lucas Pereira",
            item: "Bola de Futebol",
            count: 1,
            dataInicio: "16/11/2025 14h15",
            dataFim: null,
            status: "EMPRESTADO"
        },
        {
            aluno: "Ana Souza",
            item: "Raquete de Tênis",
            count: 2,
            dataInicio: "17/11/2025 08h30",
            dataFim: null,
            status: "NAO_DEVOLVIDO"
        },
        {
            aluno: "Bruno Almeida",
            item: "Cone de Treinamento",
            count: 5,
            dataInicio: "17/11/2025 11h00",
            dataFim: "17/11/2025 11h45",
            status: "DEVOLVIDO"
        },
        {
            aluno: "Carla Mendes",
            item: "Tabuleiro de Xadrez",
            count: 1,
            dataInicio: "17/11/2025 15h00",
            dataFim: null,
            status: "EMPRESTADO"
        },
        {
            aluno: "Pedro Henrique",
            item: "Bola de Basquete",
            count: 1,
            dataInicio: "18/11/2025 10h00",
            dataFim: null,
            status: "NAO_DEVOLVIDO"
        }
    ];
});