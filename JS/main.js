//SIN PROGRAMACIÓN ORIENTADA A OBJETOS: 
//MODULAR HEADER Y FOOTER: 

fetch('header.html') //TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML
    .then(response => response.text())
    .then(data =>{
        document.getElementById('header').innerHTML = data
    });

fetch('footer.html') //TRAIGO LO QUE HAY EN footer.HTML PERO ESTOY EN INDEX.HTML
    .then(response => response.text())
    .then(data =>{
        document.getElementById('footer').innerHTML = data
    });

let app = new GameApp();
app.loadContent('Home');

let games = [
    new Videojuego('The Legend of Zelda', 'Nintendo Switch', 'Action-adventure', 2017),
    new Videojuego('God of War', 'PlayStation 4', 'Action', 2018),
    new Videojuego('Red Dead Redemption 2', 'PlayStation 4, Xbox One', 'Action-adventure', 2018),
    new Videojuego('The Witcher 3: Wild Hunt', 'PlayStation 4, Xbox One, PC', 'RPG', 2015),
    new Videojuego('Minecraft', 'Multiple', 'Sandbox, Survival', 2011),
    new Videojuego('Hollow Knight', 'PC, Nintendo Switch', 'Metroidvania', 2017),
    new Videojuego('Celeste', 'PC, Nintendo Switch', 'Platformer', 2018),
    new Videojuego('Stardew Valley', 'PC, Multiple', 'Simulation, RPG', 2016),
    new Videojuego('Super Mario Odyssey', 'Nintendo Switch', 'Platformer', 2017),
    new Videojuego('Hades', 'PC, Nintendo Switch', 'Roguelike', 2020)
];

games.forEach(game =>{ //LLeno la app de juegos. Su array. 
    app.addGame(game);
})






