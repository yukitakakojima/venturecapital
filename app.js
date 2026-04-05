'use strict';

// ===== Password Gate =====
// Change this to your own password:
const PASSWORD = 'yuki2026';

function checkPassword(e) {
  e.preventDefault();
  const input = document.getElementById('gate-input').value;
  const errEl = document.getElementById('gate-error');
  if (input === PASSWORD) {
    sessionStorage.setItem('vc-auth', '1');
    document.getElementById('password-gate').classList.add('hidden');
    errEl.classList.remove('visible');
  } else {
    errEl.classList.add('visible');
    document.getElementById('gate-input').value = '';
    document.getElementById('gate-input').focus();
  }
}

// Skip gate if already authenticated this session
if (sessionStorage.getItem('vc-auth') === '1') {
  document.getElementById('password-gate').classList.add('hidden');
}

// ===== Default portfolio data (7 companies) =====
const DEFAULT_COMPANIES = [
  {
    id: 1,
    name: 'TechFlow AI',
    sector: 'AI / SaaS',
    stage: 'Series A',
    status: 'Active',
    date: '2022-03-15',
    invested: 2500000,
    value: 9800000,
    ownership: 14.5,
    notes: 'Leading AI workflow automation platform. ARR growing 3× YoY.',
    events: [
      { date: '2022-03-15', label: 'Series A closed' },
      { date: '2022-10-01', label: 'Hit $1M ARR' },
      { date: '2023-07-14', label: 'Launched v2.0' },
    ],
    investors: [
      { name: 'Sequoia', logo: 'https://www.google.com/s2/favicons?domain=sequoiacap.com&sz=64' },
      { name: 'a16z', logo: 'https://www.google.com/s2/favicons?domain=a16z.com&sz=64' },
    ],
    customers: [
      { name: 'Salesforce', logo: 'https://www.google.com/s2/favicons?domain=salesforce.com&sz=64' },
      { name: 'HubSpot', logo: 'https://www.google.com/s2/favicons?domain=hubspot.com&sz=64' },
    ],
  },
  {
    id: 2,
    name: 'GreenPath Energy',
    sector: 'CleanTech',
    stage: 'Seed',
    status: 'Active',
    date: '2023-01-10',
    invested: 750000,
    value: 1800000,
    ownership: 18.0,
    notes: 'Modular solar + battery units for emerging markets.',
    events: [
      { date: '2023-01-10', label: 'Seed closed' },
      { date: '2023-09-05', label: 'First pilot deployment' },
    ],
    investors: [
      { name: 'Breakthrough Energy', logo: 'https://www.google.com/s2/favicons?domain=breakthroughenergy.org&sz=64' },
    ],
    customers: [
      { name: 'Kenya Power', logo: '' },
      { name: 'SolarCity', logo: 'https://www.google.com/s2/favicons?domain=solarcity.com&sz=64' },
    ],
  },
  {
    id: 3,
    name: 'HealthSync',
    sector: 'HealthTech',
    stage: 'Series B',
    status: 'Active',
    date: '2021-07-22',
    invested: 5000000,
    value: 22000000,
    ownership: 9.2,
    notes: 'Remote patient monitoring. FDA cleared, 200+ hospital partnerships.',
    events: [
      { date: '2021-07-22', label: 'Initial investment' },
      { date: '2022-03-18', label: 'FDA clearance' },
      { date: '2023-01-10', label: '100th hospital partner' },
      { date: '2024-02-01', label: 'Series B closed' },
    ],
    investors: [
      { name: 'GV', logo: 'https://www.google.com/s2/favicons?domain=gv.com&sz=64' },
      { name: 'Andreessen Horowitz', logo: 'https://www.google.com/s2/favicons?domain=a16z.com&sz=64' },
    ],
    customers: [
      { name: 'Mayo Clinic', logo: 'https://www.google.com/s2/favicons?domain=mayoclinic.org&sz=64' },
      { name: 'Kaiser', logo: 'https://www.google.com/s2/favicons?domain=kaiserpermanente.org&sz=64' },
      { name: 'CVS', logo: 'https://www.google.com/s2/favicons?domain=cvshealth.com&sz=64' },
    ],
  },
  {
    id: 4,
    name: 'DataVault',
    sector: 'Cybersecurity',
    stage: 'Series A',
    status: 'Watchlist',
    date: '2022-09-05',
    invested: 3000000,
    value: 2800000,
    ownership: 11.0,
    notes: 'Zero-trust data security. Sales cycle longer than projected.',
    events: [
      { date: '2022-09-05', label: 'Series A closed' },
      { date: '2023-04-20', label: 'New CRO hired' },
    ],
    investors: [
      { name: 'Accel', logo: 'https://www.google.com/s2/favicons?domain=accel.com&sz=64' },
    ],
    customers: [
      { name: 'JPMorgan', logo: 'https://www.google.com/s2/favicons?domain=jpmorganchase.com&sz=64' },
      { name: 'Stripe', logo: 'https://www.google.com/s2/favicons?domain=stripe.com&sz=64' },
    ],
  },
  {
    id: 5,
    name: 'SpaceLogix',
    sector: 'DeepTech / Logistics',
    stage: 'Seed',
    status: 'Active',
    date: '2023-06-18',
    invested: 500000,
    value: 1400000,
    ownership: 22.5,
    notes: 'Satellite-powered supply chain visibility for remote regions.',
    events: [
      { date: '2023-06-18', label: 'Seed closed' },
      { date: '2024-01-09', label: 'First enterprise contract' },
    ],
    investors: [
      { name: 'Lux Capital', logo: 'https://www.google.com/s2/favicons?domain=luxcapital.com&sz=64' },
    ],
    customers: [
      { name: 'DHL', logo: 'https://www.google.com/s2/favicons?domain=dhl.com&sz=64' },
      { name: 'Maersk', logo: 'https://www.google.com/s2/favicons?domain=maersk.com&sz=64' },
    ],
  },
  {
    id: 6,
    name: 'NeuralWave',
    sector: 'Biotech',
    stage: 'Series A',
    status: 'Active',
    date: '2022-11-30',
    invested: 4000000,
    value: 7500000,
    ownership: 8.5,
    notes: 'Non-invasive BCI for neurological rehabilitation. Phase II trials ongoing.',
    events: [
      { date: '2022-11-30', label: 'Series A closed' },
      { date: '2023-08-15', label: 'Phase II trials started' },
      { date: '2024-06-01', label: 'Positive interim data' },
    ],
    investors: [
      { name: 'ARCH Venture', logo: 'https://www.google.com/s2/favicons?domain=archventure.com&sz=64' },
      { name: 'Pfizer Ventures', logo: 'https://www.google.com/s2/favicons?domain=pfizer.com&sz=64' },
    ],
    customers: [
      { name: 'Johns Hopkins', logo: 'https://www.google.com/s2/favicons?domain=hopkinsmedicine.org&sz=64' },
    ],
  },
  {
    id: 7,
    name: 'CryptoShield',
    sector: 'Web3 / Security',
    stage: 'Seed',
    status: 'Exited',
    date: '2021-04-12',
    invested: 400000,
    value: 3200000,
    ownership: 0,
    notes: 'Successfully exited via acquisition by Coinbase in Q3 2024. 8× return.',
    events: [
      { date: '2021-04-12', label: 'Seed closed' },
      { date: '2022-11-01', label: 'Series A (follow-on)' },
      { date: '2024-08-20', label: 'Acquired by Coinbase' },
    ],
    investors: [
      { name: 'Coinbase Ventures', logo: 'https://www.google.com/s2/favicons?domain=coinbase.com&sz=64' },
      { name: 'Paradigm', logo: 'https://www.google.com/s2/favicons?domain=paradigm.xyz&sz=64' },
    ],
    customers: [
      { name: 'Binance', logo: 'https://www.google.com/s2/favicons?domain=binance.com&sz=64' },
      { name: 'Kraken', logo: 'https://www.google.com/s2/favicons?domain=kraken.com&sz=64' },
    ],
  },
];

