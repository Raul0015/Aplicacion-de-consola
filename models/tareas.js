const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    // trasnformando listado en arreglo
    get listadoArr(){
        const listado = [];
        // Para barrer las llaves del listado (_listado)
        // Extraemos las llaves que estan en el objeto
        // Regresa un arreglo de todas las llaves
        Object.keys(this._listado).forEach( key => {
            // Insertar tarea a listado
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    } 

    constructor () {
        this._listado = {};
    }

    // Metodo
    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    //Metodo
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){

        console.log();
        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index + 1}`.green;
            const {desc, completadoEn} = tarea;
            const existe = (completadoEn) ? 'Completado'.green : 'Pendiente'.red

            console.log(`${idx}. ${desc} :: ${existe}`);
        });
    }

    listarPendientesCompletadas (completadas = true){
        console.log();
        let indice = 0;
        this.listadoArr.forEach((tarea) => {
            
            const {desc, completadoEn} = tarea;
            // Estado
            const existe = (completadoEn) ? 'Completado'.green : 'Pendiente'.red

            if (completadas) { // Si completadas esta en true
                // mostrar completadas
                if(completadoEn){
                    indice += 1;
                    console.log(`${(indice + '.').green} ${desc} :: ${completadoEn.green}`);
                }
            }
            else{
                // mostrar pendientes
                if(!completadoEn){
                    indice += 1;
                    console.log(`${(indice + '.').green} ${desc} :: ${existe}`);
                }
            }
        });
    }

    toogleCompletadas (ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;