// SELECTORES
const formulario = document.querySelector('form');
const lista__tareas = document.querySelector('.lista__tareas');
let tareas = [];

//Validar Formulario
cargarEventos();
function cargarEventos(){
    document.addEventListener('DOMContentLoaded', () => {
        formulario.addEventListener('submit', validarFormulario);
        tareas = JSON.parse(localStorage.getItem('tareas')) || []; 
        /* Intenta convertir a un array la clave tareas del LS pero si no existe eso
           agrega un arreglo vacio
         */
        crearHMTL(); // Recibe el arreglo 
    })
}

function validarFormulario(e){
    e.preventDefault();

    const contadorInput = document.querySelector('.contador__input').value;
    if(contadorInput === ''){
        mensaje('No puede ir una tarea vacia', 'error');
        return;
    }else{
        mensaje('Tarea Agregada Correctamete', 'correcto');
    }

    const valorObj = {
        id: Date.now(),
        contadorInput
    }
    //Añadir objetos al array
    tareas = [...tareas, valorObj];
    //Crear HTML
    crearHMTL();

    formulario.reset();
}
function crearHMTL(){
    limpiarHTML(lista__tareas);

    if(tareas.length > 0){
        tareas.forEach(tarea => {
            //Div Tareas
            const divTareas = document.createElement('DIV');
            divTareas.classList.add('div__tareas', 'bg-rojo');

            //Tarea titulo
            const tareaHead = document.createElement('P');
            tareaHead.classList.add('tareas');
            tareaHead.textContent = tarea.contadorInput;

            //Acciones
            const acciones = document.createElement('DIV');
            acciones.classList.add('acciones');

            //Enlaces aceptar
            const aceptar = document.createElement('A');
            aceptar.classList.add('aceptar', 'aceptar');
            //Imagen aceptar
            const imgAceptar = document.createElement('IMG');
            imgAceptar.src = 'img/aceptar.png';
         
 
            aceptar.appendChild(imgAceptar);
            acciones.appendChild(aceptar);

            //Enlaces Cerrar
            const cerrar = document.createElement('A');
            cerrar.classList.add('aceptar', 'cerrar');
            cerrar.onclick = () => {
                borrarTarea(tarea.id);
            }
            //Imagen Cerrar
            const imgCerrar = document.createElement('IMG');
            imgCerrar.src = 'img/cerca.png';
        

            cerrar.appendChild(imgCerrar);
            acciones.appendChild(cerrar);

            divTareas.appendChild(tareaHead);
            divTareas.appendChild(acciones);

            lista__tareas.appendChild(divTareas);
            formulario.reset();
        })
    }
    sincronizarStorage();
}
function borrarTarea(id){
    tareas = tareas.filter(tarea => tarea.id !== id);
    crearHMTL();
}
function sincronizarStorage(){
    localStorage.setItem('tareas', JSON.stringify(tareas));
}
// GENERALES
function mensaje(mensaje, tipo){
    const div = document.createElement('DIV');
    div.textContent = mensaje;
    const error = document.querySelector('.error');
    if(!error){
        if(tipo === 'error'){
            div.classList.add('error');
        }else{
            div.classList.add('correcto');
        }
        formulario.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
}

function limpiarHTML(div){
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
}
