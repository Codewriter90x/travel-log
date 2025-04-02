let currentLang = 'it';

function loadStories(lang) {
    const files = ['articles/romania.json'];
  
    Promise.all(files.map(file => $.getJSON(file))).then(allData => {
      let allStories = [];
  
      allData.forEach(data => {
        const stories = data.translations[lang]?.stories || data.translations['en'].stories;
        stories.forEach(story => {
          story.country = data.country || '';
          allStories.push(story);
        });
      });
  
      allStories.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      $('#stories').html('');
      allStories.forEach(story => {
        $('#stories').append(`
          <div class="card mb-4" id="${story.id}">
            <div class="card-header d-flex justify-content-between align-items-center">
              <div>
                <h5 class="mb-0">${story.title}</h5>
                <small class="text-muted">${story.date} ${story.city ? '— ' + story.city : ''} ${story.country ? '(' + story.country + ')' : ''}</small>
              </div>
              <span class="copy-link" onclick="copyLink('${story.id}')" style="cursor:pointer;" title="Copia link">🔗</span>
            </div>
            <div class="card-body">
              ${story.photo ? `<img src="${story.photo}" class="card-img-top mb-3" alt="${story.title}">` : ''}
              <div class="content">${story.content}</div>
            </div>
            ${story.tags ? `
              <div class="card-footer">
                ${story.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
              </div>` : ''}
          </div>
        `);
      });
  
      const targetId = window.location.hash?.substring(1);
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }