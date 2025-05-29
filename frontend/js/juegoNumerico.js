class JuegoNumerico extends Juego{
    #rondas;
    #operacionesPosibles;
    #tope;
    #numOperaciones;
    #contadorRondas;
    #resultado;
    #respuesta;
    #puntos;
    #user;
    constructor(rondas, operacionesPosibles, tope, numOperaciones, user){
        super('Juego Numerico', 'Juego de matematicas', 0);
        this.#rondas = rondas; 
        this.#operacionesPosibles = operacionesPosibles; 
        this.#tope = tope; 
        this.#numOperaciones = numOperaciones;
        this.#contadorRondas = 0; 
        this.#resultado = 0;
        this.#respuesta = false; 
        this.#puntos = 0; 
        this.temporizadorAnimacion = null;
        this.idTemporizadorRespuesta = null;
        this.temporizadorEvento = null;
        this.tempoGestionarRondaTrue = null; 
        this.#user = user; 
    }

    //¿Cambiar a Jugar? Pone todo el blanco para empezar de 0. 
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
        //Cada vez que se llama a jugar, se cuenta la ronda. 
        this.#contadorRondas++; 
    }

    //PARA SEGUIR JUGANDO LIMPIANDO ANTES Y REINICIADO TEMPORIZADOR. 
    #gestionarRonda(){
        //Reestablezco antes de empezar la bandera para saber si se responde o no y se cuenten las rondas correctamente.
        this.#respuesta = false; 
        this.#limpiarTemporizadores(); 
        this.#habilitarBotones();
        this.#jugar();         
        this.#reiniciarTemporizador(); 
    }

    //LÓGICA OPERACIONES:
    #sacarNumOperandosRandom() {
       return Math.floor(Math.random() * (this.#numOperaciones - 1)) + 2; 
    }

    #construirOperacion(numOperandos) {
        let operacion = []; //Limpio el array para que no se acumulen y pueda mostrar la operación correctamente. 
        let numArellenar = 0; 
        let indiceOperacion = 0;
        let numFinalizarBucle = (numOperandos - 1) * 2;
        while(operacion.length < numFinalizarBucle){ //Quiero que rellene el array con nun número menos. 
            numArellenar = this.#calcularNumeroArellenar();
            indiceOperacion = Math.floor(Math.random() * this.#operacionesPosibles.length);
            operacion.push(numArellenar); //Agrega el num random. 
            operacion.push(this.#operacionesPosibles[indiceOperacion]); //Agrega la operación. 
        }
        numArellenar = this.#calcularNumeroArellenar();
        operacion.push(numArellenar); //para rellenar el último número y no preguntar un if dentro del bucle. 
        this.#confirmarOperacion(operacion.join(' ')); //Confirmo. 
    }

    #confirmarOperacion(operacionString) {
        this.#resultado = math.evaluate(operacionString);//Utilizo la librería para pasar un string a num y calcular. 
        if (this.#resultado >= 1 && this.#resultado <= this.#tope) {
            this.#mostrarOperacionPantalla(operacionString); //Si el this.resultado es correcto. Muestro operación. 
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

    #mostrarMensajeUltimaRonda(mensajeAmostrar){ //mostrar última ronda. 
        const fondo = document.querySelector('.fondo');
        const mensaje = document.querySelector('.mensaje');
        mensaje.textContent = mensajeAmostrar;
        fondo.classList.add('fondo__transparente');
        mensaje.classList.add('mostrar__mensaje'); 
    }

    #eliminarMensajeUltimaRonda(callback){ //eliminar mensaje última ronda al pasar 4 segundos. 
        const fondo = document.querySelector('.fondo');
        const mensaje = document.querySelector('.mensaje');
        let temporizadorMensaje = setTimeout(()=>{
            fondo.classList.remove('fondo__transparente');
            mensaje.classList.remove('mostrar__mensaje');
           callback();
        }, 2000);
    } 

    /*PRIMER MÉTODO AL QUE SE LLAMA PARA EMPEZAR TODO. CLICK INICIO JUEGO */ 
    inicioJuegoBoton() {
        let botonIniciar = document.getElementById('buttonIniciar');
        botonIniciar.onclick = () => {
            this.#empezarJuego(); 
            this.#eventoBotonResultado();
            botonIniciar.disabled = true; //el usuario ya no puede hacer click en él, está desabilitado. //al darle click a iniciar juego porque si no, el juego empieza aunque no haya iniciado y le doy click al 1, ya cuenta. 
            this.#configurarBotonVolverAjugar();
        }
    } 
    //OTRO BOTÓN PARA VOLVER  A JUGAR: 
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

   //Quiero que vaya siempre cuando el usuario haya acertado si ha fallado o ha terminado, detenerlo. 
   #reiniciarTemporizador() { 
        let circulo = document.getElementById('circulo');
        // Remover para reiniciar.
        circulo.classList.remove('temporizador__activo');
        // Esperar antes de añadir la clase otra vez: 
        this.temporizadorAnimacion = setTimeout(() => {
            circulo.classList.add('temporizador__activo');
        }, 50);

        // PASADOS 5 SEGUNDOS COMPRUEBA SI HA HABIDO RESPUESTA:
        this.idTemporizadorRespuesta = setTimeout(() => {
            //Si  no se recibió respuesta: 
            if(!this.#respuesta){
                this.#comprobarRonda(); 
            }
        }, 5000); 
    }

    #comprobarRonda(){
        //Si es última: 
        if (this.#contadorRondas >= this.#rondas){
            this.#mostrarMensajeUltimaRonda(`Estos han sido tus puntos: ${this.#puntos}`);
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