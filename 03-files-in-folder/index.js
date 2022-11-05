const fs = require('fs');
const path = require('path');

const fileNames = fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true },
  (err, files) => {
    files.forEach(file => {
      if (file.isFile()) {
        fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
          let ind = file.name.lastIndexOf('.');
          console.log(`${file.name.substring(0, ind)} - ${file.name.substring(ind + 1)} - ${stats.size}`+' B');
        })
      }
    })
  });
