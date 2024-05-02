const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

}

function convertPokeApiAboutToPokemon(pokeDetail) {

    function transformHeight(height) {

        // Transforma o número em pés e polegadas
        const feet = Math.floor(height / 12);
        const inches = height % 12;

        // Converte o número para centímetros com duas casas decimais
        const centimeters = (height * 2.54 / 10).toFixed(2); // dividido por 10 para converter polegadas em centímetros

        // Formata o valor de centímetros para ter duas casas decimais, mesmo que seja um número inteiro
        const formattedCentimeters = parseFloat(centimeters).toFixed(2);

        return `${feet}'${inches}" (${formattedCentimeters} cm)`;
    }

    function transformWeight(weight) {
        // Converte o peso de libras para quilogramas com uma casa decimal
        const kilograms = (weight * 0.453592).toFixed(1);

        return `${weight} lbs (${kilograms} kg)`;
    }

    const stats_hp = pokeDetail.stats.find((statsSlot) => statsSlot.stat.name === "hp")




    const height = transformHeight(pokeDetail.height);

    const weight = transformWeight(pokeDetail.weight);

    const pokemonAbout = new PokemonAbout()
    if (stats_hp) {
        pokemonAbout.hp = stats_hp.base_stat
    }
    pokemonAbout.height = height
    pokemonAbout.weight = weight

    const abilities = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)

    pokemonAbout.abilities = abilities

    return pokemonAbout

}

function convertPokeApiAboutSpecieToPokemon(pokeDetail) {
    const pokemonAbout = new PokemonAbout();

    // Encontra o objeto de espécie na linguagem "en"
    const englishSpecies = pokeDetail.genera.find((speciesSlot) => speciesSlot.language.name === "en")

    // Se encontrar o objeto de espécie em inglês, atribui o valor do "genus"
    if (englishSpecies) {
        pokemonAbout.species = englishSpecies.genus
    }

    const egg_groups = pokeDetail.egg_groups.map((EggSlot) => EggSlot.name)

    pokemonAbout.egg_groups = egg_groups

    return pokemonAbout;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map((pokeApi.getPokemonDetail)))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}

pokeApi.getPokemon = (number = 1) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => convertPokeApiAboutToPokemon(jsonBody));
}

pokeApi.getPokemonSpecies = (number = 1) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${number}/`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => convertPokeApiAboutSpecieToPokemon(jsonBody));
}
