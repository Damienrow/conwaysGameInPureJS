/**
 * This file is a pure JS implemenetation of Conway's Game. It generates the
 * the neccessary html elements automatically and appends them to the end of
 * the body tag.
 *
 * To use, include this on the page:
 * <script type="text/javascript" src="path/to/this/file/conways-game.js"></script>
 *
 * Description of Conway's Game from wikipedia:
 *
 * The Game of Life, also known simply as Life, is a cellular automaton
 *  devised by the British mathematician John Horton Conway in 1970.
 *  The universe of the Game of Life is an infinite two-dimensional orthogonal
 *  grid of square cells, each of which is in one of two possible states, alive
 *  or dead, or "populated" or "unpopulated" (the difference may seem minor,
 *  except when viewing it as an early model of human/urban behavior simulation
 *  or how one views a blank space on a grid). Every cell interacts with its
 *  eight neighbours, which are the cells that are horizontally, vertically, or
 *  diagonally adjacent. At each step in time, the following transitions occur:
 *
 * 1. Any live cell with fewer than two live neighbours dies, as if caused by
 *   under-population.
 * 2. Any live cell with two or three live neighbours lives on to the next
 *   generation.
 * 3. Any live cell with more than three live neighbours dies, as if by
 *   over-population.
 * 4. Any dead cell with exactly three live neighbours becomes a live cell,
 *   as if by reproduction.
 *
 * The initial pattern constitutes the seed of the system. The first
 *  generation is created by applying the above rules simultaneously to
 *  every cell in the seed—births and deaths occur simultaneously, and the
 *  discrete moment at which this happens is sometimes called a tick (in other
 *  words, each generation is a pure function of the preceding one). The rules
 *  continue to be applied repeatedly to create further generations.
 *
 **/

