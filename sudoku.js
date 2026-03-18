// =============================================================
//  SMART SUDOKU SOLVER  –  sudoku.js
//  Depends on: jQuery 2.x  (loaded in index.html before this)
// =============================================================

var empty_arr; // 0 = load puzzle, 1 = load empty grid

// ------------------------------------------------------------------
//  Document ready
// ------------------------------------------------------------------
$(document).ready(function () {
  empty_arr = 0;

  var game = Sudoku.getInstance();
  $("#container").append(game.getBoard());

  // ---- Empty Grid / Manual mode ----
  $("#manual").click(function () {
    $(".sudoku-container").remove();
    empty_arr = 1;
    var game1 = Sudoku.getInstance();
    $("#container").append(game1.getBoard());
  });

  // ---- Freeze filled cells ----
  $("#freeze").on("click", function () {
    var inputs = $("input");
    var tds    = $("td");

    for (var i = 0; i < 81; i++) {
      var $my_input = $(inputs[i]);
      var $my_td    = $(tds[i]);
      var valu      = $my_input.val();

      if (valu != 0) {
        $my_input.prop("disabled", true);
        $my_td.toggleClass("freezer");
      }
    }
  });

  // ---- Clear only non-frozen inputs ----
  $("#clear2").on("click", function () {
    $("input").each(function () {
      if (!$(this).is("[disabled]")) {
        if ($(this).val() != 0) {
          $(this).val(null);
          $(this).toggleClass("sudoku-backspace");
        }
      }
    });
  });
});

// ------------------------------------------------------------------
//  Puzzle matrices
// ------------------------------------------------------------------
function generate() {

  // Puzzle 1
  var arr1 = [
    [5, 1, 7, 6, 8, 9, 0, 0, 4],
    [2, 0, 9, 1, 0, 4, 0, 0, 0],
    [3, 4, 6, 2, 7, 5, 0, 9, 0],
    [6, 0, 2, 0, 0, 0, 0, 1, 0],
    [1, 3, 8, 0, 0, 6, 0, 4, 7],
    [9, 5, 0, 0, 0, 0, 0, 0, 0],
    [4, 9, 0, 0, 0, 0, 3, 7, 8],
    [7, 2, 0, 4, 1, 0, 5, 6, 0],
    [8, 6, 0, 0, 0, 0, 1, 2, 9]
  ];

  // Puzzle 2
  var arr8 = [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
  ];

  // Empty grid (Manual mode)
  var arr7 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  // Add more puzzles to this array to enable random selection
  var arr  = [arr8];
  var arre = [arr7];

  var random1 = Math.floor(Math.random() * arr.length);

  if (empty_arr === 1) {
    return arre[0];
  } else {
    return arr[random1];
  }
}

// Expose generate() so clear1 can call it via kaitari()
function kaitari() {
  return generate();
}

