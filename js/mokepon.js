const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador');
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const seccionMensajes = document.getElementById('resultado');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const contenedorBotones = document.getElementById('contenedor-btns');
const btnReiniciar = document.getElementById('boton-reiniciar');

let mokepones = [];
let opcionDeMokepones;
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let inputHipoge;
let inputCapipepo;
let inputRatigueya;
let seleccionarMascota;
let mascotaJugador;
let botonFuego;
let botonAgua;
let botonTierra; 
let botones = [];
let btnAtaqueJugador = [];

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipoge = new Mokepon('Hipoge', 'assets/hipo.png', 5)
let capipepo = new Mokepon('Capipepo', '/assets/capipepo.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/rati.png', 5)

hipoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra' }
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
   
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }
)

mokepones.push(hipoge, capipepo, ratigueya);

function aleatorio(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min)
}

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
            <input type="radio" name="mascota" id=${mokepon.nombre} value=${mokepon.nombre}>
            <label class="tarjeta-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt=${mokepon.nombre}   srcset="">
            </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones;

        inputHipoge = document.getElementById("Hipoge");
        inputCapipepo = document.getElementById("Capipepo");
        inputRatigueya = document.getElementById("Ratigueya");

    })
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    
    btnReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    seleccionarMascota = document.querySelector('input[name="mascota"]:checked');
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionSeleccionarMascota.style.display = 'none';
    
    if(seleccionarMascota) {
        spanMascotaJugador.innerHTML = seleccionarMascota.value;
        mascotaJugador = seleccionarMascota.value;
    } else {
        alert('No hay ninún elemento activo');
    }
    seleccionarMascotaEnemigo();
    extraerAtaques(mascotaJugador);
}

function   extraerAtaques(mascotaJugador){
    let ataques;
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        opcionDeAtaques = `
            <button id=${ataque.id} class="btn-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorBotones.innerHTML += opcionDeAtaques;
    })
    botonFuego = document.getElementById('boton-fuego');
    botonAgua = document.getElementById('boton-agua'); 
    botonTierra = document.getElementById('boton-tierra');
    botones = document.querySelectorAll('.BAtaque')
    console.log(botones)
    secuenciaAtaque()

}

function secuenciaAtaque() {
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                btnAtaqueJugador.push('FUEGO');
                console.log(btnAtaqueJugador);
                boton.style.background = '#112f58';
            }else if (e.target.textContent === '💧') {
                btnAtaqueJugador.push('AGUA');
                console.log(btnAtaqueJugador);
                boton.style.background = '#112f58';
            }else{
                btnAtaqueJugador.push('TIERRA');
                console.log(btnAtaqueJugador);
                boton.style.background = '#112f58';
           }
        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatorio = aleatorio( 0, mokepones.length-1 );   
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre;
    
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