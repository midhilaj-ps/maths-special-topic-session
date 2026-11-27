// Maths Special Topic Session - Interactive Application Logic & AI Mathematical Animations

document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initMathHeroCanvas();
  initAiMathLab();
  initTopicFilter();
  initBookingForm();
  initFaqAccordion();
  initPosterModal();
  initCopyButtons();
  initFloatingCta();
  initLiveSlotCounter();
});

// Initialize Lucide icons if available
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/* ==========================================================================
   1. AI MATHEMATICAL PARTICLE CANVAS (HERO BACKGROUND)
   ========================================================================== */
function initMathHeroCanvas() {
  const canvas = document.getElementById('math-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  const mathSymbols = ['∑', 'π', '√x', '∫', 'θ', 'e^{iπ}', 'dy/dx', 'x²', 'Δ', 'λ', '∞', 'sin θ', 'a²+b²=c²'];
  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 45);

  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY <= rect.bottom && e.clientY >= rect.top) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    } else {
      mouse.x = null;
      mouse.y = null;
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class MathParticle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.size = Math.random() * 3 + 2;
      this.symbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
      this.hasSymbol = Math.random() > 0.55;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
      this.color = Math.random() > 0.5 ? 'rgba(245, 158, 11,' : 'rgba(56, 189, 248,';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse collision repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 3;
          this.y -= (dy / dist) * force * 3;
        }
      }
    }

    draw() {
      ctx.fillStyle = `${this.color}${this.baseAlpha})`;
      if (this.hasSymbol) {
        ctx.font = '13px Outfit, sans-serif';
        ctx.fillText(this.symbol, this.x, this.y);
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new MathParticle());
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const alpha = (1 - dist / 110) * 0.18;
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }

      // Connect with mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - particles[a].x;
        const dy = mouse.y - particles[a].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.35;
          ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. INTERACTIVE AI MATH LAB (TRIGONOMETRY, ALGEBRA, SPEED MATHS)
   ========================================================================== */
function initAiMathLab() {
  const labTabs = document.querySelectorAll('.math-lab-tab');
  const labPanels = document.querySelectorAll('.math-lab-panel');

  if (!labTabs.length) return;

  labTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      labTabs.forEach(t => {
        t.classList.remove('bg-amber-500', 'text-slate-950', 'shadow-md');
        t.classList.add('bg-navy-800', 'text-slate-300', 'hover:bg-navy-700');
      });
      tab.classList.add('bg-amber-500', 'text-slate-950', 'shadow-md');
      tab.classList.remove('bg-navy-800', 'text-slate-300', 'hover:bg-navy-700');

      labPanels.forEach(panel => {
        if (panel.id === `lab-${target}`) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });

  initTrigLab();
  initAlgebraLab();
  initVedicLab();
}

