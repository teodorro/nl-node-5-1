const http = require('http');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

const myAPIKey = process.env.myAPIKey;

console.log(myAPIKey);

const question = (answer) => {
  const city = answer;
  const url = `http://api.weatherstack.com/current?access_key=${myAPIKey}&query=${city}`;
  http
    .get(url, (res) => {
      const { statusCode } = res;
      if (statusCode !== 200) {
        console.log(`statusCode: ${statusCode}`);
        rl.on('line', (anotherAnswer) => question(anotherAnswer));
      }
      res.setEncoding('utf8');
      let rowData = '';
      res.on('data', (chunk) => (rowData += chunk));
      res.on('end', () => {
        let parseData = JSON.parse(rowData);
        console.log(parseData);
        console.log('Enter the name of the city:\r\n');
        rl.on('line', (anotherAnswer) => question(anotherAnswer));
      });
    })
    .on('error', (err) => {
      console.error(err);
      rl.on('line', (anotherAnswer) => question(anotherAnswer));
    });
};

rl.question(`Enter the name of the city:\r\n`, (answer) => {
  question(answer);
});
