function $(id){
    return document.getElementById(id);
}

const project_id = getIdProject();

function getIdProject(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var id = url.searchParams.get("project_id");
    if(id === null || undefined){
        location.href = "dashboard.html";
    }else{
        return id;
    }
}

/*'<img src="images/1.png" class="responsive-img">'+
                    '<a href="#modal1" class="modal-trigger waves-effect waves-light btn-large white black-text" id="btn-new">Add content</a>'+
                    '<a href="#modal1" class="modal-trigger waves-effect waves-light btn-large white black-text" id="btn-new">Finish</a>'+
                    */

window.onload = function() {
    if(sessionStorage.getItem("token")==null||undefined){
        alert("NO TIENES SESSION!");
        location.href = "dashboard.html";
    }else{
        let config = {
            method: "GET",
            withCredentials: true,
            credentials: 'same-origin',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                "Authorization":"Bearer "+sessionStorage.getItem("token")
            }
        };
        
        let params = location.href.split('?')[1];
        fetch('./../item/getListItem?'+params, config)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.status == 200 || data.status == 201){
                data.data.forEach(element => {
                    var status = getDataStatus(element.status_id);
                    console.log(status);
                    $('collapsible').innerHTML += ""+
                    '<li id='+element.project_item_id+' onclick="getContent('+element.project_item_id+')">'+
                    '<div class="collapsible-header">'+element.project_item_name+'<span class="new badge '+status.color+'" data-badge-caption="'+status.msg+'"></span></div>'+
                    '<div class="collapsible-body white-text" id="item-'+element.project_item_id+'">'+
                    '<span>'+element.project_item_description+'</span>'+
                    '</div>'+
                    '</li>';    
                });
            } else{
                alert(data.message+" Error:"+data.status);
                location.href = "dashboard.html";
            }
        });
    }    
}

function getDataStatus(status){
    
    switch(status){
        case 1: 
            return {
                msg:"Completed",
                color:"green"
            }
        case 2:
            return {
                msg:"Progess",
                color:"yellow"
            }
        case 3:
            return {
                msg:"Started",
                color:"red"
            }
    }
}

function getContent(id){
    console.log(id);
    $(id).onclick = null;

    let config = {
        method: "GET",
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            "Authorization":"Bearer "+sessionStorage.getItem("token")
        }
    };
    
    fetch('./../content/getContent?item_id='+id, config)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.status == 200 || data.status == 201){
            /*data.data.forEach(element => {
                $('collapsible').innerHTML += ""+
                '<li id='+element.project_item_id+' onclick="getContent('+element.project_item_id+')">'+
                '<div class="collapsible-header">'+element.project_item_name+'</div>'+
                '<div class="collapsible-body white-text" id="item-'+element.project_item_id+'">'+
                '<span>'+element.project_item_description+'</span>'+
                '</div>'+
                '</li>';    
            });*/
            $('item-'+id).innerHTML += "<br><br>" +
            '<a href="#modal-content" class="modal-trigger waves-effect waves-light btn white black-text" id="btn-new" onclick="assignId('+id+')">Add content</a>'+
            '<a class="waves-effect waves-light btn white black-text" onclick="changeStatus('+id+','+1+')">Finish</a>';
        } else{
            alert(data.message+" Error:"+data.status);
            location.href = "dashboard.html";
        }
    });
}

function assignId(id){
    $('id_item_modal').value = id;    
}

function addContent(){
    var url = "./../content/upload/"+$('id_item_modal').value;
    console.log(url);
    var formData = new FormData();
    formData.append('file', $("file").file);
    formData.append('contentDesc', $('des_item').value);
    console.log(formData);
    fetch(url, {
            body: formData,
            method: 'POST',
            headers: new Headers({
                "Authorization":"Bearer "+sessionStorage.getItem("token")
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
        });
}

function changeStatus(id,status){
    let body={
        items_id: id,
        status: status
    },
        config={
                method: "PUT", 
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "Authorization":"Bearer "+sessionStorage.getItem("token")
                }), 
                body:JSON.stringify(body) 
    };
    
    fetch('./../item/editItem', config)
    .then(res => res.json())
    .then(data => {
        if(data.status == 200 || data.status == 201){
            console.log(data);
            /*data.data.forEach(element => {
                $('collapsible').innerHTML += ""+
                '<li id='+element.project_item_id+' onclick="getContent('+element.project_item_id+')">'+
                '<div class="collapsible-header">'+element.project_item_name+'</div>'+
                '<div class="collapsible-body white-text" id="item-'+element.project_item_id+'">'+
                '<span>'+element.project_item_description+'</span>'+
                '</div>'+
                '</li>';    
            });*/
            location.reload();
        } else{
            alert(data.message+" Error:"+data.status);
            location.href = "dashboard.html";
        }
    });
}

function createItem(){
    let body={
        project_id: project_id,
        items_name:$('name_item').value,
        items_des:$('des_item').value
    },
        params={
                method: "POST", 
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "Authorization":"Bearer "+sessionStorage.getItem("token")
                }), 
                body:JSON.stringify(body)
    };
    fetch("./../item/createItem", params)
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        if (data.status==200){
            location.reload();
        }else{
            alert("Error al iniciar sesion, status:"+data.status);
        }
    });
}

$('modalbtn').addEventListener('click',createItem);
$('modalcontent').addEventListener('click',addContent);