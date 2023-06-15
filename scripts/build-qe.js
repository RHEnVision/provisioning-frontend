const fs = require('fs');
const { exec } = require('child_process');

const packageJsonPath = './package.json';
const package = JSON.parse(fs.readFileSync(packageJsonPath));
package.insights.appname = 'starter';
fs.writeFileSync(packageJsonPath, JSON.stringify(package, null, 4));

exec('npm run build -- -c ./config/fec.config.qe.js', (err, stdout) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(stdout);
});
