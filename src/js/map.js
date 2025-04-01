const files = [
    'articles/romania.json'
  ];

  const map = L.map('map').setView([45.0, 25.5], 6);
  map.scrollWheelZoom.disable();

  map.on('keydown', function (e) {
    if (e.originalEvent.ctrlKey) {
      map.scrollWheelZoom.enable();
    }
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  Promise.all(files.map(f => fetch(f).then(r => r.json())))
    .then(allData => {
      allData.forEach(data => {
        const stories = data.translations.it.stories; // o rileva la lingua attiva
        stories.forEach(story => {
          if (story.coords) {
            const popup = `
              <strong>${story.city}</strong><br>
              ${data.country}<br>
              <small>${story.date}</small><br>
              <a href="index.html?article=${story.id}" target="_blank">Vai al racconto</a>
            `;
            L.marker(story.coords).addTo(map).bindPopup(popup);
          }
        });
      });
    });