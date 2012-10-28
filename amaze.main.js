"use strict";

amaze.main = function() {

	var run = function() {
		amaze.display.initGl();
		var grid = amaze.utils.createGrid();
		var result = amaze.generate.generateBacktracking(grid);
		amaze.global.maze = result.grid;
		amaze.global.locationHistory = result.locationHistory;
		amaze.solve.solveBacktracking(result.grid, 0, 0, amaze.constants.GridWidth-1, amaze.constants.GridWidth-1);
		console.log(amaze);
		amaze.display.animate();
		//amaze.display.drawGrid(grid);
	}
	
	return {
		run: run
	}
}();