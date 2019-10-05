module.exports = {
    roots: ['<rootDir>/packages'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    setupTestFrameworkScriptFile: '<rootDir>jest/setupTests.ts',
};
