//maendejo de datos en la lista o arrelgo de videojuegos
//este se debe encargar de manejar el crud del arreglo de videojuegos
//crear elementos nuevoso en el arreglo(agregar nuevo videojuego)
//leer todos los elementos del arrreglo de videojuegos
//actualizar datos de los elementos del arreglo
//eliminar un elemento especifico

 export class GestorVideojuegos{
    constructor(){
       this.listaVideojuegos = [];
       this.videojuegoSeleccionado = null;
    }
    //carga una lista de videojuegos ingresada por el usuario
    CargarListaVideojuegos(arreglo_videojuegos){
        this.listaVideojuegos = arreglo_videojuegos;
    }
    //primero validar que exista el arreglo
    //validar que exista el objeto
    //validar que los datos no se repitan
    //se agrega un nuevo videojuego a la lista de videojuegos cargada
    AgregarNuevoVideojuego(videojuego){

        try{
            if(!this.listaVideojuegos)
                throw new Error('la lista de videojuegos no esta inicializada');
            if(!videojuego)
                throw new Error('El videojuego enviado es nulo');
            if(!videojuego.id || !videojuego.titulo || !videojuego.descripcion)
                throw new Error('Alguno de los datos es nulo');

            this.listaVideojuegos.push(videojuego);
            console.log(this.listaVideojuegos);
        }
        catch(error){
            console.log(error.message);
            return error.message;
        }
    }
    //metodo de retornar la lista de videojuegos si ya se inicializo
    ObtenerListaVideojuegos(){
        if(!this.listaVideojuegos)
        return this.listaVideojuegos;
    }
    //
    ObtenerVideojuegoPorId(id){
        //debe retornar un videojuego que el usuario le haya mandado por id
        //debe validar que el videojuego si no esta solo, que diga (lanzarun error) que no se encontro
        try{
            if(!this.listaVideojuegos)
                throw new Error('la lista de videojuegos no esta inicializada');
            const videojuego = this.listaVideojuegos.find(videojuego => videojuego.id === id);
            if(!videojuego.id)
                throw new Error('El id del videojuego es nulo');

            return videojuego;
        }
        catch(error){
            console.log(error.message);
            return error.message;
        }
    }
    //
    ActualizarDatosVideojuego(id, videojuego_actiualizado){
        try{
            if(!videojuego_actiualizado)
                throw new Error('la lista de videojuegos no esta inicializada');
            const indice = this.listaVideojuegos.findIndex(
                videojuego => videojuego.id === id
            );
            if(indice === -1){
                throw new Error('No se ha encontrado el ID en la lista de videojuegos');
            }
            else {
                this.listaVideojuegos[indice] = videojuego_actiualizado;
            }
        }
        catch(error){
            console.log(error.message);
            return error.message;
        }
    }
    //realizar el metodo de eliminar videojuego
    EliminarVideojuegoPorID(id){
        try{
            if(!this.listaVideojuegos)
                throw new Error('la lista de videojuegos no esta inicializada');

            console.log(this.listaVideojuegos);

            const indice = this.listaVideojuegos.findIndex(
                videojuego => videojuego.id === id
            );  
            if(indice === -1)
                throw new Error('No se ha encontrado el ID en la lista de videojuegos',id);
            this.listaVideojuegos.splice(indice, 1);
    }
        catch(error){
            console.log(error.message);
            return error.message;
        }
    }
 }