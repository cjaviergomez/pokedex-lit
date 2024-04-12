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
    .card__title {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 1rem;
    }
    .card__title__name {
        font-size: 1.4rem;
        font-weight: 900;
    }
    .card__title__id {
        background-color: #fbb03b;
        border-radius: 10px;
        font-weight: 900;
        padding: 5px;
    }
    .card__body {
        
    }

    .card__info {
        display: flex;
        gap: .5rem;
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
        pokemonArray: {}
    };


    async firstUpdated() {
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
        return html`<input placeholder="Ingresa tu Pokémon favorito" type="text" id="search-input" @input="${this.handleInputChange}" />`;
    }

    showPokemonCards() {
        return html`
        <div class="cards-container">
            ${this.pokemonArray?.map((pokemon) =>
            html`<div class="card">
                    <img src="${pokemon.image}" alt="poke-img-${pokemon.name}" height="100">
                    <div class="card__title">
                        <span class="card__title__id">#${this.setPokemonId(pokemon.id)}</span> 
                        <h2 class="card__title__name">${pokemon.name.toUpperCase()}</h2>
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
        <img src="https://robnei.blog/wp-content/uploads/2021/08/pokemon26.png" alt="poke-img-not-found" height="300">
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

    async getPokemonByUrl(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('No se pudo obtener el Pokémon');
            }

            const pokemon = await response.json();
            console.log({ pokemon });
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                abilities: pokemon.abilities,
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
                abilities: pokemon.abilities,
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
}

customElements.define('pokemon-filter', PokemonFilter);
