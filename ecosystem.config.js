module.exports = {
  apps: [{
    script: 'npm start'
  }],

  deploy: {
    production: {
      key: 'CUHK_KAKIU.pem',
      user: 'ubuntu',
      host: '18.210.29.239',
      ref: 'origin/main',
      repo: 'git@github.com:kakiufong/ierg4210_assignment.git',
      path: '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy': 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
