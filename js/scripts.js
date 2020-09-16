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

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=500";

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
      showModal(pokemon);
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
        // item.types = details.types;
        item.types = [];
        details.types.forEach(function (itemType) {
          item.types.push(itemType.type.name);
        });
        item.abilities = [];
        details.abilities.forEach(function (itemAbility) {
          item.abilities.push(itemAbility.ability.name);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(item) {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);
    let nameElement = document.createElement("h1");
    nameElement.innerText = item.name;
    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-image");
    imageElement.src = item.imageUrl;
    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + item.height + '"';
    let typesElement = document.createElement("p");
    typesElement.innerText = "Type: " + item.types;
    let abilityElement = document.createElement("p");
    abilityElement.innerText = "Abilities: " + item.abilities;
    //Append
    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(imageElement);
    modal.appendChild(heightElement);
    modal.appendChild(typesElement);
    modal.appendChild(abilityElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add("is-visible");
  }

  //hides modal when clicked on close button
  function hideModal() {
    var modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  //hides modal when clicked on ESC on keyboard
  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  let modalContainer = document.querySelector("#modal-container");
  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
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
