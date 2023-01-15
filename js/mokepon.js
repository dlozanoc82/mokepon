let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

function aleatorio(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min)
}

function iniciarJuego() {

    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'none';

    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'none';

    let botonMascotaJugador = document.getElementById('boton-mascota')
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.addEventListener('click', ataqueFuego)

    let botonAgua = document.getElementById('boton-agua'); 
    botonAgua.addEventListener('click', ataqueAgua)

    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.addEventListener('click', ataqueTierra)

    let btnReiniciar = document.getElementById('boton-reiniciar');
    btnReiniciar.addEventListener('click', reiniciarJuego)
 
}

function seleccionarMascotaJugador() {
    
    let seleccionarMascota = document.querySelector('input[name="mascota"]:checked');
    let spanMascotaJugador = document.getElementById('mascota-jugador');
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'flex';
     let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
     sectionSeleccionarMascota.style.display = 'none';
    
    if(seleccionarMascota) {
        //alert('Seleccionaste a : ' + seleccionarMascota.value);
        spanMascotaJugador.innerHTML = seleccionarMascota.value;
    } else {
        alert('No hay ninún elemento activo');
    }

    seleccionarMascotaEnemigo();

}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio(1, 3);
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

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
    
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');

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

    //Contenedor Padre
    let seccionMensajes = document.getElementById('mensaje');

    //Creacion y edicion del contenedor Hijo
    let parrafo = document.createElement('p');
    parrafo.innerHTML = 'Tu mascota atacó con: ' + ataqueJugador +  ' la mascota del enemigo atacó con: '+ ataqueEnemigo +' '+resultado;

    //Agregamos el contendeor hijo al contenedor padre
    seccionMensajes.appendChild(parrafo);

}

function crearMensajeFinal(resultadoFinal) {

    //Contenedor Padre
    let seccionMensajes = document.getElementById('mensaje');

    //Creacion y edicion del contenedor Hijo
    let parrafo = document.createElement('p');
    parrafo.innerHTML = resultadoFinal;

    //Agregamos el contendeor hijo al contenedor padre
    seccionMensajes.appendChild(parrafo);

    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.disabled = true;
    let botonAgua = document.getElementById('boton-agua'); 
    botonAgua.disabled = true;
    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.disabled = true;
    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

window.addEventListener('load', iniciarJuego)