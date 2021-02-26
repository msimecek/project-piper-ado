import taskLib = require('azure-pipelines-task-lib/task');
import toolLib = require('azure-pipelines-tool-lib/tool');
import fs = require('fs');

async function run() {
    try {
        // Check if running on Linux - piper binary is linux only.
        
        const command: string | undefined = taskLib.getInput('command', true);
        const flags: string | undefined = taskLib.getInput('flags');
        const version: string | undefined = taskLib.getInput('piperVersion');
        
        const piperPath = await toolLib.downloadTool(getDownloadUrl(version));
        
        fs.chmodSync(piperPath, 0o775)

        await taskLib.exec(piperPath, "version");
        let result = await taskLib.exec(piperPath, `${command} ${flags}`);

        if (result != 0) {
            taskLib.setResult(taskLib.TaskResult.Failed, "Piper execution returned non-zero code.");
        }
    }
    catch (err) {
        taskLib.setResult(taskLib.TaskResult.Failed, err.message);
    }
}

function getDownloadUrl(version?: string) {
    if (!version) {
        throw new Error("Version is undefined.");
    }
    
    const commonUrlPrefix = 'https://github.com/SAP/jenkins-library/releases'
    if (version === 'latest') {
      console.log("Downloading latest release of piper")
      return `${commonUrlPrefix}/latest/download/piper`
    } else if (version === 'master') {
      console.log("Downloading latest build of master branch of piper")
      return `${commonUrlPrefix}/latest/download/piper_master`
    } else if (/^v\d+\./.test(version)) {
      console.log(`Downloading version ${version} of piper`)
      return `${commonUrlPrefix}/download/${version}/piper`
    } else {
      console.log(`WARN: ${version} was not recognized as valid piper version, downloading latest release`)
      return `${commonUrlPrefix}/latest/download/piper`
    }
  }

run();