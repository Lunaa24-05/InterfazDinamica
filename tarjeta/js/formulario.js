const formulario_producto_nuevo = document.querySelector("#formulario_producto_nuevo");
const elementos = document.querySelector("#elementos");
let productos = []; //declarando un arreglo vacio
let src_imagen_producto = "../recursos/default.jpg";
let formulario_visible = false;

class Producto{
    constructor(id, nombre, descripcion, precio, imagen){
        this.Imagen = imagen;
        this.Id = id;
        this.Nombre = nombre;
        this.Descripcion = descripcion;
        this.Precio = precio;
        this.Contenedor = contenedor;
    }
    ObternerDatos(){
        console.log(this.Id);
        console.log(this.Imagen);
        console.log(this.Nombre);
        console.log(this.Descripcion);
        console.log(this.Precio);
        console.log(this.Contenedor);
    }
}
//cada elemento guardado en el formulario lo convierte en objeto
function AgregarProducto(event){
    let datosFormulario = new FormData(formulario_producto_nuevo); //recibe el formulario por medio del id
    //console.log(datosFormulario);
    const datos = Object.fromEntries(datosFormulario.entries());//toma los form y main para ascociarlos
    console.log(datos);
    if(datos.nombre != "" && datos.Descripcion !="" && datos.Precio != null && datos.imagen !=""){
       productos.push(new Producto(productos.length+1,src_imagen_producto, datos.Nombre, datos.Descripcion, datos.Precio, datos.Imagen));
        //imprimir el arreglo por medio de un foreach
       /* productos.forEach(producto => {
        producto.ObternerDatos();
    });*/
       if(productos.length > 0){
           crearTarjeta(productos[productos.length-1])
            MostrarProducto()
             }
        }
    /*const json = JSON.stringify(datos);
    console.log(datos);*/
    //console.log(formulario_producto_nuevo);
}
function ObtenerImagen(event){
    const file = event.target.files[0];
    console.log(file)
    //console.log(event.target);
    if(file.type === "image/jpeg" || file.type === "image/png"){
        console.log(file.name);
        const lector = new FileReader();
        lector.onload = (event) =>{
            src_imagen_producto = event.target.result;
            //console.log(event.target.result);
            document.querySelector("#imagen-file").src = src_imagen_producto;//event.target.result=
        }
        lector.readAsDataURL(file);
    }
}

function crearTarjeta(usuario){
        const producto = document.createElement("div");
        producto.classList.add("contenedor_formulario_producto_nuevo");
        
        const imagen = new Image();
        imagen.src = usuario.Imagen;
        imagen.classList.add("imagen_producto");
        
        const nombre = document.createElement("nombre_producto");
        nombre.textContent = usuario.Nombre;
        
        const descripcion = document.createElement("descripcion");
        descripcion.textContent = usuario.Descripcion;

        const precio = document.createElement("precio");
        precio.textContent = usuario.Precio;
        
        const boton = document.createElement("botonAgregar");
        boton.textContent = `Agregar`

        producto.appendChild(imagen);
        producto.appendChild(nombre);
        producto.appendChild(descripcion);
        producto.appendChild(precio);
        producto.appendChild(boton);
    
       const contenedor = document.querySelector("#elementos") || document.body;
       contenedor.appendChild(producto);
}

function MostrarProducto(){
    const formulario = document.querySelector("#contenedor_formulario_producto_nuevo");

    if(!formulario_visible){
        formulario.style.display = "grid";
        formulario_visible = true;
    }
    else{
        formulario.style.display = "none";
        formulario_visible = false;
    }


}