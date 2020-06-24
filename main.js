//preguntas.sort()
preguntas = preguntas.sort(
	function(){
		return Math.random() - 0.5
	}
)
let countdown = setInterval(hurry, 1000);	
const fulltime = 5;
let temporizador = fulltime;
let score = 0;
let correctoActual;
const botones = document.querySelectorAll('.opciones');
let ss = document.querySelector('.score span');
let qs = document.querySelector('#qs');
let uno = document.querySelector('#uno');
let dos = document.querySelector('#dos');
let tres = document.querySelector('#tres');
let preguntaVigente = 0;
const totalPreguntas = preguntas.length;
let vidas = document.querySelectorAll('.vidas span');
const mensaje = document.querySelector('.mensaje');

function llenar(indice){
	//document.querySelector('.temporizador').innerHTML=temporizador;
	qs.innerHTML = preguntas[indice][0];
	uno.innerHTML = preguntas[indice][1];
	dos.innerHTML = preguntas[indice][2];
	tres.innerHTML = preguntas[indice][3];
	ss.innerHTML = score;
	
	// guardo la respuesta en una variable previamente declarada!
	correctoActual = preguntas[indice][4];
	temporizador = fulltime;
	
}

function acierto(){	
	// borrar acertada
	// sumar 1 score
	//llenar random
	document.querySelector('#s-acierto').cloneNode().play();
	score = score+1;	
	preguntaVigente = preguntaVigente+1;

	if (score < totalPreguntas) {
		llenar(preguntaVigente);			
	} else {
		ganaste();
	}	
	//score = score;
}

let vr = 0;
function error(){	
	navigator.vibrate([200,200]);
	document.querySelector('#s-error').cloneNode().play();

	// quitamos vidas
	vidas[vr].innerHTML = 'X';	
	vr = vr+1;
	if(vr >2){
		// si nos quedamos son vidas
		perdiste();
	}
}

function jugar(evento){
	let eleccion = evento.target.value;		

	if (eleccion == correctoActual) {		
		acierto();
	} else {
		error();
	}
	
}

function hurry(){
	anchoTiempo = 100/fulltime*temporizador;
	temporizador = temporizador-1;
	

	let barratiempo = document.querySelector('.barratiempo')
	barratiempo.style.width = anchoTiempo+'%';
	//aca arreglo error wiht negativo CSS
	if(anchoTiempo < 0){
		barratiempo.style.width = 0+'%';
	}
		
	if(temporizador<0){		
		error();			
		temporizador = fulltime;
	} 
	//document.querySelector('.temporizador').innerHTML = temporizador;
}

function ganaste(){
	
	document.querySelector('.mensaje h3').innerHTML = "GANASTE!!! ☺";
	document.querySelector('.mensaje img').setAttribute('src','img/nerd.gif')
	document.querySelector('.puntajeFinal span').innerHTML = score;
	mensaje.classList.add('abrir');
	clearInterval(countdown);
}

function perdiste(){		
	document.querySelector('.puntajeFinal span').innerHTML = score;
	mensaje.classList.add('abrir');
	clearInterval(countdown);
}

// LLAMADOS!
function aJugar(){	
	document.querySelector('.home').style.display = "none";
	document.querySelector('.juego').style.display = "block";
	llenar(preguntaVigente);

	//Elegir opcion
	for(let boton of botones){
		boton.addEventListener('click', jugar);
	}

	// Contador de tiempo		
	 
}


// ADICIONALES
document.querySelector('#mute').addEventListener('click',function(){
	var audios = document.querySelectorAll('audio');		
	for(var audio of audios){
		audio.muted;
	}

})