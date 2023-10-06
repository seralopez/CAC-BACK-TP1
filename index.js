const express = require('express');
const app = express();
const { body, validationResult }= require('express-validator');
app.use(express.json());
const bodyParser = require('body-parser');

const alumnos = [
    {
        id: 11,
        nombre: "Juan Perez",
        apellido: "Perez",
        email: "jperez@codoacodo.com",
        cursos: [
            { codigo: "k200", nombre: "Paradigmas de la Programación" },
            { codigo: "k201", nombre: "Testing " }
        ]
    },
    {
        id: 12,
        nombre: "Facundo Perez",
        email: "fperez@codoacodo.com",
        cursos: [
            { codigo: "k200", nombre: "Programación Fullstack. js" },
            { codigo: "k201", nombre: "Testing " }
        ]
    }
]

function id_existe(req){
    const resultado = alumnos.find((alumno) => alumno.id == req.userId)
    return resultado
}

function okMiddleware(req,res){
    res.json(req.alumnoBuscado)
}

function badRequest(err, req, res, next){
    res.status(404)
    res.json({message: err})
    return new Error (err)
}

function id_numero(req, res, next){
    const {userId} = req
    const resultado = id_existe(req)
    if (resultado){
        req.alumnoBuscado = resultado
        next()
    }else{
        next("ID alumno no encontrado.")
    }
}

function id_letra(req, res, next){
    if (req.userId == "lista"){
        req.alumnoBuscado = alumnos
        next()
    }else{
        next("Por favor ingresar un numero.")
    }
}

function check_id (req, res, next){
    req.userId = req.params.id
    if (isNaN(req.userId)){
        id_letra(req, res, next)
    } else{
        id_numero(req, res, next)
    } 
}
// ==================================== BUSCAR ID
app.get('/alumno/:id', check_id, okMiddleware, badRequest)

// ==================================== AGREGAR ID
var jsonParser = bodyParser.json();

function alumno_agregar(req, res, next) {
    req.userId = req.body.id
    const resultado = id_existe(req)
    if (!resultado){
        next()
    }else{
        next("ID en uso, prueba con otro.")
    }
}

function alumno_guardar(req, res, next) {
    alumnos.push(
        {
            "id": req.body.id,
            "nombre": req.body.nombre,
            "apellido": req.body.apellido,
            "email": req.body.email,
            "cursos": [
                { "codigo": "k200", nombre: "Paradigmas de la Programación" },
                { "codigo": "k201", nombre: "Testing " }
            ]
        }
    )
    res.json({message: "Alumno guardado correctamente!"})
}

app.post("/agregar", alumno_agregar,alumno_guardar,badRequest)

app.listen(3000, () => {
    console.log('< --- Servidor iniciado --- >')
});