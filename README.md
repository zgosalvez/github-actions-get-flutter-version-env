# GitHub Action — Get the Flutter Version Environment

This GitHub Action (written in composite run steps) allows you to leverage GitHub Actions to get the [Flutter](https://flutter.dev) environment version from the pubspec file. This is primarily used before using the [Flutter action](https://github.com/marketplace/actions/flutter-action).

## Usage
### Pre-requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#common-workflow) is available below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
* `pubspec-file-path`: The pubspec.yaml file path. Optional. Default: `pubspec.yaml`

### Outputs
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
        uses: zgosalvez/github-actions-get-flutter-version-env@v1
        with:
          pubspec-file-path: app/pubspec.yaml
      - name: Set up Flutter
        uses: subosito/flutter-action@v1
        with:
          flutter-version: ${{ steps.get-flutter-version.outputs.version }}
```

## Shout-out
A special mention goes to [@daohoangson](https://github.com/daohoangson), who came up with the solution at [subosito/flutter-action/issues/47#issuecomment-675821988](https://github.com/subosito/flutter-action/issues/47#issuecomment-675821988).

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
