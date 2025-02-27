//EMPIEZA SIEMPRE PERSONA DE MOMENTO. 
class JuegoTresEnRaya extends Juego{
    constructor(){
        super('Juego Tres En Raya', 'Juego de estrategia', 0);
        this.matrizJuego =  [
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
            [undefined,undefined, undefined]
        ];
        this.fichaMaquina = 'x';
        this.fichaPersona = 'o';
        this.imagenesFichas = ['https://annaponsprojects.com/webJuegos/img/o.jpg',
                            'https://annaponsprojects.com/webJuegos//img/x.jpg'];
        //Primero le toca persona, irá cambiando cuando acabe la partida.
        this.turno = this.fichaPersona;  
        //Para saber en que jugada me encuentro. 
        this.numJugada = 0; 
    }
    //Controlar inicio juego:
    iniciarJuego(){
        if(this.turno === this.fichaPersona){
            this.eventoClickBotones(); 
        }else{
            this.primeraJugadaSiTurnoMaquina();
        }
    }

    reiniciarJuego(){
        this.turno = this.turno === this.fichaMaquina ? this.fichaPersona : this.fichaMaquina;
    }

    //JUGADA PERSONA:
    //EVENTO CLICK PARA MOSTRAR IMÁGENES:
    eventoClickBotones(){
        //Cuando hace click el usuario, se posiciona la 0 en pantalla y se llama al método para posicionarla en matriz:
        const botones = document.querySelectorAll('.button');
        botones.forEach((boton, index) => {
            boton.addEventListener('click', () => {
                //Comprobar que num de jugada es, si es la última y no quedan, empate: 
                if(this.numJugada === 9){
                    //this.empate();
                }
                this.numJugada++;
                console.log("hago clickkkkkkk");
                //Desabilita todos los botones:
                this.deshabilitarClickJugador(botones);
                //Calculo fila. 
                let fila = Math.floor(index / 3);  
                //Calculo columna. 
                let columna = index % 3;
                //Comprobar que donde ha hecho click está vacío:
                if(this.comprobarPosicionVacia(fila, columna)){
                    //Creo img dinámicamente. 
                    this.posicionarImagenFicha(this.fichaPersona, fila, columna);
                    //Añado ficha jugador a la matriz interna:
                    this.matrizJuego[fila][columna] = this.fichaPersona;
                    console.log(this.matrizJuego);
                }
                //Antes comprobar si persona ha ganado a partir de la tercera ronda: 
                if(this.numJugada >= 3){
                    this.comprobarSiPersonaHaGanado();
                }
                //Ahora empieza la jugada máquina:
                //Si primero ha jugado persona, posiciono la ficha máquina en la primera vacía. 
                if(this.numJugada === 1 && this.turno === this.fichaPersona){
                    this.primeraJugadaSiPrimerTurnoPersona();
                }else{ 
                    this.jugadaMaquina();
                }
            })
        });
    }

    comprobarSiPersonaHaGanado(){
        //Recorrer matriz a ver si encuentro tres fichas persona, si encuentro, ha ganado. 
    }

    //Termina de jugar la máquina y se vuelven a habilitar: 
    habilitarClickJugador(){
        const botones = document.querySelectorAll('.button');
        botones.forEach((boton)=>{
            boton.disabled = false;
        }); 
    }
    //Para que no pueda hacer click mientras juega la máquina:
    deshabilitarClickJugador(botones){
        botones.forEach((boton)=>{
            boton.disabled = true;
        }); 
    }
    //Antes de posicionar ficha jugador, comprueba que el sitio está vacío: 
    comprobarPosicionVacia(fila, columna){
        if(this.matrizJuego[fila][columna] === undefined){
            return true;
        }else{
            return false;
        }
    }

    //JUGADA MÁQUINA: 
    primeraJugadaSiTurnoMaquina(){
        this.numJugada++; 
        //Siempre la primera tirada de la máquina será en medio: 
        let primeraPosicionMaquina = [1,1];
        this.posicionarFichaMaquina(primeraPosicionMaquina);
        //Y llama al evento click para que el usuario pueda jugar:
        this.eventoClickBotones(); 
    }

