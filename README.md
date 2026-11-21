# BRANDON NOBLE // CYBERSECURITY & DEFENSIVE SYSTEMS

> Personal technical portfolio, offensive/defensive lab repository, and verified CV landing page for **Brandon Noble**, 4th-Year BSc in Cybersecurity undergraduate at Technological University Dublin (TU Dublin) — Expected Graduation: 2027.

**Live Deployment**: [https://tudbrandon.github.io/cyberpunk-portfolio/](https://tudbrandon.github.io/cyberpunk-portfolio/)  
**LinkedIn**: [https://www.linkedin.com/in/brandon-noble-cybersec](https://www.linkedin.com/in/brandon-noble-cybersec)  
**GitHub**: [https://github.com/TUDBrandon](https://github.com/TUDBrandon)  

---

## [01] TECHNICAL PROFILE & CAPABILITIES

- **Academic Standing**: 4th-Year BSc in Cybersecurity at Technological University Dublin (TU Dublin). Expected completion: 2027.
- **Defensive Operations (Blue Team)**: Hands-on SIEM deployment and log ingestion (Splunk, ELK Stack), security telemetry correlation, alert triage, network packet analysis with Wireshark/tcpdump, and adversary technique mapping to the MITRE ATT&CK framework.
- **Offensive Testing & Cryptanalysis (Red Team)**: Kali Linux tooling, penetration testing methodologies, 802.11 wireless frame auditing (WEP/WPA2-PSK), Nmap recon, Burp Suite intercepting proxy, and password analysis.
- **Purple Team & Collaborative Security**: Translating offensive findings into defensive detections, firewall filtering rules, and mitigation strategies. Foundational understanding of the Secure Software Development Life Cycle (S-SDLC).
- **Competitions & Field Operations**:
  - Regular competitor in Ireland's premier collegiate and industry CTFs: **ZeroDays CTF** and the **ECSO Road2Cyber CTF**, supplemented by structured labs on TryHackMe and Hack The Box.
  - Active participant in **GiveaGo hackathons** and **Computing Society hackathons**.
  - Regular attendee at Ireland's premier security conferences: **IRISSCON** (Irish Information Security Conference) and the **Renaissance CyberExpo**.
  - Practical lab-based skill advancement via **PortSwigger Web Security Academy**, **Cisco Networking/Cybersecurity** pathways, and virtualized **Cyber Ranges**.
- **Industry Certifications**:
  - **NVIDIA Deep Learning Institute (DLI)** — *Fundamentals of Deep Learning* (Verified Credential viewable in portfolio).

---

## [02] FEATURED TECHNICAL LABS & RESEARCH

### 1. T-Pot Multi-Honeypot Telemetry & Threat Analysis
- **Architecture**: Deployed a virtualized T-Pot honeypot cluster collecting external attack telemetry continuously across an exposed network over a two-week window.
- **Analysis**: Forwarded raw logs and daemon events into the ELK Stack (Elasticsearch, Logstash, Kibana) and Splunk for threat identification, event aggregation, and geographic query profiling.
- **Findings**: Extracted concrete evidence of automated brute-force attacks, scanner sweeps, and active exploitation by the **Mirai**, **Outlaw**, and **RedTail** botnets, alongside payload signatures for **WannaCry** ransomware and **ZombieBoy** cryptomining malware.

### 2. 802.11 Wireless Recon & Password Cracking Testbed
- **Architecture**: Isolated physical testbed using a dedicated home wireless router configured to broadcast legacy and modern 802.11 authentication mechanisms.
- **Attacks Executed**:
  - **WEP**: Captured RC4 initialization vectors (IVs) to execute statistical and algebraic cryptanalysis (FMS, KoreK, PTW) using `aircrack-ng` to mathematically reconstruct cryptographic keys.
  - **WPA/WPA2-PSK**: Forced targeted de-authentication packets using `aireplay-ng` to isolate the 4-way EAPOL handshake, captured raw key material with `airodump-ng`, and performed dictionary and rule-based cracking against offline hashes.

### 3. Cross-Platform SSD Secure Deletion Forensics (Thesis Research)
- **Collaborative Project**: Conducted with 2 peers to rigorously evaluate the efficacy of OS-level secure file deletion tools across Linux, Windows, and macOS file systems on Solid State Drives.
- **Key Technical Distinction**: Analyzed the physical storage divergence between traditional HDDs and modern NAND flash memory. Documented how the **Flash Translation Layer (FTL)**, dynamic wear-leveling algorithms, and over-provisioned blocks prevent OS-issued deletion commands (e.g., `srm`, multi-pass overwrites, cipher utilities) from guaranteeing physical block erasure without low-level cryptographic erase or ATA Secure Erase commands.

### 4. Secure Web Systems Engineering & Architecture
- **Projects**:
  - **Mock CeX-style E-Commerce Platform**: Multi-tier architecture featuring role-based access control (RBAC), parameterized queries, server-side validation, and mitigations against OWASP Top 10 vulnerabilities.
  - **Commercial Business Landing Page**: High-performance, clean, compliant landing page with secure contact workflows.
  - **This Portfolio (`NET.RUNNER`)**: Hardened, serverless JAMstack architecture operating under a strict Content Security Policy (CSP), client-side anti-bot honeypots, input sanitization, and rate limiting.

---

## [03] ARCHITECTURE & SECURITY POSTURE

```
[ Visitor / Browser ] 
         |
         v
[ GitHub Pages (Static Hosting) ] 
   - Strict Content Security Policy (CSP)
   - Zero Server-Side Attack Surface (No SQLi, RCE, or IDOR)
   - Read-Only Distribution
         |
         +--> [ Contact Gateway: Web3Forms API ]
         |       - Verified Access Key (Zero Client Email Disclosure)
         |       - Anti-Bot Honeypot Trap
         |       - Client-Side Cooldown Rate-Limiter (10s)
         |       - Strict HTML Entity Encoding & ASCII Sanitization
         |
         +--> [ Verified Credential Viewer Modal ]
                 - Inline Sandboxed PDF Rendering
                 - Native Toolbar/Navpane Suppression (#toolbar=0)
                 - Context-Menu Suppression
```

---

## [04] REPOSITORY GOVERNANCE & PULL REQUEST POLICY

This repository is an **official, personal technical portfolio and academic record** maintained exclusively by Brandon Noble.

- **Public Inspection**: The codebase is public to facilitate technical audits, code review, and recruiter verification.
- **Pull Request Policy**: **STRICTLY CLOSED TO PULL REQUESTS.** Unsolicited pull requests, feature branches, automated dependency bot PRs, and third-party contributions will be closed without review.
- **Issues**: Issue tracking is limited to legitimate vulnerability disclosures and bug reports.

---

## [05] INTELLECTUAL PROPERTY & PROPRIETARY RIGHTS NOTICE

Copyright (c) 2024-2027 Brandon Noble. All rights reserved.

- **Personal Brand & Identity**: The text content, curriculum vitae (`assets/BrandonNoble_CV.pdf`), project descriptions, credentials, research write-ups, and personal likeness contained within this repository are the exclusive intellectual property of Brandon Noble.
- **Restrictions**: Unauthorized copying, scraping, mirroring, commercial reproduction, or re-branding of this portfolio under another identity is strictly prohibited.
- **Underlying Code License**: The custom cyberpunk layout CSS and interactive UI scripts may be referenced for educational inspection only.
