import { Router } from '@vaadin/router';
import { LitElement, css, html } from 'lit';
import { router } from '../../index';
import { styles } from '../styles';

class PokemonDetail extends LitElement {

    static styles = [styles, css`
        .container {
            align-items: flex-start;
            padding: 4rem;
        }

        .pokemon-back-button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            color: #fff;
            background-color: #f37021; /* Color naranja similar a la franquicia Pokémon */
            border: 2px solid #000;
            border-radius: 8px;
            cursor: pointer;
            text-decoration: none;
            transition: background-color 0.3s, border-color 0.3s, transform 0.2s;
        }

        .pokemon-back-button:hover {
            background-color: #ffcc00; /* Cambio de color al pasar el ratón */
            border-color: #000;
        }

        .pokemon-back-button:active {
            transform: scale(0.95); /* Efecto de escala al hacer clic */
        }

        .pokemon {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); 
            gap: 1rem;
            width: 100%
        }

        .pokemon__data {
            padding: 1rem;
        }
        .pokemon__data__number {
            font-size: 250px;
            font-weight: 700;
            opacity: 0.3;
        }
        .pokemon__data__info {
            display: flex;
            gap: 10rem;
        }
        .pokemon__data__info__group p {
            font-weight: 700;
        }
        .pokemon__image {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .pokemon__image img {
            height: 100%;
        }

        .pokemon__stats {
            padding: 1rem;
        }
        .pokemon__stats__container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            flex: 1;
        }
        .pokemon__stats__container__group{
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .pokemon__stats__container__group span{
            flex: 20%;
            font-weight: 500;
            font-size: 18px;
        }

        .progress-bar{
            width: 100%;
            height: 30px;
            border-radius: 10px;
        }
    `];

    static properties = {
        pokemon: {},
        loading: true
    };

    constructor() {
        super();
        this.loading = true;
    }

    firstUpdated() {
        this.getPokemonDataById(router.location.params.id).then((pokemon) => {
            this.pokemon = pokemon;
            this.loading = false;
        });
    }

    render() {
        return html`${this.loading ? this.loadingTemplate() : this.pokemonTemplate()}`;
    }

    loadingTemplate() {
        return html`<loading-component></loading-component>`;
    }

    pokemonTemplate() {
        return html`
        <div class="container">
            ${this.goBackTemplate()}
            <div class="pokemon">
                ${this.pokemonBasicDataTemplate()}
                ${this.pokemonImageTemplate()}
                ${this.pokemonStatsTemplate()}
            </div>
        </div>
        `;
    }

    goBackTemplate() {
        return html`<button class="pokemon-back-button" @click="${this.goBackRouting}">Volver</button>`;
    }

    pokemonNumberTemplate() {
        return html`<span class="pokemon__data__number pokemon__types__${this.pokemon.types[0].type.name}">#${this.pokemon.id}</span>`;
    }

    pokemonBasicDataTemplate() {
        return html`<div class="pokemon__data">
            ${this.pokemonNumberTemplate()}
            <h2 class="card__title__name">${this.pokemon.name.toUpperCase()}</h2>
            <div class="card__types"> ${this.pokemon.types.map((type) =>
            html`<span class="card__types__${type.type.name} bubble">${type.type.name.toUpperCase()}</span>`
        )}
            </div>
            <div class="pokemon__data__info">
                <div class="pokemon__data__info__group">
                    <p>Altura</p>
                    <span>${this.pokemon.height}m</span>
                </div>
                <div class="pokemon__data__info__group">
                    <p>Peso</p>
                    <span>${this.pokemon.weight}kg</span>
                </div>
                
                
            </div>
            </div>
        `;
    }

    pokemonImageTemplate() {
        return html`<div class="pokemon__image">
            <img src="${this.pokemon.image}" alt="poke-img-${this.pokemon.name}">
        </div>`;
    }

    pokemonStatsTemplate() {
        return html`<div class="pokemon__stats">
            <h2 class="card__title__name">Estadísticas</h2>
            <div class="pokemon__stats__container">
                ${this.pokemon.stats.map((stat) =>
            html`<div class="pokemon__stats__container__group">
                            <span>${this.formatStatName(stat.stat.name)}</span>
                            <div class="progress-bar card__types__${this.pokemon.types[0].type.name}"></div>
                            <span class="counter-stat">${stat.base_stat}</span>
                        </div>`
        )}
            </div>
        </div>`;
    }

    goBackRouting() {
        Router.go('/pokemon-filter');
    }

    async getPokemonDataById(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
                height: pokemon.height,
                stats: pokemon.stats

            };
        } catch (error) {
            throw new Error('No se pudo obtener el Pokémon');
        }
    }

    formatStatName(name) {
        return name.replace('-', ' ');
    }
}

customElements.define('pokemon-detail', PokemonDetail);