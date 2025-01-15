const chaveDaApi = "616eb6af32964797830162236243112";
const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
  const cidade = document.getElementById("input-busca").Value;

  const dados = await buscarDadosDaCidade(cidade);

  console.log(dados);
});

async function buscarDadosDaCidade(cidade) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}
&q=${cidade}&aqi=no&lang=pt`;

  const resposta = await fetch(apiUrl);

  const dados = resposta.json();

  return dados;
}
