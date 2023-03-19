module.exports = {
  apps: [{
    name: 'ierg4210_assignment',
    script: 'npm start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
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
      'post-deploy': 'source ~/.nvm/nvm.sh && npm ci && npm run build && pm2 reload ecosystem.config.cjs --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
