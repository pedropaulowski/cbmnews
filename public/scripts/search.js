const btnSearch = document.getElementById('btn-search')
const searchInput = document.getElementById('search-input')
const search = getSearchInput();
const dropDownSearch = document.getElementById('dropdown-search')

window.addEventListener('mousedown', (e) => {

    if(e.target != dropDownSearch && dropDownSearch.contains(e.target) == false)
        dropDownSearch.style.display = 'none'
    
})
btnSearch.onclick = () => {
    searchNoticias(search.value)
}

searchInput.addEventListener('keydown', (e) => {
    console.log(search.value)

    var key = (e.shiftKey)?e.keyCode:e.keyCode 

    if((key >= 48 && key <= 90) || (key == 8 && search.value != '') ) {
        btnSearch.click()

    }

})

function searchNoticias (searchValue = 0) {
    if(searchValue == 0)
        var searchValue = document.getElementById('search-input').value

    axios.get(`/services/noticias/?search=${searchValue}`, {
        
    })
    .then(function (response) {
        var noticias = response.data

        dropDownSearch.style.display = 'flex'
        dropDownSearch.innerHTML = ''
        if(noticias.length > 0)
            createNoticiasDropdown(noticias)
        else 
            dropDownSearch.innerHTML = `<div class="titulo-noticia-dropdown"><h2>Nenhum resultado para ${searchValue.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</h2></div>`
    })
}

function getSearchInput() {
    return document.getElementById('search-input');
}

function createNoticiasDropdown(noticias) {
    for(let i in noticias) {
        let div = document.createElement('div')
        let html = `<div class="card-noticia-dropdown" onclick="redirecTo('noticia.php?id=${noticias[i].id}')">
            <div class="img-noticia" style="
            width: 100%;
            min-width: 100px;
            max-width: 150px;
            height: 100px;
            overflow: hidden;
            margin: 20px 5px; 

            background:
                url('imagens/${noticias[i].capa}')
            ;

            background-size: cover; 
            background-position: center center;
            background-repeat: no-repeat;"></div>
            <div class="info-noticia-dropdown">
                <div class="titulo-noticia-dropdown"><h2>${noticias[i].manchete}</h2></div>
                <div class="descricao-noticia-dropdown">${noticias[i].manchete}</div>
            </div>
        </div>`

        div.innerHTML = html
        dropDownSearch.appendChild(div)
    }
}