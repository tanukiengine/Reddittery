window.width=window.innerWidth;
window.height=window.innerHeight;
window.levels= [];



window.mid_w=width/2;
window.mid_h=height/2;
window.mid_w_q=mid_w/2;
window.base_cols=3;
window.base_rows=3;
window.firstTime = {
    "Visuals": true,
    "Numbers": true,
    "Letters": true
};

if (width>height) {
	window.default_scale=.3;
}else{
	window.default_scale=.2;
}

window.worldAudio=undefined;

window.basic_padding=20;//padding para evitar que los elementos toquen las orillas;
window.col_size=(width-(basic_padding*base_cols))/base_cols;
window.cols=[];
window.base_sum=0;

for (var i = 0; i < base_cols; i++) {
	base_sum+=basic_padding+(col_size)
	cols.push(base_sum);
}



//profile vars
window.money=0;
window.name=0;
window.globalScore=0;


//gameElemetns
window.btn_money=undefined;//para cambiar el texto de este boton usar btn_money.objText.text="nuevo texto";


window.originScreen=[];//se usa para que el boton de regresar sepa a que escena ir; Revisar elements->showBtnReturn

//Este array deberia llenarse desde Redis de reddit
window.playerStats = {
	name: 'Akkudrak',
	board: [],
	avatar: 'avatar_1',
	score: 12345,
	reaction: 320 // ms
};//Falta guardar, avatars procesados en el juego, y su timing.

// 
window.exampleGameConfig={"generalSettings":{"resolution":{"height": 640,"width": 450,"fullscreen": false},"sound":{"volume":50},"gameplay":{"language": "en"}},
"configurationGame":[{"challenges":[{"title":"moreLetters","dificulty":"normal","description":"algo pro"}]}]};




window.sortPlayersByScoreDesc = function(players) {
    return players.slice().sort((a, b) => b.score - a.score);
};

//usar esto para generar jugadores aleatorios, usar Redis de devvit para obtener los datos reales
window.randomPlayers = sortPlayersByScoreDesc(Array.from({ length: 10 }, (_, i) => ({
    name: `Player${i + 1}`,
    avatar: `avatar_${Math.floor(Math.random() * 10) + 1}`,
    score: Math.floor(Math.random() * (50000 - 1000 + 1)) + 1000,
    reaction: Math.floor(Math.random() * (800 - 200 + 1)) + 200
})));

window.getPlayerByName = function(name) {
    return window.randomPlayers.find(player => player.name === name) || null;
};


window.playerStatsGlobal = randomPlayers;


//level selection