// A. Trigonometry Unit Circle & Wave Visualizer
function initTrigLab() {
  const canvas = document.getElementById('trig-canvas');
  const slider = document.getElementById('trig-angle-slider');
  const angleDisplay = document.getElementById('trig-angle-val');
  const sinDisplay = document.getElementById('trig-sin-val');
  const cosDisplay = document.getElementById('trig-cos-val');
  const autoPlayBtn = document.getElementById('trig-auto-btn');

  if (!canvas || !slider) return;
  const ctx = canvas.getContext('2d');

  let angleDeg = 45;
  let isAutoPlaying = true;

  function draw() {
    const w = (canvas.width = canvas.offsetWidth);
    const h = (canvas.height = canvas.offsetHeight);
    ctx.clearRect(0, 0, w, h);

    const rad = (angleDeg * Math.PI) / 180;
    const sinVal = Math.sin(rad);
    const cosVal = Math.cos(rad);

    if (angleDisplay) angleDisplay.textContent = `${Math.round(angleDeg)}°`;
    if (sinDisplay) sinDisplay.textContent = sinVal.toFixed(3);
    if (cosDisplay) cosDisplay.textContent = cosVal.toFixed(3);

    // Left Unit Circle Center
    const circleCenterX = Math.min(130, w * 0.3);
    const circleCenterY = h / 2;
    const radius = Math.min(75, h * 0.38);

    // Coordinate grid axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;

    // Circle Axes
    ctx.beginPath();
    ctx.moveTo(circleCenterX - radius - 15, circleCenterY);
    ctx.lineTo(circleCenterX + radius + 15, circleCenterY);
    ctx.moveTo(circleCenterX, circleCenterY - radius - 15);
    ctx.lineTo(circleCenterX, circleCenterY + radius + 15);
    ctx.stroke();

    // Circle
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Point on Circle
    const px = circleCenterX + radius * cosVal;
    const py = circleCenterY - radius * sinVal;

    // Radius Hypotenuse Line
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(circleCenterX, circleCenterY);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Sin Vertical Line (green)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(px, circleCenterY);
    ctx.lineTo(px, py);
    ctx.stroke();

    // Cos Horizontal Line (cyan)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(circleCenterX, circleCenterY);
    ctx.lineTo(px, circleCenterY);
    ctx.stroke();

    // Dot at P
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fill();

    // Right Sine Wave Projection
    const waveStartX = circleCenterX + radius + 35;
    const waveEndX = w - 20;

    // Midline for wave
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(waveStartX, circleCenterY);
    ctx.lineTo(waveEndX, circleCenterY);
    ctx.stroke();

    // Draw Sine Wave
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    const waveWidth = waveEndX - waveStartX;
    for (let x = 0; x < waveWidth; x++) {
      const waveRad = (x / waveWidth) * Math.PI * 2 + rad;
      const y = circleCenterY - Math.sin(waveRad) * radius;
      if (x === 0) ctx.moveTo(waveStartX + x, y);
      else ctx.lineTo(waveStartX + x, y);
    }
    ctx.stroke();

    // Dotted projection line from circle to wave start
    ctx.setLineDash([3, 3]);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
    ctx.beginPath();
    ctx.moveTo(px, py);
    const startWaveY = circleCenterY - radius * sinVal;
    ctx.lineTo(waveStartX, startWaveY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Glowing Lead Dot on wave
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(waveStartX, startWaveY, 5, 0, Math.PI * 2);
    ctx.fill();

    if (isAutoPlaying) {
      angleDeg = (angleDeg + 0.6) % 360;
      if (slider) slider.value = Math.round(angleDeg);
      requestAnimationFrame(draw);
    }
  }

  slider.addEventListener('input', (e) => {
    isAutoPlaying = false;
    if (autoPlayBtn) autoPlayBtn.textContent = '▶ Auto Play';
    angleDeg = parseFloat(e.target.value);
    draw();
  });

  if (autoPlayBtn) {
    autoPlayBtn.addEventListener('click', () => {
      isAutoPlaying = !isAutoPlaying;
      autoPlayBtn.textContent = isAutoPlaying ? '⏸ Pause' : '▶ Auto Play';
      if (isAutoPlaying) draw();
    });
  }

  draw();
}

// B. Algebra Quadratic Parabola Explorer
function initAlgebraLab() {
  const canvas = document.getElementById('algebra-canvas');
  const sliderA = document.getElementById('quad-a');
  const sliderB = document.getElementById('quad-b');
  const sliderC = document.getElementById('quad-c');
  const eqDisplay = document.getElementById('quad-eq-display');
  const rootDisplay = document.getElementById('quad-roots-display');
  const vertexDisplay = document.getElementById('quad-vertex-display');

  if (!canvas || !sliderA) return;
  const ctx = canvas.getContext('2d');

  function renderParabola() {
    const w = (canvas.width = canvas.offsetWidth);
    const h = (canvas.height = canvas.offsetHeight);
    ctx.clearRect(0, 0, w, h);

    const a = parseFloat(sliderA.value) || 1;
    const b = parseFloat(sliderB.value) || 0;
    const c = parseFloat(sliderC.value) || -4;

    document.getElementById('val-a').textContent = a;
    document.getElementById('val-b').textContent = b;
    document.getElementById('val-c').textContent = c;

    // Equation string
    const bSign = b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`;
    const cSign = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
    if (eqDisplay) eqDisplay.innerHTML = `y = <strong>${a}x² ${bSign} ${cSign}</strong>`;

    // Discriminant & Roots
    const D = b * b - 4 * a * c;
    const vx = -b / (2 * a);
    const vy = a * vx * vx + b * vx + c;
    if (vertexDisplay) vertexDisplay.textContent = `(${vx.toFixed(2)}, ${vy.toFixed(2)})`;

    if (rootDisplay) {
      if (D > 0) {
        const r1 = (-b + Math.sqrt(D)) / (2 * a);
        const r2 = (-b - Math.sqrt(D)) / (2 * a);
        rootDisplay.innerHTML = `<span class="text-emerald-400 font-bold">Two Real Roots:</span> x₁ = ${r1.toFixed(2)}, x₂ = ${r2.toFixed(2)}`;
      } else if (D === 0) {
        const r = -b / (2 * a);
        rootDisplay.innerHTML = `<span class="text-amber-400 font-bold">One Repeated Root:</span> x = ${r.toFixed(2)}`;
      } else {
        rootDisplay.innerHTML = `<span class="text-rose-400 font-bold">No Real Roots</span> (D = ${D.toFixed(1)} < 0, complex roots)`;
      }
    }

    // Coordinate System
    const originX = w / 2;
    const originY = h / 2 + 30;
    const scale = 18;

    // Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(w, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, h);
    ctx.stroke();

    // Draw Parabola curve
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();

    for (let px = 0; px <= w; px += 2) {
      const xMath = (px - originX) / scale;
      const yMath = a * xMath * xMath + b * xMath + c;
      const py = originY - yMath * scale;
      if (px === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Plot Vertex
    const vpx = originX + vx * scale;
    const vpy = originY - vy * scale;
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(vpx, vpy, 6, 0, Math.PI * 2);
    ctx.fill();

    // Plot Real Roots
    if (D >= 0) {
      const r1 = (-b + Math.sqrt(D)) / (2 * a);
      const r2 = (-b - Math.sqrt(D)) / (2 * a);
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(originX + r1 * scale, originY, 6, 0, Math.PI * 2);
      ctx.arc(originX + r2 * scale, originY, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  sliderA.addEventListener('input', renderParabola);
  sliderB.addEventListener('input', renderParabola);
  sliderC.addEventListener('input', renderParabola);

  renderParabola();
}

// C. Vedic Speed Maths Mental Calculator
function initVedicLab() {
  const num1Input = document.getElementById('vedic-n1');
  const num2Input = document.getElementById('vedic-n2');
  const outputContainer = document.getElementById('vedic-steps-output');
  if (!num1Input || !num2Input || !outputContainer) return;

  function calculateVedic() {
    const n1 = parseInt(num1Input.value) || 42;
    const n2 = parseInt(num2Input.value) || 36;

    const a = Math.floor(n1 / 10);
    const b = n1 % 10;
    const c = Math.floor(n2 / 10);
    const d = n2 % 10;

    // Step 1: Vertical Units (b * d)
    const step1 = b * d;
    const unitDigit = step1 % 10;
    const carry1 = Math.floor(step1 / 10);

    // Step 2: Cross Multiply & Add ((a * d) + (b * c) + carry1)
    const crossProduct = a * d + b * c;
    const step2 = crossProduct + carry1;
    const tenDigit = step2 % 10;
    const carry2 = Math.floor(step2 / 10);

    // Step 3: Vertical Tens (a * c + carry2)
    const step3 = a * c + carry2;

    const finalAnswer = n1 * n2;

    outputContainer.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div class="bg-navy-900 p-3 rounded-xl border border-white/10">
          <div class="text-amber-400 font-bold mb-1">Step 1: Vertical (Units)</div>
          <div class="text-slate-300 font-mono">${b} × ${d} = <strong class="text-white">${step1}</strong></div>
          <div class="text-slate-400 mt-1">Write: <span class="text-emerald-400 font-bold">${unitDigit}</span> | Carry: <span class="text-amber-300">${carry1}</span></div>
        </div>
        <div class="bg-navy-900 p-3 rounded-xl border border-white/10">
          <div class="text-sky-400 font-bold mb-1">Step 2: Criss-Cross</div>
          <div class="text-slate-300 font-mono">(${a}×${d}) + (${b}×${c}) + ${carry1} = <strong class="text-white">${step2}</strong></div>
          <div class="text-slate-400 mt-1">Write: <span class="text-emerald-400 font-bold">${tenDigit}</span> | Carry: <span class="text-amber-300">${carry2}</span></div>
        </div>
        <div class="bg-navy-900 p-3 rounded-xl border border-white/10">
          <div class="text-emerald-400 font-bold mb-1">Step 3: Vertical (Tens)</div>
          <div class="text-slate-300 font-mono">(${a} × ${c}) + ${carry2} = <strong class="text-white">${step3}</strong></div>
          <div class="text-slate-400 mt-1">Write: <span class="text-emerald-400 font-bold">${step3}</span></div>
        </div>
      </div>
      <div class="mt-3 p-3 bg-gradient-to-r from-amber-500/20 to-sky-500/20 rounded-xl border border-amber-400/30 flex items-center justify-between">
        <span class="text-xs font-semibold text-slate-300">⚡ Instant 3-Second Mental Answer:</span>
        <span class="text-xl font-black font-mono text-amber-300">${n1} × ${n2} = ${finalAnswer}</span>
      </div>
    `;
  }

  num1Input.addEventListener('input', calculateVedic);
  num2Input.addEventListener('input', calculateVedic);
  calculateVedic();
}

/* ==========================================================================
   3. TOPIC FILTERS & CATALOGUE
   ========================================================================== */
const topicsData = [
  {
    id: 'algebra',
    name: 'Algebra',
    category: 'school',
    desc: 'Linear & quadratic equations, polynomials, algebraic identities, factorization shortcuts.',
    badge: 'High Scoring',
    icon: 'variable',
    highlights: ['Zero-to-Hero Quadratic Formula', 'Instant Factorization tricks', 'Word problem decoding']
  },
  {
    id: 'geometry',
    name: 'Geometry & Mensuration',
    category: 'school',
    desc: 'Circle theorems, triangle congruence, 2D & 3D surface areas, volumes & coordinate geometry.',
    badge: 'Concept Heavy',
    icon: 'triangle',
    highlights: ['Visual geometric proofs', 'Formula memory map (2D & 3D)', 'Circle angle shortcuts']
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry',
    category: 'school',
    desc: 'Sin/Cos/Tan identities, complementary angles, heights & distances, unit circle mastery.',
    badge: 'Board Favorite',
    icon: 'compass',
    highlights: ['Value table in 30 seconds', 'Tough identities simplified', 'Heights & distance visual method']
  },
  {
    id: 'time-work',
    name: 'Time & Work / Pipes',
    category: 'competitive',
    desc: 'LCM efficiency method, alternating days, pipes & cisterns, work-wages relation.',
    badge: '100% Exam Guarantee',
    icon: 'clock',
    highlights: ['The 15-second LCM hack', 'Zero fraction calculation method', 'Negative work (leakage) solved']
  },
  {
    id: 'percentages-ratio',
    name: 'Percentage & Ratio-Proportion',
    category: 'competitive',
    desc: 'Fraction to % chart, successive change, profit & loss, mixtures & alligation.',
    badge: 'Foundation Core',
    icon: 'percent',
    highlights: ['1/1 to 1/20 fraction cheat sheet', 'Ratio multiplier method', 'Alligation cross trick']
  },
  {
    id: 'speed-maths',
    name: 'Speed Maths & Mental Tricks',
    category: 'speed',
    desc: 'Vedic multiplication, square roots in 3 secs, cube roots, split-and-merge additions.',
    badge: 'Super Fast',
    icon: 'zap',
    highlights: ['Instant 2-digit multiplication', 'Cube root by inspection', '50% faster calculation in exams']
  },
  {
    id: 'data-interpretation',
    name: 'Data Interpretation (DI)',
    category: 'competitive',
    desc: 'Bar graphs, pie charts, tabular DI, line charts, fast percentage difference estimation.',
    badge: 'Banking & SSC',
    icon: 'bar-chart-3',
    highlights: ['Approximation tactics', 'Ratio comparison without division', 'Average calculations in 10s']
  },
  {
    id: 'number-systems',
    name: 'Number Systems & Divisibility',
    category: 'competitive',
    desc: 'Divisibility rules, unit digit cyclicity, remainder theorem, HCF & LCM patterns.',
    badge: 'PSC & MTS Special',
    icon: 'hash',
    highlights: ['Unit digit cyclicity trick', 'Prime factor count secrets', 'Remainder theorem shortcuts']
  }
];

function initTopicFilter() {
  const container = document.getElementById('topics-grid');
  const filterButtons = document.querySelectorAll('.topic-filter-btn');
  if (!container) return;

  function renderTopics(filter = 'all') {
    container.innerHTML = '';
    const filtered = filter === 'all' 
      ? topicsData 
      : topicsData.filter(t => t.category === filter || (filter === 'school' && t.category === 'school'));

    filtered.forEach(topic => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-2xl p-6 shadow-sm border border-slate-200 card-hover flex flex-col justify-between transition-all';
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              ${topic.badge}
            </span>
            <span class="text-xs uppercase tracking-wider text-slate-400 font-bold">${topic.category.toUpperCase()}</span>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">${topic.name}</h3>
          <p class="text-slate-600 text-sm mb-4 leading-relaxed">${topic.desc}</p>
          <div class="space-y-1.5 mb-6">
            ${topic.highlights.map(h => `
              <div class="flex items-center text-xs font-medium text-slate-700">
                <span class="text-emerald-500 mr-2 font-bold">✓</span>
                <span>${h}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <button 
          onclick="selectTopicForBooking('${topic.name}')"
          class="w-full py-2.5 px-4 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 group">
          <span>Lock This Topic</span>
          <span class="group-hover:translate-x-1 transition-transform">→</span>
        </button>
      `;
      container.appendChild(card);
    });

    initLucideIcons();
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-navy-primary', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-600', 'hover:bg-slate-100');
      });
      btn.classList.add('bg-navy-primary', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-600', 'hover:bg-slate-100');
      renderTopics(btn.getAttribute('data-filter'));
    });
  });

  renderTopics('all');
}

