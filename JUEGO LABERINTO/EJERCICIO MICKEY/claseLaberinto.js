class Laberinto{
    constructor(filas, columnas, probabilidadObstaculo){
        this.filas = filas;
        this.columnas = columnas;
        this.probabilidadObstaculo = probabilidadObstaculo;
        this.filaMickey = 2;
        this.colMickey = 3;
        this.filAnterior = filaMickey;
        this.colAnterior = colMickey;
        this.direccion = '';
        this.matriz = [];
        this.eventoDelTeclado(); // Configura el event listener una vez al crear el objeto
        
    }

    crearMatriz(){ //Crear matriz vacía.
        
        for(let x = 0; x <= this.filas; x++){
            this.matriz[x] = []; //crear filas. 
            for(let i = 0; i <= this.columnas; i++){
                this.matriz[x][i] = [];
            }
        }

        return this.matriz;

    }

    crearObstaculosEnMatriz(){
        for(let x = 0; x <= this.filas; x++){
            for(let i = 0; i <= this.columnas; i++){
                this.matriz[x][i] = Math.random() < this.probabilidadObstaculo ? 1 : 0; //1 obstáculo. 0 pasillo.
            }
        }

        //Para colocar salida con random. Entre las 4 posiciones posibles. 
        let filaRandom = this.salidaRandom(0, this.filas);
        let columnaRandom = this.salidaRandom(0, this.columnas);
        this.matriz[filaRandom][columnaRandom] = 'salida';
        //Valores concreto para mickey. La mitad.
        this.matriz[2][3] = 'mickey';
        return this.matriz;
    }


    salidaRandom(opcion1, opcion2){//colocar la salida en 4 partes diferentes. 
        return Math.random() < 0.5 ? opcion1 : opcion2;
    }

    movimientoLaberinto(){
        
        //Depende de la dirección que haya clickeado el usuario, comprobar que esté en rango y mover primero en la matriz: 
        if(this.direccion === 'arriba'){
            this.filaMickey = this.filaMickey - 1;
            console.log(`fila nueva es: ${this.filaMickey}`);
        }else if(this.direccion === 'abajo'){
            this.filaMickey = this.filaMickey + 1;
            console.log(`fila nueva es: ${this.filaMickey}`);
        }else if(this.direccion === 'derecha'){
            this.colMickey = this.colMickey + 1;
            console.log(`col nueva es: ${this.colMickey}`);
        }else if(this.direccion === 'izquierda'){
            this.colMickey = this.colMickey - 1;
            console.log(`col nueva es: ${this.colMickey}`);
        }

        if (this.filaMickey < 0 || this.filaMickey >= this.filas || this.colMickey < 0 || this.colMickey >= this.columnas) {
            // Si está fuera de rango, vuelve a la posición anterior y maneja el error
            this.filaMickey = this.filAnterior;
            this.colMickey = this.colAnterior;
            this.fueraDeRango();
            return;
        }

        //Si está dentro de rango, que hay dentro de ese nuevo movimiento:
        if(this.matriz[this.filaMickey][this.colMickey] === 1){
                this.filaMickey = this.filAnterior; //Si esta fuera de rango, vuelvo a lo anterior y aviso por pantalla.
                this.colMickey = this.colAnterior;
                this.mostrarObstaculo();//Muestra el obstáculo en pantalla.
            }else if(this.matriz[this.filaMickey][this.colMickey] === 'salida'){
                this.moverMickeyDom();
                this.mostrarSalida();
                return;
            }else if(this.matriz[this.filaMickey][this.colMickey] === 0){//Es pasillo: Actualizo mickey y donde estaba, le pongo 0.
                this.matriz[this.filaMickey][this.colMickey] = 'mickey';
                this.matriz[this.filAnterior][this.colAnterior] = 0;
                this.moverMickeyDom();
            }

            this.mostrarMatriz();
           
    }
 

    eventoDelTeclado(){
        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowUp':
                    this.direccion = 'arriba';
                    console.log('arriba');
                    break;
                case 'ArrowDown':
                    this.direccion = 'abajo';
                    console.log('abajo');
                    break;
                case 'ArrowLeft':
                    this.direccion = 'izquierda';
                    console.log('izq');
                    break;
                case 'ArrowRight':
                    this.direccion = 'derecha';
                    console.log('derecha');
                    break;
                default:
                    console.log('Tecla no válida para moverse');
                    return;  // Salir de la función para que no se ejecute movimientoLaberinto()
            }

            this.movimientoLaberinto();
        });
    }

    mostrarLaberinto(){ //crear dinámicamente los elementos html. Cada div del contenedor. 

        //Coger elementos dom: 
        let containerLaberinto = document.querySelector('.container__laberinto'); //me guardo el contenedor. 
        const fragment = document.createDocumentFragment(); //Creo un fragmento para añadir todos los elem. a la vez. //Si deseas manipular el DOM de manera más eficiente, especialmente cuando estás creando o actualizando una gran cantidad de elementos, puedes construir el contenido HTML en una estructura temporal y luego agregarlo al DOM en una sola operación. 
      
        //Recorro la matriz para ir añadiendo elementos:
        for(let x = 0; x < this.filas; x++){
            for(let i = 0; i < this.columnas; i++){
                let div = document.createElement('div');
                div.classList.add('celda', 'pasillo');

                if(matriz[x][i] === 'mickey'){ //Creo un parráfo dentro del div para luego moverlo.
                    const parrafo = document.createElement('p'); // Crea un nuevo elemento <p>
                    parrafo.textContent = 'cruelty_free'; // Establece el texto del párrafo
                    parrafo.classList.add('material-symbols-outlined');
                    parrafo.id = 'mickey';
                    parrafo.classList.add('mickeyPostionAbsolute');
                    div.appendChild(parrafo);
                }

                fragment.appendChild(div); //Por cada vuelta, cada div, se añade al fragmento.

            }
        }

        containerLaberinto.appendChild(fragment); //Añadir todo el fragmento al contenedor. 
    }

    moverMickeyDom(){
        const mickey = document.getElementById('mickey');
        //Depende de la dirección que haya clickeado el usuario, comprobar que esté en rango y mover primero en la matriz: 
        if(this.direccion === 'arriba'){
            mickey.classList.add('moverMickeyArriba');
        }else if(this.direccion === 'abajo'){
            mickey.classList.add('moverMickeyAbajo');
        }else if(this.direccion === 'derecha'){
            mickey.classList.add('moverMickeyDerecha');
        }else if(this.direccion === 'izquierda'){
            mickey.classList.add('moverMickeyIzquierda');
        }

        console.log("MOVER MICKEY DOM");
    }

    mostrarObstaculo(){//Pantalla oscura.Mostrar "Obstáculo";
        console.log("Obstaculo");

    }

    fueraDeRango(){//No hacer nada.
            console.log("FUERA DE RANGO");
    } 

    mostrarSalida(){//Mostrar puerta dom. Pantalla de colores. Llamar método 'finalizar' clase juego. 
        console.log("Salida");

    }

    reiniciarJuego(){ //Quiero que lo de dentro vuelva a 0 y vuelva a empezar. ¿Detener el event listener?
        this.direccion = '';
        this.matriz = [];
        this.eventoDelTeclado(); // Configura el event listener una vez al crear el objeto
    }

    reiniciarMickey(){//que vuelva a su lugar para empezar. 

    }

    mostrarMatriz(){
        for(let x = 0; x <= this.filas; x++){ 
            for(let i = 0; i <= this.columnas; i++){
               console.log([this.matriz[x][i]]);
            }
        }
    }

}
 


//MAIN:

let probabilidadObstaculo = 0.3; //Porcentaje para que se la probabilidad de obstáculo.
let filas = 6;
let columnas = 6;

//Instancio un laberinto:
let nuevoLaberinto = new Laberinto(filas, columnas, probabilidadObstaculo);
//Creo la matriz en JS vacía:
let matriz = nuevoLaberinto.crearMatriz();
console.log(matriz);

//crearObstaculos en la matriz con mickey + salida:
let matrizConObstaculos = nuevoLaberinto.crearObstaculosEnMatriz();
console.log(matrizConObstaculos);



nuevoLaberinto.mostrarLaberinto();
//nuevoLaberinto.mostrarMatriz();


//configuraciones: Un objeto que actúa como un mapa. Puedes usar un objeto para definir las posiciones especiales de la matriz y luego usar ese mapa para inicializar la matriz. Esto hace que el código sea más limpio y menos propenso a errores. Para no utilizar tanto 'if'. 

/* else if(matriz[x][i] === 'salida'){
    div.classList.add('material-symbols-outlined');
    div.id = 'salida';
    div.textContent = 'exit_to_app'; // Salida
} */