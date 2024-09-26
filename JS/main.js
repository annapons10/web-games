//SIN PROGRAMACIÓN ORIENTADA A OBJETOS: 
//MODULAR HEADER Y FOOTER: 
console.log("se carga main");

fetch('header.html') //TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML ¿ya esta accesible?
    .then(response => response.text())
    .then(data =>{
        document.getElementById('header').innerHTML = data
    });



fetch('footer.html') //TRAIGO LO QUE HAY EN footer.HTML PERO ESTOY EN INDEX.HTML
    .then(response => response.text())
    .then(data =>{
        document.getElementById('footer').innerHTML = data
    });

const app = new GameApp();
app.loadContent('Home');

let juegos = [
    new Juego('Ahorcado', 'Juego de Palabras', 0),
    new Juego('Serpiente', 'Acción', 0),
    new Juego('Memoria', 'Habilidad Mental', 0),
    new Juego('Tres en raya', 'Estrategia', 0), 
    new Juego('Laberinto', 'Habilidad Mental', 0)
];

juegos.forEach(game =>{ //LLeno la app de juegos. Su array. 
    app.addGame(game);
});

app.showGame(); 




//hamburguesa:
/* let resultado = app.comprobarPantalla();

if(resultado){
    let navCerrado = document.getElementsByClassName('header__nav')[0]; // undefined
  
    console.log(`este es el headerNav despues de fetch ${navCerrado}`);
   
    navCerrado.classList.add('header__closed');
    

} */



/* const buttonsHeader = document.querySelectorAll('button-header'); //cojo los botones. Y para todos los botones: 
console.log(buttonsHeader);
const navMenu = document.querySelector('header-nav');
 */
/* //Hago el evento click de los botones menú hamburguesa para añadir que se cierre cuando se de click a alguno. 
buttonsHeader.forEach( button =>{
    button.addEventListener('click', () =>{
        const content = button.textContent; //cojo el contenido del boton para marcarme el contenido sin espacios al principio ni al final con trim(). 
        app.loadContent(content);

        navMenu.classList.add('header__closed'); //PARA CERRAR EL MENÚ.
    });
}); */





