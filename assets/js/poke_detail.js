const urlParams = new URLSearchParams(window.location.search);
const number = urlParams.get('number');
const name = urlParams.get('name');
const photo = urlParams.get('photo');
const type = urlParams.get('type');
const typesString = urlParams.get('types');
const types = typesString ? typesString.split(',') : [];

const title_page = (document.getElementById('title_detail'))
const content_detail = (document.getElementById('detail_pokemon'))
const section_page = (document.getElementById('section'))
const menu = (document.getElementById('menu'))
const btn_about = (document.getElementById('about'))
const btn_base_stats = (document.getElementById('base_stats'))

title_page.innerHTML = `Detail - ${name}`
content_detail.innerHTML += `<h1 id="name_pokemon" class="name">${name}</h1>
                            <span class="number">#${number}</span>
                            <ol class="types ">
                                ${types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>
                            <img src="${photo}"alt="${name}">
                            `
section_page.classList.add(`${type}`)


let pokemonAboutLoaded = false;


function loadPokemonAbout(number) {
    if (!pokemonAboutLoaded) {
        // Chama ambas as funções getPokemon e getPokemonSpecies
        Promise.all([
            pokeApi.getPokemon(number),
            pokeApi.getPokemonSpecies(number)
        ]).then(([pokemon, species]) => {
            // Criar novo elemento <ol>
            const olElement = document.createElement('ol');
            olElement.classList.add('types');
            olElement.id = 'pokemon_about'

            // Criar e adicionar o <li> com informações da espécie do Pokémon
            const speciesLi = document.createElement('li');
            speciesLi.classList.add('style');
            speciesLi.innerHTML = `Species <span class="span_style">${species.species}</span>`;
            olElement.appendChild(speciesLi);

            // Criar e adicionar os <li> dentro do <ol> com informações do Pokémon
            const heightLi = document.createElement('li');
            heightLi.classList.add('style');
            heightLi.innerHTML = `Height <span class="span_style">${pokemon.height}</span>`;
            olElement.appendChild(heightLi);

            const weightLi = document.createElement('li');
            weightLi.classList.add('style');
            weightLi.innerHTML = `Weight <span class="span_style">${pokemon.weight}</span>`;
            olElement.appendChild(weightLi);

            const abilitiesLi = document.createElement('li');
            abilitiesLi.classList.add('style');
            abilitiesLi.innerHTML = `Abilities <span class="span_style">${pokemon.abilities.join(', ')}</span>`;
            olElement.appendChild(abilitiesLi);

            const h3 = document.createElement('h3');
            h3.classList.add('style');
            h3.innerHTML = `Breeding`;
            olElement.appendChild(h3);

            const EggGroupsLi = document.createElement('li');
            EggGroupsLi.classList.add('style');
            EggGroupsLi.innerHTML = `Egg Groups <span class="span_style">${species.egg_groups.join(', ')}</span>`;
            olElement.appendChild(EggGroupsLi);

            // Adiciona o <ol> ao elemento menu
            menu.appendChild(olElement);

            pokemonAboutLoadedAbout = true; // Define para true após a carga dos detalhes "About"
            pokemonAboutLoadedBaseStats = false; // Reseta a variável para false para permitir que as estatísticas básicas sejam carregadas novamente
        });
    }
}

function loadPokemonBaseStats(number) {
    if (!pokemonAboutLoaded) {
        // Chama ambas as funções getPokemon e getPokemonSpecies
        Promise.all([
            pokeApi.getPokemon(number),
            pokeApi.getPokemonSpecies(number)
        ]).then(([pokemon, species]) => {
            // Criar novo elemento <ol>
            const olElement = document.createElement('ol');
            olElement.classList.add('types');
            olElement.id = 'pokemon_base_stats'

            const color = pokemon.hp <= 50 ? 'span_progress' : 'span_progress2';

            // Criar e adicionar os <li> dentro do <ol> com informações do Pokémon
            const heightLi = document.createElement('li');
            heightLi.classList.add('style');
            const progressWidth = `${pokemon.hp}%`;

            heightLi.innerHTML = `HP <span class="span_progress_over">${pokemon.hp}</span> <div class="${color}" style="--progress-width: ${progressWidth};"></div>`;
            olElement.appendChild(heightLi);


            // Adiciona o <ol> ao elemento menu
            menu.appendChild(olElement);

            pokemonAboutLoadedBaseStats = true; // Define para true após a carga das estatísticas básicas
            pokemonAboutLoadedAbout = false; // Reseta a variável para false para permitir que os detalhes "About" sejam carregados novamente
        });
    }
}


btn_about.addEventListener('click', () => {
    loadPokemonAbout(number);


    // Encontra o elemento <ol> pelo ID
    const pokemon_about = document.getElementById('pokemon_about');
    const pokemon_base_stats = document.getElementById('pokemon_base_stats');

    // Verifica se o elemento foi encontrado
    if (pokemon_base_stats) {
        // Define o estilo de exibição para "none" para esconder o elemento
        pokemon_about.style.display = 'block';
        pokemon_base_stats.style.display = 'none';
    }

});

btn_base_stats.addEventListener('click', () => {
    loadPokemonBaseStats(number);

    // Encontra o elemento <ol> pelo ID
    const pokemon_about = document.getElementById('pokemon_about');
    const pokemon_base_stats = document.getElementById('pokemon_base_stats');

    // Verifica se o elemento foi encontrado
    if (pokemon_about) {
        // Define o estilo de exibição para "none" para esconder o elemento
        pokemon_about.style.display = 'none';
        pokemon_base_stats.style.display = 'block';
    }
});

