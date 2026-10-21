// Gera o HTML da página a partir de site.config.js. Roda no build/dev (ver vite.config.js).

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ICONS = {
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  check:  '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  clock:  '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  pin:    '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  star:   '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  bolt:   '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'
};
const PHONE_PATH = 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z';
const WA_PATH = 'M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29z';

const svg = (inner, size = 24, extra = 'stroke-width="1.5"') =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" ${extra} aria-hidden="true">${inner}</svg>`;

// Ids de âncora usados pelo CSS/JS.
const ANCHORS = { pillars: 'diferenciais', services: 'servicos', comparison: 'comparador', simulator: 'simulador', location: 'localizacao', gallery: 'galeria' };

export function googleFontsHref(fonts) {
  const fam = Object.values(fonts).map(f => {
    const w = [...f.weights].sort((a, b) => a - b);
    const name = f.family.trim().replace(/\s+/g, '+');
    // Com italic, o Google Fonts exige o eixo ital (0 = normal, 1 = itálico) ordenado.
    return f.italic
      ? `family=${name}:ital,wght@${[...w.map(x => `0,${x}`), ...w.map(x => `1,${x}`)].join(';')}`
      : `family=${name}:wght@${w.join(';')}`;
  });
  return `https://fonts.googleapis.com/css2?${fam.join('&')}&display=swap`;
}

// Escurece/clareia um hex misturando com preto/branco (para hover e tom escuro do accent).
function mix(hex, target, pct) {
  const n = parseInt(hex.replace('#', ''), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => Math.round(v + (target - v) * pct));
  return '#' + c.map(v => v.toString(16).padStart(2, '0')).join('');
}

