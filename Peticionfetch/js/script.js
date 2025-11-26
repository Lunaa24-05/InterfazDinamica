const url = "https://jsonplaceholder.typicode.com/posts";
const datos_enviar = {
    title: 'Post 1',
    body: 'contenido del post',
    userId: 1
};

//utilizamos la palabra async para definir una funcion como asincrona
//await solo se puede ejecutar dentro de funciones definidas como asincronas
//se utiliza para esperar una respuesta de una funcion asincrona
async function peticionFetchGet(url){
    try{
        const respuesta = await fetch(url);
        if(!respuesta.ok){
            throw new Error('Error HTTP: ', respuesta.status);
        }
          const datos = await respuesta.json();
          //console.log(datos);
          return datos;
       /* fetch(url).then(respuesta=>respuesta).then(datos=>{
           console.log(datos);
        });*/
    }
    catch(error){
        return error;
        /*console.log("---Error---");
        console.log(error);*/
    }

}

async function peticionFetchPost(url, datos_a_enviar){
    try{
        const respuesta = await fetch(url, {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(datos_a_enviar)
        });
        if(!respuesta.ok){
            throw new error('Error HTTP:', respuesta.status);
        }
        const datos = await respuesta.json();
        return datos;
    }
    catch(error){
        return error;
    }

}

peticionFetchGet(url)
.then(respuesta => {
    respuesta.forEach(element =>{
        console.log(element)
    });
})
.catch(error=>{
    console.log(error);
});

/*peticionFetchGet(url).then(datos => {console.log(datos)})
.catch(error=>{
    console.log(error);
})*/

peticionFetchPost(url, datos_enviar)
.then(datos=>{
    console.log(datos)})
.catch(error=>{
    console.log(error);
})
    