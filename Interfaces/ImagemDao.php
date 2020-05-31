<?php 

namespace Interfaces;

use Classes\Imagem;

interface ImagemDao {
    public function add(Imagem $c);
    public function getAllImagens();
    public function delete($id);
}