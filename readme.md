### ejercicio
<!-- Se nos pide un pequeño sistema que le permite agregar cursos y alumnos, por
ahora no quiere que persistamos datos sinó que hagamos una prueba de concepto
(POC) desde el back.

Un ejemplo de get de un alumno puntual debería ser:

path: /alumno/:id
Response:
    {
        id: 12
        nombre: “Facundo Perez”,
        email: “fperez@codoacodo.com”
        cursos: [
        {código:k200, nombre: “Programación Fullstack. js”},
        {código:k201, nombre: “Testing ”}
        ]
    }

Un ejemplo obtener una lista de alumnos es:
path: /alumno/list
Response:
    [{
        id: 11
        nombre: “Juan Perez”,
        apellido: “Perez”,
        email: “jperez@codoacodo.com”
        cursos: [
            {código:k200, nombre: “Paradigmas de la Programación”},
            {código:k201, nombre: “Testing ”}
        ]
    },
    {
        id: 12
        nombre: “Facundo Perez”,
        email: “fperez@codoacodo.com”
        cursos: [
            {código:k200, nombre: “Programación Fullstack. js”},
            {código:k201, nombre: “Testing ”}
        ]
    }]

Endpoints a desarrollar:
    ● Poder agregar y quitar cursos de un alumno.
    ● Poder obtener a todos los alumnos.
    ● Poder obtener un alumno puntual.
    ● Crear un alumno.
    ● Eliminar a un alumno.

Agregar validaciones:
    ● Agregar dos validaciones mínimo, puede ser en los endpoints de creación o
    actualización. Por ejemplo:
    ● Validar si el mail del usuario a crear se repite
    ● Validar si el mail tiene formato válido
    ● Validar si el usuario a actualizar existe.
    ● Validar si el valor a actualizar es válido ( no deberías actualizar un valor que no existe por
    ejemplo)
    
Por ahora no usaremos persistencia utilizaremos utilizaremos una lista de objetos
alumnos para representar una colección en la base de datos, como hicimos en clase -->