import { LitElement, html, css } from 'lit';

class PokemonList extends LitElement {
    static properties = {
        pokemons: { type: Array }
    };

    constructor() {
        super();
        this.pokemons = [];
    }

    static styles = css`
    .container {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        padding: 16px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .container img {
        width: 150px;
        height: 150px;
    }
        .header {
            width: 100%;
            height: 10vh;
            background-color: red;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .header img {
            height: 25vh;
        }
        .pokemon-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 16px;
            padding: 16px;
        }
        .pokemon-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
            cursor: pointer;
        }
        .pokemon-card:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        }
        .pokemon-card img {
            width: 80px;
            height: 80px;
            margin-bottom: 8px;
        }
        .pokemon-card p {
            margin: 0;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
        }
    `;

    render() {
        return html`
        <div class="container">

            <div class="header">
                <img src="/images/pokedex.png" alt="Pokedex">
            </div>
            <div class="pokemon-grid">
                ${this.pokemons.map(pokemon => html`
                    <div class="pokemon-card" @click="${() => this.selectPokemon(pokemon)}">
                        <img src="${pokemon.image}" alt="${pokemon.name}">
                        <p>${pokemon.name}</p>
                    </div>
                `)}
            </div>
        </div>
        `;
    }

    selectPokemon(pokemon) {
        this.dispatchEvent(new CustomEvent('pokemon-selected', { detail: pokemon }));
    }
}

customElements.define('pokemon-list', PokemonList);
