// src/components/presentational/pokemon-app.js
import { LitElement, html, css } from 'lit';
import '../ui/pokemon-list.js';
import '../ui/pokemon-detail.js';
import { fetchPokemons } from '../data-manager/pokemon-service.js';

class PokemonApp extends LitElement {
    static properties = {
        selectedPokemon: { type: Object },
        view: { type: String },
        pokemons: { type: Array }
    };

    constructor() {
        super();
        this.view = 'list';
        this.selectedPokemon = null;
        this.pokemons = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this.loadPokemons();
    }

    async loadPokemons() {
        this.pokemons = await fetchPokemons();
        console.log(this.pokemons);
    }

    static styles = css`
        :host {
            display: block;
            font-family: Arial, sans-serif;
        }
    `;

    render() {
        return html`
            ${this.view === 'list'
                ? html`
                    <pokemon-list 
                        .pokemons="${this.pokemons}" 
                        @pokemon-selected="${this.showPokemonDetail}">
                    </pokemon-list>`
                : html`
                    <pokemon-detail 
                        .pokemon="${this.selectedPokemon}" 
                        @back-to-list="${this.showPokemonList}">
                    </pokemon-detail>`
            }
        `;
    }

    showPokemonDetail(event) {
        this.selectedPokemon = event.detail;
        this.view = 'detail';
    }

    showPokemonList() {
        this.selectedPokemon = null;
        this.view = 'list';
    }
}

customElements.define('pokemon-app', PokemonApp);
