class Videojuego {

    constructor(titulo, genero, año, plataforma){
        this.titulo = titulo;
        this.genero = genero;
        this.año = año;
        this.plataforma = plataforma;
    }

    render(){
        return `
            <div class="gameItem">
                <div class="title"><h3>${this.titulo}</h3></div>
                <div class="details">
                    <p>Género: ${this.genero}</p>
                    <p>Año: ${this.año}</p>
                    <p>Plataforma: ${this.plataforma}</p>
                </div>
            </div>
        `
    }
}