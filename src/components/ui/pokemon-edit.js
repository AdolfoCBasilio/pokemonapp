import { LitElement, html, css } from 'lit';
import './modal-dialog.js';

class PokemonEdit extends LitElement {
    static properties = {
        pokemon: { type: Object },
        isDuplicate: { type: Boolean }
    };

    constructor() {
        super();
        this.isDuplicate = false;
    }

    static styles = css`
        form {
            margin-top: 16px;
        }
        label {
            display: block;
            margin: 8px 0;
        }
        input[type="text"] {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
        }
        .checkbox-label {
            display: flex;
            align-items: center;
        }
        .checkbox-label input {
            margin-right: 8px;
        }
    `;

    render() {
        return html`
            <h3>Editar Evoluciones</h3>
            <form>
                ${this.pokemon.evolutions.map((evolution, index) => html`
                    <fieldset>
                        <legend>Evolución ${index + 1}</legend>
                        <label>
                            Nombre:
                            <input type="text" .value="${evolution.name}" 
                                @input="${e => this.updateEvolutionName(e, index)}"
                                @focus="${() => this.selectField(index)}">
                        </label>
                        <label>
                            Tipo:
                            <input type="text" .value="${evolution.type}" 
                                @input="${e => this.updateEvolutionType(e, index)}"
                                @focus="${() => this.selectField(index)}">
                        </label>
                    </fieldset>
                `)}
                <label class="checkbox-label">
                    <input type="checkbox" @change="${this.toggleDuplicate}">
                    Marcar como repetido
                </label>
            </form>
            ${this.isDuplicate ? html`<modal-dialog @close-modal="${this.closeModal}"></modal-dialog>` : ''}
        `;
    }

    updateEvolutionName(event, index) {
        const updatedPokemon = { ...this.pokemon };
        updatedPokemon.evolutions = [...this.pokemon.evolutions];
        updatedPokemon.evolutions[index] = {
            ...updatedPokemon.evolutions[index],
            name: event.target.value
        };
        this.dispatchEvent(new CustomEvent('pokemon-updated', { detail: { pokemon: updatedPokemon } }));
    }

    updateEvolutionType(event, index) {
        const updatedPokemon = { ...this.pokemon };
        updatedPokemon.evolutions = [...this.pokemon.evolutions];
        updatedPokemon.evolutions[index] = {
            ...updatedPokemon.evolutions[index],
            type: event.target.value
        };
        this.dispatchEvent(new CustomEvent('pokemon-updated', { detail: { pokemon: updatedPokemon } }));
    }

    selectField(index) {
        this.dispatchEvent(new CustomEvent('field-selected', { detail: { index } }));
    }

    toggleDuplicate(event) {
        this.isDuplicate = event.target.checked;
    }

    closeModal() {
        this.isDuplicate = false;
    }
}

customElements.define('pokemon-edit', PokemonEdit);
