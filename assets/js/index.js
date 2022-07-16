function init(){
    var url = '/api';
    $.ajax({
        type:'GET',
        url : url,
        success:(res)=>{
            console.log(res);
            doc = document.getElementById('rowss');
            doc.innerHTML = '';
            for(var i = 0;i < res.length;i++){
                doc.innerHTML += '<tr>' +
                    '<th scope="row">'+(i + 1)+'</th>' + 
                    '<td><a href="/read/'+res[i].key+'">'+res[i].title+'</a></td>' + 
                    '<td>'+res[i].upload_date+'</td>' + 
                    '<td>'+res[i].upload_time+'</td>' + 
                '</tr>';
            }
            
        }
    });
}
function open_create(){
    close_login();
    document.getElementById('cacc').style.display = 'block';
}
function close_create(){
    document.getElementById('cacc').style.display = 'none';
}
function create_user(){
    // create_user_dialog
}
function open_login(){
    close_create();
    document.getElementById('lacc').style.display = 'block';
}
function close_login(){
    document.getElementById('lacc').style.display = 'none';
}
function login_user(){
    
}
function disable(f){
    f.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
          event.preventDefault();
        }
      });
}

function perform_search() {
    var url = '/api';
    $.ajax({
        type:'GET',
        url : url,
        data:{
            q : document.getElementById('search_query').value
        },
        success:(res)=>{
            console.log(res);
            doc = document.getElementById('rowss');
            doc.innerHTML = '';
            for(var i = 0;i < res.length;i++){
                doc.innerHTML += '<tr>' +
                    '<th scope="row">'+(i + 1)+'</th>' + 
                    '<td><a href="/read/'+res[i].key+'">'+res[i].title+'</a></td>' + 
                    '<td>'+res[i].upload_date+'</td>' + 
                    '<td>'+res[i].upload_time+'</td>' + 
                '</tr>';
            }
        }
    });
}