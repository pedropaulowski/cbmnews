<?php

use Dao\NoticiaMySql;

if(isset($_GET['id'])) {
    $id =   filter_var($_GET['id'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $id =   filter_var($id, FILTER_SANITIZE_SPECIAL_CHARS);
    $id =   filter_var($id, FILTER_SANITIZE_STRING);
    if($id != false) {
        require '../vendor/autoload.php';
        require '../config.php';
        $noticiaDb = new NoticiaMySql($pdo);

        $noticia = $noticiaDb->getNoticiaById($id);

        if(count($noticia) == 0) {
            header("Location: index.html");
            exit;
        }

    } else {
        header("Location: index.html");
        exit;
    }
} else {
    header("Location: index.html");
    exit;
}

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href="images/logo_svg.svg" />
    <meta id="viewport" name="viewport" content="width=device-width, user-scalable=no" />
    <title><?= $noticia['manchete'];?></title>
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/noticia.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
        integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=" crossorigin="anonymous" />
    <meta name="author" content="<?= $noticia['autor'];?>">
    <meta name="description"
        content="<?= $noticia['descricao'];?>">
    <meta name="keywords" content="<?= $noticia['keywords'];?>">
    <meta property="og:url" content="http://www.cbmnews.ga/noticia.php?id=<?=$id?>">
    <meta property="og:type" content="article">
    <meta property="og:title" content="<?= $noticia['manchete'];?>">
    <meta property="og:image" itemprop="image" content="http://www.cbmnews.ga/imagens/<?= $noticia['capa'];?>">
    <meta property="og:description"
        content="<?= $noticia['descricao'];?>">
    <meta property="fb:app_id" content="296276891401563">
    <meta name="google-site-verification" content="Lgcv139i3UZl0BzySmZe_M0mpzuSj8HU5DXBRBOBS68" />
    <link rel="canonical" href="http://www.cbmnews.ga/noticia.php?id=<?=$id?>">
    <script data-ad-client="ca-pub-8937799981719207" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
</head>

<body onload="carregarNoticia()">
    <header>
        <div><i class="fas fa-bars"></i><a id="menu-menu">MENU</a></div>
        <div><a href="/"><img src="images/logo_png.png" height="30px" /></a></div>
        <!-- <div><input id="search-input" type="text" class="search-input" placeholder="BUSCAR" /></div> -->
    </header>
    <article>
        <div class="header-noticia">
            <h1 class="h1-noticia"></h1>
            <p class="desc-p-noticia"></p>
            <p id="hora" style="
                font-family: Arial, Helvetica, sans-serif;
                font-size: 0.9rem;
                margin:  10px 20px;
                opacity: 0.8;
            ">
            </p>
        </div>
        <section>



        </section>
    </article>
    <div class="noticias-noticia" >

        <div id="btn-more" class="btn-red">VEJA MAIS</div>

    </div>
    <footer>
        <div class="content-footer">
            <div><a href="/"><img src="images/logo_png.png" height="30px"/></a></div>
            <div>Últimas notícias</div>
        </div>
        <div class="content-footer">
            <div>© Copyright 2020-2020 Corrupção Brasileira Memes</div>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="scripts/noticia.js"></script>
</body>

</html>