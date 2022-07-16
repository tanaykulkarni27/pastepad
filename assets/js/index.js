
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
    alert("PLEASE REMEMBER THE PASSWORD IT CANNOT BE UPDATED");
}
function close_create(){
    document.getElementById('cacc').style.display = 'none';
}

function open_login(){
    close_create();
    document.getElementById('lacc').style.display = 'block';
}
function close_login(){
    document.getElementById('lacc').style.display = 'none';
}
function create_user(){
    
    var mail = document.getElementById('create_email').value;
    var username = document.getElementById('uname').value;
    var pwd = document.getElementById('create_pwd').value;
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        if(pwd.trim().length == 0){
            alert("INVALID PASSWORD");
            return;
        }
        if(username.trim().length == 0){
            alert("INVALID PASSWORD");
            return;
        }
        $.ajax({
            url:'/createuser',
            type:'POST',
            data:{
                csrfmiddlewaretoken : $('input[name=csrfmiddlewaretoken]').val(),
                email : mail,
                password : pwd,
                username : username
            },
            beforeSend:()=>{
                document.getElementById('cloader').style.display = 'block';
            },
            success:(res)=>{
                alert(res);
                document.getElementById('cloader').style.display = 'none';
                if(res == "SUCCESS"){
                    location.reload();
                }
            }
        });
    }else{
        alert("INVALID EMAIL");
        return;
    }
}
function login_user(){
    var mail = document.getElementById('login_email').value;
    var pwd = document.getElementById('login_pwd').value;
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        if(pwd.trim().length == 0){
            alert("INVALID PASSWORD");
            return;
        }
        $.ajax({
            url:'/login',
            type:'POST',
            data:{
                csrfmiddlewaretoken : $('input[name=csrfmiddlewaretoken]').val(),
                email : mail,
                password : pwd
            },
            beforeSend:()=>{
                document.getElementById('lloader').style.display = 'block';
            },
            success:(res)=>{
                alert(res);
                document.getElementById('lloader').style.display = 'none';
                if(res == "SUCCESS"){
                    location.reload();
                }
            }
        });
    }else{
        alert("INVALID EMAIL");
        return;
    }
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

function delete_post(){
    
}