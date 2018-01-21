var app = angular.module("ALMSistemasApp", ["ALMSistemasApp.controllers", "ngRoute"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.
    when("/", { templateUrl: "/Partials/BemVindo.html", controller: "MainController" }).
    when("/CadastroUsuario", { templateUrl: "/Partials/Usuario/AddUsuario.html", controller: "AddUsuarioController" }).
    when("/ListarUsuarios", { templateUrl: "/Partials/Usuario/ListUsuario.html", controller: "ListUsuarioController" }).
    when("/AtualizarUsuario/:id", { templateUrl: "/Partials/Usuario/UpdateUsuario.html", controller: "UpdateUsuarioController" }).    
    otherwise({ redirectTo: "/" });
}])