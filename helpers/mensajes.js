require('colors');

const mostrarMenu = () => {

    const promesa = new Promise ((resolve, reject) => {
        console.clear();
        console.log('=============================='.green);
        console.log('   Seleccione una Opción   '.green)
        console.log('==============================\n'.green);

        console.log(`${'1.'.green} Crear una Tarea`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Listar Tareas Completadas`);
        console.log(`${'4.'.green} Listar Tareas Pendientes`);
        console.log(`${'5.'.green} Completar Tarea(s)`);
        console.log(`${'6.'.green} Borrar Tarea`);
        console.log(`${'0.'.green} Salir \n`);

        // Para recibir la información
        // Mostrar y recibir informacion del usuario
        const readline = require('readline').createInterface({
            // Esperamos caracteres y el enter del usuario
            input: process.stdin,
            // Mostrar algun mensaje al usuario
            output: process.stdout
        });

        // Si necesitamos el stdout usamos el question
        readline.question('Seleccione una Opción: ', (opt) => {
            readline.close();
            resolve(opt);
        })
    });

    return promesa;
    
}

const pause = () => {

    return new Promise (resolve => {
        const readline = require('readline').createInterface({
            // Esperamos caracteres y el enter del usuario
            input: process.stdin,
            // Mostrar algun mensaje al usuario
            output: process.stdout
        });
    
        // Si necesitamos el stdout usamos el question
        readline.question(`\nPresione ${'ENTER'.green} para continuar\n`, () => {
            readline.close();
            resolve();
        })
    })
    
}

// Exportamos como objeto por si tenemos muchas funciones 
module.exports = {
    mostrarMenu,
    pause
}