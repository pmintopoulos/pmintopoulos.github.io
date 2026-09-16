// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

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
