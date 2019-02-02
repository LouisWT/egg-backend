const shell = require('shelljs');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

if (!shell.which('yarn')) {
  shell.echo('Sorry, this script requires yarn');
  shell.exit(1);
}

if (shell.exec('git pull').code !== 0) {
  shell.echo('Error: Git pull failed');
  shell.exit(1);
}

if (shell.exec('yarn run tsc').code !== 0) {
  shell.echo('Error: Typescript compile failed');
  shell.exit(1);
}

if (shell.exec('ENABLE_NODE_LOG=YES yarn start')) {
  shell.echo('Error: Server start failed');
  shell.exit(1);
}
