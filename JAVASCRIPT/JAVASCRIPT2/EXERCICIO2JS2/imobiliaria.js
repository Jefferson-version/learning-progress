const imoveis = [];
let opcao = "";

do {
  opcao = prompt(
    "Bem Vindo ao cadastro de imoveis!\n" +
      "Total de Imoveis:" +
      imoveis.length +
      "\n\nEscolha uma Opcao: \n1. Novo Imovel\n2. Lista de  Imoveis\n3. Sair"
  );

  switch (opcao) {
    case "1":
      const imovel = {};

      imovel.proprietario = prompt(
        "informe o nome do proprietario desse imovel?:"
      );
      imovel.quartos = prompt("QUANTOS QUARTOS PUSSUI ESSE IMOVEL?");
      imovel.banheiro = prompt("quantos banheiros possui o imovel ?");
      imovel.garagem = prompt("O imovel possui Garagem ? sim/não");

      const confirmacao = confirm(
        "Salvar este imovel?\n" +
          "\nProprietario" +
          imovel.proprietario +
          "\nQuartos: " +
          imovel.quartos +
          "\nBanheiros: " +
          imovel.banheiro +
          "\nPossui garagem? " +
          imovel.garagem
      );

      if (confirmacao) {
        imoveis.push(imovel);
        alert("Imovel salvo com sucesso!");
      } else {
        alert("Voltando ao Menu.");
      }
      break;

    case "2":
      for (let i = 0; i < imoveis.length; i++) {
        alert(
          "Imovel " +
            (i + 1) +
            "\nproprietario: " +
            imoveis[i].proprietario +
            "\nQuartos: " +
            imoveis[i].quartos +
            "\nBanheiros: " +
            imoveis[i].banheiro +
            "\nPossui garagem? " +
            imoveis[i].garagem
        );
      }
    case "3":
      alert("Encerrando...");
      break;
    default:
      alert("Opçao Invalida");
  }
} while (opcao !== "3");
