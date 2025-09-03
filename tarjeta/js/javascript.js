const elementos = document.querySelector("#elementos");


function creartarjeta(event){

    console.log(event.target.value);
    elementos.innerHTML = "";
    for(let i = 0; i< event.target.value; i++){
        //elementos.innerHTML = "";
        const cont = new Image();
        imagen.src = "recursos/portada.avif";
        imagen.classList.add("img");
        elementos.appendChild(imagen);
        const texto = document.create("info");
        titulo.textContent = "keroppi";
        elementos.appendChild(texto);
    }
}
/*
const tarjeta = document.createElement();
        tarjeta.classList.add("cont");
        elementos.appendChild(cont);*/