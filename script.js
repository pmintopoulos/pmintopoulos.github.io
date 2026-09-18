document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// Bookstore link switcher — cycles through every store that
// carries the book. Meltemi (the publisher) shows first.
// Edit the "url" for each entry once you have the real link.
// (Naming here deliberately avoids words like "banner" or
// "carousel" — ad blockers such as AdGuard/uBlock filter lists
// hide elements/files with those words in the name, even when
// the content has nothing to do with ads.)
// =========================================================
const stores = [
  { name: 'Μελτέμι',     file: 'store-meltemi.jpg',    url: 'https://meltemibooks.gr/product/xalkoforos/' },
  { name: 'Skroutz',     file: 'store-skroutz.jpg',    url: 'https://www.skroutz.gr/s/68091033/chalkoforos.html' },
  { name: 'Plus4u',      file: 'store-plus4u.jpg',     url: 'https://www.plus4u.gr/xalkoforos/108219290-108219290/p' },
  { name: 'Metabook',    file: 'store-metabook.jpg',   url: 'https://metabook.gr/books/xalkoforos-panaghiwtis-mintopoylos-1008671' },
  { name: 'ebooks.gr',   file: 'store-ebooks.jpg',     url: 'https://www.ebooks.gr/gr/%CF%87%CE%B1%CE%BB%CE%BA%CE%BF%CF%86%CF%8C%CF%81%CE%BF%CF%82-534195.html' },
  { name: 'Πρωτοπορία',  file: 'store-protoporia.jpg', url: 'https://www.protoporia.gr/mintopoulos-panagiotis-xalkoforos-9786185931612.html' },
  { name: 'SelidaBook',  file: 'store-selidabook.jpg', url: 'https://www.selidabook.gr/product/%CE%A7%CE%91%CE%9B%CE%9A%CE%9F%CE%A6%CE%9F%CE%A1%CE%9F%CE%A3-BKS.1118080' },
  { name: 'Shopbay',     file: 'store-shopbay.jpg',    url: 'https://shopbay.gr/en/Chalkoforos-309676.html' },
];

(function () {
  const AUTO_ROTATE_MS = 5000;
  const img = document.getElementById('storeImg');
  const link = document.getElementById('storeLink');
  const prevBtn = document.getElementById('storePrev');
  const nextBtn = document.getElementById('storeNext');
  const wrap = document.getElementById('storeSwitcher');
  if (!img || !link || !prevBtn || !nextBtn || !wrap) return;

  let index = 0;
  let timer = null;

  function render() {
    const store = stores[index];
    img.src = 'images/stores/' + store.file;
    img.alt = 'Διαθέσιμο στο ' + store.name;
    link.href = store.url;
  }

  function go(step) {
    index = (index + step + stores.length) % stores.length;
    render();
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(() => go(1), AUTO_ROTATE_MS);
  }
  function stopAuto() {
    if (timer) clearInterval(timer);
  }

  prevBtn.addEventListener('click', function (e) {
    e.preventDefault();
    go(-1);
    startAuto();
  });
  nextBtn.addEventListener('click', function (e) {
    e.preventDefault();
    go(1);
    startAuto();
  });

  wrap.addEventListener('mouseenter', stopAuto);
  wrap.addEventListener('mouseleave', startAuto);

  render();
  startAuto();
})();

// =========================================================
// Blog — posts listed newest first. To add a new post, copy
// one of the objects below and paste it at the TOP of the
// array (so it becomes the new "latest" post automatically).
// "image" is optional — remove the line entirely if a post
// has no image.
// =========================================================
const posts = [
  {
    date: '17 Σεπτεμβρίου 2026',
    title: 'Καλωσήρθατε στο blog μου',
    subtitle: 'Λίγα λόγια πριν ξεκινήσουμε',
    body: [
      'Αυτό είναι ένα πρώτο, δοκιμαστικό κείμενο. Εδώ θα γράφω σκέψεις, νέα για τα βιβλία μου, και ό,τι άλλο αξίζει να μοιραστώ.',
      'Αντικαταστήστε αυτό το κείμενο με το δικό σας όποτε είστε έτοιμοι να δημοσιεύσετε το πρώτο πραγματικό άρθρο.'
    ],
    // image: 'images/blog/example.jpg',
  },
];

