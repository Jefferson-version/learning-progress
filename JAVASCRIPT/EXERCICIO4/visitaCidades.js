// const nome = prompt("Qual o seu nome turista?");
// let cidades = "";
// let contagem = 0;

// let continuar = prompt("Você já visitou alguma cidade? (Sim/Não)");

// while (continuar === "Sim") {
//   let cidadesVisitadas = prompt("Qual o nome da cidade visitada?");
//   // algo como cidades = cidades + alguma coisa...
//   cidades += " - " + cidadesVisitadas + "\n";
//   contagem++;
//   continuar = prompt("Você visitou alguma outra cidade?(Sim/Não");
// }
const turista = prompt("E aí, turista! Qual é o seu nome?");
let cidades = "";
let contagem = 0;

let continuar = prompt("Você visitou alguma cidade? (Sim/Não)");

//toLowerCase() é usada para converter a string digitada pelo usuário para minúsculas
while (continuar === "Sim") {
  let cidade = prompt("Qual é o nome da cidade visitada?");
  cidades += " - " + cidade + "\n";
  contagem++;
  continuar = prompt("Você visitou alguma outra cidade? (Sim/Não)");
}
alert(
  "Turista: " +
    turista +
    "\nQuantidade de cidades visitadas: " +
    contagem +
    "\nCidades visitadas:\n" +
    cidades
);
