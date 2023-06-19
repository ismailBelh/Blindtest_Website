<?php

class MyPDO extends PDO
{
    private $lienBDD = 'mysql:host=mysql-cnamblindtest.alwaysdata.net;dbname=cnamblindtest_sql';
    private $login = '314517_admin';
    private $mdp = "JeS'appelleRoot";

   /* private $lienBDD = 'mysql:host=localhost;dbname=cnamblindtest_sql';
    private $login = 'root';
    private $mdp = "";*/

    public function __construct() {
        parent::__construct($this->lienBDD, $this->login, $this->mdp);
    }
    public function getLienBDD()
    {
        return $this->lienBDD;
    }

    /**
     * @param mixed $lienBDD
     */
    public function setLienBDD($lienBDD): void
    {
        $this->lienBDD = $lienBDD;
    }

    /**
     * @return mixed
     */
    public function getLogin()
    {
        return $this->login;
    }

    /**
     * @param mixed $login
     */
    public function setLogin($login): void
    {
        $this->login = $login;
    }

    /**
     * @return mixed
     */
    public function getMdp()
    {
        return $this->mdp;
    }

    /**
     * @param mixed $mdp
     */
    public function setMdp($mdp): void
    {
        $this->mdp = $mdp;
    }

    public function getPdo()
    {
        return new PDO($this->lienBDD, $this->login, $this->mdp);
    }
}

$myPDO = new MyPDO('mysql:host=localhost;dbname=projetblindtest', 'root', '');
$pdo = $myPDO->getPdo();


?>