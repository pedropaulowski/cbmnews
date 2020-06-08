
(() => {
    axios.get('https://allsportsapi.com/api/football/?&met=Standings&leagueId=195&APIkey=8de70f9c5cb162a422f809dab87d2ce9810bf044023b66a519f537fc1505bfe6')
    .then(function (response) {
        let jsonResponse = response.data
        for(let i = 0; i < 5; i++) {
            axios.get(`https://allsportsapi.com/api/football/?&met=Teams&teamId=${jsonResponse.result.total[i].team_key}&APIkey=8de70f9c5cb162a422f809dab87d2ce9810bf044023b66a519f537fc1505bfe6`)
            .then(function (response) {
                let tr = document.createElement('tr')
                let img_time = response.data.result[0].team_logo
                let html = `                        
                <td><img src="${img_time}"></td>
                <td class="futebol-PTS">${jsonResponse.result.total[i].standing_PTS}</td>
                <td class="futebol-W">${jsonResponse.result.total[i].standing_W}</td>
                <td class="futebol-D">${jsonResponse.result.total[i].standing_D}</td>
                <td class="futebol-L">${jsonResponse.result.total[i].standing_L}</td>
                `
                tr.innerHTML = html
                document.getElementById('tbody-futebol').append(tr)
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