<?php

use Classes\Noticia;
use Dao\NoticiaMySql;
use Dao\UsuarioMySql;

date_default_timezone_set('America/Sao_Paulo');

require '../../../vendor/autoload.php';
require '../../../config.php';
$hora = date("Y-m-d H:i:s");

$method = $_SERVER['REQUEST_METHOD'];
$header = getallheaders();
$noticia = new Noticia;
$noticiaDb = new NoticiaMySql($pdo);
$usuarioDb = new UsuarioMySql($pdo);

switch($method) {
    case 'PUT':
        $parametros = (json_decode(file_get_contents("php://input"), true));

    break;

    case 'DELETE':
        $parametros = (json_decode(file_get_contents("php://input"), true));
        
        /*
            token : token
            id : id da noticia
        */

        $token = $parametros['token'];
        $id = $parametros['id'];

        if($usuarioDb->getUserByToken($token) != false) {
            $noticiaDb->delete($id);
            http_response_code(201);
        } else  {
            http_response_code(401);
        }
    break;

    case 'POST':
        $parametros = (json_decode(file_get_contents("php://input"), true));
        /*
        RECEBIMENTO DA NOTICIA PARA GUARDAR NO BD - AS IMAGENS DEVEM SER ENVIADAS ANTES DE ENVIAR A NOTICIA
        action => newNoticia
        token => token (para autenticar se o usuário pode ou não postar algo)
        manchete => Manchete 
        descricao => descricao
        paragrafos => [

                type => text || img || video (youtube ID) || blockquote,
                text => "case text-> plain text, case img-> img URL, case video-> youtube video ID, case blockquote->plain text"
            ]
        ]
        autor => opcional
        capa => img URL da capa
        keywords => exemplo-> "Comida, Japão, Brasil"
        categoria => opcional

        */
        if(isset($parametros['action'])) {
            $action = $parametros['action'];

            switch($action) {
                case "newNoticia":
                    $token = $parametros['token'];
                    if($usuarioDb->getUserByToken($token) != false) {
                        $noticia = new Noticia;
                        $manchete = $parametros['manchete'];
                        $id = md5($hora.$manchete);
                        $keywords = $parametros['keywords'];
                        $descricao = $parametros['descricao'];
                        $paragrafos = json_encode($parametros['paragrafos']);
                        $capa = $parametros['capa'];
                        $categoria = $parametros['categoria'];

                        $noticia->createNoticia( $id, $manchete, $keywords, $descricao, $paragrafos, $capa, $categoria);
                        
                        if($noticiaDb->add($noticia)) {
                            http_response_code(200);
                            $reponse = [
                                "link" => "https://cbm_g1.test/noticia.html?id=$id"
                            ];

                            echo json_encode($reponse);
                        } else {
                            http_response_code(400);
                        }


                    } else {
                        /*
                        Caso não autentique o usuario
                        resposen 401
                        */
                        http_response_code(401);
                    }
                break;
            }
        }
        
    break;

    case 'GET':
        /*
        ALL (Não precisa de parametros)
        By Id (Somente o ID)
        Search (Utiliza palavras que chaves para serem encontradas na manchete, na descricao ou nas palavras chaves)
        */

        if(isset($_GET['id'])) {
            // var_dump($noticiaDb->getNoticiaById($_GET['id']));
            echo json_encode($noticiaDb->getNoticiaById($_GET['id']));
            exit;
        } else if(isset($_GET['search'])) {
            $termo = $_GET['search'];
            echo json_encode(array_map("utf8_encode", $noticiaDb->searchNoticia($termo)));
            exit;
        } else {
            echo json_encode($noticiaDb->getAllNoticias());
            exit;
        }
        
    break;

    default:
        
    break;

}