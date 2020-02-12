module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  snapshotSerializers: ['enzyme-to-json/serializer']
};
