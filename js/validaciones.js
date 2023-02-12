/* const inputNacimiento = document.querySelector('#birth');

inputNacimiento.addEventListener("blur", (evento) => {
    validarNacimiento(evento.target);
}); */

export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
};

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo de nombre no puede estar vacío."
    },
    email: {
        valueMissing: "El campo de correo no puede estar vacío.",
        typeMismatch: "El correo no es válido."
    },
    password: {
        valueMissing: "El campo de contraseña no puede estar vacío.",
        patternMismatch: "Al menos 6 caracteres, máximo 12. Debe contener una letra minúsucula, una letra mayúscula, un número, y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "La fecha de nacimiento no puede estar vacía.",
        customError: "Debes tener al menos 18 años de edad."
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El formato requerido es XXXXXXXXXX (10 números)."
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El formato debe contener entre 10 y 40 carácteres."
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El formato debe contener entre 10 y 40 carácteres."
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El formato debe contener entre 10 y 40 carácteres."
    }
}

const validadores = {
    nacimiento: input => validarNacimiento(input)
};

function mostrarMensajeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje
}

function validarNacimiento(input) {
    const fechaUsuario = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaUsuario)) {
        mensaje = "Debes tener al menos 18 años de edad.";
    };

    input.setCustomValidity(mensaje); // Crea un mensaje personalizado para alguna de las variables que se requiera en un formulario
};

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() +18, fecha.getUTCMonth(), fecha.getUTCDate());
    
    return diferenciaFechas <= fechaActual;
};