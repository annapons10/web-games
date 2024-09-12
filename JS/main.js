//SIN PROGRAMACIÓN ORIENTADA A OBJETOS: 
//MODULAR HEADER Y FOOTER: 
console.log("se carga main");

fetch('header.html') //TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML ¿ya esta accesible?
    .then(response => response.text())
    .then(data =>{
        document.getElementById('header').innerHTML = data;
        //PARA CERRAR HAMBURGUESA:
        let elementosMenu = document.querySelectorAll('.nav-links > li'); //Devuelve un array. 
        elementosMenu.forEach(elemento => {
            elemento.addEventListener('click', ()=>{
                document.getElementById('open-menu').checked = false; //checked accede a la propiedad de html que esta aunque no lo vea. 
            });
        });
    });



fetch('footer.html') //TRAIGO LO QUE HAY EN footer.HTML PERO ESTOY EN INDEX.HTML
    .then(response => response.text())
    .then(data =>{
        document.getElementById('footer').innerHTML = data
    });

const app = new GameApp();
app.loadContent('Home');

let juegos = [ //SE CARGAN ESTOS JUEGOS A LA GAMEAPP 
    new JuegoAhorcado(),
    new JuegoLaberinto()
];


juegos.forEach(game =>{ //LLeno la app de juegos. Su array. 
    app.addGame(game);
});

app.showGame(); 









