angular.module("ALMSistemasApp.controllers", [])
.controller("MainController", function ($scope) {
    $scope.message = "Main Controller";


})
.controller("AddUsuarioController", function ($scope, UsuarioService) {
    $scope.message = "Informe os dados do usuário";
    $scope.AddUsuario = function () {        
        UsuarioService.AddUsuario($scope.usuario, $scope);        
    }


})
.controller("ListUsuarioController", function ($scope, UsuarioService) {
    $scope.message = "Lista de usuário";

    UsuarioService.GetUsuarios().then(function (d) {
        $scope.listaUsuarios = d.data.listaUsuarios;
    })

    $scope.DeleteUsuario = function (id, linha) {
        if (confirm("Deseja remover este usuário?")) {
            UsuarioService.DeleteUsuario(id, linha)
        }
    }
        
    
    $scope.AbrirTelaCadastro = function ($location, $window, $rootScope) {
        var viewPath = '!/CadastroUsuario';
        var currentPath = window.location.href.substr(0, window.location.href.indexOf('#') + 1);
        var fullPath = currentPath + viewPath;
        window.open(fullPath, '_blank');
    }
})
.controller("UpdateUsuarioController", function ($scope, $window, UsuarioService, $routeParams) {
    $scope.message = "Atualizar usuário";

    var id = $routeParams.id;

    UsuarioService.GetUsuario(id).then(function (d) {
        $scope.usuario = d.data.usuario;
    })

    $scope.AtualizarUsuario = function () {
        UsuarioService.AddUsuario($scope.usuario);
        $window.location.href = '#!/ListarUsuarios';
    }
})
.factory("UsuarioService", ['$http', function ($http) {
    var factory = {};

    factory.AddUsuario = function (usuario, scope) {
        scope.status = "running";
        $http.post("/Usuario/AddUsuario", usuario).then(function (success) {
            alert(success.data.mensagem);
            scope.status = "done";
        }, function (error) {
            alert("error");
            scope.status = "done";
        });
    }

    factory.GetUsuarios = function () {
        //$("#pleaseWaitDialog").show();
        return $http.get("/Usuario/GetUsuarios");
    }

    factory.GetUsuario = function (id) {
        return $http.get("/Usuario/GetUsuario", { params: { id: id } });
    }

    factory.DeleteUsuario = function (id, linha) {
        $http.post("/Usuario/DeleteUsuario", { id: id }).then(function (success) {
            alert(success.data.mensagem);
            $(linha).closes("tr").remove();
        });
    }

    return factory;
}])