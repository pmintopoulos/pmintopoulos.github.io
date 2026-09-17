document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// Bookstore carousel — rotates through every store that
// carries the book. Meltemi (the publisher) shows first.
// Edit the "url" for each entry once you have the real link.
// =========================================================
const bookstores = [
  { name: 'Μελτέμι',     file: 'banner-meltemi.jpg',    url: 'https://meltemibooks.gr/product/xalkoforos/' },
  { name: 'Skroutz',     file: 'banner-skroutz.jpg',    url: 'https://www.skroutz.gr/s/68091033/chalkoforos.html' },
  { name: 'Plus4u',      file: 'banner-plus4u.jpg',     url: 'https://www.plus4u.gr/xalkoforos/108219290-108219290/p' },
  { name: 'Metabook',    file: 'banner-metabook.jpg',   url: 'https://metabook.gr/books/xalkoforos-panaghiwtis-mintopoylos-1008671' },
  { name: 'ebooks.gr',   file: 'banner-ebooks.jpg',     url: 'https://www.ebooks.gr/gr/%CF%87%CE%B1%CE%BB%CE%BA%CE%BF%CF%86%CF%8C%CF%81%CE%BF%CF%82-534195.html' },
  { name: 'Πρωτοπορία',  file: 'banner-protoporia.jpg', url: 'https://www.protoporia.gr/mintopoulos-panagiotis-xalkoforos-9786185931612.html' },
  { name: 'SelidaBook',  file: 'banner-selidabook.jpg', url: 'https://www.selidabook.gr/product/%CE%A7%CE%91%CE%9B%CE%9A%CE%9F%CE%A6%CE%9F%CE%A1%CE%9F%CE%A3-BKS.1118080' },
  { name: 'Shopbay',     file: 'banner-shopbay.jpg',    url: 'https://shopbay.gr/en/Chalkoforos-309676.html' },
];

(function () {
  const AUTO_ROTATE_MS = 5000;
  const img = document.getElementById('carouselImg');
  const link = document.getElementById('carouselLink');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const wrap = document.getElementById('bookstoreCarousel');
  if (!img || !link || !prevBtn || !nextBtn || !wrap) return;

  let index = 0;
  let timer = null;

  function render() {
    const store = bookstores[index];
    img.src = 'images/bookstores/' + store.file;
    img.alt = 'Διαθέσιμο στο ' + store.name;
    link.href = store.url;
  }

  function go(step) {
    index = (index + step + bookstores.length) % bookstores.length;
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
