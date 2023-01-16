const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua'); 
const botonTierra = document.getElementById('boton-tierra');
const btnReiniciar = document.getElementById('boton-reiniciar');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const seccionMensajes = document.getElementById('resultado');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');

let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function aleatorio(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min)
}

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);

    botonFuego.addEventListener('click', ataqueFuego);
    botonAgua.addEventListener('click', ataqueAgua);
    botonTierra.addEventListener('click', ataqueTierra);
    
    btnReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    let seleccionarMascota = document.querySelector('input[name="mascota"]:checked');
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionSeleccionarMascota.style.display = 'none';
    
    if(seleccionarMascota) {
        spanMascotaJugador.innerHTML = seleccionarMascota.value;
    } else {
        alert('No hay ninún elemento activo');
    }
    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(1, 3);
    
    if (mascotaAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = 'Hipoge';
    }else if (mascotaAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = 'Capipepo';
    }else{
        spanMascotaEnemigo.innerHTML = 'Ratigueya';
    }
}

function ataqueFuego() {
    ataqueJugador = "FUEGO";
    ataqueAleatorioEnemigo();
}

function ataqueAgua() {
    ataqueJugador = "AGUA";
    ataqueAleatorioEnemigo();
}

function ataqueTierra() {
    ataqueJugador = "TIERRA";
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1,3);

    if (ataqueAleatorio ==1) {
        ataqueEnemigo = 'FUEGO'
    }else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
    } else {
        ataqueEnemigo = 'TIERRA'
    }

   combate();
}

function combate() {

    if (ataqueJugador == ataqueEnemigo) {
        crearMensaje("¡EMPATE! 🤼");
    }
    else if (ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
        crearMensaje("¡GANASTE! 🥳");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    }
    else if (ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
        crearMensaje("¡GANASTE! 🥳");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    }
    else if (ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
        crearMensaje("¡GANASTE! 🥳");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    }
    else {
        crearMensaje("PERDISTE... 😢");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    //Revisar vidas
    revisarVidas();
}

function revisarVidas() { 
    if (vidasEnemigo == 0) {
        crearMensajeFinal('FELICITCIONES! Ganaste :3')
    }else if (vidasJugador == 0) {
        crearMensajeFinal('LO SIENTO, Perdiste :c')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    seccionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

    //Agregamos el contendeor hijo al contenedor padre
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {

    //Creacion y edicion del contenedor Hijo
    seccionMensajes.innerHTML = resultadoFinal;

    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;

    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

window.addEventListener('load', iniciarJuego)