var start = 4; 
var button = document.getElementById('btn-more')
function getAllNoticias() {
    axios.get('/services/noticias/', {
    })
    .then(function (response) {
        var noticias = response.data
        var total = noticias.length
        createPrincipalCards(noticias)
        createNoticiasSecundarias(noticias)
        button.onclick = () => {createNoticiasSecundarias(noticias)}
    })
}

function totalNoticias(noticias) {
    return noticias.length
}

function createPrincipalCards(noticias) {
    let i = 0;
    var html = `
    <div class="container-painel">
            <div class="painel-content" >
            <div class="painel-news" onclick="redirecTo('/noticia.php?id=${noticias[i].id}')" style="
            transtion: all linear 0.3s;
            
            cursor: pointer;
            width: 95%;
            max-width: 510px;
            min-width: 320px;
            height: 270px;
        
            border-radius: 5px;
            overflow: hidden;
            margin: 3px; 
            animation: scaleReverse 0.5s;  
        
        
            display: flex;
            flex-direction: column;
            font-family: opensans,opensans-bastian,Arial,sans-serif;
            color: white;
            align-items: center;
            justify-content: center;
            position: relative;
        
            background:
            linear-gradient(
                rgba(0, 0, 0, 0.7), 
                rgba(0, 0, 0, 0.7)
            ),

            url('/imagens/${noticias[i].capa}');
            background-size: cover; 
            background-position: center center;
                    

        ;">
                <h5 class="categoria-painel">${noticias[i].categoria}</h5>
                <h2 class="title-painel">${noticias[i].manchete}</h2>
                <li class="descricao-painel">${noticias[i].descricao}</li>
            </div>
            <div class="painel-news" onclick="redirecTo('/noticia.php?id=${noticias[i+1].id}')" style="
            transtion: all linear 0.3s;
            
            cursor: pointer;
            width: 95%;
            max-width: 510px;
            min-width: 320px;
            height: 270px;
        
            border-radius: 5px;
            overflow: hidden;
            margin: 3px; 
            animation: scaleReverse 0.5s;  
        
        
            display: flex;
            flex-direction: column;
            font-family: opensans,opensans-bastian,Arial,sans-serif;
            color: white;
            align-items: center;
            justify-content: center;
            position: relative;
        
            background:
            linear-gradient(
                rgba(0, 0, 0, 0.7), 
                rgba(0, 0, 0, 0.7)
            ),
            
            url('/imagens/${noticias[i+1].capa}');
            background-size: cover; 
            background-position: center center;
        ;">
                <h5 class="categoria-painel">${noticias[i+1].categoria}</h5>
                <h2 class="title-painel">${noticias[i+1].manchete}</h2>
                <li class="descricao-painel">${noticias[i+1].descricao}</li>
            </div>
        </div>
        <div class="painel-content">
            <div class="painel-news" onclick="redirecTo('/noticia.php?id=${noticias[i+2].id}')"
            style="
            transtion: all linear 0.3s;

            cursor: pointer;
            width: 95%;
            max-width: 510px;
            min-width: 320px;
            height: 270px;
        
            border-radius: 5px;
            overflow: hidden;
            margin: 3px; 
            animation: scaleReverse 0.5s;  
        
        
            display: flex;
            flex-direction: column;
            font-family: opensans,opensans-bastian,Arial,sans-serif;
            color: white;
            align-items: center;
            justify-content: center;
            position: relative;
        
            background:
            linear-gradient(
                rgba(0, 0, 0, 0.7), 
                rgba(0, 0, 0, 0.7)
            ),
            
            url('/imagens/${noticias[i+2].capa}');
            background-size: cover; 
            background-position: center center;

            ;">
                <h5 class="categoria-painel">${noticias[i+2].categoria}</h5>
                <h2 class="title-painel">${noticias[i+2].manchete}</h2>
                <li class="descricao-painel">${noticias[i+2].descricao}</li>
            </div>
            <div class="painel-news" onclick="redirecTo('/noticia.php?id=${noticias[i+3].id}')"
            style="
            transtion: all linear 0.3s;

            cursor: pointer;
            width: 95%;
            max-width: 510px;
            min-width: 320px;
            height: 270px;
        
            border-radius: 5px;
            overflow: hidden;
            margin: 3px; 
            animation: scaleReverse 0.5s;  
        
        
            display: flex;
            flex-direction: column;
            font-family: opensans,opensans-bastian,Arial,sans-serif;
            color: white;
            align-items: center;
            justify-content: center;
            position: relative;
        
            background:
            linear-gradient(
                rgba(0, 0, 0, 0.7), 
                rgba(0, 0, 0, 0.7)
            ),
            
            url('/imagens/${noticias[i+3].capa}');
            background-size: cover; 
            background-position: center center;
            ;">
                <h5 class="categoria-painel">${noticias[i+3].categoria}</h5>
                <h2 class="title-painel">${noticias[i+3].manchete}</h2>
                <li class="descricao-painel">${noticias[i+3].descricao}</li>
            </div>
        </div>
    </div>`

    document.getElementsByClassName('painel')[0].innerHTML = html
    var painelnews = document.getElementsByClassName('painel-news')
    for(let j in painelnews) {
        if(window.innerWidth > 1014) {
            painelnews[j].onmouseover = () => {
                painelnews[j].style.transition = "all linear 0.3s"; 
                painelnews[j].style.backgroundPosition = `center center;`
                // painelnews[j].style.backgroundSize =  `cover`; 
                painelnews[j].style.backgroundSize = `120%`;
                painelnews[j].style.backgroundRepeat = 'no-repeat';

            }
            painelnews[j].onmouseout = () => {
                painelnews[j].style.transition = "all linear 0.3s"; 
                painelnews[j].style.backgroundPosition = `center center;`
                // painelnews[j].style.backgroundSize =  `cover`; 
                painelnews[j].style.backgroundSize = `100%`;
                painelnews[j].style.backgroundRepeat = 'no-repeat';
            }
        }
    }
}



