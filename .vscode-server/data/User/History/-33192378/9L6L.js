const car1 = prompt("Insira o nome do primeiro veiculo:");
const velocidade1 = parseFloat(
  prompt("Insira a velocidade do primeiro veiculo:")
);
const car2 = prompt("Insira o nome do segundo veiculo:");
const velocidade2 = parseFloat(
  prompt("Insira a velocidade do segundo veiculo:")
);

if (velocidade1 > velocidade2) {
  alert(car1 + " é mais rápido que " + car2);
} else if (velocidade2 > velocidade1) {
  alert(car2 + " é mais rápido que " + car1);
} else {
  alert(car1 + " e o " + car2 + " Possuem a mesma velocidade !");
}
