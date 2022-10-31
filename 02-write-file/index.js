const path = require('path');
const fs = require('fs');
const rl = require('readline').createInterface(process.stdin, process.stdout);

const output = fs.createWriteStream(path.join(__dirname, 'output.txt'));

rl.write('type data to write to file:\n');
rl.on('line', (input) => {
  if (input == 'exit')
    rl.close()
  else
    output.write(input);
});

rl.on('close', () => console.log('good bye'));
