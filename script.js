/* ==========================================================================
   WEIGHT GAIN DASHBOARD — SCRIPT
   Sections: Data, Loading Screen, Background FX, Header/Nav, Clock, Theme,
   Typing Effect, Counters, Tilt, Parallax, Timeline, Workout, Nutrition,
   Shopping, Checklist + Progress + LocalStorage, Weight Tracker, Confetti,
   Scroll Reveal, FAB, Ripple
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /* DATA                                                                */
  /* ------------------------------------------------------------------ */

  const ROUTINE_DATA = [
    { time: '6:00 AM', icon: '💧', title: 'Wake Up', desc: 'Drink one glass of water.' },
    { time: '6:05 AM', icon: '🍌', title: 'Morning Snack', desc: '1 Banana · 8–10 Raisins · 4 Almonds · 4 Cashews' },
    { time: '6:20 AM', icon: '🪥', title: 'Get Ready', desc: 'Freshen up for the day ahead.' },
    { time: '6:40 AM', icon: '🎒', title: 'Leave for Class', desc: 'Head out for college.' },
    { time: '9:00 AM', icon: '🏠', title: 'Return to Hostel', desc: 'Back from morning classes.' },
    { time: '9:30 AM', icon: '🍽️', title: 'Lunch', desc: 'Rice, Dal, Seasonal Vegetables, Chutney. Eat a full meal.' },
    { time: '11:30 AM', icon: '🥚', title: 'Mid-Morning Boost', desc: '1 Boiled Egg.' },
    { time: '1:00 PM', icon: '🏋️', title: 'Workout', desc: '30 minutes of bodyweight training.' },
    { time: '1:30 PM', icon: '🚿', title: 'Bath', desc: 'Cool down and freshen up.' },
    { time: '1:45 PM', icon: '🥜', title: 'Post-Workout Meal', desc: '1 Banana + one handful of roasted peanuts.' },
    { time: '2:00 PM', icon: '📚', title: 'Study', desc: 'Focus block.' },
    { time: '3:45 PM', icon: '🍌', title: 'Snack', desc: '1 Boiled Egg + 1 Banana.' },
    { time: '4:00 – 7:00 PM', icon: '💻', title: 'Study / Laptop', desc: 'Assignments and screen time.' },
    { time: '7:00 PM', icon: '🚶', title: 'Evening Walk', desc: '45 minute walk.' },
    { time: '8:00 PM', icon: '🏠', title: 'Return to Room', desc: 'Wind down for the evening.' },
    { time: '8:30 PM', icon: '🍽️', title: 'Dinner', desc: 'Rice, Dal, Vegetables.' },
    { time: '9:15 PM', icon: '🥜', title: 'Night Snack', desc: 'Roasted Peanuts + a few Raisins.' },
    { time: '10:30 PM', icon: '😴', title: 'Sleep', desc: 'Lights out — recovery time.' },
  ];

  const WORKOUT_DATA = [
    { icon: '🔥', name: 'Warm Up', detail: '5 minutes' },
    { icon: '🦵', name: 'Bodyweight Squats', detail: '3 × 15' },
    { icon: '💪', name: 'Push Ups', detail: '3 × 8–12' },
    { icon: '🚶‍♂️', name: 'Lunges', detail: '3 × 10 each leg' },
    { icon: '🍑', name: 'Glute Bridge', detail: '3 × 15' },
    { icon: '🧘', name: 'Plank', detail: '3 × 30–45 sec' },
    { icon: '🦸', name: 'Superman Hold', detail: '3 × 20 sec' },
    { icon: '🤸', name: 'Stretching', detail: '5 minutes' },
  ];

  const NUTRITION_DATA = [
    { icon: '🥚', name: 'Eggs', qty: '2 per day' },
    { icon: '🍌', name: 'Bananas', qty: '3 per day' },
    { icon: '🥜', name: 'Roasted Peanuts', qty: '2 handfuls' },
    { icon: '🍚', name: 'Rice', qty: 'Daily' },
    { icon: '🍛', name: 'Dal', qty: 'Daily' },
    { icon: '🥦', name: 'Seasonal Vegetables', qty: 'Daily' },
    { icon: '🍇', name: 'Raisins', qty: 'Handful' },
    { icon: '🌰', name: 'Almonds', qty: '4–5 pcs' },
    { icon: '🥥', name: 'Cashews', qty: '4–5 pcs' },
    { icon: '💧', name: 'Water', qty: '2.5–3 L' },
  ];

  const SHOPPING_DATA = [
    { icon: '🥚', name: 'Eggs', qty: '60 pcs' },
    { icon: '🍌', name: 'Bananas', qty: '90 pcs' },
    { icon: '🥜', name: 'Roasted Peanuts', qty: '2–3 kg' },
    { icon: '🍇', name: 'Raisins', qty: '500 g' },
    { icon: '🌰', name: 'Almonds', qty: '250 g' },
    { icon: '🥥', name: 'Cashews', qty: '250 g' },
  ];

  const TYPED_STRING = 'Healthy Weight Gain Journey';
  const MILESTONES = [51, 52, 54, 56, 58, 60];
  const CURRENT_WEIGHT = 51;
  const GOAL_WEIGHT = 60;
  const STORAGE_KEY = 'wgd_checklist_v1';
  const THEME_KEY = 'wgd_theme';
  const REMINDER_IDS_KEY = 'wgd_reminder_ids_v1';
  const REMINDER_FIRED_KEY = 'wgd_reminder_fired_v1';
  const REMINDERS_ON_KEY = 'wgd_reminders_on';

  /* ------------------------------------------------------------------ */
  /* LOADING SCREEN                                                      */
  /* ------------------------------------------------------------------ */

  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      initHeroAnimations();
    }, 1000);
  });

  /* ------------------------------------------------------------------ */
  /* BACKGROUND FX — stars + floating icons                             */
  /* ------------------------------------------------------------------ */

  function buildStars() {
    const layer = document.getElementById('starsLayer');
    const frag = document.createDocumentFragment();
    const count = window.innerWidth < 720 ? 40 : 80;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = (Math.random() * 3) + 's';
      s.style.animationDuration = (2 + Math.random() * 3) + 's';
      frag.appendChild(s);
    }
    layer.appendChild(frag);
  }

  function buildFloatingIcons() {
    const layer = document.getElementById('floatingIcons');
    const icons = ['🍌', '🥚', '💪', '🥜', '💧', '🏋️', '🍚', '⚡'];
    const frag = document.createDocumentFragment();
    const count = window.innerWidth < 720 ? 6 : 12;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'f-icon';
      el.textContent = icons[i % icons.length];
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 100 + '%';
      el.style.animationDelay = (Math.random() * -14) + 's';
      el.style.animationDuration = (10 + Math.random() * 8) + 's';
      frag.appendChild(el);
    }
    layer.appendChild(frag);
  }

  /* ------------------------------------------------------------------ */
  /* HEADER — scroll state, active link, mobile nav, smooth scroll      */
  /* ------------------------------------------------------------------ */

  function initHeader() {
    const header = document.getElementById('siteHeader');
    const burger = document.getElementById('navBurger');
    const nav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });

    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        nav.classList.remove('open');
      });
    });

    // Active link highlighting via IntersectionObserver
    const sections = document.querySelectorAll('main section[id]');
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((l) => l.classList.toggle('active', l.dataset.section === id));
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    sections.forEach((s) => navObserver.observe(s));
  }

  /* ------------------------------------------------------------------ */
  /* LIVE CLOCK                                                          */
  /* ------------------------------------------------------------------ */

  function initClock() {
    const clockEl = document.getElementById('liveClock');
    function tick() {
      const now = new Date();
      let h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      clockEl.textContent = `${String(h).padStart(2, '0')}:${m}:${s} ${ampm}`;
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ------------------------------------------------------------------ */
  /* THEME TOGGLE                                                        */
  /* ------------------------------------------------------------------ */

  function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light') document.body.classList.add('light-theme');

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      localStorage.setItem(THEME_KEY, document.body.classList.contains('light-theme') ? 'light' : 'dark');
    });
  }

  /* ------------------------------------------------------------------ */
  /* TYPING EFFECT (hero heading)                                        */
  /* ------------------------------------------------------------------ */

  function typeTitle() {
    const el = document.getElementById('typedTitle');
    let i = 0;
    function step() {
      if (i <= TYPED_STRING.length) {
        el.textContent = TYPED_STRING.slice(0, i);
        i++;
        setTimeout(step, 55);
      }
    }
    step();
  }

  /* ------------------------------------------------------------------ */
  /* ANIMATED COUNTERS                                                   */
  /* ------------------------------------------------------------------ */

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1400;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toFixed(decimals);
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(frame);
  }

  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => io.observe(c));
  }

  /* Hero weight progress bar */
  function animateHeroProgress() {
    const fill = document.getElementById('heroProgressFill');
    const pctLabel = document.getElementById('heroProgressPct');
    const pct = Math.round(((CURRENT_WEIGHT - 51) / (GOAL_WEIGHT - 51)) * 100);
    // Always start visible with a minimum sliver so users see where they are
    const displayPct = Math.max(pct, 4);
    requestAnimationFrame(() => {
      fill.style.width = displayPct + '%';
    });
    pctLabel.textContent = pct + '%';
  }

  /* ------------------------------------------------------------------ */
  /* TILT (3D card hover) + MOUSE PARALLAX (hero) + CUSTOM CURSOR       */
  /* ------------------------------------------------------------------ */

  function initTilt() {
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -10;
        const rotateY = ((x / rect.width) - 0.5) * 10;
        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  function initParallax() {
    const visual = document.getElementById('heroVisual');
    if (!visual) return;
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      visual.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  function initCustomCursor() {
    const glow = document.getElementById('cursorGlow');
    if (window.matchMedia('(hover: none)').matches) return;
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .tl-check, .checklist-item, [data-tilt]').forEach((el) => {
      el.addEventListener('mouseenter', () => glow.classList.add('grow'));
      el.addEventListener('mouseleave', () => glow.classList.remove('grow'));
    });
  }

  /* ------------------------------------------------------------------ */
  /* RENDER: TIMELINE                                                    */
  /* ------------------------------------------------------------------ */

  function renderTimeline() {
    const container = document.getElementById('timeline');
    const frag = document.createDocumentFragment();
    ROUTINE_DATA.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.dataset.id = 'routine-' + idx;
      el.innerHTML = `
        <span class="tl-icon">${item.icon}</span>
        <div class="tl-body">
          <div class="tl-time">${item.time}</div>
          <div class="tl-title">${item.title}</div>
          <div class="tl-desc">${item.desc}</div>
        </div>
        <div class="tl-actions">
          <span class="tl-bell" data-id="routine-${idx}" role="checkbox" aria-checked="false" tabindex="0" title="Remind me at ${item.time}">🔔</span>
          <span class="tl-check" data-id="routine-${idx}" role="checkbox" aria-checked="false" tabindex="0"></span>
        </div>
      `;
      frag.appendChild(el);
    });
    container.appendChild(frag);
  }

  /* ------------------------------------------------------------------ */
  /* RENDER: WORKOUT                                                     */
  /* ------------------------------------------------------------------ */

  function renderWorkout() {
    const container = document.getElementById('workoutGrid');
    const frag = document.createDocumentFragment();
    WORKOUT_DATA.forEach((w) => {
      const el = document.createElement('div');
      el.className = 'workout-card tilt-card';
      el.setAttribute('data-tilt', '');
      el.innerHTML = `
        <div class="workout-icon">${w.icon}</div>
        <div class="workout-name">${w.name}</div>
        <div class="workout-detail">${w.detail}</div>
      `;
      frag.appendChild(el);
    });
    container.appendChild(frag);
  }

  /* ------------------------------------------------------------------ */
  /* RENDER: NUTRITION + SHOPPING                                        */
  /* ------------------------------------------------------------------ */

  function renderNutrition() {
    const container = document.getElementById('nutritionGrid');
    const frag = document.createDocumentFragment();
    NUTRITION_DATA.forEach((n) => {
      const el = document.createElement('div');
      el.className = 'food-card';
      el.innerHTML = `
        <div class="food-icon">${n.icon}</div>
        <div class="food-name">${n.name}</div>
        <div class="food-qty">${n.qty}</div>
      `;
      frag.appendChild(el);
    });
    container.appendChild(frag);
  }

  function renderShopping() {
    const container = document.getElementById('shoppingGrid');
    const frag = document.createDocumentFragment();
    SHOPPING_DATA.forEach((s) => {
      const el = document.createElement('div');
      el.className = 'shop-card';
      el.innerHTML = `
        <div class="shop-icon">${s.icon}</div>
        <div>
          <div class="shop-name">${s.name}</div>
          <div class="shop-qty">${s.qty}</div>
        </div>
      `;
      frag.appendChild(el);
    });
    container.appendChild(frag);
  }

  /* ------------------------------------------------------------------ */
  /* CHECKLIST + PROGRESS + LOCALSTORAGE                                 */
  /* ------------------------------------------------------------------ */

  function loadCompleted() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved = raw ? JSON.parse(raw) : {};
      const today = new Date().toDateString();
      if (saved.date !== today) {
        return { date: today, done: {} };
      }
      return saved;
    } catch (e) {
      return { date: new Date().toDateString(), done: {} };
    }
  }

  function saveCompleted(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  let checklistState = loadCompleted();

  function renderChecklist() {
    const container = document.getElementById('checklist');
    container.innerHTML = '';
    const frag = document.createDocumentFragment();
    ROUTINE_DATA.forEach((item, idx) => {
      const id = 'routine-' + idx;
      const done = !!checklistState.done[id];
      const el = document.createElement('div');
      el.className = 'checklist-item' + (done ? ' done' : '');
      el.dataset.id = id;
      el.innerHTML = `
        <span class="cl-box"></span>
        <span class="cl-text">${item.title}</span>
        <span class="cl-time">${item.time}</span>
      `;
      frag.appendChild(el);
    });
    container.appendChild(frag);
  }

  function syncTimelineChecks() {
    ROUTINE_DATA.forEach((item, idx) => {
      const id = 'routine-' + idx;
      const done = !!checklistState.done[id];
      const check = document.querySelector(`.tl-check[data-id="${id}"]`);
      const row = check ? check.closest('.timeline-item') : null;
      if (check) {
        check.classList.toggle('checked', done);
        check.setAttribute('aria-checked', String(done));
      }
      if (row) row.classList.toggle('completed', done);
    });
  }

  function updateProgress() {
    const total = ROUTINE_DATA.length;
    const doneCount = Object.values(checklistState.done).filter(Boolean).length;
    const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100);

    const ring = document.getElementById('ringFill');
    const circumference = 2 * Math.PI * 86; // ~540.35
    const offset = circumference - (pct / 100) * circumference;
    ring.style.strokeDashoffset = offset;

    document.getElementById('progressPercent').textContent = pct + '%';
    document.getElementById('progressCount').textContent = `${doneCount} of ${total} tasks done`;

    if (pct === 100 && total > 0) {
      fireConfetti();
    }
  }

  function toggleTask(id) {
    checklistState.done[id] = !checklistState.done[id];
    saveCompleted(checklistState);
    syncTimelineChecks();
    renderChecklist();
    updateProgress();
    attachChecklistEvents();
  }

  function attachTimelineCheckEvents() {
    document.querySelectorAll('.tl-check').forEach((check) => {
      check.addEventListener('click', () => toggleTask(check.dataset.id));
      check.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleTask(check.dataset.id);
        }
      });
    });
  }

  function attachChecklistEvents() {
    document.querySelectorAll('.checklist-item').forEach((row) => {
      row.addEventListener('click', () => toggleTask(row.dataset.id));
    });
  }

  function initResetButton() {
    document.getElementById('resetChecklist').addEventListener('click', () => {
      checklistState = { date: new Date().toDateString(), done: {} };
      saveCompleted(checklistState);
      syncTimelineChecks();
      renderChecklist();
      updateProgress();
      attachChecklistEvents();
    });
  }

  /* ------------------------------------------------------------------ */
  /* WEIGHT TRACKER MILESTONES                                          */
  /* ------------------------------------------------------------------ */

  function initWeightTracker() {
    const fill = document.getElementById('milestoneFill');
    const range = GOAL_WEIGHT - MILESTONES[0];
    const progressAcrossRange = ((CURRENT_WEIGHT - MILESTONES[0]) / range) * 100;
    requestAnimationFrame(() => {
      fill.style.width = Math.max(progressAcrossRange, 2) + '%';
    });

    document.querySelectorAll('.milestone').forEach((m) => {
      const w = parseFloat(m.dataset.weight);
      if (w <= CURRENT_WEIGHT) m.classList.add('reached');
    });
  }

  /* ------------------------------------------------------------------ */
  /* CONFETTI                                                            */
  /* ------------------------------------------------------------------ */

  function fireConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas.dataset.firing === 'true') return;
    canvas.dataset.firing = 'true';
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const colors = ['#4ADE80', '#3B82F6', '#8B5CF6', '#FFFFFF'];
    const pieces = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 6,
      h: 6 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 2 + Math.random() * 3,
      drift: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
    }));

    let frames = 0;
    const maxFrames = 260;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.speed;
        p.x += p.drift;
        p.rotation += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frames++;
      if (frames < maxFrames) {
        requestAnimationFrame(draw);
      } else {
        canvas.style.display = 'none';
        canvas.dataset.firing = 'false';
      }
    }
    draw();
  }

  /* ------------------------------------------------------------------ */
  /* SCROLL REVEAL                                                       */
  /* ------------------------------------------------------------------ */

  function initScrollReveal() {
    const items = document.querySelectorAll('.reveal, .timeline-item');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((item) => io.observe(item));
  }

  /* ------------------------------------------------------------------ */
  /* FLOATING ACTION BUTTON — scroll to top                             */
  /* ------------------------------------------------------------------ */

  function initFab() {
    const fab = document.getElementById('fabTop');
    window.addEventListener('scroll', () => {
      fab.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    fab.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------ */
  /* BUTTON RIPPLE                                                       */
  /* ------------------------------------------------------------------ */

  function initRipple() {
    document.querySelectorAll('.btn-reset, .fab, .theme-toggle').forEach((btn) => {
      btn.style.position = btn.style.position || 'relative';
      btn.style.overflow = 'hidden';
      btn.addEventListener('click', function (e) {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* TOAST                                                               */
  /* ------------------------------------------------------------------ */

  let toastTimer = null;
  function showToast(message, duration) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), duration || 2800);
  }

  /* ------------------------------------------------------------------ */
  /* SERVICE WORKER REGISTRATION (offline support + notification clicks) */
  /* ------------------------------------------------------------------ */

  function initServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {
        // Offline support just won't be available; app still works fully online.
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* INSTALL PROMPT (Add to Home Screen)                                 */
  /* ------------------------------------------------------------------ */

  let deferredInstallPrompt = null;

  function initInstallBanner() {
    const banner = document.getElementById('installBanner');
    const installBtn = document.getElementById('installBtn');
    const closeBtn = document.getElementById('installClose');

    // Don't show again this session if the user dismissed it, or if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      if (!isStandalone && !sessionStorage.getItem('wgd_install_dismissed')) {
        setTimeout(() => banner.classList.add('visible'), 1500);
      }
    });

    installBtn.addEventListener('click', async () => {
      if (!deferredInstallPrompt) return;
      banner.classList.remove('visible');
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      if (choice && choice.outcome === 'accepted') {
        showToast('App installed 💪');
      }
    });

    closeBtn.addEventListener('click', () => {
      banner.classList.remove('visible');
      sessionStorage.setItem('wgd_install_dismissed', '1');
    });

    window.addEventListener('appinstalled', () => {
      banner.classList.remove('visible');
      showToast('App installed 💪');
    });
  }

  /* ------------------------------------------------------------------ */
  /* REMINDERS — per-task browser notifications                         */
  /* ------------------------------------------------------------------ */

  function loadReminderIds() {
    try {
      return new Set(JSON.parse(localStorage.getItem(REMINDER_IDS_KEY) || '[]'));
    } catch (e) {
      return new Set();
    }
  }
  function saveReminderIds(set) {
    localStorage.setItem(REMINDER_IDS_KEY, JSON.stringify(Array.from(set)));
  }

  function loadFiredLog() {
    try {
      const raw = JSON.parse(localStorage.getItem(REMINDER_FIRED_KEY) || '{}');
      const today = new Date().toDateString();
      if (raw.date !== today) return { date: today, ids: [] };
      return raw;
    } catch (e) {
      return { date: new Date().toDateString(), ids: [] };
    }
  }
  function saveFiredLog(log) {
    localStorage.setItem(REMINDER_FIRED_KEY, JSON.stringify(log));
  }

  let reminderIds = loadReminderIds();
  let firedLog = loadFiredLog();
  let remindersEnabled = localStorage.getItem(REMINDERS_ON_KEY) === '1';

  // Parses the first "H:MM AM/PM" occurrence in a routine time string into minutes since midnight
  function parseTimeToMinutes(str) {
    const match = str.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (!match) return null;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();
    if (ampm === 'PM' && hours !== 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  function syncBellUI() {
    document.querySelectorAll('.tl-bell').forEach((bell) => {
      const on = reminderIds.has(bell.dataset.id);
      bell.classList.toggle('on', on);
      bell.setAttribute('aria-checked', String(on));
    });
    const headerBell = document.getElementById('reminderBellToggle');
    headerBell.textContent = remindersEnabled ? '🔔' : '🔕';
    headerBell.classList.toggle('active', remindersEnabled);
  }

  function requestNotificationPermission() {
    if (!('Notification' in window)) {
      showToast('Notifications are not supported on this browser');
      return Promise.resolve(false);
    }
    if (Notification.permission === 'granted') return Promise.resolve(true);
    if (Notification.permission === 'denied') {
      showToast('Notifications are blocked — enable them in your browser settings');
      return Promise.resolve(false);
    }
    return Notification.requestPermission().then((perm) => perm === 'granted');
  }

  function fireNotification(item) {
    const title = `⏰ ${item.title}`;
    const options = {
      body: item.desc || `It's time for ${item.title} (${item.time})`,
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      tag: 'wgd-' + item.title,
      vibrate: [120, 60, 120],
    };
    if (navigator.serviceWorker && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready.then((reg) => {
        if (reg.showNotification) reg.showNotification(title, options);
        else new Notification(title, options);
      }).catch(() => {
        try { new Notification(title, options); } catch (e) { /* no-op */ }
      });
    } else {
      try { new Notification(title, options); } catch (e) { /* no-op */ }
    }
  }

  function checkReminders() {
    if (!remindersEnabled || reminderIds.size === 0) return;
    if (!('Notification' in window) || Notification.permission !== 'granted') return;

    // Roll the fired log over to a fresh day automatically
    const today = new Date().toDateString();
    if (firedLog.date !== today) firedLog = { date: today, ids: [] };

    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    ROUTINE_DATA.forEach((item, idx) => {
      const id = 'routine-' + idx;
      if (!reminderIds.has(id)) return;
      if (firedLog.ids.includes(id)) return;
      const taskMinutes = parseTimeToMinutes(item.time);
      if (taskMinutes === null) return;
      // Fire within a 1-minute window of the scheduled time
      if (nowMinutes === taskMinutes) {
        fireNotification(item);
        firedLog.ids.push(id);
        saveFiredLog(firedLog);
      }
    });
  }

  function toggleReminderForTask(id) {
    if (reminderIds.has(id)) {
      reminderIds.delete(id);
    } else {
      if (!remindersEnabled) {
        showToast('Turn on reminders (bell icon, top right) first');
        return;
      }
      reminderIds.add(id);
    }
    saveReminderIds(reminderIds);
    syncBellUI();
  }

  function initReminders() {
    const headerBell = document.getElementById('reminderBellToggle');

    headerBell.addEventListener('click', async () => {
      if (remindersEnabled) {
        remindersEnabled = false;
        localStorage.setItem(REMINDERS_ON_KEY, '0');
        syncBellUI();
        showToast('Reminders turned off');
        return;
      }
      const granted = await requestNotificationPermission();
      if (granted) {
        remindersEnabled = true;
        localStorage.setItem(REMINDERS_ON_KEY, '1');
        syncBellUI();
        showToast('Reminders on — tap 🔔 on any task to schedule it');
      }
    });

    document.querySelectorAll('.tl-bell').forEach((bell) => {
      bell.addEventListener('click', () => toggleReminderForTask(bell.dataset.id));
      bell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleReminderForTask(bell.dataset.id);
        }
      });
    });

    syncBellUI();
    // Check once a minute; also check immediately so a same-minute load isn't missed
    checkReminders();
    setInterval(checkReminders, 20000);
  }

  /* ------------------------------------------------------------------ */
  /* HERO INIT (after loader hides)                                      */
  /* ------------------------------------------------------------------ */

  function initHeroAnimations() {
    typeTitle();
    animateHeroProgress();
  }

  /* ------------------------------------------------------------------ */
  /* BOOTSTRAP                                                           */
  /* ------------------------------------------------------------------ */

  document.addEventListener('DOMContentLoaded', () => {
    buildStars();
    buildFloatingIcons();
    initHeader();
    initClock();
    initTheme();
    initCustomCursor();
    initParallax();
    initServiceWorker();
    initInstallBanner();

    renderTimeline();
    renderWorkout();
    renderNutrition();
    renderShopping();
    renderChecklist();

    initTilt(); // must run after cards exist
    initCounters();
    initScrollReveal();
    initFab();
    initRipple();
    initResetButton();
    initWeightTracker();
    initReminders(); // must run after timeline bells exist

    attachTimelineCheckEvents();
    attachChecklistEvents();
    syncTimelineChecks();
    updateProgress();
  });

})();
