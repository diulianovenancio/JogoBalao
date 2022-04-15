<?php 

?>
<!DOCTYPE HTML>
<html lang="pt-br">
	<head>
		<meta charset="UTF-8">

		<title>Estourando balões</title>
		<style type="text/css">
			.premio{
				/*text-decoration: underline wavy red;*/
				text-decoration: line-through wavy red;
				text-decoration-thickness: 15%;
			}
			ol > li {
				list-style:none;
			}
			html, body, ol {      /* aqui o que importa é o UL, o resto é pra estética do demo.          */
				position:relative;  /* reset do position, não relacionado ao demo, mas bom pra uso geral.  */
				margin:0;           /* Zeramos as margens e o padding do UL para as células.encostarem     */
				padding:0;
				width:100%;         /* por default, os blocos são 100%, mas vamos garantir isso.           */
				height:100%;        /* aqui foi feito pra fins de demonstração apenas.                     */
			}


			li {
				display:block;             /* primeiro passo, transformar o LI em bloco.                   */ 
				list-style-type: none;     /* depois, remoção dos bullets.                                 */
				margin:0;                  /* nao queremos espaços ente os blocos.                         */
				background-color:#999;     /* cor de fundo principal, o "grid" fazemos depois              */
				box-sizing: border-box;    /* medidas são de borda à borda, o padding não é acrescentado.  */
				height:5%;                /* esta linha é pela estética do demo                           */
			}

			li:nth-child(odd) {          /* este css será aplicato nos LI impares (1, 3, 5... ).         */
				clear:both;                /* forçamos a quebra de linha por segurança...                  */
				float:left;                /* ... e o alinhamos à esquerda.                                */
				width:50%;                 /* Aplicamos 50% na esquerda, os da direita "herdam" o resto.   */
			}

			li:nth-child(4n+2),          /* aqui pulamos de 4 em 4 itens começando do 2 ( 2, 6, ...).    */
			li:nth-child(4n+3) {         /* aqui de 4 em 4 começando do 3 ( 3, 7, ... )                  */
				background-color:#ccc;     /* e mudamos a cor, dando efeito de quadriculado                */
			}
		</style>

		<script src="jogo.js"></script>

	</head>

	<body onload="iniciaJogo()">
		<div style="float:left; width:auto; height:500px; background: #FFF; border: solid 1px #A2A2A2; margin-right: 5px;">
			<table border="0">
				<tr>
					<td>
						<img src="imagens/balao_azul_grande.png" />
					</td>
					<td>
						<span id="baloes_inteiros" style="font-size: 40px;"></span>
					</td>
				</tr>
			</table>

			<br />
			<table border="0">
				<tr>
					<td>
						<img src="imagens/balao_azul_grande_estourado.png" />
					</td>
					<td>
						<span id="baloes_estourados" style="font-size: 40px;"></span>
					</td>
				</tr>
			</table>

			<br/>
			<table border="0" style="width: 140px; height: 132px;">
				<tr>
					<td style="background: url('imagens/cronometro.png'); text-align:center">
						<span id="cronometro" style="color: red; font-size: 30px;"></span>
					</td>
				</tr>
			</table>

		</div>

		<div id="cenario" style="float: left; width: 600px; height: 500px; background: url('imagens/cenario.png'); background-position: bottom;"></div>

		<div id="cenario2" style="float: right; width: 580px; height: 500px; background: url('imagens/caderno.png'); background-position: bottom;">
			<ol>
			<?php
				$pessoas = array();  
  				$pessoas[0] = "Ganhou";
				$pessoas[1] = "Não Ganhou";
				for ($i=1; $i < 31; $i++) { 
					$sorteado = array_rand($pessoas, 1); // sorteia um elemento
					echo "<li id='BE$i'>".$pessoas[$sorteado]."</li>";
				}

			?>
			</ol>
		</div>
	</body>
	
</html>