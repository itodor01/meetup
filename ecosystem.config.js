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
      key: 'C:/Users/test/ec2keypair.pem',
      user: 'ec2-user',
      host: 'ec2-18-134-249-95.eu-west-2.compute.amazonaws.com',
      ref: 'origin/master',
      repo: 'https://github.com/itodor01/meetup',

      // eslint-disable-next-line max-len
      // Make sure this directory exists on your server or change this entry to match your directory structure
      path: '/home/ec2-user/deploy',

      'post-deploy': 'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
