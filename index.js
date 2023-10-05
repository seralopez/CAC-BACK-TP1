const express = require('express');
const app = express();
const { body, validationResult }= require('express-validator');
app.use(express.json());

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
app.get('/agregar/:id', agregar_id, okMiddleware, badRequest)

function agregar_id(req, res, next){
    req.userId = req.params.id
    const resultado = id_existe(req)
    if (!resultado){
        console.log("ID libre")
    }else{
        badRequest("ID en uso.", req, res, next)
    }
}
// ==================================== VALIDAR PASS
/**
 * Por lo menos una mayuscula
 * por lo menos un numero
 * mayor a 8 caracteres
 * que tenga un caractere especial
 *   @param {string} req - La contraseña
 */
function errorValidatorMidleware(req, res, next){
    const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.send({ errors: result.array() });
        }
        next()
}

const esContraseñaFuerte = body('password').isStrongPassword(
    {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }
)
.withMessage('Password is not strong enough')


function endDebugger(req, res, next) {
    console.log('Body:  ', req.body)
    next()
}

const nameValidator = body('name').isLength({ min: 3 }).withMessage('El nombre tiene que tener mas de 3 caracteres.')

app.post("/alumno", nameValidator,esContraseñaFuerte, errorValidatorMidleware, okMiddleware)

app.listen(3000, () => {
    console.log('< --- Servidor iniciado --- >')
})