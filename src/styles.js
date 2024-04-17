import { css } from 'lit';

export const styles = css`
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
    .pokemon__types__grass {
        color: #25ba28;
    }
    .pokemon__types__poison {
        color: #ab4ce9;
    }

    .pokemon__types__fire {
        color: #e31b39;
    }
    .pokemon__types__water {
        color: #617ee3;
    }
    .pokemon__types__flying {
        color: #b8c5f3;
    }
    .pokemon__types__bug {
        color: #A8B820;
    }

    .pokemon__types__normal {
        color: #A8A878;
    }
    .pokemon__types__fairy {
        color: #F0B6BC;
    }
    .pokemon__types__steel {
        color: #B8B8D0;
    }
    .pokemon__types__dragon {
        color: #7038F8;
    }
    .pokemon__types__dark {
        color: #705848;
    }
    .pokemon__types__rock {
        color: #B8A038;
    }
    .pokemon__types__psychic {
        color: #F85888;
    }
    .pokemon__types__ice {
        color: #98D8D8;
    }
    .pokemon__types__electric {
        color: #F8D030;
    }
    .pokemon__types__ghost {
        color: #705898;
    }
    .pokemon__types__fighting {
        color: #C03028;
    }
    .pokemon__types__ground {
        color: #E0C068;
    }
    .pokemon__types__unknown {
        color: #9f9f98;
    }
    .pokemon__types__shadow {
        color: #d3d3d3;
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
`;