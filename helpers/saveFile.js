const fs = require('fs');

// Primeo utilizamos un data.txt, pero se ve mejor en json
const archivo = './db/data.json';

const guardarDb = (data) => {
    // JSON.stringify = convierte un objeto a su version json valida de string
    fs.writeFileSync(archivo, JSON.stringify(data));
}


const leerDb = () => {
    // Si no existe el archivo
    if (!fs.existsSync(archivo)){
        return null;
    }
    
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info);

    // console.log(data);

    return data
}

module.exports = {
    guardarDb,
    leerDb
}