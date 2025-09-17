const productos = document.querySelector("#contenedor_formulario_producto_nuevo");
 
 
function creartarjeta(producto){
        const contenedor = document.createElement("div");
        contenedor.classList.add("contenedor");
 
        const cont = new Image();
        cont.src = producto.Imagen;
        cont.classList.add("imagen_producto");

        elementos.appendChild(Nombre);
        const titulo = document.createElement("nombre_producto");
        titulo.textContent = producto.Nombre;

        elementos.appendChild(Descripcion);
        const descripcion = document.createElement("descripcion");
        descripcion.textContent = producto.Descripcion;
        elementos.appendChild(descripcion);
}
 
/*
const tarjeta = document.createElement();
        tarjeta.classList.add("cont");
        elementos.appendChild(cont);*/