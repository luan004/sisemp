angular.module('App').controller('ItemList', function () {
    const $ctrl = this

    $ctrl.filters = {
        uuid: null,
        title: null,
        category: null
    }

    $ctrl.categories = {
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

    $ctrl.helpers = {
        getPriceValue: (value) =>
            new Intl.NumberFormat("pt-BR", { style: 'currency', currency: "BRL" }).format(value)
    };

    $ctrl.editForm = {};

    $ctrl.events = {
        setFilters: () => {
            let items = $ctrl.defaultItems;

            if ($ctrl.filters.uuid) {
                items = items.filter((i) => i.uuid.includes($ctrl.filters.uuid));
            }

            if ($ctrl.filters.title && $ctrl.filters.title !== '') {
                items = items.filter((i) =>
                    i.title.toLowerCase().includes($ctrl.filters.title.toLowerCase())
                );
            }

            if ($ctrl.filters.category && $ctrl.filters.category !== '') {
                items = items.filter((i) => i.category === $ctrl.filters.category);
            }

            $ctrl.items = items;
        },

        openModal: (item) => {
            $ctrl.editForm = angular.copy(item);
            const modal = new bootstrap.Modal(document.getElementById("editModal"));
            modal.show();
        },

        saveEdit: () => {
            const index = $ctrl.items.findIndex(i => i.uuid === $ctrl.editForm.uuid);

            if (index >= 0) {
                $ctrl.items[index] = angular.copy($ctrl.editForm);
            }

            const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
            modal.hide();
        }
    };

    $ctrl.defaultItems = [
        {
            uuid: "1a1b2411-f896-4fca-b27f-1d776cef8a01",
            title: "Calculadora Científica",
            description: "Utilizada em aulas de matemática e física.",
            category: "ELETRONIC",
            price: 120.00,
            isActive: true
        },
        {
            uuid: "1a1b2411-f896-4fca-b27f-1d776cef8a02",
            title: "Notebook Educacional",
            description: "Equipamento para pesquisas e atividades escolares.",
            category: "ELETRONIC",
            price: 2500.00,
            isActive: true
        },
        {
            uuid: "1a1b2411-f896-4fca-b27f-1d776cef8a03",
            title: "Projetor Multimídia",
            description: "Projetor para apresentações em sala de aula.",
            category: "ELETRONIC",
            price: 1800.00,
            isActive: true
        },
        {
            uuid: "1a1b2411-f896-4fca-b27f-1d776cef8a04",
            title: "Tablet Educacional",
            description: "Tablet disponível para atividades digitais.",
            category: "ELETRONIC",
            price: 900.00,
            isActive: true
        },

        // SPORT
        {
            uuid: "2b2b2411-f896-4fca-b27f-1d776cef8b01",
            title: "Bola de Futebol",
            description: "Material de uso das aulas de educação física.",
            category: "SPORT",
            price: 70.00,
            isActive: true
        },
        {
            uuid: "2b2b2411-f896-4fca-b27f-1d776cef8b02",
            title: "Bola de Basquete",
            description: "Bola oficial tamanho padrão.",
            category: "SPORT",
            price: 95.00,
            isActive: true
        },
        {
            uuid: "2b2b2411-f896-4fca-b27f-1d776cef8b03",
            title: "Cordas de Pular",
            description: "Cordas usadas nas atividades esportivas.",
            category: "SPORT",
            price: 20.00,
            isActive: true
        },
        {
            uuid: "2b2b2411-f896-4fca-b27f-1d776cef8b04",
            title: "Rede de Vôlei",
            description: "Rede para quadra de esportes.",
            category: "SPORT",
            price: 150.00,
            isActive: true
        },

        // UTILITARY
        {
            uuid: "3c3c2411-f896-4fca-b27f-1d776cef8c01",
            title: "Caixa de Ferramentas",
            description: "Usada pela manutenção e pequenos reparos.",
            category: "UTILITARY",
            price: 180.00,
            isActive: true
        },
        {
            uuid: "3c3c2411-f896-4fca-b27f-1d776cef8c02",
            title: "Extensão Elétrica",
            description: "Cabo de energia de 10 metros.",
            category: "UTILITARY",
            price: 45.00,
            isActive: true
        },
        {
            uuid: "3c3c2411-f896-4fca-b27f-1d776cef8c03",
            title: "Tripé para Câmera/Projetor",
            description: "Suporte ajustável para equipamentos.",
            category: "UTILITARY",
            price: 120.00,
            isActive: true
        },
        {
            uuid: "3c3c2411-f896-4fca-b27f-1d776cef8c04",
            title: "Carregador Universal",
            description: "Carregador utilizado para diversos dispositivos.",
            category: "UTILITARY",
            price: 35.00,
            isActive: false
        },

        // OTHER
        {
            uuid: "4d4d2411-f896-4fca-b27f-1d776cef8d01",
            title: "Dicionário Português",
            description: "Uso comum pelos alunos.",
            category: "OTHER",
            price: 45.00,
            isActive: true
        },
        {
            uuid: "4d4d2411-f896-4fca-b27f-1d776cef8d02",
            title: "Mapa Mundi",
            description: "Mapa físico disponível para atividades de geografia.",
            category: "OTHER",
            price: 30.00,
            isActive: true
        },
        {
            uuid: "4d4d2411-f896-4fca-b27f-1d776cef8d03",
            title: "Globo Terrestre",
            description: "Material didático para estudos de geografia.",
            category: "OTHER",
            price: 110.00,
            isActive: true
        },
        {
            uuid: "4d4d2411-f896-4fca-b27f-1d776cef8d04",
            title: "Estojo de Geometria",
            description: "Conjunto com régua, compasso e esquadros.",
            category: "OTHER",
            price: 25.00,
            isActive: true
        }
    ];

    $ctrl.items = $ctrl.defaultItems;
});
