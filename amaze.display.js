"use strict";

amaze.display = function() {

	var gl, time, startTime;
	var data = {};

	// init Web GL and grid data
    var init = function(d) {
        var canvas = document.getElementById("amaze-canvas");
		
        try {
            gl = canvas.getContext("2d");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
			gl.lineWidth = "2";
			gl.strokeStyle = amaze.constants.Color;
			gl.moveTo(0,0);		
			
			data.maze = d.maze;
			data.locationHistory = d.locationHistory;
			
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
	var drawAnimateGrid = function(grid, animTime, locHistory) {
		for (var i = 0; i < locHistory.length; i++) {
			if (amaze.constants.AnimSpeed*i < animTime) {
				drawWalls(grid[locHistory[i].y][locHistory[i].x].walls, locHistory[i].x*amaze.constants.CellSize, locHistory[i].y*amaze.constants.CellSize);
				
				if (grid[locHistory[i].y][locHistory[i].x].marked == true) {
					gl.fillStyle = "yellow";
					gl.rect(locHistory[i].x*amaze.constants.CellSize+5, locHistory[i].y*amaze.constants.CellSize+5, 5, 5);
					gl.fill();
				}
			}
		}
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
	var animate = function() {

		requestAnimFrame( animate );
				
		time = Date.now();
		
		if (startTime == null)
			startTime = time;
 
		var animTime = (time - startTime);
		
		drawAnimateGrid(data.maze, animTime, data.locationHistory);
	}
	
	return {
		init: init,
		drawGrid: drawGrid,
		animate: animate
	}
}();