"use strict";

amaze.main = function() {

	var run = function() {
		
		// create a grid in memory
		var grid = amaze.utils.createGrid();
		
		// generate a maze from the grid
		var generationResult = amaze.generate.generateBacktracking(grid);
		
		// solve the maze
		var solutionHistory = [];
		amaze.solve.solveBacktracking(generationResult.maze, 0, 0, amaze.constants.GridWidth-1, amaze.constants.GridWidth-1, solutionHistory);
		
		// display the maze and its solution (with animation)
		amaze.display.init(generationResult, solutionHistory);
		amaze.display.animate(true);
	}
	
	return {
		run: run
	}
}();