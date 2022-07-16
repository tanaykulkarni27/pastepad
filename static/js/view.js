var getCookie = function(name) {
    var cookies = document.cookie.split(';');
    for(var i=0 ; i < cookies.length ; ++i) {
        var pair = cookies[i].trim().split('=');
        if(pair[0] == name)
            return pair[1];
    }
    return null;
};

function copycontent(){
    var key = $('textarea#ide').val();;
    
    navigator.clipboard.writeText(key).then(()=>{
        alert('content copied');
    });
    
}
function __edit(){
    document.getElementById('ide').removeAttribute('readonly');
    document.getElementById('title').removeAttribute('readonly');
    document.getElementById('title').focus();
}
function update_post(id,token) {
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
        type:"PUT",
        url : '/api/' + id,
        data:{
            csrfmiddlewaretoken : token,
            title : title,
            content : content
        },
        success:()=>{
            alert("POST UPDATED");
            location.reload();
        },
        error:(err,err2,err3)=>{
            alert(err.responseText)
        }
    });
}
function delete_post(id,token) {
    $.ajax({
        type:"DELETE",
        url : '/api/' + id,
        data:{
            // csrfmiddlewaretoken : token,
        },
        success:()=>{
            alert("POST DELETED");
            location.href='/';
        },
        error:(err,err2,err3)=>{
            alert(err.responseText)
        }
    });
}