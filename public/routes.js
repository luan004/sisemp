const routes = [
  {
    route: "/",
    view: "Home",
    title: "Home",
    icon: "fa fa-home",
  },
  {
    route: "/login",
    view: "Login",
    hideSidebar: true,
    title: "Login",
  },
  {
    route: "/login/:id",
    view: "Login/User",
    showInSidebar: false,
    title: "User",
  },
  {
    route: "/profile",
    view: "Profile",
    showInSidebar: false,
    title: "Profile",
  },
  {
    route: "/cadastro-material",
    view: "CadastroMaterial",
    showInSidebar: false,
    title: "CadastroMaterial"
  }
];
