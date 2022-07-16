function copycontent(){
    var key = document.getElementById('ide').value;
    navigator.clipboard.writeText(key).then(()=>{
        alert('content copied');
    });
    
}
function add_post() {
    var title = document.getElementById('title').value;
    var content = document.getElementById('ide').value;
    if(title.trim().length == 0){
        alert("TITLE IS EMPTY");
        return;
    }
    if(content.trim().length == 0){
        alert("CONTENT IS EMPTY");
        return;
    }
    $.ajax({
        type:"POST",
        url : '/api',
        data:{
            csrfmiddlewaretoken : $('input[name=csrfmiddlewaretoken]').val(),
            title : title,
            content : content
        },
        success:()=>{
            alert("POST ADDED");
            location.href="/";
        },
        error:(err,err2,err3)=>{
            alert(err.responseText)
        }
    });
}