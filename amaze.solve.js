"use strict";
	
amaze.solve = function() {
	
	var solveBacktracking = function(grid, startx, starty, endx, endy) {
				
		if (grid[starty][startx].marked == true)
			return false;
			
		grid[starty][startx].marked = true;
		
		if (startx == endx && starty == endy)
			return true;

		// North
		if (starty-1 >= 0 && !(grid[starty][startx].walls & 8)) {
			if (solveBacktracking(grid, startx, starty-1, endx, endy))
				return true;
		}
		
		// South
		if (starty+1 <= amaze.constants.GridWidth-1 && !(grid[starty][startx].walls & 4)) {
			if (solveBacktracking(grid, startx, starty+1, endx, endy))
				return true;
		}
				
		// West
		if (startx-1 >= 0 && !(grid[starty][startx].walls & 2)) {
			if (solveBacktracking(grid, startx-1, starty, endx, endy))
				return true;
		}
				
		// East
		if (startx+1 <= amaze.constants.GridWidth-1 && !(grid[starty][startx].walls & 1)) {
			if (solveBacktracking(grid, startx+1, starty, endx, endy))
				return true;
		}
				
		grid[starty][startx].marked = false;
		
		return false;
	}
	
	return {
		solveBacktracking: solveBacktracking	
	}
}();