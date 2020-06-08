var cidadeAtual = -1;

const siglas = {
    "ec":[["Encoberto com Chuvas Isoladas", "fas fa-cloud-showers-heavy"],"fas fa-cloud-showers-heavy"],
    "ci":["Chuvas Isoladas","fas fa-cloud-showers-heavy"],
    "c":["Chuva","fas fa-cloud-showers-heavy"],
    "in":["Instável","fas fa-cloud-showers-heavy"],
    "pp":["Poss. de Pancadas de Chuva","fas fa-cloud-showers-heavy"],
    "cm":["Chuva pela Manhã","fas fa-cloud-showers-heavy"],
    "cn":["Chuva a Noite","fas fa-cloud-moon-rain"],
    "pt":["Pancadas de Chuva a Tarde","fas fa-cloud-showers-heavy"],
    "pm":["Pancadas de Chuva pela Manhã","fas fa-cloud-showers-heavy"],
    "np":["Nublado e Pancadas de Chuva","fas fa-cloud-sun-rain"],
    "pc":["Pancadas de Chuva","fas fa-cloud-showers-heavy"],
    "pn":["Parcialmente Nublado","fas fa-smog"],
    "cv":["Chuvisco","fas fa-cloud-showers-heavy"],
    "ch":["Chuvoso","fas fa-cloud-showers-heavy"],
    "t":["Tempestade","fas fa-cloud-showers-heavy"],
    "ps":["Predomínio de Sol","fas fa-sun"],
    "e":["Encoberto","fas fa-smog"],
    "n":["Nublado","fas fa-cloud-sun"],
    "cl":["Céu Claro","fas fa-sun"],
    "nv":["Nevoeiro","fas fa-snowflake"],
    "g":["Geada","fas fa-snowflake"],
    "ne":["Neve","fas fa-snowflake"],
    "nd":["Não Definido","fas fa-cloud-showers-heavy"],
    "pnt":["Pancadas de Chuva a Noite","fas fa-cloud-moon-rain"],
    "psc":["Possibilidade de Chuva","fas fa-cloud-showers-heavy"],
    "pcm":["Possibilidade de Chuva pela Manhã","fas fa-cloud-showers-heavy"],
    "pct":["Possibilidade de Chuva a Tarde","fas fa-cloud-showers-heavy"],
    "pcn":["Possibilidade de Chuva a Noite","fas fa-cloud-moon-rain"],
    "npt":["Nublado com Pancadas a Tarde","fas fa-cloud-sun-rain"],
    "npn":["Nublado com Pancadas a Noite","fas fa-cloud-moon-rain"],
    "ncn":["Nublado com Poss. de Chuva a Noite","fas fa-cloud-moon-rain"],
    "nct":["Nublado com Poss. de Chuva a Tarde","fas fa-cloud-sun-rain"],
    "ncm":["Nubl. c/ Poss. de Chuva pela Manhã","fas fa-cloud-sun-rain"],
    "npm":["Nublado com Pancadas pela Manhã","fas fa-cloud-sun-rain"],
    "npp":["Nublado com Possibilidade de Chuva","fas fa-cloud-sun-rain"],
    "vn":["Variação de Nebulosidade","fas fa-smog"],
    "ct":["Chuva a Tarde","fas fa-cloud-sun-rain"],
    "ppn":["Poss. de Panc. de Chuva a Noite","fas fa-cloud-moon-rain"],
    "ppt":["Poss. de Panc. de Chuva a Tarde","fas fa-cloud-showers-heavy"],
    "ppm":["Poss. de Panc. de Chuva pela Manhã","fas fa-cloud-showers-heavy"]
}
const cidades = [
    {
        nome : "Rio Branco",
        id : 240
    },
    {
        nome : "Maceió",
        id : 233
    },
    {
        nome : "Macapá",
        id : 232
    },
    {
        nome : "Manaus",
        id : 234
    },
    {
        nome : "Salvador",
        id : 242
    },
    {
        nome : "Fortaleza",
        id : 229
    },
    {
        nome : "Brasília",
        id : 224
    },
    {
        nome : "Vitória",
        id : 246
    },
    {
        nome : "Goiânia",
        id : 230
    },
    {
        nome : "São Luís",
        id : 243
    },
    {
        nome : "Cuiabá",
        id : 226
    },
    {
        nome : "Campo Grande",
        id : 225
    },
    {
        nome : "Belo Horizonte",
        id : 222
    },
    {
        nome : "Belém",
        id : 221
    },
    {
        nome : "João Pessoa",
        id : 231
    },
    {
        nome : "Curitiba",
        id : 227
    },
    {
        nome : "Recife",
        id : 239
    },
    {
        nome : "Teresina",
        id : 245
    },
    {
        nome : "Rio de Janeiro",
        id : 241
    },
    {
        nome : "Natal",
        id : 235
    },
    {
        nome : "Porto Alegre",
        id : 237
    },
    {
        nome : "Porto Velho",
        id : 238
    },
    {
        nome : "Boa Vista",
        id : 223
    },
    {
        nome : "Florianópolis",
        id : 228
    },
    {
        nome : "São Paulo",
        id : 244
    },
    {
        nome : "Aracaju",
        id : 220
    },
    {
        nome : "Palmas",
        id : 236
    }

]
function getClimaByCidade(cidades) {
    for(let i in cidades) {
        axios({
            method: 'get',
            url: `http://servicos.cptec.inpe.br/XML/cidade/${cidades[i].id}/previsao.xml`,
            responseType: 'application/xml'
        })
        .then(function (response) {
            let parser = new DOMParser()
            let xmlDOM = parser.parseFromString(response.data, 'application/xml');
            xmlDOM.querySelectorAll('cidade')

            let previsaoSchema = {
                nome: xmlDOM.querySelector('nome').innerHTML,
                estado: xmlDOM.querySelector('uf').innerHTML,
                atualizacao : xmlDOM.querySelector('atualizacao').innerHTML,
                previsao: {
                    hoje: {
                        dia: xmlDOM.querySelectorAll('dia')[0].innerHTML,
                        tempo: xmlDOM.querySelectorAll('tempo')[0].innerHTML,
                        maxima: xmlDOM.querySelectorAll('maxima')[0].innerHTML,
                        minima: xmlDOM.querySelectorAll('minima')[0].innerHTML,
                        iuv: xmlDOM.querySelectorAll('iuv')[0].innerHTML
                    },
                    amanha: {
                        dia: xmlDOM.querySelectorAll('dia')[1].innerHTML,
                        tempo: xmlDOM.querySelectorAll('tempo')[1].innerHTML,
                        maxima: xmlDOM.querySelectorAll('maxima')[1].innerHTML,
                        minima: xmlDOM.querySelectorAll('minima')[1].innerHTML,
                        iuv: xmlDOM.querySelectorAll('iuv')[1].innerHTML
                    }
                }
            }

            sessionStorage.setItem(`${previsaoSchema.nome}`, JSON.stringify(previsaoSchema));
            if(previsaoSchema.nome == 'São Paulo') {
                createCardPrevTempo(previsaoSchema)
            }
        });
    }
}

