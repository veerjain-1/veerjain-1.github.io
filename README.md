<div align="center">

# 🌐 Veer Jain — Personal Portfolio & Interactive AI

[![Live Site](https://img.shields.io/badge/Live_Site-veerjain--1.github.io-0ea5e9?style=for-the-badge&logo=react&logoColor=white)](https://veerjain-1.github.io/)
[![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

Personal portfolio and interactive engineering showcase built with React, Vite, Framer Motion, and a custom interactive AI assistant.

[Explore Live Demo →](https://veerjain-1.github.io/)

</div>

---

## 🚀 Features

- **Interactive AI Chatbot (`Chat with Veer.ai`)**: Floating AI companion capable of answering questions about technical experience, projects, skills, and background in real time.
- **Dynamic Project Demos**: Interactive lightbox video & GIF walkthroughs for featured systems (`code-anomaly-engine`, `av-drive-triage`, `agentic-cicd-orchestrator`, `finance-slm-rag`).
- **Responsive Dark-Mode Mesh UI**: Custom glassmorphism, animated mesh background gradients, and micro-interactions powered by Tailwind CSS and Framer Motion.
- **Automated GitHub Pages Deployment**: Continuous deployment with Vite single-page application routing.

---

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router](https://reactrouter.com/) (HashRouter for seamless GitHub Pages routing)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom dark mesh gradients
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) (FontAwesome, SimpleIcons)

---

## 🏃 Local Development

```bash
# Clone the repository
git clone https://github.com/veerjain-1/veerjain-1.github.io.git
cd veerjain-1.github.io

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Visit `http://localhost:5173` to view the site locally.

---

## 📦 Build & Deployment

```bash
# Production bundle
npm run build

# Preview build locally
npm run preview
```

Automated deployments push the `dist/` bundle directly to GitHub Pages.

## Chatbot analytics

Veer.ai uses the existing GA4 property (`G-EJX46WQQH7`). It sends fixed categories and timing only; questions, replies, system prompts, and raw errors are never included in analytics. The existing `ignore_analytics` local-storage opt-out and GA disable flag are respected. Blocking analytics does not interrupt chat.

| Event | Meaning |
| --- | --- |
| `chatbot_open` | Closed chat becomes open; source is launcher or page CTA |
| `chatbot_message_sent` | A non-empty message is accepted for a request |
| `chatbot_reply_success` | HTTP success contains a non-empty visible reply |
| `chatbot_error` | HTTP, network, invalid response, empty response, or 30-second timeout |
| `chatbot_prompt_click` | An enabled suggested prompt is selected |

Event parameters: `chatbot_topic` (experience, projects, skills, education, contact, personal, other), `chatbot_source` (launcher, page_cta, typed, suggestion), `chatbot_prompt` (fixed suggestion ID), `chatbot_error_type` (fixed error category), and `chatbot_response_time_ms` (milliseconds from sending to a parsed reply or failure).

Register the four categorical parameters as event-scoped custom dimensions in GA4 Admin → Custom definitions, and the response-time parameter as a custom metric with milliseconds as its unit. Event counts are available by event name; use an Exploration filtered to event names beginning with `chatbot_` for topic and prompt breakdowns. Divide total response-time milliseconds by the count of the same reply/error events to calculate an average. Filter to `chatbot_reply_success` when measuring successful reply latency.

Topic classification uses local keyword rules and is approximate. Message counts measure attempts, not delivered replies. Analytics blockers and opt-outs can cause undercounting. Tracking starts after deployment and does not reconstruct old activity.

Run `npm test`, `npm run build`, and `npm run lint` to validate changes. Request tests use mocked Gemini responses and do not consume API quota.
