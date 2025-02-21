class JuegoTresEnRaya extends Juego{
    constructor(){
        super('Juego Tres En Raya', 'Juego de estrategia', 0);
        this.matrizJuego =  [
            [undefined, undefined, undefined],
            [undefined, undefined, undefined],
            ['o',undefined, 'o']
        ];
        this.fichaMaquina = 'o';
        this.fichaPersona = 'x';
    }

    //EVENTO CLICK PARA MOSTRAR IMÁGENES:
    eventoClickBotones(){
        //Cuando hace click el usuario, se posiciona la 0 en pantalla y se llama al método para posicionarla en matriz:
        document.querySelectorAll('.button').forEach((boton, index) => {
            boton.addEventListener('click', () => {
                //Calculo fila. 
                let fila = Math.floor(index / 3);  
                //Calculo columna. 
                let columna = index % 3;
                //Comprobar que donde ha hecho click está vacío:
                if(this.comprobarPosicionVacia(fila, columna)){
                    //Creo img dinámicamente. 
                    let img = document.createElement('img');
                    img.src = '../img/o.png'; 
                    img.classList.add('imagen_button');
                    boton.appendChild(img);
                    //Añado ficha jugador a la matriz interna:
                    this.matrizAmostrar[fila][columna] = this.fichaPersona;
                    console.log(this.matrizJuego);
                }
                //False. No es vacía. No hago nada. 
            })
        })
    }
    //Antes de posicionar ficha jugador, comprueba que el sitio está vacío: 
    comprobarPosicionVacia(fila, columna){
        if(this.matrizJuego[fila][columna] === undefined){
            return true;
        }else{
            return false;
        }
    }
    //Muestro matriz en pantalla. 
    mostrarMatriz(){
        let matrizAmostrar = ''; 
        for(let x = 0; x < this.matrizJuego.length; x++){
            matrizAmostrar += this.matrizJuego[x].join(' | ') + '\n';
        }
        alert(matrizAmostrar);
    }
    //Elige posición ficha usario. 
    leerJugada(){
        let respuesta = prompt('Elige tu movimiento de fila y columna');
        let arrayPosiciones = respuesta.split(",");
        return arrayPosiciones;
    }
    //Coloco la ficha dónde haya elegido. 
    colocarFicha(fila, columna){
        console.log("Estoy colocando ficha");
        //Si es vacio, coloco la ficha y llamo a jugar. Le toca a la máquina: 
        if(this.matrizJuego[fila][columna] === undefined){
            this.matrizJuego[fila][columna] = 'x';
            //Muestro la jugada:
            this.mostrarMatriz(); 
            //Le toca a la máquina:
            this.jugadaMaquina();
        }else{
            //Si no es vacío, lo aviso y vuelvo a llamar a jugada para que juegue otra vez.  
            alert("En esa posición ya hay una ficha, elige otra");
            this.jugadaPersona();
        }
    }

    jugadaPersona(){
        this.mostrarMatriz();
        let filaColumna = this.leerJugada();
        console.log(`Esta es filaColumna: ${filaColumna}`);
        this.colocarFicha(filaColumna[0], filaColumna[1]);
        
    }

    jugadaMaquina(){
        console.log("Entro a hacer jugada máquina");
        let respuestaFichaGanadoraMaquina = false;
        //let respuestaFichaEvitarPerder = false;
        //Primero comprobar si hay dos seguidas máquina para posicionar la tercera y ganar:
        respuestaFichaGanadoraMaquina = this.posicionEntreDos(this.fichaMaquina);
        //Si ha encontrado posición ganadora, posicionarla: 
        if(respuestaFichaGanadoraMaquina){
            this.posicionarFichaMaquina(respuestaFichaGanadoraMaquina);
            return;
        }else{
            console.log("No he encontrado dos fichas seguidas de máquina");
            return;
        }
        
        
        /* else{
            respuestaFichaEvitarPerder = this.posicionEntreDos(this.fichaPersona);
            if(respuestaFichaEvitarPerder){
                this.posicionarFichaMaquina(respuestaFichaEvitarPerder);
                return;
            }
        } */
    }

    //Recibe fichaMaquina o fichaPersona para comprobar si hay dos seguidas y colocar la tercera o bien para ganar o para evitar perder.
    //Llama para revisar filaColumna recursivamente. Diagonal principal. Diagonal secundaria. 
    posicionEntreDos(ficha){
        //let respuestaDiagonaPrincipal = false;
        //let respuestaDiagonalSecundaria = false;
        //Llamo, compruebo en fila y col si hay 2 iguales de ficha máquina. Si las hay return fila y col de la posición. 
        let respuestaFilaCol = this.revisarFilaColumna(0,0, ficha);
        console.log(`Eso es fila para situar ficha maquina: ${respuestaFilaCol[0]} y col: ${respuestaFilaCol[1]}`);
        if(respuestaFilaCol){
            return respuestaFilaCol;
        }else{
            console.log("No se han encontrado fichas maquina dos seguidas");
        } 
       /*  respuestaFilaCol = this.recorrerDiagonalPrincipal()
        if(respuestaFilaCol){
            return respuestaFilaCol;
        }
        respuestaFilaCol = this.recorrerDiagonalSecundaria()
        if(respuestaFilaCol){
            return respuestaFilaCol;
        } */
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

    recorrerDiagonalPrincipal(){

    }

    recorrerDiagonalSecundaria(){

    }
    //Posiciono ficha ganadora máquina. 
    posicionarFichaMaquina(filaColumna){
        this.matrizJuego[filaColumna[0]][filaColumna[1]] = this.fichaMaquina;
        this.mostrarMatriz();
        //Llamar a haGanadoMaquina(); 
    }

}

