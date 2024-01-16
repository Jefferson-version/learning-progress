let saldo = prompt("Informe a quantidade do seu valor inicial:");
let opcao = "";

do {
  opcao = prompt(
    "saldo disponivel: R$ " +
      saldo +
      "\n1. Realizar um depósito" +
      "\n2. Realizar um saque" +
      "\n3.Sair"
  );
} while (opcao !== "3");
