<?php

namespace Classes;

class Noticia {
    private $id;
    private $manchete;
    private $keywords;
    private $descricao;
    private $paragrafos;
    private $capa;
    private $categoria;
    
    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;

    }
    public function getManchete()
    {
        return $this->manchete;
    }

    public function setManchete($manchete)
    {
        $this->manchete = $manchete;

    }
    public function getDescricao()
    {
        return $this->descricao;
    }

    public function setDescricao($descricao)
    {
        $this->descricao = $descricao;

    }
    public function getParagrafos()
    {
        return $this->paragrafos;
    }

    public function setParagrafos($paragrafos)
    {
        $this->paragrafos = $paragrafos;

    }

    public function getCapa()
    {
        return $this->capa;
    }

    public function setCapa($capa)
    {
        $this->capa = $capa;
    }
 
    public function getKeywords()
    {
        return $this->keywords;
    }

    public function setKeywords($keywords)
    {
        $this->keywords = $keywords;
    }

    public function returnNoticia() {
        return $this;
    }

    public function getCategoria()
    {
        return $this->categoria;
    }

    public function setCategoria($categoria)
    {
        $this->categoria = $categoria;
    }

    public function createNoticia($id, $manchete, $keywords, $descricao, $paragrafos, $capa, $categoria) {
        $this->id = $id;
        $this->manchete = $manchete;
        $this->keywords = $keywords;
        $this->descricao = $descricao;
        $this->paragrafos = $paragrafos;
        $this->capa = $capa;
        $this->categoria = $categoria;
    }
}