const btn = document.getElementById("btn")

btn.onclick = () => {
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value

    axios.post('https://www.cbmnews.ga/services/usuarios/', {
        action: 'logIn',
        email: email,
        senha: senha
      })
      .then(function (response) {
        var json = response.data
        console.log(json);
        if(json.token != null && json.token != undefined) {
            document.getElementById('error').style.display = 'none';
            localStorage.setItem('token', json.token)
            window.location.href = "paineldecontrole.html"

        }
      })
      .catch( function(error) {
        // console.log(error)
        document.getElementById('error').style.display = 'flex';
      })

}