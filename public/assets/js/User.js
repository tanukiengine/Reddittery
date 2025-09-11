import cards from '../../src/data/cards.json';

class User {
    constructor(name, game) {
        this.name = name;
        this.cards = this.shuffle(cards).slice(0, 16); // tablero 4x4
        this.marked = new Set();
        this.win = false;
        this.game = game;
    }

    putFrijolito(carta) {
        const encontrada = this.cards.find(c => c.id === carta.id);
        if (encontrada) {
        this.marked.add(carta.id);
        console.log(`🫘 ${this.name} marcó: ${carta.name}`);
        } else {
        console.log(`⚠️ ${this.name} intentó marcar pero no tiene: ${carta.name}`);
        }
    }

    showBoard() {
        console.log(`🎴 Tablero de ${this.name}:`);
        let output = "";
        this.cards.forEach((c, i) => {
        const marcado = this.marked.has(c.id) ? "🫘" : "⬜";
        output += `${marcado} ${c.name}\t`;
        if ((i + 1) % 4 === 0) output += "\n";
        });
        console.log(output);
    }

    complete() {
        return this.marked.size === this.cards.length;
    }

    // Jugador debe llamar esto manualmente
    redditery() {
        if (this.complete()) {
            this.win = true;
            console.log(`🎉 ${this.name} gritó YoWin! y ganó el juego 🏆`);
            const cardsPlayed = this.game.deck.cards.filter(card => !this.game.cardsPlayed.includes(card.id));

            console.log(`Puntaje ${cardsPlayed.length}`)
            this.game.endGame(this);
            return true;
        } else {
            console.log(`⚠️ ${this.name} intentó gritar YoWin! pero no completó su tablero`);
            return false;
        }
    }

    shuffle(array) {
        let arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}

export default User;