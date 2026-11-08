# 🟢 Lesson 1 — JSX ও Component

## Concept ১: Component কী
Component হলো একটা function, যেটা UI (JSX) return করে। এতে বড় page-কে ছোট ছোট টুকরোয় ভাগ করা যায়, আর প্রতিটা টুকরো আলাদা file-এ রাখা যায়।

```jsx
// src/components/Greeting.jsx
const Greeting = () => {
  return <p>Hello!</p>;
};

export default Greeting;
```

```jsx
// অন্য file-এ ব্যবহার
import Greeting from "./components/Greeting";

<Greeting />
```

**নিয়ম:** component-এর নাম অবশ্যই **বড় হাতের অক্ষর** দিয়ে শুরু হবে (`Greeting`, `greeting` না)। ছোট হাতের নাম দেখলে React সেটাকে সাধারণ HTML tag ভাবে।

## Concept ২: JSX-এর নিয়ম
1. **একটাই parent থাকতে হবে।** পাশাপাশি দুইটা tag সরাসরি return করা যায় না, একটা কিছু দিয়ে মুড়তে হয়। বাড়তি `div` না চাইলে **Fragment** `<>...</>` ব্যবহার করুন।
2. **সব tag বন্ধ করতে হবে**, যেমন `<img />`, `<br />`।
3. **`{}` দিয়ে JavaScript লেখা যায়:**
   ```jsx
   const name = "Shiam";
   <h1>Hi, {name}!</h1>
   <p>{2026 - 2020} years of coding</p>
   ```
   `{}`-এর ভেতরে শুধু **expression** দেওয়া যায় (যেটা একটা value দেয়)। `if` বা `for`-এর মতো statement চলে না।
4. **Attribute-এর নাম camelCase:** `className`, `htmlFor`, `onClick`।

## Concept ৩: Folder structure
```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   └── Footer.jsx
├── App.jsx
└── main.jsx
```

---

## আপনার Task

**১. `src/components/` folder বানান**, ভেতরে তিনটা file।

**২. `Header.jsx`:**
- `<header>` return করবে
- ভেতরে একটা logo/নাম (যেমন `<a href="#">Shiam.</a>`)
- একটা `<nav>`, তাতে তিনটা link: Projects, About, Contact (`href="#projects"` ইত্যাদি)

**৩. `Hero.jsx`:**
- `<section>` return করবে
- Component-এর **ভেতরে কিন্তু return-এর আগে** দুইটা `const` variable রাখুন: `name` আর `role`
- JSX-এ `{}` দিয়ে সেগুলো দেখান: `<h1>H