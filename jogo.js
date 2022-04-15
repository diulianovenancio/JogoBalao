var timerId = null; //variável que armazena a chamada da função timeout

function iniciaJogo(){

	var url = window.location.search;
	
	var nivel_jogo = url.replace("?", "");

	var tempo_segundos = 0;

	if(nivel_jogo == 1) { //1 fácil -> 120segundos
		tempo_segundos = 120;
	}

	if(nivel_jogo == 2) { //2 normal -> 60segundos
		tempo_segundos = 60;
	}
	
	if(nivel_jogo == 3) { //3 difícil -> 30segundos
		tempo_segundos = 30;
	}

	//inserindo segundos no span
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	// quantidade de balões
	var qtde_baloes = 30;

	// limite para estourar
	var pode_estourar = 2;
		
	cria_baloes(qtde_baloes);

	//imprimir qtde baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1)
	
}

function contagem_tempo(segundos){

	segundos = segundos - 1;

	if(segundos == -1){
		clearTimeout(timerId); //para a execução da função do settimeout
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);
}

function game_over(){
	remove_eventos_baloes();
	alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo');
}

function cria_baloes(qtde_baloes){

	for(var i = 1; i <= qtde_baloes; i++){

		var balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b'+i;
		balao.onclick = function(){ estourar(this); };

		document.getElementById('cenario').appendChild(balao);

		balao.setAttribute("draggable", "false"); //Evita de arrastar o balão
	}
}

function estourar(e){

	var id_balao = e.id;
	var id_balao_estourado = id_balao.slice(1);
	document.getElementById(id_balao).setAttribute("onclick", "");
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
	TocarMusica();
	premio(id_balao_estourado);
	//MensagemEstourouBalao(id_balao);

	pontuacao(-1);

}

function premio(n){
	let balao_morrido = "BE"+n;
	document.getElementById(balao_morrido).classList.add('premio');
}

function pontuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados  = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);


}

function situacao_jogo(baloes_inteiros){
	//var baloes_limite  = parseInt(qtde_baloes) - parseInt(pode_estourar);
	var baloes_limite = 28;
	console.log(baloes_limite);
	if(baloes_inteiros == baloes_limite ){
		parar_jogo();
		remove_eventos_baloes();
		//alert('Parabéns, você conseguiu estourar todos os balões a tempo');
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

function TocarMusica(){
    var audio1 = new Audio();
    audio1.src = "audio/RebentarBalao.mp3";
    audio1.play();
}
