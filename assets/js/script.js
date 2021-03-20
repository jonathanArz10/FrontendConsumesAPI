$(document).ready(function () {
    getPeople();
});

function getPeople() {
    $.ajax({
        url: 'http://localhost:8000/api/people',
        success: function (request) {
            createTable(request);
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
};

function createTable(request) {
    var int = 1;
    $.each(request, function (key, value) {
        $.ajax({
            url: 'http://localhost:8000/api/movies/' + value["favoriteSWMovie"],
            success: function (movie) {
                $("#content").append("<tr id='tr" + int + "'" + "></tr>");
                $("#tr" + int).append("<th scope='row'>" + value["id"] + "</th>");
                $("#tr" + int).append("<td>" + value["firstName"] + " " + value["secondName"] + "</td>");
                $("#tr" + int).append("<td>" + value["firstLastName"] + " " + value["secondLastName"] + "</td>");
                $("#tr" + int).append("<td>" + value["age"] + "</td>");
                $("#tr" + int).append("<td>" + movie + "</td>");
                $("#tr" + int).append("<td><button onclick='getPerson(" + value["id"] + ")' type='button' class='btn btn-light'>Editar</td></button>");
                $("#tr" + int).append("<td><button onclick='deletePerson(" + value["id"] + ")' type='button' class='btn btn-danger'>Eliminar</td></button>");
                if (int == Object.keys(request).length) {
                    $("#content").append("<button type='button' class='btn btn-success' data-toggle='modal' data-target='#exampleModal'>Nuevo Registro</button>");
                }
                int++;
            },
            error: function () {
                console.log("No se ha podido obtener la información");
            }
        });
    });
};

$("#savePerson").click(function () {
    var firstName = $("#exampleInput1").val().split(" ")[0];
    if (!$("#exampleInput1").val().split(" ")[1]) {
        var secondName = " ";
    } else {
        var secondName = $("#exampleInput1").val().split(" ")[1];
    }
    var firstLastName = $("#exampleInput2").val().split(" ")[0];
    if (!$("#exampleInput2").val().split(" ")[1]) {
        var secondLastName = " ";
    } else {
        var secondLastName = $("#exampleInput2").val().split(" ")[1];
    }
    var age = $("#exampleInput3").val();
    var movieId = $("#movieId").val();
    var data = {
        'firstName': firstName,
        'secondName': secondName,
        'firstLastName': firstLastName,
        'secondLastName': secondLastName,
        'age': age,
        'favoriteSWMovie': movieId
    }
    console.log(data);
    $.ajax({
        url: 'http://localhost:8000/api/people',
        type: 'POST',
        data: data,
        success: function (request) {
            //console.log(request);
            alert("Registro guardado con exito");
            location.reload();

        },
        error: function (request) {
            console.log("No se ha podido guardar la información");
        }
    });
});

function getPerson(id) {
    $.ajax({
        url: 'http://localhost:8000/api/people/' + id,
        success: function (request) {
            $("#id").val(request["id"]);
            $("#updateInput1").val(request["firstName"] + " " + request["secondName"]);
            $("#updateInput2").val(request["firstLastName"] + " " + request["secondLastName"]);
            $("#updateInput3").val(request["age"]);
            $("#updateMovieId").val(request["favoriteSWMovie"]);
            $('#updateModal').modal('toggle');
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
};

$("#updatePerson").click(function () {
    var id = $("#id").val();
    var firstName = $("#updateInput1").val().split(" ")[0];
    if (!$("#updateInput1").val().split(" ")[1]) {
        var secondName = " ";
    } else {
        var secondName = $("#updateInput1").val().split(" ")[1];
    }
    var firstLastName = $("#updateInput2").val().split(" ")[0];
    if (!$("#updateInput2").val().split(" ")[1]) {
        var secondLastName = " ";
    } else {
        var secondLastName = $("#updateInput2").val().split(" ")[1];
    }
    var age = $("#updateInput3").val();
    var movieId = $("#updateMovieId").val();
    var data = {
        'firstName': firstName,
        'secondName': secondName,
        'firstLastName': firstLastName,
        'secondLastName': secondLastName,
        'age': age,
        'favoriteSWMovie': movieId
    }
    $.ajax({
        url: 'http://localhost:8000/api/people/' + id,
        type: 'PUT',
        data: data,
        success: function (request) {
            alert("Registro guardado con exito");
            location.reload();

        },
        error: function (request) {
            console.log("No se ha podido guardar la información");
        }
    });
});


function deletePerson(id) {
    $.ajax({
        url: 'http://localhost:8000/api/people/' + id,
        type: 'DELETE',
        success: function (request) {
            location.reload();
        },
        error: function () {
            console.log("No se ha podido eliminar la información");
        }
    });
};