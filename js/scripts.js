pokemonList = [
  {
    pokeName: "Blastoise",
    pokeHeight: 1.6,
    pokeCategory: "Shellfish",
    pokeAbilities: "Torrent",
    pokeType: "Water",
  },
  {
    pokeName: "Butterfree",
    pokeHeight: 1.1,
    pokeCategory: "Butterfly",
    pokeAbilities: "Compound Eyes",
    pokeType: "Bug",
  },
  {
    pokeName: "Pidgey",
    pokeHeight: 0.3,
    pokeCategory: "Tiny Bird",
    pokeAbilities: "Keen Eye",
    pokeType: "Flying",
  },
  {
    pokeName: "Pikachu",
    pokeHeight: 0.4,
    pokeCategory: "Mouse",
    pokeAbilities: "Static",
    pokeType: "Electric",
  },
  {
    pokeName: "Vulpix",
    pokeHeight: 0.6,
    pokeCategory: "Fox",
    pokeAbilities: "Flash Fire",
    pokeType: "Fire",
  },
];

//create loop that iterates over each item in pokemonList

// for (var i = 0; i < pokemonList.length; i++) {
//   document.write(
//     "Pokemon Name: " +
//       "<strong>" +
//       pokemonList[i].pokeName +
//       "</strong>" +
//       " ( height: " +
//       pokemonList[i].pokeHeight +
//       "m)" +
//       "<br>" +
//       "<br>"
//   );
// }

for (var i = 0; i < pokemonList.length; i++) {
  document.write(
    "Pokemon Name: " +
      "<strong>" +
      pokemonList[i].pokeName +
      "</strong>" +
      "<br>" +
      " Height: " +
      pokemonList[i].pokeHeight +
      "m"
  );
  if (pokemonList[i].pokeHeight >= 0.6) {
    document.write(" - " + "Wow that's big!" + "<br>" + "<br>");
  } else {
    document.write(" - " + "Wow that's cute!" + "<br>" + "<br>");
  }
}
