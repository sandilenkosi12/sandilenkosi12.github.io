document.addEventListener('DOMContentLoaded', () => {

  // ══════════════════════════════════════════
  // 1. MATRIX CODE RAIN
  // ══════════════════════════════════════════
  const canvas = document.getElementById('matrix-canvas');
  const ctx    = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const chars  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&<>{}[]アイウエオカキクケコサシスセソタチツテト';
  const fontSize = 13;
  let columns  = Math.floor(canvas.width / fontSize);
  let drops    = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 13, 31, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px "DM Mono", monospace';

    for (let i = 0; i < drops.length; i++) {
      // Brightest char at the tip
      const char = chars[Math.floor(Math.random() * chars.length)];
      const brightness = Math.random();
      if (brightness > 0.95) {
        ctx.fillStyle = '#ffffff';
      } else if (brightness > 0.7) {
        ctx.fillStyle = '#00ff41';
      } else {
        ctx.fillStyle = 'rgba(0,255,65,0.5)';
      }
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 50);

  // Recalculate columns on resize
  window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops   = Array(columns).fill(1);
  });


  // ══════════════════════════════════════════
  // 2. GLITCH EFFECT ON HERO NAME
  // ══════════════════════════════════════════
  const glitchLines = document.querySelectorAll('.hero-name .line');

  function triggerGlitch() {
    glitchLines.forEach(line => {
      line.classList.add('glitching');
      setTimeout(() => line.classList.remove('glitching'), 350);
    });
  }

  // Random glitch every 3–7 seconds
  function scheduleGlitch() {
    const delay = 3000 + Math.random() * 4000;
    setTimeout(() => {
      triggerGlitch();
      scheduleGlitch();
    }, delay);
  }
  setTimeout(scheduleGlitch, 2000); // First glitch after 2s


  // ══════════════════════════════════════════
  // 3. MAGNETIC BUTTONS
  // ══════════════════════════════════════════
  document.querySelectorAll('.magnetic').forEach(btn => {
    const wrap = btn.closest('.magnetic-wrap') || btn;

    btn.addEventListener('mousemove', e => {
      const rect   = btn.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = e.clientX - cx;
      const dy     = e.clientY - cy;
      const dist   = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 80;

      if (dist < maxDist) {
        const pull = (1 - dist / maxDist) * 0.45;
        btn.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.4s cubic-bezier(.4,0,.2,1)';
      setTimeout(() => btn.style.transition = '', 400);
    });
  });


  // ══════════════════════════════════════════
  // 4. ANIMATED COUNTERS
  // ══════════════════════════════════════════
  const counters = document.querySelectorAll('.stat-n[data-target]');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    function update(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = Math.floor(eased * target);
      el.textContent = current + (progress === 1 ? suffix : '');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
        el.classList.add('counted');
      }
    }
    requestAnimationFrame(update);
  }

  // Trigger when stats scroll into view
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => {
    c.textContent = '0';
    counterObs.observe(c);
  });


  // ══════════════════════════════════════════
  // 5. STYLED CONSOLE MESSAGE
  // ══════════════════════════════════════════
  console.log('%c', 'font-size:0');
  console.log(
    '%c  SANDILE NKOSI  ',
    'background: #00ff41; color: #050d1f; font-size: 18px; font-weight: bold; padding: 8px 20px; border-radius: 4px; font-family: monospace;'
  );
  console.log(
    '%c  Web Developer & Cloud Engineer  ',
    'background: #050d1f; color: #00ff41; font-size: 13px; padding: 4px 20px; font-family: monospace; border: 1px solid #00ff41;'
  );
  console.log(
    '%c  👾 Hey, you found the secret panel!',
    'color: #00d4ff; font-size: 13px; font-family: monospace; padding: 4px 0;'
  );
  console.log(
    '%c  📧 Abelnkosi2000@gmail.com\n  🔗 linkedin.com/in/abel-nkosi-90294020a\n  🐙 github.com/sandilenkosi12',
    'color: #4d8fff; font-size: 12px; font-family: monospace; line-height: 1.8;'
  );
  console.log(
    '%c  Built with HTML · CSS · JavaScript · ☁ AWS',
    'color: rgba(240,244,255,0.4); font-size: 11px; font-family: monospace; padding: 4px 0 8px;'
  );


  // ══════════════════════════════════════════
  // EXISTING FEATURES (kept intact)
  // ══════════════════════════════════════════

  // Custom Cursor
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mx = 0, my = 0, fx = 0, fy = 0;
  let cursorVisible = false;

  cursor.style.opacity   = '0';
  follower.style.opacity = '0';

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!cursorVisible) {
      cursorVisible = true;
      cursor.style.opacity   = '1';
      follower.style.opacity = '0.6';
    }
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateFollower() {
    fx += (mx - fx) * 0.1;
    fy += (my - fy) * 0.1;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .skill-card, .project-item, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform     = 'translate(-50%,-50%) scale(2)';
      follower.style.width       = '50px';
      follower.style.height      = '50px';
      follower.style.borderColor = 'var(--green)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform     = 'translate(-50%,-50%) scale(1)';
      follower.style.width       = '32px';
      follower.style.height      = '32px';
      follower.style.borderColor = 'var(--blue-light)';
    });
  });

  // Typed Role
  const typedEl = document.getElementById('typed-role');
  const roles = ['Web Developer', 'Cloud Engineer', 'AWS Certified', 'Cisco Certified', 'Full Stack Builder'];
  let ri = 0, ci = 0, deleting = false;

  function typeRole() {
    if (!typedEl) return;
    const word = roles[ri];
    if (!deleting) {
      typedEl.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(typeRole, 1800); return; }
    } else {
      typedEl.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(typeRole, deleting ? 55 : 95);
  }
  setTimeout(typeRole, 600);

  // Hero slide-in
  const heroLines = document.querySelectorAll('.hero-name .line');
  heroLines.forEach((line, i) => {
    line.style.opacity   = '0';
    line.style.transform = 'translateY(60px)';
    line.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s cubic-bezier(.4,0,.2,1) ${i * 0.15}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      line.style.opacity   = '1';
      line.style.transform = 'translateY(0)';
    }));
  });

  // Hero elements fade in
  const heroFadeEls = document.querySelectorAll('.hero-tag, .hero-role, .hero-desc, .hero-actions, .hero-socials, .hero-stats');
  heroFadeEls.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.7s ease ${0.3 + i * 0.12}s, transform 0.7s ease ${0.3 + i * 0.12}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    }));
  });

  // Scroll indicator
  const scrollInd = document.querySelector('.hero-scroll');
  if (scrollInd) {
    scrollInd.style.opacity    = '0';
    scrollInd.style.transition = 'opacity 0.8s ease 1.2s';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      scrollInd.style.opacity = '1';
    }));
  }

  // Hamburger
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobile-menu');
  if (ham && mob) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      mob.classList.toggle('open');
    });
    document.querySelectorAll('.mob-link').forEach(l => {
      l.addEventListener('click', () => {
        ham.classList.remove('open');
        mob.classList.remove('open');
      });
    });
  }

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.style.background = window.scrollY > 50
      ? 'rgba(5,13,31,0.97)' : 'rgba(5,13,31,0.82)';
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 68, behavior: 'smooth' });
      }
    });
  });

  // Skills Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('tab-' + tab.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });

  // Scroll Reveal (non-hero only)
  const revealEls = document.querySelectorAll(
    '.section:not(.hero) .section-title, .skill-card, .project-item, .cert-card, .about-grid, .contact-grid, .section-label'
  );
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    revealObs.observe(el);
  });

  // Back to Top
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact Form
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML        = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = '#00ff41';
      btn.style.color      = '#050d1f';
      btn.disabled         = true;
      setTimeout(() => {
        btn.innerHTML        = orig;
        btn.style.background = '';
        btn.style.color      = '';
        btn.disabled         = false;
        form.reset();
      }, 3000);
    });
  }

  // Resume Download
  window.downloadResume = function () {
    const link = document.createElement('a');
    link.href     = 'assets/Sandile_Nkosi_Resume.pdf.pdf';
    link.download = 'Sandile_Nkosi_Resume.pdf';
    link.target   = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return false;
  };

}); // end DOMContentLoaded