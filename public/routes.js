const routes = [
  {
    route: "/",
    view: "Home",
    title: "SISEMP - Home",
    icon: "fa fa-home",
  },
  {
    route: "/login",
    view: "Login",
    title: "SISEMP - Login",
  },
  {
    route: "/login/:id",
    view: "Login/User",
    title: "User",
  },
  {
    route: "/profile",
    view: "Profile",
    title: "SISEMP - Perfil",
  },
  {
    route: "/items/new",
    view: "CadastroMaterial",
    title: "SISEMP - Cadastrar Material"
  },
  {
    route: "/items",
    view: "Items/ItemList",
    title: "SISEMP - Materiais"
  },
  {
    route: "/loans/new",
    view: "Emprestimo",
    title: "SISEMP - Registar Empréstimo"
  },
  {
    route: "/loans",
    view: "EmprestimoList",
    title: "SISEMP - Empréstimos"
  },
  {
    route: "/alunos",
    view: "AlunosList",
    title: "SISEMP - Alunos"
  }
];
