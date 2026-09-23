<div align="center">
  <img src="src/assets/envboot.png" alt="EnvBoot Logo" width="96" />
  <h1>EnvBoot Docs</h1>
  <p>Source for the <a href="https://ashishrbuilds.github.io/envboot-core/">EnvBoot documentation site</a> — built with React + Vite, deployed to GitHub Pages.</p>

  <a href="https://ashishrbuilds.github.io/envboot-core/">
    <img src="https://img.shields.io/badge/docs-live-4f46e5?style=flat-square&logo=github" alt="Live Docs" />
  </a>
  <a href="https://www.npmjs.com/package/envboot">
    <img src="https://img.shields.io/npm/v/envboot?style=flat-square&logo=npm&color=cb3837" alt="npm" />
  </a>
  <a href="https://github.com/ashishrbuilds/envboot-core/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/ashishrbuilds/envboot-core/deploy.yml?style=flat-square&label=deploy" alt="Deploy status" />
  </a>
  <a href="https://github.com/ashishrbuilds/envboot/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/envboot?style=flat-square" alt="License" />
  </a>
</div>

---

## 🔗 Links

| Resource | URL |
|----------|-----|
| 📖 Live Documentation | https://ashishrbuilds.github.io/envboot-core/ |
| 📦 npm Package | https://www.npmjs.com/package/envboot |
| 🛠️ Package Source | https://github.com/ashishrbuilds/envboot |

---

## 🚀 Getting Started Locally

```bash
# Clone this repo
git clone https://github.com/ashishrbuilds/envboot-core.git
cd envboot-core

# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev
```

---

## 🏗️ Build

```bash
npm run build   # Output in ./dist
npm run preview # Preview the production build locally
```

---

## 🚢 Deployment

The site deploys automatically to [GitHub Pages](https://pages.github.com/) via GitHub Actions on every push to `main` **or** when a version tag is pushed:

```bash
# Create and push a release tag — triggers deploy + GitHub Release
git tag v1.0.0
git push origin v1.0.0
```

The workflow lives at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

---

## 📁 Project Structure

```
envboot-core/
├── public/             # Static assets (robots.txt, sitemap.xml, 404.html, llms.txt)
├── src/
│   ├── assets/         # Bundled assets (logo, images)
│   ├── components/     # Shared UI components (Navbar, Sidebar, Footer, ThemeToggle…)
│   ├── context/        # React contexts (ThemeContext)
│   ├── pages/          # Route-level page components
│   └── App.tsx         # Root router
├── vite.config.ts
└── .github/workflows/
    └── deploy.yml      # CI/CD pipeline
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to open a PR or issue on this repo.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/ashishrbuilds">@ashishrbuilds</a>
</div>
