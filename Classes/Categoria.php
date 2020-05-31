<?php

namespace Classes;

class Categoria {
    private $categoria;

    public function getCategoria() {
        return $this->categoria;
    }
 
    public function setCategoria($categoria) {
        $this->categoria = trim(ucwords($categoria));
    }
}