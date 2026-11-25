#!/usr/bin/env bash
# Run only on the dedicated website Ubuntu instance.
set -euo pipefail
sudo apt-get update
sudo apt-get install -y nginx
sudo mkdir -p /var/www/fivestarfunnelcake
sudo tee /etc/nginx/sites-available/fivestarfunnelcake >/dev/null <<'NGINX'
server {
    listen 80;
    server_name _;
    root /var/www/fivestarfunnelcake;
    index index.html;
    location / { try_files $uri $uri/ =404; }
    location ~ /\. { deny all; }
}
NGINX
sudo ln -sfn /etc/nginx/sites-available/fivestarfunnelcake /etc/nginx/sites-enabled/fivestarfunnelcake
if [ -L /etc/nginx/sites-enabled/default ]; then sudo unlink /etc/nginx/sites-enabled/default; fi
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx
