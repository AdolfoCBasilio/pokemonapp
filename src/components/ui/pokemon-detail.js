import { LitElement, html, css } from 'lit';
import './pokemon-edit.js';

class PokemonDetail extends LitElement {
    static properties = {
        pokemon: { type: Object },
        selectedEvolutionIndex: { type: Number }
    };

    constructor() {
        super();
        this.selectedEvolutionIndex = -1;
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
            background-color: #f9f9f9;
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
            margin-bottom: 16px;
        }
        .header img {
            height: 25vh;
        }
        .button-container {
            display: flex;
            margin-bottom: 16px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        button:hover {
            background-color: #45a049;
        }
        h2 {
            margin: 16px 0;
            font-size: 24px;
            color: #333;
        }
        h3 {
            font-size: 20px;
            margin: 20px 0 10px;
            color: #333;
        }
        .evolutions {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-top: 16px;
        }
        .evolution-item {
            text-align: center;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .evolution-item.selected img{
            transform: scale(1.05);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        }
        .evolution-item img {
            width: 100px;
            height: 100px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .edit-container {
            margin-top: 24px;
            padding: 16px;
            border-top: 1px solid #ddd;
        }
    `;

    render() {
        if (!this.pokemon) {
            return html`<p>Cargando...</p>`;
        }

        return html`
            <div class="container">
                <div class="header">
                    <img src="/images/pokedex.png" alt="Pokedex">
                </div>
                <div class="button-container">
                    <button @click="${this.goBack}">Volver a la lista</button>
                </div>
                <h2>${this.pokemon.name} - ${this.pokemon.type}</h2>
                <img src="${this.pokemon.image}" alt="${this.pokemon.name}">
                <h3>Evoluciones</h3>
                ${this.pokemon.evolutions.length > 0 ? html`
                    <div class="evolutions">
                        ${this.pokemon.evolutions.map((evolution, index) => html`
                            <div class="evolution-item ${index === this.selectedEvolutionIndex ? 'selected' : ''}">
                                <img src="${evolution.image}" alt="${evolution.name}">
                                <p>${evolution.name} - ${evolution.type}</p>
                            </div>
                        `)}
                    </div>
                ` : html`<p>Este Pokémon no tiene evoluciones.</p>`}
                <div class="edit-container">
                    <pokemon-edit
                        .pokemon="${this.pokemon}"
                        @pokemon-updated="${this.updatePokemon}"
                        @field-selected="${(e) => this.handleFieldSelected(e)}">
                    </pokemon-edit>
                </div>
            </div>
        `;
    }

    goBack() {
        this.dispatchEvent(new CustomEvent('back-to-list'));
    }

    updatePokemon(event) {
        this.pokemon = event.detail.pokemon;
    }

    handleFieldSelected(event) {
        this.selectedEvolutionIndex = event.detail.index;
    }
}

customElements.define('pokemon-detail', PokemonDetail);
