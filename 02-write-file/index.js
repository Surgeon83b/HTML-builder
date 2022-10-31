//const { stdin, stdout } = process;
//stdout.write('type data to write to file:\n');


/*stdin.on('data', chunk => {
    output.write(chunk);
    console.log(chunk);
}
)*/

const fs = require('fs');
const rl = require('readline').createInterface(process.stdin, process.stdout);

const output = fs.createWriteStream('destination.txt');


const answer = rl.question('type data to write to file ');
rl.write('type data to write to file:\n');
rl.on('line', (input) => {
  if (input == 'exit')
    rl.close()
  else
    output.write(input);
});

rl.on('close', () => console.log('good bye'));
