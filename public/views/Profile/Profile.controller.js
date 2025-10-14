angular
  .module("App")
  .controller("ProfileController", function ($location, $window) {
    this.user = {
      name: "João Silva Santos",
      email: "joao.silva@email.com",
      ra: "123456789",
    };

    this.states = {
      isEditing: false,
      isSaving: false,
    };

    this.editForm = {
      name: "",
      email: "",
      ra: "",
    };

    this.startEdit = function () {
      this.states.isEditing = true;

      this.editForm.name = this.user.name;
      this.editForm.email = this.user.email;
      this.editForm.ra = this.user.ra;
    };

    this.cancelEdit = function () {
      this.states.isEditing = false;

      this.editForm = {
        name: "",
        email: "",
        ra: "",
      };
    };

    this.saveProfile = function () {
      this.states.isSaving = true;

      setTimeout(() => {
        this.user.name = this.editForm.name;
        this.user.email = this.editForm.email;
        this.user.ra = this.editForm.ra;

        this.states.isSaving = false;
        this.states.isEditing = false;

        this.$apply();
      }, 500);
    };

    this.logout = function () {
      if ($window.confirm("Tem certeza que deseja sair?")) {
        $location.url("/login");
      }
    };

    this.$apply = function () {
      if (!this.$scope.$$phase) {
        this.$scope.$apply();
      }
    }.bind(this);
  });
