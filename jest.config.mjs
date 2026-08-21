// Configuration Jest — jeromemarichez-fr
// Unitaire : tests/unitaire/**  —  Intégration : tests/integration/**
//
// L'environnement par défaut est `jsdom` : la quasi-totalité du code testable est du
// rendu React. Un test qui a besoin de Node (script, service pur) le déclare fichier
// par fichier avec `@jest-environment node` en tête.

/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/tests/unitaire/**/*.(test|spec).ts?(x)',
    '**/tests/integration/**/*.(test|spec).ts?(x)',
    '**/tests/systeme/**/*.test.ts',
  ],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      { tsconfig: { jsx: 'react-jsx', esModuleInterop: true, module: 'commonjs' } },
    ],
  },
  moduleNameMapper: {
    // Les modules CSS n'ont pas de sens hors navigateur : chaque classe demandée rend
    // son propre nom, ce qui suffit à vérifier qu'un composant applique la bonne.
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': '<rootDir>/tests/fixtures/style-vide.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  coverageThreshold: {
    global: { branches: 80, functions: 80, lines: 80, statements: 80 },
  },
}
