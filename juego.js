//Definición constante para seleccionar elementos con clase llamada casilla
const casillas = document.querySelectorAll(".casilla");

//Definición de variables con let aplicables para selección de elementos
let tiempoRestante = document.getElementById("tiempo-restante");
let puntos = document.getElementById("puntos");
let golpe = document.querySelector(".golpe");

//Definición de variables constantes para seleccionar elementos de cajas
const cajaInicio = document.querySelector(".caja-inicio");
const cajaJuego = document.querySelector(".caja-juego");
const cajaResultados = document.querySelector(".caja-resultados");
const totalToposGolpeados = document.querySelector(".total-topos-golpeados");

//Definición de las variables resultado y contador con un valor específico para realizar el conteo
let resultado = 0;
let contador = 30;

//Función que me permite que al dar click en iniciar, se reproduzca el audio y se carguen los demás elementos
function iniciarJuego(){
  cajaInicio.classList.add("ocultar");
  cajaJuego.classList.remove("ocultar");
  const audio = document.getElementById('audio');
  audio.play();

  //Función para que Harry Potter aparezca aleatoriamente en las diferentes casillas
  function casillaAleatoria(casillas){
    let indice = Math.floor(Math.random() * casillas.length);
    let obtenerCasilla = casillas[indice];
    golpearAlTopo = obtenerCasilla.id;
    return obtenerCasilla;
  }
  
  //Función para transportar a Harry Potter
  function mostrarTopo() {
    let tiempoMostrar = Math.random() * (1000 - 400) + 420;
    let casillaMostrar = casillaAleatoria(casillas);
    casillaMostrar.classList.add("topo");

    //Función para remover a Harry después de cada golpe o tiempo recorrido
    setTimeout(() => {
      casillaMostrar.classList.remove("topo");
      mostrarTopo();
    }, tiempoMostrar);

    //Función que permite escuchar un sonido al golpear a Harry
    function sonidoGolpe(){
      let sonido1 = new Audio("sonidos/golpe1.mp3");
      let sonido2 = new Audio("sonidos/golpe2.mp3");
      let sonido3 = new Audio("sonidos/golpe3.mp3");

      //Definición de arreglo, para reproducción correcta de los audios mp3
      let arraySonidos = [sonido1, sonido2, sonido3];
      let sonidoAleatorio = arraySonidos[Math.floor(Math.random() * arraySonidos.length)]; 
      sonidoAleatorio.play();
    }

    //Visualización del evento al mover el mouse, de modo a que el elemento tenga un buen desplazamiento
    document.addEventListener("mousemove", function(e){
      golpe.style.left = (e.clientX - 100) + "px";
      golpe.style.top = (e.clientY - 100) + "px";
    })

    //Función para mostrar el golpe y su animación de acuerdo al tiempo marcado por el contador
    function mostrarGolpe() {
      golpe.classList.add("golpe-activo");
  
      setTimeout(() => {
        golpe.classList.remove("golpe-activo");
      }, 150);
    }

    //Esto permite remover a la clase topo durante cierto tiempo según la posición del mismo en las casillas.
    function quitarTopoGolpeado(){
      casillas.forEach(posicion => {
        posicion.classList.remove("topo");
      })
    }
      //Función que me permite iterar o repetir el sonido, el golpe y el remover a harry según el click dado.
      casillas.forEach(indice => indice.addEventListener("click", () => {
        if(indice.id === golpearAlTopo){
          resultado++;
          sonidoGolpe();
          mostrarGolpe();
          quitarTopoGolpeado();
          puntos.textContent = resultado;
          golpearAlTopo = null;
        }
      })
    )
  };

  //LLamar la función cuando la página, ventana o pestaña se alla cargdo por completo
  window.onload = mostrarTopo();
  //Ejecutar la función cronometro cada 1000 milisegundos (es decir, cada segundo).
  timerId = setInterval(cronometro, 1000);

  //Función del cronometro realizada
  function cronometro() {
    contador--;
    tiempoRestante.innerHTML = contador;
    if(contador === 0) {
      tablaResultados();
    };
  };
}

//Volver a comenzar el juego o realizar un nuevo intento si el usuario así lo decide
function reiniciarJuego(){
  resultado = 0;
  puntos.innerHTML = 0;
  contador = 30;
  tiempoRestante.innerHTML = contador;
}

//Esto aplicado para que todo se oculte y que se inicie de nuevo el juego
function intentarNuevamente() {
  cajaResultados.classList.add("ocultar");
  cajaJuego.classList.remove("ocultar");
  reiniciarJuego();
  casillas.classList.remove("topo");
  iniciarJuego();
}

//Función que hace que la página recargue y reinicie todo para volver a mi pestaña de inicio
function irInicio() {
  window.location.reload();
}
//Constante para el audio
const audio = document.getElementById('audio');

// Reproduce el audio
audio.play();

//Función para repetir infinitamente el audio del tema de la canción de Harry Potter
audio.addEventListener('ended', function() {
  audio.currentTime = 0; // Reinicia la reproducción al final del audio
  audio.play();
});

let puntuaciones = []; // Array para almacenar las puntuaciones

//Función para guardar todo en las filas de una tabla
function tablaResultados() {
    cajaJuego.classList.add("ocultar");
    cajaResultados.classList.remove("ocultar");
    totalToposGolpeados.innerHTML = "Tu puntuación: " + resultado;
    // Guarda la puntuación actual
    puntuaciones.push(resultado);

}

//Función para mostrar cada puntuación en un contenedor según lo dado en cada intento adquirido por la tabla
function mostrarPuntuaciones() {
  const puntuacionesDiv = document.getElementById('puntuacionesDiv');
  const tablaPuntuaciones = document.getElementById('puntuacionesTable');

  // Limpiar contenido anterior
  tablaPuntuaciones.innerHTML = '';

  // Clonar y ordenar las puntuaciones de mayor a menor
  const puntuacionesOrdenadas = [...puntuaciones].sort((a, b) => b - a);

  // Crear una fila para cada puntuación
  for (const puntuacion of puntuacionesOrdenadas) {
    const fila = document.createElement('tr');
    fila.innerHTML = `<td>${puntuacion}</td>`;
    tablaPuntuaciones.appendChild(fila);
  }
  puntuacionesDiv.style.display = 'block';
}

//Función que me permite abrir o cerrar la ventana de récord
function mostrarOcultarPuntuaciones() {
  const puntuacionesDiv = document.getElementById('puntuacionesDiv');
  if (puntuacionesDiv.style.display === 'none' || puntuacionesDiv.style.display === '') {
    mostrarPuntuaciones();
  } else {
    ocultarPuntuaciones();
  }
}

//Seleecionar el id para ocultar todo respecto a las puntuaciones
function ocultarPuntuaciones() {
  const puntuacionesDiv = document.getElementById('puntuacionesDiv');
  puntuacionesDiv.style.display = 'none';
}