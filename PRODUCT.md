# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React with React Router (Vite + React Router SPA / static export deployed to GitHub Pages)

## Users

JavaScript and TypeScript software engineers, devops engineers, and open-source developers managing environment variables across local dev, CI/CD pipelines, and runtime deployments.

## Product Purpose

The official documentation portal for `envboot`, an open-source npm package providing zero-runtime-dependency environment contracts and validation for JavaScript and TypeScript projects. The documentation enables developers to quickly install, configure `.envboot.json`, inject startup guards, automate CI drift detection, and integrate across runtimes (Node.js, Bun, Deno).

## Positioning

Zero-runtime-dependency environment contract and validation tool. Unlike heavy schema libraries or manual checks, `envboot` provides zero-dep startup guards, CI/CD drift protection, diagnostic health checks (`envboot doctor`), contract synchronization (`envboot sync`), and multi-runtime compatibility out of the box.

## Operating Context

- Web documentation site deployed statically to GitHub Pages.
- Readers consult docs while setting up new repositories, configuring CI pipelines (e.g., GitHub Actions), or troubleshooting environment startup errors.
- Integrates with modern package managers (npm, pnpm, yarn, bun, deno) and frameworks (Next.js, Vite, Express, Fastify, NestJS).

## Capabilities and Constraints

- Deployed to GitHub Pages via static site export.
- Built with Vite, React, and React Router.
- Must document core CLI commands (`envboot init`, `envboot check`, `envboot doctor`, `envboot sync`), runtime API (`envboot.init()`, `envboot.validate()`), configuration format (`.envboot.json`), and CI/CD workflow recipes.

## Brand Commitments

- Name: `envboot`
- Repository: `https://github.com/ashishrbuilds/envboot`
- Package: `envboot` on npm
- Maintainer: Ashish Ranjan & EnvBoot Contributors
- License: MIT

## Evidence on Hand

- Published npm package `envboot@0.1.7` (pending release/publish).
- Official GitHub repository (`ashishrbuilds/envboot`) with complete README, CLI specifications, terminal output fixtures, runtime API signatures, and framework compatibility list.

## Product Principles

1. **Immediate utility**: Instant, copyable commands for all major package managers (npm, pnpm, bun, yarn, deno) right upfront.
2. **Zero-runtime-dependency alignment**: Clean, fast, unbloated documentation experience mirroring the tool's core philosophy.
3. **Verified recipes**: Real, working code snippets for frontend (Vite/React/Next.js), backend (Express/NestJS), and CI/CD (GitHub Actions).
4. **Scannable hierarchy**: Clear navigation across Quickstart, CLI Commands, Runtime API, Framework Guides, and CI/CD Integration.
