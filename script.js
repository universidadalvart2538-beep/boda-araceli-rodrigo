const URL_SCRIPT = "https://script.google.com/macros/s/AKfycby4seA0B7l71pdkELroYuc3Ju9PJR187EqRLzTvQc1uZ5CPTyj2RZJAEY0B6iR9syBD/exec";

const fechaBoda = new Date("November 19, 2026 17:00:00").getTime();

function actualizarContador(){
  const ahora = new Date().getTime();
  const distancia = fechaBoda - ahora;

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  document.getElementById("contador").innerHTML = `
    <div><strong>${dias}</strong><span>Días</span></div>
    <div><strong>${horas}</strong><span>hr</span></div>
    <div><strong>${minutos}</strong><span>min</span></div>
    <div><strong>${segundos}</strong><span>seg</span></div>
  `;
}

actualizarContador();
setInterval(actualizarContador, 1000);

function abrirModal(id){
  document.getElementById(id).style.display = "flex";
}

function cerrarModal(id){
  document.getElementById(id).style.display = "none";
}

let musicaActiva = false;

function controlarMusica(){
  const musica = document.getElementById("musica");
  const boton = document.querySelector(".btn-musica");

  if(!musicaActiva){
    musica.play();
    boton.innerHTML = "⏸ Pausar";
    musicaActiva = true;
  }else{
    musica.pause();
    boton.innerHTML = "🎵 Música";
    musicaActiva = false;
  }
}

function enviarAsistencia(event){
  event.preventDefault();

  const datos = {
    tipo: "asistencia",
    nombre: document.getElementById("nombreAsistencia").value,
    asiste: document.getElementById("asiste").value,
    acompanantes: document.getElementById("acompanantes").value,
    comentarios: document.getElementById("comentarios").value
  };

  fetch(URL_SCRIPT, {
    method: "POST",
    mode: "no-cors",
    headers: {"Content-Type": "text/plain"},
    body: JSON.stringify(datos)
  });

  document.getElementById("mensajeAsistencia").innerText = "¡Gracias! Tu confirmación fue enviada.";
  event.target.reset();
}

function enviarCancion(event){
  event.preventDefault();

  const datos = {
    tipo: "cancion",
    nombre: document.getElementById("nombreCancion").value,
    cancion: document.getElementById("cancion").value,
    artista: document.getElementById("artista").value,
    link: document.getElementById("linkCancion").value
  };

  fetch(URL_SCRIPT, {
    method: "POST",
    mode: "no-cors",
    headers: {"Content-Type": "text/plain"},
    body: JSON.stringify(datos)
  });

  document.getElementById("mensajeCancion").innerText = "¡Gracias! Tu canción fue enviada.";
  event.target.reset();
}