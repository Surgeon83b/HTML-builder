const fs = require('fs');
const path = require('path');

const copyDir = (fromDir, toDir) => {
  // deleting 'files-copy' directory if it exists
  fs.stat(path.join(__dirname, toDir),
    err => {
      if (!err) {
        fs.readdir(path.join(__dirname, toDir),
          (err, files) => {
            if (err) {
              throw err;
              console.log(err);
            }
            files.forEach(file => {
              fs.unlink(path.join(__dirname, toDir, file),
                err => {
                  if (err)
                    console.log('error while deleting');
                })
              console.log('delete completed');
            })
          })
     /*   fs.rmdir(path.join(__dirname, toDir),
          err => {
            if (err)
              console.log('error while removing dir');
          })*/
      }
    })

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

copyDir('files', 'files-copy');
