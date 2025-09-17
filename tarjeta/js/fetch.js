const url_api = "https://fakestoreapi.com/users";

fetch(url_api).then(response => response.json())
.then( datos => {
    console.log(datos);
})

/*fetch(url_api).then(respuesta =>{
    if(respuesta.ok){
        console.log(respuesta);
        return respuesta.json();
    } else{
        throw new Error ("Error en la peticion: " + respuesta.status)
    }
}).then(datos =>{
     datos.forEach(usuario => {
        console.log(usuario.name)
        //otra peticion fetch mandado el url del pokemon 
        //para que me devuelva todos los datos de cada pokemon.
    });
})*/

function peticionAJAX(url){
    let xhr = new XMLHttpRequest();

    xhr.open('GET',url, true);
    xhr.onload= function (){
        if(xhr.status == 200){
            let datos = JSON.parse(xhr.responseText);
            console.log(datos);
        } else{
            console.error("Error en la peticion AJAX: ", xhr.status);
        }
    };
    xhr.send();
}

peticionAJAX(URL_api);