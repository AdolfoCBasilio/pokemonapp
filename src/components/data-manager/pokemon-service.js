// src/components/data-manager/pokemon-service.js
export async function fetchPokemons() {
    const response = await fetch('http://localhost:3002/pokemon');
    return await response.json();
}
