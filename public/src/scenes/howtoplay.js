import ArrayWord from "../../assets/js/array-word.js";
import { createDesertBackground } from './backgroundUtils';

export class howToPlay extends Phaser.Scene{
    constructor(){
        super({key:'howtoPlay'});
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
        elements.showBtnReturn(this, '', 'startScene');
        this.add.sprite(mid_w, 20, "ui", 'text_howto').setOrigin(.5, 0).setScale(2);
        this.anims.create({ key : "pet_1_anim_play",frames: this.anims.generateFrameNames("pet_1_anim",{start: 1,end:4}),frameRate: 1, repeat:-1});
        var petSprite=this.physics.add.sprite(mid_w/2, mid_h+mid_h/2, "pet_1").setScale(1).setOrigin(.5,.5).setDepth(2);
        petSprite.anims.play("pet_1_anim_play",true);

        // Elipse debajo del sprite
        const ellipse = this.add.graphics();
        ellipse.fillStyle("#fff", .5); // color y opacidad
        ellipse.fillEllipse(petSprite.x+20, petSprite.y + petSprite.displayHeight / 2-40 , petSprite.displayWidth * 0.8, 18);
        ellipse.setDepth(petSprite.depth - 1); // Asegura que quede detrás del sprite


        this.tweens.add({
            targets: petSprite,
            displayHeight: petSprite.displayHeight + 2,
            displayWidth: petSprite.displayWidth + 2,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        const skipText=this.add.text(mid_w, height - 100, "Tap to skip", {
            fontFamily: 'Arial',
            fontSize: '3rem',
            color: '#fff',
            align: 'center',
            stroke: '#000',
            strokeThickness: 10,
        }).setOrigin(.5,.5).setDepth(2);

        this.tweens.add({
            targets: skipText,
            y: skipText.y - 10,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        let instructions = ["STEP RIGHT UP, AMIGO!",
        "HERE’S HOW THE MAGIC OF LOTERÍA WORKS:",
        "BUILD YOUR BOARD — PICK YOUR FAVORITE CARDS AND SET THE STAGE.",
        "THE CALLER (THAT’S ME!) WILL SING OUT A RANDOM CARD. ",
        "IF IT’S ON YOUR BOARD, TAP THAT SPACE QUICK-QUICK!",
        "KEEP TAPPING UNTIL YOUR WHOLE BOARD IS SHINING WITH MARKS.",
        "AND WHEN IT’S FULL ... OH-HO! THE VICTORY BUTTON APPEARS!",
        "SMASH IT WITH PRIDE AND SHOUT: LOTERÍA!",
        "NOW GO ON, SHOW ME THOSE FAST FINGERS!"];

        let textObj = this.add.text(mid_w, mid_h/2, "", {
            fontFamily: 'Arial',
            fontSize: '3rem',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 10,
            wordWrap: { width: width * 0.8, useAdvancedWrap: true } // Limita el ancho al 80% de la ventana
        }).setOrigin(.5, 0);

        // Estrategia alternativa: usar una función async con await y setTimeout
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

        let manualSkip = false;
        let skipCurrentLine = false;

        this.input.on('pointerdown', () => {
            manualSkip = true;
            skipCurrentLine = true;
        });
        var defaultWriteLetter=40;
        async function showInstructionsAsync(ctx) {
            var speechSound = 1;
            for (let line of instructions) {
                skipCurrentLine = false;
                if (!manualSkip) ctx.sound.play('speech_' + speechSound);
                speechSound++;
                // Efecto máquina de escribir letra por letra
                for (let i = 1; i <= line.length; i++) {
                    if (skipCurrentLine) {
                        defaultWriteLetter=5
                        textObj.setText(line); // Muestra la línea completa si el usuario da click
                        break;
                    }
                    textObj.setText(line.substring(0, i));
                    await sleep(defaultWriteLetter);
                }
                if (!manualSkip) {
                    await sleep(2000);
                    textObj.setText("");
                } else {
                    // Espera a que el usuario haga click para pasar a la siguiente línea
                    await new Promise(resolve => {
                        const handler = () => {
                            ctx.input.off('pointerdown', handler);
                            resolve();
                        };
                        ctx.input.once('pointerdown', handler);
                    });
                    textObj.setText("");
                }
            }

            ctx.add.sprite(skipText.x, skipText.y, "ui", 'btn_green').setOrigin(.5, .5).setScale(2).setDepth(3);
            ctx.add.text(skipText.x, skipText.y, "Got it!", {
                fontFamily: 'Arial',
                fontSize: '3.5rem',
                color: '#fff',
                stroke: '#000',
                strokeThickness: 10,
            }).setOrigin(.5, .5).setDepth(4).setInteractive().on('pointerdown', () => {
                ctx.scene.start('countdown');
            });
        }

        showInstructionsAsync(this);
    }

    
}

function loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}