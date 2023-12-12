export const getDetails = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/1/');
  return res.json();
};