    primeraJugadaSiPrimerTurnoPersona(){
        let filaCol = [];
        //Si primero le toca a persona, su primera tirada será en la primera que encuentre vacia. 
        this.matrizJuego.forEach((fila, indexFila) => {
            fila.forEach((columna, indexColumna) => {
                if(this.matrizJuego[indexFila][indexColumna] === undefined){
                    filaCol.push(indexFila, indexColumna);
                } 
            });
        });
        this.posicionarFichaMaquina(filaCol);
    }

    jugadaMaquina(){
        console.log("Entro a hacer jugada máquina");
        //Comprobar que num de jugada es, si es la última y no quedan, empate: 
        if(this.numJugada === 9){
            //this.empate();
        }
        let respuestaDobleFichaGanadora = false;
        let respuestaFichaEvitarPerder = false;
        let posicionEstrategicaEncontrada = [];
        //let respuestaFichaEvitarPerder = false;
        //Primero comprobar si hay dos seguidas máquina para posicionar la tercera y ganar:
        respuestaDobleFichaGanadora = this.posicionEntreDos(this.fichaMaquina);
        //Si ha encontrado posición ganadora, posicionarla: 
        if(respuestaDobleFichaGanadora){
            this.posicionarFichaMaquina(respuestaDobleFichaGanadora);
            console.log("ha ganado la maquina");
            //Mostrar que ha ganado la máquina. 
            //this.ganador();
            return;
        }else{
            console.log("No he encontrado dos fichas seguidas de máquina en jugada máquina y voy a ver si hay 2 seguidas de persona");
            respuestaFichaEvitarPerder = this.posicionEntreDos(this.fichaPersona);
            if(respuestaFichaEvitarPerder){
                this.posicionarFichaMaquina(respuestaFichaEvitarPerder);
                return;
            }else{
                console.log("no he encontrado 2 de ficha persona seguidas, llamo a posición estratégica");
                posicionEstrategicaEncontrada = this.posicionEstrategica();
                //He encontrado esa posición. 
                if(posicionEstrategicaEncontrada){
                    this.posicionarFichaMaquina(posicionEstrategicaEncontrada);
                    console.log(`Esta es la posicion estrategica ${posicionEstrategicaEncontrada}`);
                    //Posicionar ficha en la matriz interna y la imágen en su posición correcta. 
                }else{
                    console.log("error no encuentro posición estratégica");
                    //Posiciono en cualquier espacio vacio. 
                } 
            }
        } 
    }

    //Recibe fichaMaquina o fichaPersona para comprobar si hay dos seguidas y colocar la tercera o bien para ganar o para evitar perder.
    //Llama para revisar filaColumna recursivamente. Diagonal principal. Diagonal secundaria. 
    posicionEntreDos(ficha){
        let respuestaDiagonaPrincipal, respuestaDiagonalSecundaria, respuestaFilaCol;
        //Llamo, compruebo en fila y col si hay 2 iguales de ficha máquina. Si las hay return fila y col de la posición. 
        respuestaFilaCol = this.revisarFilaColumna(0,0, ficha);
        console.log(`Eso es fila para situar ficha maquina: ${respuestaFilaCol[0]} y col: ${respuestaFilaCol[1]}`);
        if(respuestaFilaCol){
            return respuestaFilaCol;
        }else{
            console.log("No se han encontrado fichas maquina dos seguidas");
        } 
        respuestaDiagonaPrincipal = this.recorrerDiagonalPrincipal(ficha)
        if(respuestaDiagonaPrincipal){
            return respuestaDiagonaPrincipal;
        }else{
            console.log("No se han encontrado fichas maquina dos seguidas en diagonal principal");
        } 
        respuestaDiagonalSecundaria = this.recorrerDiagonalSecundaria(ficha)
        if(respuestaDiagonalSecundaria){
            return respuestaDiagonalSecundaria;
        } 
        //No ha encontrado lugar ni ganadora ni evitar perder. 
        return false;
    }

