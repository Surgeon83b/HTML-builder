const fs = require('fs');
const path = require('path');

const result = [];
const output = fs.WriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

const fileNames = fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true },
  (err, files) => {

    files.forEach(file => {
      if (file.isFile() && path.extname(file.name) == '.css') {
        // console.log(file.name);

        const stream = new fs.ReadStream(path.join(__dirname, 'styles', file.name), { encoding: 'utf-8' });

        stream.on('readable', () => {
          let data = stream.read();
          //  console.log(data);
          data && fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), data,
            err => {
              if (err) console.log(err)
            });
        }
        );
      }
    })

  });

console.log(result);
