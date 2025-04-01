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
            <div class="story">
              ${photo}
              <h2>${story.title}</h2>
              ${date}
              <div class="content">${story.content}</div>
              ${tags}
            </div>
          `);
        });
      });
    }

    $(document).ready(function() {
      loadStories(currentLang);

      $('.lang-selector').click(function() {
        currentLang = $(this).data('lang');
        loadStories(currentLang);
      });
    });