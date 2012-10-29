"use strict";
	
amaze.solve = function() {
	
	var solveBacktracking = function(grid, startx, starty, endx, endy, solutionHistory) {
				
		// if already been there, don't go again
		for (var i = 0; i < solutionHistory.length; i++) {
			if (solutionHistory[i].x == startx && solutionHistory[i].y == starty && solutionHistory[i].marked == true) {
				return false;
			}
		}
			
		// mark the cell as visited.
		solutionHistory.push({x: startx, y: starty, marked: true});
		
		if (startx == endx && starty == endy)
			return true;
							
		// East
		if (startx+1 <= amaze.constants.GridWidth-1 && !(grid[starty][startx].walls & 1)) {
			if (solveBacktracking(grid, startx+1, starty, endx, endy, solutionHistory))
				return true;
		}
		
		// South
		if (starty+1 <= amaze.constants.GridWidth-1 && !(grid[starty][startx].walls & 4)) {
			if (solveBacktracking(grid, startx, starty+1, endx, endy, solutionHistory))
				return true;
		}
			
		// North
		if (starty-1 >= 0 && !(grid[starty][startx].walls & 8)) {
			if (solveBacktracking(grid, startx, starty-1, endx, endy, solutionHistory))
				return true;
		}
				
		// West
		if (startx-1 >= 0 && !(grid[starty][startx].walls & 2)) {
			if (solveBacktracking(grid, startx-1, starty, endx, endy, solutionHistory))
				return true;
		}
	
		// this cell is not leading anywhere, so backtrack by unmarking it.
		solutionHistory.push({x: startx, y: starty, marked: false});
		
		return false;
	}
	
	return {
		solveBacktracking: solveBacktracking	
	}
}();