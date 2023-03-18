# GitHub Action — Get the Flutter Version Environment

This GitHub Action (written in composite run steps) allows you to leverage GitHub Actions to get the [Flutter](https://flutter.dev) environment version from the pubspec file. This is primarily used before using the [Flutter action](https://github.com/marketplace/actions/flutter-action).

## Usage
### Pre-requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#common-workflow) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
For more information on this input, see the [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstepswith)

* `pubspec-file-path`: The pubspec.yaml file path. Optional. Default: `pubspec.yaml`

### Outputs
For more information on this output, see the [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions#jobsjob_idoutputs) and the [Context and expression syntax for GitHub Actions](https://docs.github.com/actions/reference/context-and-expression-syntax-for-github-actions#steps-context)

* `version`: The Flutter version

### Common workflow

1. Your `pubspec.yaml` file must contain the Flutter version under the `environment:flutter:` key. For example:
```yaml
environment:
  flutter: 1.22.4
```
2. Use the action's output as an input to [Flutter action](https://github.com/marketplace/actions/flutter-action). For example:
```yaml
on: push

name: Sample Workflow

jobs:
  build:
    name: Example
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Get Flutter version
        id: get-flutter-version
        uses: zgosalvez/github-actions-get-flutter-version-env@v2
      - name: Set up Flutter
        uses: subosito/flutter-action@v1
        with:
          flutter-version: ${{ steps.get-flutter-version.outputs.version }}
```

## Shout-out
A special mention goes to [@daohoangson](https://github.com/daohoangson), who came up with the initial solution at [subosito/flutter-action/issues/47#issuecomment-675821988](https://github.com/subosito/flutter-action/issues/47#issuecomment-675821988).

### Flutter Workflows

This is used in my opinionated [GitHub Actions: Flutter Workflows](https://github.com/zgosalvez/github-actions-flutter-workflows) repository along with other actions for a complete end-to-end DevOps experience.

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE.md)
