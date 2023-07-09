var palabra = ""
var letraPulsada = ""
var intentos = 0
var banderin = 0
const lose = document.getElementById("lose")

rep = 0
const words = ["agua", "invierno", "camino", "monitor", "carro", "fuego",
    "cabeza", "pizarra", "festival", "libro", "escritorio", "tamaño", "teclado",
    "pensar", "sandalias"
]

//Insertar lineas de palabra
randomWord()
console.log(palabra)

espacio = document.getElementById("espacios")
for(var i = 0; i < palabra.length; i++) {
    const span = document.createElement('span')
    span.id = i
    span.className = "lineasSpan"
    espacio.appendChild(span)
}




//Listener botones letras
const btn_letras = document.querySelectorAll("#botones button")
for(var i = 0; i < btn_letras.length; i++) {
    btn_letras[i].addEventListener('click', btnLetra)
    
}

function btnLetra(event) {
    const btn = event.target

    if(intentos < 7) {
        letraPulsada = btn.value
        btn.className = "btnLetra2"
        btn.disabled = true

        recorrerPalabra()
    } else {
        letraPulsada = btn.value
        recorrerPalabra()
    }
    
    
}


function randomWord() {
    min = Math.ceil(0);
    max = Math.floor(words.length - 1);
    random = Math.floor(Math.random() * (max - min + 1) + min)
    palabra = words[random]
    return palabra
}


function comprobarPalabra(array) {
    palabrasRep = []
    img = document.getElementById('imgAhorcado')

    if (banderin == 1) return

    for(var i = 0; i < array.length; i++) {
        if(array[i] == letraPulsada) {
            rep++
            palabrasRep.push(array[i])

            let span = document.getElementById(`${i}`)
            span.innerHTML = array[i].toUpperCase()
        }
    }


    if (rep == array.length) {
        intentos = 10
        banderin = 1
        alert("Felicidades!! Has ganado")
        lose.innerHTML = `WINNER!!`
        return
    } else if (palabrasRep.length == 0) {
        intentos++
        if(intentos < 7) {
            img.src = `img/${intentos}.png`
        } else {
            img.src = `img/7.png`
            alert("Se acabaron los intentos, perdiste :(")
            banderin = 1

            lose.innerHTML = `Palabra: ${palabra.toUpperCase()}`

            return
        }
        
    }
}


function recorrerPalabra() {
    if (banderin == 1) return

    wordArray = []

    for(var i = 0; i < palabra.length; i++) {
        wordArray.push(palabra.charAt(i))
        
    }

    comprobarPalabra(wordArray)
    return wordArray
}


function refresh() {
    window.location.reload()
}