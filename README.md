# 🧠 Smart Sudoku Solver

**Smart Sudoku Solver** is a web-based Sudoku game and learning tool that demonstrates how Sudoku puzzles can be solved using **human logical techniques instead of brute-force algorithms**.

The project implements **13 paper-and-pencil solving logics** and visually demonstrates them using **color-coded hints**, helping users **learn Sudoku strategies step-by-step while solving puzzles**.

This solver currently supports **Easy and Medium level Sudoku puzzles** and provides interactive guidance for users through logical hints.



# 🎯 Project Goals

* Provide a **logic-based Sudoku solving experience**
* Help users **learn Sudoku strategies visually**
* Implement **step-by-step hints based on logical deduction**
* Create an interactive **Sudoku learning tool**

---

# ✨ Features

✔ Interactive **9×9 Sudoku Grid**
✔ **Step-by-step logical hints**
✔ **Color-coded visualization** of solving techniques
✔ Ability to **enter custom Sudoku puzzles**
✔ **Freeze user inputs** to prevent accidental changes
✔ **Clear hints and reset puzzle options**
✔ Supports **Easy and Medium difficulty Sudoku**

---

# 🧠 Sudoku Solving Logics Implemented

The solver is based on **13 logical techniques used in manual Sudoku solving**.

---

## Logic 1 – Start with High Frequency Number

Begin solving the puzzle with the digit that appears most frequently in the grid.

---

## Logic 2 – Single Cell in Sector

If a **3×3 sector** has only one possible position for a number, that cell is selected using row and column elimination.

---

## Logic 3 – Single Possible Cell in Column

If only one non-highlighted cell remains in a column after applying elimination logic, the number is placed in that cell.

---

## Logic 4 – Single Possible Cell in Row

If only one non-highlighted cell remains in a row, the number is placed in that position.

---

## Logic 5 – Sector Elimination

When a digit is selected:

* The **entire sector containing that digit** is marked in **yellow**
* That sector is eliminated as a possible placement location.

---

## Logic 6 – Row Elimination

When a digit is selected:

* The **entire row containing that digit** is highlighted
* That row is discarded for further placements of that digit.

---

## Logic 7 – Column Elimination

When a digit is selected:

* The **entire column containing that digit** is highlighted
* That column is eliminated.

---

## Logic 8 – Row and Column Intersection

After eliminating possible cells using row and column rules, the **remaining single cell in a sector must contain the selected digit**.

---

## Logic 9 – Missing Number in Row

If a row has **only one empty cell**, the missing number is calculated as:

```
Missing Number = 45 - (Sum of other digits in the row)
```

The row is highlighted in **light blue**.

---

## Logic 10 – Missing Number in Column

If a column has **one empty cell**, the missing number is:

```
Missing Number = 45 - (Sum of other digits in the column)
```

The column is highlighted in **purple**.

---

## Logic 11 – Missing Number in Sector

If a **3×3 sector has one empty cell**, the missing number is:

```
Missing Number = 45 - (Sum of other digits in the sector)
```

The sector is highlighted with **light skin color**.

---

## Logic 12 – Three Remaining Numbers Logic

When only **three numbers remain in a row or column**:

1. Two cells may contain two of the numbers.
2. By checking row and column restrictions, candidate numbers are identified.
3. The remaining number goes into the final cell.

---

## Logic 13 – Candidate Reduction Logic

When **three cells are empty** in a row or column:

* Two cells will contain two possible candidates.
* The third cell will contain the **remaining unused number**.

---

# 🎮 Application Controls

| Button             | Function                                                  |
| ------------------ | --------------------------------------------------------- |
| **STEP RUN**       | Displays the next logical hint                            |
| **CLEAR HINT**     | Removes highlighted hint                                  |
| **EMPTY / MANUAL** | Clears the grid for custom puzzle input                   |
| **FREEZE**         | Locks user-entered digits                                 |
| **CLEAR**          | Clears user-entered digits while keeping original numbers |

---

# 🏗 Development Methodology

The project was developed using a **combination of Waterfall and Agile approaches**.

### Phase 1 – Paper-Based Logic Analysis

Sudoku solving strategies were **tested manually using paper and pencil**.

### Phase 2 – Prototype Development

A working prototype was built using **Microsoft Excel** with:

* VBA Macros
* Conditional Formatting
* Logical Functions (`IF`, `ISBLANK`, `COUNTBLANK`)

### Phase 3 – Web Implementation

The final solver was implemented as a **web application** using modern web technologies.

---

# 🛠 Technology Stack

| Technology      | Purpose                          |
| --------------- | -------------------------------- |
| HTML            | Structure of the web application |
| CSS             | Styling and grid layout          |
| JavaScript      | Sudoku solving logic             |
| XSLT            | Data processing                  |
| Microsoft Excel | Prototype development            |
| VBA & Macros    | Logic testing                    |
| Microsoft Word  | Documentation                    |

---

# 📊 Project Status

✅ Logic solver implemented
✅ Interactive Sudoku interface
✅ Hint system with visual logic representation

⚠ Current limitations:

* Only **Easy and Medium Sudoku puzzles**
* Execution speed could be optimized
* Advanced solving strategies not yet implemented

---

# 🚀 Future Improvements

Planned enhancements include:

* ⏱ **Score system based on time**
* 🏆 **Leaderboard for top players**
* ↩ **Undo feature**
* ✏ **Erase tool**
* 🧠 **Complete automatic Sudoku solver**
* 💾 **Database to store scores**
* 🔥 **Support for Hard Sudoku puzzles**

---

# 📷 Screenshots


1. The Below screenshot gives the hint needed for the user while solving the green colour cell represents the eligible cell for the digit selected from the drop down list.


<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/bea94ce1-af9a-4622-bcb3-e7f610442859" />


2. Below screenshots shows hint for the single empty cell in the sector


<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/8f0f5e0d-0ac6-4149-aac9-8bed5136620f" />


3. Below screenshots shows hint for the single empty cell in the column


<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/d21ed11b-0635-4d2f-b01f-701ba46df99a" />


---

# 👨‍💻 Author

**Smart Sudoku Solver**

Developed by **[Sumedh Ajay Talokar]**

This project was **independently designed and developed**, including:

* Sudoku solving logic design
* Prototype development
* Web application implementation

---
