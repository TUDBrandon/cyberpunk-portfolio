# BRANDON NOBLE // TECHNICAL PORTFOLIO & WEB CV

> A hardened, interactive digital curriculum vitae and cybersecurity portfolio platform built from the ground up with modern web standards, cyberpunk HUD aesthetics, and defensive security controls.

**Live Deployment**: [https://tudbrandon.github.io/cyberpunk-portfolio/](https://tudbrandon.github.io/cyberpunk-portfolio/)  
**LinkedIn**: [https://www.linkedin.com/in/brandon-noble-cybersec](https://www.linkedin.com/in/brandon-noble-cybersec)  
**GitHub Profile**: [https://github.com/TUDBrandon](https://github.com/TUDBrandon)  

---

## [01] PURPOSE & OBJECTIVE

This repository hosts the source code for Brandon Noble's personal technical portfolio and interactive web CV.

Rather than relying on a conventional, static PDF resume alone, this site functions as an active, living proof-of-work. It bridges front-end engineering with core cybersecurity principles—showcasing hands-on competencies in defensive security (blue teaming, SOC log correlation, SIEM triage), offensive penetration testing labs, and foundational Secure SDLC (S-SDLC) practices within a custom-crafted cyberpunk interface.

---

## [02] LANGUAGES & TECHNICAL STACK

The entire application is engineered from scratch using vanilla, lightweight web technologies to guarantee maximum performance, strict security, and zero dependency bloat:

### 1. HTML5 (Semantic & Accessible Structure)
- **Architecture**: Modular, semantic document structure organized into distinct terminal modules (HUD Navigation, Operative Dossier, Capability Matrix, Field Operations, Experience Logs, and Contact Gateway).
- **Zero Third-Party Component Frameworks**: Completely free of bloated JavaScript frameworks or component libraries, ensuring near-instantaneous load times and minimal DOM overhead.
- **Embedded Document Security**: Sandboxed credential preview utilizing native PDF rendering attributes (`#toolbar=0&navpanes=0`) with context-menu suppression.

### 2. Modern CSS3 (Cyberpunk HUD Engine)
- **Design System**: Comprehensive palette of custom CSS variables defining neon cyan, magenta, warning yellow, and deep terminal void colors.
- **Responsive Layout**: Fluid CSS Grid and Flexbox implementations designed to adapt seamlessly across ultra-wide monitors, laptops, tablets, and mobile devices without horizontal overflow.
- **Procedural Cyber Aesthetics**: Hardware-accelerated CSS keyframe animations for CRT scanlines, terminal text glows, dynamic decryptor highlights, and angled polygonal clipping paths (`clip-path: polygon(...)`).
- **Zero CSS Frameworks**: Built without Bootstrap, Tailwind, or external UI bundles—100% custom stylesheet architecture.

### 3. JavaScript (Vanilla ES6+)
- **Interactive Terminal Engine**: Lightweight DOM manipulation script (`js/main.js`) powering dynamic UI interactions without runtime dependencies.
- **Procedural Audio Synthesizer**: Uses the native browser **Web Audio API** (`AudioContext`) to generate retro 8-bit interface sound effects entirely through mathematical waveforms (sine, square, triangle oscillators), eliminating external audio asset requests.
- **Dynamic Decryptor / Typewriter**: Cycles through key technical specializations with timed string slicing and terminal cursor emulation.
- **Asynchronous Dispatch**: Handles asynchronous form submissions via the Fetch API with dynamic response handling and status banner updates.

### 4. Vector Graphics (SVG)
- **Zero Emoji Dependencies**: Every icon, shield, radar, terminal prompt, and interface marker is rendered using bespoke, lightweight SVG vector paths for crisp rendering at any resolution.

---

## [03] SECURITY POSTURE & PRIVACY ENGINEERING

As a portfolio representing cybersecurity expertise, the site is built to reflect defensive engineering best practices:

- **Strict Content Security Policy (CSP)**: Enforced via document metadata restricting script execution to self, strictly scoping stylesheet/font origins, and tightly whitelisting API communication endpoints.
- **Zero Server-Side Attack Surface**: Hosted as a static JAMstack site on GitHub Pages. With no database or server-side runtime, traditional vulnerabilities such as SQL injection, server-side remote code execution (RCE), and Insecure Direct Object References (IDOR) are inherently eliminated.
- **Privacy-Preserving Contact Form**: User inquiries are dispatched to an external relay service via an authenticated API key. This delivers verified messages directly to Brandon's inbox while ensuring his personal email address is never disclosed in the client-side code.
- **Defensive Input Handling**:
  - **Anti-Bot Honeypot**: Hidden trap field that silently discards automated crawler submissions.
  - **Client-Side Cooldown Limiter**: Enforces a submission rate limit to mitigate rapid flood attacks.
  - **ASCII Control Character Stripping & Entity Encoding**: Incoming string payloads are sanitized by stripping non-printable control characters and encoding HTML entities before transmission.

---

## [04] NOTICE AGAINST COPYING & INTELLECTUAL PROPERTY

All original text content, biographical details, curriculum vitae documentation, project descriptions, and custom aesthetic designs contained within this repository are the personal intellectual property of **Brandon Noble**.

This repository is made public exclusively for portfolio presentation, recruiter review, and technical verification. 

**Please do not copy, scrape, clone, or reproduce this website, its design, or its written contents for other portfolios or commercial projects.**
