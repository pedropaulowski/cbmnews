
(() => {
    axios.get('https://allsportsapi.com/api/football/?&met=Standings&leagueId=195&APIkey=8de70f9c5cb162a422f809dab87d2ce9810bf044023b66a519f537fc1505bfe6')
    .then(function (response) {
        let jsonResponse = response.data
        for(let i = 0; i < 5; i++) {
            let tr = document.createElement('tr')
            let html = `                        
            <td><img id="${jsonResponse.result.total[i].team_key}" src=""></td>
            <td class="futebol-PTS">${jsonResponse.result.total[i].standing_PTS}</td>
            <td class="futebol-W">${jsonResponse.result.total[i].standing_W}</td>
            <td class="futebol-D">${jsonResponse.result.total[i].standing_D}</td>
            <td class="futebol-L">${jsonResponse.result.total[i].standing_L}</td>
            `
            tr.innerHTML = html
            document.getElementById('tbody-futebol').append(tr)
            axios.get(`https://allsportsapi.com/api/football/?&met=Teams&teamId=${jsonResponse.result.total[i].team_key}&APIkey=8de70f9c5cb162a422f809dab87d2ce9810bf044023b66a519f537fc1505bfe6`)
            .then(function (response) {
                let img_time = response.data.result[0].team_logo
                let img_src = `${img_time}`
                document.getElementById(`${jsonResponse.result.total[i].team_key}`).setAttribute('src', `${img_src}`)
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    })
    .catch(function (error) {
        console.log(error);
    })


})()