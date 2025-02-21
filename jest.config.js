module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    "^react-router-dom$": require.resolve("react-router-dom"),
    '^@/(.*)$': '<rootDir>/src/$1',
    "^react$": "<rootDir>/node_modules/react"
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
  "src/**/*.{js,jsx,ts,tsx}",
  "!src/index.tsx",
  "!src/reportWebVitals.ts",
  "!src/setupTests.ts"
],
  coverageDirectory: 'coverage',
  coverageReporters:[ "lcov", "text",],
  moduleDirectories: ["node_modules", "src"],
  testResultsProcessor: "jest-sonar-reporter",
  coveragePathIgnorePatterns: [
    "/node_modules/",
  "src/index.tsx",
  "src/reportWebVitals.ts",
    '/src/react-app-env.d.ts',
  ],

};