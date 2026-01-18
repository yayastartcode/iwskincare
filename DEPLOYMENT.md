# Panduan Deployment - IWS Skincare

Panduan deployment ke VPS Ubuntu dengan Nginx, SSL (Certbot), dan GitHub.

## Prerequisites

- VPS Ubuntu 20.04/22.04
- Nginx terinstall
- Certbot/SSL sudah aktif
- Domain sudah pointing ke VPS
- MongoDB Atlas account
- GitHub account

---

## 1. Setup User & Directory di VPS

### 1.1 Buat User Baru

```bash
# Login sebagai root atau user dengan sudo
sudo adduser iwskincare

# Tambahkan ke sudo group (opsional, untuk maintenance)
sudo usermod -aG sudo iwskincare

# Buat directory project
sudo mkdir -p /var/www/iwskincare
sudo chown -R iwskincare:iwskincare /var/www/iwskincare
sudo chmod -R 755 /var/www/iwskincare
```

### 1.2 Setup SSH Key untuk GitHub

```bash
# Switch ke user iwskincare
sudo su - iwskincare

# Generate SSH key
ssh-keygen -t ed25519 -C "iwskincare-deploy"
# Tekan Enter untuk semua prompt (default location, no passphrase)

# Tampilkan public key
cat ~/.ssh/id_ed25519.pub
```

**Copy output dan tambahkan ke GitHub:**
1. Buka GitHub → Settings → SSH and GPG keys
2. Click "New SSH key"
3. Paste public key
4. Save

### 1.3 Test koneksi GitHub

```bash
ssh -T git@github.com
# Harus muncul: "Hi username! You've successfully authenticated..."
```

---

## 2. Install Dependencies di VPS

### 2.1 Install Node.js (v20)

```bash
# Sebagai user iwskincare
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2.2 Install pnpm

```bash
sudo npm install -g pnpm
```

### 2.3 Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 2.4 Verifikasi instalasi

```bash
node -v    # v20.x.x
pnpm -v    # 9.x.x atau 10.x.x
pm2 -v     # 5.x.x
```

---

## 3. Clone & Setup Project

### 3.1 Clone Repository

```bash
cd /var/www/iwskincare
git clone git@github.com:USERNAME/REPO_NAME.git .
```

### 3.2 Buat file .env

```bash
nano .env
```

Isi dengan:

```env
# Database - MongoDB Atlas
DATABASE_URL=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/iwskincare?retryWrites=true&w=majority

# Payload Secret - Generate random string
PAYLOAD_SECRET=your-super-secret-key-min-32-chars-here

# Site URL (untuk social share, SEO, dll)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Node Environment
NODE_ENV=production
```

**Generate PAYLOAD_SECRET:**
```bash
openssl rand -base64 32
```

### 3.3 Install Dependencies & Build

```bash
pnpm install
pnpm run build
```

### 3.4 Setup folder media

Media sudah ter-include di repository dengan konten awal. Pastikan permission-nya benar:

```bash
chmod -R 755 /var/www/iwskincare/media
```

**Catatan:** File media yang di-upload setelah deployment akan disimpan di folder ini dan perlu di-backup secara berkala.

---

## 4. Setup PM2

### 4.1 Buat ecosystem file

```bash
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: 'iwskincare',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/iwskincare',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
```

### 4.2 Start aplikasi

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Copy perintah yang muncul dan jalankan dengan sudo.

### 4.3 Cek status

```bash
pm2 status
pm2 logs iwskincare
```

---

## 5. Setup Nginx

### 5.1 Buat konfigurasi Nginx

```bash
sudo nano /etc/nginx/sites-available/iwskincare
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Certificate (Certbot)
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json;

    # Client max body size (untuk upload media)
    client_max_body_size 50M;

    # Media files - serve directly
    location /media {
        alias /var/www/iwskincare/media;
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
    }

    # Static files
    location /_next/static {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    # Next.js app
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
}
```

### 5.2 Enable site & test

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/iwskincare /etc/nginx/sites-enabled/

# Test konfigurasi
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 5.3 Setup SSL dengan Certbot (jika belum)

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 6. Setup GitHub Actions (Auto Deploy)

### 6.1 Buat SSH key untuk deploy

Di VPS sebagai user iwskincare:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/github_deploy -C "github-actions"
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Tampilkan private key (untuk GitHub Secret)
cat ~/.ssh/github_deploy
```

### 6.2 Tambah GitHub Secrets

Di repository GitHub → Settings → Secrets and variables → Actions:

| Secret Name | Value |
|-------------|-------|
| `VPS_HOST` | IP atau domain VPS |
| `VPS_USER` | `iwskincare` |
| `VPS_SSH_KEY` | Isi private key dari langkah 6.1 |
| `VPS_PORT` | `22` (atau port SSH custom) |

### 6.3 Buat workflow file

File sudah dibuat di: `.github/workflows/deploy.yml`

---

## 7. Deploy Commands

### Manual Deploy

```bash
cd /var/www/iwskincare
git pull origin main
pnpm install
pnpm run build
pm2 restart iwskincare
```

### Auto Deploy

Push ke branch `main` akan otomatis trigger deployment via GitHub Actions.

---

## 8. Maintenance Commands

### Logs

```bash
# PM2 logs
pm2 logs iwskincare

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Restart

```bash
pm2 restart iwskincare
sudo systemctl restart nginx
```

### Update SSL

```bash
sudo certbot renew
```

### Backup Media

```bash
tar -czvf media-backup-$(date +%Y%m%d).tar.gz /var/www/iwskincare/media
```

---

## 9. Troubleshooting

### Port sudah digunakan

```bash
sudo lsof -i :3000
kill -9 PID
```

### Permission denied

```bash
sudo chown -R iwskincare:iwskincare /var/www/iwskincare
```

### PM2 tidak jalan setelah reboot

```bash
pm2 startup
# Jalankan command yang muncul
pm2 save
```

### MongoDB connection error

- Cek IP VPS sudah di-whitelist di MongoDB Atlas
- Cek DATABASE_URL di .env

---

## 10. Checklist Deployment

- [ ] User `iwskincare` dibuat
- [ ] SSH key ditambahkan ke GitHub
- [ ] Node.js, pnpm, PM2 terinstall
- [ ] Repository di-clone
- [ ] File `.env` dibuat dengan credentials yang benar
- [ ] `pnpm install` dan `pnpm run build` sukses
- [ ] PM2 running (`pm2 status`)
- [ ] Nginx dikonfigurasi dan running
- [ ] SSL aktif
- [ ] GitHub Secrets ditambahkan
- [ ] Test akses website
- [ ] Test admin panel `/admin`
- [ ] Test upload media

---

## Quick Reference

| Task | Command |
|------|---------|
| Start app | `pm2 start ecosystem.config.js` |
| Stop app | `pm2 stop iwskincare` |
| Restart app | `pm2 restart iwskincare` |
| View logs | `pm2 logs iwskincare` |
| Deploy manual | `git pull && pnpm install && pnpm build && pm2 restart iwskincare` |
