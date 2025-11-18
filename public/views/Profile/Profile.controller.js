angular
  .module("App")
  .controller("ProfileController", function ($location, $window, $timeout) {
    this.user = {
      name: "Tayná Vicente Silva",
      email: "20241PVAI10030034@estudantes.ifpr.edu.br",
      ra: "20241PVAI10030034",
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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(this.editForm.email)) {
        alert("Por favor, informe um e-mail válido.");
        return;
      }

      this.states.isSaving = true;

      $timeout(() => {
        this.user.name = this.editForm.name;
        this.user.email = this.editForm.email;
        this.user.ra = this.editForm.ra;

        this.states.isSaving = false;
        this.states.isEditing = false;
      }, 500);
    };

    this.logout = function () {
      if ($window.confirm("Tem certeza que deseja sair?")) {
        $location.url("/login");
      }
    };
  });