// Palette for company logos
const LOGO_COLORS = [
  '#6c63ff', '#4ecdc4', '#f59e0b', '#22c55e',
  '#ef4444', '#3b82f6', '#ec4899', '#8b5cf6',
];

// ===== State =====
let companies = loadData();
let activeFilter = 'all';
let allocationChart = null;
let performanceChart = null;
let editingId = null;

function loadData() {
  try {
    const saved = localStorage.getItem('vc-portfolio');
    return saved ? JSON.parse(saved) : DEFAULT_COMPANIES;
  } catch {
    return DEFAULT_COMPANIES;
  }
}

function saveData() {
  localStorage.setItem('vc-portfolio', JSON.stringify(companies));
}

// ===== Formatting helpers =====
function fmtMoney(n) {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
  if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
  if (n >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K';
  return '$' + n.toLocaleString();
}

function fmtMoic(moic) {
  return moic.toFixed(2) + '×';
}

function fmtPct(n) {
  const sign = n >= 0 ? '+' : '';
  return sign + n.toFixed(1) + '%';
}

function fmtDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function logoColor(id) {
  return LOGO_COLORS[(id - 1) % LOGO_COLORS.length];
}

function statusClass(status) {
  return 'badge-status--' + status.toLowerCase().replace(' ', '-');
}

// ===== Summary stats =====
function updateSummary() {
  const totalInvested = companies.reduce((s, c) => s + c.invested, 0);
  const totalValue    = companies.reduce((s, c) => s + c.value, 0);
  const gain          = totalValue - totalInvested;
  const moic          = totalInvested > 0 ? totalValue / totalInvested : 0;
  const gainPct       = totalInvested > 0 ? (gain / totalInvested) * 100 : 0;

  document.getElementById('total-invested').textContent = fmtMoney(totalInvested);
  document.getElementById('num-companies').textContent  = companies.length + ' compan' + (companies.length === 1 ? 'y' : 'ies');
  document.getElementById('portfolio-value').textContent = fmtMoney(totalValue);
  document.getElementById('total-moic').textContent     = fmtMoic(moic);
  document.getElementById('unrealized-gain').textContent = fmtMoney(gain);

  const changeEl = document.getElementById('value-change');
  const gainEl   = document.getElementById('gain-pct');
  const color    = gain >= 0 ? '#22c55e' : '#ef4444';
  changeEl.style.color = color;
  gainEl.style.color   = color;
  changeEl.textContent = fmtPct(gainPct) + ' vs. cost';
  gainEl.textContent   = (gain >= 0 ? '▲ ' : '▼ ') + fmtMoney(Math.abs(gain));
}

// ===== Charts =====
const CHART_COLORS = [
  '#6c63ff','#4ecdc4','#f59e0b','#22c55e','#ef4444','#3b82f6','#ec4899',
  '#8b5cf6','#14b8a6','#f97316',
];

function updateCharts() {
  // Allocation (donut) — by current value
  const allocCtx = document.getElementById('allocationChart').getContext('2d');
  if (allocationChart) allocationChart.destroy();

  allocationChart = new Chart(allocCtx, {
    type: 'doughnut',
    data: {
      labels: companies.map(c => c.name),
      datasets: [{
        data: companies.map(c => c.value),
        backgroundColor: companies.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        borderColor: '#141720',
        borderWidth: 2,
        hoverBorderWidth: 3,
      }],
    },
    options: {
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ' ' + ctx.label + ': ' + fmtMoney(ctx.raw),
          },
        },
      },
    },
  });

  // Performance (grouped bar) — invested vs value
  const perfCtx = document.getElementById('performanceChart').getContext('2d');
  if (performanceChart) performanceChart.destroy();

  performanceChart = new Chart(perfCtx, {
    type: 'bar',
    data: {
      labels: companies.map(c => c.name),
      datasets: [
        {
          label: 'Invested',
          data: companies.map(c => c.invested),
          backgroundColor: 'rgba(108,99,255,0.55)',
          borderColor: 'rgba(108,99,255,0.9)',
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          label: 'Current Value',
          data: companies.map(c => c.value),
          backgroundColor: 'rgba(78,205,196,0.55)',
          borderColor: 'rgba(78,205,196,0.9)',
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#8b90a7', font: { size: 11 } },
        },
        tooltip: {
          callbacks: { label: ctx => ' ' + ctx.dataset.label + ': ' + fmtMoney(ctx.raw) },
        },
      },
      scales: {
        x: {
          ticks: { color: '#5a6080', font: { size: 10 } },
          grid:  { color: '#2a2f42' },
        },
        y: {
          ticks: {
            color: '#5a6080',
            font: { size: 10 },
            callback: v => fmtMoney(v),
          },
          grid: { color: '#2a2f42' },
        },
      },
    },
  });
}