// Count the number of live neighbours of a cell
function countNeighbours(rownum, colnum, numrows, numcols, gametable){
  // get the position of the cell (corner, edge, inner), then count the neighbors.
  var count = 0;

  if(rownum === 0){
    if(colnum === 0){
      // top-left corner
      count += Number(gametable.rows[0].cells[1].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[1].cells[0].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[1].cells[1].dataset.cellIsAlive) ? 1 : 0;

      // periodic boundaries
      count += Number(gametable.rows[numrows-1].cells[0].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[numrows-1].cells[1].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[numrows-1].cells[numcols-1].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[0].cells[numcols-1].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[1].cells[numcols-1].dataset.cellIsAlive) ? 1 : 0;
    }else if (colnum === numcols -1){
      // top-right corner
      count += Number(gametable.rows[0].cells[numcols-2].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[1].cells[numcols-1].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[1].cells[numcols-2].dataset.cellIsAlive) ? 1 : 0;

      // periodic boundries
      count += Number(gametable.rows[numrows-1].cells[0].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[0].cells[0].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[1].cells[0].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[numrows-1].cells[numcols-1].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[numrows-1].cells[numcols-2].dataset.cellIsAlive) ? 1 : 0;
    }else{
      // top edge
      for(icount = 0; icount <= 1; icount++){
        for(jcount = colnum - 1; jcount <= colnum + 1; jcount++){
          if(!(icount === rownum && jcount === colnum)){
            count += Number(gametable.rows[icount].cells[jcount].dataset.cellIsAlive) ? 1 : 0;
          }
        }
      }

      // periodic boundries
      for(jcount = colnum - 1; jcount <= colnum + 1; jcount++){
        count += Number(gametable.rows[numrows-1].cells[jcount].dataset.cellIsAlive) ? 1 : 0;
      }
    }
  }else if(rownum === numrows - 1){
    if(colnum === 0){
      // bottom-left corner
      count += Number(gametable.rows[numrows-2].cells[0].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[numrows-2].cells[1].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[numrows-1].cells[1].dataset.cellIsAlive) ? 1 : 0;

      // periodic boundaries
      count += Number(gametable.rows[0].cells[0].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[0].cells[1].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[0].cells[numcols-1].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[numrows-1].cells[numcols-1].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[numrows-2].cells[numcols-1].dataset.cellIsAlive) ? 1 : 0;
    }else if (colnum === numcols -1){
      // bottom-right corner
      count += Number(gametable.rows[numrows-2].cells[numcols-1].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[numrows-2].cells[numcols-2].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[numrows-1].cells[numcols-2].dataset.cellIsAlive) ? 1 : 0;

      // periodic boundaries
      count += Number(gametable.rows[0].cells[0].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[0].cells[numcols-2].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[0].cells[numcols-1].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[numrows-1].cells[0].dataset.cellIsAlive) ? 1 : 0;
      count += Number(gametable.rows[numrows-2].cells[0].dataset.cellIsAlive) ? 1 : 0;
    }else{
      // bottom edge
      for(icount = numrows - 2; icount <= numrows - 1; icount++){
        for(jcount = colnum - 1; jcount <= colnum + 1; jcount++){
          if(!(icount === rownum && jcount === colnum)){
            count += Number(gametable.rows[icount].cells[jcount].dataset.cellIsAlive) ? 1 : 0;
          }
        }
      }

      // periodic boundries
      for(jcount = colnum - 1; jcount <= colnum + 1; jcount++){
        count += Number(gametable.rows[0].cells[jcount].dataset.cellIsAlive) ? 1 : 0;
      }
    }
  }else if(colnum === 0){
    // left edge
    for(icount = rownum - 1; icount <= rownum + 1; icount++){
      for(jcount = 0; jcount <= 1; jcount++){
        if(!(icount === rownum && jcount === colnum)){
          count += Number(gametable.rows[icount].cells[jcount].dataset.cellIsAlive) ? 1 : 0;
        }
      }
    }


    // periodic boundries
    for(icount = rownum - 1; icount <= rownum + 1; icount++){
      count += Number(gametable.rows[icount].cells[numcols-1].dataset.cellIsAlive) ? 1 : 0;
    }
  }else if(colnum === numcols - 1){
    // right edge
    for(icount = rownum - 1; icount <= rownum + 1; icount++){
      for(jcount = numcols - 2; jcount <= numcols - 1; jcount++){
        if(!(icount === rownum && jcount === colnum)){
          count += Number(gametable.rows[icount].cells[jcount].dataset.cellIsAlive) ? 1 : 0;
        }
      }
    }

    // periodic boundries
    for(icount = rownum - 1; icount <= rownum + 1; icount++){
      count += Number(gametable.rows[icount].cells[0].dataset.cellIsAlive) ? 1 : 0;
    }
  }
  else{
    // inner cells
    for(icount = rownum - 1; icount <= rownum + 1; icount++){
      for(jcount = colnum - 1; jcount <= colnum + 1; jcount++){
        if(!(icount === rownum && jcount === colnum)){
          count += Number(gametable.rows[icount].cells[jcount].dataset.cellIsAlive) ? 1 : 0;
        }
      }
    }
  }
  return count;
}

// Apply the rules of Conway's Game to a single cell.
// Stores the result in data-cell-will-be-alive.
function applyRules(rownum, colnum, numrows, numcols, gametable){
  var count = countNeighbours(rownum, colnum, numrows, numcols, gametable);
  var curcell = gametable.rows[rownum].cells[colnum];

  alert(count);

  isalive = Number(curcell.dataset.cellIsAlive);
  if(isalive && count < 2){
    // dies by under-population
    curcell.dataset.cellWillBeAlive = 0;
  }else if(isalive && (count === 2 || count === 3)){
    // lives on
    curcell.dataset.cellWillBeAlive = 1;
  }else if(isalive && count > 3){
    // dies by over-population
    curcell.dataset.cellWillBeAlive = 0;
  }else if(!isalive && count === 3){
    // becomes alive by reproduction
    curcell.dataset.cellWillBeAlive = 1;
  }else{
    // dead cells stay dead
    curcell.dataset.cellWillBeAlive = curcell.dataset.isAlive;
  }
}

// Set cells based on the result of the appling the rules of the game
// (stored in data-cell-will-be-alive).
function setCellsAfterRules(numrows, numcols, gametable){
  for(iAfterRules = 0; iAfterRules < numrows; iAfterRules++){
    for(jAfterRules = 0; jAfterRules < numcols; jAfterRules++){
      var curcell = gametable.rows[iAfterRules].cells[jAfterRules];
      if(Number(curcell.dataset.cellWillBeAlive)){
        setAlive(curcell);
      }else{
        setDead(curcell);
      }
    }
  }
}

