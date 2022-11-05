const fs = require('fs');
const path = require('path');
const toDir = 'files-copy';

// deleting files in 'files-copy' directory if it exists
const clearDirAndCopy = (dir) => {

  fs.stat(path.join(__dirname, dir),
    err => {
      if (!err)
        fs.readdir(path.join(__dirname, dir),
          (err, files) => {
            if (err) {
              console.log(err);
            }
            files.forEach(file => {
              fs.unlink(path.join(__dirname, dir, file),
                err => {
                  if (err)
                    console.log('error while deleting');
                })
              console.log('delete completed');
            })
            copyDir('files', 'files-copy');
          })
      else {
        copyDir('files', 'files-copy');
      }
    })
}

const copyDir = (fromDir, toDir) => {
  /// copying files to dir
  fs.readdir(path.join(__dirname, fromDir),
    (err, files) => {
      fs.mkdir(path.join(__dirname, toDir), { recursive: true },
        err => {
          if (err) throw err;
          console.log('Папка была создана');
        });
      /// copy to directory
      files.forEach(file => {
        console.log(file);
        fs.copyFile(path.join(__dirname, fromDir, file), path.join(__dirname, toDir, file),
          err => {
            if (err)
              console.log('error');
          })
        console.log('copy completed');
      })
    });
}


clearDirAndCopy('files-copy');
