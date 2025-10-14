angular.module('App', [])
    .component('dataTable', {
        bindings: {
            data: '<',
            columns: '<',
            pageSize: '<',
            showSearch: '<',
            showPagination: '<'
        },
        template: `
      <div class="datatable-wrapper">
        <!-- Search e controles superiores -->
        <div class="datatable-header" ng-if="$ctrl.showSearch !== false">
          <div class="datatable-length">
            <label>
              Mostrar
              <select ng-model="$ctrl.itemsPerPage" ng-change="$ctrl.updatePagination()">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              registros
            </label>
          </div>
          <div class="datatable-search">
            <label>
              Buscar:
              <input type="search" ng-model="$ctrl.searchText" ng-change="$ctrl.filterData()" placeholder="">
            </label>
          </div>
        </div>

        <!-- Tabela -->
        <div class="datatable-container">
          <table class="datatable">
            <thead>
              <tr>
                <th ng-repeat="col in $ctrl.columns" 
                    ng-click="col.sortable !== false && $ctrl.sortBy(col.field)"
                    ng-class="{'sortable': col.sortable !== false, 'sorting': $ctrl.sortField === col.field}">
                  {{col.title}}
                  <span class="sort-icon" ng-if="col.sortable !== false && $ctrl.sortField === col.field">
                    <span ng-if="$ctrl.sortDirection === 'asc'">▲</span>
                    <span ng-if="$ctrl.sortDirection === 'desc'">▼</span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr ng-repeat="row in $ctrl.paginatedData" ng-class="{'odd': $index % 2 === 0, 'even': $index % 2 !== 0}">
                <td ng-repeat="col in $ctrl.columns">
                  <span ng-if="!col.render">{{row[col.field]}}</span>
                  <span ng-if="col.render" ng-bind-html="col.render(row[col.field], row)"></span>
                </td>
              </tr>
              <tr ng-if="$ctrl.paginatedData.length === 0">
                <td colspan="{{$ctrl.columns.length}}" class="datatable-empty">
                  Nenhum registro encontrado
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Informações e paginação -->
        <div class="datatable-footer" ng-if="$ctrl.showPagination !== false">
          <div class="datatable-info">
            Mostrando {{$ctrl.getStartRecord()}} até {{$ctrl.getEndRecord()}} de {{$ctrl.filteredData.length}} registros
            <span ng-if="$ctrl.filteredData.length !== $ctrl.data.length">
              (filtrado de {{$ctrl.data.length}} registros no total)
            </span>
          </div>
          <div class="datatable-pagination">
            <button ng-click="$ctrl.previousPage()" ng-disabled="$ctrl.currentPage === 1" class="paginate-button">
              Anterior
            </button>
            <span class="pagination-numbers">
              <button ng-repeat="page in $ctrl.getPages()" 
                      ng-click="$ctrl.goToPage(page)"
                      ng-class="{'current': page === $ctrl.currentPage}"
                      class="paginate-button">
                {{page}}
              </button>
            </span>
            <button ng-click="$ctrl.nextPage()" ng-disabled="$ctrl.currentPage === $ctrl.totalPages" class="paginate-button">
              Próximo
            </button>
          </div>
        </div>
      </div>
    `,
        controller: function() {
            const $ctrl = this;

            $ctrl.$onInit = function() {
                $ctrl.itemsPerPage = $ctrl.pageSize || 10;
                $ctrl.currentPage = 1;
                $ctrl.searchText = '';
                $ctrl.sortField = null;
                $ctrl.sortDirection = 'asc';
                $ctrl.filteredData = [];
                $ctrl.paginatedData = [];

                $ctrl.updateData();
            };

            $ctrl.$onChanges = function(changes) {
                if (changes.data && !changes.data.isFirstChange()) {
                    $ctrl.updateData();
                }
            };

            $ctrl.updateData = function() {
                $ctrl.filterData();
            };

            $ctrl.filterData = function() {
                if (!$ctrl.data) {
                    $ctrl.filteredData = [];
                    $ctrl.updatePagination();
                    return;
                }

                if (!$ctrl.searchText) {
                    $ctrl.filteredData = angular.copy($ctrl.data);
                } else {
                    const search = $ctrl.searchText.toLowerCase();
                    $ctrl.filteredData = $ctrl.data.filter(function(row) {
                        return $ctrl.columns.some(function(col) {
                            const value = row[col.field];
                            return value && value.toString().toLowerCase().includes(search);
                        });
                    });
                }

                $ctrl.currentPage = 1;
                $ctrl.updatePagination();
            };

            $ctrl.sortBy = function(field) {
                if ($ctrl.sortField === field) {
                    $ctrl.sortDirection = $ctrl.sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    $ctrl.sortField = field;
                    $ctrl.sortDirection = 'asc';
                }

                $ctrl.filteredData.sort(function(a, b) {
                    let valA = a[field];
                    let valB = b[field];

                    if (typeof valA === 'string') valA = valA.toLowerCase();
                    if (typeof valB === 'string') valB = valB.toLowerCase();

                    if (valA < valB) return $ctrl.sortDirection === 'asc' ? -1 : 1;
                    if (valA > valB) return $ctrl.sortDirection === 'asc' ? 1 : -1;
                    return 0;
                });

                $ctrl.updatePagination();
            };

            $ctrl.updatePagination = function() {
                $ctrl.totalPages = Math.ceil($ctrl.filteredData.length / $ctrl.itemsPerPage);
                if ($ctrl.currentPage > $ctrl.totalPages) {
                    $ctrl.currentPage = $ctrl.totalPages || 1;
                }

                const start = ($ctrl.currentPage - 1) * $ctrl.itemsPerPage;
                const end = start + parseInt($ctrl.itemsPerPage);
                $ctrl.paginatedData = $ctrl.filteredData.slice(start, end);
            };

            $ctrl.previousPage = function() {
                if ($ctrl.currentPage > 1) {
                    $ctrl.currentPage--;
                    $ctrl.updatePagination();
                }
            };

            $ctrl.nextPage = function() {
                if ($ctrl.currentPage < $ctrl.totalPages) {
                    $ctrl.currentPage++;
                    $ctrl.updatePagination();
                }
            };

            $ctrl.goToPage = function(page) {
                $ctrl.currentPage = page;
                $ctrl.updatePagination();
            };

            $ctrl.getPages = function() {
                const pages = [];
                const maxVisible = 5;
                let start = Math.max(1, $ctrl.currentPage - Math.floor(maxVisible / 2));
                let end = Math.min($ctrl.totalPages, start + maxVisible - 1);

                if (end - start < maxVisible - 1) {
                    start = Math.max(1, end - maxVisible + 1);
                }

                for (let i = start; i <= end; i++) {
                    pages.push(i);
                }
                return pages;
            };

            $ctrl.getStartRecord = function() {
                return $ctrl.filteredData.length === 0 ? 0 : ($ctrl.currentPage - 1) * $ctrl.itemsPerPage + 1;
            };

            $ctrl.getEndRecord = function() {
                return Math.min($ctrl.currentPage * $ctrl.itemsPerPage, $ctrl.filteredData.length);
            };
        }
    });