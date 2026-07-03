/** @type {import('pm2').StartOptions[]} */
module.exports = {
  apps: [
    {
      name: "somo-dev",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
