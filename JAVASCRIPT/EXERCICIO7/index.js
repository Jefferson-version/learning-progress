const numero = prompt(
  "Olá meu nome é Charlie, sou um Robô de tabuada!\n" +
    "Informe o número do qual você deseja a tabuada:"
);

let resultado = "";

for (let fator = 1; fator <= 20; fator++) {
  resultado += " -> " + numero + " x " + fator + " = " + numero * fator + "\n";
}

alert(
  "Legal, aqui esta o Resultado da tabuada do N° " +
    numero +
    ":\n\n" +
    resultado
);
