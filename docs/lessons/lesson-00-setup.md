# 🟢 Lesson 0 — Setup ও React কীভাবে চলে

## Concept
- **React** হলো UI বানানোর একটা library। পুরো page-কে ছোট ছোট **component**-এ ভাগ করা হয়, যেমন `Header`, `Hero`, `ProjectCard`। প্রতিটা component আসলে একটা JavaScript function, যেটা UI return করে।
- **Vite** হলো build tool আর dev server। এটা আপনার code browser-এ চালায় এবং save করলেই page সাথে সাথে update হয় (HMR)।
- App চালু হওয়ার ক্রম:
  1. `index.html`-এ একটা খালি `<div id="root">` থাকে
  2. `src/main.jsx` সেই `root`-এর ভেতরে `<App />` render করে
  3. `src/App.jsx` আপনার আসল UI, এখান থেকেই সব component শুরু হবে

## আপনার Task
**১. Project তৈরি করুন** (এই folder-এর ভেতরে, `.` মানে current folder):

```bash
npm create vite@latest . -- --template react
```

Folder খালি না থাকার warning এলে "Ignore files and continue" বেছে নিন, কারণ এখানে শুধু `LEARNING.md` আছে।

**২. Package install করে dev server চালান:**

```bash
npm install
```

```bash
npm run dev
```

Browser-এ `http://localhost:5173` খুলুন। Vite + React-এর demo page দেখা যাবে।

**৩. ঘুরে দেখুন।** `index.html`, `src/main.jsx` আর `src/App.jsx` খুলে পড়ুন। `main.jsx` কীভাবে `App`-কে `root`-এ বসাচ্ছে সেটা খুঁজে বের করুন।

**৪. প্রথম code লিখুন।** `src/App.jsx`-এর সব demo code মুছে নিজে লিখুন:
- একটা arrow function component `App`
- এটা একটা `<main>` return করবে, ভেতরে থাকবে `<h1>`-এ আপনার নাম আর `<p>`-এ এক লাইনের পরিচয় (যেমন "Frontend Developer")
- শেষে `export default App`

Save করে browser-এ দেখুন page update হলো কিনা।

**৫. ছোট্ট প্রশ্ন (নিজে ভাবুন):** JSX-এ `class` না লিখে `className` লিখতে হয় কেন?

---

## প্রশ্ন: `-- --template react` মানে কী?

Command-টাকে ভেঙে দেখালে সহজ হবে:

```
npm create vite@latest   .   --   --template react
└────────┬────────────┘   │   │   └──────┬───────┘
     কোন tool চালাবে    কোথায়  │    Vite-এর option
                              │
                    npm-এর option শেষ
```

### প্রতিটা অংশের মানে

| অংশ | কাজ |
|---|---|
| `npm create vite@latest` | Vite-এর সবচেয়ে নতুন version দিয়ে project বানানোর tool চালায় |
| `.` | project-টা **এই folder-এই** বানাবে, নতুন folder খুলবে না |
| `--` | npm-কে জানায়: "এর পরের option-গুলো তোমার না, Vite-কে দিয়ে দাও" |
| `--template react` | Vite-কে বলে **React template** ব্যবহার করতে |

### `--` কেন লাগে?
`--template react` আসলে npm-এর option না, Vite-এর option। `--` না দিলে npm নিজেই option-টা পড়ার চেষ্টা করত, আর Vite-এর কাছে সেটা পৌঁছাত না। তাই `--` একটা দেয়ালের মতো কাজ করে: বাঁ দিকের অংশ npm-এর, ডান দিকের অংশ Vite-এর।

### `--template react` না দিলে কী হয়?
তখন Vite আপনাকে প্রশ্ন করবে কোন framework চান (React, Vue, Svelte…) আর কোন variant চান (JavaScript বা TypeScript)। arrow key দিয়ে বেছে নিতে হবে। `--template react` দিলে এই প্রশ্নগুলো আর আসে না, সরাসরি **React + JavaScript** দিয়ে project তৈরি হয়ে যায়।

চাইলে শুধু এটুকু চালিয়ে menu থেকে **React → JavaScript** বেছে নিতে পারেন, ফল একই হবে:

```bash
npm create vite@latest .
```

---

## প্রশ্ন: `import { StrictMode } from 'react'`

`StrictMode` হলো React-এর একটা **development-only checker**। এটা চোখে দেখা যায় এমন কিছু render করে না। শুধু আপনার code-এর সম্ভাব্য সমস্যা আগেভাগে ধরিয়ে দেয়।

```jsx
<StrictMode>
  <App />
</StrictMode>
```

এর ভেতরে থাকা সব component-এর ওপর এই check চলে।

### কী কী করে
1. **Component দুইবার render করে।** কোনো component pure না হলে, মানে render-এর সময় বাইরের কিছু বদলে দিলে, দুইবার চালানোর কারণে ভুলটা চোখে পড়ে যায়।
2. **`useEffect` দুইবার চালায়** (mount → unmount → আবার mount)। effect-এর cleanup ঠিকমতো লেখা আছে কিনা সেটা এভাবে পরীক্ষা হয়। Lesson 8-এ এটা কাজে লাগবে।
3. **পুরোনো বা deprecated API** ব্যবহার করলে console-এ warning দেখায়।

### জরুরি কথা
- এটা শুধু **development**-এ চলে। Production build-এ (`npm run build`) কোনো প্রভাব নেই, site ধীরও হয় না।
- পরে `console.log` দুইবার print হতে দেখলে ভয় পাবেন না। এটা bug না, StrictMode-এর কাজ।

**পরামর্শ:** এটা রেখে দিন। ভালো অভ্যাস তৈরিতে সাহায্য করে।

---

## প্রশ্ন: `import { createRoot } from 'react-dom/client'`

`createRoot` হলো সেই function, যেটা React-কে browser-এর HTML-এর সাথে যুক্ত করে। এটাই পুরো app-এর **শুরুর বিন্দু**।

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

### ধাপে ধাপে
1. `document.getElementById('root')`: `index.html`-এর খালি `<div id="root">`-টা খুঁজে বের করে
2. `createRoot(...)`: ওই div-কে একটা **React root** বানায়। এখন থেকে এর ভেতরের সবকিছু React সামলাবে
3. `.render(<App />)`: আপনার `App` component-টা ওই div-এর ভেতরে দেখায়

### `react` আর `react-dom` আলাদা কেন?
- **`react`**: শুধু component, hook (`useState` ইত্যাদি), JSX-এর logic। এটা জানে না কোথায় দেখাতে হবে।
- **`react-dom`**: সেই logic-কে **browser-এর DOM**-এ বসায়।

এভাবে আলাদা রাখার কারণে একই `react` দিয়ে অন্য জায়গাতেও UI বানানো যায়, যেমন React Native দিয়ে mobile app।

### `/client` কেন?
`react-dom/client` হলো browser-এ চালানোর অংশ। এর বাইরে `react-dom/server` আছে, যেটা server-এ HTML বানাতে লাগে (Next.js-এর মতো framework-এ)। আমাদের Vite project-এ শুধু `/client` দরকার।

পুরো app-এ এই function সাধারণত **একবারই** ডাকা হয়। এরপর সব কাজ `App`-এর ভেতরের component-গুলোতে হবে।
