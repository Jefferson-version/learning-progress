const chaveDaApi = "616eb6af32964797830162236243112";
const botaoDeBusca = document.querySelector(".btn-busca");

botaoDeBusca.addEventListener("click", () => {
  const cidade = document.getElementById("input-busca").Value;
  const dados = buscarDadosDaCidade(cidade);
});

function buscarDadosDaCidade (cidade {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDaApi}`
&q=${cidade}&aqi=no&lang=pt`}
