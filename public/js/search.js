function $(id){
    return document.getElementById(id);
}

function requestData(id){
    let config = {
        method: "GET",
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
            "Authorization":"Bearer "+sessionStorage.getItem("token")
        }
    };
    
    fetch('./../search/'+id, config)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.data.length>0){
            data.data.forEach(element => {
                $("result").innerHTML += '<li><div class="collapsible-header">'+element.project_name+'</div><div class="collapsible-body"><span>'+element.project_description+'</span><br><br><br><div><a href="project.html?project_id='+element.project_id+'" class="secondary-content waves-effect waves-light btn-floating btn-large black"><i class="material-icons white-text">play_arrow</i></a></div></div></li>'
            });
        }else{
            $("text-result").innerText = "No se han encontrado coincidencias"
        }
    });
}


$("search").addEventListener('keydown',function(e){
        var key = e.keyCode;
        if (key === 13) {
            //alert("search.html?s="+$("search").value);
            location.href = "search.html?s="+$("search").value;
            e.preventDefault();
        }
})