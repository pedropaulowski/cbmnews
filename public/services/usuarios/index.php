<?php

use Classes\Usuario;
date_default_timezone_set('America/Sao_Paulo');

require '../../../vendor/autoload.php';
require '../../../config.php';
$hora = date("Y-m-d H:i:s");

$method = $_SERVER['REQUEST_METHOD'];
$header = getallheaders();
$usuarioDb = new Dao\UsuarioMySql($pdo);
$usuario = new Usuario;
switch($method) {
    case 'PUT':
        $parametros = (json_decode(file_get_contents("php://input"), true));

    break;

    case 'POST':
        $parametros = (json_decode(file_get_contents("php://input"), true));
        /* 
        Tipo de requisição enviada pelo front:
            action: newUser || logOut (somente o token será necessário, este que está no localStorage) || logIn (apenas senha e e-mail)
            email: email@email.com
            senha: senha
            nome: nome
        */
        if(isset($parametros['action'])) {
            $action = $parametros['action'];
            
            switch($action) {
                case 'newUser':
                    $email = filter_var($parametros['email'], FILTER_SANITIZE_EMAIL);
                    $senha = $parametros['senha'];
                    $nome = filter_var($parametros['nome'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
                    $id = md5($hora.$email);
                    $usuario->createUsuario($id, $email, $senha, $nome);

                    if($usuarioDb->add($usuario)) {
                        /*
                            Resposta caso cadastre
                            Código 200
                            Response: E-mail já utilizado
                        */
                        
                        $response = [
                            'token' => $usuarioDb->logIn($email, $senha)
                        ];
                        http_response_code(200);
                        echo json_encode($response, JSON_PRETTY_PRINT);

                    } else {
                        
                        /*
                            Resposta caso dê erro
                            Código 422
                            Response: E-mail já utilizado
                        */
                        $response = [
                            'error_message' => "E-mail já utilizado!"
                        ];
                        http_response_code(422);
                        echo json_encode($response, JSON_PRETTY_PRINT);
                    }
                break;
                case "logOut":
                    $token = $parametros['token'];

                    if($usuarioDb->getUserByToken($token)) {
                        if($usuarioDb->logOut($token))  {
                            /*
                                Resposta caso exista o token e consiga deslogar
                                Código 201
                            */
                            http_response_code(201);

                        } else {
                            /*
                                Resposta caso exista o token, mas não consiga deslogar
                                Código 500
                            */
                            http_response_code(500);
                        }
                    } else {
                        /*
                            Resposta caso não exista o token
                            Código 400
                        */
                        http_response_code(400);
                    }

                break;
                case 'logIn':
                    $email = filter_var($parametros['email'], FILTER_SANITIZE_EMAIL);
                    $senha = $parametros['senha'];
                    $token = $usuarioDb->logIn($email, $senha);
                    if($token != false) {
                        http_response_code(200);
                        /*
                            Resposta no de logIn bem sucedido
                            Códgio 200
                            response: token
                        */
                        $response = [
                            'token' => $token
                        ]; 
                        echo json_encode($response, JSON_PRETTY_PRINT);
                    } else {
                        http_response_code(406);

                    }
                break;

            }
        }

    break;

    case 'GET':
        
    break;

    default:
    break;

}