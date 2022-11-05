const fs = require('fs/promises');
const path = require('path');

let templateList = [];
let components;

let templateFileContent = '';
let header = '';
let footer = '';
let articles = '';

const findTemplates = (str) => {
  template.replace();
}

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

async function copyDir(fromDir, toDir) {
  const items = await fs.readdir(fromDir, { withFileTypes: true });
  await fs.rm(toDir, { recursive: true, force: true });
  await fs.mkdir(toDir);
  for (let item of items) {
    const srcPath = path.join(fromDir, item.name);
    const destPath = path.join(toDir, item.name);
    if (item.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function mergeStyles(fromDir, toDir) {
  const styleFileNames = await fs.readdir(path.join(__dirname, fromDir), { withFileTypes: true });
  try {
    await fs.unlink(path.join(__dirname, toDir, 'style.css'));
  }
  catch {
    console.log('not exist');
  }
  styleFileNames.forEach(file => {
    if (file.isFile() && path.extname(file.name) == '.css') {
      fs.readFile(path.join(__dirname, fromDir, file.name), { encoding: 'utf-8' })
        .then(content => {
          content && fs.appendFile(path.join(__dirname, toDir, 'style.css'), content);
        });
    }
  });
}

async function getTemplateFromFile() {
  templateFileContent = await fs.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf-8' });
  console.log('1. templateFileContent', templateFileContent);
  return templateFileContent;
}

const replaceTemplates = (templateString, templateList) => {
  console.log('3. templateList: ', templateList);
  let str = templateString;
  templateList.forEach(template => {
    str = str.replaceAll(`{{${template.name}}}`, template.content);
  });
  console.log('4. templateString: ', str);
  templateFileContent = str;
  return str;
}

/*async function getTemplatesFromFiles(dir) {
  let files = await fs.readdir(path.join(__dirname, dir), { withFileTypes: true });
  files.forEach(file => {
    if (file.isFile() && path.extname(file.name) == '.html') {
      let ind = file.name.lastIndexOf('.');
      let template = {
        name: file.name.substring(0, ind),
        content: fs.readFile(path.join(__dirname, dir, `${file.name}`), 'utf8')
      }
      templateList.push(template);
    }
  });
  console.log('2. templateList', templateList);
}*/

async function readFromFile(dir, file) {
  let content = '';
  let ind = file.name.lastIndexOf('.');
  file.isFile() && (path.extname(file.name) == '.html') &&
    (content = await fs.readFile(path.join(dir, `${file.name}`), 'utf8'));
  return {
    name: file.name.substring(0, ind),
    content: content
  }
}

async function getTemplatesFromFiles(dir) {
  let files = await fs.readdir(path.join(__dirname, dir), { withFileTypes: true });
  for (let file of files) {
    templateList.push(await readFromFile(path.join(__dirname, dir), file));
    console.log('2. templateList', templateList);
  }
  return templateList;
};

/*getTemplateFromFile()
  .then(result1 => getTemplatesFromFiles('components'))
  .then(result2 => replaceTemplates(templateFileContent, result2))
  .then(res => fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), res));*/

async function buildHTML() {
  copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist/assets'));
  mergeStyles('styles', 'project-dist');

  //templateList = await getTemplatesFromFiles('components'); //console.log('templateList', templateList);
  // templateFileContent = replaceTemplates(templateFileContent, await getTemplatesFromFiles('components'));
  await fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), replaceTemplates(await getTemplateFromFile(), await getTemplatesFromFiles('components')));
  // .then(res => console.log(res));
}

buildHTML();

