const formulario_producto_nuevo = document.querySelector("formulario_producto_nuevo");

class Producto{
    constructor(id, nombre, descripcion, precio){
        this.Id = id;
        this.Nombre = nombre;
        this.Descripcion = descripcion;
        this.Precio = precio;
    }
    ObternerDatos(){
        console.log(this.Id);
        console.log(this.Nombre);
        console.log(this.Descripcion);
        console.log(this.Precio);
    }
}
//cada elemento guardado en el formulario lo convierte en objeto
function AgregarProducto(event){
    //console.log(document.querySelector('#nombre_producto').value);
    let lectorFormulario = new FormData(formulario_producto_nuevo); //recibe el formulario por medio del id
    console.log(lectorFormulario);
    const datos = Object.fromEntries(lectorFormulario.entries());//toma los form y main para ascociarlos
    const json = JSON.stringify(datos);
    console.log(datos);
    //console.log(formulario_producto_nuevo);
}