window.selectTopicForBooking = function(topicName) {
  const topicSelect = document.getElementById('form-topic');
  const bookingSection = document.getElementById('book-slot');
  
  if (topicSelect) {
    let found = false;
    for (let i = 0; i < topicSelect.options.length; i++) {
      if (topicSelect.options[i].value === topicName || topicSelect.options[i].text.includes(topicName)) {
        topicSelect.selectedIndex = i;
        found = true;
        break;
      }
    }
    if (!found) {
      topicSelect.value = 'Other / Specific Topic';
      const customTopicWrapper = document.getElementById('custom-topic-wrapper');
      if (customTopicWrapper) {
        customTopicWrapper.classList.remove('hidden');
        document.getElementById('custom-topic-text').value = topicName;
      }
    }
  }

  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
    showToast(`Topic selected: "${topicName}". Fill your details below to confirm!`);
  }
};

/* ==========================================================================
   4. BOOKING FORM & AI WHATSAPP MESSAGE GENERATOR
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('session-booking-form');
  const topicSelect = document.getElementById('form-topic');
  const customTopicWrapper = document.getElementById('custom-topic-wrapper');
  const whatsappSubmitBtn = document.getElementById('btn-whatsapp-booking');

  if (topicSelect && customTopicWrapper) {
    topicSelect.addEventListener('change', () => {
      if (topicSelect.value === 'Other / Specific Topic') {
        customTopicWrapper.classList.remove('hidden');
      } else {
        customTopicWrapper.classList.add('hidden');
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleBookingSubmission();
    });
  }

  if (whatsappSubmitBtn) {
    whatsappSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleBookingSubmission();
    });
  }
}

function generateAiAgentMessage(name, phone, userType, topic, preferredTime) {
  let aiFocus = "Mastering foundational concepts, speed formulas, and solving handpicked past-year questions.";
  const topicLower = topic.toLowerCase();
  
  if (topicLower.includes('algebra')) {
    aiFocus = "Quadratic factorization shortcuts, linear systems, and algebraic identities without rote memorization.";
  } else if (topicLower.includes('geometry') || topicLower.includes('mensuration')) {
    aiFocus = "Circle theorems visualization, 2D/3D surface area & volume formulas, and step-marking proof methods.";
  } else if (topicLower.includes('trigonometry')) {
    aiFocus = "30-second angle-value table mastery, standard identity transformations, and heights & distances shortcuts.";
  } else if (topicLower.includes('time') || topicLower.includes('work') || topicLower.includes('pipe')) {
    aiFocus = "15-second LCM efficiency technique, alternating work days, and zero-fraction calculation hacks.";
  } else if (topicLower.includes('percent') || topicLower.includes('ratio')) {
    aiFocus = "Fraction-to-percentage conversion chart, profit/loss multiplier logic, and mixture alligation cross-methods.";
  } else if (topicLower.includes('speed') || topicLower.includes('mental')) {
    aiFocus = "Vedic fast multiplication, mental square/cube roots in 3 seconds, and rapid arithmetic shortcuts.";
  } else if (topicLower.includes('interpretation') || topicLower.includes('di')) {
    aiFocus = "Fast table & graph approximation, percentage difference estimation, and rapid ratio comparison.";
  } else if (topicLower.includes('number') || topicLower.includes('divisibility')) {
    aiFocus = "Divisibility rules, unit digit cyclicity, remainder theorem, and HCF/LCM patterns.";
  }

  const messageLines = [
    "🤖 *MATHS MYSTERY BY EEYES | AI ACADEMIC BRIEFING*",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "👋 *Greetings Tutor!*",
    "An automated academic briefing has been compiled via the *Maths Mystery by Eeyes* portal for a student seeking 1-session mastery.",
    "",
    "📋 *STUDENT PROFILE & BOOKING DOSSIER:*",
    `• *Student / Parent Name:* ${name}`,
    `• *Contact Number:* +91 ${phone}`,
    `• *Academic Level / Category:* ${userType}`,
    `• *Target Topic to Master:* ${topic}`,
    `• *Requested Timing Slot:* ${preferredTime}`,
    "",
    "🧠 *AI LEARNING BLUEPRINT & FOCUS:*",
    `• *Target Objective:* 100% Concept Clarity in 1 Focused Sitting`,
    `• *Curriculum Focus:* ${aiFocus}`,
    `• *Pedagogy:* First-principles breakdown + Speed Shortcuts + PYQ Trap Elimination`,
    `• *Doubt Clearing:* 1-on-1 personalized doubt solving`,
    "",
    "⚡ *REQUESTED TUTOR ACTION:*",
    `Please confirm the earliest available slot for *${name}* to lock in the session timing.`,
    "",
    "Thank you! 🚀",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  ];

  return messageLines.join("\n");
}

function handleBookingSubmission() {
  const nameInput = document.getElementById('form-name');
  const phoneInput = document.getElementById('form-phone');
  const userTypeInput = document.getElementById('form-category');
  const topicInput = document.getElementById('form-topic');
  const customTopicInput = document.getElementById('custom-topic-text');
  const preferredTimeInput = document.getElementById('form-time');

  const name = nameInput ? nameInput.value.trim() : '';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const userType = userTypeInput ? userTypeInput.value : 'School Student / Aspirant';
  let topic = topicInput ? topicInput.value : 'Algebra';
  const customTopic = customTopicInput ? customTopicInput.value.trim() : '';
  const preferredTime = preferredTimeInput ? preferredTimeInput.value : 'This Weekend (Morning 10 AM - 12 PM)';

  if (topic === 'Other / Specific Topic' && customTopic) {
    topic = customTopic;
  }

  if (!name || !phone) {
    showToast('⚠️ Please enter your Name and WhatsApp/Phone number.', 'warning');
    if (!name && nameInput) nameInput.focus();
    else if (!phone && phoneInput) phoneInput.focus();
    return;
  }

  const waNumber = '919747066478';
  const rawAiMessage = generateAiAgentMessage(name, phone, userType, topic, preferredTime);
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(rawAiMessage)}`;

  window.open(waUrl, '_blank');

  showConfirmationTicket({
    name,
    phone,
    userType,
    topic,
    preferredTime,
    waUrl,
    rawAiMessage
  });
}

function showConfirmationTicket(data) {
  const modal = document.getElementById('ticket-modal');
  const ticketContent = document.getElementById('ticket-details');
  if (!modal || !ticketContent) {
    window.location.href = data.waUrl;
    return;
  }

  ticketContent.innerHTML = `
    <div class="bg-slate-900 text-slate-100 border border-slate-700 rounded-2xl p-4 text-left space-y-2 mb-4 text-xs font-mono shadow-inner">
      <div class="flex items-center justify-between text-amber-400 font-bold border-b border-slate-800 pb-2">
        <span class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          AI AGENT DOSSIER COMPILED
        </span>
        <span class="text-[10px] text-slate-400">READY TO SEND</span>
      </div>
      <div class="pt-1 text-slate-300">
        <div>👤 <strong class="text-white">${data.name}</strong> (${data.phone})</div>
        <div>🎓 <span class="text-sky-300">${data.userType}</span></div>
        <div>🎯 Topic: <span class="text-amber-300 font-bold">${data.topic}</span></div>
        <div>⏰ Slot: <span class="text-emerald-300">${data.preferredTime}</span></div>
      </div>
    </div>
  `;

  const directWaBtn = document.getElementById('modal-wa-btn');
  if (directWaBtn) {
    directWaBtn.href = data.waUrl;
  }

  modal.classList.add('active');
  triggerConfetti();
  showToast('🚀 WhatsApp booking opened with AI Agent details!');
}

window.closeTicketModal = function() {
  const modal = document.getElementById('ticket-modal');
  if (modal) {
    modal.classList.remove('active');
  }
};

/* ==========================================================================
   5. POSTER LIGHTBOX, FAQ, TOAST & HELPERS
   ========================================================================== */
