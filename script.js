
// script.js
// display array of themes for the christmas ecard
const themes = [
    { name: 'Good Fortune', img: 'postcard1.png', link: 'ecard-theme1.html' },
    { name: 'Flower bloom', img: 'postcard2.png', link: 'ecard-theme2.html' },
    { name: 'Wealth', img: 'postcard3.png', link: 'ecard-theme3.html' }
];

// theme container from html file
const container = document.getElementById('themeContainer');
// create selection card for each theme
themes.forEach(theme => {
    const card = document.createElement('div');
    card.className = 'theme-card';
    // add the theme image, name and button
    card.innerHTML = `
      <img src="${theme.img}" alt="${theme.name}" width="200">
      <h3>${theme.name}</h3>
      <a href="${theme.link}"><button>🧧 Create Your E-Card 🧧</button></a>
    `;
    // add the card to the container
    container.appendChild(card);
});
