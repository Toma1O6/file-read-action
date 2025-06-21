const actions = require('@actions/core');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function main() {
    try {
        const filePath = actions.getInput('file');
        const fileEncoding = actions.getInput('encoding');

        const fileContent = await readFile(filePath, fileEncoding);

        const content = postProcessFileContent(fileContent);
        actions.info(`Processed file content:\n${content}`);
        actions.setOutput('content', content);
    } catch (e) {
        actions.setFailed(`File reading failed: ${e}`);
    }
}

function postProcessFileContent(content) {
    const lineAdjusted = applyLineLimit(content);
    return applyCharacterLimit(lineAdjusted);
}

function applyLineLimit(content) {
    const lineLimit = parseInt(actions.getInput('max-lines'), 10);
    if (isNaN(lineLimit)) {
        actions.warning(`Line limit is not a number! Got ${lineLimit}, expected int`);
        return content;
    }
    if (lineLimit <= 0) {
        return content;
    }
    actions.info(`Action output is limited to ${lineLimit} lines, trimming file content`);
    const lines = content.split(/\r?\n/);
    if (lines.length <= lineLimit) {
        return content;
    }
    return lines.slice(0, lineLimit).join('\n').trimEnd();
}

function applyCharacterLimit(content) {
    const characterLimit = parseInt(actions.getInput('max-chars'), 10);
    if (isNaN(characterLimit)) {
        actions.warning(`Character limit is not a number! Got ${characterLimit}, expected int`);
        return content;
    }
    if (characterLimit <= 0 || content.length <= characterLimit) {
        return content;
    }

    return content.slice(0, characterLimit);
}

main();