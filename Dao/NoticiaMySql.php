<?php

namespace Dao;

use PDOException;
use PDO;
use Interfaces\NoticiaDao;

class NoticiaMySql implements NoticiaDao {
    private $pdo;

    public function __construct(PDO $p) {
        $this->pdo = $p;
    }

    public function add(\Classes\Noticia $n) {
        $id = $n->getId();
        $manchete = $n->getManchete();
        $keywords = $n->getKeywords();
        $descricao = $n->getDescricao();
        $paragrafos = $n->getParagrafos();
        $capa = $n->getCapa();
        $categoria = $n->getCategoria();

        $sql = "INSERT INTO noticias (
            id,
            manchete,
            keywords,
            descricao,
            paragrafos,
            capa,
            categoria,
            hora
        ) 
        VALUES (
            :id,
            :manchete,
            :keywords,
            :descricao,
            :paragrafos,
            :capa,
            :categoria,
            NOW()
        )";

        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":id",$id);
        $sql->bindValue(":manchete",$manchete);
        $sql->bindValue(":keywords",$keywords);
        $sql->bindValue(":descricao",$descricao);
        $sql->bindValue(":paragrafos", $paragrafos);
        $sql->bindValue(":capa",$capa);
        $sql->bindValue(":categoria", $categoria);
        $sql->execute();
  
        if( count($this->getNoticiaById($id)) > 0)
            return true;
        else 
            return false;
    }

    public function getAllNoticias() {
        $sql = "SELECT * FROM noticias ORDER BY hora DESC";
        $sql = $this->pdo->query($sql);
        
        if($sql->rowCount() > 0) {
            $sql = $sql->fetchAll(PDO::FETCH_ASSOC);
            $noticias = [];
            foreach($sql as $noticia) {
                $noticias[] = [
                    'id' => $noticia['id'],
                    'manchete' => $noticia['manchete'],
                    'descricao' => ($noticia['descricao']),
                    'paragrafos' => json_decode(utf8_encode($noticia['paragrafos']), JSON_PRETTY_PRINT),
                    'hora' => $noticia['hora'],
                    'capa' => $noticia['capa'],
                    'keywords' => $noticia['keywords'],
                    'categoria' => utf8_encode($noticia['categoria']),
                    'autor' => $noticia['autor']
                ];
            }
            return $noticias;
        } else 
            return [];

    }

    public function getNoticiaById($id) {
        $sql = "SELECT * FROM noticias WHERE id = :id";
        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":id",$id);
        $sql->execute();

        if($sql->rowCount() > 0) {
            $noticia = $sql->fetch(PDO::FETCH_ASSOC);
            return [
                'id' => $noticia['id'],
                'manchete' => $noticia['manchete'],
                'descricao' => ($noticia['descricao']),
                'paragrafos' => json_decode(utf8_encode($noticia['paragrafos']), JSON_PRETTY_PRINT),
                'hora' => $noticia['hora'],
                'capa' => $noticia['capa'],
                'keywords' => $noticia['keywords'],
                'categoria' => $noticia['categoria'],
                'autor' => $noticia['autor']
            ];
        }
        else 
            return [];
    }

    public function searchNoticia($termo) {
        $noticias = [];
        $termo = filter_var($termo, FILTER_SANITIZE_SPECIAL_CHARS);
        if($termo) {
            $termos = explode(' ', $termo);
            $termo = str_replace(' ', '%', $termo);
            foreach($termos as $termounico) {
                $sql = "SELECT * FROM noticias WHERE ";
                
                for($i = 0; $i < count($termos); $i++) {

                    $sql .= "(manchete LIKE '%".$termos[$i]."%' OR descricao LIKE '%".$termos[$i]."%' OR keywords LIKE '%".$termos[$i]."%')";
                    if($i >= 0 && $i < count($termos) - 1) 
                        $sql .= " AND ";                

                }

                $sql = $this->pdo->query($sql);
                if($sql->rowCount() > 0)   {
                    $sql = $sql->fetchAll(PDO::FETCH_ASSOC);
                    foreach($sql as $noticia) {
                        $noticias[] = [
                            'id' => $noticia['id'],
                            'manchete' => $noticia['manchete'],
                            'descricao' => ($noticia['descricao']),
                            'hora' => $noticia['hora'],
                            'capa' => $noticia['capa'],
                        ];
                    }
    
                }
            }
            
            return array_unique($noticias, NULL);
            
        } else {
            return [];
        }
    }

    public function delete($id) {
        $sql = "DELETE FROM noticias WHERE id = :id";
        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":id",$id);
        $sql->execute();
    }

    public function edit(\Classes\Noticia $n) {
        $id = $n->getId();
        $manchete = $n->getManchete();
        $keywords = $n->getKeywords();
        $descricao = $n->getDescricao();
        $paragrafos = $n->getParagrafos();
        $capa = $n->getCapa();
        $categoria = $n->getCategoria();

        $sql = "UPDATE noticias SET 

                manchete = :manchete,
                keywords = :keywords,
                descricao = :descricao,
                paragrafos = :paragrafos,
                capa = :capa,
                categoria = :categoria
                
                WHERE id = :id";

        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":id",$id);
        $sql->bindValue(":manchete",$manchete);
        $sql->bindValue(":keywords",$keywords);
        $sql->bindValue(":descricao",$descricao);
        $sql->bindValue(":paragrafos",$paragrafos);
        $sql->bindValue(":capa",$capa);
        $sql->bindValue(":categoria", $categoria);
        $sql->execute();
    }


}
