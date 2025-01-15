const chaveDaApi = "616eb6af32964797830162236243112";
const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", async () => {
  const cidade = document.getElementById("input-busca").value;

  const dados = await buscarDadosDaCidade(cidade);

  preencherDadosNaTela(dados, cidade);
});

async function buscarDadosDaCidade(cidade) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}
&q=${cidade}&aqi=no&lang=pt`;

  const resposta = await fetch(apiUrl);

  const dados = resposta.json();

  return dados;
}

function preencherDadosNaTela(dados, cidade) {
  const temperatura = dados.current.temp_c;
  const condicao = dados.current.condition.text;
  const umidade = dados.current.humidity;

  document.getElementById("cidade").textContent = cidade;

  document.getElementById("temperatura").textContent = `${temperatura}ºC`;

  document.getElementById("condicao").textContent = condicao;
}
