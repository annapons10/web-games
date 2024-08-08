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

function loadContent(page){
    if(page === 'Home'){
        fetch('home.html') //TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML
            .then(response => response.text())
            .then(data =>{
                document.getElementById('main').innerHTML = data
            });
    }else if(page === 'Chat'){
        fetch('chat.html') //TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML
            .then(response => response.text())
            .then(data =>{
                document.getElementById('main').innerHTML = data
            });

    }else if(page === 'Mis juegos'){
        fetch('misJuegos.html') //TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML
            .then(response => response.text())
            .then(data =>{
                document.getElementById('main').innerHTML = data
            });

    }else if(page === 'Mi usuario'){
        fetch('miUsuario.html') //TRAIGO LO QUE HAY EN HEADER.HTML PERO ESTOY EN INDEX.HTML
            .then(response => response.text())
            .then(data =>{
                document.getElementById('main').innerHTML = data
            });
    }
}

loadContent('Home');