'use strict';

// ===== Password Gate =====
// Change this to your own password:
const PASSWORD = 'ventures2024';

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

    // MOIC bar: scale relative to best performer, max 100%
    const barPct = Math.min((moic / maxMoic) * 100, 100);
    clone.querySelector('.moic-bar').style.width = barPct + '%';

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

// ===== Modal =====
function openAddModal() {
  editingId = null;
  document.getElementById('modal-title').textContent = 'Add Company';
  document.getElementById('company-form').reset();
  document.getElementById('edit-id').value = '';
  document.getElementById('delete-btn').style.display = 'none';
  document.getElementById('f-date').value = new Date().toISOString().split('T')[0];
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
