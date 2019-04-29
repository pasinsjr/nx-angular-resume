module.exports = {
  name: 'resume-dashboard',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/resume/dashboard',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
