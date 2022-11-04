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

/*let stream = new fs.ReadStream(path.join(__dirname, 'template.html'), { encoding: 'utf-8' });
stream.on('readable', () => {
  templateFileContent = stream.read();
  console.log('templateFileContent', templateFileContent);
}
);
*/

const getTemplateFromFile = () => {
  templateFileContent = fs.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf-8' });
  console.log('1. templateFileContent', templateFileContent);
}

/*stream = new fs.ReadStream(path.join(__dirname, 'components', 'header.html'), { encoding: 'utf-8' });
stream.on('readable', () => {
  template = stream.read();
}
);*/

const replaceTemplates = (templateString, templateList) => {
  console.log('2. templateString', templateString);
  templateList.forEach(template => {
    templateString.replace(`{{${template.name}}}`, template.content);
  })

}

const getTemplatesFromFiles = (dir) => {

  fs.readdir(path.join(__dirname, dir), { withFileTypes: true },
    (err, files) => {
      if (!err) {

        files.forEach(file => {
          if (file.isFile() && path.extname(file.name) == '.html') {
            fs.readFile(path.join(__dirname, dir, `${file.name}`), 'utf8',
              (err, fileContent) => {
                if (!err) {
                  let ind = file.name.lastIndexOf('.');
                  let template = {
                    name: file.name.substring(0, ind),
                    content: fileContent
                  }
                  templateList.push(template);
            
                  // console.log(templateList);
                }
              });

          }
        }
        )

        replaceTemplates(templateFileContent, templateList);
        console.log('3. templateFileContent: ', templateFileContent);
      }
    })
}

getTemplateFromFile();
getTemplatesFromFiles('components');

//console.log('templateList', templateList);
