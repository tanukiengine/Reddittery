

export class preloadScene extends Phaser.Scene{
    constructor(){
        super({key:'preloadScene'});
    }

    init ()
    {
        const elements = this.scene.get('elements');
        elements.drawLoadingScreen(this)
    }

    preload(){
        //aca meter todos los elementos graficos a cargar, al menos para las pantallas generales, para los juegos requerir pantalla de carga con sus assets

        
            this.load.image('bg_main', 'assets/game/bg_main.png');
            //this.load.image('bg_modes', 'assets/game/bg_modes.png');
            //this.load.image('bg_game_sel', 'assets/game/bg_game_sel.png');
            //this.load.image('bg_game', 'assets/game/bg_game.png');
            this.load.image('btn_return', 'assets/game/btn_return.png');



     

            
            //graficos genericos usables en cualquier lado
            


        
            //Music     
            //this.load.audio('inGame',  'assets/music/background.wav');
            //this.load.audio('applause',  'assets/music/applause.ogg');
            //this.load.audio('coin',  'assets/music/coin.wav');
            //this.load.audio('cancel',  'assets/music/cancel.wav');
            //this.load.audio('success',  'assets/music/success.ogg');
            //this.load.audio('mainscreen',  'assets/music/mainscreen.wav');

            //audio effects
            this.load.audio('speech_1',  'assets/audio_sfx/speech_1.ogg');
            this.load.audio('speech_2',  'assets/audio_sfx/speech_2.ogg');
            this.load.audio('speech_3',  'assets/audio_sfx/speech_3.ogg');
            this.load.audio('speech_4',  'assets/audio_sfx/speech_4.ogg');
            this.load.audio('speech_5',  'assets/audio_sfx/speech_5.ogg');
            this.load.audio('speech_6',  'assets/audio_sfx/speech_6.ogg');
            this.load.audio('speech_7',  'assets/audio_sfx/speech_7.ogg');
            this.load.audio('speech_8',  'assets/audio_sfx/speech_8.ogg');
            this.load.audio('speech_9',  'assets/audio_sfx/speech_9.ogg');

            this.load.audio('countdown_1',  'assets/audio_sfx/countdown_1.ogg');
            this.load.audio('countdown_2',  'assets/audio_sfx/countdown_2.ogg');
            this.load.audio('countdown_3',  'assets/audio_sfx/countdown_3.ogg');

            this.load.audio('hah',  'assets/audio_sfx/hah.ogg');


            //Fondos Animados
            this.load.atlas("desierto", "assets/ambient/desierto/desierto.png","assets/ambient/desierto/desierto.json");
            this.load.atlas("ui", "assets/ui/ui.png","assets/ui/ui.json");

            //sprites animados
            this.load.atlas("pet", "assets/sprites/pet_1/pet_1.png","assets/sprites/pet_1/pet_1.json");

    }



    create(){
        const elements = this.scene.get('elements');
        elements.getBackground(this,"bg_main");
        elements.showBtnReturn(this,originScreen);
        this.scene.start('startScene');
    }



    
}
