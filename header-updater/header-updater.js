const fs = require('fs');
const path = require('path');

const header = fs.readFileSync('header.html');
const headerStr = header.toString();
const headerReg = RegExp(/<header>[\s\S]*<\/header>/g);

const updateHeaderOfFile = (filePath) => {
    const indexFile = fs.readFileSync(filePath);
    let indexStr = indexFile.toString();
    let tagIndex = indexStr.indexOf('<header>');
    let headerRegStr = headerStr.match(headerReg).toString();

    if (indexStr.at(tagIndex)) {
        tagIndex--;
        
        let spaces = '';

        for (; indexStr.at(tagIndex) !== '\n'; tagIndex--) {
            spaces += ' ';
        }
        
        headerRegStr = headerRegStr.replaceAll('\n', '\n' + spaces);

        indexStr = indexStr.replace(headerReg, headerRegStr);

        fs.writeFileSync(filePath, indexStr);
    }
};

const updateHeaderOfFolder = (folderPath) => {
    for (const i of fs.readdirSync(folderPath)) {
        const iPath = path.join(folderPath, i);
        const iStat = fs.lstatSync(iPath);

        if (iStat.isDirectory()) {
            updateHeaderOfFolder(iPath);
        }
        else {
            updateHeaderOfFile(iPath);
        }
    }
};

updateHeaderOfFolder('../projects');
updateHeaderOfFolder('../rambles');
updateHeaderOfFile('../index.html');