// interface.js
// Copyright (c) 2017 by Jin Yeom

var canvas;
var mic;
var vol;

function setup() {
	canvas = createCanvas(32, 32);
	canvas.parent("canvas-holder");

	frameRate(60);
	smooth();
	colorMode(RGB, 255, 255, 255, 255);

	mic = new p5.AudioIn();
	mic.start();
	analyzer = new p5.Amplitude();
	fft = new p5.FFT();

	analyzer.setInput(mic);
	fft.setInput(mic);
}

function draw() {
	vol = min(analyzer.getLevel() * 120, 20);
	push();
	translate(0,0);

	noStroke();

	fill(50, 115, 220, 255);
	rect(0, 0, width, height);
	pop();
	push();

	noStroke();
	fill(255, 255, 255, 255);
	ellipse(width/2, height/2, vol, vol);

	noStroke();
	fill(50, 115, 220, 255);
	ellipse(width/2, height/2, vol/1.5, vol/1.5);

	pop();
}
