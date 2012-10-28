"use strict";

amaze.generate = function() {

	// Generate a maze using the recursive backtracking algorithm
	var generateBacktracking = function(grid) {
	
		var visitedCells = [];
		
		var locHistory = []; // used to animate the generation of the grid
		
		// pick a random cell
		var x = Math.floor((Math.random()*amaze.constants.GridWidth));
		var y = Math.floor((Math.random()*amaze.constants.GridWidth));
				
		grid[y][x].visited = true;
		visitedCells.push(grid[y][x]);
		
		while (visitedCells.length < amaze.constants.GridWidth*amaze.constants.GridWidth) {
					
			locHistory.push({x: x, y: y});
					
			// find unvisited neighbouring cells
			
			var unvisitedNeighbours = [];
			
			if (y-1 >= 0 && grid[y-1][x].visited == false) {
				unvisitedNeighbours.push("N");
			}	
			
			if (y+1 <= amaze.constants.GridWidth-1 && grid[y+1][x].visited == false) {
				unvisitedNeighbours.push("S");
			}
			
			if (x-1 >= 0 && grid[y][x-1].visited == false) {
				unvisitedNeighbours.push("W");
			}
			
			if (x+1 <= amaze.constants.GridWidth-1 && grid[y][x+1].visited == false) {
				unvisitedNeighbours.push("E");
			}
						
			// if there are unvisited neighbouring cells
			if (unvisitedNeighbours.length > 0) {		
				// among the unvisited neighbouring cells, pick a random one
				// and destroy the wall between the current cell and that neighbouring one.
				// Make the new cell the current one.
				
				var randomIndex = Math.floor(Math.random()*unvisitedNeighbours.length);
				
				switch (unvisitedNeighbours[randomIndex]) {
					case "N":
					amaze.utils.destroyWall(grid, x, y, "N");
					grid[y-1][x].visited = true;
					visitedCells.push(grid[y-1][x]);
					y--;
					break;
					case "S":
					amaze.utils.destroyWall(grid, x, y, "S");
					grid[y+1][x].visited = true;
					visitedCells.push(grid[y+1][x]);
					y++;
					break;
					case "W":
					amaze.utils.destroyWall(grid, x, y, "W");
					grid[y][x-1].visited = true;
					visitedCells.push(grid[y][x-1]);
					x--;
					break;
					case "E":
					amaze.utils.destroyWall(grid, x, y, "E");
					grid[y][x+1].visited = true;
					visitedCells.push(grid[y][x+1]);
					x++;
					break;
				}
			}
			else if (visitedCells.length > 0) {
				// if there are no neighbouring unvisited cells, go back to the previous cell
				var cell = visitedCells.pop();
				x = cell.x;
				y = cell.y;
			}
			else {
				break;
			}
		}
		
		return {grid: grid, locationHistory: locHistory};
	}
	
	return {
		generateBacktracking: generateBacktracking
	}	
}();