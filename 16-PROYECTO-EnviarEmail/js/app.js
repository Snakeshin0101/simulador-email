// Variables

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos del formulario

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Event listeners

eventListeners();

function eventListeners() {

    // Iniciar la app
    document.addEventListener("DOMContentLoaded", iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Reiniciar el formulario

    btnReset.addEventListener('click', limpiarForm);

    // Enviar el formulario

    formulario.addEventListener('submit', enviarEmail);
}

//Funciones

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    email.classList.remove('border', 'border-green-500');
    asunto.classList.remove('border', 'border-green-500');
    mensaje.classList.remove('border', 'border-green-500');
}

// Valida el formulario

function validarFormulario(e) {
    //console.log(e.target.type);

    // Elimina los mensajes de html si existen
    const error = document.querySelector('p.error');
    if (error !== null) {
        error.remove();
    }

    if (e.target.value.length > 0) {
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');        
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {
        
        if (er.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if (error !== null) {
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('El Correo no es valido');
        }
    }

    if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'text-center', 'error', 'mb-10');

    const errores = document.querySelectorAll('.error');

    if (errores.length === 0) {
        formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
    }    
}

// Enviando email

function enviarEmail(e) {
    e.preventDefault();
    
    // Mostrar spinner
    const  spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Despues de 3 segundos ocultar spinner y mostrar mensaje
    setTimeout(() => {
        spinner.style.display = 'none';
        
        // Mensaje de exito
        const enviado = document.createElement('p');
        enviado.textContent = 'Mensaje enviado correctamente';
        enviado.classList.add('border', 'border-green-500', 'background-green-100', 'text-green-500', 'p-3', 'text-center', 'mb-3');

        // Insertarlo en el formulario
        formulario.insertBefore(enviado, document.querySelector('.mb-10'));
        console.log(enviado);
        
        setTimeout(() => {
            enviado.remove();
            limpiarForm();
        }, 5000);

    }, 3000);
}

// funcion que resetea el formulario
function limpiarForm() {
    
    formulario.reset();
    
    iniciarApp();
}