// ===== Company Cards =====
function renderCards() {
  const grid = document.getElementById('companies-grid');
  const template = document.getElementById('company-card-template');
  grid.innerHTML = '';

  const visible = activeFilter === 'all'
    ? companies
    : companies.filter(c => c.stage === activeFilter);

  const maxMoic = Math.max(...companies.map(c => c.value / c.invested), 1);

  visible.forEach(company => {
    const clone = template.content.cloneNode(true);
    const card  = clone.querySelector('.company-card');
    const moic  = company.invested > 0 ? company.value / company.invested : 0;

    card.dataset.id = company.id;

    // Logo
    const logo = clone.querySelector('.company-logo');
    logo.textContent = initials(company.name);
    logo.style.background = logoColor(company.id);

    clone.querySelector('.company-name').textContent   = company.name;
    clone.querySelector('.company-sector').textContent = company.sector;
    clone.querySelector('.badge-stage').textContent    = company.stage;

    const statusBadge = clone.querySelector('.badge-status');
    statusBadge.textContent = company.status;
    statusBadge.classList.add(statusClass(company.status));

    clone.querySelector('.invested-val').textContent  = fmtMoney(company.invested);
    clone.querySelector('.current-val').textContent   = fmtMoney(company.value);
    clone.querySelector('.ownership-val').textContent = company.ownership > 0 ? company.ownership.toFixed(1) + '%' : '—';
    clone.querySelector('.invest-date').textContent   = 'Invested ' + fmtDate(company.date);

    const moicEl = clone.querySelector('.moic-val');
    moicEl.textContent = fmtMoic(moic);
    if (moic >= 2)      moicEl.classList.add('moic-positive');
    else if (moic >= 1) moicEl.classList.add('moic-neutral');
    else                moicEl.classList.add('moic-negative');

    // Logo chips
    renderLogoChips(clone.querySelector('.investor-chips'), company.investors || []);
    renderLogoChips(clone.querySelector('.customer-chips'), company.customers || []);

    // Timeline event dots
    const today     = Date.now();
    const startTime = new Date(company.date + 'T00:00:00').getTime();
    const span      = today - startTime;
    const dotsEl    = clone.querySelector('.timeline-dots');

    (company.events || []).forEach(ev => {
      const evTime = new Date(ev.date + 'T00:00:00').getTime();
      const pct    = Math.min(Math.max(((evTime - startTime) / span) * 100, 0), 100);
      const dot    = document.createElement('div');
      dot.className = 'event-dot';
      dot.style.left = pct + '%';
      dot.innerHTML  = `<div class="event-tooltip"><div class="tooltip-label">${ev.label}</div><div class="tooltip-date">${fmtDate(ev.date)}</div></div>`;
      dotsEl.appendChild(dot);
    });

    grid.appendChild(clone);
  });
}

