class JuegoAhorcado extends Juego{
    constructor(){
        this.palabras = ['HOLA', 'ADIÓS', 'ALTURA', 'AGUA'];
        this.palabraAleatoria = '';
        this.palabraOculta = [];
        this.numeroJugadas = 0;
        this.letrasEscritas = [];
    }

    //LÓGICA JUEGO: 

  /*   escogerPalabraAleatoria(){
        let indiceA = Math.floor(Math.random() * this.palabras.length);
        this.palabraAleatoria = this.palabras[indiceA];
    
        // Inicializa palabraOculta con guiones bajos
        this.palabraOculta = Array(this.palabraAleatoria.length).fill('_'); //es un array llena de _ _ _ _
        console.log(this.palabraOculta);
        console.log(this.palabraAleatoria); 
    
        return [this.palabraAleatoria, this.palabraOculta];  
    }

    jugarAhorcado(){
    
        while(this.numeroJugadas <= 8){ 
            let letra = prompt("Introduce la letra").toLocaleUpperCase();
            if(this.letrasEscritas.includes(letra)){
                this.numeroJugadas++; // ha perdido una jugada
                console.log(this.numeroJugadas);
                alert("Esta letra ya la has introducido");
                continue; // lo hace más eficiente porque salta el resto del código y vuelve a empezar, ya sabemos que ha pasado con esa letra.
            }

            this.letrasEscritas.push(letra);

            //if(letra.length !== 1){ //Asegurarme de que solo intrudoce una letra.
                //numeroJugadas++; //pierde un turno por haberlo introducido mal. 
                //alert("Introduzca solo una letra");
                //continue; //Salta todo el resto del códgio del bucle y vuelve a empezar sin contar.
            //}


           
            this.letraEncontrada = false;
            for(let i = 0; i < this.palabraAleatoria.length; i++){
                if(letra === this.palabraAleatoria[i].toLocaleUpperCase()){
                    this.palabraOculta[i] = this.palabraAleatoria[i];
                    this.letraEncontrada = true;  
                }
            }

            if(!this.letraEncontrada){
                this.numeroJugadas++;
                console.log(this.numeroJugadas);
            }

            console.log(this.palabraOculta.join(' '));

         


            if(!this.palabraOculta.includes('_')){ //NO COMPARA BIEN LOS OBJETOS. //si hay espacios en blanco lo vale.
                alert("Ha completado la palabra, ha ganado!");
                return; //termina el juego.
            }
        }
  
        alert("Ha superado los intentos, ha perdido");
  
    }  */





    //MOVIMIENTO DOM DINÁMICO:
    //CREO UN MÉTODO PAARA QUE CADA VEZ QUE LA PERSONA FALLE EN UNA LETRA, SE LLAME A ÉSTE Y SE VAAYA IMPRIMIENDO EL "AHORCADO"

    crearTecladoPantalla(){ //crear teclado en pantalla. 
        let ahorcadoContainer = document.getElementById('ahorcado__container');
        let tecladoContainer = document.createElement('div'); //creo el contenedor para el teclado.
        tecladoContainer.classList.add('.teclado__container')//le añado la clase. 
        let fragment = document.createDocumentFragment();//Creo un fragmento.
        for(let x = 0; x < 26; x++){
            let div = document.createElement('div');//creo un div
            let parrafo = document.createElement('p');//añado a ese div un parrafo con la letra.
            div.classList.add('.letra__container');//añado las clases. 
            parrafo.classList.add('.letra__teclado');

            // Calcula la letra del abecedario usando el código ASCII
            parrafo.textContent = String.fromCharCode(65 + x); // 'A' es 65 en ASCII
            console.log(parrafo);

            div.appendChild(parrafo);
            fragment.appendChild(div);
        }

        tecladoContainer.appendChild(fragment);
        ahorcadoContainer.appendChild(tecladoContainer); //finalmente pego todo el fragmento de una vez. 
    }

    crearLetraDinamicamente(){ //crear el div con la letra que corresponda (depende de la que salga). 

    }   

    crearAhorcadoEnFallos(){ //que vayan saliendo 'palos' para marcar un error. 

    }
}


