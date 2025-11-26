export async function iniciarSesion(correo, contraseña){
    try{
        if(!correo || !contraseña)
            throw new Error("Correo y contraseña son obligatorios");

        const listaUsuarios = cargarJSON('../datos/usuarios.json');

        if(!listaUsuarios)
            throw new Error("No se pudo cargar la lista de usuarios");

        const usuario = listaUsuarios.find(usr = usr.correo === correo && usr.contraseña === contraseña);

        if(usuario){
            console.log("Sesión iniciada correctamente");
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
            return usuario;
        }else{
            throw new Error("Correo o contraseña incorrectos");
        }
    }
    catch(error){
        console.error(error);
    }
}
export async function cargarJSON(url_archivo){
    try{
        if(!url_archivo){
            throw new Error("La URL del archivo es inválida");
        }
        const respuesta = await fetch(url_archivo);
         if(!respuesta.ok){
         throw new Error("No se pudo cargar el archivo: ", respuesta.status);
        }
        const datos = await respuesta.json();
        console.log(datos);
        return datos;
    }
    catch(error){
        console.error();
    }
}
export async function obtenerSesionActiva(){
    try{
        const datos = await localStorage.getItem('usuario');

        if(!usuario)
            throw new Error('No hay sesion activa');

        usuario = JSON.parse(datos);
        return usuario;
    }
    catch(error){
        console.log(error);
        return error;
    }
}
export async function CerrarSesion(){
    try{
        const usuarioActivo = obtenerSesionActiva();

        if(!usuarioActivo){
            throw new Error ('No hay una sesion activa actualmente');
        }
        localStorage.removeItem('usuario');
    }
    catch(error){
        return error;
    }
}