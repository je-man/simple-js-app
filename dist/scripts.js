var pokemonRepository = (function () {
  var e = [];
  let t = "https://pokeapi.co/api/v2/pokemon/?limit=200";
  function o(t) {
    e.push(t);
  }
  function n(e) {
    var t = e.detailsUrl;
    return fetch(t)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        (e.imageUrlFront = t.sprites.other.dream_world.front_default),
          (e.imageUrlBack =
            t.sprites.versions["generation-v"][
              "black-white"
            ].animated.back_default),
          (e.height = t.height),
          (e.types = []),
          t.types.forEach(function (t) {
            e.types.push(t.type.name);
          }),
          (e.abilities = []),
          t.abilities.forEach(function (t) {
            e.abilities.push(t.ability.name);
          });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function r(e) {
    let t = $(".modal-title");
    t.empty();
    $(".modal-header");
    let o = $('<h1 style="color: white;">' + e.name + "</h1>"),
      n = $(".modal-body");
    n.empty();
    let r = $(
      '<img class="modal-img" alt="..." style="width: 50%; padding: 30px;">'
    );
    r.attr("src", e.imageUrlFront);
    let a = $(
      '<img class="modal-img" alt="..." style="width: 35%; padding: 30px;">'
    );
    a.attr("src", e.imageUrlBack);
    let l = $(
        '<h4 style="background-color:#d88780; padding: 5px; color: white;">Profile</h4>'
      ),
      s = $("<p><strong>Height</strong>: " + e.height + '"</p>'),
      c = $("<p><strong>Type</strong>: " + e.types + "</p>"),
      d = $("<p><strong>Abilities</strong>: " + e.abilities + "</p>");
    t.append(o),
      n.append(r),
      n.append(a),
      n.append(l),
      n.append(s),
      n.append(c),
      n.append(d),
      e.types.includes("grass")
        ? $(".modal-header").css("background-color", "rgb(120, 200, 80)")
        : e.types.includes("fire")
        ? $(".modal-header").css("background-color", "rgb(240, 128, 48)")
        : e.types.includes("poison")
        ? $(".modal-header").css("background-color", "rgb(168, 144, 240)")
        : e.types.includes("water")
        ? $(".modal-header").css("background-color", "rgb(104, 144, 240)")
        : e.types.includes("bug")
        ? $(".modal-header").css("background-color", "rgb(168, 184, 32)")
        : e.types.includes("water")
        ? $(".modal-header").css("background-color", "rgb(69, 120, 237)")
        : e.types.includes("ice")
        ? $(".modal-header").css("background-color", "rgb(66, 174, 174)")
        : e.types.includes("electric")
        ? $(".modal-header").css("background-color", "rgb(252, 234, 161)")
        : e.types.includes("ground")
        ? $(".modal-header").css("background-color", "rgb(219, 181, 77)")
        : e.types.includes("fairy")
        ? $(".modal-header").css("background-color", "rgb(232, 120, 144)")
        : e.types.includes("ghost")
        ? $(".modal-header").css("background-color", "rgb(100, 78, 136)")
        : e.types.includes("normal") &&
          $(".modal-header").css("background-color", "rgb(156, 156, 99)");
  }
  return {
    add: o,
    getAll: function (t) {
      return e;
    },
    addListItem: function (e) {
      pokemonRepository.loadDetails(e).then(function () {
        let t = $(".row"),
          o = $(
            '<div class="card mt-5" style="width: 18rem; margin:13px;"></div>'
          ),
          a = $('<img class="card-img-top" alt="...">'),
          l = $('<h5 class="card-title">' + e.name + "</h5>");
        a.attr("src", e.imageUrlFront);
        let s = $('<div class="card-body" style="text-align: center;"></div>'),
          c = $(
            '<button type="button" class="btn" style="background-color: #d88780; color: white" data-toggle="modal" data-target="#exampleModal">See profile</button>'
          );
        t.append(o),
          o.append(a),
          o.append(s),
          s.append(l),
          s.append(c),
          c.on("click", function (t) {
            !(function (e) {
              n(e).then(function () {
                console.log(e), r(e);
              });
            })(e);
          });
      });
    },
    loadList: function () {
      return fetch(t)
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            o({ name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    loadDetails: n,
    showModal: r,
    hideModal: function () {
      document.querySelector("#modal-container").classList.remove("is-visible");
    },
  };
})();
function search() {
  var e, t, o, n;
  for (
    e = document.getElementById("myInput").value.toUpperCase(),
      t = document.getElementById("myUL").querySelectorAll(".card"),
      n = 0;
    n < t.length;
    n++
  )
    (
      (o = t[n].querySelector(".card-body").querySelector(".card-title")[0])
        .textContent || o.innerText
    )
      .toUpperCase()
      .indexOf(e) > -1
      ? (t[n].style.display = "")
      : (t[n].style.display = "none");
}
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
