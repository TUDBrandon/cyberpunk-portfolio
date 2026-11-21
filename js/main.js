/* ==========================================================================
   CYBERPUNK HUD INTERACTION ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initAudioSynthesizer();
    initTerminal();
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
        "BUILDING MISSION-CRITICAL DISTRIBUTED SYSTEMS",
        "ARCHITECTING CLOUD INFRASTRUCTURE & MICROSERVICES",
        "CRAFTING ZERO-LATENCY RESPONSIVE WEB APPLICATIONS",
        "AVAILABLE FOR FULL-TIME SENIOR ROLES & CONTRACTS"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 60;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            target.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 30;
        } else {
            target.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 60;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2200; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Pause before typing next phrase
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
    const interactiveElements = document.querySelectorAll('.cyber-btn, .nav-link, .channel-card, .term-quick-btn');
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
   3. Interactive Cyber Terminal CLI
   -------------------------------------------------------------------------- */
function initTerminal() {
    const form = document.getElementById('terminalForm');
    const input = document.getElementById('terminalInput');
    const history = document.getElementById('terminalHistory');
    const screen = document.getElementById('terminalScreen');
    if (!form || !input || !history || !screen) return;

    const commands = {
        help: () => `
COMMANDS AVAILABLE:
  - <span class="term-cmd-highlight">skills</span>    : Display technical capabilities and stack
  - <span class="term-cmd-highlight">projects</span>  : Show highlighted engineering directives
  - <span class="term-cmd-highlight">experience</span>: View career mission logs
  - <span class="term-cmd-highlight">contact</span>   : Retrieve communication channels (LinkedIn, Email)
  - <span class="term-cmd-highlight">hire</span>      : Show clearance status & work availability
  - <span class="term-cmd-highlight">matrix</span>    : Trigger cyber optic matrix pulse
  - <span class="term-cmd-highlight">clear</span>     : Wipe console buffer
        `,
        skills: () => `
[STACK ARCHITECTURE]
• Frontend : TypeScript, React, Next.js, WebGL, TailwindCSS
• Backend  : Node.js, Python, Go, Microservices, REST / GraphQL
• Database : PostgreSQL, Redis, MongoDB
• Cloud/Ops: Docker, Kubernetes, AWS, CI/CD, Linux
        `,
        projects: () => `
[SELECTED DIRECTIVES]
1. PROJECT_SYNAPSE  - Distributed real-time telemetry engine (10M+ events/day)
2. NEO_TERMINAL     - Developer CLI suite with 2,500+ active users
3. CYBER_VAULT      - Zero-Knowledge decentralized authentication
Type 'contact' or scroll up to Module 03 to inspect details.
        `,
        experience: () => `
[CAREER LOGS]
• 2024-PRESENT : Senior Software Engineer @ Corp Titan
• 2022-2024    : Full-Stack Developer @ Neural Innovations
• 2020-2022    : Software Engineering Apprentice @ Protocol Systems
        `,
        contact: () => `
[COMMUNICATION CHANNELS]
• LinkedIn : <a href="https://linkedin.com/in/yourprofile" target="_blank" style="color:var(--neon-cyan)">linkedin.com/in/yourprofile</a>
• Email    : <a href="mailto:your.email@domain.com" style="color:var(--neon-cyan)">your.email@domain.com</a>
• GitHub   : <a href="https://github.com/yourusername" target="_blank" style="color:var(--neon-cyan)">github.com/yourusername</a>
• Resume   : <a href="assets/resume.pdf" download style="color:var(--neon-yellow)">[ Download CV PDF ]</a>
        `,
        hire: () => `
[RECRUITMENT STATUS]
• Status       : <span style="color:var(--neon-green)">OPEN FOR EMPLOYMENT // CONTRACTS</span>
• Target Roles : Senior Software Engineer, Full-Stack Architect, Tech Lead
• Location     : Remote / Global Relocation Open
• Response Time: Within 24 hours via LinkedIn / Email
        `,
        matrix: () => {
            triggerMatrixFlash();
            return `[OPTIC PULSE TRIGGERED] Neural visual sync re-calibrated.`;
        },
        clear: () => {
            history.innerHTML = '';
            return null;
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const rawCmd = input.value.trim();
        if (!rawCmd) return;

        const cmd = rawCmd.toLowerCase();
        appendLine(`user@cyber-portfolio:~$ ${rawCmd}`, 'command');

        if (commands[cmd]) {
            const output = commands[cmd]();
            if (output !== null) {
                appendLine(output, 'result');
            }
        } else {
            appendLine(`Command not recognized: '${rawCmd}'. Type <span class="term-cmd-highlight">'help'</span> for list of commands.`, 'error');
        }

        input.value = '';
        screen.scrollTop = screen.scrollHeight;
    });

    // Preset command buttons
    document.querySelectorAll('.term-quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            input.value = cmd;
            form.dispatchEvent(new Event('submit'));
        });
    });

    function appendLine(content, className) {
        const line = document.createElement('div');
        line.className = `term-line ${className}`;
        line.innerHTML = content;
        history.appendChild(line);
    }
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
   4. Active Navigation State on Scroll
   -------------------------------------------------------------------------- */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
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
   5. Mobile Navigation Menu
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
   6. Footer Date
   -------------------------------------------------------------------------- */
function updateTimestamp() {
    const yearElem = document.getElementById('currentYear');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
}
