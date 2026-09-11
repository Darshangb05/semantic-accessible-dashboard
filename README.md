# Accessibility Baseline & Repository Architecture Audit

## Project
Accessible full-stack foundation created from an audit of the public-facing **National Portal of India** (`https://www.india.gov.in/`).

## Goal
This repository demonstrates:

1. A Lighthouse-based accessibility/performance audit workflow.
2. A keyboard-only navigation audit workflow.
3. Documentation of five audit findings with evidence and remediation priority.
4. A maintainable monorepo-style structure.
5. A setup-ready first vertical feature slice: an accessible government-service directory.

> Important: Lighthouse scores and manual findings must be filled from the actual audit run and screenshots. Do not invent scores.

## Repository structure

```text
accessibility-baseline-audit/
├── client/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── server/
│   ├── package.json
│   └── src/
│       ├── server.js
│       └── data/
│           └── services.js
├── docs/
│   ├── architecture.md
│   ├── audit-report.md
│   ├── keyboard-audit.md
│   └── evidence-log.md
├── test/
│   └── api.test.js
├── screenshots/
│   └── README.md
├── .gitignore
└── README.md
```

## Local setup

### 1. Start the server

```bash
cd server
npm install
npm start
```

The application runs at:

```text
http://localhost:3000
```

### 2. Run tests

```bash
cd server
npm test
```

## Audit target

Target website:

- National Portal of India: https://www.india.gov.in/
- GIGW accessibility guidance: https://guidelines.india.gov.in/accessibility-guidelines-and-attributes/

GIGW 3.0 references WCAG 2.1 and specifically covers keyboard operation, focus order, headings/labels, search/navigation, consistent navigation, and programmatic names/roles/states.

## Lighthouse workflow

Run Chrome DevTools Lighthouse against:

```text
https://www.india.gov.in/
```

Recommended:
- Mode: Navigation
- Device: Mobile
- Category: Accessibility
- Also capture Performance, Best Practices and SEO if the worksheet asks for them.

Save the Lighthouse screenshot in:

```text
screenshots/lighthouse.png
```

Record the exact score and failed audits in `docs/audit-report.md`.

## Keyboard workflow

Use only:
- Tab
- Shift + Tab
- Enter
- Space
- Arrow keys where expected
- Esc where expected

Record:
- Whether every interactive element receives visible focus.
- Whether focus order is logical.
- Whether menus/dialogs can be opened and exited without a mouse.
- Whether there is a keyboard trap.
- Whether important controls are reachable.

Save evidence screenshots in:

```text
screenshots/
```

## First vertical feature slice

The starter application demonstrates:

```text
Browser
  ↓
Accessible Service Directory UI
  ↓
GET /api/services
  ↓
Node HTTP API
  ↓
In-memory service data
```

The client includes:
- semantic landmarks
- skip link
- labelled search field
- keyboard-accessible controls
- visible focus styles
- status messaging
- responsive layout
- no-JavaScript fallback message

## Important submission note

The audit report intentionally contains fields for actual Lighthouse scores and observed keyboard behavior. Fill these from your own audit/worksheet before submitting. This prevents unsupported or fabricated audit claims.
