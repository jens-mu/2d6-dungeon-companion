# 2D6 Dungeon Companion

A digital tabletop utility designed for the game **2D6 Dungeon**. This tool assists players in mapping procedurally generated corridors, managing journal entries, and organizing their journey through the world of Coradine.

## 🎨 Design Philosophy

The project follows a consistent **"Hand-Drawn Sketch"** aesthetic. By combining `Rough.js` with custom-generated assets, the application mimics the look of an adventurer's physical notebook.

- **Typography**: Uses [Reenie Beanie](https://fonts.google.com/specimen/Reenie+Beanie), a light and organic handwriting font that captures a "scribbled note" vibe.
- **Dynamic UI**: All buttons, panels, and containers are rendered via `Rough.js` to ensure no two borders look exactly the same.
- **Custom Icons**: Features a set of hand-sketched icons for core navigation, including the Journal, Menu, and Asset-Creation tools.
- **Grid System**: A $32\text{px}$ grid featuring a custom-sketched hatch pattern to maintain the "pen-on-paper" feel while mapping.

## 🛠 Technical Stack

- **Framework**: Vue 3 (Composition API) + Vite
- **Canvas Engine**: Konva.js for high-performance mapping.
- **Sketch Rendering**: Rough.js for procedural hand-drawn effects.
- **Styling**: Tailwind CSS for layout and responsive design.
- **State Management**: Pinia (Stores for Dungeon and UI state).
- **Internationalization**: i18n support for multi-language dungeon labels.

## 📂 Project Structure

The project is organized into a modular component architecture:

- `src/components/ui/helpers`: Low-level `RoughCanvas` logic.
- `src/components/ui`: Reusable sketched components like `RoughButton` and `RoughPanel`.
- `src/components/canvas`: The core mapping logic using Konva.
- `src/assets/icons`: Custom SVG assets for the sketched interface.

## 📜 License & Disclaimer

This project is an independent production and is published under the **2D6 Dungeon Third Party License**.

> **2D6 Dungeon Companion** is an independent production by **Jens Muckel** and is not affiliated with **DR Games** or **Toby Lancaster**. It is published under the 2D6 Dungeon Third Party License. 2D6 Dungeon is copyright of **DR Games** and **Toby Lancaster**.

The "2D6 Dungeon Compatible" logo is a trademark of DR Games and is used here to indicate compatibility as encouraged by the license terms.

---

_Created for the 2D6 Dungeon community._
