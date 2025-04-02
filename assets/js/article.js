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
        const tags = story.tags?.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('') || '';
        const avatar = story.avatar || 'assets/images/avatar/baron_luca.jpg';
        const author = story.author || 'Baron Luca';
        const role = story.role || 'Senior Developer';
        const summary = story.summary || '';
        const cityInfo = story.city ? '— ' + story.city : '';
        const countryInfo = story.country ? `(${story.country})` : '';
  
        $('#stories').append(`
          <div class="card mb-4" id="${story.id}">
            <div class="card-header border-0 pb-0">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <div class="avatar avatar-story me-2">
                    <a href=""><img class="avatar-img rounded-circle" src="${avatar}" alt=""></a>
                  </div>
                  <div>
                    <div class="nav nav-divider">
                      <h6 class="nav-item card-title mb-0"><a href="#!">${author}</a></h6>
                      <span class="nav-item small">${story.date}</span>
                    </div>
                    <p class="mb-0 small">${role}</p>
                  </div>
                </div>
                <div class="dropdown">
                  <a href="#" class="text-secondary btn btn-secondary-soft-hover py-1 px-2" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-three-dots"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end">
                  <span class="copy-link" onclick="copyLink('${story.id}')" style="cursor:pointer;" title="Copia link">🔗</span>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-bookmark fa-fw pe-2"></i>Salva</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-person-x fa-fw pe-2"></i>Non seguire ${author}</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-x-circle fa-fw pe-2"></i>Nascondi</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-slash-circle fa-fw pe-2"></i>Blocca</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-flag fa-fw pe-2"></i>Segnala</a></li>
                  </ul>
                </div>
              </div>
            </div>
  
            <div class="card-body">
              ${summary ? `<p>${summary}</p>` : ''}
              ${story.photo ? `<img class="card-img mb-3" src="${story.photo}" alt="${story.title}">` : ''}
              <div class="content">${story.content}</div>
            </div>
  
            ${tags ? `<div class="card-footer">${tags}</div>` : ''}
           
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
  