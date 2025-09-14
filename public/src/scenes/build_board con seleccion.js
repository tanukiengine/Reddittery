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
        const max_size_selection = width * .46;
        const padding = 40;
        const selectionBoard = this.add.sprite(
            max_size_selection / 2 + padding,
            height - max_size_selection / 2 - padding,
            "ui",
            'container_square_big'
        ).setOrigin(.5, .5).setScale(1).setDepth(1).setDisplaySize(max_size_selection, max_size_selection);

        const cols = 3;
        const rows = 3;
        const totalAvatars = 16;
        const paddingX = 10;
        const paddingY = 10;

        let currentPage = 0;
        const itemsPerPage = 9;

        // Función para renderizar la página actual de avatares
        const renderAvatarPage = (page) => {
            // Elimina los sprites previos
            if (this.gridSprites) {
                this.gridSprites.forEach(s => s.destroy());
            }
            this.gridSprites = [];

            const startIndex = page * itemsPerPage;
            const grid = gridify(selectionBoard, rows, cols, paddingX, paddingY);

            for (let i = 0; i < itemsPerPage; i++) {
                const avatarIndex = startIndex + i;
                if (avatarIndex < totalAvatars) { // Solo si hay más avatares para mostrar
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
                        'avatar_' + (avatarIndex + 1)
                    ).setOrigin(.5, .5).setScale(1).setDepth(1)
                    .setDisplaySize(max_size_selection / 3 - paddingX, max_size_selection / 3 - paddingY);

                    this.gridSprites.push(sprite, avatar);
                }
            }
        };

        // Botón Anterior
        const prevButton = this.add.sprite(
            selectionBoard.x - selectionBoard.displayWidth/2 - 20,
            selectionBoard.y,
            'ui',
            'btn_return'
        ).setOrigin(.5, .5).setScale(0.8).setDepth(1).setInteractive();

        // Botón Siguiente
        const nextButton = this.add.sprite(
            selectionBoard.x + selectionBoard.displayWidth/2 + 20,
            selectionBoard.y,
            'ui',
            'btn_return'
        ).setOrigin(.5, .5).setScale(0.8).setDepth(1).setFlipX(true).setInteractive();

        // Eventos de los botones
        prevButton.on('pointerdown', () => {
            if (currentPage > 0) {
                currentPage--;
                renderAvatarPage(currentPage);
            }
        });

        nextButton.on('pointerdown', () => {
            if ((currentPage + 1) * itemsPerPage < totalAvatars) {
                currentPage++;
                renderAvatarPage(currentPage);
            }
        });

        // Mostrar la primera página
        renderAvatarPage(0);

        // Actualizar visibilidad de los botones
        const updateButtonsVisibility = () => {
            prevButton.setAlpha(currentPage > 0 ? 1 : 0.5);
            nextButton.setAlpha((currentPage + 1) * itemsPerPage < totalAvatars ? 1 : 0.5);
        };
        
        updateButtonsVisibility();
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