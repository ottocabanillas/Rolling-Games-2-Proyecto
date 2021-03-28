function CampoRequerido(input) {
    if (input.value.trim() === '') {
        input.className = 'form-control is-invalid';
        return false;
    } else {
        input.className = 'form-control is-valid';
        return true;
    }
}

function ValidarDescripcion(descripcion) {
    if (descripcion.value.trim() != '' && descripcion.value.length >= 5) {
        descripcion.className = 'form-control is-valid';
        return true;
    } else {
        descripcion.className = 'form-control is-invalid';
    }
}

function ValidEmail(email) {
    let emailRequerido = /\w+@\w+\.[a-z]{2,}$/;
    if (email.value.trim() != "" && emailRequerido.test(email.value)) {
        email.className = "form-control is-valid";
        return true;
    } else {
        email.className = "form-control is-invalid";
        return false;
    }
}

// let checkPublicado = document.getElementById('publicado');
// checkPublicado.addEventListener('change', validarPublicado);
// function validarPublicado(){
//     console.log('desde check');
//     if(checkPublicado.checked){
//         checkPublicado.className = 'form-check is-valid';    
//     }else{
//         checkPublicado.className = 'form-check is-invalid';   
//     }
// }

//==============================================================================
//============ validaciones para MODAL REGISTRO ===============================
//=============================================================================

//======= PREGUNTAR A EMI COMO LIMPIAR FORMULARIO AL ABRIR MODAL L!!!!!!!!!!!!!!!!!!!!
modalRegistro = new bootstrap.Modal(document.getElementById('modalRegistro'));
limpiarFormRegistro();
// modalRegistro.show();
//=========================================================

//-------valida Pais------------------ 
function validarSelect(paisReg) {
    if (paisReg.value.trim() != "Selecciona tu País") {
        paisReg.className = "form-select is-valid";
        return true;
    } else {
        paisReg.className = "form-select is-invalid";
        return false;
    }
}

//-------Validar Password------------
function validarPassword(passReg) {
    if (passReg.value.trim() != "") {
        passReg.className = "form-control is-valid";
        return true;
    } else {
        passReg.className = "form-control is-invalid";
        return false;
    }
}

//-------valida acepto terminos y condiciones------------------
function validarCheck(terminosReg) {
    if (terminosReg.checked) {
        console.log("acepto terminos")
        terminosReg.className = "form-check-input is-valid";
        return true;
    } else {
        console.log("NO acepto terminos")
        terminosReg.className = "form-check-input is-invalid";
        return false;
    }
}

// ---- Antes de enviar solicitud de registro realiza validacion general -------
function validarGeneralRegistro(event) {
    // --- detener el evento submit para ejecutar funciones de validacion antes de enviar ---
    event.preventDefault();
    if (validarSelect(document.getElementById("paisReg")) &&
        CampoRequerido(document.getElementById("nombreReg")) &&
        CampoRequerido(document.getElementById("nickReg")) &&
        ValidEmail(document.getElementById("emailReg")) &&
        validarPassword(document.getElementById("passReg")) &&
        validarCheck(document.getElementById("terminosReg"))) {
        // --- debo mandar el mail ----
        enviarEmailRegistro();
    } else {
        // ---- debo mostrar error y no mandar mail ----
        Swal.fire(
            "Datos Incorrectos",
            "Por favor, verifique.",
            "warning"
        );
    }
}

// Se usa emailJS y se trae el formato del objeto de emailjs para completar con los valores de los input
function enviarEmailRegistro() {
    // ---- Prepara nombre del pais seleccionado
    let varPais = "";
    switch (document.getElementById("paisReg").value) {
        case "1":
            varPais = "Argentina";
            break;
        case "2":
            varPais = "Brasil";
            break;
        case "3":
            varPais = "Bolivia";
            break;
        case "4":
            varPais = "Chile";
            break;
        case "5":
            varPais = "Paraguay";
            break;
        case "6":
            varPais = "Uruguay";
            break;
    }

    //--- prepara si acepta recbir noticias y ofertas
    let varNoticias = "No Acepto"
    if (noticiasReg.value == "on") {
        varNoticias = "Acepto"
    }

    //--- prepara email con los datos ingresados en el formulario -----
    // era de valentina: emailjs.send("service_w1eakad", "template_ehorwun"
    emailjs.send("service_x0hl6kg", "template_9n797so", {
        from_name: document.getElementById("nombreReg").value,
        to_name: "Administrador del Rolling Games",
        paisReg: varPais,
        nombreReg: document.getElementById("nombreReg").value,
        nickReg: document.getElementById("nickReg").value,
        emailReg: document.getElementById("emailReg").value,
        passReg: document.getElementById("passReg").value,
        noticiasReg: varNoticias,
        terminosReg: "Acepto"
            // to_email: "rollinggamesg3@gmail.com"
    }).then(function(response) {
        // se ejecuta cuando todo salio bien (se cumplio la promesa)
        Swal.fire(
            "Solicitud de Registro",
            "El email se envió correctamente",
            "success"
        );
        limpiarFormRegistro();
        // cerrar la ventana modal
        modalRegistro.hide();

    }, function(error) {
        //se ejecuta cuando algo salio mal al enviar el email
        Swal.fire(
            "Solicitud de Registro",
            "Ocurrió un error. Inténtelo en unos minutos.",
            "warning"
        );
    })
}

//-- limpia los campos del formulario para permitir nuevo ingreso --
function limpiarFormRegistro() {
    document.getElementById("formRegistro").reset();
    document.getElementById("paisReg").className = "form-select";
    document.getElementById("nombreReg").className = "form-control";
    document.getElementById("nickReg").className = "form-control";
    document.getElementById("emailReg").className = "form-control";
    document.getElementById("passReg").className = "form-control";
    document.getElementById("terminosReg").className = "form-check-input";
}

//============== FIN VALIDACIONES PARA MODAL REGISTRO ================