// ===== Filters =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderCards();
  });
});

// ===== Logo chip rendering =====
function renderLogoChips(container, items) {
  container.innerHTML = '';
  if (!items.length) {
    container.innerHTML = '<span style="font-size:0.68rem;color:var(--text3)">—</span>';
    return;
  }
  items.forEach(item => {
    const chip = document.createElement('div');
    chip.className = 'logo-chip';
    if (item.logo) {
      const img = document.createElement('img');
      img.src = item.logo;
      img.alt = item.name;
      img.onerror = () => { img.style.display = 'none'; chip.textContent = initials(item.name); };
      chip.appendChild(img);
    } else {
      chip.textContent = initials(item.name);
    }
    const tip = document.createElement('div');
    tip.className = 'logo-tooltip';
    tip.textContent = item.name;
    chip.appendChild(tip);
    container.appendChild(chip);
  });
}

// ===== Events modal helpers =====
function clearEventsList() {
  document.getElementById('events-list').innerHTML = '';
}

function addEventRow(date = '', label = '') {
  const row = document.createElement('div');
  row.className = 'event-row';
  row.innerHTML = `
    <input type="date" class="ev-date" value="${date}" />
    <input type="text" class="ev-label" placeholder="e.g. Series A closed" value="${label}" />
    <button type="button" class="btn-remove-event" onclick="this.closest('.event-row').remove()">✕</button>
  `;
  document.getElementById('events-list').appendChild(row);
  row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function addLogoRow(listId, name, logo) {
  name = name || '';
  logo = logo || '';
  const list = document.getElementById(listId);
  if (!list) return;

  const inputStyle = 'flex:1;min-width:0;background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--text);padding:7px 10px;font-size:13px;font-family:inherit;outline:none;';
  const row = document.createElement('div');
  row.className = 'logo-row';
  row.style.cssText = 'display:flex;gap:6px;margin-bottom:8px;align-items:center;';

  const nameIn = document.createElement('input');
  nameIn.type = 'text';
  nameIn.className = 'lr-name';
  nameIn.placeholder = 'Name';
  nameIn.value = name;
  nameIn.style.cssText = inputStyle;

  const logoIn = document.createElement('input');
  logoIn.type = 'text';
  logoIn.className = 'lr-logo';
  logoIn.placeholder = 'google.com/s2/favicons?domain=stripe.com&sz=64';
  logoIn.value = logo;
  logoIn.style.cssText = inputStyle + 'flex:1.6;';

  const del = document.createElement('button');
  del.type = 'button';
  del.textContent = '✕';
  del.style.cssText = 'flex-shrink:0;width:28px;height:28px;background:none;border:1px solid var(--border);border-radius:6px;color:var(--text3);cursor:pointer;font-size:12px;';
  del.onclick = () => row.remove();

  row.appendChild(nameIn);
  row.appendChild(logoIn);
  row.appendChild(del);
  list.appendChild(row);
  nameIn.focus();
}

function collectLogos(listId) {
  return Array.from(document.querySelectorAll(`#${listId} .logo-row`))
    .map(row => ({
      name: row.querySelector('.lr-name').value.trim(),
      logo: row.querySelector('.lr-logo').value.trim(),
    }))
    .filter(item => item.name);
}

function collectEvents() {
  return Array.from(document.querySelectorAll('.event-row'))
    .map(row => ({
      date:  row.querySelector('.ev-date').value,
      label: row.querySelector('.ev-label').value.trim(),
    }))
    .filter(ev => ev.date && ev.label);
}

// ===== Modal =====
function openAddModal() {
  editingId = null;
  document.getElementById('modal-title').textContent = 'Add Company';
  document.getElementById('company-form').reset();
  document.getElementById('edit-id').value = '';
  document.getElementById('delete-btn').style.display = 'none';
  document.getElementById('f-date').value = new Date().toISOString().split('T')[0];
  clearEventsList();
  document.getElementById('investors-list').innerHTML = '';
  document.getElementById('customers-list').innerHTML = '';
  document.getElementById('modal-overlay').classList.add('open');
}

function openEditModal(btn) {
  const card = btn.closest('.company-card');
  const id   = parseInt(card.dataset.id);
  const co   = companies.find(c => c.id === id);
  if (!co) return;

  editingId = id;
  document.getElementById('modal-title').textContent = 'Edit Company';
  document.getElementById('edit-id').value   = id;
  document.getElementById('f-name').value    = co.name;
  document.getElementById('f-sector').value  = co.sector;
  document.getElementById('f-stage').value   = co.stage;
  document.getElementById('f-status').value  = co.status;
  document.getElementById('f-date').value    = co.date;
  document.getElementById('f-invested').value = co.invested;
  document.getElementById('f-value').value   = co.value;
  document.getElementById('f-ownership').value = co.ownership;
  document.getElementById('f-notes').value   = co.notes || '';
  clearEventsList();
  (co.events || []).forEach(ev => addEventRow(ev.date, ev.label));
  document.getElementById('investors-list').innerHTML = '';
  document.getElementById('customers-list').innerHTML = '';
  (co.investors || []).forEach(i => addLogoRow('investors-list', i.name, i.logo));
  (co.customers || []).forEach(c => addLogoRow('customers-list', c.name, c.logo));
  document.getElementById('delete-btn').style.display = 'block';
  document.getElementById('modal-overlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

function saveCompany(e) {
  e.preventDefault();
  const co = {
    name:      document.getElementById('f-name').value.trim(),
    sector:    document.getElementById('f-sector').value.trim(),
    stage:     document.getElementById('f-stage').value,
    status:    document.getElementById('f-status').value,
    date:      document.getElementById('f-date').value,
    invested:  parseFloat(document.getElementById('f-invested').value) || 0,
    value:     parseFloat(document.getElementById('f-value').value) || 0,
    ownership: parseFloat(document.getElementById('f-ownership').value) || 0,
    notes:     document.getElementById('f-notes').value.trim(),
    events:    collectEvents(),
    investors: collectLogos('investors-list'),
    customers: collectLogos('customers-list'),
  };

  if (editingId !== null) {
    const idx = companies.findIndex(c => c.id === editingId);
    if (idx !== -1) companies[idx] = { ...companies[idx], ...co };
  } else {
    const maxId = companies.reduce((m, c) => Math.max(m, c.id), 0);
    companies.push({ id: maxId + 1, ...co });
  }

  saveData();
  closeModal();
  refresh();
}

function deleteCompany() {
  if (editingId === null) return;
  if (!confirm('Remove this company from your portfolio?')) return;
  companies = companies.filter(c => c.id !== editingId);
  saveData();
  closeModal();
  refresh();
}

// ===== Full refresh =====
function refresh() {
  updateSummary();
  renderCards();
  updateCharts();
  document.getElementById('last-updated').textContent =
    'Updated ' + new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

// ===== Keyboard shortcut =====
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openAddModal(); }
});

// ===== Init =====
refresh();
