# IFMG Handbook – Comprehensive Documentation

## Overview
The **IFMG Handbook** is a lightweight, client-side web application that provides a conversational guide for students of IFMG-GV.  
It is written entirely in **HTML**, **CSS**, and **Vanilla JavaScript** (ES Modules) and requires **no server-side runtime**—just open `index.html` in any modern browser.

Main features:
* A ready-made list of Frequently Asked Questions (`answers.js`).
* A chat-like UI that shows rich responses (text, images, videos, downloads, links).
* Automatic dark-mode detection & manual override helpers.
* Image light-box with smooth animations.

---

## Quick Start
1. Clone or download the repository.
2. Serve the root folder with any static-file server **or** simply double-click `index.html`.
3. Interact with the chatbot using the question picker or by extending the API with your own entries (see below).

> 💡  _Tip:_ When using a local web-server you avoid CORS restrictions for media files.

---

## Project Layout
```
├── index.html          # Main page & UI markup
├── style.css           # All styling (light & dark themes)
├── script.js           # Application logic / UI behaviour
├── model
│   └── answers.js      # Public knowledge-base (exported constant)
├── assets              # Images, videos, downloadable files, icons
└── DOCUMENTATION.md    # ← you are here
```

---

## Public APIs
Below you find every symbol that is meant to be consumed or extended by external code.

### 1. `answers`  
`model/answers.js`
```js
export const answers = {
  /* key */: {
    text: "string",              // mandatory – main reply shown in chat
    link: {                      // OPTIONAL – external link
      content: "https://…",     // URL
      caption: "Clique aqui"     // anchor text
    },
    image: ["/path/img1.png", …],// OPTIONAL – one or more images (slideshow if >1)
    video: {                     // OPTIONAL – HTML5 video
      content: "/path/video.mp4",
      caption: "Tour virtual"   // shown below video
    },
    download: {                  // OPTIONAL – downloadable file
      link: "/path/file.pdf",
      caption: "Baixar PDF",
      file_name: "custom-name"  // value for the HTML download attribute
    }
  },
  // …more entries
};
```
**Purpose**:  Acts as a knowledge-base that powers the chatbot. Each key appears as an option in the question `<select>` inside `index.html`.

#### Example – Adding a new FAQ
```js
// model/answers.js
export const answers = {
  // …existing entries
  cafeteriaMenu: {
    text: "Onde encontro o cardápio do RU?",
    link: {
      content: "https://ifmg.edu.br/ru/cardapio.pdf",
      caption: "Cardápio desta semana"
    }
  }
};
```
Then add a matching `<option>` in `index.html`:
```html
<option value="cafeteriaMenu">Onde encontro o cardápio do RU?</option>
```
That's it—no further code required.

---

### 2. `addMessage(response, className)`
`script.js`

Renders a message element inside the chat‐window.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `response` | `object` | ✅ | The same structure used in `answers` (see above). |
| `className` | `"user-message" \| "bot-message"` | ✅ | Defines styling & avatar position. |

```js
import { addMessage } from "./script.js"; // if you export it explicitly

addMessage({ text: "Olá mundo!" }, "bot-message");
```
*(In the current implementation `addMessage` is **internal**; export it if you need programmatic access.)*

---

### 3. `setDarkMode(isDark)`
`script.js`

Applies or removes the `.dark-mode` class on `<body>` and swaps logos accordingly.

```js
setDarkMode(true);  // Force dark-theme
setDarkMode(false); // Back to light
```

The function is called automatically on page-load via the `prefers-color-scheme` media-query listener.

---

### 4. `enableFullScreenOnClick()`
`script.js`

Attaches click-handlers to all elements with the `.clickable-image` class (added by `addMessage`) and provides a full-screen light-box with animation & ESC support.

Normally you don't call this directly; `addMessage` invokes it every time a new message is appended so newly inserted images are interactive.

---

## Event Flow
1. **User picks a question** → `click`/`Enter` event handler in `script.js` fires.
2. Selected `<option>` key fetches the corresponding entry from `answers`.
3. `addMessage` is called twice – once for the user prompt and once (with delay) for the bot reply.
4. Embedded media become interactive through `enableFullScreenOnClick()`.
5. Dark-mode state is synced via `setDarkMode()` listener.

---

## Extending / Customising
* **New media types** – Enhance `addMessage` with additional `else if (response.audio) …` blocks.
* **Styling** – Modify classes in `style.css` or replace images in `assets/images`.
* **Analytics** – Google Analytics snippet already present in `index.html`; adapt or remove as needed.

---

## Browser Support
Tested on the latest versions of **Chrome**, **Firefox**, and **Edge**.  
Requires ES 2020 support for optional chaining & `import` statements.

---

## License
This project is released under the MIT License.