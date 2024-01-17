const palavra = prompt("Informe uma palavra:");
let palavraInvertida = "";

for (let i = palavra.length - 1; i >= 0; i--) {
  palavraInvertida += palavra[i];
}

if (palavra === palavraInvertida) {
  alert(
    palavra +
      " é um palindromo! Pois:\n\n" +
      palavra +
      " é a mesma coisa invertida veja, " +
      palavraInvertida
  );
} else
  alert(
    "Essa palavra " +
      palavra +
      " ,não é considerada palindromo! Pois:\n\n" +
      palavra +
      " é diferente de  " +
      palavraInvertida
  );