(function () {
  const postEl = document.getElementById('blogPost');
  const listEl = document.getElementById('postHistoryList');
  if (!postEl || !listEl) return; // not on the blog page

  function renderPost(index) {
    const post = posts[index];
    if (!post) return;
    const imageHtml = post.image
      ? '<img class="post-image" src="' + post.image + '" alt="">'
      : '';
    postEl.innerHTML =
      '<span class="post-date">' + post.date + '</span>' +
      '<h2 class="post-title">' + post.title + '</h2>' +
      '<p class="post-subtitle">' + post.subtitle + '</p>' +
      '<div class="post-body">' + post.body.map(p => '<p>' + p + '</p>').join('') + '</div>' +
      imageHtml;

    listEl.querySelectorAll('button').forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
  }

  function renderList() {
    listEl.innerHTML = '';
    posts.forEach((post, i) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.innerHTML =
        '<span class="item-date">' + post.date + '</span>' +
        '<span class="item-title">' + post.title + '</span>';
      btn.addEventListener('click', () => renderPost(i));
      li.appendChild(btn);
      listEl.appendChild(li);
    });
  }

  renderList();
  renderPost(0);
})();

// =========================================================
// Galleries — used by drawings.html and modeling.html.
// Each page picks its array via the page's data-gallery
// attribute. Artwork is grouped into ordered "blocks" — each
// block gets its own heading and grid.
//
// To add a piece: copy one of the objects inside "items" and
// fill in title/description/image. To add a whole new block,
// copy a whole { name: ..., items: [...] } group and place it
// wherever you want it to appear (blocks render top to bottom
// in the order listed here).
// =========================================================
const galleries = {
  drawings: [
    {
      name: 'Πρόσφατα',
      items: [
        { title: 'Σκίτσο 1', description: 'Σύντομη περιγραφή για αυτό το έργο — τεχνική, έμπνευση, ή ό,τι θέλετε να πείτε γι\' αυτό.', image: 'images/drawings/example-1.jpg' },
        { title: 'Σκίτσο 2', description: 'Σύντομη περιγραφή για αυτό το έργο.', image: 'images/drawings/example-2.jpg' },
        { title: 'Σκίτσο 3', description: 'Σύντομη περιγραφή για αυτό το έργο.', image: 'images/drawings/example-3.jpg' },
      ],
    },
  ],
  modeling: [
    {
      name: 'Πρόσφατα',
      items: [
        { title: 'Μοντέλο 1', description: 'Σύντομη περιγραφή — υλικό, κλίμακα, χρόνος κατασκευής, ό,τι αξίζει να αναφερθεί.', image: 'images/modeling/example-1.jpg' },
        { title: 'Μοντέλο 2', description: 'Σύντομη περιγραφή για αυτή την κατασκευή.', image: 'images/modeling/example-2.jpg' },
        { title: 'Μοντέλο 3', description: 'Σύντομη περιγραφή για αυτή την κατασκευή.', image: 'images/modeling/example-3.jpg' },
      ],
    },
  ],
};

