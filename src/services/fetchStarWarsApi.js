const fetchStarWarsApi = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();
  // const planets = data.map((planet) => delete planet.residents);
  console.log(data);
  return data.result;
  // return planets;
};

export default fetchStarWarsApi;
