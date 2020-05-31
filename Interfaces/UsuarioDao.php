<?php 

namespace Interfaces;

use Classes\Usuario;

interface UsuarioDao {
    public function add(Usuario $u);
    public function logIn($email, $senha);
    public function existeEmail($email);
    public function setTokenUsuario($email, $token);
    public function getUserByToken($token);
    public function logOut($token);
}