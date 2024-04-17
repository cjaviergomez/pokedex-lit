import { Router } from '@vaadin/router';
import { LitElement, css, html } from 'lit';
import { router } from '../../index';
import { styles } from '../styles';

class PokemonDetail extends LitElement {

    static styles = [styles, css`
        .container {
            align-items: flex-start;
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
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0 8rem; 
        }

        .pokemon__number {
            font-size: 250px;
            font-weight: 700;
            opacity: 0.3;
        }

        .pokemon__data__info {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        .pokemon__data__info__group p {
            font-weight: 700;
        }
    `];

    static properties = {
        pokemon: {},
        loading: true
    };


    async firstUpdated() {
        this.pokemon = await this.getPokemonDataById(router.location.params.id);
        console.log(this.pokemon);
    }

    render() {
        return html`${this.pokemon ? this.pokemonTemplate() : this.loadingTemplate()}`;
    }

    loadingTemplate() {
        return html`<h1>Loading Pokemon</h1>`;
    }

    pokemonTemplate() {
        return html`
        <div class="container">
            ${this.goBackTemplate()}
            <div class="pokemon">
                ${this.pokemonNumberTemplate()}
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
        return html`<span class="pokemon__number pokemon__types__${this.pokemon.types[0].type.name}">#${this.pokemon.id}</span>`;
    }

    pokemonBasicDataTemplate() {
        return html`<div class="pokemon__data">
            <h2 class="card__title__name">${this.pokemon.name.toUpperCase()}</h2>
            <div class="card__types"> ${this.pokemon.types.map((type) =>
            html`<span class="card__types__${type.type.name} bubble">${type.type.name.toUpperCase()}</span>`
        )}
            </div>
            <div class="pokemon__data__info">
                <div class="section">
                    <div class="pokemon__data__info__group">
                        <p>Altura</p>
                        <span>${this.pokemon.height}m</span>
                    </div>
                    <div class="pokemon__data__info__group">
                        <p>Peso</p>
                        <span>${this.pokemon.weight}kg</span>
                    </div>
                </div>
                <div class="section">
                    <div class="pokemon__image">
                        <img src="${this.pokemon.image}" alt="poke-img-${this.pokemon.name}" height="100">
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    pokemonImageTemplate() {
        return html``;
    }

    pokemonStatsTemplate() {
        return html``;
    }

    goBackRouting() {
        Router.go('/pokemon-filter');
    }

    async getPokemonDataById(id) {
        this.loading = true;
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!response.ok) {
                throw new Error('No se pudo obtener el Pokémon');
            }

            const pokemon = await response.json();
            this.loading = false;
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
}

customElements.define('pokemon-detail', PokemonDetail);