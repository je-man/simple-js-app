var pokemonRepository = (function () {
  var pokemonList = [];

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=200";

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
    // var pokeList = document.querySelector(".pokemon-list");
    // var listItem = document.createElement("li");
    // var button = document.createElement("button");
    // button.innerText = pokemon.name;
    // button.classList.add("buttonStyle");
    // listItem.appendChild(button);
    // pokeList.appendChild(listItem);
    // button.addEventListener("click", function (event) {
    //   showDetails(pokemon);
    // });
    pokemonRepository.loadDetails(pokemon).then(function () {
      let row = $(".row");
      let card = $(
        '<div class="card mt-5" style="width: 18rem; margin:10px;"></div>'
      );
      let image = $('<img class="card-img-top" alt="...">');
      let title = $('<h5 class="card-title">' + pokemon.name + "</h5>");
      image.attr("src", pokemon.imageUrlFront);
      let body = $('<div class="card-body" style="text-align: center;"></div>');
      let button = $(
        '<button type="button" class="btn" style="background-color: #d88780; color: white" data-toggle="modal" data-target="#exampleModal">See profile</button>'
      );

      //append
      row.append(card);
      card.append(image);
      card.append(body);
      body.append(title);
      body.append(button);

      button.on("click", function (event) {
        showDetails(pokemon);
      });
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
        item.imageUrlFront = details.sprites.other.dream_world.front_default;
        item.imageUrlBack = details.sprites.back_default;
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
    // let modalContainer = document.querySelector("#modal-container");
    // modalContainer.innerHTML = "";
    // let modal = document.createElement("div");
    // modal.classList.add("modal");
    // let closeButtonElement = document.createElement("button");
    // closeButtonElement.classList.add("modal-close");
    // closeButtonElement.innerText = "Close";
    // closeButtonElement.addEventListener("click", hideModal);
    // let nameElement = document.createElement("h1");
    // nameElement.innerText = item.name;
    // let imageElement = document.createElement("img");
    // imageElement.classList.add("modal-image");
    // imageElement.src = item.imageUrl;
    // let heightElement = document.createElement("p");
    // heightElement.innerText = "Height: " + item.height + '"';
    // let typesElement = document.createElement("p");
    // typesElement.innerText = "Type: " + item.types;
    // let abilityElement = document.createElement("p");
    // abilityElement.innerText = "Abilities: " + item.abilities;

    //Append
    // modal.appendChild(nameElement);
    // modal.appendChild(imageElement);
    // modal.appendChild(heightElement);
    // modal.appendChild(typesElement);
    // modal.appendChild(abilityElement);
    // modalContainer.appendChild(modal);

    let modalTitle = $(".modal-title");
    modalTitle.empty();
    let modalHeader = $(".modal-header");
    let pokemonName = $('<h1 style="color: #eae6dd;">' + item.name + "</h1>");
    let modalBody = $(".modal-body");
    modalBody.empty();
    let imageFront = $(
      '<img class="modal-img" alt="..." style="width: 50%; padding: 30px;">'
    );
    imageFront.attr("src", item.imageUrlFront);
    let imageBack = $(
      '<img class="modal-img" alt="..." style="width: 50%; padding: 30px;">'
    );
    imageBack.attr("src", item.imageUrlBack);
    let modalProfile = $(
      '<h4 style="background-color:#d88780; padding: 5px; color: white;">Profile</h4>'
    );
    let pokemonHeight = $(
      "<p>" + "<strong>Height</strong>: " + item.height + '"' + "</p>"
    );
    // //creating element for type in modal content
    let pokemonTypes = $(
      "<p>" + "<strong>Type</strong>: " + item.types + "</p>"
    );
    // //creating element for abilities in modal content
    let pokemonAbilities = $(
      "<p>" + "<strong>Abilities</strong>: " + item.abilities + "</p>"
    );

    modalTitle.append(pokemonName);
    modalBody.append(imageFront);
    modalBody.append(imageBack);
    modalBody.append(modalProfile);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonAbilities);

    if (item.types.includes("grass")) {
      $(".modal-header").css("background-color", "rgb(120, 200, 80)");
    } else if (item.types.includes("fire")) {
      $(".modal-header").css("background-color", "rgb(240, 128, 48)");
    } else if (item.types.includes("poison")) {
      $(".modal-header").css("background-color", "rgb(168, 144, 240)");
    } else if (item.types.includes("water")) {
      $(".modal-header").css("background-color", "rgb(104, 144, 240)");
    } else if (item.types.includes("bug")) {
      $(".modal-header").css("background-color", "rgb(168, 184, 32)");
    } else if (item.types.includes("water")) {
      $(".modal-header").css("background-color", "rgb(69, 120, 237)");
    } else if (item.types.includes("ice")) {
      $(".modal-header").css("background-color", "rgb(66, 174, 174)");
    } else if (item.types.includes("electric")) {
      $(".modal-header").css("background-color", "rgb(252, 234, 161)");
    } else if (item.types.includes("ground")) {
      $(".modal-header").css("background-color", "rgb(219, 181, 77)");
    } else if (item.types.includes("fairy")) {
      $(".modal-header").css("background-color", "rgb(232, 120, 144)");
    } else if (item.types.includes("ghost")) {
      $(".modal-header").css("background-color", "rgb(100, 78, 136)");
    }
  }

  //hides modal when clicked on close button
  function hideModal() {
    var modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  //hides modal when clicked on ESC on keyboard
  //   window.addEventListener("keydown", (e) => {
  //     let modalContainer = document.querySelector("#modal-container");
  //     if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
  //       hideModal();
  //     }
  //   });

  //   let modalContainer = document.querySelector("#modal-container");
  //   modalContainer.addEventListener("click", (e) => {
  //     let target = e.target;
  //     if (target === modalContainer) {
  //       hideModal();
  //     }
  //   });

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

//loadList method will fetch data from API then add each Pokemon in the fetched date to pokemonList with the add function
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
