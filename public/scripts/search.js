const btnSearch = document.getElementById('btn-search')

btnSearch.onclick = () => {
    var search = document.getElementById('search-input').value
    axios.get(`/services/noticias/?search=${search}`, {
        
    })
    .then(function (response) {
        var noticias = response.data
        console.log(noticias)
    })
}