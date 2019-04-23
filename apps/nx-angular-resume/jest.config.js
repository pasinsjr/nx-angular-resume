module.exports = {
  name: "nx-angular-resume",
  preset: "../../jest.config.js",
  coverageDirectory: "../../coverage/apps/nx-angular-resume/",
  snapshotSerializers: [
    "jest-preset-angular/AngularSnapshotSerializer.js",
    "jest-preset-angular/HTMLCommentSerializer.js"
  ]
};