function initPosterModal() {
  const posterModal = document.getElementById('poster-modal');
  const openButtons = document.querySelectorAll('.open-poster-btn');
  const closeBtn = document.getElementById('close-poster-btn');

  if (!posterModal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      posterModal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      posterModal.classList.remove('active');
    });
  }

  posterModal.addEventListener('click', (e) => {
    if (e.target === posterModal) {
      posterModal.classList.remove('active');
    }
  });
}

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (header && answer) {
      header.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');
        document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(ic => {
          ic.classList.remove('rotate-180');
        });

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    }
  });
}

function initCopyButtons() {
  const copyBtns = document.querySelectorAll('.copy-phone-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText('9747066478').then(() => {
        showToast('📞 Phone number 9747066478 copied to clipboard!');
      }).catch(() => {
        showToast('📞 Contact: 9747066478');
      });
    });
  });
}

function showToast(message, type = 'info') {
  let toast = document.getElementById('custom-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.className = 'fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold transition-all transform duration-300 translate-y-[-20px] opacity-0 pointer-events-none flex items-center gap-3';
    document.body.appendChild(toast);
  }

  if (type === 'warning') {
    toast.className = 'fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold transition-all transform duration-300 bg-amber-500 text-slate-950 border border-amber-400';
  } else {
    toast.className = 'fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold transition-all transform duration-300 bg-slate-900 text-white border border-slate-700';
  }

  toast.textContent = message;
  toast.classList.remove('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-[-20px]', 'pointer-events-none');
  }, 3500);
}