(function () {
  const main = document.querySelector('.gallery-main');
  const blocksEl = document.getElementById('galleryBlocks');
  const lightbox = document.getElementById('lightbox');
  if (!main || !blocksEl || !lightbox) return; // not on a gallery page

  const key = main.getAttribute('data-gallery');
  const groups = galleries[key] || [];

  // Flatten every item across every block into one ordered list,
  // so the lightbox arrows move through the whole gallery in order.
  const flat = [];
  groups.forEach(group => {
    group.items.forEach(item => flat.push(item));
  });

  // ---- render the blocks + thumbnail grids ----
  let flatIndex = 0;
  groups.forEach(group => {
    const blockEl = document.createElement('div');
    blockEl.className = 'gallery-block';

    const heading = document.createElement('h2');
    heading.textContent = group.name;
    blockEl.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'gallery-grid';

    group.items.forEach(item => {
      const thisIndex = flatIndex++;
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'gallery-thumb';
      thumb.innerHTML =
        '<img src="' + item.image + '" alt="' + item.title + '" loading="lazy" ' +
        'onerror="this.style.display=\'none\'; this.parentElement.classList.add(\'empty\')">' +
        '<span class="placeholder-label">' + item.title + '</span>' +
        '<span class="thumb-caption">' + item.title + '</span>';
      thumb.addEventListener('click', () => openLightbox(thisIndex));
      grid.appendChild(thumb);
    });

    blockEl.appendChild(grid);
    blocksEl.appendChild(blockEl);
  });

  // ---- lightbox behaviour ----
  const lbImg = document.getElementById('lightboxImg');
  const lbTitle = document.getElementById('lightboxTitle');
  const lbDesc = document.getElementById('lightboxDesc');
  const lbClose = document.getElementById('lightboxClose');
  const lbPrev = document.getElementById('lightboxPrev');
  const lbNext = document.getElementById('lightboxNext');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function renderLightbox() {
    const item = flat[currentIndex];
    if (!item) return;
    lbImg.src = item.image;
    lbImg.alt = item.title;
    lbTitle.textContent = item.title;
    lbDesc.textContent = item.description;
  }
  function step(dir) {
    currentIndex = (currentIndex + dir + flat.length) % flat.length;
    renderLightbox();
  }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', () => step(-1));
  lbNext.addEventListener('click', () => step(1));

  // click outside the image/caption closes it
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();

// =========================================================
// Workshop — used by unfinished.html and archived.html.
// Each entry is a book/story you've written or left
// unfinished. To add one, copy an object below and fill in
// the fields. "excerptBody" is a list of paragraphs — add or
// remove as many as you need for the sample chapter.
// =========================================================
const workshops = {
  unfinished: [
    {
      title: 'Τίτλος έργου 1',
      subtitle: 'Μια σύντομη υποσημείωση — είδος, κατάσταση, ό,τι θέλετε.',
      text: 'Λίγα λόγια για αυτό το έργο: η ιδέα πίσω από αυτό, πού έχει φτάσει, και γιατί έμεινε ημιτελές.',
      excerptTitle: 'Απόσπασμα — Τίτλος έργου 1',
      excerptBody: [
        'Εδώ μπαίνει το πραγματικό απόσπασμα του κεφαλαίου. Μπορεί να είναι όσο μεγάλο θέλετε — ο αναγνώστης θα κάνει scroll μέσα στο πάνελ.',
        'Προσθέστε όσες παραγράφους χρειάζεστε εδώ.',
      ],
    },
  ],
  archived: [
    {
      title: 'Τίτλος έργου 2',
      subtitle: 'Μια σύντομη υποσημείωση για αυτό το αρχειοθετημένο έργο.',
      text: 'Λίγα λόγια για το γιατί αυτό το έργο αρχειοθετήθηκε, και τι περιέχει.',
      excerptTitle: 'Απόσπασμα — Τίτλος έργου 2',
      excerptBody: [
        'Εδώ μπαίνει το απόσπασμα για αυτό το έργο.',
      ],
    },
  ],
};

(function () {
  const main = document.querySelector('.workshop-main');
  const listEl = document.getElementById('workshopList');
  const overlay = document.getElementById('excerptOverlay');
  if (!main || !listEl || !overlay) return; // not on a workshop page

  const key = main.getAttribute('data-workshop');
  const entries = workshops[key] || [];

  const excerptTitleEl = document.getElementById('excerptTitle');
  const excerptBodyEl = document.getElementById('excerptBody');
  const excerptCloseBtn = document.getElementById('excerptClose');

  function headerBottom() {
    const nav = document.querySelector('.main-nav');
    return nav ? Math.max(nav.getBoundingClientRect().bottom, 0) : 0;
  }

  function openExcerpt(entry) {
    excerptTitleEl.textContent = entry.excerptTitle || entry.title;
    excerptBodyEl.innerHTML = entry.excerptBody.map(p => '<p>' + p + '</p>').join('');
    overlay.style.top = headerBottom() + 'px';
    overlay.classList.add('open');
    overlay.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }
  function closeExcerpt() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  excerptCloseBtn.addEventListener('click', closeExcerpt);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeExcerpt();
  });
  window.addEventListener('resize', function () {
    if (overlay.classList.contains('open')) overlay.style.top = headerBottom() + 'px';
  });

  entries.forEach(entry => {
    const card = document.createElement('div');
    card.className = 'workshop-card';
    card.innerHTML =
      '<h2>' + entry.title + '</h2>' +
      '<p class="workshop-subtitle">' + entry.subtitle + '</p>' +
      '<p class="workshop-text">' + entry.text + '</p>' +
      '<button type="button" class="workshop-excerpt-btn">Διαβάστε απόσπασμα &#8594;</button>';
    card.querySelector('.workshop-excerpt-btn').addEventListener('click', () => openExcerpt(entry));
    listEl.appendChild(card);
  });
})();

