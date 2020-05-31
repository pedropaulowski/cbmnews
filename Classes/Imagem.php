<?php

namespace Classes;

class Imagem {
    private $id;
    private $url;

    public function getId() {
        return $this->id;
    }
 
    public function setId($id) {
        $this->id = trim($id);
    }

    public function getUrl() {
        return $this->url;
    }

    public function setUrl($url) {
        $this->url = $url;
    }
}