class GameApp{
    constructor(){
        this.videojuegos = [];
    }

    loadContent(page){
        if(page === 'Home'){
            fetch('home.html') //TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                });
        }else if(page === 'Chat'){
            fetch('chat.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                });
    
        }else if(page === 'Mis juegos'){
            fetch('misJuegos.html') 
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                });
    
        }else if(page === 'Mi usuario'){
            fetch('miUsuario.html')
                .then(response => response.text())
                .then(data =>{
                    document.getElementById('main').innerHTML = data
                });
        }
    }

    addGame(game){
        this.videojuegos.push(game);
    }
    
   
}