const elementos = document.querySelector("#elementos");


function crearimagen(event){

    console.log(event.target.value);
    elementos.innerHTML = "";
    for(let i = 0; i< event.target.value; i++){
        //elementos.innerHTML = "";
        const imagen = new Image();
        imagen.src = "recursos/keroppi.webp";
        imagen.classList.add("imagen-nueva");
        elementos.appendChild(imagen);
        const titulo = document.createElement("h2");
        titulo.textContent = "keroppi";
        elementos.appendChild(titulo);
    }
            /*<img src="recursos/keroppi.webp" class="imagen-nueva"></img>
    const imagen = ''*/
    /*const imagen = document.createElement("img");
    imagen.src = "recursos/keroppi.webp";
    imagen.classList.add("imagen-nueva");
    elementos.appendChild(imagen);
    console.log(imagen);*/
}