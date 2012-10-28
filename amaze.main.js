"use strict";

amaze.main = function() {

	var run = function() {
		var grid = amaze.utils.createGrid();
		var maze = amaze.generate.generateBacktracking(grid);
		amaze.solve.solveBacktracking(maze.maze, 0, 0, amaze.constants.GridWidth-1, amaze.constants.GridWidth-1);
		amaze.display.init(maze);
		amaze.display.animate();
	}
	
	return {
		run: run
	}
}();