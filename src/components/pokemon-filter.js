import { Router } from '@vaadin/router';
import { LitElement, css, html } from 'lit';
import { styles } from '../styles';

class PokemonFilter extends LitElement {
    static styles = [styles, css`
        .filter-section {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 1rem;
        }

        .filter-section .card__types .bubble:hover {
            cursor: pointer;
        }

        #search-input {
            width: 30%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #fbb03b; 
            color: #025da6; 
            font-size: 16px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); 
            outline: none; 
        }

        #search-input::placeholder {
            color: #025da6; 
            opacity: 0.5; 
        }
    `];

    static properties = {
        pokemonArray: [],
        types: [],
        loading: true
    };

    constructor() {
        super();
        this.loading = true;
    }


    firstUpdated() {
        this.getAllPokemonTypes().then((types) => {
            this.types = types;
        });
        this.getAllPokemon('https://pokeapi.co/api/v2/pokemon', false).then((pokemonArray) => {
            this.pokemonArray = pokemonArray;
            this.loading = false;
        });
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

        this.loading = true;
        this.getPokemonByName(searchText).then((pokemon) => {
            this.pokemonArray = [pokemon];
            this.loading = false;
        }).catch(() => {
            this.loading = false;
            this.pokemonArray = [];
        });
    }

    template() {
        return html`
        <div class="container">
            ${this.templateInputSearch()}
            ${this.loading ? html`<loading-component></loading-component>` : this.pokemonArray?.length ? this.showPokemonCards() : this.showPokemonNotFound()}
        </div>
        `;
    }

    templateInputSearch() {
        return html`<div class="filter-section">
        <div class="card__types">
            ${this.types?.map((type) =>
            html`<span class="card__types__${type.name} bubble" @click="${() => this.pokemonByType(type.url)}">${type.name.toUpperCase()}</span>`
        )}
        </div>
        <input placeholder="Ingresa tu Pokémon favorito" type="text" id="search-input" @input="${this.handleInputChange}" />
        </div>`;
    }

    showPokemonCards() {
        return html`
        <div class="cards-container">
            ${this.pokemonArray?.map((pokemon) =>
            html`<div class="card" @click="${() => this.goToPokemon(pokemon)}">
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

    async getAllPokemon(url, isByType = false) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('No se pudo obtener los Pokémon');
            }

            const allPokemonFullData = [];
            const allPokemon = await response.json();

            const results = isByType ? allPokemon.pokemon : allPokemon.results;
            for (const pokemon of results) {
                const data = await this.getPokemonByUrl(isByType ? pokemon.pokemon.url : pokemon.url);
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

            let data = await response.json();
            data.results.unshift({ name: 'TODOS', url: 'TODOS' });

            return data.results;

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
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other.home.front_default,
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
                image: pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other.home.front_default,
                types: pokemon.types,
                weight: pokemon.weight,
                height: pokemon.height

            };
        } catch (error) {
            throw new Error('No se encontró el Pokémon');
        }
    }

    setPokemonId(id) {
        return '0'.repeat(5 - id.toString().length) + id;
    }

    pokemonByType(url) {
        this.loading = true;
        if (url === 'TODOS') {
            this.getAllPokemon('https://pokeapi.co/api/v2/pokemon', false).then((allPokemon) => {
                this.pokemonArray = allPokemon;
                this.loading = false;
            });
            return;
        }
        this.getAllPokemon(url, true).then((allPokemon) => {
            this.pokemonArray = allPokemon;
            this.loading = false;
        });
    }

    goToPokemon(pokemon) {
        Router.go(`/pokemon-detail/${pokemon.id}`);
    }
}

customElements.define('pokemon-filter', PokemonFilter);