// Cycle through the cells of the grid and apply the rules of Conway's Game.
function startGame(){
  // disable the fps and size selects
  document.getElementById("fps-select-id").disabled = true;
  document.getElementById("size-select-id").disabled = true;
  // set the game state notification
  document.getElementById("running-notification-id").innerHTML = "Game State: RUNNING";

  var gamecontainer = document.getElementById("conways-container-id");
  gamecontainer.dataset.gameIsRunning = 1;

  var fps = document.getElementById("fps-select-id")
  var fps = fps.options[fps.selectedIndex].text;
  var waittime = 1/fps * 1000;
  var gametable = document.getElementById("game-table-id");
  var numrows = gametable.rows.length;

  function runGame(){
    var foundalive = false;
    for(i = 0; i < numrows; i++){
      var numcols = gametable.rows[i].cells.length;
      for(j = 0; j < numcols; j++){
        applyRules(i, j, numrows,  numcols, gametable);
      }
    }

    setCellsAfterRules(numrows, numcols, gametable);

    if(Number(gamecontainer.dataset.gameIsRunning)){
      setTimeout(runGame, waittime);
    }
  };
  runGame();
}

// Stop the game by setting data-game-is-running to 0.
function endGame(){
  var gamecontainer = document.getElementById("conways-container-id");
  gamecontainer.dataset.gameIsRunning = 0;

  // re-enable the fps and size select
  document.getElementById("fps-select-id").disabled = false;
  document.getElementById("size-select-id").disabled = false;
  // update the game state notification
  document.getElementById("running-notification-id").innerHTML = "Game State: NOT RUNNING";
}

// Switch a cell between dead and alive
function switchCell(col){
  if(Number(col.dataset.cellIsAlive)){
    setDead(col);
  }else{
    setAlive(col);
  }
}

// Set a grid cell to alive
function setAlive(col){
  col.dataset.cellIsAlive = 1;
  col.style.backgroundColor = "black";
}

// Set a grid cell to dead
function setDead(col){
  col.dataset.cellIsAlive = 0;
  col.style.backgroundColor = "white";
}

// Randomly assign each cell to alive or dead
function randomInitial(){
  var gametable = document.getElementById("game-table-id");

  for(iRandomInit = 0; iRandomInit < gametable.rows.length; iRandomInit++){
    var numcols = gametable.rows[iRandomInit].cells.length;
    for(jRandomInit = 0; jRandomInit < numcols; jRandomInit++){
      var curcell = gametable.rows[iRandomInit].cells[jRandomInit];
      if(Math.random() >= 0.5){
        setAlive(curcell);
      }else{
        setDead(curcell);
      }
    }
  }
}

// change grid size based on selection in the size select input
function setGrid(sel){

  var gametable = document.getElementById("game-table-id");

  // note: using innerHTML="" is actully much slower then this method
  while(gametable.firstChild){
    gametable.removeChild(gametable.firstChild);
  }

  var size = sel.options[sel.selectedIndex].text;
  var gamecontainer = document.getElementById("conways-container-id");

  for(i = 0; i < size; i++){
    var gamerow = document.createElement("TR");
    for(j = 0; j < size; j++){
      var gamecol = document.createElement("TD");
      gamecol.setAttribute("onclick", "switchCell(this)");
      gamecol.setAttribute("data-cell-is-alive", "0");
      gamecol.setAttribute("data-cell-will-be-alive", "0"); // store value for next frame
      gamecol.style.height = "20px";
      gamecol.style.width = "15px";
      gamecol.style.backgroundColor = "white";
      gamecol.style.border = "medium dotted grey";
      gamerow.appendChild(gamecol);
    }
    gametable.appendChild(gamerow);
  }
}

