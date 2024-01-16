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

  switch (opcao) {
    case "1":
      saldo += parseFloat(prompt("Informe o valor a ser depositado:"));
      break;
    case "2":
      saldo -= prompt("Informe o valor a ser sacado:");
      break;
    case "3":
      alert("saindo...");
      break;
    default:
      alert("Opção inválida! Tente novamente.");
  }
} while (opcao !== "3");
