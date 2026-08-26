# ⚡ Tab Navigator (move-between-tabs)

<p align="center">
  <a href="https://developer.chrome.com/docs/extensions/mv3/intro/"><img src="https://img.shields.io/badge/Manifest-V3-1a73e8?style=flat-square&logo=googlechrome&logoColor=white" alt="Manifest V3" /></a>
  <img src="https://img.shields.io/badge/Permissions-Zero-success?style=flat-square" alt="Zero Permissions" />
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=flat-square" alt="License MIT" /></a>
  <a href="https://github.com/JuanFerber/move-between-tabs/actions/workflows/shellcheck.yml"><img src="https://img.shields.io/github/actions/workflow/status/JuanFerber/move-between-tabs/shellcheck.yml?branch=main&label=ShellCheck&style=flat-square" alt="ShellCheck Status" /></a>
  <a href="https://github.com/JuanFerber/move-between-tabs/releases"><img src="https://img.shields.io/github/v/release/JuanFerber/move-between-tabs?style=flat-square&color=blue" alt="Latest Release" /></a>
</p>

<p align="center">
  <strong>Lightweight, zero-permission Chrome extension to navigate and manage tabs using intuitive keyboard shortcuts.</strong>
</p>

---

## ✨ Features

- 🚀 **Zero-Overhead:** Event-driven Service Worker with near-instant execution and no content scripts injected into web pages.
- 🔒 **100% Private:** Requires **zero permissions** (`permissions: []`). Does not track, read URLs, or collect any user data.
- 🔄 **Cyclic Navigation:** Seamless circular tab switching (from last tab to first, and vice versa).
- ⌨️ **Intuitive Directional Shortcuts:** Navigate using standard arrow keys with modifier keys.

---

## ⌨️ Default Shortcuts

| Action | Command | Default Shortcut |
| :--- | :--- | :--- |
| **Previous tab (Left)** | `switch-left` | <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>←</kbd> |
| **Next tab (Right)** | `switch-right` | <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>→</kbd> |
| **Open new tab & focus** | `open-and-focus-new-tab` | <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>↑</kbd> |
| **Close current tab** | `close-actual-tab` | <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>↓</kbd> |

> [!TIP]
> **Customize Shortcuts:** You can change any shortcut combination anytime by navigating to `chrome://extensions/shortcuts` in your Chrome address bar.

---

## 📦 Installation

### Option 1: From GitHub Releases (Recommended)
1. Download the latest `move-between-tabs.zip` from the [Releases page](https://github.com/JuanFerber/move-between-tabs/releases).
2. Unzip the downloaded file into a folder on your computer.
3. Open Chrome and go to `chrome://extensions/`.
4. Enable **Developer mode** in the top right corner.
5. Click **Load unpacked** and select the unzipped folder.

### Option 2: Clone the Repository
```bash
git clone https://github.com/JuanFerber/move-between-tabs.git
```
Then load the cloned folder in `chrome://extensions/` following steps 3-5 above.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/JuanFerber/move-between-tabs/issues).

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
