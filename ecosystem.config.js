module.exports = {
  apps: [
    {
      name: 'panelx-admin',
      script: 'npm',
      args: 'start',
      exec_mode: 'cluster',
      instances: 'max',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
