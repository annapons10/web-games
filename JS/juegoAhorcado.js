class JuegoAhorcado extends Juego {
    constructor() {
        super('Juego Ahorcado', 'Juego de palabras', 0);
        this.palabras = ['HOLA', 'ADIOS', 'ALTURA', 'AGUA', 'GATO', 'ORDENADOR']; 
        this.palabraAleatoria = '';
        this.palabraOculta = [];
        this.numeroErrores = 0;
        this.letrasEscritas = [];
        this.imagenesAhorcado = ['../imgAhorcado/primera.jpg', '../imgAhorcado/segunda.jpg', '../imgAhorcado/tercera.jpg', '../imgAhorcado/cuarta.jpg',
            '../imgAhorcado/quinta.jpg', '../imgAhorcado/sexta.jpg', '../imgAhorcado/septima.jpg', '../imgAhorcado/octava.jpg'
        ];
    }

    //LÓGICA JUEGO: 

    escogerPalabraAleatoria() {
        let indiceA = Math.floor(Math.random() * this.palabras.length);
        this.palabraAleatoria = this.palabras[indiceA];

        // Inicializa palabraOculta con guiones bajos
        this.palabraOculta = Array(this.palabraAleatoria.length).fill('_'); //Array: especifico el tamaño que va a tener. es un array llena de _ _ _ _
        console.log(this.palabraOculta);
        console.log(this.palabraAleatoria);

        let numLetras = this.palabraAleatoria.length; //Para mostras los ' _ ' que necesite en pantalla según la palabra.
        this.mostrarGuionesPantalla(numLetras); //Llamo al método que lo hace. 

        this.eventoTeclado(); //Aqui se llama al evento. 
        this.eventoReiniciarJuegoBoton();
    }

    recorrerBotones = (event) => { //PARA TENER LA REFERENCIA Y LLAMARLA CUANDO AÑADO EL EVENTO Y LO ELIMINO. 
        const letra = event.target.textContent; //Coge el contenido del botón que ha disparado el evento directamente. 
        console.log("Letra del botón:", letra);
        this.jugarAhorcado(letra); 
    }

    eventoTeclado() {
        //Evento click del ratón:
        const botonesTeclado = document.querySelectorAll('.button__letra');
        botonesTeclado.forEach(botonTeclado => {
            // Agregar el event listener con la función nombrada 
            botonTeclado.addEventListener('click', this.recorrerBotones);
        });
    } 

    jugarAhorcado(letra) {

        if (this.numeroErrores < 7) { //Confirmo que hay jugadas. 
            this.letrasEscritas.push(letra); //Introduzco la letra para llevar el seguimiento.

            let letraEncontrada = false; //No ha encontrado la letra, para marcarme el camino. 
            for (let i = 0; i < this.palabraAleatoria.length; i++) { //Recorro para verificar si esta la letra o no. 
                if (letra === this.palabraAleatoria[i].toLocaleUpperCase()) {
                    this.palabraOculta[i] = this.palabraAleatoria[i]; //Añado la letra a la palabraOculta. 
                    letraEncontrada = true;
                    this.mostrarLetraPantalla(letra); //Llamo al método de mostrar la letra en pantalla porque la ha acertado.   
                }
            }


            if (!letraEncontrada) {
                this.numeroErrores++;
                this.mostrarRestoImgAhorcado(); 
                console.log(`Estos son los errores: ${this.numeroErrores}`); 
            }

            if (!this.palabraOculta.includes('_')) { //Si ya no tiene '_' significa que ha completado la palabra.//NO COMPARA BIEN LOS OBJETOS. //si hay espacios en blanco lo vale.
                this.mostrarLetraPantalla();
                this.finalizarJuego(); 
            }

        } else {
            //Mostrar que ha perdido. 
            console.log("No te quedan intentos, has perdido.");
            this.finalizarJuego(); 
        }


    }


    //MOVIMIENTO DOM DINÁMICO:
    //CREO UN MÉTODO PARA QUE CADA VEZ QUE LA PERSONA FALLE EN UNA LETRA, SE LLAME A ÉSTE Y SE VAYA IMPRIMIENDO EL "AHORCADO"

    crearTecladoPantalla() { //crear teclado en pantalla. Lo llamo en el fetch al llamar a index.html. Para que se vea todo junto.  
        let ahorcadoContainer = document.getElementById('ahorcado__container');
        let tecladoContainer = document.createElement('div'); //creo el contenedor para el teclado.
        tecladoContainer.classList.add('teclado__container')//le añado la clase. 
        let fragment = document.createDocumentFragment();//Creo un fragmento.
        for (let x = 0; x < 26; x++) {
            let div = document.createElement('div');//creo un div
            div.classList.add('letra__container');//añado las clases. 
            let button = document.createElement('button');
            button.classList.add('button__letra');

            // Calcula la letra del abecedario usando el código ASCII
            button.textContent = String.fromCharCode(65 + x); // 'A' es 65 en ASCII
            console.log(button);

            div.appendChild(button);
            fragment.appendChild(div);
        }

        tecladoContainer.appendChild(fragment);
        ahorcadoContainer.appendChild(tecladoContainer); //finalmente pego todo el fragmento de una vez. 
    }

    crearPimeraImgAhorcado() {
        let img = document.getElementById('img__ahorcado'); //cojo el html de img. 
        let imgActual = this.imagenesAhorcado[this.numeroErrores];//Cojo la img que toque junto con el contador de jugas. 

        img.src = imgActual; //Le añado la ruta. 
        img.alt = 'Ahorcado';

    }

    mostrarRestoImgAhorcado() {
        console.log("ENTRO A CAMBIAR LA IMG");
        let img = document.getElementById('img__ahorcado'); //cojo el html de img. 
        img.src = this.imagenesAhorcado[this.numeroErrores];

    }

    mostrarGuionesPantalla(numLetras) { //QUIERO CREAR UNA CADENA DE STRING DENTRO DE UN DIV. 
        //let guiones = Array(numLetras).fill('_'); //Creo el array de guiones para marcarme el camino.  
        let containerLetra = document.getElementById('div__letra'); //Cojo el contenedor principal. 

        containerLetra.innerHTML = ''; //Limpio el contenedor por si se juega varias veces. 

        containerLetra.classList.add('guiones__en__pantalla');
        this.palabraOculta.forEach(() => { //Recorro el array de palabra oculta para crear por guion un span. 
            let spanGuion = document.createElement('span');
            spanGuion.innerHTML = '_';  // Añadir el guion al span
            spanGuion.classList.add('guion');  // Añadir una clase para aplicar estilo

            // Agregar el span al divPalabra
            containerLetra.appendChild(spanGuion);
        });
    }

    mostrarLetraPantalla(letra) { //Coger los guiones de html en los span y recorrerlos para añadir la letra en el lugar correspodiente. 
        let containerLetra = document.getElementById('div__letra'); //Cojo el contenedor principal. 
        let spans = containerLetra.querySelectorAll('span'); // Cojo los elem de dentro del div para recorrerlos. 
        for (let i = 0; i < this.palabraAleatoria.length; i++) {
            //for(let i = 0; i < this.palabraAleatoria.length; i++){ //Recorro para verificar si esta la letra o no. 
            if (letra === this.palabraAleatoria[i].toLocaleUpperCase()) {
                spans[i].innerHTML = letra;
            }
        }
    }

    finalizarJuego(){ //Para el evento para parar el juego hasta que de click al botón y reinicie el juego. 
        setTimeout(() => {
            this.removerEventoDelTeclado(); // Llamar al método reiniciar juego después del retraso 
        }, 2000); 
    }

    removerEventoDelTeclado(){ //Eliminar el evento para cuando reinice, empiece de cero y no se repitan eventos y sumen más de 1. 
         //Evento click del ratón:
         const botonesTeclado = document.querySelectorAll('.button__letra'); //Cojo todos los botones. 
         botonesTeclado.forEach(botonTeclado => { //Primero recorro todos los botones. Y me lo guardo. 
             //const botonTecladoPantalla = botonTeclado;
             // Agrego un event listener (a todos los botones) para cuando se haga clic en el botón.
             botonTeclado.removeEventListener('click', this.recorrerBotones);
        }); //Es una opción de los listeners. Hace que el evento ocurra una vez y luego se elimine automáticamente. 
    };
    
    eventoReiniciarJuegoBoton(){ //La persona puede clickar también a media partida por si quiere empezar una nueva. 
        const botonVolverAjugar = document.getElementById('botonVolverAjugar');
        if (!botonVolverAjugar) {
            console.error("El botón para reiniciar el juego no existe.");
            return;
        }
        //HACERELO CON ONCLICK. 
        botonVolverAjugar.onclick = () => {
            console.log("Aquí he dado click");
            // Deshabilitar el botón después de hacer click para no acumular llamadas. 
            botonVolverAjugar.disabled = true; 
            // Rehabilitar el botón después de cierto tiempo o condición
            // Puedes usar setTimeout, o alguna lógica que determine cuándo habilitarlo de nuevo
            setTimeout(() => {
                botonVolverAjugar.disabled = false; // Rehabilitar el botón
            }, 2000); // 2 segundos, ajusta según necesites
            this.reiniciarJuegoDesdeCero();
        };
    } 
    

    reiniciarJuegoDesdeCero() { //Todo vuelve a  para que se empiece a jugar de nuevo. 
        this.palabraAleatoria = '';
        this.palabraOculta = [];
        this.numeroErrores = 0;
        this.letrasEscritas = [];
        this.crearPimeraImgAhorcado(); //Llamo para que vuelva a coger la primera img antes de empezar. 
        this.escogerPalabraAleatoria(); //Por si se quiere jugar otra vez. 
    }

} 

