import ArrayWord from "../../assets/js/array-word.js";
import { createDesertBackground } from './backgroundUtils';

export class build_board extends Phaser.Scene{
    constructor(){
        super({key:'build_board'});
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
        this.add.text(mid_w, 80, "Choose your board", {
            fontFamily: 'Arial',
            fontSize: '6rem',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 10,
        }).setDepth(2).setOrigin(0.5);

        const max_size_selection = width * .46;
        const padding = 40;

        //container principal, donde se renderizan los avatares
        const selectionBoard = this.add.sprite(
            mid_w-100,
            mid_h+50,
            "ui",
            'container_square_big'
        ).setOrigin(.5, .5).setScale(1).setDepth(1).setDisplaySize(max_size_selection, max_size_selection);

        const cols = 3;
        const rows = 3;
        const totalAvatars = 16;
        const avatarsToShow = 9;
        const paddingX = 10;
        const paddingY = 10;

        // Función para obtener 9 avatares aleatorios
        const getRandomAvatars = () => {
            const avatars = Array.from({length: totalAvatars}, (_, i) => i + 1); // [1,2,3,...,16]
            let randomAvatars = [];
            for (let i = 0; i < avatarsToShow; i++) {
                const randomIndex = Math.floor(Math.random() * avatars.length);
                randomAvatars.push("avatar_"+avatars.splice(randomIndex, 1)[0]);
            }
            return randomAvatars;
        };

        // Función para renderizar avatares
        const renderRandomAvatars = () => {
            if (this.gridSprites) {
                this.gridSprites.forEach(s => s.destroy());
            }
            this.gridSprites = [];

            const grid = gridify(selectionBoard, rows, cols, paddingX, paddingY);
            const randomAvatars = getRandomAvatars();
            playerStats.board=randomAvatars;
            console.log("Random avatars rendered:", randomAvatars);
            for (let i = 0; i < avatarsToShow; i++) {
                const cell = grid[i];
                const sprite = this.add.sprite(
                    cell.x + paddingX,
                    cell.y + paddingY,
                    "ui",
                    'container_square_small'
                ).setOrigin(.5, .5).setScale(1).setDepth(1)
                .setDisplaySize(max_size_selection / 3 - paddingX, max_size_selection / 3 - paddingY);

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

        // Botón de Continuar y boton de randomizar
        const playGameBtn = this.add.sprite(
            width * 0.80,//Situa el boton al 80% del width
            selectionBoard.getBottomCenter().y-50,
            'ui',
            'btn_green'
        ).setOrigin(.5, .5).setScale(1.4).setDepth(1).setInteractive();
        this.add.text(
            playGameBtn.x,
            playGameBtn.y,
            'Play Now!',
            { 
                fontFamily: 'Arial',
                fontSize: '2rem', 
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 6,
            }   
        ).setDepth(2).setOrigin(0.5);

        // Evento del botón
        playGameBtn.on('pointerdown', () => {
            this.scene.start('countdown');
        });

        const randomizeButton = this.add.sprite(
            playGameBtn.getTopCenter().x,//Situa el boton al 80% del width
            playGameBtn.getTopCenter().y - 40,
            'ui',
            'btn_1'
        ).setOrigin(.5, .5).setScale(1.4).setDepth(1).setInteractive();
        this.add.text(
            randomizeButton.x,
            randomizeButton.y,
            'Randomize',
            { 
                fontFamily: 'Arial',
                fontSize: '1.3rem', 
                fill: '#fff',
                stroke: '#000',
                strokeThickness: 6,
            }   
        ).setDepth(2).setOrigin(0.5);

        // Evento del botón
        randomizeButton.on('pointerdown', () => {
            renderRandomAvatars();
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