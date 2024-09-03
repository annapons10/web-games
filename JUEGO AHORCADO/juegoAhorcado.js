

//CONVIERTO LOS ARRAYS EN STRINGS PARA MOSTRAR EN EL DOCUMENTO. 

function escogePalabraAleatoria (palabras){
    let indiceA = Math.floor(Math.random() * palabras.length);
    let palabraAleatoria = palabras[indiceA].split("");
    let palabraOculta;

    document.getElementById("palabra_oculta").innerHTML = Array(palabraAleatoria.length).fill('_');
    palabraOculta = Array(palabraAleatoria.length).fill('_'); //es un array
    console.log(palabraOculta);
    console.log(palabraAleatoria); 
   
    return [palabraAleatoria, palabraOculta];  
} 

function juegoAhorcado (palabraAleatoria, palabraOculta){
    let numeroJugadas = 0;
    let letrasEscritas = [];
    let palabraCompletada = false;

        while(numeroJugadas <= 8){ /* } && !palabraCompletada){ */

            //document.body.innerHTML = palabraOculta.join(' '); //primero me muestra la palabra.

            let letra = prompt("Introduce la letra").toLocaleUpperCase();
            if(letrasEscritas.includes(letra)){
                numeroJugadas++; // ha perdido una jugada
                console.log(numeroJugadas);
                alert("Esta letra ya la has introducido");
                continue; // lo hace más eficiente porque salta el resto del código y vuelve a empezar, ya sabemos que ha pasado con esa letra.
            }

            letrasEscritas.push(letra);

            //if(letra.length !== 1){ //Asegurarme de que solo intrudoce una letra.
                //numeroJugadas++; //pierde un turno por haberlo introducido mal. 
                //alert("Introduzca solo una letra");
                //continue; //Salta todo el resto del códgio del bucle y vuelve a empezar sin contar.
            //}

           //no es necesario convertir la letra en array.
           
            let letraEncontrada = false;
            for(let i = 0; i < palabraAleatoria.length; i++){
                if(letra === palabraAleatoria[i].toLocaleUpperCase()){
                    palabraOculta[i] = palabraAleatoria[i];
                    letraEncontrada = true;  
                }
            }

            if(!letraEncontrada){
                numeroJugadas++;
                console.log(numeroJugadas);
            }

            console.log(palabraOculta.join(' '));

            //document.body.innerHTML = palabraOculta.join(' ');


            if(!palabraOculta.includes('_')){ //NO COMPARA BIEN LOS OBJETOS. //si hay espacios en blanco lo vale.
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
 



let palabras = ['HOLA', 'ADIÓS', 'ALTURA', 'AGUA'];

let palabraAleatoria;
let palabraOculta;

[palabraAleatoria, palabraOculta] = escogePalabraAleatoria(palabras);
console.log(palabraAleatoria);
console.log(palabraOculta);

juegoAhorcado(palabraAleatoria, palabraOculta);
