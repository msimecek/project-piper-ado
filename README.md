# Project "Piper" Azure DevOps task

> This custom task is based on the [Project "Piper" GitHub Action](https://github.com/SAP/project-piper-action).

Adaptation of SAP tooling for continuous delivery ([project Piper](https://sap.github.io/jenkins-library/)) for Azure DevOps in the form of a custom task.

## Usage

This task is using the Piper executable which currently runs on **Linux only**. Make sure your build agent is Linux-based.

If you want to sideload this task for your organization only, follow the official guide on publishing ADO extensions [from step 5](https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops#step-5-publish-your-extension).

1. Use [tfx-cli](https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops#cli) to package the extension into a `.vsix` file.
1. Create a publisher at the [Visual Studio Marketplace Publishing Portal](https://marketplace.visualstudio.com/manage).
1. Update publisher in `vss-extension.json`.
1. Upload the `.vsix` file that was generated earlier (or use `tfx extension publish`).
1. Share the extension with the organization where you want to use it.
1. Go to https://dev.azure.com/<organizatio name>/_settings/extensions?tab=shared
1. Click the Project Piper task extension and **Install** it for your organization.

Then you should be able to use the task in your pipelines.

```yaml
- task: project-piper-task@1
  inputs:
    command: 'help'
```