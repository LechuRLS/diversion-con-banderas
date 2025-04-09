document.addEventListener('DOMContentLoaded', () => {
    fetchCountries();
  });
  
  async function fetchCountries() {
    try {
      const response = await fetch("https:restcountries.com/v3.1/all?fields=name,flags,capital,population,car")

      const countries = await response.json();
  
      countries.sort((a, b) => a.name.common.toUpperCase().localeCompare(b.name.common.toUpperCase()));
  
      renderCountries(countries);
    } catch (error) {
      console.error('Error al obtener los países:', error);
    }
  }
  
  function renderCountries(countries) {
    const container = document.getElementById('countries-list');
    container.innerHTML = '';
  
    countries.forEach(country => {
      const card = document.createElement('div');
      card.classList.add('country-card');
  
      card.innerHTML = `
        <img src="${country.flags.png}" alt="${country.name.common}" class="flag">
        <div class="country-name">${country.name.common}</div>
      `;
  
      card.addEventListener('click', () => showCountryDetails(country));
      container.appendChild(card);
    });
  }
  
  function showCountryDetails(country) {
        const existingModal = document.querySelector('.modal');
    if (existingModal) existingModal.remove();
  
    const modal = document.createElement('div');
    modal.classList.add('modal');
  
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-button">X</span>
        <h2>${country.name.common}</h2>
        <img src="${country.flags.png}" alt="Bandera de ${country.name.common}" class="modal-flag">
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'No disponible'}</p>
        <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Se conduce por:</strong> ${country.car?.side === 'right' ? 'la derecha' : 'la izquierda'}</p>
      </div>
    `;
  
    document.body.appendChild(modal);
  
    document.querySelector('.close-button').addEventListener('click', () => {
      modal.remove();
    });
  }
  