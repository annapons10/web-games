//import { API } from './config.js';
class JuegoAhorcado extends Juego { 
    #palabraAleatoria;
    #palabraOculta;
    #maximaJugadas;
    #palabras;
    #numerosErrores;
    #letrasEscritas;
    #imagenesAhorcado;
    #user; 
    #score; 
    constructor(maximaJugadas, user, score) {
        super('ahorcado', 'Juego de palabras', 0);
        this.#maximaJugadas = maximaJugadas;
        this.#palabras = ['AGUA', 'GATO', 'ORDENADOR', 'PROGRAMADORA', 'NATURALEZA', 'BOSQUE', 'ACAMPADA']; 
        this.#palabraAleatoria;
        this.#palabraOculta;
        this.#numerosErrores;
        this.#letrasEscritas;
        this.#imagenesAhorcado = [
            './imgAhorcado/primera.jpg',
            './imgAhorcado/segunda.jpg',
            './imgAhorcado/tercera.jpg',
            './imgAhorcado/cuarta.jpg',
            './imgAhorcado/quinta.jpg',
            './imgAhorcado/sexta.jpg',
            './imgAhorcado/septima.jpg',
            './imgAhorcado/octava.jpg'
        ];
        this.#user = user; 
        this.#score = score; 
    } 

    //Setters:
    setMaximaJugadas(jugadas){
        this.#maximaJugadas = jugadas;
    } 

    //Lógica juego: 

    iniciarJuego(){
        this.#palabraAleatoria = '';
        this.#palabraOculta = [];
        this.#numerosErrores = 0;
        this.#letrasEscritas = [];
        this.#escogerPalabraAleatoria();
        this.#mostrarImgAhorcado();
    }

    #escogerPalabraAleatoria() {
        let indiceA = Math.floor(Math.random() * this.#palabras.length);
        this.#palabraAleatoria = this.#palabras[indiceA];

        // Inicializa palabraOculta con guiones bajos
        this.#palabraOculta = Array(this.#palabraAleatoria.length).fill('_'); 
        //Muestra los ' _ ' que necesite en pantalla según la palabra.
        let numLetras = this.#palabraAleatoria.length; 
        this.#mostrarGuionesEnPantalla(numLetras); 

        this.#eventoTeclado(); 
        this.#eventoReiniciarJuegoBoton();
    }

    //Coger el evento del teclado y recorrer los botones:
    #recorrerBotones = (event) => { 
        const letra = event.target.textContent; 
        this.#jugarAhorcado(letra); 
    }

    #eventoTeclado() {
        //Evento click del ratón:
        const botonesTeclado = document.querySelectorAll('.button__letra');
        botonesTeclado.forEach(botonTeclado => {
            // Agregar el event listener con la función nombrada 
            botonTeclado.addEventListener('click', this.#recorrerBotones);
        });
    } 

    #jugarAhorcado(letra) {
        //Confirmar que hay jugadas. 
        if (this.#numerosErrores < this.#maximaJugadas){
            this.#letrasEscritas.push(letra); 
            //No ha encontrado la letra, marcar el camino. 
            let letraEncontrada = false; 
            for (let i = 0; i < this.#palabraAleatoria.length; i++) { 
                if (letra === this.#palabraAleatoria[i].toLocaleUpperCase()) {
                    //Añadir la letra a la palabraOculta. 
                    this.#palabraOculta[i] = this.#palabraAleatoria[i]; 
                    letraEncontrada = true;
                    //La ha acertado, se muestra: 
                    this.#mostrarLetraEnPantalla(letra); 
                }
            }


            if (!letraEncontrada) {
                this.#numerosErrores++;
                this.#mostrarImgAhorcado(); 
            }
            //Ha completado la palabra: 
            if (!this.#palabraOculta.includes('_')) { 
                this.#mostrarLetraEnPantalla();
                this.#finalizarJuego(); 
                if(this.#user.conectado === false){
                    this.#mostrarMensajePartidaFinalizada('¡Felicidades! Has ganado el juego. Regístrate si quieres guardar la puntuación');  
                    return; 
                }
                this.#mostrarMensajePartidaFinalizada('¡Felicidades! Has ganado el juego. Sumas 10 puntos.')
                //Actualizar los puntos del usuario: 
                this.#sumarPuntuacionUser(); 
            }

        } else { 
            this.#finalizarJuego(); 
            this.#mostrarMensajePartidaFinalizada(`¡Has perdido! La palabra era: ${this.#palabraAleatoria}`);  
            this.#mostrarTodaPalabraPantalla(); 
        }


    }

    #mostrarTodaPalabraPantalla(){
        let containerLetra = document.getElementById('div__letra'); 
        let spans = containerLetra.querySelectorAll('span'); 
        for (let i = 0; i < this.#palabraAleatoria.length; i++) {
            if(spans[i].innerHTML === ''){
                continue;
            }
            spans[i].innerHTML = this.#palabraAleatoria[i]; 
        }
    } 

    //Movimiento dom dinámico: 

    crearTecladoPantalla() { 
        let ahorcadoContainer = document.getElementById('ahorcado__container');
        let tecladoContainer = document.createElement('div'); 
        tecladoContainer.classList.add('teclado__container')
        let fragment = document.createDocumentFragment();
        for (let x = 0; x < 26; x++) {
            let div = document.createElement('div');
            div.classList.add('letra__container'); 
            let button = document.createElement('button');
            button.classList.add('button__letra');

            // Calcula la letra del abecedario usando el código ASCII
            button.textContent = String.fromCharCode(65 + x); // 'A' es 65 en ASCII 

            div.appendChild(button);
            fragment.appendChild(div);
        }

        tecladoContainer.appendChild(fragment);
        ahorcadoContainer.appendChild(tecladoContainer); 
    }

    #mostrarImgAhorcado() { 
        //Coger html de la imagen y cambiarla según el número de errores: 
        let img = document.getElementById('img__ahorcado'); 
        img.src = this.#imagenesAhorcado[this.#numerosErrores]; 
        img.alt = 'Ahorcado';
    }

    #mostrarGuionesEnPantalla(numLetras) { 
        let containerLetra = document.getElementById('div__letra'); 

        containerLetra.innerHTML = ''; 

        containerLetra.classList.add('guiones__en__pantalla');
        //Recorrer el array de palabra oculta para crear por guion un span. 
        this.#palabraOculta.forEach(() => { 
            let spanGuion = document.createElement('span');
            spanGuion.innerHTML = '_';  
            spanGuion.classList.add('guion'); 

            // Agregar el span al divPalabra
            containerLetra.appendChild(spanGuion);
        });
    }

    //Coger los guiones de html en los span y recorrerlos para añadir la letra en el lugar correspodiente. 
    #mostrarLetraEnPantalla(letra) { 
        let containerLetra = document.getElementById('div__letra'); 
        let spans = containerLetra.querySelectorAll('span'); 
        for (let i = 0; i < this.#palabraAleatoria.length; i++) { 
            if (letra === this.#palabraAleatoria[i].toLocaleUpperCase()) {
                spans[i].innerHTML = letra;
            }
        }
    }

    //Parar el juego hasta que de click al botón y reinicie el juego. 
    #finalizarJuego(){ 
        setTimeout(() => {
            this.#removerEventoDelTeclado(); 
        }, 2000); 
    }

    //Eliminar el evento para cuando reinice, empiece de cero y no se repitan eventos y sumen más de 1. 
    #removerEventoDelTeclado(){ 
        //Evento click del ratón:
        const botonesTeclado = document.querySelectorAll('.button__letra'); //Cojo todos los botones. 
        botonesTeclado.forEach(botonTeclado => { 
            botonTeclado.removeEventListener('click', this.#recorrerBotones);
        }); 
    };

    //Mensaje de partida finalizada:  
    #mostrarMensajePartidaFinalizada(resultado){
        const fondo = document.querySelector('.fondo');
        const mensaje = document.querySelector('.mensaje');
        mensaje.textContent = resultado; 
        fondo.classList.add('fondo__transparente');
        mensaje.classList.add('mostrar__mensaje'); 
        this.#eliminarMensajePartidaFinalizada(); 
    }

    #eliminarMensajePartidaFinalizada() {
        setTimeout(() => {
            const fondo = document.querySelector('.fondo');
            const mensaje = document.querySelector('.mensaje');
            fondo.classList.remove('fondo__transparente');
            mensaje.classList.remove('mostrar__mensaje'); 
        }, 3000); 
    } 
    
     async #sumarPuntuacionUser(){
        if(this.#user.conectado === false){ 
            return; 
        }

        if(this.#user.conectado === true && this.#score){ 
            try{
                const respuesta = await fetch(`http://127.0.0.1:8000/api/v1/scores/${this.#score.id}`, {
                    method: 'PATCH', 
                    headers : {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json', 
                    }

                }); 

                if(!respuesta.ok){
                    const errorData = await respuesta.json(); 
                    //Mostrar mensaje div: 
                    this.#mostrarMensajePartidaFinalizada("Algo no ha ido bien, no se ha podido sumar la puntuación"); 
                    return; 
                }

                const data = await respuesta.json(); 
                setTimeout(() => {
                    this.#mostrarMensajePartidaFinalizada(`Puntuación actualizada: ${data.score}`);
                }, 3000); 

                return; 

            //No entra al catch solo porque la respuesta http tenga 404, si por problemas de conexión: 
            }catch(e){
                //Mensaje a mostrar: 
                this.#mostrarMensajePartidaFinalizada("Error de red o servidor. No se ha sumado la puntuación"); 
                return; 
            }
 
        }

    }
    
     //Se puede dar click también a media partida por si quiere empezar una nueva: 
    #eventoReiniciarJuegoBoton(){ 
        const botonVolverAjugar = document.getElementById('botonVolverAjugar');
        if (!botonVolverAjugar) { 
            return;
        }
        botonVolverAjugar.onclick = () => { 
            botonVolverAjugar.disabled = true; 
            // Rehabilitar el botón después de cierto tiempo o condición
            setTimeout(() => {
                botonVolverAjugar.disabled = false; 
            }, 2000); 
            this.iniciarJuego();
        };
    } 
    

} 

