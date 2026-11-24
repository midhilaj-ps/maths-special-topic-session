// Maths Special Topic Session - Interactive Application Logic

document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
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

// Topic Data
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

// Topic Filter and Render
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

// Function called when student clicks "Lock This Topic"
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
      // Set to custom/other and add name
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

// Booking Form Logic
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

// AI Agent-Styled Booking Message Generator
function generateAiAgentMessage(name, phone, userType, topic, preferredTime) {
  // Topic specific AI Insight
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
    "🤖 *MATHS SPECIAL TOPIC SESSION | AI ACADEMIC BRIEFING*",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "👋 *Greetings Tutor!*",
    "An automated academic briefing has been compiled via the *Maths Special Topic Session* portal for a student seeking 1-session mastery.",
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

  // Construct AI Agent formatted message for WhatsApp
  const waNumber = '919747066478';
  const rawAiMessage = generateAiAgentMessage(name, phone, userType, topic, preferredTime);
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(rawAiMessage)}`;

  // Directly open WhatsApp in a new tab immediately
  const win = window.open(waUrl, '_blank');
  if (!win || win.closed || typeof win.closed === 'undefined') {
    // Popup might be blocked, redirect or open through modal
    console.log('Popup blocked or redirected');
  }

  // Show Confirmation Modal Ticket with AI preview on the page as well
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

// Close Ticket Modal
window.closeTicketModal = function() {
  const modal = document.getElementById('ticket-modal');
  if (modal) {
    modal.classList.remove('active');
  }
};

// Poster Lightbox Modal
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

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (header && answer) {
      header.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');
        
        // Close other items
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

// Copy phone number or triggers
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

// Toast notification
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

// Live Slot Counter
function initLiveSlotCounter() {
  const counterEl = document.getElementById('live-slots-counter');
  if (!counterEl) return;

  // Realistic dynamic slot indicator
  const availableSlots = 3;
  counterEl.textContent = `${availableSlots} Slots Left For Today`;
}

// Sticky CTA on scroll
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

// Celebration confetti simulation
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
