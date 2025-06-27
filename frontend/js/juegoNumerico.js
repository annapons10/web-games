import { API } from './config.js';
import { Juego } from './juego.js';
export class JuegoNumerico extends Juego{
    #rondas;
    #operacionesPosibles;
    #tope;
    #numOperaciones;
    #contadorRondas;
    #resultado;
    #respuesta;
    #puntos;
    #puntosGanador; 
    #user;
    #score; 
    constructor(rondas, operacionesPosibles, tope, numOperaciones, user, score){
        super('numerico', 'Juego de matematicas', 0);
        this.#rondas = rondas; 
        this.#operacionesPosibles = operacionesPosibles; 
        this.#tope = tope; 
        this.#numOperaciones = numOperaciones;
        this.#contadorRondas = 0; 
        this.#resultado = 0;
        this.#respuesta = false; 
        this.#puntos = 0; 
        this.#puntosGanador = 5;
        this.temporizadorAnimacion = null;
        this.idTemporizadorRespuesta = null;
        this.temporizadorEvento = null;
        this.tempoGestionarRondaTrue = null; 
        this.#user = user; 
        this.#score = score; 
    }

    #empezarJuego(){
        let operacionPantalla = document.getElementById('operacionPantalla'); 
        operacionPantalla.innerHTML = ''; 
        //Limpio resultado:
        let divResultado = document.querySelector('.resultado');
        divResultado.textContent = ''; 
        this.#mostrarResultado(divResultado, 'blanco');
        //Empiezo con el juego: 
        this.#jugar(); 
        this.#reiniciarTemporizador();
    } 
  
    #jugar(){
        this.#construirOperacion(this.#sacarNumOperandosRandom()); 
        this.#contadorRondas++; 
    }

    //Seguir jugando, se limpian los temporizadores, se habilitan los botones y se llama a jugar para que empiece la siguiente ronda. 
    #gestionarRonda(){
        //Reestablecer antes de empezar la bandera para saber si se responde o no y se cuenten las rondas correctamente.
        this.#respuesta = false; 
        this.#limpiarTemporizadores(); 
        this.#habilitarBotones();
        this.#jugar();         
        this.#reiniciarTemporizador(); 
    }

    //Lógica operaciones: 
    #sacarNumOperandosRandom() {
       return Math.floor(Math.random() * (this.#numOperaciones - 1)) + 2; 
    }

    #construirOperacion(numOperandos) {
        let operacion = []; 
        let numArellenar = 0; 
        let indiceOperacion = 0;
        let numFinalizarBucle = (numOperandos - 1) * 2;
        while(operacion.length < numFinalizarBucle){ 
            numArellenar = this.#calcularNumeroArellenar();
            indiceOperacion = Math.floor(Math.random() * this.#operacionesPosibles.length);
            operacion.push(numArellenar); 
            operacion.push(this.#operacionesPosibles[indiceOperacion]); 
        }
        numArellenar = this.#calcularNumeroArellenar();
        //Rellenar el último número y no preguntar un if dentro del bucle. 
        operacion.push(numArellenar); 
        this.#confirmarOperacion(operacion.join(' ')); 
    }

    #confirmarOperacion(operacionString) {
        this.#resultado = math.evaluate(operacionString);
        if (this.#resultado >= 1 && this.#resultado <= this.#tope) {
            this.#mostrarOperacionPantalla(operacionString); 
            return;
        } 
        //Para que se construya otra vez y obtenga el resultado. 
        this.#construirOperacion(this.#sacarNumOperandosRandom());
    }

    #calcularNumeroArellenar(){
        return Math.floor(Math.random() * this.#tope) + 1;
    }

    //DOM MOSTRAR OPERACIÓN: 
    #mostrarOperacionPantalla(operacionString){
        let operacionPantalla = document.getElementById('operacionPantalla');
        //String para mostrar en pantalla.  
        operacionPantalla.innerHTML = operacionString; 
    }

    //Escribe el resultado en pantalla. 
    #crearResultado(){
        let divResultado = document.querySelector('.resultado');
        divResultado.textContent = this.#resultado;
        return divResultado; //Devuelvo el div para luego añadir más estilos dependiendo si es correcto resultado o no. 
    } 

    #mostrarResultado(divResultado, color){
        switch(color){
            case'rojo':
                divResultado.style.background = 'red';
                break;
            case 'verde':
                divResultado.style.background = 'green';
                break;
            case 'blanco':
                divResultado.style.background = 'white';
                break;
            default:   
        }
    }

    #mostrarMensajeUltimaRonda(mensajeAmostrar){ 
        const fondo = document.querySelector('.fondo');
        const mensaje = document.querySelector('.mensaje');
        mensaje.textContent = mensajeAmostrar;
        fondo.classList.add('fondo__transparente');
        mensaje.classList.add('mostrar__mensaje'); 
    }

    #eliminarMensajeUltimaRonda(callback){ 
        const fondo = document.querySelector('.fondo');
        const mensaje = document.querySelector('.mensaje');
        let temporizadorMensaje = setTimeout(()=>{
            fondo.classList.remove('fondo__transparente');
            mensaje.classList.remove('mostrar__mensaje');
           callback();
        }, 3000);
    } 

    /*Aquí empieza. Click inicio juego */ 
    inicioJuegoBoton() {
        let botonIniciar = document.getElementById('buttonIniciar');
        botonIniciar.onclick = () => {
            this.#empezarJuego(); 
            this.#eventoBotonResultado();
            //User no puede dar click, se deshabilita. 
            botonIniciar.disabled = true; 
            this.#configurarBotonVolverAjugar();
        }
    } 
    
    #configurarBotonVolverAjugar(){
        const botonVolver = document.getElementById('volverJugar');
        botonVolver.onclick = () => {
            //Primero reincicio todos los valores a 0. 
            this.#reiniciarJuego();
            //Habilitar botones porque se dejan deshabilitados antes de dar click a "volver a jugar", porque no le da tiempo a cambiar al no llamar a gestionar ronda:
            this.#habilitarBotones();
            //Luego empieza el juego: 
            this.#empezarJuego(); 
        }
    }

    //MÉTODO PARA NO REPETIR CÓDIGO DENTRO DEL EVENTO CLICK PARA QUE SI ES LA PENÚLTIMA HAGA ESTO PASADOS 2S:
    #manejarRespuesta(boton, divResultado) {
        const valorSeleccionado = parseFloat(boton.getAttribute('data-valor')); 
    
        // Si el resultado es correcto
        if (valorSeleccionado === this.#resultado) { 
            this.#puntos++; 
            this.#mostrarResultado(divResultado, 'verde'); 
        } else {
            this.#mostrarResultado(divResultado, 'rojo');
        }
        // Temporizador para mostrar el resultado en blanco después de 2 segundos.
        this.temporizadorEvento = setTimeout(() => {
            this.#mostrarResultado(divResultado, 'blanco'); 
            divResultado.textContent = '';
            this.#comprobarRonda();
        }, 2000); 
    }

    //EVENTO CLICK PARA EL RESULTADO DE 1,2 O 3:
    #eventoBotonResultado() {
        let botones = document.querySelectorAll('.button__resultado');
        botones.forEach((boton) => {
            boton.addEventListener('click', () => {
                this.#deshabilitarBotones(botones);
                //Para saber que ha respondido: 
                this.#respuesta = true; 
                // Primero muestro el resultado en pantalla: 
                let divResultado = this.#crearResultado();
                this.#manejarRespuesta(boton, divResultado); 
            }); 
        }); 
    }
 
    #deshabilitarBotones(botones){
        botones.forEach((boton)=>{
            boton.disabled = true;
        }); 
    }

    #habilitarBotones(){
        let botones = document.querySelectorAll('.button__resultado'); 
        botones.forEach((boton)=>{
            boton.disabled = false;
        }); 
    } 

   //Que vaya siempre cuando el usuario haya acertado si ha fallado o ha terminado, detenerlo. 
   #reiniciarTemporizador() { 
        let circulo = document.getElementById('circulo');
        // Remover para reiniciar.
        circulo.classList.remove('temporizador__activo');
        // Esperar antes de añadir la clase otra vez: 
        this.temporizadorAnimacion = setTimeout(() => {
            circulo.classList.add('temporizador__activo');
        }, 50);

        // Pasados 5s comprobar si hay respuesta: 
        this.idTemporizadorRespuesta = setTimeout(() => {
            if(!this.#respuesta){
                this.#comprobarRonda(); 
            }
        }, 5000); 
    }

    #comprobarRonda(){
        //Si es última: 
        if (this.#contadorRondas >= this.#rondas){
            //Compruebo si ha ganado o no: 
            if(this.#puntos >= 5){
                if(this.#user.conectado === false){
                    this.#mostrarMensajeUltimaRonda('¡Felicidades! Has ganado el juego. Regístrate si quieres guardar la puntuación');
                }
                if(this.#user.conectado){
                    this.#mostrarMensajeUltimaRonda(`¡Has ganado! Sumas 10 puntos`);
                    //Llamar fetch para sumarle los puntos en backend. 
                    this.#sumarPuntuacionUser(); 
                }
                
            }else{
                this.#mostrarMensajeUltimaRonda(`¡Has perdido! No sumas nigún punto`);  
            } 
            
            this.#eliminarMensajeUltimaRonda(() => this.#reiniciarJuego()); 
            return; 
        } 

        //Si es penúltima:
        if (this.#contadorRondas === this.#rondas - 1) {
            this.#mostrarMensajeUltimaRonda('Última ronda');
            this.#eliminarMensajeUltimaRonda(() => this.#gestionarRonda()); 
            return; 
        }
        this.#gestionarRonda(); 
    }

    async #sumarPuntuacionUser(){
        if(this.#user.conectado === false){ 
            return; 
        }

        if(this.#user.conectado === true && this.#score){ 
            try{
                const respuesta = await fetch(`http://127.0.0.1:8000/api/v1/scores/${this.#score.id}`, {
                    method: 'PATCH', //Para actualizar solo la puntuación. 
                    headers : {
                        'Content-Type': 'application/json', 
                        'Accept': 'application/json', 
                    }

                }); 

                if(!respuesta.ok){
                    const errorData = await respuesta.json(); 
                    this.#mostrarMensajeUltimaRonda("Algo no ha ido bien, no se ha podido sumar la puntuación");  
                }

                if(respuesta.ok){
                    const data = await respuesta.json(); 
                    setTimeout(() => {
                        this.#mostrarMensajeUltimaRonda(`Puntuación actualizada: ${data.score}`); 
                    }, 3000); 
                }

                setTimeout(() => {
                    this.#eliminarMensajeUltimaRonda(() => this.#reiniciarJuego()); 
                }, 4000); 
                

                return; 

            //No entra al catch solo porque la respuesta http tenga 404, si por problemas de conexión: 
            }catch(e){ 
                this.#reiniciarJuego(); 
                return; 
            }
 
        }

    }

    #limpiarTemporizadores() {
        if (this.temporizadorAnimacion) clearTimeout(this.temporizadorAnimacion);
        if (this.idTemporizadorRespuesta) clearTimeout(this.idTemporizadorRespuesta);
        if (this.temporizadorEvento) clearTimeout(this.temporizadorEvento); 
        if (this.tempoGestionarRondaTrue) clearTimeout(this.tempoGestionarRondaTrue); 
    }

    //REINICIAR JUEGO Y REESTABLECER VALORES:
    #reiniciarJuego(){
        this.#limpiarTemporizadores();
        this.temporizadorAnimacion = null;
        this.idTemporizadorRespuesta = null;
        this.temporizadorEvento = null;
        this.#contadorRondas = 0;
        this.#resultado = 0;
        this.#puntos = 0; 
        this.#respuesta = false; 
    }
  
} 