    revisarFilaColumna(fila, columna, ficha){
        console.log(`Reviso fila: ${fila} y col: ${columna}`);
        let ocurrenciasFila =  0;
        let contadorOcurrenciasColumna = 0;
        let indiceVacio = -1;
        let indiceVacioCol = -1;
        let columnaArray = [];
        //Caso base: //Ya se ha comprobado todo. 
        if(fila > 2){
            console.log("No se encontró un índice vacío o no hay 2 fichas.");
            return false;
        }
        //Primero compruebo la fila, la recorro y me devuelve las veces que ha encontrado esa ficha. 
        ocurrenciasFila = this.matrizJuego[fila].filter(elemento => elemento === ficha).length;
        if(ocurrenciasFila === 2){
            console.log("he encontrado 2 fichas máquina");
            indiceVacio = this.matrizJuego[fila].findIndex(elemento => elemento === undefined);
            console.log(`El indice vacio de fila es: ${indiceVacio}`);
            if(indiceVacio != -1){
                //Returno la posición que he encontrado para posicionar fichaMaquina. 
                console.log(`entro y retorno fila: ${fila} y indicevacio: ${indiceVacio}`);
                return [fila, indiceVacio];
            }
            
        }
        //Ahora compruebo las columnas: 
        columnaArray = this.matrizJuego.map(fila => fila[columna]);
        contadorOcurrenciasColumna = columnaArray.filter(elemento => elemento === ficha).length;
        console.log(`este es el contadorOcurrecnias de columna: ${contadorOcurrenciasColumna}`);
        if(contadorOcurrenciasColumna === 2){
            indiceVacioCol = columnaArray.findIndex(elemento => elemento === undefined);
            console.log(`El indice vacio de columna es: ${indiceVacioCol}`);
            if(indiceVacioCol != -1){
                //Returno la posición que he encontrado para posicionar fichaMaquina. 
                console.log("Se ha encontrado en columna");
                console.log(`entro y retorno desde columna fila: ${indiceVacioCol} y indicevacio: ${fila}`);
                //Retorno al revés, indiceVacio como fila y fila como columna. 
                return [indiceVacioCol, fila];
            }
        }

        // Llamada recursiva y DEVOLVER SU RESULTADO
        return this.revisarFilaColumna(fila + 1, columna + 1, ficha);   
    }

    recorrerDiagonalPrincipal(ficha){
        let contador = 0;
        let indiceVacio = -1;
        for(let i = 0; i < this.matrizJuego.length; i++){
            if(this.matrizJuego[i][i] === ficha){
                contador++;
            }
            if(this.matrizJuego[i][i] === undefined){
                indiceVacio = i;
            }
        }
        if(contador === 2 && indiceVacio != -1){
            return [indiceVacio, indiceVacio];
        }else{
            return false;
        }

    }

    recorrerDiagonalSecundaria(ficha){
        let contador = 0;
        let indiceVacio = -1;
        for(let i = 0; i < this.matrizJuego.length; i++){
            if(this.matrizJuego[i][2-i] === ficha){
                contador++;
            }
            if(this.matrizJuego[i][2-i] === undefined){
                indiceVacio = i;
            }
        }
        if(contador === 2 && indiceVacio != -1){
            console.log("Se ha encontrado en diagonal secundariaaaaaa");
            return [indiceVacio, 2 - indiceVacio];
        }else{
            return false;
        }
    }

    //Recorrer la matriz por la misma fil/col comprobando que hay fichaMaquina + 2 espacios vacios.
    posicionEstrategica() {
        let posicionEstrategica;
    
        // Primero compruebo en fila,col
        posicionEstrategica = this.posicionEstrategicaFilaCol(0, 0);
        if (posicionEstrategica) {
            return posicionEstrategica;
        }
    
         posicionEstrategica = this.posicionEstrategicaDiagonalPrincipal();
        if (posicionEstrategica) {
            return posicionEstrategica;
        }
    
         posicionEstrategica = this.posicionEstrategicaDiagonalSecundaria();
        if (posicionEstrategica) {
            return posicionEstrategica;
        } 
    
        return false;
    }

