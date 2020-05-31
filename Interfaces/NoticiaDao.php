<?php 

namespace Interfaces;

use Classes\Noticia;

interface NoticiaDao {
    public function add(Noticia $n);
    public function getAllNoticias();
    public function getNoticiaById($id);
    public function searchNoticia($termo);
    public function delete($id);
    public function edit(Noticia $n);
}