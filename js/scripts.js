var pokemonRepository = (function () {
  var pokemonList = [
    {
      name: "Blastoise",
      height: 1.6,
      category: "Shellfish",
      abilities: "Torrent",
      type: "Water",
    },
    {
      name: "Butterfree",
      height: 1.1,
      category: "Butterfly",
      abilities: "Compound Eyes",
      type: "Bug",
    },
    {
      name: "Pidgey",
      height: 0.3,
      category: "Tiny Bird",
      abilities: "Keen Eye",
      type: "Flying",
    },
    {
      name: "Pikachu",
      height: 0.4,
      category: "Mouse",
      abilities: "Static",
      type: "Electric",
    },
    {
      name: "Vulpix",
      height: 0.6,
      category: "Fox",
      abilities: "Flash Fire",
      type: "Fire",
    },
  ];

  function getAll(pokemon) {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "category" in pokemon &&
      "abilities" in pokemon &&
      "type" in pokemon
    ) {
      pokemonList.push(pokemon);
    }
  }

  return {
    add: add,
    getAll: getAll,
  };
})(); //IIFE wrap

//adding new character in the repository
pokemonRepository.add({
  name: "Swablu",
  height: 0.4,
  category: "cotton bird",
  abilities: "natural care",
  type: "flying",
});

pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(
    "Pokemon Name: " +
      "<strong>" +
      pokemon.name +
      "</strong>" +
      "<br>" +
      " Height: " +
      pokemon.height +
      "m"
  );
  if (pokemon.height >= 0.6) {
    document.write(" - " + "Wow that's big!" + "<br>" + "<br>");
  } else {
    document.write(" - " + "Wow that's cute!" + "<br>" + "<br>");
  }
});
