const primeiroNome = prompt("Digite seu primeiro Nome :");
const sobrenome = prompt("Digite seu sobrenome :");
const campoDeEstudo = prompt("Qual o seu campo de estudo recruta :");
const dataDeNascimento = prompt("Digite a sua data de nascimento :");

alert(
  "Parabéns cadastro realizado com sucesso !\n" +
    "nome completo : " +
    primeiroNome +
    " " +
    sobrenome +
    "\ncampo de estudo : " +
    campoDeEstudo +
    "\nData de Nascimento : " +
    (2023 - dataDeNascimento)
);
