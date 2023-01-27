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

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = [];
let mokeponesEnemigos = []
let opcionDeMokepones;
let ataqueJugador;
let ataqueEnemigo = [];
let vidasJugador = 3;
let vidasEnemigo = 3;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let inputHipoge;
let inputCapipepo;
let inputRatigueya;
let seleccionarMascota;
let mascotaJugador;
let botonFuego;
let botonAgua;
let botonTierra; 
let botones = [];
let indexAtaqueJugador
let indexAtaqueEnemigo
let btnAtaqueJugador = [];
let ataquesMokeponEnemigo;
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = '../assets/mokemap.png'
let mascotaJugadorObjeto
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 650

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    } 
}

//Elecciones 
let hipoge = new Mokepon('Hipoge', 'assets/hipo.png', 5, './assets/hipodoge-h.png')
let capipepo = new Mokepon('Capipepo', '/assets/capipepo.png', 5, './assets/capi.png')
let ratigueya = new Mokepon('Ratigueya', './assets/rati.png', 5, './assets/ratigueya-h.png')
let langostelvis = new Mokepon('Langostelvis', './assets/langostelvis.png', 5,'./assets/langostelvis.png' )
let pydos = new Mokepon('Pydos', './assets/pydos.png', 5, './assets/pydos.png')
let tucapalma = new Mokepon('Tucapalma', './assets/tucapalma.png', 5, './assets/tucapalma.png')

//Enemigo


const HIPOGE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra' }
]

const CAPIPEPO_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
]

const RATIGUEYA_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }
]

const LANGOS_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }
]

const PYDOS_ATAQUES = [
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra' }
]

const TUCA_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
]

hipoge.ataques.push(...HIPOGE_ATAQUES)

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

langostelvis.ataques.push(...LANGOS_ATAQUES)

pydos.ataques.push(...PYDOS_ATAQUES)

tucapalma.ataques.push(...TUCA_ATAQUES)

mokepones.push(hipoge, capipepo, ratigueya, langostelvis, pydos, tucapalma);

function aleatorio(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min)
}

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';
    sectionVerMapa.style.display = 'none';

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

    unirseAlJuego();
}

function unirseAlJuego() {
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                     .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                     })
            }
        })
}

function seleccionarMascotaJugador() {
    seleccionarMascota = document.querySelector('input[name="mascota"]:checked');
    
    sectionSeleccionarMascota.style.display = 'none';

    if(seleccionarMascota) {
        spanMascotaJugador.innerHTML = seleccionarMascota.value;
        mascotaJugador = seleccionarMascota.value;
    } else {
        alert('No hay ninún elemento activo');
    }

    seleccionarMokepon(mascotaJugador)

    sectionVerMapa.style.display = 'flex'
    iniciarMapa();
    extraerAtaques(mascotaJugador);
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
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
    //secuenciaAtaque()

}

function secuenciaAtaque() {
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                btnAtaqueJugador.push('FUEGO');
                console.log(btnAtaqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            }else if (e.target.textContent === '💧') {
                btnAtaqueJugador.push('AGUA');
                console.log(btnAtaqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
            }else{
                btnAtaqueJugador.push('TIERRA');
                console.log(btnAtaqueJugador);
                boton.style.background = '#112f58';
                boton.disabled = true;
           }

           if (btnAtaqueJugador.length === 5) {
                enviarAtaques()
           }
           
        })
    })
    
}

function enviarAtaques() {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: btnAtaqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res){
            if (res.ok) {
                res.json()
                    .then(function ({ataques}) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate();
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre;
    ataquesMokeponEnemigo = enemigo.ataques;
    secuenciaAtaque()
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
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length-1);

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('FUEGO')
    }else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo);
    iniciarPelea();
}

