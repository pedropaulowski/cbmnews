<?php

use Classes\Imagem;
use Classes\Usuario;
use Dao\ImagemMySql;
use Dao\UsuarioMySql;

date_default_timezone_set('America/Sao_Paulo');

require '../../../vendor/autoload.php';
require '../../../config.php';
$hora = date("Y-m-d H:i:s");

$method = $_SERVER['REQUEST_METHOD'];
$header = getallheaders();
$usuarioDb = new UsuarioMySql($pdo);
$usuario = new Usuario;
$imagemDb = new ImagemMySql($pdo);
$i = new Imagem;

switch($method) {
    case 'PUT':
        $parametros = (json_decode(file_get_contents("php://input"), true));

    break;

    case 'POST':
        $imagem = $_FILES['imagem'];
        $token = $_POST['token'];

        if($usuarioDb->getUserByToken($token) && $imagem['tmp_name'] != "" && ($imagem['type'] == 'image/jpeg' || $imagem['type'] == 'image/png')) {
            $temp = explode(".", $_FILES['imagem']['name']);
            
            $idImagem =  md5($hora.$imagem['name']);
            $nomeImagem = $idImagem . '.' . end($temp);
            
            $i->setId($idImagem);
            $i->setUrl($nomeImagem);
            $envio = $imagemDb->add($i);

            if($envio) {
                move_uploaded_file($imagem['tmp_name'], '../../imagens/' . $nomeImagem);
                echo json_encode(
                    [
                        'id' => "$nomeImagem"
                    ]
                );
                http_response_code(201);

            } else {

                http_response_code(500);

            }

            
        } else {
            http_response_code(400);
        }

    break;

    case 'GET':
        echo json_encode($imagemDb->getAllImagens(), JSON_PRETTY_PRINT);
    break;

    default:
    break;

}