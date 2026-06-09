# Publishing Pathway Coaching

This guide takes you from "files on my computer" → "live at a free URL" → "live at `pathwaycoaching.org`".

**Total cost when done:** ~$20–25/year (just your existing domain renewal at Wix). Hosting, SSL, CDN, and the contact form are all free forever.

---

## Part 1 — Get it live RIGHT NOW at a free URL (≈ 2 minutes)

The fastest path. No account, no GitHub, no command line. You'll get a URL like `https://lucky-puddle-12345.netlify.app` you can share immediately.

### Steps

1. Open <https://app.netlify.com/drop> in your browser.
2. In File Explorer, navigate to this folder:
   `C:\Users\elico\OneDrive\TRADADELI\5.) File Storage\Pathway Website`
3. Select **all the contents** inside it (Ctrl+A) — `index.html`, `services.html`, `assets/`, etc. **Do not** zip them; drag the files/folders themselves.
4. Drag the selection onto the dotted box on the Netlify Drop page.
5. Wait ~10 seconds. Netlify will give you a live URL.
6. **Copy that URL** — that's your live site.

> If you want the URL to stick around long-term (Netlify keeps un-claimed sites for ~24 hours), click "Sign up" on the result page and link the deploy to a free account. Free account, ~30 seconds.

### Heads up before sharing the URL

- **The contact form won't deliver email yet.** Submissions will fail silently until you do Part 2, step "Set up the contact form" below. Either skip the form until then, or do that one step first.

---

## Part 2 — Move to Cloudflare Pages (recommended long-term home)

Cloudflare Pages is free, has no bandwidth cap, no commercial-use restrictions, and is the cleanest place to attach a custom domain. Use this as your real host going forward; the Netlify Drop is just for preview.

### Step A — Set up the contact form (free, 2 minutes)

So `chris@pathwaycoaching.org` actually receives form submissions:

1. Go to <https://web3forms.com> → **Create your Access Key**.
2. Enter `chris@pathwaycoaching.org` — that's where messages will go.
3. Open the email Web3Forms sends and **copy the access key**.
4. Open `contact.html` and `about.html` in a text editor (Notepad works). Find this line in **both** files:
   ```html
   <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE" />
   ```
   Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your real key. Save both files.

Free tier = 250 submissions/month. More than enough.

### Step B — Put the code on GitHub (free)

This is what lets Cloudflare auto-deploy every time you edit a file.

1. Sign up at <https://github.com> if you don't have an account.
2. Top-right **+** → **New repository**.
3. Name it `pathway-coaching-site`. Set it **Public**. Don't add a README/license. Click **Create repository**.
4. On the empty repo page, click the **"uploading an existing file"** link.
5. Drag every file and folder from `C:\Users\elico\OneDrive\TRADADELI\5.) File Storage\Pathway Website` into the upload area. Don't include the `_reference/` folder if it's there — it's just my working notes.
6. Scroll down → commit message "initial commit" → **Commit changes**.

### Step C — Deploy to Cloudflare Pages (free)

1. Sign up at <https://dash.cloudflare.com/sign-up>. Email + password, no credit card.
2. Left sidebar → **Workers & Pages** → **Create** → **Pages** tab → **Connect to Git**.
3. Authorize Cloudflare to read your GitHub account, then pick the `pathway-coaching-site` repo.
4. Build settings:
   - **Project name:** `pathway-coaching-site` (this becomes your `*.pages.dev` URL)
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
5. **Save and Deploy**. ~30 seconds later your site is live at `https://pathway-coaching-site.pages.dev`.

