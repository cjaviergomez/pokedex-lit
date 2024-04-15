import { LitElement, css, html } from 'lit';

export class PokemonFilter extends LitElement {
    static styles = css`
    .container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 1rem;
        padding: 1rem;
    }

    .filter-section {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 1rem;
    }

    .cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); 
        gap: 1rem;
        width: 100%
    }
    .card {
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        border: 1px solid lightgray;
        box-shadow: 2px 2px 8px 4px #d3d3d3d1;
        border-radius:15px;
        font-family: sans-serif;
        background-color: #FFCC00;
        padding: 0.5rem;
    }
    .card img {
        transition: transform 0.3s ease;
    }
    .card:hover {
        cursor: pointer;
    }
    .card:hover img {
        transform: scale(1.5); 
    }
    .card__title {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 1rem;
    }
    .card__title__name {
        font-size: 1.2rem;
        font-weight: 900;
    }
    .card__title__id {
        background-color: #fbb03b;
        border-radius: 10px;
        font-weight: 900;
        padding: 5px;
    }
    .card__types {
       display: flex;
       flex-wrap: wrap;
       gap: .5rem; 
    }

    .bubble {
        border-radius: 10px;
        font-weight: 700;
        padding: 5px;
    }
    .card__types__grass {
        background-color: #25ba28;
    }
    .card__types__poison {
        background-color: #ab4ce9;
    }

    .card__types__fire {
        background-color: #e31b39;
    }
    .card__types__water {
        background-color: #617ee3;
    }
    .card__types__flying {
        background-color: #b8c5f3;
    }
    .card__types__bug {
        background-color: #A8B820;
    }

    .card__types__normal {
        background-color: #A8A878;
    }
    .card__types__fairy {
        background-color: #F0B6BC;
    }
    .card__types__steel {
        background-color: #B8B8D0;
    }
    .card__types__dragon {
        background-color: #7038F8;
    }
    .card__types__dark {
        background-color: #705848;
    }
    .card__types__rock {
        background-color: #B8A038;
    }
    .card__types__psychic {
        background-color: #F85888;
    }
    .card__types__ice {
        background-color: #98D8D8;
    }
    .card__types__electric {
        background-color: #F8D030;
    }
    .card__types__ghost {
        background-color: #705898;
    }
    .card__types__fighting {
        background-color: #C03028;
    }
    .card__types__ground {
        background-color: #E0C068;
    }
    .card__types__unknown {
        background-color: #9f9f98;
    }
    .card__types__shadow {
        background-color: #d3d3d3;
    }

    .card__info {
        display: flex;
        gap: .5rem;
        margin-top: 5px;
    }
    .card__info__data {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 5px;
    }

    .not-found {
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 40px 0;
    }

    #search-input {
        width: 30%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #fbb03b; /* Color amarillo característico de Pikachu */
        color: #025da6; /* Color azul característico de Pokémon */
        font-size: 16px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* Sombra suave para resaltar el input */
        outline: none; /* Eliminar el contorno predeterminado en algunos navegadores */
    }

    #search-input::placeholder {
        color: #025da6; /* Color azul para el texto de marcador de posición */
        opacity: 0.5; /* Opacidad reducida para el texto de marcador de posición */
    }
    `;

    static properties = {
        pokemonArray: {},
        types: {}
    };


    async firstUpdated() {
        this.types = await this.getAllPokemonTypes();
        this.pokemonArray = await this.getAllPokemon();
    }

    render() {
        return html`${this.template()}`;
    }

    handleInputChange(event) {
        const input = event.target;
        const searchText = input.value.trim().toLowerCase();

        if (searchText.length === 0) {
            this.firstUpdated();
            return;
        }

        this.getPokemonByName(searchText).then((pokemon) => {
            this.pokemonArray = [pokemon];
        }).catch(() => this.pokemonArray = []);
    }

    template() {
        return html`
        <div class="container">
            ${this.templateInputSearch()}
            ${this.pokemonArray?.length ? this.showPokemonCards() : this.showPokemonNotFound()}
        </div>
        `;
    }

    templateInputSearch() {
        return html`<div class="filter-section">
        <div class="card__types">
            ${this.types?.map((type) =>
            html`<span class="card__types__${type.name} bubble">${type.name.toUpperCase()}</span>`
        )}
        </div>
        <input placeholder="Ingresa tu Pokémon favorito" type="text" id="search-input" @input="${this.handleInputChange}" />
        </div>`;
    }

    showPokemonCards() {
        return html`
        <div class="cards-container">
            ${this.pokemonArray?.map((pokemon) =>
            html`<div class="card" @click="${this.goToPokemon(pokemon)}">
                    <img src="${pokemon.image}" alt="poke-img-${pokemon.name}" height="100">
                    <div class="card__title">
                        <span class="card__title__id">#${this.setPokemonId(pokemon.id)}</span> 
                        <h2 class="card__title__name">${pokemon.name.toUpperCase()}</h2>
                    </div>
                    <div class="card__types"> ${pokemon.types.map((type) =>
                html`<span class="card__types__${type.type.name} bubble">${type.type.name.toUpperCase()}</span>`
            )}
                    </div>
                    <div class="card__info">
                        <span class="card__info__data">${pokemon.height}M</span>
                        <span class="card__info__data">${pokemon.weight}KG</span>
                    </div>
                </div>`
        )}
        </div>`;
    }

    showPokemonNotFound() {
        return html`<div class="not-found">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/54.svg" alt="poke-img-not-found" height="300">
        <h3>Pokemon not found</h3>
        </div>
        `;
    }

    async getAllPokemon() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon');
            if (!response.ok) {
                throw new Error('No se pudo obtener los Pokémon');
            }

            const allPokemonFullData = []
            const allPokemon = await response.json();

            for (const pokemon of allPokemon.results) {
                const data = await this.getPokemonByUrl(pokemon.url);
                allPokemonFullData.push(data);
            }

            return allPokemonFullData;

        } catch (error) {
            throw new Error('No se pudo obtener los Pokémon');
        }
    }

    async getAllPokemonTypes() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/type');
            if (!response.ok) {
                throw new Error('No se pudo obtener los tipos de Pokémon');
            }

            const types = await response.json();

            return types.results;

        } catch (error) {
            throw new Error('No se pudo obtener los tipos de Pokémon');
        }
    }

    async getPokemonByUrl(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('No se pudo obtener el Pokémon');
            }

            const pokemon = await response.json();
            console.log({ pokemon });

            pokemon.types.map((type) => {
                const isAdd = this.types.some(data => data.name === type.type.name);
                if (!isAdd) {
                    this.types.push(type.type);
                }
            });

            console.log(this.types);

            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types,
                weight: pokemon.weight,
                height: pokemon.height

            };
        } catch (error) {
            throw new Error('No se pudo obtener el Pokémon');
        }
    }

    async getPokemonByName(name) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if (!response.ok) {
                throw new Error('No se encontró el Pokémon');
            }

            const pokemon = await response.json();
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types,
                weight: pokemon.weight,
                height: pokemon.height

            };
        } catch (error) {
            throw new Error('No se encontró el Pokémon');
        }
    }

    setPokemonId(id) {
        return id.toString().length === 1 ? "00" + id : "0" + id;
    }

    pokemonByType(url) {
        console.log(url);
    }

    goToPokemon(pokemon) {
        console.log({ pokemon });
    }
}

customElements.define('pokemon-filter', PokemonFilter);
