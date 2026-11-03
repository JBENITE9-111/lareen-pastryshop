
(function(){
  function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function L(en, ar){ return '<span data-en="'+esc(en)+'" data-ar="'+esc(ar)+'">'+esc(en)+'</span>'; }
  function stLabel(st){ return st==='approved' ? L('approved','موافق عليه') : L('pending','قيد الانتظار'); }
  function norm(s){ return String(s||'').toLowerCase().replace(/baklava/g,'baklawa').replace(/pastachio/g,'pistachio').replace(/konafa/g,'kunafa').replace(/knafeh/g,'kunafa').replace(/ghoriba/g,'ghorayeba').replace(/[^a-z0-9\u0600-\u06FF ]/g,' ').replace(/\s+/g,' ').trim(); }
  function fmt(minor){ var v = minor/100; return 'AED ' + (v % 1 === 0 ? v.toFixed(0) : v.toFixed(2)); }
  function getLS(k, d){ try { return JSON.parse(localStorage.getItem(k) || JSON.stringify(d)); } catch(e){ return d; } }
  function setLS(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
  var PRODUCTS = window.LAREEN_PRODUCTS || [];
  var bySlug = {}; PRODUCTS.forEach(function(p){ bySlug[p.slug]=p; });


  /* ---------- Pagination: 12 products per page, everywhere products are listed ---------- */
  var PAGE_SIZE = 12;
  function scrollToGrid(cards){ var g = cards.length && cards[0].parentElement; if (!g) return; var hdr = document.querySelector('header.site'); var off = (hdr ? hdr.offsetHeight : 80) + 12; var top = g.getBoundingClientRect().top + window.scrollY - off; window.scrollTo({top: top < 0 ? 0 : top, behavior: 'smooth'}); }
  function makePager(anchor){
    var nav = document.getElementById('lareen-pager');
    if (!nav) { nav = document.createElement('nav'); nav.id = 'lareen-pager'; nav.className = 'lareen-pager'; nav.setAttribute('data-aria-en','Product pages'); nav.setAttribute('data-aria-ar','صفحات المنتجات'); nav.setAttribute('aria-label', curLang()==='ar' ? 'صفحات المنتجات' : 'Product pages'); anchor.after(nav); }
    return nav;
  }
  function renderPager(nav, totalPages, page, onPage){
    if (totalPages <= 1) { nav.style.display = 'none'; nav.innerHTML = ''; return; }
    nav.style.display = 'flex'; nav.innerHTML = '';
    function btn(label, p, disabled, current){
      var b = document.createElement('button'); b.type = 'button'; b.innerHTML = label;
      if (disabled) b.disabled = true;
      if (current) b.setAttribute('aria-current','page');
      b.addEventListener('click', function(){ onPage(p); });
      nav.appendChild(b);
    }
    btn(L('\u2039 Prev', 'السابق \u203a'), page - 1, page <= 1, false);
    for (var p = 1; p <= totalPages; p++) btn(String(p), p, false, p === page);
    btn(L('Next \u203a', '\u2039 التالي'), page + 1, page >= totalPages, false);
    var info = document.createElement('span'); info.className = 'lareen-pager-info'; info.innerHTML = L('Page ' + page + ' of ' + totalPages, 'صفحة ' + page + ' من ' + totalPages); nav.appendChild(info);
  }
  /* ---------- Shop filters ---------- */
  var catSel = document.getElementById('cat');
  if (catSel) {
    var typSel = document.getElementById('typ');
    var minEl = document.getElementById('min');
    var maxEl = document.getElementById('max');
    var featEl = document.getElementById('feat');
    var incEnqEl = document.getElementById('inc-enq');
    var sortSel = document.getElementById('sort');
    var cards = Array.prototype.slice.call(document.querySelectorAll('article.card, a.card'));
    var countP = null;
    // count paragraph is the <p> right after the filter panel
    var panels = document.querySelectorAll('.panel');
    if (panels.length) { var np = panels[0].nextElementSibling; if (np && np.tagName==='P') countP = np; }
    var shopPage = 1, shopPager = null;
    function shopFiltered(){
      var cat = catSel.value, typ = typSel ? typSel.value : 'all';
      var minv = minEl && minEl.value!=='' ? parseFloat(minEl.value) : null;
      var maxv = maxEl && maxEl.value!=='' ? parseFloat(maxEl.value) : null;
      var feat = featEl ? featEl.checked : false;
      return cards.filter(function(card){
        var href = (card.querySelector('a')||card).getAttribute('href') || '';
        var slug = href.split('/').pop();
        var p = bySlug[slug];
        if (!p) return true;
        if (cat!=='All' && p.category!==cat) return false;
        if (typ==='fixed' && p.price_status!=='approved_fixed') return false;
        if (typ==='enquiry' && p.price_status!=='enquiry') return false;
        if (feat && !p.featured) return false;
        if ((minv!=null || maxv!=null) && typ!=='enquiry' && !(incEnqEl && incEnqEl.checked) && p.price_status!=='approved_fixed') return false;
        if (p.price_status==='approved_fixed' && p.price_aed_minor!=null) {
          if (minv!=null && p.price_aed_minor < minv*100) return false;
          if (maxv!=null && p.price_aed_minor > maxv*100) return false;
        }
        return true;
      });
    }
    function renderShop(){
      var list = shopFiltered();
      var total = list.length;
      var pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
      if (shopPage > pages) shopPage = pages;
      if (shopPage < 1) shopPage = 1;
      var sortMode = sortSel ? sortSel.value : 'featured';
      if (sortMode === 'price-asc' || sortMode === 'price-desc') {
        var priced = list.filter(function(card){ var pp = bySlug[((card.querySelector('a')||card).getAttribute('href')||'').split('/').pop()]; return pp && pp.price_status === 'approved_fixed' && pp.price_aed_minor != null; });
        var unpriced = list.filter(function(card){ var pp = bySlug[((card.querySelector('a')||card).getAttribute('href')||'').split('/').pop()]; return !(pp && pp.price_status === 'approved_fixed' && pp.price_aed_minor != null); });
        priced.sort(function(a, b){ var pa = bySlug[(a.querySelector('a')||a).getAttribute('href').split('/').pop()].price_aed_minor, pb = bySlug[(b.querySelector('a')||b).getAttribute('href').split('/').pop()].price_aed_minor; return sortMode === 'price-asc' ? pa - pb : pb - pa; });
        list = priced.concat(unpriced);
      } else if (sortMode === 'name-asc') {
        list = list.slice().sort(function(a, b){ var pa = bySlug[((a.querySelector('a')||a).getAttribute('href')||'').split('/').pop()], pb = bySlug[((b.querySelector('a')||b).getAttribute('href')||'').split('/').pop()]; return (pa ? pa.name_en : '').localeCompare(pb ? pb.name_en : ''); });
      } else if (sortMode === 'featured') {
        list = list.slice().sort(function(a, b){ var pa = bySlug[((a.querySelector('a')||a).getAttribute('href')||'').split('/').pop()], pb = bySlug[((b.querySelector('a')||b).getAttribute('href')||'').split('/').pop()]; return ((pb && pb.featured ? 1 : 0) - (pa && pa.featured ? 1 : 0)); });
      }
      var start = (shopPage - 1) * PAGE_SIZE, end = Math.min(total, start + PAGE_SIZE);
      var visible = {};
      list.slice(start, end).forEach(function(card){ visible[(card.querySelector('a')||card).getAttribute('href')] = true; });
      cards.forEach(function(card){ card.style.display = visible[(card.querySelector('a')||card).getAttribute('href')] ? '' : 'none'; });
      var pageCards = list.slice(start, end);
      var gridEl = pageCards.length ? pageCards[0].parentElement : null;
      if (gridEl) pageCards.forEach(function(card){ gridEl.appendChild(card); });
      if (countP) countP.innerHTML = total === 0 ? L('No products match these filters.', 'لا توجد منتجات مطابقة لهذه المرشحات.') : L('Showing ' + (start + 1) + '\u2013' + end + ' of ' + total + ' products.', 'عرض ' + (start + 1) + '\u2013' + end + ' من أصل ' + total + ' منتجًا.');
      var nm = document.getElementById('lareen-no-match'); if (nm) nm.style.display = 'none';
      if (!shopPager && cards.length) shopPager = makePager(cards[0].parentElement);
      if (shopPager) renderPager(shopPager, pages, shopPage, function(p){ shopPage = p; renderShop(); scrollToGrid(cards); });
    }
    [catSel, typSel, minEl, maxEl, featEl, incEnqEl, sortSel].forEach(function(el){ if(el) el.addEventListener('input', function(){ shopPage = 1; renderShop(); }); if(el) el.addEventListener('change', function(){ shopPage = 1; renderShop(); }); });
    renderShop();
  }

  /* ---------- Search ---------- */
  var qEl = document.getElementById('q');
  if (qEl) {
    var scards = Array.prototype.slice.call(document.querySelectorAll('article.card, a.card'));
    var sCount = null;
    document.querySelectorAll('p').forEach(function(p){ if (/results\.$/.test(p.textContent.trim())) sCount = p; });
    var searchPage = 1, searchPager = null;
    function renderSearch(){
      var nq = norm(qEl.value);
      var list = scards.filter(function(card){
        var slug = ((card.querySelector('a')||card).getAttribute('href')||'').split('/').pop();
        var p = bySlug[slug];
        if (!nq || !p) return true;
        var hay = norm([p.name_en, p.name_ar, p.category, p.category_ar].concat(p.aliases||[]).join(' '));
        return nq.split(' ').every(function(w){ return hay.indexOf(w) >= 0; });
      });
      var total = list.length;
      var pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
      if (searchPage > pages) searchPage = pages;
      if (searchPage < 1) searchPage = 1;
      var start = (searchPage - 1) * PAGE_SIZE, end = Math.min(total, start + PAGE_SIZE);
      var visible = {};
      list.slice(start, end).forEach(function(card){ visible[(card.querySelector('a')||card).getAttribute('href')] = true; });
      scards.forEach(function(card){ card.style.display = visible[(card.querySelector('a')||card).getAttribute('href')] ? '' : 'none'; });
      if (sCount) sCount.innerHTML = total === 0 ? L('No results.', 'لا توجد نتائج.') : (nq ? L('Showing ' + (start + 1) + '\u2013' + end + ' of ' + total + ' results.', 'عرض ' + (start + 1) + '\u2013' + end + ' من أصل ' + total + ' نتيجة.') : L('Showing ' + (start + 1) + '\u2013' + end + ' of ' + total + ' products.', 'عرض ' + (start + 1) + '\u2013' + end + ' من أصل ' + total + ' منتجًا.'));
      if (!searchPager && scards.length) searchPager = makePager(scards[0].parentElement);
      if (searchPager) renderPager(searchPager, pages, searchPage, function(p){ searchPage = p; renderSearch(); scrollToGrid(scards); });
    }
    qEl.addEventListener('input', function(){ searchPage = 1; renderSearch(); });
    renderSearch();
  }

  /* ---------- Collections & occasions: same 12-per-page rule ---------- */
  (function(){
    var path = window.location.pathname.replace(/\.html$/,'');
    if (path.indexOf('/collections/') !== 0 && path.indexOf('/occasions/') !== 0) return;
    var ccards = Array.prototype.slice.call(document.querySelectorAll('article.card, a.card'));
    if (!ccards.length) return;
    var cPage = 1, cPager = null, cCount = null;
    function renderCollection(){
      var total = ccards.length;
      var pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
      if (cPage > pages) cPage = pages;
      if (cPage < 1) cPage = 1;
      var start = (cPage - 1) * PAGE_SIZE, end = Math.min(total, start + PAGE_SIZE);
      if (!cCount) { cCount = document.createElement('p'); cCount.id = 'lareen-page-count'; ccards[0].parentElement.before(cCount); }
      cCount.innerHTML = L('Showing ' + (start + 1) + '\u2013' + end + ' of ' + total + ' products.', 'عرض ' + (start + 1) + '\u2013' + end + ' من أصل ' + total + ' منتجًا.');
      ccards.forEach(function(card, i){ card.style.display = (i >= start && i < end) ? '' : 'none'; });
      if (!cPager) cPager = makePager(ccards[0].parentElement);
      renderPager(cPager, pages, cPage, function(p){ cPage = p; renderCollection(); scrollToGrid(ccards); });
    }
    renderCollection();
  })();

  /* ---------- Hero slider: 10 product slides, auto + swipe + dots ---------- */
  var heroSlider = document.getElementById('lareen-hero-slider');
  if (heroSlider) {
    var heroSlides = Array.prototype.slice.call(heroSlider.querySelectorAll('.hero-slide'));
    var heroDots = Array.prototype.slice.call(heroSlider.querySelectorAll('.hero-dots button'));
    var heroCur = 0, heroTimer = null;
    var heroCount = heroSlider.querySelector('.hero-count');
    function heroGo(n){
      heroSlides[heroCur].classList.remove('is-active'); heroDots[heroCur].removeAttribute('aria-current');
      heroCur = (n + heroSlides.length) % heroSlides.length;
      heroSlides[heroCur].classList.add('is-active'); heroDots[heroCur].setAttribute('aria-current','true');
      if (heroCount) heroCount.textContent = ('0' + (heroCur + 1)).slice(-2) + ' / ' + ('0' + heroSlides.length).slice(-2);
    }
    function heroAuto(){ clearInterval(heroTimer); /* manual slider: no autoplay */ }
    heroSlider.querySelector('.hero-prev').addEventListener('click', function(){ heroGo(heroCur-1); heroAuto(); });
    heroSlider.querySelector('.hero-next').addEventListener('click', function(){ heroGo(heroCur+1); heroAuto(); });
    heroDots.forEach(function(d, i){ d.addEventListener('click', function(){ heroGo(i); heroAuto(); }); });
    heroSlider.addEventListener('keydown', function(e){
      var rtl = document.documentElement.dir === 'rtl';
      if (e.key === 'ArrowRight') { heroGo(heroCur + (rtl ? -1 : 1)); heroAuto(); }
      if (e.key === 'ArrowLeft') { heroGo(heroCur + (rtl ? 1 : -1)); heroAuto(); }
    });
    var touchX = null;
    heroSlider.addEventListener('touchstart', function(e){ touchX = e.changedTouches[0].clientX; clearInterval(heroTimer); }, {passive:true});
    heroSlider.addEventListener('touchend', function(e){ if (touchX === null) return; var dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 40) { var rtl = document.documentElement.dir === 'rtl'; heroGo(heroCur + (dx < 0 ? (rtl ? -1 : 1) : (rtl ? 1 : -1))); } touchX = null; heroAuto(); }, {passive:true});
    heroSlider.addEventListener('mouseenter', function(){ clearInterval(heroTimer); });
    heroSlider.addEventListener('mouseleave', heroAuto);
    heroAuto();
  }

  /* ---------- WhatsApp bag + inquiry builders ---------- */
  var WA_URL = 'https://wa.me/971563220110';
  function waLink(text){ return WA_URL + '?text=' + encodeURIComponent(text); }
  function curLang(){ try { return localStorage.getItem('lareen-lang') || 'en'; } catch(e){ return 'en'; } }
  function getBag(){ try { var b = JSON.parse(localStorage.getItem('lareen-bag') || '[]'); return Array.isArray(b) ? b : []; } catch(e){ return []; } }
  function bagCount(){ return getBag().reduce(function(n, i){ return n + (parseInt(i.qty, 10) || 0); }, 0); }
  function updateBagBadges(){
    var n = bagCount();
    document.querySelectorAll('#lareen-bag-count').forEach(function(el){ el.textContent = n; });
    document.querySelectorAll('.lareen-mobile-bar .bag').forEach(function(a){ a.classList.toggle('has-items', n > 0); });
    var hb = document.getElementById('lareen-header-bag-count'); if (hb) hb.textContent = n;
  }
  function setBag(b){ try { localStorage.setItem('lareen-bag', JSON.stringify(b)); } catch(e){} updateBagBadges(); }
  function bagAnnounce(slug){
    var live = document.getElementById('lareen-bag-live');
    if (!live) { live = document.createElement('div'); live.id = 'lareen-bag-live'; live.className = 'sr-only'; live.setAttribute('aria-live','polite'); document.body.appendChild(live); }
    var pr = (typeof bySlug !== 'undefined' && bySlug[slug]) || null;
    var ar = curLang() === 'ar';
    var name = pr ? (ar ? (pr.name_ar || pr.name_en) : pr.name_en) : slug;
    live.textContent = ar ? ('تمت إضافة ' + name + ' إلى حقيبتك.') : ('Added ' + name + ' to your bag.');
  }
  function bagAdd(slug, qty){
    qty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    var bag = getBag(); var it = null;
    bag.forEach(function(x){ if (x.slug === slug) it = x; });
    if (it) it.qty += qty; else bag.push({slug: slug, qty: qty});
    setBag(bag); bagAnnounce(slug);
  }
  function buildOrderMessage(o){
    var ar = curLang() === 'ar';
    var lines = [];
    lines.push(ar ? 'مرحبًا حلويات لارين — البرشاء 1. أود طلب التالي:' : 'Hello LaReen Sweets — Al Barsha 1. I would like to request this order:');
    lines.push('');
    var allPriced = true, subtotal = 0, shown = 0;
    o.items.forEach(function(it){
      var pr = bySlug[it.slug]; if (!pr) return; shown++;
      var name = ar ? (pr.name_ar || pr.name_en) : pr.name_en;
      var priceTxt = '';
      if (pr.price_status === 'approved_fixed' && pr.price_aed_minor != null) { priceTxt = ' — ' + fmt(pr.price_aed_minor * it.qty); subtotal += pr.price_aed_minor * it.qty; }
      else { priceTxt = ar ? ' — السعر عند الطلب' : ' — price on request'; allPriced = false; }
      lines.push(shown + '. ' + name + ' — ' + ((ar ? (pr.unit_ar || pr.unit) : pr.unit) || '') + ' × ' + it.qty + priceTxt);
    });
    lines.push('');
    if (shown && allPriced) lines.push((ar ? 'المجموع الفرعي المعروف: ' : 'Known item subtotal: ') + fmt(subtotal) + (ar ? ' (سيتم تأكيد رسوم التوصيل والمبلغ النهائي)' : ' (delivery/final amount to be confirmed)'));
    else if (shown) lines.push(ar ? 'بعض الأصناف تحتاج عرض سعر — لا يوجد مجموع معروض.' : 'Some items need a quote — no total shown.');
    lines.push((ar ? 'طريقة الاستلام: ' : 'Fulfilment: ') + (o.fulfillment || (ar ? 'يُحدد لاحقًا' : 'To be confirmed')));
    if (o.date) lines.push((ar ? 'التاريخ المطلوب: ' : 'Requested date: ') + o.date);
    if (o.name) lines.push((ar ? 'الاسم: ' : 'Customer name: ') + o.name);
    if (o.phone) lines.push((ar ? 'الهاتف: ' : 'Phone: ') + o.phone);
    if (o.email) lines.push((ar ? 'البريد الإلكتروني: ' : 'Email: ') + o.email);
    if (o.gift) lines.push((ar ? 'ملاحظة هدية: ' : 'Gift note: ') + o.gift);
    if (o.notes) lines.push((ar ? 'ملاحظات خاصة: ' : 'Special message: ') + o.notes);
    lines.push('');
    lines.push(ar ? 'يرجى تأكيد التوفر والسعر النهائي الدقيق وطريقة الاستلام وخيارات الدفع. شكرًا!' : 'Please confirm availability, exact final price, fulfillment and payment options. Thank you!');
    return lines.join('\n');
  }
  function buildInquiryMessage(kind, v){
    var ar = curLang() === 'ar';
    var lines = [];
    var title = kind === 'custom-cake' ? (ar ? 'استفسار كيك مخصص — حلويات لارين، البرشاء 1' : 'Custom cake inquiry — LaReen Sweets, Al Barsha 1')
      : kind === 'catering' ? (ar ? 'استفسار مناسبات / شركات — حلويات لارين، البرشاء 1' : 'Catering / corporate inquiry — LaReen Sweets, Al Barsha 1')
      : (ar ? 'رسالة إلى حلويات لارين، البرشاء 1' : 'Message to LaReen Sweets, Al Barsha 1');
    lines.push(title); lines.push('');
    function row(labelEn, labelAr, val){ if (val) lines.push((ar ? labelAr : labelEn) + ': ' + val); }
    if (kind === 'custom-cake') {
      row('Occasion', 'المناسبة', v.occasion); row('Desired date', 'التاريخ المطلوب', v.desired_date);
      row('Size', 'الحجم', v.size); row('Servings', 'عدد الحصص', v.servings);
      row('Flavour', 'النكهة', v.flavour); row('Style / palette', 'النمط / لوحة الألوان', v.palette);
      row('Inscription', 'النقش', v.inscription); row('Pickup or delivery', 'استلام أو توصيل', v.pickup_delivery);
      row('Delivery area', 'منطقة التوصيل', v.delivery_area); row('Allergy note', 'ملاحظة الحساسية', v.allergy_note);
      row('Budget', 'الميزانية', v.budget);
    } else if (kind === 'catering') {
      row('Occasion', 'المناسبة', v.occasion); row('Date', 'التاريخ', v.desired_date);
      row('Guest count', 'عدد الضيوف', v.guest_count); row('Approximate budget (AED)', 'الميزانية التقريبية (درهم)', v.budget_text);
      row('Requested sweets', 'الحلويات المطلوبة', v.requested_products); row('Pickup or delivery', 'استلام أو توصيل', v.pickup_delivery);
      row('Delivery area', 'منطقة التوصيل', v.delivery_area);
    }
    row('Name', 'الاسم', v.name); row('Phone', 'الهاتف', v.phone); row('Email', 'البريد الإلكتروني', v.email);
    row('Notes', 'ملاحظات', v.notes);
    lines.push('');
    lines.push(ar ? 'يرجى تأكيد التوفر والسعر النهائي ووقت التسليم. شكرًا!' : 'Please confirm availability, exact final price and lead time. Thank you!');
    return lines.join('\n');
  }
  /* header bag link */
  (function(){
    var navlinks = document.querySelector('.navlinks');
    if (navlinks && !document.getElementById('lareen-header-bag')) {
      var bagA = document.createElement('a'); bagA.href = '/bag'; bagA.id = 'lareen-header-bag'; bagA.className = 'nav-sign';
      bagA.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 12.2a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3L5 8z"/><path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8"/></svg><span data-en="Bag" data-ar="الحقيبة">Bag</span> (<span id="lareen-header-bag-count">0</span>)';
      navlinks.appendChild(bagA);
    }
    updateBagBadges();
  })();
  /* bestseller / card add-to-bag buttons */
  document.querySelectorAll('[data-add-to-bag]').forEach(function(b){
    b.addEventListener('click', function(){
      bagAdd(b.getAttribute('data-add-to-bag'), 1);
      var orig = b.innerHTML;
      b.innerHTML = L('Added ✓', 'تمت الإضافة ✓'); b.disabled = true;
      setTimeout(function(){ b.innerHTML = orig; b.disabled = false; }, 1600);
    });
  });
  /* product page: quantity + add to bag + ask on WhatsApp */
  (function(){
    var path = window.location.pathname.replace(/\.html$/, '');
    if (path.indexOf('/products/') !== 0) return;
    var slug = path.split('/').pop();
    var pr = bySlug[slug]; if (!pr) return;
    var mainEl = document.querySelector('main'); if (!mainEl) return;
    var tal = null;
    mainEl.querySelectorAll('a').forEach(function(a){ if (a.href.indexOf('talabat.com') >= 0) tal = a; });
    if (!tal) return;
    var box = document.createElement('div'); box.className = 'panel'; box.style.margin = '18px 0';
    box.innerHTML = '<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:end">'
      + '<div><label for="lareen-qty">' + L('Quantity', 'الكمية') + '</label><input id="lareen-qty" type="number" min="1" max="99" value="1" style="max-width:110px"></div>'
      + '<button class="btn" id="lareen-add" type="button">' + L('Add to bag', 'أضف إلى الحقيبة') + '</button>'
      + '<a class="btn light" id="lareen-ask" target="_blank" rel="noopener noreferrer" href="#">' + L('Ask about this sweet on WhatsApp', 'اسأل عن هذه الحلوى عبر واتساب') + '</a></div>'
      + '<p class="muted" id="lareen-added" style="display:none;margin-top:12px">' + L('Added to your bag.', 'تمت الإضافة إلى حقيبتك.') + '</p>';
    tal.before(box);
    function askHref(){
      var nm = curLang() === 'ar' ? (pr.name_ar || pr.name_en) : pr.name_en;
      var prefix = curLang() === 'ar' ? 'مرحبًا حلويات لارين — البرشاء 1. أود الاستفسار عن: ' : 'Hello LaReen Sweets — Al Barsha 1. I would like to ask about: ';
      return waLink(prefix + nm + ' — ' + ((curLang() === 'ar' ? (pr.unit_ar || pr.unit) : pr.unit) || ''));
    }
    document.getElementById('lareen-ask').href = askHref();
    document.getElementById('lareen-add').addEventListener('click', function(){
      var q = parseInt(document.getElementById('lareen-qty').value, 10); if (!(q > 0)) q = 1; if (q > 99) q = 99;
      bagAdd(slug, q);
      document.getElementById('lareen-added').style.display = 'block';
    });
  })();
  /* WhatsApp inquiry builders (custom cake / catering / contact) */
  document.querySelectorAll('form[data-wa-kind]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var values = {};
      form.querySelectorAll('input,select,textarea').forEach(function(el){ if (el.id) values[el.id] = el.value.trim(); });
      var oldErr = form.querySelector('.lareen-error'); if (oldErr) oldErr.remove();
      function err(msgEn, msgAr){
        var pp = document.createElement('p'); pp.className = 'lareen-error'; pp.style.color = '#a00'; pp.style.fontWeight = '700';
        pp.innerHTML = L(msgEn, msgAr); form.appendChild(pp);
      }
      if (!values.name) { err('Please enter your name.', 'يرجى إدخال اسمك.'); return; }
      if (!values.phone) { err('Please enter your phone number.', 'يرجى إدخال رقم هاتفك.'); return; }
      if (!/^\+?[0-9]{7,15}$/.test(values.phone.replace(/[\s\-()]/g, ''))) { err('Please enter a valid phone number.', 'يرجى إدخال رقم هاتف صحيح.'); return; }
      if (values.desired_date) {
        var todayDx = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai' }).format(new Date());
        if (values.desired_date < todayDx) { err('Please choose a date that is not in the past.', 'يرجى اختيار تاريخ ليس في الماضي.'); return; }
      }
      var msg = buildInquiryMessage(form.getAttribute('data-wa-kind'), values);
      var box = form.querySelector('.lareen-wa-box');
      if (!box) { box = document.createElement('div'); box.className = 'lareen-wa-box'; form.appendChild(box); }
      box.innerHTML = '<div class="receipt"><strong>' + L('Ready to send on WhatsApp.', 'جاهز للإرسال عبر واتساب.') + '</strong><br>'
        + L('Your request is sent only after you send the message in WhatsApp.', 'يتم إرسال طلبك فقط بعد إرسال الرسالة في واتساب.') + '<br><br>'
        + '<a class="btn gold" target="_blank" rel="noopener noreferrer" href="' + waLink(msg) + '">' + L('Send via WhatsApp', 'إرسال عبر واتساب') + '</a> '
        + '<button class="btn light" type="button" data-copy-btn>' + L('Copy message', 'نسخ الرسالة') + '</button>'
        + '<pre style="white-space:pre-wrap;background:#fff;border:1px solid var(--border);border-radius:12px;padding:14px;margin-top:14px">' + esc(msg) + '</pre></div>';
      box.querySelector('[data-copy-btn]').addEventListener('click', function(){
        var btn = this;
        function done(){ var orig = btn.innerHTML; btn.innerHTML = L('Copied \u2713', 'تم النسخ \u2713'); setTimeout(function(){ btn.innerHTML = orig; }, 1600); }
        function fallback(){ var ta = document.createElement('textarea'); ta.value = msg; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch(e2){} ta.remove(); done(); }
        try { var prm = navigator.clipboard && navigator.clipboard.writeText(msg); if (prm && prm.then) prm.then(done, fallback); else done(); } catch(err2){ fallback(); }
      });
    });
  });
  /* bag page */
  (function(){
    var itemsEl = document.getElementById('lareen-bag-items');
    if (!itemsEl) return;
    var sendA = document.getElementById('lareen-send-wa');
    var errEl = document.getElementById('lareen-bag-error');
    var warnEl = document.getElementById('lareen-wa-warn');
    function formVals(){
      function v(id){ var el = document.getElementById(id); return el ? el.value.trim() : ''; }
      return { fulfillment: v('bag-fulfillment'), date: v('bag-date'), name: v('bag-name'), phone: v('bag-phone'), email: v('bag-email'), gift: v('bag-gift'), notes: v('bag-notes') };
    }
    function renderBag(){
      var ar = curLang() === 'ar';
      var bag = getBag();
      if (!bag.length) {
        itemsEl.innerHTML = '<p class="muted">' + L('Your bag is empty.', 'حقيبتك فارغة.') + '</p><p><a class="btn" href="/shop">' + L('Browse sweets', 'تصفح الحلويات') + '</a></p>';
        if (sendA) sendA.style.display = 'none';
        var sum = document.getElementById('lareen-bag-summary'); if (sum) sum.innerHTML = '';
        return;
      }
      if (sendA) sendA.style.display = '';
      var allPriced = true, subtotal = 0;
      var html = '';
      bag.forEach(function(it, i){
        var pr = bySlug[it.slug]; if (!pr) return;
        var priceTxt = '';
        if (pr.price_status === 'approved_fixed' && pr.price_aed_minor != null) { priceTxt = '<bdi dir="ltr">' + fmt(pr.price_aed_minor * it.qty) + '</bdi>'; subtotal += pr.price_aed_minor * it.qty; }
        else { priceTxt = L('Price on request', 'السعر عند الطلب'); allPriced = false; }
        html += '<div class="panel" style="margin-bottom:12px;display:flex;gap:14px;align-items:center;flex-wrap:wrap">'
          + '<img src="/images/' + esc(it.slug) + '.jpg" alt="" style="width:72px;height:72px;object-fit:cover;border-radius:12px">'
          + '<div style="flex:1;min-width:180px"><strong>' + esc(ar ? (pr.name_ar || pr.name_en) : pr.name_en) + '</strong><br><span class="muted">' + esc((ar ? (pr.unit_ar || pr.unit) : pr.unit) || '') + ' · ' + (typeof priceTxt === 'string' && priceTxt.charAt(0) === '<' ? priceTxt : esc(priceTxt)) + '</span></div>'
          + '<div style="display:flex;gap:8px;align-items:center"><button class="btn light" type="button" data-dec="' + i + '" aria-label="' + (ar ? 'تقليل الكمية' : 'Decrease quantity') + '" data-aria-en="Decrease quantity" data-aria-ar="تقليل الكمية">−</button><span><bdi dir="ltr">' + it.qty + '</bdi></span><button class="btn light" type="button" data-inc="' + i + '" aria-label="' + (ar ? 'زيادة الكمية' : 'Increase quantity') + '" data-aria-en="Increase quantity" data-aria-ar="زيادة الكمية">+</button>'
          + '<button class="btn light" type="button" data-remove="' + i + '">' + L('Remove', 'إزالة') + '</button></div></div>';
      });
      itemsEl.innerHTML = html;
      var sum = document.getElementById('lareen-bag-summary');
      if (sum) {
        sum.innerHTML = allPriced
          ? '<p><strong>' + L('Known item subtotal: ', 'المجموع الفرعي المعروف: ') + '<bdi dir="ltr">' + fmt(subtotal) + '</bdi></strong></p><p class="muted">' + L('Bakery will confirm final price, availability, and delivery charge.', 'سيؤكد المخبز السعر النهائي والتوفر ورسوم التوصيل.') + '</p>'
          : '<p class="muted">' + L('Some items need a quote — no total shown. The bakery will confirm the final price.', 'بعض الأصناف تحتاج عرض سعر — لا يوجد مجموع معروض. سيؤكد المخبز السعر النهائي.') + '</p>';
      }
      itemsEl.querySelectorAll('[data-dec]').forEach(function(b){ b.addEventListener('click', function(){ var bag2 = getBag(); var idx = parseInt(b.getAttribute('data-dec'), 10); bag2[idx].qty -= 1; if (bag2[idx].qty <= 0) bag2.splice(idx, 1); setBag(bag2); renderBag(); }); });
      itemsEl.querySelectorAll('[data-inc]').forEach(function(b){ b.addEventListener('click', function(){ var bag2 = getBag(); var idx = parseInt(b.getAttribute('data-inc'), 10); if (bag2[idx].qty < 99) bag2[idx].qty += 1; setBag(bag2); renderBag(); }); });
      itemsEl.querySelectorAll('[data-remove]').forEach(function(b){ b.addEventListener('click', function(){ var bag2 = getBag(); bag2.splice(parseInt(b.getAttribute('data-remove'), 10), 1); setBag(bag2); renderBag(); }); });
      refreshSend();
    }
    function refreshSend(){
      if (!sendA) return;
      var f = formVals();
      var msg = buildOrderMessage({ items: getBag(), fulfillment: f.fulfillment, date: f.date, name: f.name, phone: f.phone, email: f.email, gift: f.gift, notes: f.notes });
      var href = waLink(msg);
      sendA.href = href;
      if (warnEl) warnEl.style.display = href.length > 8000 ? 'block' : 'none';
    }
    ['bag-fulfillment', 'bag-date', 'bag-name', 'bag-phone', 'bag-email', 'bag-gift', 'bag-notes'].forEach(function(id){
      var el = document.getElementById(id); if (el) el.addEventListener('input', refreshSend); if (el) el.addEventListener('change', refreshSend);
    });
    if (sendA) sendA.addEventListener('click', function(e){
      var f = formVals();
      if (errEl) errEl.style.display = 'none';
      function fail(msgEn, msgAr){ e.preventDefault(); if (errEl) { errEl.innerHTML = L(msgEn, msgAr); errEl.style.display = 'block'; } }
      if (!getBag().length) { fail('Your bag is empty.', 'حقيبتك فارغة.'); return; }
      if (!f.name) { fail('Please enter your name.', 'يرجى إدخال اسمك.'); return; }
      if (!f.phone) { fail('Please enter your phone number.', 'يرجى إدخال رقم هاتفك.'); return; }
      if (!/^\+?[0-9]{7,15}$/.test(f.phone.replace(/[\s\-()]/g, ''))) { fail('Please enter a valid phone number.', 'يرجى إدخال رقم هاتف صحيح.'); return; }
      if (f.date) {
        var todayDx = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dubai' }).format(new Date());
        if (f.date < todayDx) { fail('Please choose a date that is not in the past.', 'يرجى اختيار تاريخ ليس في الماضي.'); return; }
      }
      refreshSend();
    });
    renderBag();
  })();

  /* ---------- Category rail: one slidable line ---------- */
  (function(){
    var rail = document.getElementById('lareen-cat-rail');
    if (!rail) return;
    var prev = document.querySelector('.cat-rail-prev'), next = document.querySelector('.cat-rail-next');
    var rs = document.documentElement.dir === 'rtl' ? -1 : 1;
    if (prev) prev.addEventListener('click', function(){ rail.scrollBy({left: -270 * rs, behavior: 'smooth'}); });
    if (next) next.addEventListener('click', function(){ rail.scrollBy({left: 270 * rs, behavior: 'smooth'}); });
  })();

  /* ---------- Premium mobile order bar ---------- */
  if (!document.querySelector('.lareen-mobile-bar')) {
    var barEl = document.createElement('div'); barEl.className = 'lareen-mobile-bar';
    barEl.innerHTML = '<a class="wa" href="https://wa.me/971563220110" target="_blank" rel="noopener noreferrer" aria-label="Order on WhatsApp"><svg viewBox="0 0 24 24" fill="#F7F3EC" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg><span>WhatsApp</span></a><a class="bag" href="/bag" aria-label="View bag"><span class="ic-wrap"><svg viewBox="0 0 24 24" fill="none" stroke="#F7F3EC" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 12.2a1.5 1.5 0 0 1-1.5 1.3H7.7a1.5 1.5 0 0 1-1.5-1.3L5 8z"/><path d="M8.5 8V6.5a3.5 3.5 0 0 1 7 0V8"/></svg><span class="count" id="lareen-bag-count">0</span></span><span>Bag</span></a><a class="call" href="tel:+97142220110" aria-label="Call the bakery"><svg viewBox="0 0 24 24" fill="none" stroke="#F7F3EC" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3h3.5l1.5 4-2 1.5a13 13 0 0 0 5.5 5.5L15 12l4 1.5V17a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3z"/></svg><span>Call</span></a>';
    document.body.appendChild(barEl);
  }

  /* ---------- V2 luxury motion: progressive reveals, content visible without JS ---------- */
  (function(){
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!nodes.length || !('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var visible = nodes.filter(function(el){ return el.getBoundingClientRect().top < window.innerHeight; });
    visible.forEach(function(el){ el.classList.add('is-visible'); });
    document.documentElement.dataset.motionReady = 'true';
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    nodes.filter(function(el){ return !el.classList.contains('is-visible'); }).forEach(function(el){ observer.observe(el); });
  })();
})();
