const turista = prompt("Qual o seu nome turista ?");
let cidades = " ";
let contagem = 0;

let continuar = prompt("você visitou alguma cidade ? (sim/não)");

while (continuar === "sim") {
  let cidade = prompt("qual é o nome da cidade visitada?");
  cidades += " - " + cidade + "\n";
  contagem++;
  continuar = prompt("você visitou alguma outra cidade? (sim/não");
}

alert(
  "turista: " +
    turista +
    "\nquantidade de cidades visitadas: " +
    contagem +
    "\ncidades visitadas:\n" +
    cidades
);