function initLiveSlotCounter() {
  const counterEl = document.getElementById('live-slots-counter');
  if (!counterEl) return;
  const availableSlots = 3;
  counterEl.textContent = `${availableSlots} Slots Left For Today`;
}

function initFloatingCta() {
  const stickyBar = document.getElementById('sticky-bottom-bar');
  if (!stickyBar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      stickyBar.classList.remove('translate-y-full');
    } else {
      stickyBar.classList.add('translate-y-full');
    }
  });
}

function triggerConfetti() {
  const colors = ['#f59e0b', '#0284c7', '#10b981', '#fbbf24', '#6366f1'];
  for (let i = 0; i < 35; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'fixed z-50 pointer-events-none';
    confetti.style.width = `${Math.random() * 8 + 6}px`;
    confetti.style.height = `${Math.random() * 8 + 6}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.top = '30%';
    confetti.style.left = `${Math.random() * 80 + 10}%`;
    confetti.style.borderRadius = '2px';
    confetti.style.opacity = '1';
    confetti.style.transition = 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
    document.body.appendChild(confetti);

    const destX = (Math.random() - 0.5) * 300;
    const destY = Math.random() * 400 + 100;
    const rotate = Math.random() * 720;

    setTimeout(() => {
      confetti.style.transform = `translate(${destX}px, ${destY}px) rotate(${rotate}deg)`;
      confetti.style.opacity = '0';
    }, 20);

    setTimeout(() => {
      confetti.remove();
    }, 1300);
  }
}
