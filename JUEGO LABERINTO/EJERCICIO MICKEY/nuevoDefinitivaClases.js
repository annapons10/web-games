class Laberinto{
    constructor(filas, columnas, probabilidadObstaculo, filaMickey, colMickey){
        this.filas = filas;
        this.columnas = columnas;
        this.probabilidadObstaculo = probabilidadObstaculo;
        this.filaMickey = filaMickey;
        this.colMickey = colMickey;
        this.filAnterior = filaMickey;
        this.colAnterior = colMickey;
        this.matriz = Array.from({ length: this.filas }, () => Array.from({ length: this.columnas }, () => 1)); // Llena con 1
        
    }

   
    crearObstaculosEnScreen() {
    
        for (let x = 0; x < this.filas; x++) {
            for (let i = 0; i < this.columnas; i++) {
                this.matriz[x][i] = Math.random() < probabilidadObstaculo ? 1 : 0; // 1 obstáculo, 0 pasillo
            }
        }
    
        // Ejemplo de valores especiales
        this.matriz[this.filaMickey][this.colMickey] = 88; //mickey
        this.matriz[0][5] = 99;//salida
    
    }

    mostrarMatriz(){
        for(let x = 0; x <= this.filas; x++){ 
            console.log([this.matriz[x]]);
        }
    }

    eventoDelTeclado(){
        document.addEventListener('keydown', (event) => {
            switch(event.key) {
                case 'ArrowUp':
                    this.filaMickey = this.filaMickey - 1;
                    alert('arriba');
                    break;
                case 'ArrowDown':
                    this.filaMickey = this.filaMickey + 1;
                    alert('abajo');
                    break;
                case 'ArrowLeft':
                    this.colMickey = this.colMickey - 1;
                    alert('izq');
                    break;
                case 'ArrowRight':
                    this.colMickey = this.colMickey + 1;
                    alert('derecha');
                    break;
                default:
                    alert('Tecla no válida para moverse');
                    return;  // Salir de la función para que no se ejecute movimientoLaberinto()
            }
            this.movimientoLaberinto();
        });
    }

  
    movimientoLaberinto(){
        
            if (this.filaMickey < 0 || this.filaMickey >= this.filas || this.colMickey < 0 || this.colMickey >= this.columnas) {
                // Si está fuera de rango, vuelve a la posición anterior y maneja el error
                this.filaMickey = this.filAnterior;
                this.colMickey = this.colAnterior;
                alert("fuera de rango");
                return;
            }
    
            //Si está dentro de rango, que hay dentro de ese nuevo movimiento:
            if(this.matriz[this.filaMickey][this.colMickey] === 1){
                this.filaMickey = this.filAnterior; //Si esta fuera de rango, vuelvo a lo anterior y aviso por pantalla.
                this.colMickey = this.colAnterior;
                alert("obstaculo");//Muestra el obstáculo en pantalla.
                return;
            }
            if(this.matriz[this.filaMickey][this.colMickey] === 99){
                alert("mover mickey");
                alert("salida");
                return;
            }
            if(this.matriz[this.filaMickey][this.colMickey] === 0){//Es pasillo: Actualizo mickey y donde estaba, le pongo 0.
                this.matriz[this.filaMickey][this.colMickey] = 88;
                this.matriz[this.filAnterior][this.colAnterior] = 0;
                alert("mover mickey");
                return;
                
            }
                //this.mostrarMatriz();
               
        }
    
   

    fueraDeRango(){
        alert('Fuera de rango');
    }
    

}
 


//MAIN:

let probabilidadObstaculo = 0.3; //Porcentaje para que se la probabilidad de obstáculo.
let filas = 6;
let columnas = 6;

//Instancio un laberinto:
let nuevoLaberinto = new Laberinto(filas, columnas, probabilidadObstaculo, 2, 3);

nuevoLaberinto.crearObstaculosEnScreen();

nuevoLaberinto.eventoDelTeclado();