function iniciarPelea() {
    if (btnAtaqueJugador.length === 5) {
        combate();
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = btnAtaqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {

    clearInterval(intervalo)

    for (let i = 0; i < btnAtaqueJugador.length; i++) {
        
        if (btnAtaqueJugador[i] === ataqueEnemigo[i]) {
            indexAmbosOponentes(i, i);
            crearMensaje("¡EMPATE! 🤼");
        }else if (btnAtaqueJugador[i] === 'FUEGO' && ataqueEnemigo[i] === 'TIERRA') {
            indexAmbosOponentes(i, i);
            crearMensaje("¡GANASTE! 🥳");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        }else if (btnAtaqueJugador[i] === 'AGUA' && ataqueEnemigo[i] === 'FUEGO') {
            indexAmbosOponentes(i, i);
            crearMensaje("¡GANASTE! 🥳");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        }else if (btnAtaqueJugador[i] === 'TIERRA' && ataqueEnemigo[i] === 'AGUA') {
            indexAmbosOponentes(i, i);
            crearMensaje("¡GANASTE! 🥳");
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        }else{
            indexAmbosOponentes(i, i);
            crearMensaje("PERDISTE... 😢");
            victoriasEnemigo++;
            spanVidasEnemigo.innerHTML = victoriasEnemigo;
        }

    }

    revisarVidas();
}

function revisarVidas() { 
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal('EMPATE !!!')
    }else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal('FELICITCIONES! Ganaste :3')
    }else{
        crearMensajeFinal('LO SIENTO, Perdiste :c')
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    seccionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

    //Agregamos el contendeor hijo al contenedor padre
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
    //Creacion y edicion del contenedor Hijo
    seccionMensajes.innerHTML = resultadoFinal;
    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

function pintarCanvas() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon();
        revisarColision(mokepon)
    })

}

function enviarPosicion(x,y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
         body: JSON.stringify({
            x,
            y
        })   
    })
        .then(function (res) {
            if(res.ok){
                res.json()
                    .then(function ({enemigos}){
                        console.log(enemigos)
                        mokeponesEnemigos = enemigos.map(function(enemigo){
                            let mokeponEnemigo = null
                            const mokeponNombre = enemigo.mokepon.nombre || ""

                            if (mokeponNombre === "Hipoge") {
                                mokeponEnemigo = new Mokepon('Hipoge', 'assets/hipo.png', 5, './assets/hipodoge-h.png', enemigo.id)
                            }else if (mokeponNombre === "Capipepo") {
                                mokeponEnemigo = new Mokepon('Capipepo', '/assets/capipepo.png', 5, './assets/capi.png', enemigo.id)
                            }else if (mokeponNombre === "Ratigueya") {
                                mokeponEnemigo = new Mokepon('Ratigueya', './assets/rati.png', 5, './assets/ratigueya-h.png', enemigo.id)
                            }else if (mokeponNombre === "Langostelvis") {
                                mokeponEnemigo = new Mokepon('Langostelvis', './assets/langostelvis.png', 5,'./assets/langostelvis.png', enemigo.id)
                            }else if (mokeponNombre === "Pydos") {
                                mokeponEnemigo = new Mokepon('Pydos', './assets/pydos.png', 5, './assets/pydos.png', enemigo.id)
                            }else if (mokeponNombre === "Tucapalma") {
                                mokeponEnemigo = new Mokepon('Tucapalma', './assets/tucapalma.png', 5, './assets/tucapalma.png', enemigo.id)
                            }
                            
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y

                            return mokeponEnemigo
                        })
                    })
            }
         })
}

function moverArriba() {
   mascotaJugadorObjeto.velocidadY = -5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverArriba();
            break;
        case 'ArrowDown':
            moverAbajo();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'ArrowRight':
            moverDerecha();
            break;
        default:
            break;
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota =  mascotaJugadorObjeto.y
    const abajoMascota =  mascotaJugadorObjeto.y +  mascotaJugadorObjeto.alto
    const derechaMascota =  mascotaJugadorObjeto.x +  mascotaJugadorObjeto.ancho
    const izquierdaMascota =  mascotaJugadorObjeto.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento();
    console.log('Se detecto una colision')
    enemigoId = enemigo.id
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo);
}

window.addEventListener('load', iniciarJuego)