# Deploying to DigitalOcean via Laravel Forge

This is a TanStack Start (React) app with SSR — it runs as a small Node process
behind nginx, not as PHP. Build output is `.output/server/index.mjs`.

## One-time setup

### 1. Push to GitHub
Repo is already initialised and committed locally. Create an empty repo on
github.com (private is fine — use a personal/client account, not the ICE org),
then run these in **Terminal on your Mac**, from inside the project folder:

    cd ~/Dropbox\ \(Personal\)/V/Verto\ logos/Verto\ Site\ -\ brand\ aligned
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
- The repo connection happens **inside Forge** (not on GitHub):
  - First time only: Forge needs access to your GitHub account. Go to your
    Forge account settings → Source Control → connect GitHub (authorise the
    Simon2106 account).
  - Then, when creating the site / on the "Install Application" screen,
    choose **Git Repository**, pick `Simon2106/verto-site` from the list,
    branch `main`.
  - Untick "Install Composer Dependencies" if the checkbox is shown (this is
    a Node app, not PHP).
  - Note: in current Forge you can't attach a repo to a site created without
    one — if you don't see the option, delete the site and recreate it,
    choosing Git Repository during creation.

### 4. Deploy script (Site → Deployments → Deploy Script)

    cd /home/forge/verto-staging.yourdomain.com
    git pull origin $FORGE_SITE_BRANCH
    npm ci
    npm run build
    # restart the background process so it serves the new build
    # (get the exact name from the Processes tab; it looks like:)
    # sudo supervisorctl restart daemon-XXXXXX:*

### 5. Environment (Site → Environment)
The app reads its configuration from environment variables. Locally these live
in the `.env` file in the project root — it's deliberately NOT in git (it's in
.gitignore), so Forge doesn't get it from the repo. You have to paste it into
Forge once, by hand.

To see it, run this in Terminal from the project folder:

    cat .env

Copy all six lines (SUPABASE_PROJECT_ID, SUPABASE_PUBLISHABLE_KEY,
SUPABASE_URL, plus the same three with the VITE_ prefix) into the editor at
**Site → Environment** in Forge, then add these two lines at the bottom and
save:

    PORT=3000
    HOST=127.0.0.1

What they do:
- `SUPABASE_*` — used at runtime by the contact-form server function to write
  submissions into Supabase.
- `VITE_SUPABASE_*` — the same values, but read at **build time** and baked
  into the browser bundle (Vite only exposes variables with the VITE_ prefix
  to client code).
- `PORT` / `HOST` — tell the Node server to listen on 127.0.0.1:3000, which is
  where the nginx reverse proxy (step 7) sends traffic. Without these the app
  may bind to the wrong port and you'll see 502 errors.

The publishable/anon key is safe on a server and in the browser bundle — it's
the public key, protected by Supabase row-level security. Just never put a
`service_role` key here.

### 6. Background process (was "Daemons" in old Forge)
In the current Forge UI (relaunched Oct 2025): open the **Processes** tab —
it exists at both server and site level, either works — and click
**Add background process** (choose "custom process", not queue worker):
- Command: `node .output/server/index.mjs`
- Directory: `/home/forge/verto-staging.yourdomain.com`
- User: forge
Forge runs this under supervisor and restarts it if it dies.
After creating it, note the process name/ID shown — you'll reference it to
restart the process in the deploy script (step 4), or just use the restart
button on the Processes tab after each deploy.

### 7. nginx reverse proxy
In the current Forge UI, open the site and click the **three-dot (⋯) menu**
next to the site name, then **Edit Nginx Configuration**. (In some views it's
at the bottom of the site page under "Files".)
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