    posicionEstrategicaFilaCol(fila, columna){
        console.log(`Reviso fila: ${fila} y col: ${columna} de la posicion eestrategica`);
        let contadorEspacioVacioFila = 0;
        let contadorEspacioVacioCol = 0; 
        let totalFichaMaquinaFila = 0;
        let totalFichaMaquinaCol = 0; 
        let indicesVaciosFila = [];
        let indicesVaciosCol = [];
        let columnaArray = [];
        //Caso base: //Ya se ha comprobado todo. 
        if(fila > 2){
            console.log("No se ha encontrado fichaMaquina con 2 espacios vacios de la estrategica.");
            return false;
        }
        //Primero compruebo la fila. 
        this.matrizJuego[fila].forEach((elemento, indice) =>{
            if(elemento === undefined){
                contadorEspacioVacioFila++;
                indicesVaciosFila.push(indice);
            }
            if(elemento === this.fichaMaquina){
                totalFichaMaquinaFila++;
            }
        });
        if(contadorEspacioVacioFila === 2 && totalFichaMaquinaFila === 1){
            //He encontrado mi ficha con 2 espacios vacios.
            return [fila, indicesVaciosFila[0]];
        }

        //Ahora compruebo las columnas: 
        columnaArray = this.matrizJuego.map(fila => fila[columna]);
        columnaArray.forEach((elemento, indice) => {
            if(elemento === undefined){
                contadorEspacioVacioCol++;
                indicesVaciosCol.push(indice);
            }
            if(elemento === this.fichaMaquina){
                totalFichaMaquinaCol++;
            }
        });
        if(contadorEspacioVacioCol === 2 && totalFichaMaquinaCol === 1){
            //He encontrado mi ficha con 2 espacios vacios.
            return [indicesVaciosCol[0], fila];
        }
        // Llamada recursiva y DEVOLVER SU RESULTADO
        return this.posicionEstrategicaFilaCol(fila + 1, columna + 1); 
    }

    //COMPROBAR DIAGONALES PARA POSICION ESTRATEGICA. 
    posicionEstrategicaDiagonalPrincipal(){
        console.log("entro a revistar diagonal principale strategica");
        let contadorFichaMaquina = 0;
        let contadorEspaciosVacios = 0;
        let indiceVacio = -1;
        for(let i = 0; i < this.matrizJuego.length; i++){
            if(this.matrizJuego[i][i] === this.fichaMaquina){
                contadorFichaMaquina++;
            }
            if(this.matrizJuego[i][i] === undefined){
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

    posicionEstrategicaDiagonalSecundaria(){
        console.log("entro a revistar diagonal secundaria strategica");
        let contadorFichaMaquina = 0;
        let contadorEspaciosVacios = 0;
        let indiceVacio = -1;
        for(let i = 0; i < this.matrizJuego.length; i++){
            if(this.matrizJuego[i][2-i] === this.fichaMaquina){
                contadorFichaMaquina++;
            }
            if(this.matrizJuego[i][2-i] === undefined){
                contadorEspaciosVacios++;
                indiceVacio = i;
            }
        }
        if(contadorFichaMaquina === 1 && contadorEspaciosVacios === 2){
            console.log("Se ha encontrado en diagonal secundariaaaaaa");
            return [indiceVacio, 2 - indiceVacio];
        }else{
            return false;
        }
    }

    //Posiciono ficha ganadora máquina. 
    posicionarFichaMaquina(filaColumna){
        this.numJugada++;
        //Se posiciona ficha en matriz interna:
        this.matrizJuego[filaColumna[0]][filaColumna[1]] = this.fichaMaquina;
        //Posicionar ficha máquina visualmente aquí:
        this.posicionarImagenFicha(this.fichaMaquina,filaColumna[0], filaColumna[1]);
        //Para que vuelva a poder hacer click. 
        this.habilitarClickJugador(); 
    }

    //Crea imágen dinámica y añade la ficha máquina o ficha persona según corresponda:
    posicionarImagenFicha(ficha, fila, columna){
        const boton = document.querySelectorAll('.button')[fila * 3 + columna];
        let img = document.createElement('img');
        ficha === this.fichaMaquina ? img.src = '../img/x.png' : img.src = '../img/o.png';
        img.classList.add('imagen_button');
        boton.appendChild(img);
    }
} 