/*
async function getAllCidades (letras,cidades) {

    for(var j in letras) { 
        if(letras[j] != 'y') {
            try {
                let res = await axios.get(`http://servicos.cptec.inpe.br/XML/listaCidades?city=${letras[j]}`, {
                    responseType: "text/xml"
                })
                let parser = new DOMParser()
                let xmlDOM = parser.parseFromString(res.data, 'application/xml');
                let cidadesDaLetra = xmlDOM.querySelectorAll('cidade')
                let cidadeSchema = {
                    id: '',
                    nome: ''
                }
                cidadesDaLetra.forEach(cidadeXmlNode => {
                    console.log(cidadeXmlNode.getElementsByTagName('nome')[0].innerHTML)
                    cidadeSchema.id = cidadeXmlNode.getElementsByTagName('id')[0].innerHTML
                    cidadeSchema.nome = cidadeXmlNode.getElementsByTagName('nome')[0].innerHTML

                })

                cidades.push(cidadeSchema)
            } catch (e) {
                console.log(e)
            }axios({
                method: 'get',
                url: `http://servicos.cptec.inpe.br/XML/listaCidades?city=${letras[j]}`,
                responseType: 'application/xml'
            })
            .then(function (response) {
                var res = response.data
                var jsonResponse = xmlToJSON.parseString(res)
                cidades.push(jsonResponse.cidades[0])
                console.log(cidades.length)

            });
        }
    }
}*/

function createCardPrevTempo(previsaoSchema) {
    document.getElementById('clima').innerHTML = ''
    let div = document.createElement('div')
    let tempo = getArrayTempo(previsaoSchema.previsao.hoje.tempo)
    let classeIcone = getClasseIcone(previsaoSchema.previsao.hoje.tempo)
    let html = `
    <div class="header-aside">
        <h4>Clima</h4>
    </div>
    <div class="card-clima-content">
        <div class="card-clima-cidade">${previsaoSchema.nome}, ${previsaoSchema.estado}</div>
        <div class="card-clima-tempo">${tempo}, <br/>Índice Raios U.V ${previsaoSchema.previsao.hoje.iuv}</div>
        <div class="card-clima-footer">
            <div class="card-clima-icone"><i class="${classeIcone}"></i></div>
            <div class="card-clima-temp">
                <a class="temp-max">${previsaoSchema.previsao.hoje.maxima}º max</a>
                <a class="temp-min">${previsaoSchema.previsao.hoje.minima}º min</a>
            </div>
            <button onclick="nextCidadeClima()"class="clima-next"><a>Próxima<a></button>
        </div>
    </div>

    `
    div.innerHTML = html
    document.getElementById('clima').appendChild(div)

}

function getArrayTempo(tempo) {
    return siglas[tempo][0]
}

function getClasseIcone(tempo) {
    return siglas[tempo][1]
}

function nextCidadeClima() {
    let climasCidades = sessionStorage
    // console.log(cidadeAtual, cidades.length)
    if(cidadeAtual == (cidades.length - 1)) {
        cidadeAtual = 0;
        // let nome = cidades[cidadeAtual].nome
        // let previsaoShema = JSON.parse(climasCidades[`${nome}`])
    } else {
        cidadeAtual += 1;
    }
    let nome = cidades[cidadeAtual].nome
    // console.log(climasCidades[`${nome.trim()}`])

    let previsaoShema = JSON.parse(climasCidades[`${nome.trim()}`])
    createCardPrevTempo(previsaoShema)
}

getClimaByCidade(cidades)