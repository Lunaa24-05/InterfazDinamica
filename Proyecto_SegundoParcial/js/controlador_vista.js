/*
Encargado de controlar la interfaz gráfica:
Crear dinámicamente las tarjetas con los videojuegos.
Generar botones funcionales de editar y eliminar en cada tarjeta.
Mostrar mensajes de error o confirmación visualmente.
Conectarse con la clase GestorVideojuegos para actualizar los datos.
*/ 

export class ControladorVista {
    constructor(gestor) {
        this.gestor = gestor;
        this.contenedor = document.getElementById('contenedor_elementos_juegos');
        this.formulario = document.getElementById('formulario_agregar');
        this.mensajeError = document.getElementById('mensaje_error');
        this.videojuegoActual = null; // Para editar
        this.Inicializar();
    }
    //se inicializan los eventos
    Inicializar() {
        this.formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            this.GuardarVideojuego();
        });
        this.RenderizarLista();
    }
    //se encarga de mostrar la lista de videojuegos
    RenderizarLista() {
        this.contenedor.innerHTML = '';
        const videojuegos = this.gestor.ObtenerLista(); 
        videojuegos.forEach(vj => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta';
            tarjeta.innerHTML = `
                <h3>${vj.titulo}</h3>
                <p>${vj.descripcion}</p>
                <p><strong>Plataforma:</strong> ${vj.plataforma}</p>
                <button class="editar" data-id="${vj.id}">Editar</button>
                <button class="eliminar" data-id="${vj.id}">Eliminar</button>
            `;
            tarjeta.querySelector('.editar').addEventListener('click', () => this.CargarParaEditar(vj.id));
            tarjeta.querySelector('.eliminar').addEventListener('click', () => this.EliminarVideojuego(vj.id));
            this.contenedor.appendChild(tarjeta);
        });
    }
    //muestra mensaje de error
    MostrarError(mensaje) {
        this.mensajeError.textContent = mensaje;
        this.mensajeError.style.display = 'block';
        setTimeout(() => {
            this.mensajeError.style.display = 'none';
        }, 3000);
    }
    //se encarga de guardar o actualizar un videojuego
    GuardarVideojuego() {
        const titulo = this.formulario.titulo.value.trim(); 
        const descripcion = this.formulario.descripcion.value.trim();
        const plataforma = this.formulario.plataforma.value.trim();
        if (!titulo || !descripcion || !plataforma) {
            this.MostrarError("Todos los campos son obligatorios.");
            return;
        }
        const datos = { titulo, descripcion, plataforma }; //nuevo objeto videojuego
        try {   
            if (this.videojuegoActual) {
                this.gestor.Actualizar(this.videojuegoActual.id, datos);
                this.videojuegoActual = null;
                this.formulario.querySelector('button[type="submit"]').textContent = 'Agregar Videojuego';
            } else {
                this.gestor.Agregar(datos);
            }
            this.formulario.reset();
            this.RenderizarLista();
        } catch (error) {
            this.MostrarError(error.message);
        }
    }
    //se encarga de cargar los datos del videojuego en el formulario para editar
    CargarParaEditar(id) {
        try {
            const vj = this.gestor.ObtenerPorId(id);
            this.videojuegoActual = vj;
            this.formulario.titulo.value = vj.titulo;
            this.formulario.descripcion.value = vj.descripcion;
            this.formulario.plataforma.value = vj.plataforma;
            this.formulario.querySelector('button[type="submit"]').textContent = 'Actualizar Videojuego';
        } catch (error) {
            this.MostrarError(error.message);
        }
    }
    //elimina un videojuego
    EliminarVideojuego(id) {
        try {
            this.gestor.Eliminar(id);
            this.RenderizarLista();
        } catch (error) {
            this.MostrarError(error.message);
        }
    }
}


