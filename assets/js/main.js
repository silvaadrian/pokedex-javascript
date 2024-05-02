const pokemonList = (document.getElementById('pokemonList'))
const loadMoreButton = (document.getElementById('loadMore'))
const limit = 10
const maxRecords = 151
let offset = 0


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `  
            <li class="pokemon ${pokemon.type}" onclick="handleButtonClick('${pokemon.number}', '${pokemon.name}', '${pokemon.photo}', '${pokemon.type}', '${pokemon.types}')">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types ">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
    
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                </div>
        </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

})

function handleButtonClick(number, name, photo, type, types) {
    const url = `index_detail.html?number=${number}&name=${name}&photo=${photo}&type=${type}&types=${types}`;
    window.location.href = url;
}
