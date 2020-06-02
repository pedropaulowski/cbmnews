$(function(){
    $('#form-img').on('submit', function(e) {
        e.preventDefault();
        
        document.getElementById('token').value = token

        var form = document.getElementById('form-img')
        var formData = new FormData(form)

        $.ajax({
            type: 'POST',
            url:'http://www.cbmnews.ga/services/imagens/',
            contentType:false,
            data: formData,
            processData:false,
            success:function(response) {
                var json = JSON.parse(response)           
                console.log(json)
            }
        })
    })
})