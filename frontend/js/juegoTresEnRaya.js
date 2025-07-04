import { API } from './config.js';
import { Juego } from './juego.js';
export class JuegoTresEnRaya extends Juego{
    // Declaración de los atributos privados
    #matrizJuego;
    #fichaMaquina;
    #fichaPersona;
    #imagenesFichas;
    #turno;
    #numJugada;
    #primerTurno;
    #turnoActual;
    #user; 
    #score;

    constructor(user, score) {
        super('tresEnRaya', 'Juego de estrategia', 0);
        this.#matrizJuego = [
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
            [undefined, undefined, undefined]
        ];
        this.#fichaMaquina = 'x';
        this.#fichaPersona = 'o';
        this.#imagenesFichas = [ 
            './img/o.png', 
            './img/x.png'];
       
        this.#primerTurno = this.#fichaPersona; 
        this.#turnoActual = this.#primerTurno;
        this.#numJugada = 0;
        this.#user = user; 
        this.#score = score; 
    }
    
    //Punto de entrada del juego:
    entradaJuego(){ 
        //Se limpia todo al iniciar el juego:
        this.#limpiarJuego(); 
        this.#primerTurno = this.#fichaPersona; 
        this.#habilitarClickJugador();
        this.#eventoClickBotones(); 
        //Se activa el onclick de reiniciar: 
        this.#botonEventoReiniciarJuego();
    }

    #reiniciarJuego(){ 
        //Se limpia todo al iniciar el juego:
        this.#limpiarJuego(); 
        //Se activa el onclick de reiniciar: 
        this.#botonEventoReiniciarJuego();

        if(this.#primerTurno === this.#fichaPersona){
            this.#habilitarClickJugador();
            this.#eventoClickBotones(); 
        }else{
            this.#primeraJugadaSiTurnoMaquina();
        } 
    }


    //Jugada persona:
    #eventoClickBotones() {
        //Selecciona todos los botones
        const botones = document.querySelectorAll('.button');
    
        botones.forEach((boton, index) => {
            // Elimina cualquier evento previo para evitar acumulaciones
            boton.replaceWith(boton.cloneNode(true));
        });
    
        // Vuelve a seleccionar los botones después del replace
        const nuevosBotones = document.querySelectorAll('.button');
    
        nuevosBotones.forEach((boton, index) => {
            boton.addEventListener('click', () => {
                this.#numJugada++;
    
                // Deshabilita todos los botones:
                this.#deshabilitarJugador();
    
                // Calculo fila y columna
                let fila = Math.floor(index / 3);
                let columna = index % 3;
    
                // Comprobar que la casilla está vacía
                if (this.#comprobarPosicionVacia(fila, columna)) {
                    this.#posicionarImagenFicha(this.#fichaPersona, fila, columna);
                    this.#matrizJuego[fila][columna] = this.#fichaPersona;
                }
    
                // Comprobar empate
                if (this.#numJugada === 9) {
                    this.#mensajeFinalizaJuego('Empate');
                    this.#eliminarMensajeFinalizaJuego();
                    return;
                }
    
                // Comprobar si ha ganado la persona
                if (this.#numJugada >= 5) {
                    let respuestaHaGanadoPersona = this.#comprobarSiPersonaHaGanadoPersona();
                    if (respuestaHaGanadoPersona) {
                        if(this.#user.conectado === false){
                            this.#mensajeFinalizaJuego('¡Felicidades! Has ganado el juego. Regístrate si quieres guardar la puntuación');  
                            this.#eliminarMensajeFinalizaJuego(); 
                            return; 
                        }

                        this.#mensajeFinalizaJuego('¡Has ganado! Sumas 10 puntos');
                        //Llamar al fetch para sumar los puntos en la BD: 
                        this.#sumarPuntuacionUser(); 
                        this.#eliminarMensajeFinalizaJuego();
                        return;
                    }
                }
    
                // Turno de la máquina
                if (this.#numJugada === 1 && this.#primerTurno === this.#fichaPersona) {
                    this.#primeraJugadaSiPrimerTurnoPersona();
                } else if (this.#numJugada === 9) {
                    return;
                } else {
                    this.#jugadaMaquina();
                }
            });
        });
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
                    this.#mensajeFinalizaJuego("Algo no ha ido bien, no se ha podido sumar la puntuación");  
                }

                if(respuesta.ok){
                    const data = await respuesta.json(); 
                    setTimeout(() => {
                        this.#mensajeFinalizaJuego(`Puntuación actualizada: ${data.score}`); 
                    }, 3000); 
                } 

                setTimeout(() => {
                    this.#eliminarMensajeFinalizaJuego();   
                }, 4000);

                return; 

            //No entra al catch solo porque la respuesta http tenga 404, si por problemas de conexión: 
            }catch(e){
                this.#mensajeFinalizaJuego("Error de red o servidor. No se ha sumado la puntuación"); 
                this.#eliminarMensajeFinalizaJuego(); 
                return; 
            }
 
        }

    }
    
    #comprobarSiPersonaHaGanadoPersona(){
        let hayTresFichasPersonaFila = false;
        let hayTresFichasPersonaCol = false;
        let hayTresFichasPersonaDiagonal = false;
        //Recorrer matriz a ver si encuentro tres fichas persona, si encuentro, ha ganado. 
        hayTresFichasPersonaFila = this.#hayTresEnFilaPersona();
        if(hayTresFichasPersonaFila){
            return true;
        }
        hayTresFichasPersonaCol = this.#hayTresEnColPersona();
        if(hayTresFichasPersonaCol){
            return true;
        }
        hayTresFichasPersonaDiagonal = this.#hayTresEnDiagonalPersona();
        if(hayTresFichasPersonaDiagonal){
            return true;
        }

        return false;
    }

    #hayTresEnFilaPersona(){
        for (let i = 0; i < this.#matrizJuego.length; i++) {
            if (this.#matrizJuego[i][0] === this.#fichaPersona && this.#matrizJuego[i][1] === this.#fichaPersona && this.#matrizJuego[i][2] === this.#fichaPersona) {
                //Hay tres en una fila:
                return true; 
            }
        }
        //No hay tres en una fila:
        return false;
    }

    #hayTresEnColPersona(){
        for (let j = 0; j < this.#matrizJuego[0].length; j++) {
            if (this.#matrizJuego[0][j] === this.#fichaPersona && this.#matrizJuego[1][j] === this.#fichaPersona && this.#matrizJuego[2][j] === this.#fichaPersona) {
                // Hay tres en columna
                return true; 
            }
        }
        // No hay tres en columna
        return false; 
    }

    #hayTresEnDiagonalPersona(){
        //Revisa diagonal principal y secundaria. 
        return (
            (this.#matrizJuego[0][0] === this.#fichaPersona && this.#matrizJuego[1][1] === this.#fichaPersona && this.#matrizJuego[2][2] === this.#fichaPersona) || 
            (this.#matrizJuego[0][2] === this.#fichaPersona &&this.#matrizJuego[1][1] === this.#fichaPersona && this.#matrizJuego[2][0] === this.#fichaPersona)   
        );
    }

    //Termina de jugar la máquina y se vuelven a habilitar: 
    #habilitarClickJugador(){
        const botones = document.querySelectorAll('.button');
        botones.forEach((boton)=>{
            boton.disabled = false;
        }); 
        this.#cambiarTurnoVisual(); 
    }
    //User no pueda hacer click mientras juega la máquina:
    #deshabilitarJugador(){
        const botones = document.querySelectorAll('.button');
        botones.forEach((boton)=>{
            boton.disabled = true;
        }); 
        this.#cambiarTurnoVisual();
    }

    #cambiarTurnoVisual(){
        // Cambiar turnos visualmente. 
        const jugador = document.querySelector('.jugador');
        const maquina = document.querySelector('.maquina');
        if(maquina && maquina.classList.contains('maquina__activo')){
            maquina.classList.remove('maquina__activo');
            jugador.classList.add('jugador__activo');
        }else{
            jugador.classList.remove('jugador__activo');
            maquina.classList.add('maquina__activo');
        }
    }

    //Antes de posicionar ficha jugador, comprueba que el sitio está vacío: 
    #comprobarPosicionVacia(fila, columna){
        if(this.#matrizJuego[fila][columna] === undefined){
            return true;
        }else{
            return false;
        }
    }

    //Jugada máquina: : 
    #primeraJugadaSiTurnoMaquina(){
        this.#deshabilitarJugador();
        //Primera tirada, en medio: 
        let primeraPosicionMaquina = [1,1];
        this.#posicionarFichaMaquina(primeraPosicionMaquina);
        //Llamar al evento click para que el user pueda jugar: 
        this.#eventoClickBotones(); 
    }

    #primeraJugadaSiPrimerTurnoPersona(){
        let filaCol = [];
        //Si primero le toca a persona, su primera tirada será en la primera que encuentre vacia. 
        this.#matrizJuego.forEach((fila, indexFila) => {
            fila.forEach((columna, indexColumna) => {
                if(this.#matrizJuego[indexFila][indexColumna] === undefined){
                    filaCol.push(indexFila, indexColumna);
                } 
            });
        });
        this.#posicionarFichaMaquina(filaCol);
    }

    #jugadaMaquina(){
        let respuestaDobleFichaGanadora = false;
        let respuestaFichaEvitarPerder = false;
        let posicionEstrategicaEncontrada = [];
        let posicionVaciaEncontrada = []; 
        //Primero comprobar si hay dos seguidas máquina para posicionar la tercera y ganar:
        respuestaDobleFichaGanadora = this.#posicionEntreDos(this.#fichaMaquina);
        console.log(`respuestaDobleFichaGanadora máquina: ${respuestaDobleFichaGanadora}`);
        //Si ha encontrado posición ganadora, posicionarla: 
        if(respuestaDobleFichaGanadora){
            this.#posicionarFichaMaquina(respuestaDobleFichaGanadora);
            //Mostrar que ha ganado la máquina. 
            setTimeout(() => {
                this.#mensajeFinalizaJuego('¡Te ha ganado la máquina! No sumas puntos.');
                this.#eliminarMensajeFinalizaJuego();
            }, 1000); 

            return;
        }else{
            respuestaFichaEvitarPerder = this.#posicionEntreDos(this.#fichaPersona);
            if(respuestaFichaEvitarPerder){
                this.#posicionarFichaMaquina(respuestaFichaEvitarPerder);
            }else{
                posicionEstrategicaEncontrada = this.#posicionEstrategica();
                //He encontrado esa posición. 
                if(posicionEstrategicaEncontrada){
                    this.#posicionarFichaMaquina(posicionEstrategicaEncontrada);
                    //Posicionar ficha en la matriz interna y la imágen en su posición correcta. 
                }else{
                    posicionVaciaEncontrada = this.#posicionarMaquinaEspacioVacio();
                    if(posicionVaciaEncontrada){
                        this.#posicionarFichaMaquina(posicionVaciaEncontrada);
                    }
                } 
            }
            console.log(`respuestaFichaEvitarPerder: ${respuestaFichaEvitarPerder}`);
            console.log(`respuestaDobleFichaGanadora: ${respuestaDobleFichaGanadora}`);
            console.log(`posicionEstrategicaEncontrada: ${posicionEstrategicaEncontrada}`);
        } 

        //Comprobar que num de jugada es, si es la última y no quedan, empate: 
        if(this.#numJugada === 9){
            setTimeout(() => {
                this.#mensajeFinalizaJuego('Empate');
                this.#eliminarMensajeFinalizaJuego();
            }, 1000);
        }
    }

    #posicionarMaquinaEspacioVacio(){
        let posicionVacia = [];

        for (let i = 0; i < this.#matrizJuego.length; i++) {
            for (let j = 0; j < this.#matrizJuego[i].length; j++) {
                if (this.#matrizJuego[i][j] === undefined) {
                    posicionVacia = [i,j];
                    return posicionVacia;
                }
            }
        }
       
    }

    //Recibir fichaMaquina o fichaPersona para comprobar si hay dos seguidas y colocar la tercera o bien para ganar o para evitar perder.
    //Llamar para revisar filaColumna recursivamente. 
    #posicionEntreDos(ficha){
        let respuestaDiagonaPrincipal, respuestaDiagonalSecundaria, respuestaFilaCol;
        //Compruebar en fila y col si hay 2 iguales de ficha máquina. Si las hay return fila y col de la posición. 
        respuestaFilaCol = this.#revisarFilaColumna(0,0, ficha);
        if(respuestaFilaCol){
            return respuestaFilaCol;
        }

        respuestaDiagonaPrincipal = this.#recorrerDiagonalPrincipal(ficha)
        if(respuestaDiagonaPrincipal){
            return respuestaDiagonaPrincipal;
        }

        respuestaDiagonalSecundaria = this.#recorrerDiagonalSecundaria(ficha)
        if(respuestaDiagonalSecundaria){
            return respuestaDiagonalSecundaria;
        } 

        //No ha encontrado lugar ni ganadora ni evitar perder. 
        console.log("No ha encontrado posicion ganadora de: " + ficha);
        return false;
    }

    #revisarFilaColumna(fila, columna, ficha){
        let ocurrenciasFila =  0;
        let contadorOcurrenciasColumna = 0;
        let indiceVacio = -1;
        let indiceVacioCol = -1;
        let columnaArray = [];
        //Caso base: //Ya se ha comprobado todo. 
        if(fila > 2){
            return false;
        }
        //Comprobar la fila, la recorro y devuelve las veces que ha encontrado esa ficha. 
        ocurrenciasFila = this.#matrizJuego[fila].filter(elemento => elemento === ficha).length;
        console.log(`ocurrenciasFila: ${ocurrenciasFila} de ficha: ${ficha}`);
        if(ocurrenciasFila === 2){
            indiceVacio = this.#matrizJuego[fila].findIndex(elemento => elemento === undefined);
            if(indiceVacio != -1){
                //Return la posición que ha encontrado para posicionar fichaMaquina.
                return [fila, indiceVacio];
            }
        }
        //Comprobar las columnas: 
        columnaArray = this.#matrizJuego.map(fila => fila[columna]);
        contadorOcurrenciasColumna = columnaArray.filter(elemento => elemento === ficha).length;
        if(contadorOcurrenciasColumna === 2){
            indiceVacioCol = columnaArray.findIndex(elemento => elemento === undefined);
            if(indiceVacioCol != -1){
                //Return la posición que he encontrado para posicionar fichaMaquina. 
                return [indiceVacioCol, fila];
            }
        }
        // Llamada recursiva y devolver resultado: 
        return this.#revisarFilaColumna(fila + 1, columna + 1, ficha);   
    }

    #recorrerDiagonalPrincipal(ficha){
        console.log(this.#matrizJuego);
        let contador = 0;
        let indiceVacio = -1;
        for(let i = 0; i < this.#matrizJuego.length; i++){
            if(this.#matrizJuego[i][i] === ficha){
                
                console.log("pasooooo"); 
                contador++;
                console.log(`en ${i}${i} de ficha: ${ficha} contador: ${contador}`);
            }
            if(this.#matrizJuego[i][i] === undefined){
                indiceVacio = i;
            }
        }
        if(contador === 2 && indiceVacio != -1){
            return [indiceVacio, indiceVacio];
        }else{
            return false;
        }

    }

    #recorrerDiagonalSecundaria(ficha){
        let contador = 0;
        let indiceVacio = -1;
        for(let i = 0; i < this.#matrizJuego.length; i++){
            if(this.#matrizJuego[i][2-i] === ficha){
                contador++;
            }
            if(this.#matrizJuego[i][2-i] === undefined){
                indiceVacio = i;
            }
        }
        if(contador === 2 && indiceVacio != -1){
            return [indiceVacio, 2 - indiceVacio];
        }else{
            return false;
        }
    }

    //Recorrer la matriz por la misma fil/col comprobando que hay fichaMaquina + 2 espacios vacios.
    #posicionEstrategica() {
        let posicionEstrategica;
    
        // Comprobar en fila,col
        posicionEstrategica = this.#posicionEstrategicaFilaCol(0, 0);
        if (posicionEstrategica) {
            return posicionEstrategica;
        }
    
        posicionEstrategica = this.#posicionEstrategicaDiagonalPrincipal();
        if (posicionEstrategica) {
            return posicionEstrategica;
        }
    
         posicionEstrategica = this.#posicionEstrategicaDiagonalSecundaria();
        if (posicionEstrategica) {
            return posicionEstrategica;
        } 
    
        return false;
    }

    #posicionEstrategicaFilaCol(fila, columna){
        let contadorEspacioVacioFila = 0;
        let contadorEspacioVacioCol = 0; 
        let totalFichaMaquinaFila = 0;
        let totalFichaMaquinaCol = 0; 
        let indicesVaciosFila = [];
        let indicesVaciosCol = [];
        let columnaArray = [];
        //Caso base: //Ya se ha comprobado todo. 
        if(fila > 2){
            return false;
        }
        //Comprobar fila: 
        this.#matrizJuego[fila].forEach((elemento, indice) =>{
            if(elemento === undefined){
                contadorEspacioVacioFila++;
                indicesVaciosFila.push(indice);
            }
            if(elemento === this.#fichaMaquina){
                totalFichaMaquinaFila++;
            }
        });

        if(contadorEspacioVacioFila === 2 && totalFichaMaquinaFila === 1){
            //Encontrado la ficha con 2 espacios vacios.
            return [fila, indicesVaciosFila[0]];
        }

        //Comprobar las columnas: 
        columnaArray = this.#matrizJuego.map(fila => fila[columna]);
        columnaArray.forEach((elemento, indice) => {
            if(elemento === undefined){
                contadorEspacioVacioCol++;
                indicesVaciosCol.push(indice);
            }
            if(elemento === this.#fichaMaquina){
                totalFichaMaquinaCol++;
            }
        });

        if(contadorEspacioVacioCol === 2 && totalFichaMaquinaCol === 1){
            //Ha encontrado la ficha con 2 espacios vacios.
            return [indicesVaciosCol[0], fila];
        }

        // Llamada recursiva y devolver resultado: 
        return this.#posicionEstrategicaFilaCol(fila + 1, columna + 1); 
    }

    //Comprobar diagonales para posición estratégica:  
    #posicionEstrategicaDiagonalPrincipal(){
        let contadorFichaMaquina = 0;
        let contadorEspaciosVacios = 0;
        let indiceVacio = -1;
        for(let i = 0; i < this.#matrizJuego.length; i++){
            if(this.#matrizJuego[i][i] === this.#fichaMaquina){
                contadorFichaMaquina++;
            }
            if(this.#matrizJuego[i][i] === undefined){
                contadorEspaciosVacios++;
                indiceVacio = i;
            }
        }
        if(contadorFichaMaquina === 1 && contadorEspaciosVacios === 2){
            return [indiceVacio, indiceVacio];
        }else{
            return false;
        }
    }

    #posicionEstrategicaDiagonalSecundaria(){
        let contadorFichaMaquina = 0;
        let contadorEspaciosVacios = 0;
        let indiceVacio = -1;
        for(let i = 0; i < this.#matrizJuego.length; i++){
            if(this.#matrizJuego[i][2-i] === this.#fichaMaquina){
                contadorFichaMaquina++;
            }
            if(this.#matrizJuego[i][2-i] === undefined){
                contadorEspaciosVacios++;
                indiceVacio = i;
            }
        }
        if(contadorFichaMaquina === 1 && contadorEspaciosVacios === 2){
            return [indiceVacio, 2 - indiceVacio];
        }else{
            return false;
        }
    }

    //Posicionar ficha ganadora máquina. 
    #posicionarFichaMaquina(filaColumna){
        console.log(`posicionarFichaMaquina: ${filaColumna}`);
        this.#numJugada++;
        //Se posiciona ficha en matriz interna:
        this.#matrizJuego[filaColumna[0]][filaColumna[1]] = this.#fichaMaquina; 
        //Posicionar ficha máquina visualmente aquí pero con unos segundos de espera:
        setTimeout(() =>{
            this.#posicionarImagenFicha(this.#fichaMaquina,filaColumna[0], filaColumna[1]);
        },800)
    }

    //Crea imágen dinámica y añade la ficha máquina o ficha persona según corresponda:
    #posicionarImagenFicha(ficha, fila, columna){
        const boton = document.querySelectorAll('.button')[fila * 3 + columna];
        let img = document.createElement('img');
        console.log(`la ficha que toca para la imagen es: ${ficha}`);
        img.src = ficha === this.#fichaMaquina ? this.#imagenesFichas[1] : this.#imagenesFichas[0];
        img.classList.add('imagen_button');
        boton.appendChild(img);
        if(ficha === this.#fichaMaquina){
            //Para que vuelva a poder hacer click. 
            this.#habilitarClickJugador(); 
        }

    }

    #mensajeFinalizaJuego(mensajeAmostrar){
        //Muestra un cartel de empate, o de quien ha ganado. 
        const fondo = document.querySelector('.fondo');
        const mensaje = document.querySelector('.mensaje');
        mensaje.textContent = mensajeAmostrar;
        fondo.classList.add('fondo__transparente');
        mensaje.classList.add('mostrar__mensaje'); 
        //Terminar juego para deshabilitar los botones:
        this.#terminarJuego();
    }

    //Eliminar mensaje última ronda al pasar 4 segundos. 
    #eliminarMensajeFinalizaJuego(){ 
        const fondo = document.querySelector('.fondo');
        const mensaje = document.querySelector('.mensaje');
        let temporizadorMensaje = setTimeout(()=>{
            fondo.classList.remove('fondo__transparente');
            mensaje.classList.remove('mostrar__mensaje');

        }, 2000);
    } 

    #terminarJuego(){
        this.#deshabilitarJugador(); 
    }

    #botonEventoReiniciarJuego(){
        let botonVolverAjugar = document.querySelector('.boton__volver-jugar-tres-en-raya');
        botonVolverAjugar.onclick = (() =>{
            //Cambiar ficha: 
            this.#primerTurno = this.#primerTurno === this.#fichaPersona ? this.#fichaMaquina : this.#fichaPersona;
            this.#reiniciarJuego(); 
        }); 
    }

    //Para asegurarse de que todo empieza de cero (si ya está instanciado, se empieza donde se quedó):
    #limpiarJuego(){
        //Limpiar matriz interna:
        this.#matrizJuego = Array(3).fill().map(() => Array(3).fill(undefined));
        this.#numJugada = 0;
        //Limpiar imágenes en tablero:
        document.querySelectorAll('.imagen_button').forEach(img => img.remove());
       
            
    }
} 