let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];//Lista para guardar los números ya sorteados, se reinicia el reiniciar la página
let numeroMaximo = 50; //Límite para la generació del número secreto
let numeroMaximoIntentos = 15;//Máximo de intentos que tiene el jugador



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    numeroMaximoIntentos--;
    
    if(numeroMaximoIntentos > 0){
        if (numeroDeUsuario === numeroSecreto) {
            asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
            document.getElementById('reiniciar').removeAttribute('disabled');//se habilita el botón de reinicar
            deshabilitarIntentos();
        } else {
            //El usuario no acertó.
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p',`El número secreto es menor, ${(numeroMaximoIntentos > 1) ? 'te quedan' : 'te queda'} ${numeroMaximoIntentos} ${(numeroMaximoIntentos > 1) ? 'intentos' : 'intento'}`);
            } else {
                asignarTextoElemento('p',`El número secreto es mayor, ${(numeroMaximoIntentos > 1) ? 'te quedan' : 'te queda'} ${numeroMaximoIntentos} ${(numeroMaximoIntentos > 1) ? 'intentos' : 'intento'}`);
            }
            intentos++;
            limpiarCaja();
        }
    } else{
        asignarTextoElemento('p', 'Te has quedado sin intentos!');
        deshabilitarIntentos();
        document.querySelector('#reiniciar').removeAttribute('disabled');//se habilita el botón de reiniciar juego
    }    
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    // console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    numeroMaximoIntentos = 15;
    //console.log(numeroSecreto);
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');//se deshabilita el botón de reiniciar al darle click y haber iniciado el nuevo juego
    document.querySelector('#intentar').removeAttribute('disabled');//se vuelve a activar el botón de intentar
    document.getElementById('valorUsuario').removeAttribute('disabled');//se vuelve a activar el campo para ingresar los números
}

function deshabilitarIntentos() {
    document.getElementById('valorUsuario').setAttribute('disabled', 'true');//se deshabilita la caja de texto
    document.getElementById('intentar').setAttribute('disabled','true');//se deshabilita el botón de intentos
}

condicionesIniciales();
