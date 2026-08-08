// Configuration Jest — front jeromemarichez2026
// Unitaire : tests/unitaire/**  —  Intégration : tests/integration/**
//
// Les tests front rendent des composants React (React Testing Library) : ils ont
// besoin d'un DOM, d'où « jsdom » et non « node » (le back, lui, reste en node).
//
// La transformation passe par next/jest, fourni avec Next.js — aucune dépendance
// supplémentaire. Il compile TypeScript/JSX avec SWC (le compilateur du build),
// lit les alias de tsconfig.json, et surtout RÉSOUT les imports « *.module.css »
// vers son proxy d'objet : « styles.card » renvoie la chaîne « card ». La
// résolution vient donc de la configuration, jamais d'une doublure de module
// écrite à la main. Référence : docs/testing.md.
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/tests/unitaire/**/*.(test|spec).ts?(x)',
    '**/tests/integration/**/*.(test|spec).ts?(x)',
    '**/tests/systeme/**/*.test.ts',
  ],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 },
  },
}

export default createJestConfig(config)
