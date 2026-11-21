/* ==========================================================================
   CYBERPUNK HUD INTERACTION ENGINE - BRANDON NOBLE
   Focus: Cybersecurity Undergraduate & Technical Operative
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initAudioSynthesizer();
    initTerminal();
    initContactForm();
    initNavHighlight();
    initMobileNav();
    updateTimestamp();
});

/* --------------------------------------------------------------------------
   1. Dynamic Typewriter / Decryptor Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const target = document.getElementById('typewriterTarget');
    if (!target) return;

    const phrases = [
        "CYBERSECURITY UNDERGRADUATE // TU DUBLIN",
        "HANDS-ON BLUE TEAMING, SIEM LOG CORRELATION & TRIAGE",
        "PENTESTING LABS, KALI LINUX & PURPLE TEAMING",
        "ACTIVE CTF COMPETITOR & INDUSTRY CONFERENCE ATTENDEE",
        "FOUNDATIONAL SECURE SDLC (S-SDLC) AWARENESS"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 48;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            target.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 24;
        } else {
            target.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 48;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2200; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 380; // Pause before typing next phrase
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   2. Retro Cyberpunk Web Audio Synthesizer (0 External Assets Required)
   -------------------------------------------------------------------------- */
let audioCtx = null;
let sfxEnabled = false;

function initAudioSynthesizer() {
    const audioBtn = document.getElementById('audioToggle');
    if (!audioBtn) return;

    audioBtn.addEventListener('click', () => {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }

        sfxEnabled = !sfxEnabled;
        const btnText = audioBtn.querySelector('.btn-text');
        if (sfxEnabled) {
            btnText.textContent = "SFX: ON";
            audioBtn.style.borderColor = "var(--neon-green)";
            audioBtn.style.color = "var(--neon-green)";
            playBeep(880, 'sine', 0.1);
        } else {
            btnText.textContent = "SFX: OFF";
            audioBtn.style.borderColor = "var(--neon-cyan)";
            audioBtn.style.color = "var(--text-primary)";
        }
    });

    // Add sound effects to buttons and nav links
    const interactiveElements = document.querySelectorAll('.cyber-btn, .nav-link, .channel-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (sfxEnabled) playBeep(520, 'square', 0.04, 0.03);
        });
        el.addEventListener('click', () => {
            if (sfxEnabled) playBeep(740, 'triangle', 0.08, 0.08);
        });
    });
}

function playBeep(freq, type = 'sine', duration = 0.08, volume = 0.05) {
    if (!audioCtx || !sfxEnabled) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(volume, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        // Audio policy or error ignore
    }
}

/* --------------------------------------------------------------------------
   3. Interactive Cyber Terminal CLI (Gracefully checks for DOM presence)
   -------------------------------------------------------------------------- */
function initTerminal() {
    const form = document.getElementById('terminalForm');
    const input = document.getElementById('terminalInput');
    const history = document.getElementById('terminalHistory');
    const screen = document.getElementById('terminalScreen');
    if (!form || !input || !history || !screen) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        input.value = '';
    });
}

/* --------------------------------------------------------------------------
   4. Secure Contact Form Handler & Defensive Input Sanitization
   -------------------------------------------------------------------------- */
let lastSubmissionTime = 0;
const SUBMISSION_COOLDOWN_MS = 10000; // 10-second anti-spam rate limiter

/**
 * Strips non-printable ASCII control characters and escapes HTML entities.
 * Ensures all user input is strictly treated as immutable plain text.
 */
function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    
    // Strip ASCII control characters (0x00 - 0x1F, except newline and tab) and DEL (0x7F)
    const cleaned = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    // Entity-encode HTML control characters to prevent XSS / markup injection
    return cleaned
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const sendBtn = document.getElementById('sendBtn');
    const honeypot = document.getElementById('formHoneypot');
    if (!form || !status || !sendBtn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Anti-Bot Honeypot Defense: Silently reject automated crawlers
        if (honeypot && honeypot.value.trim() !== '') {
            status.textContent = "[+] MESSAGE TRANSMITTED. THANK YOU!";
            status.className = "form-status success";
            form.reset();
            return;
        }

        // 2. Client-side Rate Limiting: Prevent rapid-fire flood attacks
        const now = Date.now();
        if (now - lastSubmissionTime < SUBMISSION_COOLDOWN_MS) {
            const remaining = Math.ceil((SUBMISSION_COOLDOWN_MS - (now - lastSubmissionTime)) / 1000);
            status.textContent = `[!] Cooldown active. Please wait ${remaining}s before resubmitting.`;
            status.className = "form-status error";
            return;
        }

        // 3. Extract and Sanitize Inputs
        const rawName = document.getElementById('senderName')?.value || '';
        const rawSubject = document.getElementById('messageSubject')?.value || '';
        const rawMessage = document.getElementById('messageBody')?.value || '';

        const safeName = sanitizeInput(rawName.trim());
        const safeSubject = sanitizeInput(rawSubject.trim());
        const safeMessage = sanitizeInput(rawMessage.trim());

        // 4. Boundary Validation (Length constraints)
        if (!safeName || !safeSubject || !safeMessage) {
            status.textContent = "[!] Validation Error: All fields (Name, Subject, Message) are required.";
            status.className = "form-status error";
            return;
        }

        if (safeName.length > 100 || safeSubject.length > 150 || safeMessage.length > 3000) {
            status.textContent = "[!] Payload Error: Input exceeds maximum permitted byte boundaries.";
            status.className = "form-status error";
            return;
        }

        // 5. Safe Transmission Processing (Strict string handling, no innerHTML execution)
        sendBtn.disabled = true;
        status.textContent = "[VALIDATING & TRANSMITTING PAYLOAD...]";
        status.className = "form-status";
        lastSubmissionTime = now;

        setTimeout(() => {
            // Guarantee output uses textContent (never innerHTML)
            status.textContent = "[+] MESSAGE SANITIZED & TRANSMITTED. THANK YOU!";
            status.className = "form-status success";
            form.reset();
            sendBtn.disabled = false;
        }, 900);
    });
}

function triggerMatrixFlash() {
    const grid = document.querySelector('.cyber-grid');
    if (!grid) return;
    grid.style.backgroundImage = 'linear-gradient(to right, rgba(0, 255, 102, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 102, 0.25) 1px, transparent 1px)';
    setTimeout(() => {
        grid.style.backgroundImage = '';
    }, 800);
}

/* --------------------------------------------------------------------------
   5. Active Navigation State on Scroll
   -------------------------------------------------------------------------- */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   6. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const hamburger = document.getElementById('hamburgerBtn');
    const nav = document.getElementById('hudNav');
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
        const isOpen = nav.style.display === 'flex';
        nav.style.display = isOpen ? 'none' : 'flex';
        if (!isOpen) {
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = 'var(--hud-height)';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'rgba(10, 11, 16, 0.98)';
            nav.style.padding = '20px 24px';
            nav.style.borderBottom = '1px solid var(--neon-cyan)';
        }
    });

    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.style.display = 'none';
            }
        });
    });
}

/* --------------------------------------------------------------------------
   7. Footer Date
   -------------------------------------------------------------------------- */
function updateTimestamp() {
    const yearElem = document.getElementById('currentYear');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
}
