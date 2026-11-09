# CI/CD Roadmap — GitHub Actions → AWS EC2

এই portfolio একটা **static site** — `npm run build` করলে `dist/` folder-এ শুধু HTML/CSS/JS হয়। তাই EC2-তে Node চালাতে হবে না, **Nginx** দিয়ে `dist/` serve করলেই হবে।

Workflow file: [`.github/workflows/ci-cd.yml`](../.github/workflows/ci-cd.yml)

## Pipeline কীভাবে কাজ করে

| Job | কখন চলে | কী করে |
|---|---|---|
| **ci** — Lint, Test, Build and Health Check | `main`-এ push, `main`-এ PR, manual run | `npm ci` → `npm run lint` → `npm test` → `npm run build` → `vite preview` চালিয়ে page load হয় কিনা check → `dist/` artifact upload |
| **deploy** — Deploy to AWS EC2 | শুধু `main` থেকে (push বা manual), PR থেকে **কখনো না** | artifact download → SSH setup (fingerprint check) → `dist` EC2-তে copy → `releases/<commit>`-এ রাখে → `current` symlink বদলায় → health check, fail করলে আগের release-এ rollback |

---

## ধাপগুলো

### ✅ ০. Test + workflow যোগ করা
- Vitest + React Testing Library — `Header.test.jsx`, `Footer.test.jsx`
- `.nvmrc` (`22`) — local আর CI একই Node version ব্যবহার করে
- `npm test` = একবার চালানো, `npm run test:watch` = file বদলালে আবার চলে

### ১. PR খুলে প্রথম CI দেখা

```bash
gh pr create --base main --head ci-setup --title "Add tests and CI/CD workflow"
```

- CI job ✅ হবে, Deploy job *skipped* দেখাবে (PR থেকে deploy হয় না — এটা ঠিক)
- একবার ইচ্ছা করে একটা test ভেঙে push করে ❌ দেখুন, তারপর ঠিক করুন
- ⚠️ EC2 setup না হওয়া পর্যন্ত **merge করবেন না** — merge করলে deploy job চলবে আর fail করবে

### ২. Branch protection (CI-2)
Repo **Settings → Rules → Rulesets** → `main`-এর জন্য:
- সরাসরি push বন্ধ, শুধু PR দিয়ে
- **Require status checks to pass** → "Lint, Test, Build and Health Check"

ফলাফল: CI লাল থাকলে merge button কাজ করবে না।

### ৩. EC2 manual setup (CI-4)
1. AWS-এ Ubuntu instance (`t3.micro`) + key pair বানান
2. Security Group: port 22 শুধু **My IP**, port 80 সবার জন্য
3. SSH করে:
   - Nginx install
   - `/var/www/portfolio` বানিয়ে owner `ubuntu` করা
   - Nginx `root` → `/var/www/portfolio/current`
4. একবার হাতে `dist/` পাঠিয়ে public IP-তে site খুলছে কিনা দেখা

> কেন manual আগে? Automate করার আগে নিজের হাতে একবার করলে বুঝবেন workflow কী করছে, আর ভাঙলে debug করতে পারবেন।

AWS সতর্কতা: ছোট instance নিন, billing alert চালু রাখুন, practice না করলে instance **stop** রাখুন।

### ৪. GitHub-এ secret বসানো (CI-5)
Repo **Settings → Secrets and variables → Actions**:

| ধরন | নাম | মান |
|---|---|---|
| Secret | `EC2_SSH_KEY` | `.pem` file-এর পুরো content |
| Secret | `EC2_HOST` | EC2-এর public IP |
| Variable | `EC2_HOST_FINGERPRINT` | EC2-এর SSH host fingerprint (SHA256) |

⚠️ GitHub runner-এর IP প্রতিবার বদলায় — তাই port 22 শুধু My IP-তে খোলা থাকলে deploy আটকে যাবে। Practice-এর সময় সাময়িকভাবে 22 সবার জন্য খুলুন (key-only login), পাকা সমাধান ধাপ ৬-এ।

### ৫. Merge করে প্রথম auto deploy 🚀
- PR merge → CI → Deploy পুরো pipeline চলবে → EC2-এর IP-তে site live
- তারপর একটা ছোট পরিবর্তন করে PR → merge — নিজে থেকে live হয় কিনা দেখুন। এটাই CI/CD-এর পুরো চক্র।

### ৬. Production-এর মতো করে সাজানো (CI-6)
- Domain + HTTPS (Certbot)
- Port 22 বন্ধ করে AWS **OIDC + SSM** দিয়ে deploy — কোনো SSH key রাখতে হবে না
- README-তে CI status badge

---

## যা শিখলাম (troubleshooting)

- **Node version mismatch:** Node 20.18-এ npm চুপচাপ Vite-এর native binding (`@rolldown/binding-*`) বাদ দিয়েছিল, কারণ সেটার লাগে `^20.19.0 || >=22.12.0`। ফলে test crash করছিল। সমাধান: `nvm install 22`, `nvm alias default 22`, তারপর `npm ci`। এটাই CI-তে version pin করার কারণ — "আমার মেশিনে তো চলে!" সমস্যা।
- **`localhost` vs `127.0.0.1`:** macOS-এ Vite `localhost` = IPv6 `::1`-এ চলে, তাই `127.0.0.1`-এ request যায় না। Workflow-এ `vite preview --host 127.0.0.1` দিয়ে ঠিক করা হয়েছে।
- **Workflow run হচ্ছে না?** শুধু feature branch-এ push করলে চলবে না — workflow চলে `main`-এ push বা `main`-এ PR হলে।
