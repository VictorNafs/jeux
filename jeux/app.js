const apiKey = '0346e739b74f4099860b46df89d212d3';
const apiUrl = 'https://api.rawg.io/api/games?key=' + apiKey;
console.log("Ma clé API est : ", apiUrl);



fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const games = data.results;
    const gameImagesHtml = games.map(game => {
      return `
        <div class="game">
          <img src="${game.background_image}" alt="${game.name}" />
          <div class="platforms">${getPlatformIconsHtml(game)}</div>
          <p>${game.name}</p>
        </div>
      `;
    }).join('');
    document.querySelector('#game-album').innerHTML = gameImagesHtml;
  })
  .catch(error => {
    console.error('Error:', error);
  });

function searchGames(searchText) {
    const searchUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(searchText)}`;
  
    fetch(searchUrl)
      .then(response => response.json())
      .then(data => {
        const games = data.results;
        const gameImagesHtml = games.map(game => {
          return `
            <div class="game">
              <img src="${game.background_image}" alt="${game.name}" />
              <div class="platforms">${getPlatformIconsHtml(game)}</div>
              <p>${game.name}</p>
            </div>
          `;
        }).join('');
        document.querySelector('#game-album').innerHTML = gameImagesHtml;
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

document.querySelector('#search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const searchText = document.querySelector('#search-input').value;
  searchGames(searchText);
});

const platformIcons = {
  "pc": "img/pc.png",
  "playstation": "img/playstation.png",
  "xbox": "img/xbox.png",
  "nintendo": "img/nintendo.png",
  "linux": "img/linux.png",
  "mac": "img/mac.png"
};

function getPlatformIconsHtml(game) {
  const platforms = game.parent_platforms.map(platform => platform.platform.slug);

  const platformIconsHtml = platforms.map(platformSlug => {
    const iconFilename = platformIcons[platformSlug];
    return `<img src="${iconFilename}" alt="${platformSlug}" title="${platformSlug}" />`;
  }).join("");

  return platformIconsHtml;
}

let currentPage = 1;

document.querySelector("#show-more").addEventListener("click", () => {
  currentPage++;
  loadGames(currentPage);
});

function loadGames(page) {
  const pageUrl = `${apiUrl}&page=${page}`;

  fetch(pageUrl)
    .then((response) => response.json())
    .then((data) => {
      const games = data.results;
      const gameImagesHtml = games
        .map((game) => {
          return `
            <div class="game">
              <img src="${game.background_image}" alt="${game.name}" />
              <div class="platforms">${getPlatformIconsHtml(game)}</div>
              <p>${game.name}</p>
            </div>
          `;
        })
        .join("");
      document.querySelector("#game-album").innerHTML += gameImagesHtml;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

loadGames(currentPage);
