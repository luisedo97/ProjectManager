function $(id) {
    return document.getElementById(id);
}

window.onload = function() {
    if (sessionStorage.getItem("token") == null || undefined) {
        alert("NO TIENES SESSION!");
        location.href = "dashboard.html";
    } else {
        let config = {
            method: "GET",
            withCredentials: true,
            credentials: 'same-origin',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        };

        fetch('./../project/getListProject', config)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status == 200 || data.status == 201) {
                    data.data.forEach(element => {
                        $('row').innerHTML += "" +
                            '<div class="card grey darken-1 carousel-item col s4">' +
                            '<div class="card-content white-text">' +
                            '<span class="card-title center">' + element.project_name + '</span>' +
                            '<p class="center">' + element.project_description + '</p>' +
                            '</div>' +
                            '<div class="card-action center">' +
                            '<br>' +
                            '<a href="project.html?project_id=' + element.project_id + '" class="waves-effect waves-light btn lime">Acceder</a>' +
                            '</div>' +
                            '</div>';
                    });
                } else {
                    alert(data.message + " Error:" + data.status);
                    location.href = "dashboard.html";
                }
            });
    }
}

function createProject() {
    let body = {
            project_name: $('name_project').value,
            project_des: $('des_project').value
        },
        params = {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }),
            body: JSON.stringify(body)
        };
    fetch("./../project/createProject", params)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if (data.status == 200) {
                location.reload();
            } else {
                alert("Error al iniciar sesion, status:" + data.status);
            }
        });
}

$('modalbtn').addEventListener('click', createProject);