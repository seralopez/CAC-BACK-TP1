const express = require('express');
const app = express();
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
        badRequest("ID alumno no encontrado.", req, res, next)
    }
}

function id_letra(req, res, next){
    if (req.userId == "lista"){
        req.alumnoBuscado = alumnos
        next()
    }else{
        badRequest("Por favor ingresar un numero.", req, res, next)
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

app.get('/alumno/:id', check_id, okMiddleware)

function agregar_id(req, res, next){
    req.userId = req.params.id
    const resultado = id_existe(req)
    if (!resultado){
        console.log("ID libre")
    }else{
        badRequest("ID en uso.", req, res, next)
    }
}

app.get('/agregar/:id', agregar_id, okMiddleware)

app.listen(3000, () => {
    console.log('< --- Servidor iniciado --- >')
})