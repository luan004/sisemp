const routes = 
[
    {
        route: "/",
        view: "Home",
        title: "Home",
        icon: "fa fa-home"
    },
    {
        route: "/login",
        view: "Login",
        hideSidebar: true,
        title: "Login"
    },
    {
        route: "/login/:id",
        view: "Login/User",
        showInSidebar: false,
        title: "User"
    }
]