let currentLang = 'it';

    function loadStories(lang) {
      $.getJSON('articles/romania.json', function(data) {
        const stories = data.translations[lang]?.stories || data.translations['en'].stories;
        $('#stories').html('');
        stories.forEach(story => {
          const photo = story.photo ? `<img src="${story.photo}" alt="${story.title}" />` : '';
          const date = story.date ? `<div class="meta">${story.date}</div>` : '';
          const tags = story.tags ? `<div class="tags">${story.tags.map(tag => `<span>${tag}</span>`).join('')}</div>` : '';

          $('#stories').append(`
            <div class="story" id="${story.id}">
              ${photo}
              <h2>${story.title}</h2> 
              <div class="copy-link" title="Copia link" onclick="copyLink('${story.id}')">🔗</div>
              ${date}
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