// =========================================================
// Editions — used by novels.html and stories.html. A flat,
// ordered list of covers per page. Clicking one opens a
// detail panel with the cover plus text next to it.
//
// "link" is optional — delete the line entirely for a book
// with no purchase link yet (the button hides itself).
// =========================================================
const editions = {
  novels: [
    {
      title: 'Χαλκόφορος',
      subtitle: 'Μυθιστόρημα — εκδόσεις Μελτέμι',
      description: [
        'Σύντομη περιγραφή του βιβλίου — η υπόθεση, το ύφος, ό,τι θέλετε να διαβάσει ο επισκέπτης πριν αποφασίσει να το αγοράσει.',
      ],
      cover: 'images/novels/xalkoforos.jpg',
      link: 'https://meltemibooks.gr/product/xalkoforos/',
    },
  ],
  stories: [
    {
      title: 'Τίτλος διηγήματος 1',
      subtitle: 'Συλλογή διηγημάτων',
      description: [
        'Σύντομη περιγραφή για αυτό το διήγημα ή τη συλλογή.',
      ],
      cover: 'images/stories/example-1.jpg',
      // link: 'https://...',
    },
  ],
};

(function () {
  const main = document.querySelector('[data-editions]');
  const gridEl = document.getElementById('editionsGrid');
  const overlay = document.getElementById('bookOverlay');
  if (!main || !gridEl || !overlay) return; // not on an editions page

  const key = main.getAttribute('data-editions');
  const items = editions[key] || [];

  const coverEl = document.getElementById('bookCover');
  const titleEl = document.getElementById('bookTitle');
  const subtitleEl = document.getElementById('bookSubtitle');
  const descEl = document.getElementById('bookDesc');
  const linkEl = document.getElementById('bookLink');
  const closeBtn = document.getElementById('bookClose');
  const prevBtn = document.getElementById('bookPrev');
  const nextBtn = document.getElementById('bookNext');

  let currentIndex = 0;

  function render() {
    const item = items[currentIndex];
    if (!item) return;
    coverEl.src = item.cover;
    coverEl.alt = item.title;
    titleEl.textContent = item.title;
    subtitleEl.textContent = item.subtitle || '';
    descEl.innerHTML = item.description.map(p => '<p>' + p + '</p>').join('');
    if (item.link) {
      linkEl.href = item.link;
      linkEl.classList.remove('is-hidden');
    } else {
      linkEl.classList.add('is-hidden');
    }
  }

  function open(index) {
    currentIndex = index;
    render();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  function step(dir) {
    currentIndex = (currentIndex + dir + items.length) % items.length;
    render();
  }

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  items.forEach((item, index) => {
    const thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.className = 'edition-thumb';
    thumb.innerHTML =
      '<img src="' + item.cover + '" alt="' + item.title + '" loading="lazy" ' +
      'onerror="this.style.display=\'none\'; this.parentElement.classList.add(\'empty\')">' +
      '<span class="placeholder-label">' + item.title + '</span>' +
      '<span class="thumb-caption">' + item.title + '</span>';
    thumb.addEventListener('click', () => open(index));
    gridEl.appendChild(thumb);
  });
})();

// =========================================================
// Suggestions — used by suggestions.html. Five categories,
// each a list of items. Image + title always show; the
// description only appears once the title is clicked.
// To add an item, copy an object inside the right category's
// list and fill in title/description/image.
// =========================================================
const suggestionCategories = [
  { key: 'books',      label: 'Βιβλία' },
  { key: 'movies',     label: 'Ταινίες' },
  { key: 'games',      label: 'Παιχνίδια' },
  { key: 'boardgames', label: 'Επιτραπέζια' },
  { key: 'music',      label: 'Μουσική' },
];

const suggestions = {
  books: [
    { title: 'Τίτλος βιβλίου 1', description: 'Λίγα λόγια για το γιατί το προτείνετε.', image: 'images/suggestions/books/example-1.jpg' },
  ],
  movies: [
    { title: 'Τίτλος ταινίας 1', description: 'Λίγα λόγια για το γιατί την προτείνετε.', image: 'images/suggestions/movies/example-1.jpg' },
  ],
  games: [
    { title: 'Τίτλος παιχνιδιού 1', description: 'Λίγα λόγια για το γιατί το προτείνετε.', image: 'images/suggestions/games/example-1.jpg' },
  ],
  boardgames: [
    { title: 'Τίτλος επιτραπέζιου 1', description: 'Λίγα λόγια για το γιατί το προτείνετε.', image: 'images/suggestions/boardgames/example-1.jpg' },
  ],
  music: [
    { title: 'Τίτλος άλμπουμ/τραγουδιού 1', description: 'Λίγα λόγια για το γιατί το προτείνετε.', image: 'images/suggestions/music/example-1.jpg' },
  ],
};

(function () {
  const main = document.querySelector('.suggestions-main');
  const catsEl = document.getElementById('suggestionsCategories');
  const panel = document.getElementById('suggestionsPanel');
  if (!main || !catsEl || !panel) return; // not on the suggestions page

  const titleEl = document.getElementById('suggestionsTitle');
  const listEl = document.getElementById('suggestionsList');
  const closeBtn = document.getElementById('suggestionsClose');

  function headerBottom() {
    const nav = document.querySelector('.main-nav');
    return nav ? Math.max(nav.getBoundingClientRect().bottom, 0) : 0;
  }

  function openPanel(key, label) {
    const items = suggestions[key] || [];
    titleEl.textContent = label;
    listEl.innerHTML = '';

    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'suggestion-item';
      row.innerHTML =
        '<div class="suggestion-item-header">' +
          '<div class="suggestion-thumb">' +
            '<img src="' + item.image + '" alt="' + item.title + '" loading="lazy" ' +
            'onerror="this.style.display=\'none\'; this.parentElement.classList.add(\'empty\')">' +
            '<span class="placeholder-label">' + item.title + '</span>' +
          '</div>' +
          '<button type="button" class="suggestion-title-btn">' + item.title + '</button>' +
        '</div>' +
        '<div class="suggestion-desc">' + item.description + '</div>';
      row.querySelector('.suggestion-title-btn').addEventListener('click', () => {
        row.classList.toggle('open');
      });
      listEl.appendChild(row);
    });

    panel.style.top = headerBottom() + 'px';
    panel.classList.add('open');
    panel.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }
  function closePanel() {
    panel.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closePanel);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
  });
  window.addEventListener('resize', function () {
    if (panel.classList.contains('open')) panel.style.top = headerBottom() + 'px';
  });

  suggestionCategories.forEach(cat => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'suggestion-category-btn';
    btn.textContent = cat.label;
    btn.addEventListener('click', () => openPanel(cat.key, cat.label));
    catsEl.appendChild(btn);
  });
})();

// Allow tapping a dropdown parent on touch devices to open/close it,
// since there's no hover on mobile.
document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var parent = link.parentElement;
    var isOpenAlready = parent.classList.contains('open');

    // close any other open dropdowns
    document.querySelectorAll('.has-dropdown.open').forEach(function (el) {
      el.classList.remove('open');
    });

    if (window.matchMedia('(hover: none)').matches) {
      e.preventDefault();
      if (!isOpenAlready) parent.classList.add('open');
    }
  });
});
