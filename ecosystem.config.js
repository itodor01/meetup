// The purpose of this file is covered in CH 05, Video 06
module.exports = {
  apps: [
    {
      name: 'meetup',
      script: 'bin/www',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      key: '~/ec2keypair.pem',
      user: 'ubuntu',
      host: 'team-wallacespace.co.uk',
      ref: 'origin/master',
      repo: 'https://github.com/itodor01/meetup.git',
      path: '/var/www/html',
      'post-deploy': 'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