From now on: any time you edit a file and push it to GitHub (or use GitHub's web editor), Cloudflare redeploys automatically in under a minute.

---

## Part 3 — Point `pathwaycoaching.org` at your new site

You do **not** need to transfer the domain. Keep it at Wix and just change the DNS records.

### Step A — In Cloudflare Pages

1. Open your Pages project → **Custom domains** tab → **Set up a custom domain**.
2. Enter `pathwaycoaching.org`. Cloudflare will show you the DNS records to add — either:
   - **Two A records** (IP addresses like `192.0.2.1` / `192.0.2.2`), or
   - **One CNAME** (pointing to `pathway-coaching-site.pages.dev`)
3. **Copy those exact values down.** Don't close the tab.
4. Click **Set up a custom domain** again, enter `www.pathwaycoaching.org`, and copy those values too.

### Step B — In Wix (DNS only — do NOT transfer the domain)

1. Log in to Wix → **Settings** (gear icon) → **Domains**.
2. Click on `pathwaycoaching.org` → **Advanced** → **Edit DNS** (or "Manage DNS Records").
3. For the **`@` host** (sometimes shown as the bare domain): **delete** the existing A record(s) Wix put there, then **add** the A records (or CNAME) Cloudflare gave you.
4. For the **`www` host**: same thing — delete existing record, add Cloudflare's value.
5. **Leave MX records alone** — those route your email. Do not touch them.
6. **Leave TXT records alone** — those handle email verification and similar. Do not touch them.
7. Save.

### Step C — Wait, then verify

- DNS propagation usually completes in 15 minutes – 2 hours (occasionally up to 24).
- Check progress at <https://dnschecker.org> — paste in `pathwaycoaching.org` and watch the world's DNS servers update.
- When ready, visit `https://pathwaycoaching.org` in an incognito window. You should see your new site.
- Cloudflare automatically issues a free SSL certificate within a few minutes after DNS resolves.

---

## Part 4 — Cancel the Wix Premium plan (the money-saving step)

**Only do this after `pathwaycoaching.org` confirms it's serving the new site.**

1. Wix → **Account & Billing** → **Premium Subscriptions**.
2. Cancel the **website Premium plan** (the ~$15–30/month subscription). Keep going through the cancel flow — Wix will try to upsell you.
3. **DO NOT cancel the domain registration.** That's a separate line item, usually ~$20/year. You still need it.

After this:
- ✅ Domain still works (kept at Wix, ~$20/yr)
- ✅ Email still works (MX records untouched)
- ✅ Site serves from Cloudflare Pages (free)
- ❌ Wix Premium charges stop on next billing cycle

---

## Editing the site later

All text is in the HTML files. To change something:

**Option 1 — GitHub web editor (no install)**
1. Go to your repo on github.com.
2. Click any `.html` file → pencil icon (edit).
3. Make changes → **Commit changes** at the bottom.
4. Cloudflare redeploys automatically in ~30 seconds.

**Option 2 — Edit locally + push**
1. Edit files in any text editor (VS Code, Notepad++).
2. Use GitHub Desktop to commit and push.

Common edits:
- **Words on a page** → open the `.html`, find the text, change it.
- **Colors / fonts** → top of `assets/css/styles.css` (`--navy`, `--cyan`, etc.)
- **A new image** → drop file into `assets/images/`, reference as `<img src="assets/images/yourfile.jpg">`
- **Real scheduling link** → if you set up Calendly (free), search-and-replace every `href="contact.html"` on the "Schedule a 30-minute call" buttons with your Calendly URL.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Contact form silently fails | Web3Forms key not pasted into `contact.html` AND `about.html`. Check both files. |
| `www.pathwaycoaching.org` shows "page not found" | You added `pathwaycoaching.org` to Cloudflare Pages but forgot to add `www.pathwaycoaching.org` separately. Go back to Step 3A. |
| DNS changes "aren't working" | Wait — full propagation can take up to 24h. Check <https://dnschecker.org>. If it shows your new records globally but the site still 404s, the issue is in Cloudflare Pages custom domain setup, not DNS. |
| Email stopped working after DNS change | You accidentally deleted/changed MX records. Log back into Wix DNS, look at the record history (Wix keeps it) or re-add the MX records Wix originally had (usually `mail.wixmp.com` priority 10 or similar). Email should resume within ~30 min. |
| Site loads but looks broken (no styles/images) | Almost always a path issue. Open browser DevTools (F12) → Console — it'll tell you which file is 404. Most common cause: a typo when uploading or a missing folder. |

---

## Optional upgrades (still free)

| Want | Tool | Why |
|---|---|---|
| Online booking | [Calendly](https://calendly.com) free plan | Replaces Wix Bookings. Embed or link from "Schedule a 30-minute call" buttons. |
| Analytics | Cloudflare Web Analytics (built into the Pages dashboard) | Page views, top countries. No cookies, no banner needed. |
| Cheaper domain | Move to [Porkbun](https://porkbun.com) or [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) | `.org` ≈ $10–11/yr. Saves ~$10/yr vs Wix. Wix blocks direct transfer to Cloudflare, so the route is Wix → Porkbun → (wait 60 days) → Cloudflare. Or just stop at Porkbun. |

---

## TL;DR

1. Drag folder onto <https://app.netlify.com/drop> → free URL right now.
2. When ready for the real launch: GitHub → Cloudflare Pages → custom domain in Wix DNS → cancel Wix Premium.
3. Total ongoing cost: just the ~$20/yr domain.
