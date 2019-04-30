module.exports = {
  name: 'resume-ui',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/resume-ui',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
