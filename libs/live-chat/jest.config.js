module.exports = {
  name: 'live-chat',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/live-chat',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
