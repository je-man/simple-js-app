var pokemonRepository = (function () {
  var pokemonList = [
    // {
    //   name: "Blastoise",
    //   height: 1.6,
    //   category: "Shellfish",
    //   abilities: "Torrent",
    //   type: "Water",
    // },
    // {
    //   name: "Butterfree",
    //   height: 1.1,
    //   category: "Butterfly",
    //   abilities: "Compound Eyes",
    //   type: "Bug",
    // },
    // {
    //   name: "Pidgey",
    //   height: 0.3,
    //   category: "Tiny Bird",
    //   abilities: "Keen Eye",
    //   type: "Flying",
    // },
    // {
    //   name: "Pikachu",
    //   height: 0.4,
    //   category: "Mouse",
    //   abilities: "Static",
    //   type: "Electric",
    // },
    // {
    //   name: "Vulpix",
    //   height: 0.6,
    //   category: "Fox",
    //   abilities: "Flash Fire",
    //   type: "Fire",
    // },
  ];

  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // Create a AJAX/Promise
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function getAll(pokemon) {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    var pokeList = document.querySelector(".pokemon-list");
    var listItem = document.createElement("li");
    var button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("buttonStyle");
    listItem.appendChild(button);
    pokeList.appendChild(listItem);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  //add event listener for each button just created
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})(); //IIFE wrap

// //adding new character in the repository
// pokemonRepository.add({
//   name: "Swablu",
//   height: 0.4,
//   category: "cotton bird",
//   abilities: "natural care",
//   type: "flying",
// });

//loadList method will fetch data from API then add each Pokemon in the fetched date to pokemonList with the add function
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
