const fs = require('fs');
const path = require('path');
const toDir = 'files-copy';

/*const isExists = (dir) => {
  let isEx = false;
  fs.stat(path.join(__dirname, dir),
    err => {
      console.log('err', err);
      if (!err) isEx = true;
      else console.log(err);

      isEx ? console.log('exists') : console.log('doesn\'t exist')
      return isEx;
    }
  )
  return isEx;
}*/

// deleting files in 'files-copy' directory if it exists
const clearDir = (dir) => {

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

    })
  copyDir('files', 'files-copy');
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

/*const removeDir = (dir) => {
  fs.rmdir((__dirname, dir),
    err => {
      if (err)
        console.log('error while deleting');
    })
}
*/

clearDir('files-copy');
