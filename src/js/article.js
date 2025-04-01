let currentLang = 'it';

function loadStories(lang) {
    const files = ['articles/romania.json']; 
  
    Promise.all(files.map(file => $.getJSON(file))).then(allData => {
      let allStories = [];
  
      allData.forEach(data => {
        const stories = data.translations[lang]?.stories || data.translations['en'].stories;
        stories.forEach(story => {
          story.country = data.country || ''; // Aggiungi info nazione (se nel JSON)
          allStories.push(story);
        });
      });
  
      // Ordina tutte le storie insieme per data decrescente
      allStories.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      $('#stories').html('');
      allStories.forEach(story => {
        const photo = story.photo ? `<img src="${story.photo}" alt="${story.title}" />` : '';
        const tags = story.tags ? `<div class="tags">${story.tags.map(tag => `<span>${tag}</span>`).join('')}</div>` : '';
        $('#stories').append(`
          <div class="story" id="${story.id}">
            ${photo}
            <h2>${story.title}</h2> 
            <div class="meta-row">
              <div class="meta">${story.date} ${story.city ? '— ' + story.city : ''} ${story.country ? '(' + story.country + ')' : ''}</div>
              <span class="copy-link" title="Copia link" onclick="copyLink('${story.id}')">🔗</span>
            </div>
            <div class="content">${story.content}</div>
            ${tags}
          </div>
        `);
      });
  
      // Scroll automatico se presente un hash nell'URL
      const targetId = window.location.hash?.substring(1);
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
  

function copyLink(id) {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copiato negli appunti!');
    });
}

$(document).ready(function() {
    loadStories(currentLang);

    $('.lang-selector').click(function() {
    currentLang = $(this).data('lang');
    loadStories(currentLang);
    });
});