// src/components/ui/modal-dialog.js
import { LitElement, html, css } from 'lit';

class ModalDialog extends LitElement {
    static styles = css`
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .modal {
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        button {
            margin-top: 20px;
            padding: 8px 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
    `;

    render() {
        return html`
            <div class="overlay" @click="${this.closeModal}">
                <div class="modal" @click="${e => e.stopPropagation()}">
                    <p>Este Pokémon ha sido marcado como repetido.</p>
                    <button @click="${this.closeModal}">Cerrar</button>
                </div>
            </div>
        `;
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('close-modal'));
    }
}

customElements.define('modal-dialog', ModalDialog);
