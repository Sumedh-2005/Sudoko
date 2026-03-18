# 🧩 Smart Sudoku Solver

> A browser-based interactive Sudoku game that solves puzzles using **human logical techniques** — not brute-force algorithms. Designed to help users **learn and understand Sudoku strategies** through color-coded, step-by-step visual hints.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Solving Logics](#-sudoku-solving-logics-implemented)
- [Color Legend](#-color-legend)
- [Controls](#-application-controls)
- [How to Run](#-how-to-run-the-project)
- [Project Structure](#-project-structure)
- [Technology Stack](#-technology-stack)
- [Screenshots](#-screenshots)
- [Project Status](#-project-status)
- [Future Improvements](#-future-improvements)
- [Development Methodology](#-development-methodology)
- [Author](#-author)

---

## 📖 About the Project

**Smart Sudoku Solver** is a web-based Sudoku game and learning tool that implements **13 paper-and-pencil solving logics** to guide users through solving Sudoku puzzles visually.

Instead of automatically solving the puzzle, the solver **teaches users how to think** — highlighting valid placements, eliminating impossible positions, and pinpointing cells where only one number can go. It currently supports **Easy and Medium level** Sudoku puzzles.

---

## ✨ Features

- ✅ Interactive **9×9 Sudoku Grid**
- ✅ **13 logic-based step-by-step hints**
- ✅ **Color-coded visualization** of each solving technique
- ✅ **Custom puzzle input** via Empty Grid / Manual mode
- ✅ **Real-time input validation** (highlights errors instantly)
- ✅ **Freeze cells** to lock in confirmed digits
- ✅ **Clear hints and reset** options
- ✅ Supports **Easy and Medium difficulty** puzzles

---

## 🧠 Sudoku Solving Logics Implemented

The solver is built around **13 logical techniques** used in manual Sudoku solving:

| # | Logic | Description |
|---|-------|-------------|
| 1 | **High Frequency Number** | Start with the digit that appears most often in the grid |
| 2 | **Single Cell in Sector** | If a 3×3 sector has only one valid position for a digit, place it there |
| 3 | **Single Possible Cell in Column** | Only one non-eliminated cell remains in a column |
| 4 | **Single Possible Cell in Row** | Only one non-eliminated cell remains in a row |
| 5 | **Sector Elimination** | Highlight and eliminate the sector that already contains the digit |
| 6 | **Row Elimination** | Highlight and eliminate the entire row containing the digit |
| 7 | **Column Elimination** | Highlight and eliminate the entire column containing the digit |
| 8 | **Row & Column Intersection** | After elimination, the remaining single cell in a sector must hold the digit |
| 9 | **Missing Number in Row** | One empty cell in a row → Missing = `45 − (sum of other digits)` |
| 10 | **Missing Number in Column** | One empty cell in a column → Missing = `45 − (sum of other digits)` |
| 11 | **Missing Number in Sector** | One empty cell in a sector → Missing = `45 − (sum of other digits)` |
| 12 | **Three Remaining Numbers** | When 3 numbers remain in a row/column, use restrictions to assign them |
| 13 | **Candidate Reduction** | Three empty cells with two candidates → third cell gets the remaining number |

---

## 🎨 Color Legend

| Color | Meaning |
|-------|---------|
| 🔵 **Light Blue** | Original pre-filled puzzle values |
| 🟢 **Green** | Valid cell to place the selected number |
| 🟣 **Purple** | Column with a single empty cell |
| 🟠 **Orange** | Row with a single empty cell |
| 🟡 **Yellow** | Rows/columns already containing the selected digit |
| 🩷 **Pink** | Sector (3×3 box) with a single empty cell |
| 🔴 **Red** | Invalid entry — number already exists in row, column, or sector |

---

## 🎮 Application Controls

| Button | Function |
|--------|----------|
| **Dropdown Menu** | Select a digit to see all valid positions highlighted on the board |
| **STEP RUN** | Shows the next logical hint (single empty row, column, or sector) |
| **CLEAR HINT** | Removes all current color highlights from the board |
| **EMPTY / MANUAL** | Clears the entire grid for custom puzzle input |
| **FREEZE** | Locks all currently filled cells to prevent accidental changes |
| **CLEAR BOARD** | Clears only user-entered digits; original puzzle values remain |

---

## 🚀 How to Run the Project

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge)
- [VS Code](https://code.visualstudio.com/) *(optional but recommended)*
- [Git](https://git-scm.com/downloads) *(only needed to clone the repository)*

---

### ▶️ Method 1 — Direct Browser (Simplest)

1. Download or clone this repository
2. Open the project folder
3. **Double-click `index.html`**
4. The game opens directly in your browser ✅

---

### ▶️ Method 2 — VS Code with Live Server (Recommended)

1. Install [VS Code](https://code.visualstudio.com/)
2. Open VS Code → Click **Extensions** (`Ctrl + Shift + X`)
3. Search for **Live Server** by *Ritwick Dey* → Click **Install**
4. Click **File → Open Folder** → Select your `sudoku` project folder
5. Open `index.html` in the editor
6. Right-click inside the file → Click **"Open with Live Server"**
7. Browser opens automatically at `http://127.0.0.1:5500/index.html` ✅

---

### ▶️ Method 3 — Clone from GitHub

Open your terminal or command prompt and run:

```bash
git clone https://github.com/YourName/smart-sudoku-solver.git
cd smart-sudoku-solver
```

Then open `index.html` in your browser or use Live Server as shown in Method 2.

---

### ⚠️ Important — Required Files

Make sure **all these files are in the same folder** before running:

| File | Description |
|------|-------------|
| `index.html` | Main file — open this to launch the game |
| `style.css` | All styles and color themes |
| `sudoku.js` | Game logic, hints, and validation |
| `joanna-kosinska-...jpg` | Background image |

> If the background image is missing, the game still works but the background will be blank.

---

### ▶️ How to Play

1. The Sudoku board loads automatically with a puzzle
2. Click any **empty white cell** and type a number (1–9)
   - 🔴 **Red** = invalid (number already exists in that row, column, or sector)
   - ✅ **No highlight** = valid entry
3. Use the **hint tools** for guidance:
   - **Dropdown** → Select a number to see all valid positions on the board
   - **STEP RUN** → Highlights the row, column, or sector with one missing value
   - **CLEAR HINT** → Removes all highlights
4. Use **EMPTY / MANUAL** to enter your own custom puzzle
5. Use **FREEZE** to lock filled cells
6. Use **CLEAR BOARD** to reset your entered values

---

## 📁 Project Structure

```
smart-sudoku-solver/
│
├── index.html                          # Main HTML structure
├── style.css                           # All CSS styles and color themes
├── sudoku.js                           # Game logic, hint system, validation
├── joanna-kosinska-...jpg              # Background image
└── README.md                           # Project documentation
```

---

## 🛠 Technology Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure and layout of the web application |
| **CSS3** | Styling, grid design, and color-coded highlights |
| **JavaScript (ES5)** | Sudoku solving logic, hints, and validation |
| **jQuery 2.1.3** | DOM manipulation and event handling |
| **Microsoft Excel** | Prototype development and logic testing |
| **VBA & Macros** | Initial logic validation before web implementation |

---

## 📷 Screenshots

**1. Dropdown Hint — Green cells show valid positions for the selected digit**

<img width="940" height="529" alt="Dropdown Hint" src="https://github.com/user-attachments/assets/bea94ce1-af9a-4622-bcb3-e7f610442859" />

---

**2. Step Run — Pink highlight shows a sector with a single empty cell**

<img width="940" height="529" alt="Sector Hint" src="https://github.com/user-attachments/assets/8f0f5e0d-0ac6-4149-aac9-8bed5136620f" />

---

**3. Step Run — Purple highlight shows a column with a single empty cell**

<img width="940" height="529" alt="Column Hint" src="https://github.com/user-attachments/assets/d21ed11b-0635-4d2f-b01f-701ba46df99a" />

---

## 📊 Project Status

| Feature | Status |
|---------|--------|
| Logic solver (13 techniques) | ✅ Complete |
| Interactive Sudoku interface | ✅ Complete |
| Visual hint system | ✅ Complete |
| Real-time validation | ✅ Complete |
| Hard difficulty support | ⏳ Planned |
| Automatic full solver | ⏳ Planned |
| Score & leaderboard system | ⏳ Planned |

### ⚠️ Current Limitations
- Supports **Easy and Medium** puzzles only
- No undo/redo functionality yet
- No timer or scoring system yet

---

## 🔮 Future Improvements

- ⏱ **Score system** based on time taken to solve
- 🏆 **Leaderboard** for top players
- ↩ **Undo / Redo** feature
- ✏ **Erase tool** for individual cells
- 🧠 **Complete automatic Sudoku solver**
- 💾 **Database integration** to store scores
- 🔥 **Hard difficulty** puzzle support
- 📱 **Mobile responsive** layout

---

## 🏗 Development Methodology

The project was developed using a **combination of Waterfall and Agile approaches** across three phases:

**Phase 1 — Paper-Based Logic Analysis**
Sudoku solving strategies were tested manually using paper and pencil to understand each logical technique before coding.

**Phase 2 — Prototype Development**
A working prototype was built in **Microsoft Excel** using VBA Macros, Conditional Formatting, and logical functions (`IF`, `ISBLANK`, `COUNTBLANK`) to validate each logic.

**Phase 3 — Web Implementation**
The validated logic was translated into a full web application using HTML, CSS, JavaScript, and jQuery.

---

## 👨‍💻 Author

**Sumedh Ajay Talokar**

This project was independently designed and developed, including:
- Sudoku solving logic design
- Excel prototype development
- Full web application implementation

---

> ⭐ If you found this project useful, consider giving it a star on GitHub!
