const urlParams = new URLSearchParams(window.location.search);
const number = urlParams.get("number");
const name = urlParams.get("name");
const photo = urlParams.get("photo");
const type = urlParams.get("type");
const typesString = urlParams.get("types");
const types = typesString ? typesString.split(",") : [];

const title_page = document.getElementById("title_detail");
const content_detail = document.getElementById("detail_pokemon");
const section_page = document.getElementById("section");
const menu = document.getElementById("menu");
const btn_about = document.getElementById("about");
const btn_base_stats = document.getElementById("base_stats");

title_page.innerHTML = `Detail - ${name}`;
content_detail.innerHTML += `<h1 id="name_pokemon" class="name">${name}</h1>
                            <span class="number">#${number}</span>
                            <ol class="types ">
                                ${types
                                  .map(
                                    (type) =>
                                      `<li class="type ${type}">${type}</li>`
                                  )
                                  .join("")}
                            </ol>
                            <img src="${photo}"alt="${name}">
                            `;
section_page.classList.add(`${type}`);

let pokemonAboutList = false;
let pokemonBaseStatsList = false;

function loadPokemonAbout(number) {
  if (!pokemonAboutList) {
    // Chama ambas as funções getPokemon e getPokemonSpecies
    Promise.all([
      pokeApi.getPokemon(number),
      pokeApi.getPokemonSpecies(number),
    ]).then(([pokemon, species]) => {
      // Criar novo elemento <ol>
      const olElement = document.createElement("ol");
      olElement.classList.add("types");
      olElement.id = "pokemon_about";

      // Criar e adicionar o <li> com informações da espécie do Pokémon
      const speciesLi = document.createElement("li");
      speciesLi.classList.add("style");
      speciesLi.innerHTML = `Species <span class="span_style">${species.species}</span>`;
      olElement.appendChild(speciesLi);

      // Criar e adicionar os <li> dentro do <ol> com informações do Pokémon
      const heightLi = document.createElement("li");
      heightLi.classList.add("style");
      heightLi.innerHTML = `Height <span class="span_style">${pokemon.height}</span>`;
      olElement.appendChild(heightLi);

      const weightLi = document.createElement("li");
      weightLi.classList.add("style");
      weightLi.innerHTML = `Weight <span class="span_style">${pokemon.weight}</span>`;
      olElement.appendChild(weightLi);

      const abilitiesLi = document.createElement("li");
      abilitiesLi.classList.add("style");
      abilitiesLi.innerHTML = `Abilities <span class="span_style">${pokemon.abilities.join(
        ", "
      )}</span>`;
      olElement.appendChild(abilitiesLi);

      const h3 = document.createElement("h3");
      h3.classList.add("style");
      h3.innerHTML = `Breeding`;
      olElement.appendChild(h3);

      const EggGroupsLi = document.createElement("li");
      EggGroupsLi.classList.add("style");
      EggGroupsLi.innerHTML = `Egg Groups <span class="span_style">${species.egg_groups.join(
        ", "
      )}</span>`;
      olElement.appendChild(EggGroupsLi);

      // Adiciona o <ol> ao elemento menu
      menu.appendChild(olElement);

      pokemonAboutList = true;
    });
  }
}

