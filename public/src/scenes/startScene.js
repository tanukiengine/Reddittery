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

        const logo_redditery=this.add.sprite(mid_w, 10, 'ui', 'logo_redditery').setOrigin(.5, 0).setScale(1.5);
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


        var initialX=150;
        //esta version suma+200 al iniciatX, pero puede mejorarse si se usa un array de grid (dividir la pantalla entre 5 para posiscionar mejor los elementos)
        for (let i = 0; i < 5; i++) {
            const scoreboard=this.add.sprite(initialX, height-120, 'ui', 'container_square').setOrigin(.5,.5).setScale(2);
            const globe=this.add.sprite(scoreboard.getTopRight().x-((scoreboard.width*2)/3), scoreboard.getTopLeft().y, 'ui', 'position_globe').setOrigin(0,1).setScale(2);
            this.add.text(globe.x+30, globe.y-18, (i+1), { fontFamily: 'Arial', fontSize: '40px', fontStyle: 'bold', color: '#000' }).setOrigin(0,1);
            
            //Solo el primer elemento tiene nombre y personaje, los demas estan vacios, falta obtener jugadores y puntaje real
            if(i==0){
                this.add.text(scoreboard.getCenter().x, scoreboard.getBottomCenter().y-30, 'Akkudrak', { fontFamily: 'Arial', fontSize: '25px', fontStyle: 'bold', color: '#fff', stroke: '#512059' }).setOrigin(.5,.5);
                this.add.sprite(scoreboard.getCenter().x, scoreboard.getCenter().y-20, 'ui', 'avatar_1').setOrigin(.5,.5).setScale(1.3);
            }else{
                this.add.text(scoreboard.getCenter().x, scoreboard.getBottomCenter().y-30, 'Vacancy', { fontFamily: 'Arial', fontSize: '25px', fontStyle: 'bold', color: '#fff', stroke: '#512059' }).setOrigin(.5,.5);
            }
            
            initialX+=200;
        }


        const start_btn=this.add.sprite(mid_w, logo_redditery.getBottomCenter().y-20, 'ui', 'btn_1').setOrigin(.5,0).setScale(2).setInteractive();
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
    }
    
}

/*

       animotions.anim_heartbeat(this,
                this.add.image(mid_w, height-10, 'btn_start')
                .setOrigin(.5,1)
                .setScale(.2)
                .setInteractive()
                .on("pointerdown", () => {
                    originScreen.push("loading");
                    this.scene.start('selectModeScene');
                })
            ,{scale:.25,duration:350});
        animotions.anim_swing(this,this.add.image(mid_w, mid_h+100, 'game_title').setOrigin(.5,1).setScale(default_scale),{start:mid_w+10,duration:2000});
*/