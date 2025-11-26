import { cargarJSON, iniciarSesion } from "./sesiones.js";
 
//que el usuario llene los datos del formulario y los envie
/*const usuario = {
    correo: 'dany252257@hotmail.com',
    contraseña: 'Dany252257'
}*/
const formulario = document.querySelector('#formulario_inicio_sesion');
//funcion para iniciar sesion
function IniciarSesion(event){
    event.preventDefault();
    const datos = new FormData(formulario);
    const datos_usuario = Object.fromEntries(datos.entries());
 
    if(datos_usuario.correo &&
         datos_usuario.contraseña){
        //una vez que se validen los datos, se imprimen en consola
        if(datos_usuario.contraseña === usuario.contraseña){
            if(datos_usuario.correo === usuario.correo){
                console.log("Inicio de sesion exitoso");
                localStorage.setItem('usuario', JSON.stringify(usuario)); //almacenar datos en localStorage, tiene 2 elementos: clave y valor
            }
            else{
            console.log("Contraseña incorrecta");
            }
        }
        else{
            console.log("Correo incorrecto");
        }  
    }
}
//funcion para cerrar sesion
function CerrarSesion(){
    localStorage.removeItem('usuario'); //eliminar datos del localStorage
    console.log("Sesion cerrada");
}
iniciarSesion('dan252257@hotmail.com', 'Dany252257');
//cargarJSON('../datos/usuarios.json');
 