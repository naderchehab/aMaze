"use strict";

amaze.display = function() {

	var gl, time, startTime;
	var generationComplete = false;
	var solutionComplete = false;
	var resetAnimTime = true;
	var data = {};

	// init Web GL and grid data
    var init = function(generationResult, solutionHistory) {
        var canvas = document.getElementById("amaze-canvas");
		
        try {
			document.body.style.backgroundColor=amaze.constants.BgColor;
            gl = canvas.getContext("2d");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
			gl.lineWidth = "2";
			gl.strokeStyle = amaze.constants.Color;
			gl.moveTo(0,0);		
			
			data.maze = generationResult.maze;
			data.generationHistory = generationResult.generationHistory;
			data.solutionHistory = solutionHistory;
			
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }
	
	// Draw Grid
	var drawGrid = function(grid) {
		for (var j = 0; j < amaze.constants.GridWidth; j++) {
			for (var i = 0; i < amaze.constants.GridWidth; i++) {
				drawWalls(grid[j][i].walls, i*amaze.constants.CellSize, j*amaze.constants.CellSize);
			}
		}
	}
	
	// Draw grid gradually
	var drawAnimateGridGeneration = function(grid, animTime, generationHistory, isAnimate) {
		for (var i = 0; i < generationHistory.length; i++) {
			if (amaze.constants.GenerationAnimSpeed*i < animTime || !isAnimate) {
				drawWalls(grid[generationHistory[i].y][generationHistory[i].x].walls, generationHistory[i].x*amaze.constants.CellSize, generationHistory[i].y*amaze.constants.CellSize);
			}
		}
		
		return amaze.constants.GenerationAnimSpeed*generationHistory.length < animTime;
	}
	
	// Draw solution gradually
	var drawAnimateSolution = function(animTime, solutionHistory, isAnimate) {			

		for (var j = 0; j < solutionHistory.length; j++) {

			if (amaze.constants.SolutionAnimSpeed*j < animTime || !isAnimate) {
				gl.beginPath();
				
				if (solutionHistory[j].marked == true) {
					// mark
					gl.fillStyle = amaze.constants.PathColor;
				}
				else {
					// unmark
					gl.fillStyle = amaze.constants.BacktrackColor;
				}
				
				var x = solutionHistory[j].x*amaze.constants.CellSize;
				var y = solutionHistory[j].y*amaze.constants.CellSize;
				var width = amaze.constants.CellSize;
				var height = amaze.constants.CellSize;
				
				var walls = data.maze[solutionHistory[j].y][solutionHistory[j].x].walls;
				
				if (walls & 8) {
					y += 2;
				}
				
				if (walls & 4) {
					height -= 3;
				}
				
				if (walls & 2) {
					x += 2;
				}
				
				if (walls & 1) {
					width -= 3;
				}
				
				gl.rect(x, y, width, height);
				gl.fill();				
			}
		}
		
		//console.log("animTime:",animTime);
		return amaze.constants.SolutionAnimSpeed*solutionHistory.length < animTime;
	}

	// Draw a cell's walls
	// walls param is 4 flags (NSWE). if walls = 1111 then draw all of them.
	var drawWalls = function(walls, x, y) {
				
		// North
		if (walls & 8) {
			gl.beginPath();
			gl.moveTo(x, y);
			gl.lineTo(x+amaze.constants.CellSize, y);
			gl.stroke();
		}
	
		// South
		if (walls & 4) {
			gl.beginPath();
			gl.moveTo(x, y+amaze.constants.CellSize);
			gl.lineTo(x+amaze.constants.CellSize, y+amaze.constants.CellSize);
			gl.stroke();
		}

		// West
		if (walls & 2) {
			gl.beginPath();
			gl.moveTo(x, y);
			gl.lineTo(x, y+amaze.constants.CellSize);
			gl.stroke();
		}
	
		// East
		if (walls & 1) {
			gl.beginPath();
			gl.moveTo(x+amaze.constants.CellSize, y);
			gl.lineTo(x+amaze.constants.CellSize, y+amaze.constants.CellSize);
			gl.stroke();
		}
	}
	
	// Provides requestAnimationFrame in a cross browser way.
	var requestAnimFrame = (function() {
	  return window.requestAnimationFrame ||
		 window.webkitRequestAnimationFrame ||
		 window.mozRequestAnimationFrame ||
		 window.oRequestAnimationFrame ||
		 window.msRequestAnimationFrame ||
		 function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
		   return window.setTimeout(callback, 1000/60);
		 };
	})();
	
	// Animate
	var animate = function(isAnimate) {

		if ((!generationComplete || !solutionComplete) && isAnimate) {
			requestAnimFrame(animate);
		}

		time = Date.now();
		
		if (startTime == null)
			startTime = time;
 
		var animTime = time - startTime;

		if (generationComplete == false) {
			generationComplete = drawAnimateGridGeneration(data.maze, animTime, data.generationHistory, isAnimate);
		}
		
		if ((generationComplete == true && solutionComplete == false) || !isAnimate) {

			if (resetAnimTime && isAnimate) {
				startTime = time;
				animTime = (time - startTime);
				resetAnimTime = false;
			}
			solutionComplete = drawAnimateSolution(animTime, data.solutionHistory, isAnimate);
		}
	}
	
	return {
		init: init,
		drawGrid: drawGrid,
		animate: animate
	}
}();