/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "node",
    testPathIgnorePatterns: ["e2e"], // ignore playwright tests
}
