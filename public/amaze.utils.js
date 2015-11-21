"use strict";

amaze.utils = function() {

	// create a grid in memory
	var createGrid = function() {
		var grid = [];
		
		for (var i = 0; i < amaze.constants.GridWidth; i++) {
			grid[i] = [];
			
			for (var j = 0; j < amaze.constants.GridWidth; j++) {
				var walls = 15;
				var cell = createCell(j, i, walls);
				grid[i].push(cell);
			}
		}
		
		return grid;
	}
	
	// Destroy wall (NSWE)
	var destroyWall = function(grid, x, y, wall) {
	
	if (x < amaze.constants.GridWidth-1 && wall == "E") {
		grid[y][x].walls = grid[y][x].walls & 14;
		grid[y][x+1].walls = grid[y][x+1].walls & 13;
	}
	
	if (x > 0 && wall == "W") {
		grid[y][x].walls = grid[y][x].walls & 13;
		grid[y][x-1].walls = grid[y][x-1].walls & 14;
	}
	
	if (y < amaze.constants.GridWidth-1 && wall == "S") {
		grid[y][x].walls = grid[y][x].walls & 11;
		grid[y+1][x].walls = grid[y+1][x].walls & 7;
	}
	
	if (y > 0 && wall == "N") {
		grid[y][x].walls = grid[y][x].walls & 7;
		grid[y-1][x].walls = grid[y-1][x].walls & 11;
	}
}

	// create a cell in memory
	var createCell = function(x, y, walls) {
		var cell = {};
		cell.x = x;
		cell.y = y;
		cell.visited = false;
		cell.walls = walls;
		
		// borders
		if (cell.x == 0) {
			cell.walls = cell.walls | 2;
		}
		
		if (cell.x == amaze.constants.GridWidth-1) {
			cell.walls = cell.walls | 1;
		}
		
		if (cell.y == 0) {
			cell.walls = cell.walls | 8;
		}
		
		if (cell.y == amaze.constants.GridWidth-1) {
			cell.walls = cell.walls | 4;
		}
		
		// openings
		if (cell.x == 0 && cell.y == 0) {
			cell.walls = cell.walls  & 13;
		}
		
		if (cell.x == amaze.constants.GridWidth-1 && cell.y == amaze.constants.GridWidth-1) {
			cell.walls = cell.walls  & 14;
		}
		return cell;
	}
	
	return {
		createGrid: createGrid,
		createCell: createCell,
		destroyWall: destroyWall
	}
}();