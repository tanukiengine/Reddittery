import { AUTO } from "phaser";
import { createDesertBackground } from './backgroundUtils';


export class startScene extends Phaser.Scene{
    constructor(){
        super({key:'startScene'});
    }

    

    create(){

        const elements = this.scene.get('elements');//trae distintos elementos del juego
        const animotions = this.scene.get('animotions');//ejecuta animaciones genericas
        
        
        createDesertBackground(this, width, height, mid_w, mid_h);

        const logo_redditery=this.add.sprite(mid_w, 10, 'ui', 'logo_redditery').setOrigin(.5, 0).setScale(1);
        const logo_reddit=this.add.sprite(10, 10, 'ui', 'logo_reddit').setOrigin(0, 0).setScale(.5);
        // Efecto heartbeat para logo_reddit
        this.tweens.add({
            targets: logo_reddit,
            scale: { from: 1, to: 1.05 },
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.tweens.add({
            targets: logo_redditery,
            y: 20,
            duration: 2000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });


        var initialX = 150;
        let playerStatsModal; // Referencia al modal
        let modalVisible = false;

        // Datos de ejemplo del jugador
        const currentPlayer=getPlayerByName('Player3')

        const playerSprite = this.add.sprite(width - 100, 100, 'ui', currentPlayer.avatar).setOrigin(.5, .5).setScale(1.8).setInteractive();
        this.add.text(playerSprite.getCenter().x, playerSprite.getBottomCenter().y + 20, currentPlayer.name, { fontFamily: 'Arial', fontSize: '25px', fontStyle: 'bold', color: '#fff', stroke: '#512059' }).setOrigin(.5, .5);
        playerSprite.on('pointerdown', () => {
            if (this.modalVisible) return;
            this.modalVisible = true;
            showPlayerStatsModal(this, currentPlayer, null);
        });

        // Datos de ejemplo para la tabla de clasificación
        const playerStatsGlobal = window.randomPlayers;
        for (let i = 0; i < 5; i++) {
            const scoreboard = this.add.sprite(initialX, height - 120, 'ui', 'container_square').setOrigin(.5, .5).setScale(1.5);
            const globe = this.add.sprite(scoreboard.getTopRight().x - ((scoreboard.width * 1.5) / 3), scoreboard.getTopLeft().y + 30, 'ui', 'position_globe').setOrigin(0, 1).setScale(1.5);
            this.add.text(globe.x + 30, globe.y - 18, (i + 1), { fontFamily: 'Arial', fontSize: '30px', fontStyle: 'bold', color: '#000' }).setOrigin(0, 1);

            if (playerStatsGlobal[i]) {
                this.add.text(scoreboard.getCenter().x, scoreboard.getBottomCenter().y - 30, playerStatsGlobal[i].name, { fontFamily: 'Arial', fontSize: '25px', fontStyle: 'bold', color: '#fff', stroke: '#512059' }).setOrigin(.5, .5);
                const avatarSprite = this.add.sprite(scoreboard.getCenter().x, scoreboard.getCenter().y - 20, 'ui', playerStatsGlobal[i].avatar).setOrigin(.5, .5).setScale(.9).setInteractive();

                // Evento para mostrar el modal al hacer click en el avatar
                avatarSprite.on('pointerdown', () => {
                    if (this.modalVisible) return;
                    this.modalVisible = true;
                    showPlayerStatsModal(this, playerStatsGlobal[i], i + 1);
                });
            } else {
                this.add.text(scoreboard.getCenter().x, scoreboard.getBottomCenter().y - 30, 'Vacancy', { fontFamily: 'Arial', fontSize: '25px', fontStyle: 'bold', color: '#fff', stroke: '#512059' }).setOrigin(.5, .5);
            }

            initialX += 200;
        }


        const start_btn=this.add.sprite(mid_w, mid_h, 'ui', 'btn_1').setOrigin(.5,0).setScale(1.5).setInteractive();
        const btn_start_text=this.add.text(start_btn.getCenter().x, start_btn.getCenter().y, 'START', { fontFamily: 'Arial', fontSize: '30px', fontStyle: 'bold', color: '#fff', stroke: '#512059', strokeThickness: 6 }).setOrigin(.5,.5);

        // Animación de parpadeo estilo retro
        this.tweens.add({
            targets: [start_btn, btn_start_text],
            alpha: { from: 1, to: 0.6 },
            duration: 400,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        start_btn.on("pointerdown", () => {
            elements.originScreen.push("startScene");
            this.scene.start('howtoPlay');
        });
    }
    
}

function showPlayerStatsModal(scene, player, rank) {
    const modalWidth = width / 2;
    const modalHeight = height / 2;
    const modalX = mid_w - modalWidth / 2;
    const modalY = mid_h - modalHeight / 2;

    // Fondo modal
    const modalBg = scene.add.rectangle(modalX, modalY, modalWidth, modalHeight, 0x222244, 0.95)
        .setOrigin(0, 0)
        .setStrokeStyle(4, 0xffffff)
        .setDepth(100);

    // Avatar grande
    const avatar = scene.add.sprite(modalX + modalWidth / 2, modalY + 90, 'ui', player.avatar)
        .setOrigin(.5, .5)
        .setScale(2)
        .setDepth(101);

    // Nombre
    const nameText = scene.add.text(modalX + modalWidth / 2, modalY + 170, player.name, {
        fontFamily: 'Arial',
        fontSize: '32px',
        fontStyle: 'bold',
        color: '#fff',
        stroke: '#512059',
        strokeThickness: 4
    }).setOrigin(.5, 0).setDepth(101);

    // Rank
    const rankText = scene.add.text(modalX + 60, modalY + 230, `Rank: ${rank}`, {
        fontFamily: 'Arial',
        fontSize: '28px',
        color: '#fff'
    }).setOrigin(0, 0).setDepth(101);

    // Score
    const scoreText = scene.add.text(modalX + 60, modalY + 270, `Score: ${player.score}`, {
        fontFamily: 'Arial',
        fontSize: '28px',
        color: '#fff'
    }).setOrigin(0, 0).setDepth(101);

    // Velocidad de reacción
    const reactionText = scene.add.text(modalX + 60, modalY + 310, `Velocidad de reacción: ${player.reaction} ms`, {
        fontFamily: 'Arial',
        fontSize: '28px',
        color: '#fff'
    }).setOrigin(0, 0).setDepth(101);

    // Botón para cerrar el modal
    const closeBtn = scene.add.text(modalX + modalWidth - 40, modalY + 20, 'X', {
        fontFamily: 'Arial',
        fontSize: '32px',
        color: '#fff',
        backgroundColor: '#512059'
    }).setOrigin(.5, .5).setDepth(102).setInteractive();

    closeBtn.on('pointerdown', () => {
        scene.children.list.filter(child => child.depth >= 100).forEach(child => child.destroy());
        scene.modalVisible = false; // Resetear aquí
    });

    // Guarda referencia si necesitas
    scene.playerStatsModal = [modalBg, avatar, nameText, rankText, scoreText, reactionText, closeBtn];
}