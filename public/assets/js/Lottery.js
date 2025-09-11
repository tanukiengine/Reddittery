import User from '../../assets/js/User';
import cards from '../../src/data/cards.json';

class Lottery {
    constructor() {
        this.cards = this.shuffle(cards);
        this.index = 0;
        // this.mostrando = false;
        this.interval = null;
        this.actualCard = null;
        this.players = [];
        this.winner = null;
        this.cardsPlayed = []
    }
    
    newPlayer(name) {
        const jugador = new User(name, this);
        this.players.push(jugador);
        return jugador;
    }

    start() {
        if (this.interval) return;

        this.interval = setInterval(() => {
            if (this.index >= this.cards.length) {
                this.stop();
                console.log("🎉 ¡Se acabaron las cartas!");
                console.log("nadie gano!");
                return;
            }

            this.actualCard = this.cards[this.index];
            console.log(`📢 Cantando: ${this.actualCard.name}`);
            
            this.cardsPlayed.push(this.actualCard);

            setTimeout(() => {
                console.log(`❌ ${this.actualCard.name} eliminada`);

                this.players.forEach(j => {
                    if (j.complete() && !j.win) {
                        console.log(`💀 ${j.name} completó pero no gritó ¡Lotería!, perdió la partida`);
                        this.stop();
                    }
                });

                this.actualCard = null;
                this.index++;
            }, 2000);

        }, 3000);
    }

    pause() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            console.log("⏸️ Juego en pausa");
        }
    }

    resume() {
        console.log("▶️ Reanudando...");
        this.start();
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    shuffle(array) {
        let arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    endGame(winnerPlayer) {
        this.winner = winnerPlayer;
        this.stop();
        console.log(`🏆 El ganador oficial es: ${winnerPlayer.nombre}`);
    }

}


export default Lottery;