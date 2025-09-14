// This file contains the main JavaScript logic for the game "The Next Word" using Phaser.js.
import './globals.js';
import Phaser from 'phaser';


import { animotions } from "./animations/animations.js";
import {elements} from "./scenes/elements.js";
import { bootLoader } from "./scenes/bootLoader.js";
import { preloadScene } from "./scenes/preload.js";
import { startScene } from "./scenes/startScene.js";
import { howToPlay } from "./scenes/howtoplay.js";
import { countdown } from "./scenes/coutdown.js";
import { build_board } from "./scenes/build_board.js";

// Configuración del juego


const game = new Phaser.Game({
    type:Phaser.WEBGL,
    roundPixels:true,
    pixelArt:true,
    scale: {
        parent: 'game-container',
        width: window.innerWidth,
        height: window.innerHeight,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    },
    backgroundColor: '#000000',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0, x: 0 },
        debug: false,
      },
    },
    scene: [bootLoader,preloadScene,startScene,elements,animotions,howToPlay,countdown,build_board],
})

game.scene.start('bootLoader');

