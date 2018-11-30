function $(id){
    return document.getElementById(id);
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
                    $('collapsible').innerHTML += ""+
                    '<li id='+element.project_item_id+' onclick="getContent('+element.project_item_id+')">'+
                    '<div class="collapsible-header">'+element.project_item_name+'</div>'+
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
            '<a href="#modal1" class="modal-trigger waves-effect waves-light btn white black-text" id="btn-new">Add content</a>'+
            '<a class="waves-effect waves-light btn white black-text" onclick="changeStatus('+id+','+3+')">Finish</a>';

        } else{
            alert(data.message+" Error:"+data.status);
            location.href = "dashboard.html";
        }
    });
}

function addContent(){
    
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
        } else{
            alert(data.message+" Error:"+data.status);
            location.href = "dashboard.html";
        }
    });
}