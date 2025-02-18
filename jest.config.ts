export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
    },
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1"
    },
    extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
};