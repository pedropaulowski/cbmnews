function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
    // we'll store the parameters here
    var obj = {};
  
    // if query string exists
    if (queryString) {
  
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];
  
      // split our query string into its component parts
      var arr = queryString.split('&');
  
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
  
        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
  
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
  
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
  
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
  
    return obj;
}

function getIdNoticia() {
    let params = getAllUrlParams()
    return params.id
}

function carregarNoticia() {
    axios({
        method: 'get',
        url: 'http://www.cbmnews.ga/services/noticias/',
        params: {
            id : getIdNoticia(),
        }
    })
    .then(function (response) {
        criarPagina(response.data)
    })
}

function criarPagina(noticia) {
    let manchete = noticia.manchete
    let descricao = noticia.descricao
    let paragrafos = JSON.parse(noticia.paragrafos)
    let hora = new Date(noticia.hora)
    let autor = noticia.autor
    let capa = noticia.capa
    let keywords = noticia.keywords     
    let categoria = noticia.categoria

    let minutos = (hora.getMinutes() < 10) ? `0${hora.getMinutes()}`: hora.getMinutes()

    document.getElementsByClassName('h1-noticia')[0].innerHTML = manchete
    document.getElementsByClassName('desc-p-noticia')[0].innerHTML = descricao    
    document.getElementById('hora').innerText = `${hora.getDate()}/${hora.getMonth()+1}/${hora.getFullYear()} ${hora.getHours()}h${minutos}`
    for(let i in paragrafos)
        document.getElementsByTagName('section')[0].append(criarParagrafo(paragrafos[i].text, paragrafos[i].type))

        /*
    createMetaTags('author', autor)
    createMetaTags('description', descricao)
    createMetaTags('keywords', keywords)

    createOgTags('url', window.location.href)
    createOgTags('type', 'article')
    createOgTags('title', manchete)
    createOgTags('description', descricao)
    createOgTags('image',`imagens/${capa}`)

    */


}

function criarParagrafo(text, type) {
    let div = document.createElement('div')
    switch(type) {
        case 'text':
            var html_code = `
            <p class="paragrafo-noticia">
                ${text}
            </p>
            `
            div.innerHTML = html_code
            return div
        break;
        
        case 'img':
            var html_code = `
            <div style="background:url('imagens/${text}')"id="${text}" class="img-section-noticia">
            </div>
            `
            div.innerHTML = html_code
            return div
        break;
        
        case 'video':
            var html_code = `
            <iframe class="video-yt-noticia" 
            src="https://www.youtube.com/embed/${text}" 
            frameborder="0" 
            allow="
                accelerometer; 
                autoplay; 
                encrypted-media; 
                gyroscope; 
                picture-in-picture;" 
            allowfullscreen>
            </iframe>
            `
            div.innerHTML = html_code
            return div
        break;

        case 'citacao':
            var html_code = `         
            <blockquote class="paragrafo-noticia">
                <p>
                ${text}
                </p>
            </blockquote> 
            `
            div.innerHTML = html_code
            return div

        break;
    }

}

function createMetaTags(name, content) {
    var meta = document.createElement('meta')
    meta.setAttribute('name', name)
    meta.setAttribute('content', content)

    var head = document.getElementsByTagName('head')[0]
    head.append(meta)
}

function createOgTags(property, content) {
    var meta = document.createElement('meta')
    meta.setAttribute(`property`, `og:${property}`)
    meta.setAttribute('content', content)

    var head = document.getElementsByTagName('head')[0]
    head.append(meta)
}


var start = 0; 
var button = document.getElementById('btn-more')
function getAllNoticias() {
    axios.get('http://www.cbmnews.ga/services/noticias/', {
    })
    .then(function (response) {
        var noticias = response.data
        createNoticiasSecundarias(noticias)
        button.onclick = () => {createNoticiasSecundarias(noticias)}
    })
}

getAllNoticias()

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
            document.getElementsByClassName('noticias-noticia')[0].insertBefore(div, button)
        } else {
            button.style.display = 'none'
        }
    }
    start +=4;
}

function redirecTo(link) {
    window.location.href = link
}