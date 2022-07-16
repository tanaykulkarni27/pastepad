function copy_api_key(){
    var key = $('input[name=referred]').val();
    navigator.clipboard.writeText(key).then(()=>{
        alert('api key copied');
    });
    
}