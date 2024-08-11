const link = require('./config.js')
const http = require('http');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
const myAPIKey = process.env.myAPIKey;

// console.log(myAPIKey);
// console.log(argv)
const city = argv._.length > 0 ? argv._[0] : null;

if (city == null) {
  console.log('No city - no forecast');
}

const url = `${link}?access_key=${myAPIKey}&query=${city}`;
http
  .get(url, (res) => {
    const { statusCode } = res;
    if (statusCode !== 200) {
      console.log(`statusCode: ${statusCode}`);
    }
    res.setEncoding('utf8');
    let rowData = '';
    res.on('data', (chunk) => (rowData += chunk));
    res.on('end', () => {
      let parseData = JSON.parse(rowData);
      console.log(parseData);
    });
  })
  .on('error', (err) => {
    console.error(err);
  });
