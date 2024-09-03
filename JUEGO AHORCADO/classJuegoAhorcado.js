class JuegoAhorcado extends Juego{
    constructor(){
        this.palabras = ['HOLA', 'ADIÓS', 'ALTURA', 'AGUA'];
        this.palabraAleatoria = '';
        this.palabraOculta = [];
        this.numeroJugadas = 0;
        this.letrasEscritas = [];
        this.palabraCompletada = false;
    }

    iniciarJuego(){//de juego.

    }

    escogerPalabraAleatoria(){
        let indiceA = Math.floor(Math.random() * this.palabras.length);
        this.palabraAleatoria = this.palabras[indiceA];
    
        // Inicializa palabraOculta con guiones bajos
        this.palabraOculta = Array(this.palabraAleatoria.length).fill('_'); //es un array llena de _ _ _ _
        console.log(palabraOculta);
        console.log(palabraAleatoria); 
    
        return [this.palabraAleatoria, this.palabraOculta];  
    }

    jugarAhorcado(){
    
            while(this.numeroJugadas <= 8){ /* } && !palabraCompletada){ */
    
                //document.body.innerHTML = palabraOculta.join(' '); //primero me muestra la palabra.
    
                let letra = prompt("Introduce la letra").toLocaleUpperCase();
                if(this.letrasEscritas.includes(letra)){
                    numeroJugadas++; // ha perdido una jugada
                    console.log(numeroJugadas);
                    alert("Esta letra ya la has introducido");
                    continue; // lo hace más eficiente porque salta el resto del código y vuelve a empezar, ya sabemos que ha pasado con esa letra.
                }
    
                this.letrasEscritas.push(letra);
    
                //if(letra.length !== 1){ //Asegurarme de que solo intrudoce una letra.
                    //numeroJugadas++; //pierde un turno por haberlo introducido mal. 
                    //alert("Introduzca solo una letra");
                    //continue; //Salta todo el resto del códgio del bucle y vuelve a empezar sin contar.
                //}
    
               //no es necesario convertir la letra en array.
               
                let letraEncontrada = false;
                for(let i = 0; i < this.palabraAleatoria.length; i++){
                    if(letra === this.palabraAleatoria[i].toLocaleUpperCase()){
                        this.palabraOculta[i] = this.palabraAleatoria[i];
                        letraEncontrada = true;  
                    }
                }
    
                if(!letraEncontrada){
                    this.numeroJugadas++;
                    console.log(this.numeroJugadas);
                }
    
                console.log(this.palabraOculta.join(' '));
    
                //document.body.innerHTML = palabraOculta.join(' ');
    
    
                if(!this.palabraOculta.includes('_')){ //NO COMPARA BIEN LOS OBJETOS. //si hay espacios en blanco lo vale.
                    //palabraCompletada = true;
                    alert("Ha completado la palabra, ha ganado!");
                    return; //termina el juego.
                }
            }
        
    
        //if(numeroJugadas > 8){//&& !palabraCompletada) 
            //si he llegado aqui es porque no ha completado la palabra. 
            alert("Ha superado los intentos, ha perdido");
            document.body.innerHTML += 'La palabra era: ' + palabraAleatoria.join(' ');
        //}
    }

    finalizarJuego(){//de juego. 

    }

   //DOM:

   mostrarLetra(){

   }

   mostrarFallo(){

   }

   


}

const juegoAhorcado =  new JuegoAhorcado();
juegoAhorcado.escogerPalabraAleatoria();

juegoAhorcado.juegarAhorcado(palabraAleatoria, palabraOculta);