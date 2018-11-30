function $(id){
    return document.getElementById(id);
}

function login(){
    let body={
        username:$('uname').value,
        password:$('pword').value
    },
        params={
                method: "POST", 
                headers: new Headers({'Content-Type': 'application/json'}), 
                body:JSON.stringify(body) 
    };
    fetch("./../session/login", params)
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        if (data.status==200){
            sessionStorage.setItem("token",data.token);
            location.href = "dashboard.html";
        }else{
            alert("Usuario o contrase;a erronea, status:" + data.status);
        }
    });
}


$('logbtn').addEventListener('click',login);