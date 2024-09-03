

function mostrar(matriz){
    for(let x = 0; x < 3; x++){
        
        console.log(matriz[x]);
        
    }
}

let matriz = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 1)); // Llena con 1
matriz[1][1] = 3;
mostrar(matriz);