// Add grid and grid controls
window.onload = function(){
  var minsize = 3;
  var maxsize = 32;
  var defaultsize = 16;

  var newdiv = document.createElement("DIV");
  newdiv.id = "conways-container-id"
  newdiv.style.textAlign = "center";
  newdiv.style.fontFamily = "courier";
  newdiv.setAttribute("data-game-is-running", "0");

  var title = document.createElement("H1");
  title.innerHTML = "Conway's Game In Pure JS"

  var rulelisttitle = document.createElement("h3");
  var rulelist1 = document.createElement("P");
  var rulelist2 = document.createElement("P");
  var rulelist3 = document.createElement("P");
  var rulelist4 = document.createElement("P");
  rulelisttitle.innerHTML = "Rules: ";
  rulelist1.innerHTML = "1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.";
  rulelist2.innerHTML = "2. Any live cell with two or three live neighbours lives on to the next generation.";
  rulelist3.innerHTML = "3. Any live cell with more than three live neighbours dies, as if by over-population.";
  rulelist4.innerHTML = "4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.";
  rulelisttitle.style.color = "grey";
  rulelist1.style.color = "grey";
  rulelist2.style.color = "grey";
  rulelist3.style.color = "grey";
  rulelist4.style.color = "grey";
  rulelist1.style.color = "grey";
  rulelisttitle.style.margin = "0";
  rulelist1.style.margin = "0";
  rulelist2.style.margin = "0";
  rulelist3.style.margin = "0";
  rulelist4.style.margin = "0";

  var instructions = document.createElement("P");
  instructions.innerHTML = "Click the grid to set initial condition.";

  var runningnotification = document.createElement("P");
  runningnotification.id = "running-notification-id"
  runningnotification.innerHTML = "Game State: NOT RUNNING";

  var randombutton = document.createElement("BUTTON");
  randombutton.type = "button";
  randombutton.innerHTML = "Random Initial";
  randombutton.setAttribute("onclick", "randomInitial()");
  randombutton.style.margin = "0 5px";
  randombutton.style.fontFamily = "courier";

  var startbutton = document.createElement("BUTTON");
  startbutton.type = "button";
  startbutton.innerHTML = "Start Game";
  startbutton.setAttribute("onclick", "startGame()");
  startbutton.style.margin = "0 5px";
  startbutton.style.fontFamily = "courier";

  var stopbutton = document.createElement("BUTTON");
  stopbutton.type = "button";
  stopbutton.innerHTML = "End Game";
  stopbutton.setAttribute("onclick", "endGame()");
  stopbutton.style.margin = "0 5px";
  stopbutton.style.fontFamily = "courier";

  var sizeselect = document.createElement("SELECT");
  sizeselect.id = "size-select-id";
  sizeselect.name = "size-select";
  sizeselect.setAttribute("onchange", "setGrid(this)");

  var selectlabel = document.createElement("LABEL");
  selectlabel.innerHTML = "Grid Size ";
  selectlabel.setAttribute("for", "size-select");
  selectlabel.style.margin = "0 5px 0 0";

  var fpsselect = document.createElement("SELECT");
  fpsselect.id = "fps-select-id";
  fpsselect.name = "fps-select";

  var fpslabel = document.createElement("LABEL");
  fpslabel.innerHTML = "FPS ";
  fpslabel.setAttribute("for", "fps-select");
  fpslabel.style.margin = "0 5px 0 30px";

  var gametable = document.createElement("TABLE");
  gametable.id = "game-table-id";
  gametable.style.tableLayout = "fixed";
  gametable.style.margin = "0 auto";
  gametable.style.border = "thin solid black";

  // set fps select optoins
  for(i = 1; i <= 24; i++){
    var newoption = document.createElement("OPTION");
    newoption.text = i;
    if(i === 6){
      newoption.selected = "selected";
    }
    fpsselect.add(newoption);
  }

  // set size select options
  for(i = minsize; i <= maxsize; i++){
    var newoption = document.createElement("OPTION");
    newoption.text = i;
    if(i === defaultsize){
      newoption.selected = "selected";
    }
    sizeselect.add(newoption);
  }

  // put the elements together and add to the DOM
  newdiv.appendChild(title);
  newdiv.appendChild(rulelisttitle);
  newdiv.appendChild(rulelist1);
  newdiv.appendChild(rulelist2);
  newdiv.appendChild(rulelist3);
  newdiv.appendChild(rulelist4);
  newdiv.appendChild(instructions);
  newdiv.appendChild(selectlabel);
  newdiv.appendChild(sizeselect);
  newdiv.appendChild(fpslabel);
  newdiv.appendChild(fpsselect);
  newdiv.appendChild(document.createElement("BR"));
  newdiv.appendChild(document.createElement("BR"));
  newdiv.appendChild(gametable);
  newdiv.appendChild(document.createElement("BR"));
  newdiv.appendChild(runningnotification);
  newdiv.appendChild(randombutton);
  newdiv.appendChild(startbutton);
  newdiv.appendChild(stopbutton);
  document.body.appendChild(newdiv);
  setGrid(sizeselect);
}
