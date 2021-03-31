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
    pokemonRepository.loadDetails(pokemon).then(function () {
      let row = $(".row");
      let card = $(
        '<div class="card mt-5" style="width: 18rem; margin:13px;"></div>'
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
        item.imageUrlBack =
          details.sprites.versions["generation-v"][
            "black-white"
          ].animated.back_default;
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
    let modalTitle = $(".modal-title");
    modalTitle.empty();
    let modalHeader = $(".modal-header");
    let pokemonName = $('<h1 style="color: white;">' + item.name + "</h1>");
    let modalBody = $(".modal-body");
    modalBody.empty();
    let imageFront = $(
      '<img class="modal-img" alt="..." style="width: 50%; padding: 30px;">'
    );
    imageFront.attr("src", item.imageUrlFront);
    let imageBack = $(
      '<img class="modal-img" alt="..." style="width: 35%; padding: 30px;">'
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
    } else if (item.types.includes("normal")) {
      $(".modal-header").css("background-color", "rgb(156, 156, 99)");
    }
  }

  //hides modal when clicked on close button
  function hideModal() {
    var modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

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

function search() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  // li = ul.getElementsByTagName("");
  li = ul.querySelectorAll(".card");
  for (i = 0; i < li.length; i++) {
    // a = li[i].getElementsByTagName("a")[0];
    a = li[i].querySelector(".card-body").querySelector(".card-title");
    console.log(a.innerText);
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
