# ⚡ CYBERPUNK HUD PORTFOLIO & CV LANDING PAGE

> High-octane, interactive cyberpunk/sci-fi themed personal portfolio and landing page engineered for CVs, LinkedIn profiles, and job applications.

---

## 🚀 Overview & Features

- **Cyberpunk HUD Aesthetics**: Authentic neon cyan & magenta glow, CRT scanlines, subtle grid overlay, sci-fi clipped-corner polygonal cards, and glitch headline effects.
- **Employer & LinkedIn Focused**:
  - Direct callouts for your CV/resume download (`assets/resume.pdf`).
  - Clear LinkedIn profile integration and social channels.
  - Tactical metrics display (years of experience, uptime/reliability, code readiness).
  - Career Mission Logs timeline for work history.
  - Technical Specifications breakdown with visual skill indicators.
- **Interactive Cyber Terminal**:
  - Employers can test an interactive terminal CLI in their browser.
  - Supports commands: `help`, `skills`, `projects`, `experience`, `contact`, `hire`, `matrix`, `clear`.
- **Pure Zero-Dependency Stack**:
  - 100% Vanilla HTML5, CSS3, and JavaScript.
  - Zero build step required — runs instantly in any browser, GitHub Pages, Vercel, or Netlify.
  - Built-in Web Audio API synthesizer for retro click/beep SFX without downloading external audio files.

---

## 📂 File Architecture

```
cyberpunk-portfolio/
├── index.html         # Main landing page markup & sections
├── css/
│   └── cyberpunk.css  # Cyberpunk styling, glitch animations, responsive design
├── js/
│   └── main.js        # Typewriter engine, terminal CLI, audio synthesizer
├── assets/            # Drop your resume.pdf and profile avatar here
├── .gitignore
└── README.md
```

---

## 🛠️ Personalization Checklist

1. **Identity & Name**: Update `"YOUR NAME"` in `index.html` (Hero title and Operative ID in the header).
2. **Social & Links**: Replace `https://linkedin.com/in/yourprofile` and `https://github.com/yourusername` with your real profile URLs.
3. **Resume / CV**: Place your PDF file at `assets/resume.pdf`.
4. **Bio & Experience**: Customize the role titles, company names, and dates in Module 04 (`#mission-logs`).
5. **Projects**: Add your live links and GitHub repositories in Module 03 (`#directives`).
