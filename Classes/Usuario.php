<?php

namespace Classes;

class Usuario {
    private $id;
    private $email;
    private $nome;
    private $senha;
    private $token = 0;

    public function getId() {
        return $this->id;
    }

    
    public function setId($id) {
        $this->id = trim($id);
    }

    public function getNome()
    {
        return $this->nome;
    }

    
    public function setNome($nome) {
        $this->nome = trim(ucwords($nome));
    }

    public function getSenha()
    {
        return $this->senha;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = trim($email);
    }

    public function getToken() {
        return $this->token;
    }

    public function setToken($token) {
        $this->token = $token;
    }
    
    public function setSenha($senha) {
        $this->senha = password_hash($senha, PASSWORD_BCRYPT);
    }

    public function createUsuario($id, $email, $senha, $nome, $token = 0) {
        $this->setId($id);
        $this->setEmail($email);
        $this->setSenha($senha);
        $this->setNome($nome);
        $tokenZ = ($token != 0) ? $token : NULL;
        $this->setToken($tokenZ);
    }

}

