export function registrarUsuario(nombre, correo, edad, contraseña){
    if(!nombre || !correo || !edad || !contraseña) throw new Error('Todos los campos son obligatorios');

    const key = 'usuarios';
    const listaRaw = localStorage.getItem(key);
    const lista = listaRaw ? JSON.parse(listaRaw) : [];
    if(lista.some(u => u.correo === correo)){
        throw new Error('Ya existe un usuario con ese correo');
    }
    const nuevo = { nombre, correo, edad, contraseña };
    lista.push(nuevo);
    localStorage.setItem(key, JSON.stringify(lista));
    sessionStorage.setItem('usuario', JSON.stringify(nuevo));
    return nuevo;
}
export function iniciarSesion(nombre, correo, edad, contraseña){
    if(!nombre || !correo || !edad || !contraseña) throw new Error('Todos los campos son obligatorios');

    const key = 'usuarios';
    const listaRaw = localStorage.getItem(key);
    const lista = listaRaw ? JSON.parse(listaRaw) : [];

    const usuario = lista.find(u => u.nombre === nombre && u.correo === correo && u.edad === edad && u.contraseña === contraseña);
    if(!usuario) throw new Error('Credenciales incorrectas');

    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    return usuario;
}
export function cerrarSesion(){
    sessionStorage.removeItem('usuario');
}
export function guardarHistorial(puntaje){
    const sesionRaw = sessionStorage.getItem('usuario');
    const usuario = sesionRaw ? JSON.parse(sesionRaw).nombre : 'Invitado';

    const registro = {
        usuario,
        puntaje: puntaje ?? 0,
        fecha: new Date().toISOString()
    };
    const key = 'historial_partidas';
    const raw = localStorage.getItem(key);
    const lista = raw ? JSON.parse(raw) : [];
    lista.push(registro);
    localStorage.setItem(key, JSON.stringify(lista));
    return registro;
}
export function obtenerHistorial(){
    const raw = localStorage.getItem('historial_partidas');
    return raw ? JSON.parse(raw) : [];
}
document.addEventListener('DOMContentLoaded', ()=>{
    const btnRegistrar = document.getElementById('boton_iniciar_sesion');
    const btnCerrar = document.getElementById('boton_cerrar_sesion');

    if(btnRegistrar){
        btnRegistrar.addEventListener('click', (e)=>{
            e.preventDefault();
            try{
                const nombre = document.getElementById('nombre_usuario')?.value?.trim();
                const correo = document.getElementById('email')?.value?.trim();
                const edad = document.getElementById('edad')?.value?.trim();
                const contraseña = document.getElementById('password')?.value?.trim();
                const user = registrarUsuario(nombre, correo, edad, contraseña);
                alert('Registro exitoso. Sesión iniciada como: ' + user.nombre);
                window.location.href = 'index.html';
            }catch(error){
                alert(error.message || 'Error al registrar usuario');
            }
        });
    }

    if(btnCerrar){
        btnCerrar.addEventListener('click', (e)=>{
            e.preventDefault();
            cerrarSesion();
            alert('Sesión cerrada');
            window.location.href = 'index.html';
        });
    }
});