// ------------------------------------------------------------------
//  Sudoku module  (Revealing-Module / Singleton pattern)
// ------------------------------------------------------------------
var Sudoku = (function ($) {

  var _instance,
      _game,
      defaultConfig = { validate_on_insert: true },
      counter       = 0;

  // ----------------------------------------------------------------
  //  init – creates a new Game and exposes getBoard()
  // ----------------------------------------------------------------
  function init(config) {
    var conf = $.extend({}, defaultConfig, config);
    _game    = new Game(conf);

    return {
      getBoard: function () { return _game.buildBoard(); }
    };
  }

  // ----------------------------------------------------------------
  //  Game constructor
  // ----------------------------------------------------------------
  function Game(config) {
    this.config      = config;
    this.$cellmatrix = {};
    this.$matrix     = {};
    this.validation  = {};
    return this;
  }

  // ----------------------------------------------------------------
  //  Game prototype – all board / hint / validation methods
  // ----------------------------------------------------------------
  Game.prototype = {

    // ---- Build the 9×9 table ----
    buildBoard: function () {
      var arrele = generate();
      var $td, $tr;
      var $table = $("<table>").addClass("sudoku-container");

      for (var i = 0; i < 9; i++) {
        $tr = $("<tr>").addClass("sudoku-row");
        this.$cellmatrix[i] = {};

        for (var j = 0; j < 9; j++) {
          if (arrele[i][j] === 0) {
            // Empty cell → editable input
            this.$cellmatrix[i][j] = $("<input>")
              .attr("maxlength", 1)
              .data("matrixele", arrele)
              .data("row", i)
              .data("col", j)
              .on("keyup", $.proxy(this.onKeyUp, this));
            $td = $("<td>").append(this.$cellmatrix[i][j]);
          } else {
            // Pre-filled cell → plain number
            this.$cellmatrix[i][j] = arrele[i][j];
            $td = $("<td>").append(this.$cellmatrix[i][j]);
          }
          $tr.append($td);
        }
        $table.append($tr);
      }

      // Bind button handlers
      $("#steprun").data("matrixele", arrele).on("click", $.proxy(this.singlerow, this));
      $("#clear").data("matrixele", arrele).on("click",   $.proxy(this.clear, this));
      $("#clear1").data("matrixele", arrele).on("click",  $.proxy(this.clear1, this));
      $("#sudonum").data("mat", arrele).on("change",      $.proxy(this.getrowcol, this));

      return $table;
    },

    // ---- Clear all hint highlights ----
    clear: function (e) {
      var classes = ["rowyellow", "digitblue", "changegreen", "columnp",
                     "roworangei", "roworange", "babypink"];
      classes.forEach(function (cls) {
        $("tr").removeClass(cls);
        $("td").removeClass(cls);
      });
      document.getElementById("resultColumn").innerHTML = "";
      document.getElementById("resultC").innerHTML      = "";
      document.getElementById("resultRow").innerHTML    = "";
      document.getElementById("resultR").innerHTML      = "";
      document.getElementById("resultSector").innerHTML = "";
      document.getElementById("resultS").innerHTML      = "";
      document.getElementById("alert1").innerHTML       = "";
      document.getElementById("alert2").innerHTML       = "";
      document.getElementById("alert3").innerHTML       = "";
    },

    // ---- Clear all user-entered (non-frozen) values ----
    clear1: function (e) {
      var arrelem = $(e.currentTarget).data("matrixele");

      $("input").each(function () {
        if (!$(this).is("[disabled]")) {
          if ($(this).val() != 0) {
            $(this).val("");
            $(this).toggleClass("sudoku-backspace");
          }
        }
      });

      var nava = kaitari();
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (arrelem[i][j] !== nava[i][j]) {
            arrelem[i][j] = 0;
          }
        }
      }
    },

    // ---- Dropdown number hint ----
    getrowcol: function (e) {
      var arrelem = $(e.currentTarget).data("mat");
      var optId   = $(e.currentTarget).find("option:selected").attr("id");
      var rsen    = true;
      var csen    = true;

      var getrown = this.getrowarr(optId, arrelem);
      var getcoln = this.getcolarr(optId, arrelem);

      $("tr").removeClass("rowyellow");
      $("td").removeClass("rowyellow");
      $("tr").removeClass("digitblue");
      $("td").removeClass("digitblue");

      // Highlight rows containing the selected digit
      for (var i in getrown) {
        $("tr").eq(getrown[i]).toggleClass("rowyellow");
      }

      // Highlight columns containing the selected digit
      for (var i in getcoln) {
        var colNum = getcoln[i] + 1;
        $("table").find("td:nth-child(" + colNum + ")").toggleClass("rowyellow");
      }

      // Mark cells where digit CAN go (row & col both free)
      for (var n = 0; n < 9; n++) {
        for (var m = 0; m < 9; m++) {
          if (arrelem[n][m] !== 0 && arrelem[n][m] != optId) {
            rsen = true;
            for (var ii = 0; ii < 9; ii++) {
              if (arrelem[n][ii] == optId) { rsen = false; break; }
            }
            csen = true;
            for (var p = 0; p < 9; p++) {
              if (arrelem[p][m] == optId) { csen = false; break; }
            }
            if (rsen && csen) {
              $("table")
                .find("tr:nth-child(" + (n + 1) + ")")
                .find("td:nth-child(" + (m + 1) + ")")
                .toggleClass("digitblue");
            }
          }
        }
      }

      var arrsinele = this.sectorcheck(arrelem, optId);
      this.changecolour(arrsinele, arrelem, optId);
    },

    // ---- Apply green highlights per sector ----
    changecolour: function (arrsinele, arrelem, num) {
      var sectorMap = [
        { k: 1, rs: 0, re: 3, cs: 0, ce: 3 },
        { k: 2, rs: 0, re: 3, cs: 3, ce: 6 },
        { k: 3, rs: 0, re: 3, cs: 6, ce: 9 },
        { k: 4, rs: 3, re: 6, cs: 0, ce: 3 },
        { k: 5, rs: 3, re: 6, cs: 3, ce: 6 },
        { k: 6, rs: 3, re: 6, cs: 6, ce: 9 },
        { k: 7, rs: 6, re: 9, cs: 0, ce: 3 },
        { k: 8, rs: 6, re: 9, cs: 3, ce: 6 },
        { k: 9, rs: 6, re: 9, cs: 6, ce: 9 }
      ];

      for (var i in arrsinele) {
        var entry = sectorMap[arrsinele[i] - 1];
        if (entry) {
          this.changegreen(entry.k, entry.rs, entry.re, entry.cs, entry.ce, arrelem, num);
        }
      }
    },

    changegreen: function (sec_no, rs, re, cs, ce, arrelem, num) {
      for (var i = rs; i < re; i++) {
        for (var j = cs; j < ce; j++) {
          if (arrelem[i][j] === 0) {
            var rr = this.checkRow(num, i, arrelem);
            var cc = this.checkCol(num, j, arrelem);
            var ss = this.checksub(rs, re, cs, ce, num, arrelem);
            if (rr && cc && ss) {
              $("table")
                .find("tr:nth-child(" + (i + 1) + ")")
                .find("td:nth-child(" + (j + 1) + ")")
                .toggleClass("changegreen");
            }
          }
        }
      }
    },

    // ---- Sector check – returns sectors where digit has exactly 1 valid cell ----
    sectorcheck: function (arrelem, num) {
      var sectorDefs = [
        [1, 0, 3, 0, 3], [2, 0, 3, 3, 6], [3, 0, 3, 6, 9],
        [4, 3, 6, 0, 3], [5, 3, 6, 3, 6], [6, 3, 6, 6, 9],
        [7, 6, 9, 0, 3], [8, 6, 9, 3, 6], [9, 6, 9, 6, 9]
      ];
      var arrget = [];
      for (var i = 0; i < sectorDefs.length; i++) {
        var d  = sectorDefs[i];
        var gn = this.sectorgreen(d[0], d[1], d[2], d[3], d[4], arrelem, num);
        if (gn === d[0]) arrget.push(gn);
      }
      return arrget;
    },

    sectorgreen: function (sec_no, rs, re, cs, ce, arrelem, num) {
      $("tr").removeClass("changegreen");
      $("td").removeClass("changegreen");

      var count = 0;
      for (var i = rs; i < re; i++) {
        for (var j = cs; j < ce; j++) {
          if (arrelem[i][j] === 0) {
            if (this.checkRow(num, i, arrelem) && this.checkCol(num, j, arrelem)) {
              count++;
            }
          }
        }
      }
      return (count === 1) ? sec_no : 0;
    },

    // ---- Row/column index helpers ----
    getrowarr: function (num, arrelem) {
      var rowarr = [];
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (arrelem[i][j] == num) rowarr.push(i);
        }
      }
      return rowarr;
    },

    getcolarr: function (num, arrelem) {
      var rowarr = [];
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          if (arrelem[i][j] == num) rowarr.push(j);
        }
      }
      return rowarr;
    },

    // ---- Sector with exactly one empty cell ----
    sectorsingle: function (sec_no, sr, er, sc, ec, arrelem) {
      var count = 0;
      for (var i = sr; i < er; i++) {
        for (var j = sc; j < ec; j++) {
          if (arrelem[i][j] !== 0) count++;
        }
      }
      return (count === 8) ? sec_no : 0;
    },

    showsingleS: function (arrelem) {
      var sectorDefs = [
        [1, 0, 3, 0, 3], [2, 0, 3, 3, 6], [3, 0, 3, 6, 9],
        [4, 3, 6, 0, 3], [5, 3, 6, 3, 6], [6, 3, 6, 6, 9],
        [7, 6, 9, 0, 3], [8, 6, 9, 3, 6], [9, 6, 9, 6, 9]
      ];
      var arr_ret = [];
      for (var i = 0; i < sectorDefs.length; i++) {
        var d = sectorDefs[i];
        var s = this.sectorsingle(d[0], d[1], d[2], d[3], d[4], arrelem);
        if (s > 0) arr_ret.push(s);
      }
      return arr_ret;
    },

    // ---- STEP RUN – single-empty-cell hints ----
    singlerow: function (e) {
      var arrelem  = $(e.currentTarget).data("matrixele");
      var arrsin   = this.showsingleC(arrelem);
      var arrsinR  = this.showsingleR(arrelem);
      var arrsinS  = this.showsingleS(arrelem);
      var count    = arrsinR.length;
      var count2   = arrsin.length;

      // --- Alert messages ---
      document.getElementById("alert1").innerHTML =
        (arrsin.length === 0)  ? "No missing value in column " : "";
      document.getElementById("alert2").innerHTML =
        (arrsinR.length === 0) ? "No missing value in row "    : "";
      document.getElementById("alert3").innerHTML =
        (arrsinS.length === 0) ? "No missing value in Sector " : "";

      if (arrsin.length  === 0) { document.getElementById("resultColumn").innerHTML = ""; document.getElementById("resultC").innerHTML = ""; }
      if (arrsinR.length === 0) { document.getElementById("resultRow").innerHTML    = ""; document.getElementById("resultR").innerHTML = ""; }
      if (arrsinS.length === 0) { document.getElementById("resultSector").innerHTML = ""; document.getElementById("resultS").innerHTML = ""; }

      // Clear previous highlights
      $("tr").removeClass("roworange");
      $("td").removeClass("columnp");
      $("tr").removeClass("babypink");
      $("td").removeClass("babypink");
      $("tr").removeClass("roworangei");
      $("td").removeClass("roworangei");

      var num_array  = this.missing_col_num(arrsin, arrelem);
      var num_arrayR = this.missing_row_num(arrsinR, arrelem);
      var num_arrayS = this.missing_sector_num(arrsinS, arrelem);

      // Sector hint (only when no row/col hints)
      if (count2 === 0 && count === 0) {
        this.loopFunction(arrsinS, arrelem);
        if (arrsinS.length > 0) {
          document.getElementById("resultS").innerHTML       = arrsinS[0];
          document.getElementById("resultSector").innerHTML  = num_arrayS[0];
        }
      }

      // Column hints
      if (count2 === 0 && arrsin.length > 0) {
        for (var i in arrsin) {
          var colIdx = arrsin[i];
          var res    = colIdx + 1;
          $("table").find("td:nth-child(" + res + ")").toggleClass("columnp");
          document.getElementById("resultC").innerHTML      = arrsin[0] + 1;
          document.getElementById("resultColumn").innerHTML = num_array[0];

          for (var z = 0; z < 9; z++) {
            if (arrelem[z][colIdx] === 0) {
              $("table")
                .find("tr:nth-child(" + (z + 1) + ")")
                .find("td:nth-child(" + res + ")")
                .toggleClass("roworangei");
            }
          }
        }
      }

      // Row hints
      for (var i in arrsinR) {
        var rowIdx = arrsinR[i];
        $("tr").eq(rowIdx).toggleClass("roworange");
        document.getElementById("resultR").innerHTML   = arrsinR[0] + 1;
        document.getElementById("resultRow").innerHTML = num_arrayR[0];

        for (var j = 0; j < 9; j++) {
          if (arrelem[rowIdx][j] === 0) {
            $("table")
              .find("tr:nth-child(" + (rowIdx + 1) + ")")
              .find("td:nth-child(" + (j + 1) + ")")
              .toggleClass("roworangei");
          }
        }
        count--;
      }
    },

    // ---- Find missing number in rows that have 8 filled cells ----
    missing_row_num: function (arrsin, arrelem) {
      var x     = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      var arr_1 = [];

      for (var i = 0; i < arrsin.length; i++) {
        var k = arrsin[i];
        var y = [];
        for (var j = 0; j < 9; j++) {
          if (arrelem[k][j] !== 0) y.push(arrelem[k][j]);
        }
        var sorty = y.sort(function (a, b) { return a - b; });
        for (var g = 0; g < 9; g++) {
          if (x[g] !== sorty[g]) { arr_1.push(x[g]); break; }
        }
      }
      return arr_1;
    },

    // ---- Find missing number in a sub-grid range ----
    get_missing_num: function (sr, er, sc, ec, arrelem) {
      var y    = [];
      var x    = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (var i = sr; i < er; i++) {
        for (var j = sc; j < ec; j++) {
          if (arrelem[i][j] !== 0) y.push(arrelem[i][j]);
        }
      }
      var sorty = y.sort(function (a, b) { return a - b; });
      for (var g = 0; g < 9; g++) {
        if (x[g] !== sorty[g]) return x[g];
      }
      return 0;
    },

    // ---- Find missing number for each single-empty sector ----
    missing_sector_num: function (arrsinS, arrelem) {
      var sectorDefs = [
        [1, 0, 3, 0, 3], [2, 0, 3, 3, 6], [3, 0, 3, 6, 9],
        [4, 3, 6, 0, 3], [5, 3, 6, 3, 6], [6, 3, 6, 6, 9],
        [7, 6, 9, 0, 3], [8, 6, 9, 3, 6], [9, 6, 9, 6, 9]
      ];
      var arr_num = [];
      for (var i = 0; i < arrsinS.length; i++) {
        var k = arrsinS[i];
        var d = sectorDefs[k - 1];
        if (d) {
          var gn = this.get_missing_num(d[1], d[2], d[3], d[4], arrelem);
          if (gn > 0) arr_num.push(gn);
        }
      }
      return arr_num;
    },

    // ---- Highlight entire sector in pink when it has one empty cell ----
    loopFunction: function (arrsinS, arrelem) {
      $("tr").removeClass("babypink");
      $("td").removeClass("babypink");

      var sectorDefs = [
        [1, 0, 3, 0, 3], [2, 0, 3, 3, 6], [3, 0, 3, 6, 9],
        [4, 3, 6, 0, 3], [5, 3, 6, 3, 6], [6, 3, 6, 6, 9],
        [7, 6, 9, 0, 3], [8, 6, 9, 3, 6], [9, 6, 9, 6, 9]
      ];

      for (var idx = 0; idx < arrsinS.length; idx++) {
        var k = arrsinS[idx];
        var d = sectorDefs[k - 1];
        if (!d) continue;

        var rs = d[1], re = d[2], cs = d[3], ce = d[4];

        for (var i = rs; i < re; i++) {
          for (var j = cs; j < ce; j++) {
            $("table")
              .find("tr:nth-child(" + (i + 1) + ")")
              .find("td:nth-child(" + (j + 1) + ")")
              .toggleClass("babypink");

            if (arrelem[i][j] === 0) {
              $("table")
                .find("tr:nth-child(" + (i + 1) + ")")
                .find("td:nth-child(" + (j + 1) + ")")
                .toggleClass("roworangei");
            }
          }
        }
      }
    },

    // ---- Find missing number for columns with 8 filled cells ----
    missing_col_num: function (arrsin, arrelem) {
      var x     = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      var arr_1 = [];

      for (var i = 0; i < arrsin.length; i++) {
        var k = arrsin[i];
        var y = [];
        for (var j = 0; j < 9; j++) {
          if (arrelem[j][k] !== 0) y.push(arrelem[j][k]);
        }
        var sorty = y.sort(function (a, b) { return a - b; });
        for (var g = 0; g < 9; g++) {
          if (x[g] !== sorty[g]) { arr_1.push(x[g]); break; }
        }
      }
      return arr_1;
    },

    // ---- Columns with exactly one empty cell ----
    showsingleC: function (arrelem) {
      var arr = [];
      for (var i = 0; i < 9; i++) {
        var count = 0;
        for (var j = 0; j < 9; j++) {
          if (arrelem[j][i] !== 0) count++;
        }
        if (count === 8) arr.push(i);
      }
      return arr;
    },

    // ---- Rows with exactly one empty cell ----
    showsingleR: function (arrelem) {
      var arr = [];
      for (var i = 0; i < 9; i++) {
        var count = 0;
        for (var j = 0; j < 9; j++) {
          if (arrelem[i][j] !== 0) count++;
        }
        if (count === 8) arr.push(i);
      }
      return arr;
    },

    // ================================================================
    //  VALIDATION
    // ================================================================

    // ---- Fires on every keyup inside an input cell ----
    onKeyUp: function (e) {
      var val     = $.trim($(e.currentTarget).val());
      var row     = $(e.currentTarget).data("row");
      var col     = $(e.currentTarget).data("col");
      var arrelem = $(e.currentTarget).data("matrixele");
      var keycode = e.which;
      var input   = e.currentTarget;

      // Reject non-numeric
      if (!$.isNumeric(val)) {
        $(e.currentTarget).val("");
      }

      // Reject zero
      if ($.isNumeric(val) && (keycode === 48 || keycode === 96)) {
        $(e.currentTarget).val("");
      }

      if (this.config.validate_on_insert) {
        input.classList.remove("sudoku-input-error");
        input.classList.remove("sudoku-backspace");

        var isvalid = this.validateNumber(val, row, col, arrelem);

        if ($.isNumeric(val) && val != 0) {
          arrelem[row][col] = parseInt(val, 10);
          if (!isvalid) {
            input.classList.toggle("sudoku-input-error");
          }
        }

        // Backspace clears the cell
        if (keycode === 8) {
          arrelem[row][col] = 0;
          input.classList.toggle("sudoku-backspace");
        }
      }
    },

    // ---- Check row for duplicate ----
    checkRow: function (num, rowid, arrmat) {
      for (var i = 0; i < 9; i++) {
        if (arrmat[rowid][i] == num) return false;
      }
      return true;
    },

    // ---- Check column for duplicate ----
    checkCol: function (num, colid, arrmat) {
      for (var i = 0; i < 9; i++) {
        if (arrmat[i][colid] == num) return false;
      }
      return true;
    },

    // ---- Check 3×3 sub-grid for duplicate ----
    checksub: function (rs, re, cs, ce, num, arrmat) {
      for (var i = rs; i < re; i++) {
        for (var j = cs; j < ce; j++) {
          if (arrmat[i][j] == num) return false;
        }
      }
      return true;
    },

    // ---- Map cell position → correct sector, then call checksub ----
    checkSector: function (num, rowid, colid, arrmat) {
      var rs, re, cs, ce;

      if      (rowid < 3)              { rs = 0; re = 3; }
      else if (rowid >= 3 && rowid < 6){ rs = 3; re = 6; }
      else                             { rs = 6; re = 9; }

      if      (colid < 3)              { cs = 0; ce = 3; }
      else if (colid >= 3 && colid < 6){ cs = 3; ce = 6; }
      else                             { cs = 6; ce = 9; }

      return this.checksub(rs, re, cs, ce, num, arrmat);
    },

    // ---- Full validation (row + col + sector) ----
    validateNumber: function (num, rowid, colid, arrmat) {
      if (num === "" || !$.isNumeric(num) || num < 1 || num > 9) return true;

      var cr = this.checkRow(num, rowid, arrmat);
      var cc = this.checkCol(num, colid, arrmat);
      var cs = this.checkSector(num, rowid, colid, arrmat);

      return (cr && cc && cs);
    }
  }; // end Game.prototype

  // ----------------------------------------------------------------
  //  Public API – Singleton
  // ----------------------------------------------------------------
  return {
    getInstance: function (config) {
      if (!_instance) {
        _instance = init(config);
      }
      return _instance;
    }
  };

})(jQuery);
