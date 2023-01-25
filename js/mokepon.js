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

let mokepones = [];
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
    constructor(nombre, foto, vida, fotoMapa){
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
let hipogeEnemigo = new Mokepon('Hipoge', 'assets/hipo.png', 5, './assets/hipodoge-h.png')
let capipepoEnemigo = new Mokepon('Capipepo', '/assets/capipepo.png', 5, './assets/capi.png')
let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/rati.png', 5, './assets/ratigueya-h.png')
let langostelvisEnemigo = new Mokepon('Langostelvis', './assets/langostelvis.png', 5,'./assets/langostelvis.png')
let pydosEnemigo = new Mokepon('Pydos', './assets/pydos.png', 5, './assets/pydos.png')
let tucapalmaEnemigo = new Mokepon('Tucapalma', './assets/tucapalma.png', 5, './assets/tucapalma.png')


hipoge.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra' }
)

hipogeEnemigo.ataques.push(
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

capipepoEnemigo.ataques.push(
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

ratigueyaEnemigo.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }
)

langostelvis.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }
)

langostelvisEnemigo.ataques.push(
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🌱', id: 'boton-tierra' }
)

pydos.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra' }
)

pydosEnemigo.ataques.push(
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra' }
)

tucapalma.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
)

tucapalmaEnemigo.ataques.push(
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '🌱', id: 'boton-tierra' },
    { nombre: '💧', id: 'boton-agua' },
    { nombre: '🔥', id: 'boton-fuego'},
)

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

    sectionVerMapa.style.display = 'flex'
    iniciarMapa();
    extraerAtaques(mascotaJugador);
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
           ataqueAleatorioEnemigo();
        })
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
    hipogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
    pydosEnemigo.pintarMokepon()
    langostelvisEnemigo.pintarMokepon()
    tucapalmaEnemigo.pintarMokepon()

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
        revisarColision(hipogeEnemigo)
        revisarColision(capipepoEnemigo)
        revisarColision(ratigueyaEnemigo)
        revisarColision(pydosEnemigo)
        revisarColision(langostelvisEnemigo)
        revisarColision(tucapalmaEnemigo)
    }

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
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo);
}

window.addEventListener('load', iniciarJuego)