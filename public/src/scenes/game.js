import ArrayWord from "../../assets/js/array-word.js";
import { createDesertBackground } from './backgroundUtils';

export class gamescene extends Phaser.Scene{
    constructor(){
        super({key:'gamescene'});
        this.formattedText = "";
        this.nextWord = "";
        this.scaleToken
    }

    init(data) {
        const elements = this.scene.get('elements');
        //elements.drawLoadingScreen(this)

    }

    preload() {
        createDesertBackground(this, width, height, mid_w, mid_h);
        
    }

    create() {
        const elements = this.scene.get('elements');

        

        const max_size_selection = width * .46;
        const padding = 40;

        //container principal, donde se renderizan los avatares, aca puede ir en cualquier coordenada, los elementos se renderinzan dentro de este contenedor
        const selectionBoard = this.add.sprite(
            max_size_selection/2+padding,
            mid_h+50,
            "ui",
            'container_square_big'
        ).setOrigin(.5, .5).setScale(1).setDepth(1).setDisplaySize(max_size_selection, max_size_selection);

        const cols = 3;
        const rows = 3;
        const totalAvatars = this.textures.get('ui').getFrameNames().filter(name => name.includes('avatar_')).length;//obtenemos todos los frames que contienen "avatar_".
        const avatarsToShow = 9;
        const paddingX = 10;
        const paddingY = 10;

        // Función para obtener 9 avatares aleatorios, se asegura de no repetir


        // Función para renderizar avatares, se llama cada vez que se necesita actualizar la cuadrícula
        const renderRandomAvatars = () => {
            if (this.gridSprites) {
                this.gridSprites.forEach(s => s.destroy());
            }
            this.gridSprites = [];

            const grid = gridify(selectionBoard, rows, cols, paddingX, paddingY);
            const randomAvatars = playerStats.board;;

            //Aca guardamos el tablero seleccionado en playerStats para usarlo en el juego
            console.log("Tablero CARGADO desde variable en globals playerStats:", randomAvatars);
            playerStats.board=randomAvatars;


            //Ya tenemos el array randomAvatars con los 9 avatares a mostrar, ahora renderizamos el cuadrado blanco y encima el avatar
            for (let i = 0; i < avatarsToShow; i++) {
                const cell = grid[i];
                const sprite = this.add.sprite(
                    cell.x + paddingX,
                    cell.y + paddingY,
                    "ui",
                    'container_square_small'
                ).setOrigin(.5, .5).setScale(1).setDepth(1)
                .setDisplaySize(max_size_selection / 3 - paddingX, max_size_selection / 3 - paddingY).setInteractive();
                sprite.on('pointerdown', () => {
                    this.selectedAvatar = randomAvatars[i];
                    console.log("Avatar picado, que hacemos ahora?", this.selectedAvatar);
                    // Aquí puedes agregar lógica adicional para manejar el avatar seleccionado
                });

                const avatar = this.add.sprite(
                    cell.x + paddingX,
                    cell.y + paddingY,
                    "ui",
                    randomAvatars[i]
                ).setOrigin(.5, .5).setScale(1).setDepth(1)
                .setDisplaySize(max_size_selection / 3 - paddingX, max_size_selection / 3 - paddingY);

                this.gridSprites.push(sprite, avatar);
            }

            
        };

        // Botón de Continuar
        const playGameBtn = this.add.sprite(
            width * 0.80,//Situa el boton al 80% del width
            selectionBoard.getBottomCenter().y-50,
            'ui',
            'btn_green'
        ).setOrigin(.5, .5).setScale(1.4).setDepth(1).setInteractive();
        this.add.text(
            playGameBtn.x,
            playGameBtn.y,
            'Finalizar',
            { 
                fontFamily: 'Arial',
                fontSize: '2rem', 
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 6,
            }   
        ).setDepth(2).setOrigin(0.5);

        // Evento del botón, vamos al countdown, ese mismo countdown al termina ejecuta la escena Game, cambiar si es necesario
        playGameBtn.on('pointerdown', () => {
            //Terminamos game si el tablero esta lleno
            console.log("Juego terminado, este boton no deberia estar aca, pero por ahora sirve para pruebas");

        });


        // Primera renderización aleatoria
        renderRandomAvatars();
    }

    
}

function gridify(item, rows, cols, paddingX, paddingY) {
    const grid = [];
    const itemWidth = item.displayWidth;
    const itemHeight = item.displayHeight;

    const cellWidth = (itemWidth - (paddingX * (cols - 1))) / cols;
    const cellHeight = (itemHeight - (paddingY * (rows - 1))) / rows;

    const startX = item.x - itemWidth / 2;
    const startY = item.y - itemHeight / 2;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = startX + col * cellWidth + cellWidth / 2;
            const y = startY + row * cellHeight + cellHeight / 2;
            grid.push({ x, y });
        }
    }

    return grid;
}

function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}