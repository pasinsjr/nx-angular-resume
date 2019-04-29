module.exports = {
  name: 'resume-profile',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/resume/profile',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
