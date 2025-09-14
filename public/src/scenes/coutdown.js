import ArrayWord from "../../assets/js/array-word.js";
import { createDesertBackground } from './backgroundUtils';

export class countdown extends Phaser.Scene{
    constructor(){
        super({key:'countdown'});
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

        let textObj = this.add.text(mid_w, mid_h, "3", {
            fontFamily: 'Arial',
            fontSize: '15rem',
            color: '#fff',
            stroke: '#512059',
            strokeThickness: 4,
            wordWrap: { width: width * 0.8, useAdvancedWrap: true } // Limita el ancho al 80% de la ventana
        }).setOrigin(.5, .5);

        // Estrategia alternativa: usar una función async con await y setTimeout
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        const instructions = ["Ready","Set","Go!"];

        async function countdownAsync(ctx) {
            var speechSound=1;
            for (let line of instructions) {
                ctx.sound.play('countdown_'+speechSound);
                speechSound++;
                textObj.setText(line);
                await sleep(800);
                textObj.setText("");
            }
            this.scene.start('game');
        }

        countdownAsync(this);
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