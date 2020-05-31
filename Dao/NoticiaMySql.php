<?php

namespace Dao;

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
            categoria
        ) 
        VALUES (
            :id,
            :manchete,
            :keywords,
            :descricao,
            :paragrafos,
            :capa,
            :categoria
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
        
        if($sql->rowCount() > 0) 
            return $sql->fetchAll(PDO::FETCH_ASSOC);
        else 
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
                'paragrafos' => utf8_encode($noticia['paragrafos']),
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
        $sql = "SELECT * FROM noticias WHERE (machente LIKE :termo OR descricao LIKE :termo OR keywords LIKE :termo )";
        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":termo","%$termo%", PDO::PARAM_STR);
        $sql->execute();
        
        if($sql->rowCount() > 0) 
            return $sql->fetchAll(PDO::FETCH_ASSOC);
        else 
            return [];
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
