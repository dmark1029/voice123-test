module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.vue$': 'vue3-jest',
    '^.+\\.ts$': 'ts-jest',
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ['js', 'ts', 'vue', 'json'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
