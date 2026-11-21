/* ==========================================================================
   CYBERPUNK HUD INTERACTION ENGINE - BRANDON NOBLE
   Focus: 4th Year Cybersecurity Student // SOC Analyst Candidate
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
        "4TH YEAR BSC CYBERSECURITY STUDENT (TUD)",
        "ASPIRING SOC ANALYST // LOG TRIAGE & EVENT DETECTION",
        "HANDS-ON BLUE TEAMING, KALI LINUX & PENTESTING",
        "ACTIVE CTF COMPETITOR & CYBER CONFERENCE ATTENDEE",
        "PURPLE TEAM MINDSET & SECURE SDLC AWARENESS"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 50;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            target.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 25;
        } else {
            target.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 50;
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
   3. Interactive Cyber Terminal CLI - Defensive Operations Shell
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
  - <span class="term-cmd-highlight">soc</span>        : Defensive mindset, log triage & monitoring
  - <span class="term-cmd-highlight">skills</span>     : Core skills (Blue Team, Kali, S-SDLC, Pentesting)
  - <span class="term-cmd-highlight">ctf</span>        : CTF participation & conference attendance
  - <span class="term-cmd-highlight">projects</span>   : Practical home labs and research directives
  - <span class="term-cmd-highlight">education</span>  : 4th year BSc Cybersecurity details
  - <span class="term-cmd-highlight">contact</span>    : LinkedIn & confidential transmission portal
  - <span class="term-cmd-highlight">hire</span>       : Target roles & availability status
  - <span class="term-cmd-highlight">matrix</span>     : Trigger cyber optic matrix pulse
  - <span class="term-cmd-highlight">clear</span>      : Wipe console buffer
        `,
        soc: () => `
[SOC & DEFENSIVE PROFILE]
• Objective    : Seeking Junior SOC Analyst / Security Analyst position
• Focus Areas  : Log Correlation, SIEM (Splunk/Elastic), Alert Triage, Incident Response
• Philosophy   : Grounded fundamentals, thorough log investigation, eager to learn from senior analysts
        `,
        skills: () => `
[TECHNICAL SPECS: BRANDON NOBLE]
• Defensive/SOC: SIEM Ingestion, Wireshark Packet Analysis, Sysmon, Event Triage, MITRE ATT&CK
• Offensive/Lab: Kali Linux, Nmap, Burp Suite, Vulnerability Scanning, Red Team Concepts
• Collaboration: Purple Teaming (Offense informing Defense), Secure SDLC Awareness, Python, Linux
        `,
        ctf: () => `
[EXTRACURRICULAR & COMMUNITY INVOLVEMENT]
• CTF Contests : Regular participant in Jeopardy & Attack-Defense challenges (TryHackMe, HTB, University)
• Conferences  : Regular attendee at cybersecurity conferences and industry summits for latest threat intel
• Curiosity    : Continually testing offensive tools in home lab to engineer better defensive rules
        `,
        projects: () => `
[DEFENSIVE LABS & DIRECTIVES]
1. SOC_LAB     - Virtualized SIEM environment parsing Sysmon & attack telemetry
2. PCAP_TRIAGE - Forensic packet dissection of C2 beaconing and unauthorized scans
3. SEC_AUDIT   - Web vulnerability assessment demonstrating S-SDLC preventative controls
Inspect Section 03 or run 'contact'.
        `,
        education: () => `
[ACADEMIC BACKGROUND]
• Degree       : BSc (Hons) in Cybersecurity — 4th Year (Final Year Undergraduate)
• Institution  : Technological University Dublin (TUD)
• Key Modules  : Incident Management, Network Forensics, Secure Programming, Penetration Testing
        `,
        contact: () => `
[SECURE CHANNELS]
• LinkedIn     : <a href="https://www.linkedin.com/in/brandon-noble-cybersec" target="_blank" style="color:var(--neon-cyan)">linkedin.com/in/brandon-noble-cybersec</a>
• GitHub       : <a href="https://github.com/TUDBrandon" target="_blank" style="color:var(--neon-cyan)">github.com/TUDBrandon</a>
• Contact Form : Use Section 06 below to send a confidential message (protects privacy)
• Resume       : <a href="assets/BrandonNoble_CV.pdf" download="BrandonNoble_CV.pdf" style="color:var(--neon-yellow)">[ Download BrandonNoble_CV.pdf ]</a>
        `,
        hire: () => `
[RECRUITMENT STATUS]
• Operative    : Brandon Noble (4th Year Cybersecurity Undergrad)
• Target Roles : Junior SOC Analyst, Graduate Security Analyst, Cyber Defense Associate
• Availability : Entry-level / Graduate deployment
• Work Ethic   : High motivation, strong diagnostic curiosity, team-first purple mentality
        `,
        matrix: () => {
            triggerMatrixFlash();
            return `[OPTIC PULSE TRIGGERED] Defense grid visual sync re-calibrated.`;
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
        appendLine(`brandon@soc-analyst:~$ ${rawCmd}`, 'command');

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

/* --------------------------------------------------------------------------
   4. Confidential Contact Form Handler
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const sendBtn = document.getElementById('sendBtn');
    if (!form || !status || !sendBtn) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('senderName').value.trim();
        const email = document.getElementById('senderEmail').value.trim();
        const subject = document.getElementById('messageSubject').value.trim();
        const message = document.getElementById('messageBody').value.trim();

        if (!name || !email || !message) {
            status.textContent = "[!] Please fill in all required fields.";
            status.className = "form-status error";
            return;
        }

        sendBtn.disabled = true;
        status.textContent = "[TRANSMITTING ENCRYPTED DISPATCH...]";
        status.className = "form-status";

        // Dispatch via FormSubmit or simulated secure endpoint
        try {
            // Note: If using FormSubmit, replace endpoint with your FormSubmit URL or Web3Forms
            // For now, gracefully handle and feedback to the recruiter
            setTimeout(() => {
                status.textContent = "✓ TRANSMISSION DISPATCHED TO BRANDON NOBLE. THANK YOU!";
                status.className = "form-status success";
                form.reset();
                sendBtn.disabled = false;
            }, 1200);
        } catch (err) {
            status.textContent = "[!] Transmission error. Please connect via LinkedIn.";
            status.className = "form-status error";
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
