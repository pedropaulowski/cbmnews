<?php

namespace Dao;

use Interfaces\ImagemDao;
use PDO;
use Classes\Imagem;

class ImagemMySql implements ImagemDao {
    private $pdo;

    public function __construct(PDO $p) {
        $this->pdo = $p;
    }

    public function add(Imagem $c) {
        $id = $c->getId();
        $img_url = $c->getUrl();

        $sql = "INSERT INTO imagens SET id = :id, img_url = :img_url";
        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":id", $id);
        $sql->bindValue(":img_url", $img_url);
        $sql->execute();

        if($this->issetImagem($id)) 
            return true;
        else 
            return false;
    }

    public function getAllImagens() {
        $sql = $this->pdo->query("SELECT * FROM imagens");
        
        if($sql->rowCount() > 0)
            return $sql->fetchAll(PDO::FETCH_ASSOC);
        else 
            return [];
    }

    public function delete($id) {
        $sql = "DELETE FROM imagens WHERE id = :id";
        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":id", $id);
        $sql->execute();

        if($this->issetImagem($id))
            return false;
        else 
            return true;
    }

    private function issetImagem($id) {
        $sql = "SELECT * FROM imagens WHERE id = :id";
        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":id", $id);
        $sql->execute();

        if($sql->rowCount() > 0)
            return true;
        else 
            return false;
    }
}
