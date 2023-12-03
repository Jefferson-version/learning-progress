const entrada1 = prompt("informe o primeiro numero");
const entrada2 = prompt("informe o segundo numero");
const x = parseFloat(entrada1);
const y = parseFloat(entrada2);
const soma = x + y;
const subtracao = x - y;
const divisao = x / y;
const multiplicacao = x * y;

alert(
  "Os resultados são \n" +
    "\nSoma: " +
    soma +
    "\nSubtração: " +
    subtracao +
    "\nDivisão: " +
    divisao +
    "\nMultiplicação: " +
    multiplicacao
);
