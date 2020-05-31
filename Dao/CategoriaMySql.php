<?php

namespace Dao;

use PDO;
use Interfaces\CategoriaDao;
use Classes\Categoria;

class CateogriaMySql implements CategoriaDao {
    private $pdo;

    public function __construct(PDO $p) {
        $this->pdo = $p;
    }

    public function add(Categoria $c) {
        $categoria = $c->getCategoria();
        $sql = "INSERT INTO categorias SET categoria = :categoria";
        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":categoria", $categoria);
        $sql->execute();
    }
    public function getAllCategorias() {
        $sql = $this->pdo->query("SELECT * FROM categorias");
        
        if($sql->rowCount() > 0)
            return $sql->fetchAll(PDO::FETCH_ASSOC);
        else 
            return [];
    }

    public function delete($id) {
        $sql = "DELETE FROM categorias WHERE id = :id";
        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":id", $id);
        $sql->execute();
    }
    
}
