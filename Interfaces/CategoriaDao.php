<?php 

namespace Interfaces;

use Classes\Categoria;

interface CategoriaDao {
    public function add(Categoria $c);
    public function getAllCategorias();
    public function delete($id);
    public function getCategoriaById($id);
}