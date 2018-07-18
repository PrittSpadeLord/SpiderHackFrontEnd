var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var tile = new Array(4);

var temp = {
	i: undefined,
	j: undefined
}

for(var i=0; i<4; i++) {
	tile[i] = new Array(4);
	for(var j=0; j<4; j++) {
		tile[i][j] = {
			up: j*canvas.height/4 + canvas.height/8 - canvas.height/10,
			down: j*canvas.height/4 + canvas.height/8 + canvas.height/10,
			left: i*canvas.width/4 + canvas.width/8 - canvas.width/10,
			right: i*canvas.width/4 + canvas.width/8 + canvas.width/10,
			color: "green",
			iscolored: false
		}
	}
}

var mouse = {
	x: undefined,
	y: undefined
}

document.addEventListener("click", (event) => {
	mouse.x = event.x;
	mouse.y = event.y;

	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			if(belongsTo(mouse.x, tile[i][j].left, tile[i][j].right) && belongsTo(mouse.y, tile[i][j].up, tile[i][j].down)) {
				tile[i][j].color = "green";
				tile[i][j].iscolored = true;
				clearscreen();
				creategrid();
				createtiles();

				revertTile(i, j);
			}
		}
	}
});

console.log(tile);

function clearscreen() {
	c.clearRect(0, 0, canvas.width, canvas.height);
}

creategrid();

createtiles();
function createtiles() {
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			if(tile[i][j].iscolored == true) {
				createRectCoord(tile[i][j].left, tile[i][j].right, tile[i][j].up, tile[i][j].down, "green");
			}
			else {
				createRectCoord(tile[i][j].left, tile[i][j].right, tile[i][j].up, tile[i][j].down, "black");
			}
		}
	}
}

function creategrid() {
	for(var i=0; i<=4; i++) {
		c.beginPath();
		c.moveTo(i * canvas.width/4, 0);
		c.lineTo(i * canvas.width/4, canvas.height);
		c.strokeStyle = "black";
		c.stroke();

		c.beginPath();
		c.moveTo(0, i * canvas.height/4);
		c.lineTo(canvas.width, i * canvas.height/4);
		c.strokeStyle = "black";
		c.stroke();
	}
}

function belongsTo(num, low, upp) {
	if((low<=num) && (num<=upp)) {
		return true;
	}
	return false;
}

function createRectCoord(l, r, u, d, color) {
	c.strokeStyle = color;
	c.strokeRect(l, u, r-l, d-u);
	c.fillStyle = color;
	c.fillRect(l, u, r-l, d-u);
}

function revertTile(i, j) {
	setTimeout(() => {
		tile[i][j].iscolored = false;
		clearscreen();
		creategrid();
		createtiles();
	}, 3000);
}