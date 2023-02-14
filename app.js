require('colors');
// Manera eficaz de hacerlo
const { inquirerMenu, pause, leerInput, listadoTareasBorrar, confirmarEliminacion, mostrarListadoCheckList } = require('./helpers/inquirer');
const { guardarDb, leerDb } = require('./helpers/saveFile');
const Tareas = require('./models/tareas');

// Demostracion manual
// const {mostrarMenu, pause} = require('./helpers/mensajes');



const main = async() => {
    let opt = '';
    const tareas = new Tareas();

    const tareasDb = leerDb();

    if (tareasDb) { // Cargar Tareas
        tareas.cargarTareasFromArray(tareasDb);
    }

    do{
        // Decimos que espere hasta que tenga una respuesta 
        // Imprimir menu
        opt = await inquirerMenu();

        switch (opt){
            case '1': 
                // Crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.listadoCompleto();
                // console.log(tareas.listadoArr);  
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5': // Completado || Pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toogleCompletadas(ids);
                // console.log(ids);
            break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (!id === '0'){
                    // preguntar si esta seguro
                    const confirmar = await confirmarEliminacion('¿Estas seguro de borrar la tarea?');
                    // console.log({confirmar});
                    if (confirmar) {
                        tareas.borrarTarea(id);
                        console.log('\nTarea borrada!!'.green);
                    }
                }
            break
        }

        guardarDb(tareas.listadoArr);

        await pause();
    } while(opt !== '0')
    
    // pause();
}

main();