import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// 1. Live Studio Operating Status (horários vêm de site.config.js)
// ==========================================================================
const SITE = JSON.parse(document.getElementById('site-data')?.textContent || '{}');
const DAY_SHORT = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
const hourLabel = (h) => (Number.isInteger(h) ? `${String(h).padStart(2, '0')}h` : `${Math.floor(h)}h${String(Math.round((h % 1) * 60)).padStart(2, '0')}`);

function updateStudioStatus() {
  const statusContainer = document.getElementById('studio-status');
  const statusLabel = document.getElementById('status-label');
  const scheduleRows = document.querySelectorAll('.schedule-row');
  const hours = SITE.hours || [];

  const now = new Date();
  const day = now.getDay();
  const current = now.getHours() + now.getMinutes() / 60;

  scheduleRows.forEach(row => {
    row.classList.toggle('today', parseInt(row.getAttribute('data-day'), 10) === day);
  });

  const today = hours.find(h => h.day === day);
  let isOpen = false;
  let text = 'Fechado no momento';

  if (today && today.open != null && current >= today.open && current < today.close) {
    isOpen = true;
    text = `Aberto agora · até ${hourLabel(today.close)}`;
  } else {
    // Próxima abertura: hoje (se ainda não abriu) ou o próximo dia com expediente.
    let next = null;
    if (today && today.open != null && current < today.open) {
      text = `Abre hoje às ${hourLabel(today.open)}`;
    } else {
      for (let i = 1; i <= 7 && !next; i++) {
        const cand = hours.find(h => h.day === (day + i) % 7 && h.open != null);
        if (cand) next = { cand, offset: i };
      }
      if (next) {
        const when = next.offset === 1 ? 'amanhã' : DAY_SHORT[next.cand.day];
        text = `Fechado · abre ${when} às ${hourLabel(next.cand.open)}`;
      }
    }
  }

  if (statusContainer && statusLabel) {
    statusLabel.textContent = text;
    statusContainer.classList.toggle('closed', !isOpen);
  }
}

// ==========================================================================
// 2. Mobile Drawer Navigation
// ==========================================================================
function setupMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  function toggleMenu() {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    drawer.setAttribute('aria-hidden', isExpanded);
    drawer.classList.toggle('active');
  }

  toggleBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.classList.remove('active');
    });
  });
}

// ==========================================================================
// 3. Interactive Before / After Comparison Slider
// ==========================================================================
function setupComparisonSlider() {
  const slider = document.getElementById('comparison-slider');
  const beforeLayer = document.getElementById('comparison-before');
  const handle = document.getElementById('comparison-handle');

  if (!slider || !beforeLayer || !handle) return;

  let isDragging = false;

  function updateSliderPosition(percent) {
    const clamped = Math.max(0, Math.min(100, percent));
    beforeLayer.style.width = `${clamped}%`;
    handle.style.left = `${clamped}%`;
    handle.setAttribute('aria-valuenow', Math.round(clamped));
  }

  function handleMove(clientX) {
    const rect = slider.getBoundingClientRect();
    const position = clientX - rect.left;
    const percent = (position / rect.width) * 100;
    updateSliderPosition(percent);
  }

  slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    handleMove(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Support
  slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Keyboard accessibility
  handle.addEventListener('keydown', (e) => {
    const current = parseFloat(handle.getAttribute('aria-valuenow')) || 50;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      updateSliderPosition(current - 5);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      updateSliderPosition(current + 5);
    }
  });
}

// ==========================================================================
// 4. Project Simulator & Dynamic WhatsApp Link
// ==========================================================================
function setupSimulator() {
  const vehicleOptions = document.querySelectorAll('.vehicle-option');
  const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
  const summaryText = document.getElementById('simulator-summary-text');
  const sendBtn = document.getElementById('btn-send-whatsapp');

  let selectedVehicle = vehicleOptions[0]?.getAttribute('data-vehicle') || 'Veículo';

  function updateSummary() {
    const selectedServices = Array.from(serviceCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    let summaryStr = '';
    if (selectedServices.length === 0) {
      summaryStr = `${selectedVehicle} — ${SITE.noProcedures}`;
    } else {
      summaryStr = `${selectedVehicle} com: ${selectedServices.join(', ')}.`;
    }

    if (summaryText) {
      summaryText.textContent = summaryStr;
    }

    // Build WhatsApp URL
    const message = (SITE.message || '')
      .replace('{brand}', SITE.brand)
      .replace('{vehicle}', selectedVehicle)
      .replace('{procedures}', selectedServices.map(s => `  - ${s}`).join('\n'));
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encoded}`;

    if (sendBtn) {
      sendBtn.onclick = () => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      };
    }
  }

  vehicleOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      vehicleOptions.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      selectedVehicle = btn.getAttribute('data-vehicle') || 'Veículo';
      updateSummary();
    });
  });

  serviceCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateSummary);
  });

  updateSummary();
}

// ==========================================================================
// 5. GSAP Animations & Reveal Choreography
// ==========================================================================
function setupAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Hero Entrance
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
  heroTl
    .from('.hero-badge-tag', { opacity: 0, y: -20, delay: 0.2 })
    .from('.hero-title', { opacity: 0, y: 30, duration: 1 }, '-=0.5')
    .from('.hero-description', { opacity: 0, y: 20 }, '-=0.6')
    .from('.hero-cta-group', { opacity: 0, y: 20 }, '-=0.5')
    .from('.stat-card', { opacity: 0, y: 20, stagger: 0.1 }, '-=0.4');

  // Pillars Stagger
  gsap.from('.pillar-card', {
    scrollTrigger: {
      trigger: '#diferenciais',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 35,
    stagger: 0.15,
    duration: 0.7,
    ease: 'power2.out'
  });

  // Services Stagger
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '#servicos',
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    stagger: 0.08,
    duration: 0.6,
    ease: 'power2.out'
  });

  // Packages Stagger
  gsap.from('.package-box', {
    scrollTrigger: {
      trigger: '.packages-container',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.7,
    ease: 'power2.out'
  });

  // Header background shade on scroll
  ScrollTrigger.create({
    start: 'top -50',
    end: 99999,
    toggleClass: {
      className: 'header-scrolled',
      targets: '#header'
    }
  });
}

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  updateStudioStatus();
  setupMobileMenu();
  setupComparisonSlider();
  setupSimulator();
  setupAnimations();

  // Refresh status every minute
  setInterval(updateStudioStatus, 60000);
});
