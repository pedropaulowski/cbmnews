<?php

namespace Dao;

use Classes\Usuario;
use Interfaces\UsuarioDao;
use PDO;

class UsuarioMySql implements UsuarioDao {
    private $pdo;

    public function __construct(PDO $p) {
        $this->pdo = $p;
    }

    public function add(Usuario $u) {
        $id = $u->getId();
        $email = $u->getEmail();
        $senha = $u->getSenha();
        $nome = $u->getNome();

        if($this->existeEmail($email) == false) {
            $sql = "INSERT INTO usuarios (
                id,
                email,
                senha,
                nome
            ) 
            VALUES (
                :id,
                :email,
                :senha,
                :nome
            )";

            $sql = $this->pdo->prepare($sql);
            $sql->bindValue(":id",$id);
            $sql->bindValue(":email",$email);
            $sql->bindValue(":senha",$senha);
            $sql->bindValue(":nome",$nome);
            $sql->execute();

            return true;
        } else {
            return false;
        }
    }

    public function logIn($email, $senha) {
        $senhaDb = $this->getSenha($email);
            
        if(password_verify($senha, $senhaDb)) {
            $hora = date("Y-m-d H:i:s");
            $token = $this->setTokenUsuario($email, password_hash($email.$hora, PASSWORD_BCRYPT));
            return $token;
        } else {
            return false;
        }
    }

    public function existeEmail($email) {
        $sql = "SELECT * FROM usuarios WHERE email = :email";
        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":email", $email);
        $sql->execute();

        if($sql->rowCount() > 0)
            return true;
        else 
            return false;
    }

    private function getSenha($email) {
        $sql = "SELECT * FROM usuarios WHERE email = :email";
        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":email", $email);
        $sql->execute();

        if($sql->rowCount() > 0) {
            $usuario = $sql->fetch(PDO::FETCH_ASSOC);
            return $usuario['senha'];
        } else 
            return false;
    }

    public function setTokenUsuario($email, $token) {
        $sql = "UPDATE usuarios SET token = :token WHERE email = :email";
        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":token", $token);
        $sql->bindValue(":email", $email);
        $sql->execute();

        if($this->getUserByToken($token) == false) {
            return false;
        } else {
            return $token;
        }
    }

    public function getUserByToken($token) {
        $sql = "SELECT * FROM usuarios WHERE token = :token";
        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":token", $token);
        $sql->execute();

        if($sql->rowCount() > 0) {
            $usuario = $sql->fetch(PDO::FETCH_ASSOC);
            return $usuario;
        } else 
            return false;
    }

    public function logOut($token) {
        $sql = "UPDATE usuarios SET token = NULL WHERE token = :token";
        $sql = $this->pdo->prepare($sql);
        $sql->bindValue(":token", $token);
        $sql->execute();

        if($this->getUserByToken($token) == false) 
            return true;
        else 
            return false;
    }
}