function redirecTo(link) {
    window.location.href = link
}

function createNoticiasSecundarias(noticias) {
    let i = start;

    var div = document.createElement('div')
    
    for(i; i < start+4; i++) {
        if(noticias[i] != undefined) {
            let html = `
            <div class="card-noticias" onclick="redirecTo('noticia.php?id=${noticias[i].id}')">
                <div class="img-noticia" style="
                width: 49%;
                max-width: 400px;
                height: 220px;
                min-width: 310px;
            
                overflow: hidden;
                margin: 20px 0px; 
            
                background:
                  url('imagens/${noticias[i].capa}')
                ;
            
                background-size: cover; 
                background-position: center center;"></div>
                <div class="info-noticia">
                    <div class="titulo-noticia"><h2>${noticias[i].manchete}</h2></div>
                    <div class="descricao-noticia">${noticias[i].descricao.substring(0, 200)}</div>
                </div>
            </div>`
            div.innerHTML += html
            document.getElementsByClassName('noticias')[0].insertBefore(div, button)
        } else {
            button.style.display = 'none'
        }
    }
    start +=4;
}

function getCotacaoMoedas() {
    axios.get('https://economia.awesomeapi.com.br/json/all')
    .then(function (response) {
        createCotacaoCard(response.data)
    })
    .catch(function (error) {
        document.getElementsByClassName('.aside')[0].innerHTML = ''
    })
}

function createCotacaoCard(moedas) {
    for(var i in moedas) {
        if(moedas[i].name != 'Novo Shekel Israelense') {
            let div = document.createElement('div')
            let color = (moedas[i].pctChange > 0) ? '#2E9900' : '#C4170C'
            let html = `
            <div class="cotacao-moeda" style="width:100%;">
                <div><a class="nome-moeda">${moedas[i].name}</a></div>
                <div style="display:flex;width:50%;">
                    <div style="width:50%;">
                        <a class="preco-moeda">R$ ${moedas[i].bid.substring(0, 5).replace('.', ',')}</a>
                    </div>
                    <div style="width:50%;">
                        <a style="color:${color};
                    color:${color};" class="pct-variacao-moeda">${(moedas[i].pctChange < 0)?moedas[i].pctChange.replace('.', ','): `+`+ moedas[i].pctChange.replace('.', ',')}%</a>
                    </div>

                </div>
            </div>`
            div.innerHTML = html
            document.getElementById('cotacao-moedas').appendChild(div)
        }
    }
}

getCotacaoMoedas()