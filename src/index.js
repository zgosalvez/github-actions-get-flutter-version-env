const core = require('@actions/core');
const fs = require('fs');
const yaml = require('yaml');

async function run() {
  try {
    const pubspecFilePath = core.getInput('pubspec-file-path');
    const fileContents = fs.readFileSync(pubspecFilePath, 'utf8');
    const yamlContents = yaml.parse(fileContents);
    const environment = yamlContents['environment'];

    if (environment === undefined) {
      throw Error(`The $pubspecFilePath does not contain an "environment" key.`);
    }

    if (environment === null) {
      throw Error(`The $pubspecFilePath does not contain a value for the "environment" key.`);
    }

    const flutter = environment['flutter'];

    if (flutter === undefined) {
      throw Error(`The $pubspecFilePath does not contain a "flutter" key.`);
    }

    core.setOutput('version', flutter);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();