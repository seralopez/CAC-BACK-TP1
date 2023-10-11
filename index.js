const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator');
app.use(express.json());

var alumnos = [
    {
        "id": 11,
        "nombre": "Juan Perez",
        "apellido": "Perez",
        "email": "jperez@codoacodo.com",
        "cursos": [
            { codigo: "k200", nombre: "Paradigmas de la Programación" },
            { codigo: "k201", nombre: "Testing " }
        ]
    },
    {
        "id": 12,
        "nombre": "Facundo Perez",
        "email": "fperez@codoacodo.com",
        "cursos": [
            { "codigo": "k200", nombre: "Programación Fullstack. js" },
            { "codigo": "k201", nombre: "Testing " }
        ]
    }
]

function id_existe(req) {
    const resultado = alumnos.find((alumno) => alumno.id == req.userId)
    return resultado
}

function okMiddleware(req, res) {
    res.json(req.alumnoBuscado)
}

function badRequest(err, req, res, next) {
    res.status(404)
    res.json({ message: err })
    return new Error(err)
}
// ==================================== CURSO AGREGAR =============================================
app.post("/alumno/curso/agregar", curso_buscar, badRequest)
function curso_buscar(req, res, next) {
    req.userId = req.body.id
    const resultado = id_existe(req)
    if (resultado) {
        const indice = alumnos.findIndex(idx => idx.id == req.body.id )
        alumnos[indice].cursos.push(
            { "codigo": req.body.codigo, "nombre": req.body.nombre }
        )
        res.json(alumnos)
    } else {
        next("ID no existe, vuelve a intentar.")
    }
}
// ==================================== CURSO BORRAR =============================================-
app.post("/alumno/curso/borrar", curso_buscar, badRequest)

function curso_buscar(req, res, next) {
    req.userId = req.body.id
    const resultado = id_existe(req)
    if (resultado) {
        const indice_id = alumnos.findIndex(idx => idx.id == req.body.id )
        const indice_curso = alumnos[indice_id].cursos.findIndex(idx => idx.codigo == req.body.codigo )    
        alumnos[indice_id].cursos.splice(indice_curso, 1);
        res.json(alumnos)
    } else {
        next("ID no existe, vuelve a intentar.")
    }
}
// ==================================== ID AGREGAR ================================================
app.post("/agregar", alumno_agregar, alumno_guardar, badRequest)

function alumno_agregar(req, res, next) {
    req.userId = req.body.id
    const resultado = id_existe(req)
    if (!resultado) {
        next()
    } else {
        next("ID en uso, prueba con otro.")
    }
}
function alumno_guardar(req, res, next) {
    const resultado = alumnos.find((alumno) => alumno.email == req.body.email)
    if (!resultado) {
        alumnos.push(
            {
                "id": req.body.id,
                "nombre": req.body.nombre,
                "apellido": req.body.apellido,
                "email": req.body.email,
                "cursos": [
                    req.body.cursos
                ]
            }
        )
        res.json({ message: "Alumno guardado correctamente!" })
    } else {
        next("Mail en uso.")
    }
}
// ==================================== ID BORRAR =================================================
app.post('/borrar/:id', alumno_borrar, badRequest)

function alumno_borrar(req, res, next) {
    req.userId = req.params.id
    const resultado = id_existe(req)
    if (resultado) {
        alumnos = alumnos.filter((alumno) => alumno.id != req.userId)
        res.json("Alumno eliminado.")
    } else {
        next("ID no existe, prueba con otro.")
    }
}
// ==================================== ID BUSCAR =================================================
app.get('/alumno/:id', check_id, okMiddleware, badRequest)

function check_id(req, res, next) {
    req.userId = req.params.id
    if (isNaN(req.userId)) {
        id_letra(req, res, next)
    } else {
        id_numero(req, res, next)
    }
}
function id_numero(req, res, next) {
    const { userId } = req
    const resultado = id_existe(req)
    if (resultado) {
        req.alumnoBuscado = resultado
        next()
    } else {
        next("ID alumno no encontrado.")
    }
}
function id_letra(req, res, next) {
    if (req.userId == "lista") {
        req.alumnoBuscado = alumnos
        next()
    } else {
        next("Por favor ingresar un numero.")
    }
}
// ==================================== INICIAR SERVIDOR ==========================================
app.listen(3000, () => {
    console.log('< --- Servidor iniciado --- >')
});