# Scrib

**Scrib** is a minimalist, developer-focused journaling desktop application built with Electron.js and React. It offers a clean, distraction-free writing environment and flexible storage options—ideal for developers who want to capture daily notes, code snippets, and reflections.

## 🚀 Features

* **Daily Entry Workflow**: Automatically creates a new entry for each day with date-based organization.
* **Rich Text Editor**: Write in Markdown or plain text, with live preview.
* **Auto‑Save & Versioning**: Entries are auto‑saved as you type, with simple version history to revert changes.
* **Themes & Shortcuts**: Light and dark themes, plus configurable keyboard shortcuts for power users.

## 📦 Tech Stack

* [Electron](https://www.electronjs.org/) for cross-platform desktop packaging
* [React](https://reactjs.org/) with hooks for UI
* Node.js `fs` module for file I/O

## 🛠️ Getting Started

## NOTE - If you just want Scrib, you can download it as an .exe file for Windows from the below link
* [Scrib] (https://taewonyun.com/Scrib) download scrib for windnows

### Prerequisites

* Node.js v14 or later
* npm or yarn package manager

### Install

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/scrib.git
   cd scrib
   ```
2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

### Run in Development

```bash
npm start
# or
yarn start
```

This will launch the app in development mode with hot‑reload enabled.

### Build for Production

```bash
npm run build
# or
yarn build
```

Built packages will be output to the `dist/` folder for your operating system.

## ⚙️ Configuration

* **Storage Location**

  * Go to **Preferences → Storage** to toggle between internal storage or a custom folder.
  * When using a custom folder, `.md` files will be generated per entry.
* **Themes & Shortcuts**

  * Customize in **Preferences → Appearance**.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## ✉️ Contact

Created by Taewon Yun – feel free to [reach out](mailto:him@taewonyun.com) with feedback.
