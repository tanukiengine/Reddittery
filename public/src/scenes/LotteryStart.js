import Lottery from '../../assets/js/Lottery';

export class LotteryStart extends Phaser.Scene{
    constructor(){
        super({key:'lotteryStart'});
        this.formattedText = "";
        this.nextWord = "";
        this.scaleToken
    }

    init(data) {
        const elements = this.scene.get('elements');
        elements.getBackground(this,"bg_modes");

        this.add.image(mid_w, basic_padding, "modes_title").setOrigin(.5,0).setScale(.5);
        
        this.startGame = elements.showBtnChallenges(this);

        this.howto = elements.showBtnProfile(this);

        const lottery = new Lottery();
        const jugador1 = lottery.newPlayer("Miguel");

        this.howto.on("pointerdown", (() => {
            // this.scene.start('howtoPlay');  
      
            jugador1.showBoard()
            lottery.start();

        }),this);

        // this.actionMoment = false;
        // this.buildResult = ""; 
    }

    preload() {
    }

    create() {
        // const lottery = new Lottery();
        // const jugador1 = lottery.newPlayer("Miguel");
        // jugador1.showBoard()


        // lottery.start();
    }
}