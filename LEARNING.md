# React শেখার Roadmap — Portfolio Project

প্রতিটা lesson-এ portfolio-র একটা নতুন অংশ বানাব এবং একটা নতুন React concept শিখব।
নিয়ম: concept বুঝুন → নিজে code লিখুন → Claude-কে "check করো" বলুন → feedback নিয়ে ঠিক করুন।

Code style: `const`/`let` (কখনো `var` না), arrow function, ছোট component, early return।

## 🟢 Beginner

- [x] **Lesson 0 — Setup**: Vite দিয়ে project, folder structure, `index.html` → `main.jsx` → `App.jsx` কীভাবে চলে
- [ ] **Lesson 1 — JSX ও Component**: `Header`, `Hero`, `Footer` component বানানো
- [ ] **Lesson 2 — Props**: reusable `ProjectCard`, `SkillBadge`
- [ ] **Lesson 3 — List ও `key`**: `src/data/projects.js` থেকে `.map()` দিয়ে project দেখানো
- [ ] **Lesson 4 — Styling**: CSS Modules (পরে চাইলে Tailwind)
- [ ] **Lesson 5 — `useState` ও Event**: mobile menu toggle, dark mode button
- [ ] **Lesson 6 — Conditional rendering**: `&&`, ternary, empty state

## 🟡 Intermediate

- [ ] **Lesson 7 — Form**: controlled input দিয়ে Contact form + validation
- [ ] **Lesson 8 — `useEffect` ও data fetch**: GitHub API থেকে repo list, loading/error state
- [ ] **Lesson 9 — Custom hook**: `useFetch`, `useLocalStorage` (theme মনে রাখা)
- [ ] **Lesson 10 — React Router**: Home, Projects, `/projects/:slug` detail page, 404
- [ ] **Lesson 11 — Context API**: `ThemeContext` দিয়ে পুরো app-এ theme share

## 🔴 Advanced

- [ ] **Lesson 12 — `useReducer`, `useRef`**: project filter/search, scroll-to-section
- [ ] **Lesson 13 — Performance**: `useMemo`, `useCallback`, `React.memo`, `lazy` + `Suspense`
- [ ] **Lesson 14 — React 19 feature**: `useActionState`, `useOptimistic` দিয়ে contact form
- [ ] **Lesson 15 — Testing**: Vitest + React Testing Library
- [ ] **Lesson 16 — Animation ও Accessibility**: Framer Motion, keyboard/screen reader
- [ ] **Lesson 17 — TypeScript** (optional): project-কে `.tsx`-এ migrate
- [ ] **Lesson 18 — Deploy**: Vercel-এ live করা
