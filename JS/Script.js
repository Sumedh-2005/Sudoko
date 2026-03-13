var empty_arr;
    // .ready function executes whenever the html page is ready

      $(document).ready(function() {
	  empty_arr = 0;
        var game = Sudoku.getInstance();
      //  appends the board in the divsion whose id is container .
        $("#container").append(game.getBoard());
		
		$("#manual").click(function(){
            $(".sudoku-container").remove();
            empty_arr = 1;
            var game1 = Sudoku.getInstance();
		
             $("#container").append(game1.getBoard());       
        }); 
		
		$("#freeze").on("click",function(){
         var inputs = $('input');
        var tds = $('td');
        for(var i = 0; i < 81; i++){
            $my_input = $(inputs[i]);
            $my_td = $(tds[i]);
           var valu = $my_input.val();
           if(valu != 0){
             $my_input.prop("disabled",true);
             $my_td.toggleClass("freezer");
             
           }
        }
       
        });
		$("#clear2").on("click",function(){
          
          $("input").each(function(){
            if($(this).is('[disabled]') == false ){
              if($(this).val() != 0){
              $(this).val(null);
              $(this).toggleClass("sudoku-backspace");
              
                    }

               }

          })
          
        });
		
      });
      // this function returns all the functions to .reaady function
      var Sudoku = (function($) {
        
        var _instance,
          _game,
          defaultConfig = {
            validate_on_insert: true
          },
          paused = false,
          counter = 0;

        function init(config) {
          conf = $.extend({}, defaultConfig, config);
          _game = new Game(conf);

          return {
            getBoard: function() {
              return _game.buildBoard();
            }
           
          };
        }
        // function to select any sudoku problem matrix at a randow 
        function generate() {
 
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
          // var arr2 = [
          //   [0, 0, 3, 0, 6, 9, 8, 0, 0],
          //   [0, 0, 0, 0, 0, 0, 9, 0, 0],
          //   [2, 7, 0, 0, 0, 0, 0, 0, 3],
          //   [0, 9, 0, 0, 0, 7, 0, 0, 0],
          //   [3, 2, 8, 9, 1, 4, 5, 6, 0],
          //   [1, 0, 0, 0, 3, 0, 0, 0, 0],
          //   [0, 0, 0, 0, 0, 0, 0, 0, 7],
          //   [5, 4, 0, 6, 0, 0, 0, 0, 2],
          //   [0, 0, 0, 4, 0, 0, 0, 0, 0]
          // ];
          // var arr3 = [
          //   [0, 0, 0, 5, 0, 0, 4, 7, 3],
          //   [0, 0, 0, 0, 6, 0, 0, 0, 0],
          //   [0, 0, 5, 7, 1, 0, 2, 0, 6],
          //   [5, 8, 4, 3, 2, 1, 7, 6, 0],
          //   [7, 6, 0, 8, 0, 5, 0, 0, 2],
          //   [0, 3, 0, 9, 0, 0, 1, 5, 8],
          //   [0, 1, 0, 0, 0, 0, 8, 2, 9],
          //   [0, 9, 2, 0, 3, 0, 5, 0, 7],
          //   [0, 0, 7, 2, 0, 0, 0, 0, 0]
          // ];
          // var arr4 = [
          //    [1, 0, 0, 0, 0, 0, 0, 0, 0],
          //    [2, 5, 3, 4, 6, 9, 1, 7, 0],
          //    [3, 0, 0, 0, 0, 0, 3, 4, 8],
          //    [6, 3, 0, 7, 0, 0, 0, 1, 9],
          //    [4, 0, 7, 9, 3, 1, 8, 0, 0],
          //    [8, 9, 1, 4, 0, 2, 7, 6, 3],
          //    [9, 0, 8, 0, 6, 0, 0, 3, 0],
          //    [7, 0, 5, 2, 0, 0, 0, 0, 0],
          //    [0, 0, 0, 0, 5, 8, 4, 0, 0]
          //  ];
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
          // var arr5 = [
          //   [0, 0, 0, 4, 0, 8, 2, 0, 0],
          //   [0, 0, 4, 0, 0, 7, 3, 9, 0],
          //   [3, 0, 0, 0, 2, 0, 4, 7, 0],
          //   [2, 0, 0, 1, 7, 0, 0, 0, 0],
          //   [6, 0, 5, 0, 4, 0, 0, 0, 0],
          //   [0, 1, 0, 0, 8, 9, 0, 0, 0],
          //   [0, 6, 2, 0, 9, 0, 0, 4, 0],
          //   [0, 0, 0, 8, 0, 4, 0, 6, 0],
          //   [0, 9, 1, 2, 0, 5, 0, 0, 7]
          // ];
          // var arr6 = [
          //   [1, 0, 0, 0, 0, 0, 0, 0, 0],
          //   [0, 5, 3, 0, 0, 0, 1, 7, 0],
          //   [0, 0, 0, 0, 0, 0, 3, 4, 8],
          //   [6, 3, 0, 7, 0, 0, 0, 1, 9],
          //   [0, 0, 7, 9, 3, 1, 8, 0, 0],
          //   [8, 9, 0, 0, 0, 2, 0, 0, 3],
          //   [2, 0, 8, 0, 6, 0, 0, 3, 0],
          //   [7, 0, 5, 2, 0, 0, 0, 0, 0],
          //   [0, 0, 0, 0, 5, 8, 4, 0, 0]
          // ];
		  
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

          var arr = [];
		  var arre = [];
		  
			//arr.push(arr1);
			arr.push(arr8);
			//arr.push(arr2);
          // arr.push(arr3);
			// arr.push(arr4);
          // arr.push(arr5);
          // arr.push(arr6);
			arre.push(arr7);
			
          var random1 = Math.floor(Math.random() * arr.length);
          //   alert(arr[random1]);
          // the matrix which is selected at random is being returned
          if(empty_arr == 1){
            return arre[0];}
            else{
          return arr[random1];}   
        }
		
      //  function which has all the variables declared and this returns all these variables to the prototype
        function Game(config) {
          this.config = config;
          this.$cellmatrix = {};
          this.$matrix = {};
          this.validation = {};
          // this.resetValidationMatrix();
          return this;
        }
		function kaitari(){
			var laiborr = generate();
			
			return laiborr;
		};
        Game.prototype = {
		
          
          // this function buils the table 
          buildBoard: function() {
          //  calling the generate which returns the matrix at the random
			var navinarray=[];
            var arrele = generate();
            var $td,
              $tr,
              // creating table and adding class to it to do css 
              $table = $("<table>").addClass("sudoku-container");
			  

            for (var i = 0; i < 9; i++) {
              // creating 9 rows
              $tr = $("<tr>").addClass("sudoku-row");
              this.$cellmatrix[i] = {}; 
              for (var j = 0; j < 9; j++) {
                // creating 9 columns 
				// navinarray.push(i,j);
                if (arrele[i][j] == 0) {
                  // if the matrix has the value as zero than make this cell as input type and call onKeyUp function everytime a user inputs any value 
                  this.$cellmatrix[i][j] = $("<input>")
                    .attr("maxlength", 1)
                    .data("matrixele", arrele)
                    .data("row", i)
                    .data("col", j)
                    .on("keyup", $.proxy(this.onKeyUp, this));
                  $td = $("<td>").append(this.$cellmatrix[i][j]);
                } else if (arrele[i][j] != 0) {
                  // if the matrix value is not zero than place that number in the cell.
                  this.$cellmatrix[i][j] = arrele[i][j];
                  $td = $("<td>").append(this.$cellmatrix[i][j]);
				 
                }
				
                $tr.append($td);
				
              }
              $table.append($tr);
            }
			//alert(navinarray);
            $("#steprun").data("matrixele", arrele).on("click" ,$.proxy(this.singlerow , this));
			$("#clear").data("matrixele", arrele).on("click" ,$.proxy(this.clear , this));
			$("#clear1").data("matrixele", arrele).on("click" ,$.proxy(this.clear1 , this));
			$("#sudonum")
              .data("mat", arrele)
              .on("change", $.proxy(this.getrowcol, this));
            return $table;
            
          },
		  
		  clear: function(e){
			$("tr").removeClass("rowyellow");
			$("td").removeClass("rowyellow");
			$("tr").removeClass("digitblue");
			$("td").removeClass("digitblue");
			$("tr").removeClass("changegreen");
			$("td").removeClass("changegreen");
			$("tr").removeClass("columnp");
			$("td").removeClass("columnp");
			$("tr").removeClass("roworangei");
			$("td").removeClass("roworangei");
			$("tr").removeClass("roworange");
			$("td").removeClass("roworange");
			$("tr").removeClass("babypink");
			$("td").removeClass("babypink");
			document.getElementById("resultColumn").innerHTML = "";
			document.getElementById("resultC").innerHTML = "";
			document.getElementById("resultRow").innerHTML = "";
			document.getElementById("resultR").innerHTML = "";
			document.getElementById("resultSector").innerHTML = "";
			document.getElementById("resultS").innerHTML = "";
			document.getElementById("alert1").innerHTML = "";
			document.getElementById("alert2").innerHTML = "";
			document.getElementById("alert3").innerHTML = "";
			
		  },
		  
		  
		  clear1 : function (e){
		  
		  arrelem = $(e.currentTarget).data("matrixele");
		  
		  $("input").each(function(){
            if($(this).is('[disabled]') == false ){
              if($(this).val() != 0){
              $(this).val('');
              $(this).toggleClass("sudoku-backspace");             
                   
			}
			}
          })
			let nava = kaitari();
			//alert(nava);
			
			for (var i = 0; i<9;i++)
			{
				for (var j = 0;j<9;j++)
				{
					if(arrelem[i][j] !=nava[i][j])
					{
						//alert("inside navaaa");
						arrelem[i][j]=0;
					}
				}
			}
		  
		  
		  },
		  getrowcol: function (e) {
            var arrelem = $(e.currentTarget).data("mat");
            //alert(arrelem);
            // alert("inside function");
            var optId = $(e.currentTarget).find("option:selected").attr("id");
             //alert(optId);
             var rsen = true ;
             var csen = true ;
            var getrown = this.getrowarr(optId, arrelem);

            var getcoln = this.getcolarr(optId, arrelem);
            // alert(getrown);
            // alert(getcoln);

            $("tr").removeClass("rowyellow");
			      $("td").removeClass("rowyellow");
            $("tr").removeClass("digitblue");
			      $("td").removeClass("digitblue");
			
            for (var i in getrown) {
              var num = getrown[i];
              $("tr").eq(num).toggleClass("rowyellow");
            }

           
            for(var i in getcoln){
               var num = getcoln[i];
               num++;
             $('table').find('td:nth-child(' + num + ')').toggleClass("rowyellow");
            }
           
              for(var n=0 ; n<9 ; n++){
                // alert(n);
                
              for(var m=0 ; m<9 ; m++){
                // alert(m);
                if(arrelem[n][m] != 0 && arrelem[n][m] != optId){
                  // alert(arrelem[n][m]);
                  for(var i=0 ;i<9;i++){
                    if(arrelem[n][i] == optId){
                      rsen = false;
                      break;
                    }
                    else{
                      rsen = true;
                    }
                  }
                  for(var p=0 ;p<9;p++){
                    if(arrelem[p][m] == optId){
                      csen = false;
                      break;
                    }
                    else{
                      csen = true;
                    }
                  }
                  // alert(rsen);
                  // alert(csen);
                  if (rsen == true && csen== true){
                    // apply css to cell whose row number is n amd whose column number is m 
  				   // already made class in the css with blue colour whose name is digitblue
					var resr = n + 1 ;
					var resc = m + 1 ;
					
					$('table').find('tr:nth-child(' + resr + ')').find('td:nth-child(' + resc + ')').toggleClass("digitblue");
								
                  }
                }
              }
           
              }
			  
           
           var arrsinele =this.sectorcheck(arrelem,optId);
              this.changecolour(arrsinele,arrelem,optId);
          },
          changecolour : function(arrsinele , arrelem , num){
            var n=arrsinele.length;
            for(var i=0;i<n;i++){
              var k =arrsinele[i];
              if(k==1){
                this.changegreen(1,0,3,0,3,arrelem ,num);
              }
              if(k==2){
                this.changegreen(2,0,3,3,6,arrelem ,num);
              }
              if(k==3){
                this.changegreen(3,0,3,6,9,arrelem ,num);
              }
              if(k==4){
                this.changegreen(4,3,6,0,3,arrelem ,num);
              }
              if(k==5){
                this.changegreen(5,3,6,3,6,arrelem ,num);
              }
              if(k==6){
                this.changegreen(6,3,6,6,9,arrelem ,num);
              }
              if(k==7){
                this.changegreen(7,6,9,0,3,arrelem ,num);
              }
              if(k==8){
                this.changegreen(8,6,9,3,6,arrelem ,num);
              }
              if(k==9){
                this.changegreen(9,6,9,6,9,arrelem ,num);
              }

            }
          },
          changegreen:function(sec_no,rs,re,cs,ce,arrelem,num){
		 // $("tr").removeClass("chnagegreen");
            var rr=true;
            var cc=true;
            var ss=true;
            for(var i = rs;i<re;i++){
              for(var j=cs;j<ce;j++){
                if(arrelem[i][j] == 0){
                  rr=this.checkRow(num,i,arrelem);
                  cc=this.checkCol(num,j,arrelem);
                  ss=this.checksub(rs,re,cs,ce,num,arrelem);
                  if(rr==true && cc == true && ss == true){
                    //toggle here same as the digit blue .
                    //in row i at position j that cell should be green
                  //  alert("in sector" + sec_no + "at postion" +i+j);
				   $('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("changegreen");
                  }
                }
              }
            }		
          },
          sectorcheck:function(arrelem,num){
            var gn1=0;
            var gn2=0;
            var gn3=0;
            var gn4=0;
            var gn5=0;
            var gn6=0;
            var gn7=0;
            var gn8=0;
            var gn9=0;
            var arrget=[];
            gn1 = this.sectorgreen(1,0,3,0,3,arrelem,num);
            if(gn1 == 1){
              arrget.push(gn1);
            }
            gn2 = this.sectorgreen(2,0,3,3,6,arrelem,num);
            if(gn2 == 2){
              arrget.push(gn2);
            }
            gn3 = this.sectorgreen(3,0,3,6,9,arrelem,num);
            if(gn3 == 3){
              arrget.push(gn3);
            }
            gn4 = this.sectorgreen(4,3,6,0,3,arrelem,num);
            if(gn4 == 4){
              arrget.push(gn4);
            }
            gn5 = this.sectorgreen(5,3,6,3,6,arrelem,num);
            if(gn5 == 5){
              arrget.push(gn5);
            }
            gn6 = this.sectorgreen(6,3,6,6,9,arrelem,num);
            if(gn6 == 6){
              arrget.push(gn6);
            }
            gn7 = this.sectorgreen(7,6,9,0,3,arrelem,num);
            if(gn7 == 7){
              arrget.push(gn7);
            }
            gn8 = this.sectorgreen(8,6,9,3,6,arrelem,num);
            if(gn8 == 8){
              arrget.push(gn8);
            }
            gn9 = this.sectorgreen(9,6,9,6,9,arrelem,num);
            if(gn9 == 9){
              arrget.push(gn9);
            }
            return arrget ;
          },
          sectorgreen: function(sec_no ,rs,re,cs,ce,arrelem,num){
			$("tr").removeClass("changegreen");
			$("td").removeClass("changegreen");
			document.onkeypress=function(e)
			{	
				//$("tr").removeClass("changegreen");
				$("td").removeClass("changegreen");
			}
            var rsen =true;
            var csen = true;
            var count = 0;
            var numzero =0;
            // var ssen =true ;
            for(var i=rs ;i<re ;i++)
            {
              for(var j=cs ; j<ce ; j++){
                if(arrelem[i][j] == 0) {
                  rsen =this.checkRow(num , i,arrelem);
                csen = this.checkCol(num , j,arrelem);
                if(rsen == true && csen == true ){
                  count = count +1; 
                }
                }
               
              }
            }
            if(count == 1){
              return sec_no ;
            }
            else{
              return  numzero ;
            }
          },

          getrowarr: function (num, arrelem) {
            var rowarr = [];
			//alert(num);
            for (var i = 0; i < 9; i++) {
              for (var j = 0; j < 9; j++) {
                if (arrelem[i][j] == num) {
                  rowarr.push(i);
                }
              }
            }
            return rowarr;
          },
          getcolarr: function (num, arrelem) {
            var rowarr = [];
            for (var i = 0; i < 9; i++) {
              for (var j = 0; j < 9; j++) {
                if (arrelem[i][j] == num) {
                  rowarr.push(j);
                }
              }
            }
            return rowarr;
          },

          sectorsingle : function(sec_no ,sr,er,sc,ec,arrelem){
            var count=0;
            var no_sec =0;
            for(var i = sr ;i<er;i++){
              for(var j=sc ; j<ec ;j++){
                if( arrelem[i][j] != 0){
                  count=count + 1;
                }
              }
            }
            if(count == 8){
              return sec_no ;
            }
            else{
              return no_sec;
            }

          },

		  showsingleS:function(arrelem){
        var arr_ret =[];
        var s1 = 0 ,s2 =0 ,s3=0,s4=0,s5=0,s6=0,s7=0,s8=0,s9=0;
        s1 = this.sectorsingle( 1 , 0 , 3 ,0,3,arrelem);
        if(s1>0){
          arr_ret.push(s1);
        }
        s2 = this.sectorsingle( 2 , 0 , 3 ,3,6,arrelem);
        if(s2>0){
          arr_ret.push(s2);
        }
        s3 = this.sectorsingle( 3 , 0 , 3 ,6,9,arrelem);
        if(s3>0){
          arr_ret.push(s3);
        }
        s4 = this.sectorsingle( 4 , 3,6,0,3,arrelem);
        if(s4>0){
          arr_ret.push(s4);
        }
        s5 = this.sectorsingle( 5 , 3,6,3,6,arrelem);
        if(s5>0){
          arr_ret.push(s5);
        }
        s6 = this.sectorsingle( 6 ,3,6,6,9,arrelem);
        if(s6>0){
          arr_ret.push(s6);
        }
        s7 = this.sectorsingle( 7 ,6,9,0,3,arrelem);
        if(s7>0){
          arr_ret.push(s7);
        }
        s8 = this.sectorsingle( 8 , 6,9,3,6,arrelem);
        if(s8>0){
          arr_ret.push(s8);
        }
        s9 = this.sectorsingle( 9 ,6,9,6,9,arrelem);
        if(s9>0){
          arr_ret.push(s9);
        }

        return arr_ret;
      },
          singlerow: function(e){
			
            var arrelem = $(e.currentTarget).data("matrixele");
            
            var arrsin = this.showsingleC(arrelem);
			var arrsinR = this.showsingleR(arrelem);
			var arrsinS = this.showsingleS(arrelem);

      // alert("there is a missing value in sector number " + arrsinS);
			var count = arrsinR.length;
			//alert(count);
			var count2 = arrsin.length;
			if(arrsin == '')
			{
				//alert('No missing value in column');
				document.getElementById("alert1").innerHTML = 'No missing value in column ';
				document.getElementById("resultColumn").innerHTML = "";
				document.getElementById("resultC").innerHTML = "";
				
			}
			else
			{
				document.getElementById("alert1").innerHTML = '';
			}
			if(arrsinR == '')
			{
				//alert('No missing value in row');	
				document.getElementById("alert2").innerHTML = 'No missing value in row ';
				document.getElementById("resultRow").innerHTML = "";
				document.getElementById("resultR").innerHTML = "";				
				
			}
			else
			{
				document.getElementById("alert2").innerHTML = '';
			}
			if(arrsinS == '')
			{
				//alert('No missing value in Sector');	
				document.getElementById("alert3").innerHTML = 'No missing value in Sector ';
				document.getElementById("resultSector").innerHTML = "";
				document.getElementById("resultS").innerHTML = "";				
				
			}
			else
			{
				document.getElementById("alert3").innerHTML = '';
			}
			
			$("tr").removeClass("roworange");
			$('td').removeClass("columnp");
			$("tr").removeClass("babypink");
			$('td').removeClass("babypink");
			$("tr").removeClass("roworangei");
			$("td").removeClass("roworangei");
			
			var num_array=this.missing_col_num(arrsin , arrelem);
			var num_arrayR=this.missing_row_num(arrsinR , arrelem);
			var num_arrayS=this.missing_sector_num(arrsinS , arrelem);
			
      // alert(num_arrayS);
			//alert("there is a missing value in sector number " + arrsinS + "the values are " + num_arrayS);
			if (count2 == 0 && count == 0)
			{
				var num_arrayS2=this.loopFunction(arrsinS , arrelem);
				for(var i in arrsinS)
				{
				
					//specify row which has empty cell 
					var num = arrsinS[i];
					// append number to allocate in empty cell 
					//$('tr').eq(num).toggleClass("roworange");
				
					document.getElementById("resultS").innerHTML = arrsinS[0];
					document.getElementById("resultSector").innerHTML = num_arrayS[0];
				
					//document.onkeypress=function(e){
						
					//	document.getElementById("resultSector").innerHTML = num_arrayS[i];
					//	document.getElementById("resultS").innerHTML = arrsinS[i];
					//}

				if(counter<=0){}
				
				}
				
			}
			
			if (count == 0)
			{
				for(var i in arrsin)
				{
					
				var num = arrsin[i];
				var res = num+1;
				$('table').find('td:nth-child(' + res + ')').toggleClass("columnp");
			
					document.getElementById("resultC").innerHTML = arrsin[0]+1;
					document.getElementById("resultColumn").innerHTML = num_array[0];
					for (z = 0;z < 9; z++)
						{
						if(arrelem[z][arrsin[i]]==0)
						{
							
							//alert("col num "+arrsin[i]);
							//alert("i "+i);
							//alert ("j "+j);
							
							var k = arrsin[i] +1;
							
							//alert(k);	
							$('table').find('tr:nth-child(' + (z+1) + ')').find('td:nth-child(' + (k) + ')').toggleClass("roworangei");
						}
						
						}
					
				}
				
					
			}
           	
           for(var i in arrsinR){
			
			
			  //specify row which has empty cell 
              var num = arrsinR[i];
				// append number to allocate in empty cell 
				$('tr').eq(num).toggleClass("roworange");
				document.getElementById("resultR").innerHTML = arrsinR[0]+1;
				document.getElementById("resultRow").innerHTML = num_arrayR[0];
			
						for (var j = 0;j < 9; j++)
						{
							if(arrelem[arrsinR[i]][j]==0)
							{
							
								//alert("row num "+arrsinR[i]);
								//alert("i "+i);
								//alert ("j "+j);
								k = arrsinR[i] +1;
								
								$('table').find('tr:nth-child(' + (k) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("roworangei");
							
							
							}
						
						}
				if(counter<=0){}
				count--;
            }
			
			
            //this.alert_mess(arrsin,num_array);
          },

          alert_mess: function(arrsin,num_array){
            var alen = arrsin.length;
            var nlen=num_array.length;
            if(alen == nlen){
              for(var i =0 ; i < alen ;i++){
                var showw =arrsin[i]+1; 
               // alert("Col No : " + showw + "missing value is:" +num_array[i]);
              }
            }
          },
          missing_row_num : function(arrsin , arrelem){
            // alert("inside missing row num");
            const x =[1,2,3,4,5,6,7,8,9];

            var n=arrsin.length;
            // alert(n);
            var gotnum;
            var arr_1 = [];
            //alert(n);
            for(var i=0 ; i< n;i++){
              var k=arrsin[i];
              var y=[];
              // alert(k);
              for(var j =0;j<9;j++){
                // alert("inside for");
                if(arrelem[k][j] != 0){
                  y.push(arrelem[k][j]);
                }
              }
              // alert("outside for");
              var sorty=y.sort();
              // alert(sorty);
              for(var g=0 ;g<9;g++){
                if(x[g] != sorty[g]){
                  gotnum = x[g];
                  //alert(gotnum);
                  // alert("before push");
                  arr_1.push(gotnum);
                  // alert("after push");
                  break;                   
            }
          }
        }
        // alert(arr_1);
        // alert("before return missing row num");
        return  arr_1 ;
          },
          get_missing_num : function(sr,er,sc,ec,arrelem){
            var y=[];
            var gotnum =0;
            const x =[1,2,3,4,5,6,7,8,9];
            for(var i =sr ; i<er;i++){
              for(var j=sc ; j< ec;j++){
                if(arrelem[i][j] != 0){
                  y.push(arrelem[i][j]);
                }
              }
            }
            var sorty = y.sort();
            for(var g=0 ;g<9;g++){
                if(x[g] != sorty[g]){
                  gotnum = x[g];
                  break;                   
            }
          }
           return gotnum ; 
          },
          
          missing_sector_num : function(arrsinS , arrelem){
            var gn1 =0 ,gn2=0 , gn3 =0 , gn4=0,gn5=0,gn6=0,gn7=0,gn8=0,gn9=0;
            var arr_num = [];
            var n=arrsinS.length;
           // console.log(arrsinS);
            for(var i = 0 ; i< n ;i++){
              var k = arrsinS[i];
              if(k == 1){
                gn1 = this.get_missing_num (0 , 3 , 0 ,3 , arrelem);
                if(gn1 > 0){
                  arr_num.push(gn1);
                }
              }
              if(k == 2){
                gn2 = this.get_missing_num (0 , 3 , 3 ,6 , arrelem);
                if(gn2 > 0){
                  arr_num.push(gn2);
                }
              }
              if(k == 3){
                gn3 = this.get_missing_num (0 , 3 , 6 ,9 , arrelem);
                if(gn3 > 0){
                  arr_num.push(gn3);
                }
              }
              if(k == 4){
                gn4 = this.get_missing_num (3 , 6 , 0 ,3 , arrelem);
                if(gn4 > 0){
                  arr_num.push(gn4);
                }
              }
              if(k == 5){
                gn5 = this.get_missing_num (3 , 6 , 3 ,6 , arrelem);
                if(gn5 > 0){
                  arr_num.push(gn5);
                }
              }
              if(k == 6){
                gn6 = this.get_missing_num (3,6,6,9, arrelem);
                if(gn6 > 0){
                  arr_num.push(gn6);
                }
              }
              if(k == 7){
                gn7 = this.get_missing_num (6,9,0,3 , arrelem);
                if(gn7 > 0){
                  arr_num.push(gn7);
                }
              }
              if(k == 8){
                gn8 = this.get_missing_num (6,9,3,6, arrelem);
                if(gn8 > 0){
                  arr_num.push(gn8);
                }
              }
              if(k == 9){
                gn9 = this.get_missing_num (6,9,6,9 , arrelem);
                if(gn9 > 0){
                  arr_num.push(gn9);
                }
              }
            }
            return arr_num;
          },
          loopFunction:function(arrsinS,arrelem){
            
            $("tr").removeClass("babypink");
		    $("td").removeClass("babypink");
            var n=arrsinS.length;
            for(var i = 0 ; i< n ;i++){
              var k = arrsinS[i];
              if(k == 1){
               // gn1 = this.get_missing_num (0 , 3 , 0 ,3 , arrelem);
               for(var i=0 ; i<3;i++){
                for(var j=0; j<3;j++){
                  console.log("row"+i);
                  console.log("col"+j);
					
                  $('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("babypink");
				  if(arrelem[i][j]==0)
					{
						$('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("roworangei");
					}
                }
				}	
              }
              if(k == 2){
                for(var i=0 ; i<3;i++){
                for(var j=3; j<6;j++){
                  console.log("row"+i);
                  console.log("col"+j);
                  $('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("babypink");
                   if(arrelem[i][j]==0)
					{
						$('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("roworangei");
					}
                }

              }
              }
              if(k == 3){
                //gn3 = this.get_missing_num (0 , 3 , 6 ,9 , arrelem);
                for(var i=0 ; i<3;i++){
                for(var j=6; j<9;j++){
                  console.log("row"+i);
                  console.log("col"+j);
                  $('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("babypink");
                   if(arrelem[i][j]==0)
					{
						$('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("roworangei");
					}
                }

              }
              }
              if(k == 4){
               // gn4 = this.get_missing_num (3 , 6 , 0 ,3 , arrelem);
                for(var i=3 ; i<6;i++){
                for(var j=0; j<3;j++){
                  console.log("row"+i);
                  console.log("col"+j);
                  $('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("babypink");
                   if(arrelem[i][j]==0)
					{
						$('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("roworangei");
					}
                }

              }
              }
              if(k == 5){
               // gn5 = this.get_missing_num (3 , 6 , 3 ,6 , arrelem);
                for(var i=3 ; i<6;i++){
                for(var j=3; j<6;j++){
                  console.log("row"+i);
                  console.log("col"+j);
                  $('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("babypink");
                   if(arrelem[i][j]==0)
					{
						$('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("roworangei");
					}
                }

              }
              }
              if(k == 6){
               // gn6 = this.get_missing_num (3,6,6,9, arrelem);
                for(var i=3 ; i<6;i++){
                for(var j=6; j<9;j++){
                  console.log("row"+i);
                  console.log("col"+j);
                  $('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("babypink");
                   if(arrelem[i][j]==0)
					{
						$('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("roworangei");
					}
                }

              }
              }
              if(k == 7){
               // gn7 = this.get_missing_num (6,9,0,3 , arrelem);
                for(var i=6 ; i<9;i++){
                for(var j=0; j<3;j++){
                  console.log("row"+i);
                  console.log("col"+j);
                  $('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("babypink");
                   if(arrelem[i][j]==0)
					{
						$('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("roworangei");
					}
                }

              }
              }
              if(k == 8){
               // gn8 = this.get_missing_num (6,9,3,6, arrelem);
                for(var i=6 ; i<9;i++){
                for(var j=3; j<6;j++){
                  console.log("row"+i);
                  console.log("col"+j);
                  $('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("babypink");
                   if(arrelem[i][j]==0)
					{
						$('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("roworangei");
					}
                }

              }
              }
              if(k == 9){
               // gn9 = this.get_missing_num (6,9,6,9 , arrelem);
                for(var i=6 ; i<9;i++){
                for(var j=6; j<9;j++){
                  console.log("row"+i);
                  console.log("col"+j);
                  $('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("babypink");
                   if(arrelem[i][j]==0)
					{
						$('table').find('tr:nth-child(' + (i+1) + ')').find('td:nth-child(' + (j+1) + ')').toggleClass("roworangei");
					}
                }

              }
              }
            }
          },
          missing_col_num : function(arrsin , arrelem){
            
            const x =[1,2,3,4,5,6,7,8,9];
			
            var n=arrsin.length;
           
            var gotnum;
            var arr_1 = [];
            
            for(var i=0;i< n;i++){
              var k=arrsin[i];
              var y=[];
            
              for(var j=0;j<9;j++){
               
                if(arrelem[j][k] != 0){
                  y.push(arrelem[j][k]);
                }
              }
             
              var sorty=y.sort();
              
              for(var g=0 ;g<9;g++){
                if(x[g] != sorty[g]){
                  gotnum = x[g];
                
                  arr_1.push(gotnum);
                 
                  break;                   
            }
          }
        }
        return  arr_1;
          },
          showsingleC:function(arrelem){
             //alert("inside showsingle");
            var arr=[];
            for(var i=0;i<9;i++){
              var count=0;
              for(var j=0;j<9;j++){
                //alert(arrelem[i][j]);
                if(arrelem[j][i]!=0){
                  count = count +1;
                }
              }
              if(count == 8){
                arr.push(i);
               
              }
            }
           // alert(arr);
            return arr ;
          },
		  
		  showsingleR:function(arrelem){
            // alert("inside showsingle");
            var arr=[];
            for(var i=0 ; i<9;i++){
              var count=0;
              for(var j=0;j<9;j++){
                if(arrelem[i][j]!=0){
                  count = count +1;
                }
              }
              if(count == 8){
                arr.push(i);
              }
            }
            
            return arr ;
          },
		  
		  
          // this function is used for validation every time user inputs and value
          onKeyUp: function(e) {
            // alert("inside keyup");
            var isvalid = true,
              val = $.trim($(e.currentTarget).val()),
              val1 = e.currentTarget,
              row = $(e.currentTarget).data("row"),
              col = $(e.currentTarget).data("col"),
			 
              arrelem = $(e.currentTarget).data("matrixele"),
              keycode = e.which;
            input = e.currentTarget;
           
          //  if user inputs alphabets it is not accepted
            if (!$.isNumeric(val)) {
              $(e.currentTarget).val("");
            }
            // if user inputs zero it is not accepted
            if ($.isNumeric(val)) {
              if (keycode === 48 || keycode === 96) {
                $(e.currentTarget).val("");
              }
            }
            // this if validates where the number entered is correct or not
            if (this.config.validate_on_insert) {
              
              input.classList.remove("sudoku-input-error");
              // input.classList.remove("sudoku-input-correct");
              input.classList.remove("sudoku-backspace");
              // invalid is the number which gets assigned a boolean value from the function validateNumber 
              isvalid = this.validateNumber(
                val,
                row,
                col,

                arrelem
              );
              
              if ($.isNumeric(val)) {
                if (val != 0) {
                  if (isvalid == false) {
                  //  if invalid is false then it is error make it as red
                    arrelem[row][col] = val;
                    input.classList.toggle("sudoku-input-error");
                  } else {
                    // if invalid is true then make it green
                    arrelem[row][col] = val;
                    // input.classList.toggle("sudoku-input-correct");
                  }
                }
              }
              // if backspace is pressed then that red or green colour should go
              if (keycode === 8) {
                arrelem[row][col] = 0;
                input.classList.toggle("sudoku-backspace");
              }
            }
          },
          // checks if whatever number user enters it is already there in the row or not
          checkRow: function(num, rowid, arrmat) {
            var i;
            var sen = true;
            for (i = 0; i < 9; i++) {
              
              if (arrmat[rowid][i] == num) {
               
                sen = false;
                break;
              } else {
                sen = true;
              }
            }
           
            return sen;
          },
           // checks if whatever number user enters it is already there in the sector or not
          checkCol: function(num, colid, arrmat) {
            var i;
            var sen = true;
            for (i = 0; i < 9; i++) {
              
              if (arrmat[i][colid] == num) {
                
                sen = false;
                break;
              } else {
                sen = true;
              }
            }
           
            return sen;
          },
           // checks if whatever number user enters it is already there in the sector or not
          checksub: function(rs, re, cs, ce, num, arrmat) {
           
            var countnum = 0;
            var sen = true;
            for (var i = rs; i < re; i++) {
             
              for (var j = cs; j < ce; j++) {
              
                if (arrmat[i][j] == num) {
                  countnum = countnum + 1;
                }
              }
            }
            
            if (countnum >= 1) {
              sen = false;
            } else {
              sen = true;
            }
            
            return sen;
          },
          // just gives call the checksub function and assigns them the sector in which they should check
          checkSector: function(num, rowid, colid, arrmat) {
           
            var sen = true;
            if (rowid < 3) {
              if (colid < 3) {
                sen = this.checksub(0, 3, 0, 3, num, arrmat);
              } else if (colid >= 3 && colid < 6) {
                sen = this.checksub(0, 3, 3, 6, num, arrmat);
              } else if (colid >= 6 && colid < 9) {
                sen = this.checksub(0, 3, 6, 9, num, arrmat);
              }
            } else if (rowid >= 3 && rowid < 6) {
              if (colid < 3) {
                sen = this.checksub(3, 6, 0, 3, num, arrmat);
              } else if (colid >= 3 && colid < 6) {
                sen = this.checksub(3, 6, 3, 6, num, arrmat);
              } else if (colid >= 6 && colid < 9) {
                sen = this.checksub(3, 6, 6, 9, num, arrmat);
              }
            } else if (rowid >= 6 && rowid < 9) {
              if (colid < 3) {
                sen = this.checksub(6, 9, 0, 3, num, arrmat);
              } else if (colid >= 3 && colid < 6) {
                sen = this.checksub(6, 9, 3, 6, num, arrmat);
              } else if (colid >= 6 && colid < 9) {
                sen = this.checksub(6, 9, 6, 9, num, arrmat);
              }
            }
           
            return sen;
          },
          // checks the number user entered and sets the boolean value to invalid which is used in onKeyUp function
          validateNumber: function(num, rowid, colid, arrmat) {
            // alert("entered validate number");
            var isvalid = true;
            var cr = true;
            var cc = true;
            var cs = true;
            // calling of all the three function
            cr = this.checkRow(num, rowid, arrmat);
            cc = this.checkCol(num, colid, arrmat);
            
            cs = this.checkSector(num, rowid, colid, arrmat);
          //  if the value is not blank and it is number in correct range and if that number is not present in the row,column and sector make invalid as true else false
          // and return the invalid
            if (num !== "") {
             
              if ($.isNumeric(num) && num >= 1 && num <= 9) {
                
                if (cr == true && cc == true && cs == true) {
                  
                  isvalid = true;
                } else {
                  isvalid = false;
                }
                
              }
            }
           
            return isvalid;
          }
        };
        // this returns the instance to the .ready function.
        return {
          getInstance: function(config) {
            if (!_instance) {
              _instance = init(config);
            }
            return _instance;
          }
        };
      })(jQuery);
