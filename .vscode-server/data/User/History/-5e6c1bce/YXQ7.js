const personagem1 = prompt("Insira o nome do persongem atacante : ");
const ataque = parseFloat(prompt("Qual o poder de ataque desse personagem ? "));

const personagem2 = prompt("Insira o nome do persongem defensor : ");
let vida = parseFloat(prompt("Qual a quantidade de pontos de vida possui ? "));
const poderDeDefesa = parseFloat(prompt("Qual o poder de defesa : "));
const possuiEscudo = prompt("esse personagem possui escudo ? (Sim/Não)");

let danoCausado = 0;

if (ataque > poderDeDefesa && possuiEscudo === "Não") {
  danoCausado = ataque - poderDeDefesa;
} else if (ataque > poderDeDefesa && possuiEscudo === "Sim") {
  danoCausado = (ataque - poderDeDefesa) / 2;
}