export function themeCss(t) {
  const rgb = (hex) => { const n = parseInt(hex.replace('#', ''), 16); return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`; };
  return `:root{
  --color-canvas:${t.background};
  --color-surface-soft:${t.surface};
  --color-surface-card:${t.card};
  --color-surface-elevated:${mix(t.card, 255, 0.08)};
  --color-surface-hover:${mix(t.card, 255, 0.12)};
  --color-gold:${t.accent};
  --color-gold-hover:${mix(t.accent, 0, 0.12)};
  --color-gold-dark:${mix(t.accent, 0, 0.43)};
  --color-gold-tint:rgba(${rgb(t.accent)}, 0.12);
  --color-gold-glow:rgba(${rgb(t.accent)}, 0.5);
  --color-gold-glow-strong:rgba(${rgb(t.accent)}, 0.6);
  --color-gold-wash:rgba(${rgb(t.accent)}, 0.1);
  --color-hairline-gold:rgba(${rgb(t.accent)}, 0.35);
  --color-ink:${t.text};
  --color-text-secondary:${t.textMuted};
  --font-display:'${t.fonts.display.family}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-body:'${t.fonts.body.family}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
${t.fonts.display.italic ? '.hero-title,.section-title,.pillar-title,.service-card-title,.package-name,.packages-title,.stat-value{font-style:italic}\n:root .hero-title{font-size:clamp(52px,9vw,124px);line-height:.95}\n:root .section-title{font-size:clamp(36px,5vw,60px)}' : ''}`;
}

export function renderPage(c) {
  const wa = (text) => `https://wa.me/${c.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  const on = (k) => c.sections[k]?.enabled !== false;
  const brand = c.brand;
  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(c.location.mapsQuery)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(c.location.wazeQuery)}`;
  const igUrl = `https://www.instagram.com/${c.contact.instagram}/`;
  const ext = 'target="_blank" rel="noopener noreferrer"';

  const nav = c.navOrder.filter(on);
  const navDesktop = nav.map(k => `<a href="#${ANCHORS[k]}" class="nav-link">${esc(c.sections[k].navLabel)}</a>`).join('\n        ');
  const navMobile = nav.map(k => `<a href="#${ANCHORS[k]}" class="mobile-nav-link">${esc(c.sections[k].navLabel.toUpperCase())}</a>`).join('\n        ');

  const logo = brand.logoImage ? `<img class="logo-img" src="${esc(brand.logoImage)}" alt="" />` : `<span class="logo-mark" translate="no">${esc(brand.mark)}</span>
          <span class="logo-text" translate="no">${esc(brand.wordmark)}<span class="logo-dot">.</span></span>`;

  const statValue = (v) => esc(v).replace('★', '<span class="stat-star">★</span>');

  const pillars = !on('pillars') ? '' : `
    <section class="section-padding bg-black" id="diferenciais">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">${esc(c.pillars.eyebrow)}</span>
          <h2 class="section-title">${esc(c.pillars.title)}</h2>
          <p class="section-subtitle">${esc(c.pillars.subtitle)}</p>
        </div>
        <div class="pillars-grid">
          ${c.pillars.items.map((p, i) => `
          <div class="pillar-card">
            <div class="pillar-number">${String(i + 1).padStart(2, '0')}</div>
            <div class="pillar-icon">${svg(ICONS[p.icon] || ICONS.check)}</div>
            <h3 class="pillar-title">${esc(p.title)}</h3>
            <p class="pillar-text">${esc(p.text)}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>`;

  const packages = !c.services.packages?.enabled ? '' : `
        <div class="packages-container">
          <div class="packages-header">
            <span class="section-eyebrow">${esc(c.services.packages.eyebrow)}</span>
            <h3 class="packages-title">${esc(c.services.packages.title)}</h3>
          </div>
          <div class="packages-grid">
            ${c.services.packages.items.map(p => `
            <div class="package-box${p.highlight ? ' highlight' : ''}">
              <div class="package-badge${p.highlight ? ' gold' : ''}">${esc(p.badge)}</div>
              <h4 class="package-name">${esc(p.name)}</h4>
              <p class="package-summary">${esc(p.summary)}</p>
              <ul class="package-list">
                ${p.features.map(f => `<li>✓ ${esc(f)}</li>`).join('\n                ')}
              </ul>
              <a href="${wa(`Olá! Tenho interesse no ${p.name} da ${brand.name}.`)}" ${ext} class="btn-cta-gold btn-block">${esc(p.cta)}</a>
            </div>`).join('')}
          </div>
        </div>`;

  const G = c.gallery;
  const gallery = !G || !on('gallery') ? '' : `
    <section class="section-padding bg-black" id="galeria">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">${esc(G.eyebrow)}</span>
          <h2 class="section-title">${esc(G.title)}</h2>
          <p class="section-subtitle">${esc(G.subtitle)}</p>
        </div>
        <div class="gallery-grid">
          ${G.items.map(g => `
          <figure class="gallery-item">
            <img src="${esc(g.src)}" alt="${esc(g.alt)}" width="550" height="810" loading="lazy" />
            ${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ''}
          </figure>`).join('')}
        </div>
      </div>
    </section>`;

  const services = !on('services') ? '' : `
    <section class="section-padding bg-surface" id="servicos">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">${esc(c.services.eyebrow)}</span>
          <h2 class="section-title">${esc(c.services.title)}</h2>
          <p class="section-subtitle">${esc(c.services.subtitle)}</p>
        </div>
        <div class="services-grid">
          ${c.services.items.map(s => `
          <article class="service-card${s.featured ? ' featured' : ''}">
            ${s.featured && s.tag ? `<div class="service-card-tag">${esc(s.tag)}</div>` : ''}
            <h3 class="service-card-title">${esc(s.title)}</h3>
            <p class="service-card-desc">${esc(s.text)}</p>
            <ul class="service-features-list">
              ${s.features.map(f => `<li>${esc(f)}</li>`).join('\n              ')}
            </ul>
            <div class="service-card-footer">
              <a href="${wa(s.message || `Olá, gostaria de um orçamento de ${s.title} na ${brand.name}.`)}" ${ext} class="service-link">${esc(c.buttons.serviceLink)}</a>
            </div>
          </article>`).join('')}
        </div>
        ${packages}
      </div>
    </section>`;

  const cmp = c.comparison;
  const comparison = !on('comparison') ? '' : `
    <section class="section-padding bg-black" id="comparador">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">${esc(cmp.eyebrow)}</span>
          <h2 class="section-title">${esc(cmp.title)}</h2>
          <p class="section-subtitle">${esc(cmp.subtitle)}</p>
        </div>
        <div class="comparison-card">
          <div class="comparison-slider" id="comparison-slider" role="region" aria-label="Comparador visual de antes e depois">
            <div class="comparison-after">
              <img src="${esc(cmp.afterImage)}" alt="${esc(cmp.afterAlt)}" class="comparison-img" />
              <div class="comparison-tag tag-after">${esc(cmp.afterTag)}</div>
            </div>
            <div class="comparison-before" id="comparison-before">
              <div class="before-simulated-layer">
                <img src="${esc(cmp.beforeImage || cmp.afterImage)}" alt="${esc(cmp.beforeAlt)}" class="comparison-img${cmp.beforeImage ? '' : ' before-filtered'}" />
                ${cmp.beforeImage ? '' : '<div class="swirls-overlay"></div>'}
              </div>
              <div class="comparison-tag tag-before">${esc(cmp.beforeTag)}</div>
            </div>
            <div class="comparison-handle" id="comparison-handle" tabindex="0" role="slider" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" aria-label="Controle de visualização do Antes e Depois">
              <div class="handle-line"></div>
              <div class="handle-button">
                ${svg('<polyline points="15 18 9 12 15 6"/><polyline points="9 18 3 12 9 6"/>', 20, 'stroke-width="2.5"')}
                ${svg('<polyline points="9 18 15 12 9 6"/><polyline points="15 18 21 12 15 6"/>', 20, 'stroke-width="2.5"')}
              </div>
              <div class="handle-line"></div>
            </div>
          </div>
          <div class="comparison-hint"><span>${esc(cmp.hint)}</span></div>
        </div>
      </div>
    </section>`;

  const sim = c.simulator;
  const simulator = !on('simulator') ? '' : `
    <section class="section-padding bg-surface" id="simulador">
      <div class="container">
        <div class="simulator-wrapper">
          <div class="simulator-intro">
            <span class="section-eyebrow">${esc(sim.eyebrow)}</span>
            <h2 class="section-title">${esc(sim.title)}</h2>
            <p class="section-subtitle">${esc(sim.subtitle)}</p>
            <div class="trust-points">
              ${sim.trustPoints.map(t => `<div class="trust-item"><span class="trust-icon">✓</span><span>${esc(t)}</span></div>`).join('\n              ')}
            </div>
          </div>
          <div class="simulator-card">
            <form id="project-simulator-form" onsubmit="event.preventDefault();">
              <div class="form-step">
                <span class="form-label" id="vehicle-label">${esc(sim.vehicleLabel)}</span>
                <div class="vehicle-options-grid" id="vehicle-type-options" role="radiogroup" aria-labelledby="vehicle-label">
                  ${sim.vehicles.map((v, i) => `
                  <button type="button" class="vehicle-option${i === 0 ? ' active' : ''}" data-vehicle="${esc(v.value)}" role="radio" aria-checked="${i === 0}">
                    <span class="vehicle-name">${esc(v.name)}</span>
                    <span class="vehicle-desc">${esc(v.desc)}</span>
                  </button>`).join('')}
                </div>
              </div>
              <div class="form-step">
                <span class="form-label">${esc(sim.proceduresLabel)}</span>
                <div class="services-checkbox-grid">
                  ${sim.procedures.map(p => `
                  <label class="checkbox-pill">
                    <input type="checkbox" name="services" value="${esc(p.value)}"${p.checked ? ' checked' : ''} />
                    <span class="checkbox-box"></span>
                    <span class="checkbox-text">${esc(p.label)}</span>
                  </label>`).join('')}
                </div>
              </div>
              <div class="simulator-action-box">
                <div class="simulator-summary">
                  <span class="summary-label">${esc(sim.summaryLabel)}</span>
                  <div class="summary-text" id="simulator-summary-text" aria-live="polite"></div>
                </div>
                <button type="button" id="btn-send-whatsapp" class="btn-cta-gold btn-block">${esc(sim.sendLabel)}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>`;

  const L = c.location;
  const location = !on('location') ? '' : `
    <section class="section-padding bg-black" id="localizacao">
      <div class="container">
        <div class="location-grid">
          <div class="location-info">
            <span class="section-eyebrow">${esc(L.eyebrow)}</span>
            <h2 class="section-title">${esc(L.title)}</h2>
            <p class="section-text">${esc(L.text)}</p>

            <div class="info-block">
              <div class="info-icon">${svg(ICONS.pin, 22)}</div>
              <div class="info-content">
                <span class="info-title">ENDEREÇO</span>
                <p class="info-value">${esc(L.street)}<br />${esc(L.city)}</p>
                <div class="map-links">
                  <a href="${mapsUrl}" ${ext} class="link-route">Abrir no Google Maps ↗</a>
                  <a href="${wazeUrl}" ${ext} class="link-route">Abrir no Waze ↗</a>
                </div>
              </div>
            </div>

            <div class="info-block">
              <div class="info-icon">${svg(ICONS.clock, 22)}</div>
              <div class="info-content">
                <span class="info-title">HORÁRIOS DE ATENDIMENTO</span>
                <div class="schedule-table">
                  ${c.hours.map(h => `
                  <div class="schedule-row${h.open == null ? ' closed' : ''}" data-day="${h.day}">
                    <span class="day-name">${esc(h.name)}</span>
                    <span class="day-hours">${h.open == null ? 'Fechado' : `${fmt(h.open)} – ${fmt(h.close)}`}</span>
                  </div>`).join('')}
                </div>
              </div>
            </div>

            <div class="info-block">
              <div class="info-icon">${svg(`<path d="${PHONE_PATH}"/>`, 22)}</div>
              <div class="info-content">
                <span class="info-title">CONTATO DIRETO</span>
                <p class="info-value">
                  Telefone &amp; WhatsApp: <strong>${esc(c.contact.phoneLabel)}</strong><br />
                  Instagram: <a href="${igUrl}" ${ext} class="link-gold">@${esc(c.contact.instagram)}</a>
                </p>
              </div>
            </div>
          </div>

          <div class="location-map-card">
            <div class="map-card-inner">
              <div class="map-badge"><span class="map-badge-dot"></span><span>ESTÚDIO ${esc(brand.name)}</span></div>
              <div class="map-preview">
                ${L.googleMapsApiKey ? `<iframe class="map-embed${L.mapDark ? ' dark' : ''}" title="Mapa: ${esc(L.street)}" src="https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(L.googleMapsApiKey)}&amp;q=${encodeURIComponent(L.mapsQuery)}&amp;zoom=${Number(L.mapZoom) || 16}&amp;language=pt-BR&amp;region=BR" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>` : `
                <div class="map-grid-lines"></div>
                <div class="map-pin-pulse"><div class="pin-ring"></div><div class="pin-center">${esc(brand.mark)}</div></div>
                <div class="map-overlay-content">
                  <div class="map-label-address">${esc(L.cardShortAddress)}</div>
                  <div class="map-label-city">${esc(L.cardNeighborhood)}</div>
                  <div class="map-rating"><span class="stars">★★★★★</span> ${esc(L.rating)}</div>
                </div>`}
              </div>
              <div class="map-card-actions">
                <a href="${mapsUrl}" ${ext} class="btn-cta-gold btn-block">${esc(c.buttons.mapRoute)}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;

  const H = c.hero;
  const data = JSON.stringify({
    brand: brand.name, whatsapp: c.contact.whatsapp, hours: c.hours, message: sim.message,
    noProcedures: 'Nenhum procedimento selecionado ainda.'
  }).replace(/</g, '\\u003c');

  return `
  <a href="#conteudo-principal" class="skip-link">Pular para o conteúdo principal</a>

  <header class="site-header" id="header">
    <div class="header-container">
      <a href="#" class="brand-logo" aria-label="${esc(brand.name)}">
          ${logo}
      </a>
      <nav class="desktop-nav" aria-label="Navegação principal">
        ${navDesktop}
      </nav>
      <div class="header-actions">
        <div class="status-indicator" id="studio-status" title="Status de atendimento em tempo real">
          <span class="status-dot"></span>
          <span class="status-text" id="status-label">Verificando...</span>
        </div>
        <a href="${wa(c.contact.defaultMessage)}" ${ext} class="btn-cta-gold btn-header" aria-label="Falar no WhatsApp com ${esc(brand.name)}"><span>${esc(c.buttons.headerCta)}</span></a>
        <button type="button" class="mobile-toggle" id="mobile-toggle" aria-expanded="false" aria-controls="mobile-drawer" aria-label="Abrir menu de navegação">
          <span class="hamburger-bar"></span><span class="hamburger-bar"></span><span class="hamburger-bar"></span>
        </button>
      </div>
    </div>
    <div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
      <nav class="mobile-nav" aria-label="Navegação móvel">
        ${navMobile}
      </nav>
      <div class="mobile-drawer-footer">
        <a href="${wa(c.contact.defaultMessage)}" ${ext} class="btn-cta-gold btn-block">${esc(c.buttons.drawerCta)}</a>
      </div>
    </div>
  </header>

  <main id="conteudo-principal">
    <section class="hero-section" id="hero">
      <div class="hero-bg-container">
        <img src="${esc(H.image)}" alt="${esc(H.imageAlt)}" class="hero-bg-img" fetchpriority="high" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content-wrapper">
        <div class="hero-badge-tag">
          <span class="badge-accent">${esc(H.badgeAccent)}</span>
          <span class="badge-separator">/</span>
          <span class="badge-text">${esc(H.badgeText)}</span>
        </div>
        <h1 class="hero-title">${esc(H.title)}</h1>
        <p class="hero-description">${esc(H.description)}</p>
        <div class="hero-cta-group">
          <a href="${wa(H.primaryCta.message)}" ${ext} class="btn-cta-gold">${esc(H.primaryCta.label)}</a>
          <a href="${esc(H.secondaryCta.href)}" class="btn-ghost">${esc(H.secondaryCta.label)}</a>
        </div>
        <div class="hero-stats-grid">
          ${H.stats.map(s => `
          <div class="stat-card">
            <div class="stat-value">${statValue(s.value)}</div>
            <div class="stat-label">${esc(s.label)}</div>
          </div>`).join('')}
        </div>
      </div>
    </section>
    ${pillars}
    ${services}
    ${gallery}
    ${comparison}
    ${simulator}
    ${location}
  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="brand-logo">${logo}</div>
          <p class="footer-tagline">${esc(brand.tagline)}</p>
        </div>
        <div class="footer-links-group">
          <span class="footer-group-title">SERVIÇOS</span>
          ${c.footer.serviceLinks.map(l => `<a href="#servicos" class="footer-link">${esc(l)}</a>`).join('\n          ')}
        </div>
        <div class="footer-links-group">
          <span class="footer-group-title">PACOTES</span>
          ${(c.services.packages?.items || []).map(p => `<a href="#servicos" class="footer-link">${esc(p.name)}</a>`).join('\n          ')}
          ${on('comparison') ? '<a href="#comparador" class="footer-link">Antes &amp; Depois</a>' : ''}
          ${on('simulator') ? '<a href="#simulador" class="footer-link">Simular Projeto</a>' : ''}
        </div>
        <div class="footer-links-group">
          <span class="footer-group-title">CONTATO</span>
          <a href="https://wa.me/${c.contact.whatsapp}" ${ext} class="footer-link">${esc(c.contact.phoneLabel)}</a>
          <a href="${igUrl}" ${ext} class="footer-link">@${esc(c.contact.instagram)}</a>
          <span class="footer-text-muted">${esc(c.footer.shortAddress)}</span>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">${esc(brand.copyright)}</div>
        <div class="footer-badges"><span class="footer-badge">${esc(brand.footerBadge)}</span></div>
      </div>
    </div>
  </footer>

  <aside class="floating-whatsapp" aria-label="Contato direto via WhatsApp">
    <a href="${wa(c.contact.defaultMessage)}" ${ext} class="floating-whatsapp-btn" aria-label="Iniciar conversa no WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${WA_PATH}"/></svg>
      <span class="floating-tooltip">${esc(c.contact.floatingLabel)}</span>
    </a>
  </aside>

  <script type="application/json" id="site-data">${data}</script>`;
}

function fmt(h) {
  const hh = Math.floor(h), mm = Math.round((h - hh) * 60);
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}