function loadPokemonBaseStats(number) {
  if (!pokemonBaseStatsList) {
    // Chama ambas as funções getPokemon e getPokemonSpecies
    Promise.all([
      pokeApi.getPokemon(number),
      pokeApi.getPokemonSpecies(number),
    ]).then(([pokemon, species]) => {
      // Criar novo elemento <ol>

      const total =
        pokemon.hp +
        pokemon.attack +
        pokemon.defense +
        pokemon.special_attack +
        pokemon.special_defense +
        pokemon.speed;

      const olElement = document.createElement("ol");
      olElement.classList.add("types");
      olElement.id = "pokemon_base_stats";

      const colorHp = pokemon.hp <= 50 ? "span_progress" : "span_progress2";
      const colorAttack =
        pokemon.attack <= 50 ? "span_progress" : "span_progress2";
      const colorDefense =
        pokemon.defense <= 50 ? "span_progress" : "span_progress2";
      const colorSpecialAttack =
        pokemon.special_attack <= 50 ? "span_progress" : "span_progress2";
      const colorSpecialDefense =
        pokemon.special_defense <= 50 ? "span_progress" : "span_progress2";
      const colorSpeed =
        pokemon.speed <= 50 ? "span_progress" : "span_progress2";
      const colorTotal = total <= 50 ? "span_progress" : "span_progress2";

      let percTotal = total >= 100 ? 100 : total;

      // Criar e adicionar os <li> dentro do <ol> com informações do Pokémon
      const hpLi = document.createElement("li");
      hpLi.classList.add("style");
      const progressHp = `${pokemon.hp}%`;

      hpLi.innerHTML = `HP <span class="span_progress_over">${pokemon.hp}</span> <div class="${colorHp}" style="--${colorHp}-width: ${progressHp};"></div>`;
      olElement.appendChild(hpLi);

      const attackLi = document.createElement("li");
      attackLi.classList.add("style");
      const progressAttack = `${pokemon.attack}%`;

      attackLi.innerHTML = `Attack <span class="span_progress_over">${pokemon.attack}</span> <div class="${colorAttack}" style="--${colorAttack}-width: ${progressAttack};"></div>`;
      olElement.appendChild(attackLi);

      const defenseLi = document.createElement("li");
      defenseLi.classList.add("style");
      const progressDefense = `${pokemon.defense}%`;

      defenseLi.innerHTML = `Defense <span class="span_progress_over">${pokemon.defense}</span> <div class="${colorDefense}" style="--${colorDefense}-width: ${progressDefense};"></div>`;
      olElement.appendChild(defenseLi);

      const special_attackLi = document.createElement("li");
      special_attackLi.classList.add("style");
      const progressSpecialAttack = `${pokemon.special_attack}%`;

      special_attackLi.innerHTML = `Sp. Atk <span class="span_progress_over">${pokemon.special_attack}</span> <div class="${colorSpecialAttack}" style="--${colorSpecialAttack}-width: ${progressSpecialAttack};"></div>`;
      olElement.appendChild(special_attackLi);

      const special_defenseLi = document.createElement("li");
      special_defenseLi.classList.add("style");
      const progressSpecialDefense = `${pokemon.special_defense}%`;

      special_defenseLi.innerHTML = `Sp. Def <span class="span_progress_over">${pokemon.special_defense}</span> <div class="${colorSpecialDefense}" style="--${colorSpecialDefense}-width: ${progressSpecialDefense};"></div>`;
      olElement.appendChild(special_defenseLi);

      const speedLi = document.createElement("li");
      speedLi.classList.add("style");
      const progressSpeed = `${pokemon.speed}%`;

      speedLi.innerHTML = `Speed <span class="span_progress_over">${pokemon.speed}</span> <div class="${colorSpeed}" style="--${colorSpeed}-width: ${progressSpeed};"></div>`;
      olElement.appendChild(speedLi);

      const totalLi = document.createElement("li");
      totalLi.classList.add("style");
      const progressTotal = `${total}%`;

      totalLi.innerHTML = `Total <span class="span_progress_over">${total}</span> <div class="${colorTotal}" style="--${colorTotal}-width: ${progressTotal};"></div>`;
      olElement.appendChild(totalLi);

      // Adiciona o <ol> ao elemento menu
      menu.appendChild(olElement);

      pokemonBaseStatsList = true; // Define para true após a carga das estatísticas básicas
    });
  }
}

btn_about.addEventListener("click", () => {
  const pokemon_about = document.getElementById("pokemon_about");
  const pokemon_base_stats = document.getElementById("pokemon_base_stats");
  loadPokemonAbout(number);

  pokemon_base_stats.style.display = "none";
  pokemon_about.style.display = "block";
});

btn_base_stats.addEventListener("click", () => {
  const pokemon_about = document.getElementById("pokemon_about");
  const pokemon_base_stats = document.getElementById("pokemon_base_stats");
  loadPokemonBaseStats(number);
  pokemon_about.style.display = "none";
  pokemon_base_stats.style.display = "block";
});
