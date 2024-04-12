import { LitElement, css, html } from 'lit';

class PokemonNavbar extends LitElement {
    static styles = css`
    .navbar {
        background-color: red;
    }
    `;

    render() {
        return html`
      <div class="navbar">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Pok%C3%A9mon_FanMade_Logo.png/1280px-Pok%C3%A9mon_FanMade_Logo.png" height="100">
      </div>
    `;
    }
}

customElements.define('pokemon-navbar', PokemonNavbar);
