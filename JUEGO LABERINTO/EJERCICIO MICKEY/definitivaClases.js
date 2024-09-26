class Laberinto{
    constructor(filas, columnas, probabilidadObstaculo, filaMickey, colMickey){
        this.filas = filas;
        this.columnas = columnas;
        this.probabilidadObstaculo = probabilidadObstaculo;
        this.filaMickey = filaMickey;
        this.colMickey = colMickey;
        this.filAnterior = filaMickey;
        this.colAnterior = colMickey;
        this.direccion = '';
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

    jugarAlLaberinto(){
        console.log("Entro a jugar");
        let filNueva = this.filaMickey;
        let colNueva = this.colMickey; 
        let direccion;
       
        //Quiero que el juego siga hasta que encuentre la salida:
    
         while(this.matriz[filNueva][colNueva] !== 99){
            alert(`${filNueva} ${colNueva}`);

            direccion = prompt("direccion, a:arriba, d:derecha, i:izquierda, b:abajo");
            alert(`esta es la nueva direccion: ${direccion}`);
    
            this.filAnterior = filNueva;
            this.colAnterior = colNueva;
            
            //Depende de la dirección que haya clickeado el usuario, comprobar que esté en rango y mover primero en la matriz: 
            if(direccion === 'arriba'){
                filNueva = filNueva - 1;
                alert(`fila nueva es: ${filNueva}`);
            }else if(direccion === 'abajo'){
                filNueva = filNueva + 1;
                alert(`fila nueva es: ${filNueva}`);
            }else if(direccion === 'derecha'){
                colNueva = colNueva + 1;
                alert(`col nueva es: ${colNueva}`);
            }else if(direccion === 'izquierda'){
                colNueva = colNueva - 1;
                alert(`col nueva es: ${colNueva}`);
            }
        
            //Verifico que este dentro de 'rango';
            if (filNueva < 0 || filNueva >= this.filas || colNueva < 0 || colNueva >= this.columnas) {
                // Si está fuera de rango, vuelve a la posición anterior y maneja el error
                filNueva = this.filAnterior;
                colNueva = this.colAnterior;
                this.fueraDeRango();
                continue;
            }
        
        //Verifico que hay dentro de ese nuevo movimiento:
           if(this.matriz[filNueva][colNueva] === 1){
                filNueva = this.filAnterior;
                colNueva = this.colAnterior; //Vuelven a su posición original. Porque no se pueden mover.
                alert("obstáculo");//Muestra el obstáculo en pantalla.
                continue;
            }

            if(this.matriz[filNueva][colNueva] === 99){
                alert("salida");
                this.mostrarMatriz();
                continue;
            }
            
            //Es pasillo: Actualizo mickey y donde estaba, le pongo 0.
            this.matriz[filNueva][colNueva] = 88;
            this.matriz[this.filAnterior][this.colAnterior] = 0;
            alert("mickey se ha movido en su nueva posición");
    
            
        }
    
        alert("SE HA ACABADO EL JUEGO");
        console.log("SE HA ACABADO EL JUEGO");
    
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

nuevoLaberinto.jugarAlLaberinto();






