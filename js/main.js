// Main interaction scripts

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initAudioSynthesizer();
    initTerminal();
    initContactForm();
    initNavHighlight();
    initMobileNav();
    initCertModal();
    updateTimestamp();
});

// Typewriter effect
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
            typeSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 380;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Audio feedback
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
        // Audio error ignore
    }
}

// Terminal CLI
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

// Contact form handler
const WEB3FORMS_ACCESS_KEY = "0f0abdad-3bc6-4ebe-872a-ad612f906b28";
let lastSubmissionTime = 0;
const SUBMISSION_COOLDOWN_MS = 10000;

// Basic input sanitization
function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    
    const cleaned = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

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

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Honeypot check
        if (honeypot && honeypot.value.trim() !== '') {
            status.textContent = "[+] MESSAGE TRANSMITTED. THANK YOU!";
            status.className = "form-status success";
            form.reset();
            return;
        }

        // Rate limit check
        const now = Date.now();
        if (now - lastSubmissionTime < SUBMISSION_COOLDOWN_MS) {
            const remaining = Math.ceil((SUBMISSION_COOLDOWN_MS - (now - lastSubmissionTime)) / 1000);
            status.textContent = `[!] Cooldown active. Please wait ${remaining}s before resubmitting.`;
            status.className = "form-status error";
            return;
        }

        // Sanitize inputs
        const rawName = document.getElementById('senderName')?.value || '';
        const rawSubject = document.getElementById('messageSubject')?.value || '';
        const rawMessage = document.getElementById('messageBody')?.value || '';

        const safeName = sanitizeInput(rawName.trim());
        const safeSubject = sanitizeInput(rawSubject.trim());
        const safeMessage = sanitizeInput(rawMessage.trim());

        // Field validation
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

        // Submit payload
        sendBtn.disabled = true;
        status.textContent = "[VALIDATING & TRANSMITTING PAYLOAD...]";
        status.className = "form-status";
        lastSubmissionTime = now;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: safeName,
                    subject: safeSubject,
                    message: safeMessage,
                    from_name: `Portfolio Dispatch: ${safeName}`
                })
            });

            const data = await response.json();

            if (response.status === 200 && data.success) {
                status.textContent = "[+] TRANSMISSION DELIVERED DIRECTLY TO INBOX. THANK YOU!";
                status.className = "form-status success";
                form.reset();
            } else {
                status.textContent = `[!] Dispatch Notice: ${data.message || 'Transmission failed.'}`;
                status.className = "form-status error";
            }
        } catch (err) {
            status.textContent = "[!] Gateway network error. Please connect via LinkedIn.";
            status.className = "form-status error";
        } finally {
            sendBtn.disabled = false;
        }
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

// Navigation highlight on scroll
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

// Mobile navigation toggle
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

// Footer timestamp
function updateTimestamp() {
    const yearElem = document.getElementById('currentYear');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
}

// Certificate modal viewer
function initCertModal() {
    const modal = document.getElementById('certModal');
    const openBtn = document.getElementById('openCertModal');
    const closeBtn = document.getElementById('closeCertModal');
    if (!modal || !openBtn) return;

    function openModal() {
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', openModal);

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
}
