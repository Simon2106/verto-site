# Deploying to DigitalOcean via Laravel Forge

This is a TanStack Start (React) app with SSR — it runs as a small Node process
behind nginx, not as PHP. Build output is `.output/server/index.mjs`.

## One-time setup

### 1. Push to GitHub
Repo is already initialised and committed locally. Create an empty repo on
github.com (private is fine), then:

    git remote add origin git@github.com:YOUR-USER/verto-site.git
    git push -u origin main

### 2. Check Node on the Forge server
SSH in (or use Forge's Commands): `node -v` — needs Node 20+ (22 ideal).
If missing/old: install via Forge server's "Node.js" settings or nvm.

### 3. Create the site in Forge
- Server → New Site
- Root domain: your staging subdomain (e.g. verto-staging.yourdomain.com)
- Project type: **Static HTML** (we replace nginx config anyway)
- Web directory: leave default
- Then: Site → Git Repository → connect the GitHub repo, branch `main`.
  Untick "Install Composer Dependencies".

### 4. Deploy script (Site → Deployments → Deploy Script)

    cd /home/forge/verto-staging.yourdomain.com
    git pull origin $FORGE_SITE_BRANCH
    npm ci
    npm run build
    # restart the daemon (get the ID from the Daemons page, or use the restart button)
    # sudo supervisorctl restart daemon-XXXXXX:*

### 5. Environment (Site → Environment)
Paste the contents of your local `.env` (Supabase URL + publishable key,
both plain and VITE_-prefixed). Add:

    PORT=3000
    HOST=127.0.0.1

### 6. Daemon (Server → Daemons → New)
- Command: `node .output/server/index.mjs`
- Directory: `/home/forge/verto-staging.yourdomain.com`
- User: forge
Forge runs this under supervisor and restarts it if it dies.
Note the daemon ID and put its restart line into the deploy script (step 4).

### 7. nginx reverse proxy (Site → Edit Files → Edit Nginx Configuration)
Inside the `server { }` block, replace the main `location / { ... }` with:

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
    }

Also remove/comment any `try_files` line in that block. Save (Forge reloads nginx).

### 8. DNS + SSL
- DNS: A record for the staging subdomain → droplet IP.
- Once it resolves: Site → SSL → LetsEncrypt.

### 9. First deploy
Site → Deployments → Deploy Now. Then enable Quick Deploy so every
`git push` redeploys automatically.

## Notes
- The contact form inserts into Supabase `contact_submissions` via a server
  function — confirm it works on staging after deploy.
- If the build fails on the server with memory errors (small droplets),
  add `export NODE_OPTIONS=--max-old-space-size=2048` before `npm run build`
  in the deploy script, or add a 1-2GB swapfile.
