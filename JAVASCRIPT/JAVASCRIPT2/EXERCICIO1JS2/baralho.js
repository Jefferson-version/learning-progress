const baralho = [];
let opcao = "";

do {
  opcao = prompt(
    "Cartas no Baralho: " +
      baralho.length +
      "\n1. Adicionar uma Cartan\n2. Puxar uma Carta\n3. Sair"
  );

  switch (opcao) {
    case "1":
      const novaCarta = prompt("Qual é a Carta?");
      baralho.push(novaCarta);
      break;
    case "2":
      const cartaPuxada = baralho.pop();
      if (!cartaPuxada) {
        alert("Não há nenhuma carta no baralho!");
      } else {
        alert("Voce puxou uma(a)" + cartaPuxada);
      }
      break;
    case "3":
      alert("Saindo...");
      break;
    default:
      alert("Opção Invalida!");
  }
} while (opcao !== "3");
