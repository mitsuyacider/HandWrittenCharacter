let font;
let xCoords2 = []
let yCoords2 = []
let points2;
let namePoints = []
let name2Points = []
let angle = 0
let sketch
let scribble

function preload() {
	font = loadFont('./VeraSeBd.ttf');
}

function setup() { 
	createCanvas(windowWidth, windowHeight);
	scribble = new Scribble()

	stroke(255);
	fill(255, 104, 204);
	const factor = 0.3
	const name = ['M', 'I', 'T', 'S', 'U', 'Y', 'A']
	const name2 = ['W', 'A', 'T', 'A', 'N', 'A', 'B', 'E']
	const fontSize = 75
	let x = 45;
	let y = fontSize / 2 + 30
	let oldW = 0;


	// NOTE: Create MITSUYA
	for (let [index, char]  of name.entries()) {
		bounds = font.textBounds(char, 0, 0, fontSize);
		if (index !== 0) {
			x += oldW
		} 

		const list = font.textToPoints(char, x, y, fontSize, {
			sampleFactor: factor,
			simplifyThreshold: 0
		});

		const xList = []
		const yList = []

		for (let i = 0; i < list.length; i++) {
			const p = list[i]
			xList.push(p.x)
			yList.push(p.y * 3)
		}

		oldW = bounds.w + bounds.x + bounds.advance

		const vector = {
			xCoords: xList,
			yCoords: yList,
			bounds: bounds,
			centerX: x + oldW / 2,
			centerY: y + bounds.h / 2,
			weight: random(1) + .1
		}

		namePoints.push(vector)
	}

	// NOTE: Create WATANABE
	oldW = 0
	x = 0
	y += fontSize
	for (let [index, char]  of name2.entries()) {
		bounds = font.textBounds(char, 0, 0, fontSize);
		if (index !== 0) {
			x += oldW
		} 

		const list = font.textToPoints(char, x, y, fontSize, {
			sampleFactor: factor,
			simplifyThreshold: 0
		});

		const xList = []
		const yList = []

		for (let i = 0; i < list.length; i++) {
			const p = list[i]
			xList.push(p.x)
			yList.push(p.y * 3)
		}

		oldW = bounds.w + bounds.x + bounds.advance

		const vector = {
			xCoords: xList,
			yCoords: yList,
			bounds: bounds,
			centerX: x + oldW / 2,
			centerY: y + bounds.h / 2,
			weight: random(1) + .1
		}

		name2Points.push(vector)	
	}


	scribble.roughness = 1
	scribble.bowing = 10;  
	scribble.maxOffset = 5;
	strokeWeight( 2 );

	// randomSeed( 1 )
	// stroke(0)
	// scribble.scribbleRect( width / 2 , height / 2, 100, 100 );
	
	// stroke(0, 0, 255)
	// strokeWeight( 10 );
	// // scribble.numEllipseSteps = 100;
	// const xCoords = [width / 2 - 50, width / 2 + 50, width / 2 + 50, width / 2 - 50]
	// const yCoords = [height / 2 - 50, height / 2 - 50, height / 2 + 50, height / 2 + 50]
	// scribble.scribbleFilling( xCoords, yCoords, 20, 0 );
}

function draw() {
	background(0);
	// stroke(random(255), random(255), random(255))
	const gap = 3.5

	for (let vec of namePoints) {
		 const theta = Math.atan2(mouseY - vec.yCoords[0], -1 * (mouseX - vec.centerX));
		 angle = theta * (180 / Math.PI) + 90;
		 strokeWeight( vec.weight );
		 if (scribble)
			 scribble.scribbleFilling( vec.xCoords, vec.yCoords , gap, angle );
	}

	for (let vec of name2Points) {
		 const theta = Math.atan2(mouseY - vec.yCoords[0], -1 * (mouseX - vec.centerX));
		 angle = theta * (180 / Math.PI) + 90;
		 strokeWeight( vec.weight );
		 if (scribble)
			 scribble.scribbleFilling( vec.xCoords, vec.yCoords , gap, angle );
	 }
}