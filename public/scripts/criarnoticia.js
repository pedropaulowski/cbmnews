
(
    ()=> {
        carregarImagens()
    }
)()


function createImageOptionCard(img_url) {
    var html = `
    <label for="${img_url}" id="${img_url}"><div id="img${img_url}"class="select-option"></div><a>${img_url}</a></label>
    <input type="radio" value="${img_url}" name="capa_img_url"/>`


    // html.appendChild(document.getElementById('select'))
    document.getElementById('select').innerHTML += html
    document.getElementById(`img${img_url}`).style.backgroundImage = `url(imagens/${img_url})`
}

/*
HOW TO GET THE SELECTED IMG 

document.querySelector('input[name="capa_img_url"]:checked').value 

GET THE PARAGRAPH 

document.querySelector('input[name="paragrafos[0]"]:checked').value
*/

function getQtdParagrafos () {
    return document.querySelectorAll('.paragrafo-select').length
}

function getAllParagrafos() {
    var qtd = getQtdParagrafos()
    var paragrafos = [];
    for(let i = 0; i < qtd; i++) {
        console.log(i);
        let paragrafo = {
            text: document.querySelector(`textarea[name="paragrafo[${i+1}]"]`).value.trim(),
            type: document.querySelector(`input[name="paragrafos[${i+1}]"]:checked`).value.trim()
        } 
        paragrafos.push(paragrafo)

    }
    return paragrafos
}

function createNewParagrafo() {
    var qtd = getQtdParagrafos();

    var html = document.createElement('div')
    var htmlParagrafo =`
        <div id="paragrafo${qtd+1}" class="select paragrafo-select">
            <textarea class="paragrafo" name="paragrafo[${qtd+1}]"> Ao selecionar Imagem, copie o nome da imagem (pode ser encontrada onde se escolhe a capa) e cole aqui, ao selecionar vídeo copie o ID do vídeo na URL do YouTube e ao Selecionar texto, basta escrever o texto.
            </textarea>

            <label for="img">
                Imagem
            </label>
            <input type="radio" value="img" name="paragrafos[${qtd+1}]"/>
            <label for="text">
                Texto
            </label>
            <input type="radio" value="text" name="paragrafos[${qtd+1}]"/>
            <label for="citacao">
                Citacao
            </label>
            <input type="radio" value="citacao" name="paragrafos[${qtd+1}]"/>
            <label for="video">
                Video
            </label>
            <input type="radio" value="video" name="paragrafos[${qtd+1}]"/>
            <label for="subtopico">
                Sub-Tópico
            </label>
            <input type="radio" value="subtopico" name="paragrafos[${qtd+1}]"/>
            <button onclick="deleteParagrafo(${qtd+1})" class="btn-close">APAGAR</button>                        
        </div>
    `
    html.innerHTML = htmlParagrafo

    document.getElementById('createParagrafos').append(html)

}

document.getElementById('btnCreateParagrafo').onclick = () => createNewParagrafo()
document.getElementById('btnPublicarNoticia').onclick = () => publicarNoticia()

function publicarNoticia() {
    let descricao = document.getElementById('descricao').value.trim()
    let manchete = document.getElementById('manchete').value.trim()
    let capa = document.querySelector('input[name="capa_img_url"]:checked').value.trim()
    let paragrafos = getAllParagrafos()
    let keywords = document.getElementById('keywords').value.trim();
    let categoria = (document.getElementById('categoria') != null) ? document.getElementById('categoria').value.trim() : 'News'

    axios.post('/services/noticias/', {
        action : "newNoticia",
        token : token,
        descricao : descricao,
        paragrafos : paragrafos,
        capa : capa,
        keywords : keywords,
        manchete : manchete,
        categoria : categoria
    })
    .then(function (response) {
        if(response.data.link != null && response.data.link != undefined) {
            window.location.href = response.data.link
        }
    })
}

function deleteParagrafo(paragrafo) {
    document.getElementById(`paragrafo${paragrafo}`).remove()
}

function carregarImagens() {
    axios({
        method: 'get',
        url: '/services/imagens/',
    })
    .then(function (response) {
        let json = response.data
        for(let i in json) 
            createImageOptionCard(`${json[i].img_url}`)

    });
}
