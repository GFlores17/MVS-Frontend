<a name="readme-top"></a>

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555)](https://www.linkedin.com/in/mvsflores/)

<br />
<div align="center">
  <h3 align="center">MyVinylStats</h3>
  <p align="center">
    An interactive vinyl collection logging app — track your records, log play sessions, and explore your full listening history.
    <br />
    <a href="https://myvinylstats.com"><strong>View Live App »</strong></a>
    <br />
    <br />
    <a href="https://myvinylstats.com">Live Demo</a>
    ·
    <a href="https://github.com/gflores17/myvinylstats/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/gflores17/myvinylstats/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

---

## Table of Contents

1. [About The Project](#about-the-project)
   - [Built With](#built-with)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Usage](#usage)
4. [Architecture](#architecture)
5. [Roadmap](#roadmap)
6. [Contact](#contact)

---

## About The Project

[![MyVinylStats Screenshot](https://via.placeholder.com/800x400?text=MyVinylStats+Screenshot)](https://myvinylstats.com)

MyVinylStats is built for vinyl collectors who want more than a static spreadsheet. It connects to your Discogs collection and lets you log every play session, building a timestamped listening history over time. The goal is a fast, repeatable logging experience — open the app, log the record, done.

**Key highlights:**
- One-action play session logging with full listening history
- Live collection data pulled from the Discogs REST API
- Secure per-user authentication via OAuth 2.0
- Production backend monitored with Prometheus & Grafana
- Fully automated deployments via GitHub Actions CI/CD

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### Built With

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)
[![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)](https://prometheus.io/)
[![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)](https://grafana.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started

This repo contains the React frontend only. Follow the steps below to run it locally.

### Prerequisites

- Node.js and npm installed
- A running instance of the MyVinylStats backend *(private)*
- A Discogs account with API credentials

```bash
npm install npm@latest -g
```

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/gflores17/myvinylstats.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file in the root and add your environment variables
   ```
   REACT_APP_API_URL=your_backend_url
   REACT_APP_DISCOGS_KEY=your_discogs_key
   ```
4. Start the development server
   ```bash
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Usage

- **Log a play session** — select a record from your collection and log it in one action
- **View listening history** — browse your full play history sorted by date
- **Collection sync** — your Discogs collection stays up to date via the REST API integration
- **Secure login** — authenticate with your Discogs account via OAuth 2.0

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Architecture

MyVinylStats is a full-stack application split across two repositories — this public frontend and a private backend.

| Layer | Technology |
|---|---|
| Frontend | React, JavaScript, HTML, CSS |
| Backend | Node.js, Express, MongoDB *(private repo)* |
| API Integration | Discogs REST API |
| Authentication | OAuth 2.0 |
| Storage | AWS S3 |
| Monitoring | Prometheus, Grafana |
| CI/CD | GitHub Actions → SSH deploy to Hostinger |

The backend is instrumented with Prometheus to track HTTP request rates, error rates, and response times across all API endpoints. Grafana dashboards provide real-time observability into service health. Every merge to `main` on the frontend triggers an automated GitHub Actions workflow that SSH-deploys to production.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Roadmap

- [ ] Mobile-optimized UI
- [ ] Play session statistics and charts
- [ ] Genre and decade breakdowns
- [ ] Social listening history sharing

See the [open issues](https://github.com/gflores17/myvinylstats/issues) for a full list of proposed features and known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Contact

George Flores — [georgeflores@myvinylstats.com](mailto:georgeflores@myvinylstats.com)

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555)](https://linkedin.com/in/georgeflores)
[![Portfolio](https://img.shields.io/badge/Portfolio-emperorstudios.net-informational?style=for-the-badge)](https://emperorstudios.net)

Project Link: [https://github.com/gflores17/myvinylstats](https://github.com/gflores17/myvinylstats)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
