// Expanded engineering case data
const projectCases = {
  uav: {
    title: 'UAV — Mechanical Packaging',
    body: 'Designed 3D structural assemblies and sheet-metal enclosures for defense-grade UAV systems at IG Defence. Applied strict DFM/GD&T principles to optimize manufacturing tolerances, leading to ready-to-produce 2D drawings and BOM documentation.',
    tags: ['DESIGN', 'ASSEMBLY', 'DFM', 'GD&T']
  },
  sae: {
    title: 'SAE DDC 2025 — Fixed-Wing UAV',
    body: 'Led CAD modeling and rapid prototyping for Team Aerotech using SolidWorks. Conducted FEA structural verification under maximum payload conditions. Captured All India Rank 1 (AIR 1) for Best Design Report.',
    tags: ['CAD', 'ASSEMBLY', 'FEA', 'PROTOTYPING']
  },
  mold: {
    title: 'Plastic Injection Hand Mold',
    body: 'Executed mold design and toolpath simulation in Creo at CTTC Bhubaneswar. Developed DFMEA risk charts and manufacturing process plans for precision injection components.',
    tags: ['CREO', 'DFMEA', 'CNC', 'MANUFACTURING']
  },
  drdo: {
    title: 'DRDO — Supersonic Pressure Analysis',
    body: 'Modeled supersonic wave geometry and high-displacement shockwave pressure profiles during a research internship at DRDO, Chandipur.',
    tags: ['CFD', 'PRESSURE', 'CAD', 'VALIDATION']
  },
  nalco: {
    title: 'NALCO — Industrial Plant Machinery',
    body: 'Analyzed heavy industrial layouts and plant machinery efficiency at Angul using Six Sigma methodology to streamline operational workflows.',
    tags: ['INDUSTRIAL', 'SIX SIGMA', 'LAYOUTS']
  }
};

// Modal Interaction Logic
const modal = document.querySelector('#project-modal');
const modalBody = document.querySelector('#modal-body');

function openCase(key) {
  const item = projectCases[key];
  if (!item || !modal || !modalBody) return;

  modalBody.innerHTML = `
    <button class="modal-close" type="button" aria-label="Close" data-close-modal>×</button>
    <div style="color:var(--gold); font-size:10px; font-weight:800; letter-spacing:1px; margin-bottom:8px;">ENGINEERING CASE STUDY</div>
    <h2 id="modal-title" style="margin-bottom:12px; font-size:20px;">${item.title}</h2>
    <p style="color:var(--text-muted); font-size:13px; line-height:1.6; margin-bottom:20px;">${item.body}</p>
    <div class="tags">${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeBtn = modal.querySelector('[data-close-modal]');
  if (closeBtn) closeBtn.focus();
}

function closeCase() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-project]').forEach(btn => {
  btn.addEventListener('click', () => openCase(btn.dataset.project));
});

modal?.addEventListener('click', e => {
  if (e.target === modal || e.target.closest('[data-close-modal]')) closeCase();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCase();
});

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Interactive Background CAD Particle Canvas
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height, particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.size = Math.random() * 1.5 + 0.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(39, 199, 255, 0.3)';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((width * height) / 15000);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(39, 199, 255, ${0.1 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  resize();
  animate();
}

// Set current year dynamically
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
