/* Army Public School Ferozepur — site interactions */
(function () {
  'use strict';

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 480) toTop.classList.add('show');
      else toTop.classList.remove('show');
    }, { passive: true });
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---------- Counter animation ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-IN') + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { cio.observe(c); });
  }

  /* ---------- Gallery: filter + lightbox ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var gItems = Array.prototype.slice.call(document.querySelectorAll('.g-item'));
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-filter');
      gItems.forEach(function (it) {
        var show = cat === 'all' || it.getAttribute('data-cat') === cat;
        it.style.display = show ? '' : 'none';
      });
    });
  });

  var lb = document.querySelector('.lightbox');
  if (lb && gItems.length) {
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb-cap');
    var current = -1;
    var visible = function () { return gItems.filter(function (i) { return i.style.display !== 'none'; }); };

    function openAt(idx) {
      var list = visible();
      current = (idx + list.length) % list.length;
      var item = list[current];
      lbImg.src = item.getAttribute('data-full');
      lbImg.alt = item.getAttribute('data-cap') || 'School photo';
      lbCap.textContent = item.getAttribute('data-cap') || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; }

    gItems.forEach(function (item) {
      item.addEventListener('click', function () { openAt(visible().indexOf(item)); });
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); openAt(current - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); openAt(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') openAt(current - 1);
      if (e.key === 'ArrowRight') openAt(current + 1);
    });
  }

  /* ---------- Hero carousel (if present) ---------- */
  var heroMosaic = document.querySelector('.hero-mosaic');
  if (heroMosaic) {
    var imgs = heroMosaic.querySelectorAll('img');
    if (imgs.length > 6) {
      var pool = [
        'images/97.JPG', 'images/121.JPG', 'images/85.JPG', 'images/139.JPG', 'images/152.JPG',
        'images/114.JPG', 'images/141.JPG', 'images/64.JPG', 'images/119.JPG', 'images/159.JPG',
        'images/88.JPG', 'images/156.JPG', 'images/49.JPG', 'images/110.JPG', 'images/171.JPG',
        'images/84.JPG', 'images/138.JPG', 'images/36.JPG'
      ];
      setInterval(function () {
        var img = imgs[Math.floor(Math.random() * imgs.length)];
        var next = pool[Math.floor(Math.random() * pool.length)];
        img.style.opacity = '0';
        setTimeout(function () {
          img.src = next;
          img.style.transition = 'opacity 0.8s';
          img.style.opacity = '1';
        }, 300);
      }, 3200);
    }
  }
})();
