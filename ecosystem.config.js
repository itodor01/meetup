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
      host: 'ec2-18-134-180-58.eu-west-2.compute.amazonaws.com',
      ref: 'origin/master',
      repo: 'https://github.com/itodor01/meetup',

      // eslint-disable-next-line max-len
      // Make sure this directory exists on your server or change this entry to match your directory structure
      path: '/home/ubuntu/deploy',

      'post-deploy': 'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
