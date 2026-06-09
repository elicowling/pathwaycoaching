# Pathway Coaching — static website

A plain HTML / CSS / JavaScript replacement for the current Wix site, designed to run on **free hosting** with your existing `pathwaycoaching.org` domain.

**Total ongoing cost:** ~$20 – $25/year (just the domain renewal at Wix). Hosting, SSL, CDN, and contact-form submissions are all $0.

---

## What's in this folder

```
.
├── index.html         # Home page
├── services.html      # Services (executive coaching, workshops, team coaching)
├── pastors.html       # Pastors & Ministry Leaders page
├── about.html         # About / Why Pathway Coaching
├── contact.html       # Contact form (Web3Forms)
├── sitemap.xml        # For search engines
├── robots.txt
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── images/        # Logo, portraits, hero photos (all downloaded from Wix)
└── README.md          # This file
```

---

## Local preview

Just double-click `index.html` — every page is a plain HTML file, no build step needed.

For a slightly nicer local preview (so links work as they will on the real domain), run a tiny dev server:

```powershell
# from inside the project folder
python -m http.server 8000
```

Then open <http://localhost:8000>.

---

## Step-by-step: take it live on `pathwaycoaching.org`

### Step 1 — Get a contact-form key (free, 2 minutes)

1. Go to <https://web3forms.com> and click **Create your Access Key**.
2. Enter `chris@pathwaycoaching.org` — this is where messages will be delivered.
3. Check that email and copy the access key they send.
4. Open `contact.html`, find the line:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE" />
   ```
   and replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with the real key.

Free tier = 250 submissions per month. Plenty.

### Step 2 — Put the code on GitHub (free)

1. Create a free account at <https://github.com> if you don't have one.
2. Click the **+** in the top-right → **New repository**.
3. Name it `pathway-coaching-site`. Set it **Public** (Cloudflare Pages can also use private, but public is simpler).
4. Skip the README/license options; click **Create repository**.
5. On the new repo page you'll see an "upload an existing file" link. Click it and **drag this entire folder's contents in** (or use the GitHub Desktop app — easier if you'll edit later). Commit.

> No git experience needed — the web upload works fine for a small static site.

### Step 3 — Deploy to Cloudflare Pages (free)

1. Sign up at <https://dash.cloudflare.com/sign-up>.
2. In the dashboard sidebar, go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Authorize Cloudflare to access your GitHub, then pick the `pathway-coaching-site` repo.
4. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
5. Click **Save and Deploy**. ~30 seconds later you'll have a live preview at something like `pathway-coaching-site.pages.dev`.

Every time you push a change to GitHub, Cloudflare re-deploys automatically.

### Step 4 — Point `pathwaycoaching.org` at Cloudflare Pages

You do **not** need to transfer the domain — keep it at Wix and just change the DNS records.

#### 4a. In Cloudflare Pages

1. On your Pages project, go to **Custom domains** → **Set up a custom domain**.
2. Enter `pathwaycoaching.org`. Cloudflare will show you the DNS records to add.
3. Repeat for `www.pathwaycoaching.org`.

Cloudflare will give you one of two things:
- **Two A records** (something like `192.0.2.1` and `192.0.2.2`), **or**
- **A CNAME** (something like `pathway-coaching-site.pages.dev`).

Write these values down.

#### 4b. In Wix

1. Log in to Wix → **Settings** → **Domains** → click `pathwaycoaching.org` → **Advanced** → **Edit DNS**.
2. **Delete** the existing A record(s) and CNAME for `www` that Wix put there.
3. **Add** the records Cloudflare gave you.
4. Save.

Propagation usually takes 15 minutes – 2 hours. Check at <https://dnschecker.org>.

> **Important:** keep Wix's MX records (email routing) untouched if you use Wix-hosted email. Only touch A/CNAME records for the website.

### Step 5 — Cancel the Wix Premium plan (the part that saves you money)

Once you've confirmed the new site is live at `pathwaycoaching.org`:

1. Wix → **Account & Billing** → **Premium Subscriptions**.
2. Cancel the **website Premium plan** (this is the ~$15–30/month subscription).
3. **Keep** the **domain registration** active (this is the only thing you still need from Wix — about $20/year).

> Don't cancel domain registration. If you do, you lose the URL and someone else can grab it.

---

## How to edit content later

All text is right in the HTML files. Just open `index.html` (or any other `.html`) in any text editor, change the words, save, and push to GitHub. Cloudflare deploys automatically within a minute.

Common edits:
- **Add a testimonial** → copy the `<section class="testimonial">` block in `index.html` and change the text/photo.
- **Change colors** → edit the `:root` color variables at the top of `assets/css/styles.css`.
- **Add a new image** → drop the file in `assets/images/` and reference it like `<img src="assets/images/yourfile.jpg">`.
- **Add a real scheduling link** → if you set up Calendly (free) or similar, change the `href="contact.html"` on the "Schedule a 30-minute call" buttons to your Calendly URL.

---

## Optional upgrades (still free)

| Thing | Tool | Why |
|---|---|---|
| Online booking | [Calendly](https://calendly.com) free plan | Replaces Wix Bookings — embed or link |
| Analytics | Cloudflare Web Analytics (built in, no cookies) | Page views, top countries, etc. |
| Better domain price | Move domain to [Porkbun](https://porkbun.com) or [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) | `.org` ≈ $10–11/yr (saves ~$10/yr vs Wix) |

---

## If something breaks

- **Contact form doesn't send** → check the access key in `contact.html` is correct.
- **Site shows "Page not found" on `www.pathwaycoaching.org`** → make sure you added the `www` custom domain in Cloudflare Pages too.
- **DNS changes "aren't working"** → give it up to 24 hours. Check progress at <https://dnschecker.org>.
- **Email stopped working** → you likely removed MX records by mistake. Re-add the ones Wix originally had.

For anything else, just ask.
