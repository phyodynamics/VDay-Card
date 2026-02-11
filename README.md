# Valentine's Day Card Creator 💌

## Deploying to Vercel with Custom Subdomain

### Step 1: Push to GitHub

```bash
# If not already a git repo
git init
git add .
git commit -m "Valentine Card Creator - ready for deployment"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/VDay-Card.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **"Add New Project"**
3. Import your **VDay-Card** repository from GitHub
4. Vercel will auto-detect Next.js — just click **"Deploy"**
5. Wait for the build to complete (usually 1-2 minutes)

### Step 3: Add Custom Subdomain `valentine.phyodynamic.com`

1. In your Vercel project dashboard, go to **Settings → Domains**
2. Type `valentine.phyodynamic.com` and click **Add**
3. Vercel will show you DNS records to add

### Step 4: Configure DNS at Your Domain Provider

Go to your domain provider (where you manage `phyodynamic.com`) and add this DNS record:

| Type  | Name      | Value                 |
| ----- | --------- | --------------------- |
| CNAME | valentine | cname.vercel-dns.com. |

> **Note:** The exact value Vercel shows may differ — always use the value Vercel provides in Step 3.

### Step 5: Verify & SSL

1. Go back to Vercel **Settings → Domains**
2. Wait a few minutes for DNS propagation
3. Vercel will automatically issue an SSL certificate
4. Your site will be live at `https://valentine.phyodynamic.com` 🎉

### Environment Variables (if needed)

If your app uses any API keys (e.g., Notion, ImgHippo), add them in:

- Vercel Dashboard → **Settings → Environment Variables**

### Useful Commands

```bash
# Local development
npm run dev

# Production build test
npm run build

# Start production server locally
npm run start
```
