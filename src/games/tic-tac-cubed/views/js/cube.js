var THREE = require('three');
var Block = require('./block');

function Cube(blockSize) {
	this.blockSize = blockSize || 1;
	this.blocks = [];
	THREE.Object3D.call(this);
}

Cube.prototype = THREE.Object3D.prototype;

Cube.prototype.generate = function(scene) {
	var count = 27;

	var holder = new THREE.Object3D();
	holder.position.set(-this.blockSize, -this.blockSize, -this.blockSize);
	this.add(holder);

	for (var i=0; i<count; i++) {
		var shade = i % 2 ? 0xffffff : 0xcccccc;

		var block = new Block(this.blockSize);
		block.bgColor = shade;
		block.index   = i;
		block.init();

		var x = this.blockSize * (i % 3);
		var y = this.blockSize * (Math.floor((i % 9) / 3));
		var z = this.blockSize * (Math.floor(i / 9));

		block.position.set(x, y, z);

		holder.add(block);
		this.blocks.push(block);
	}

	scene.add(this);
};

Cube.prototype.getBlockIndex = function(block) {
	for (var i=0; i<this.blocks.length; i++) {
		if (this.blocks[i].id === block.id) {
			return i;
		}
	}
	return -1;
};

// Returns 2-d array with 4, 9-item arrays that contain the face indexes
// for each block on the specified face of this cube.
Cube.prototype.grids = function() {
	var origin = camera.position.clone();
	var radius = origin.distanceTo(this.position);
	var angle  = 0;

	var grids  = [];
	for (var i=0; i<4; i++) {
		grids.push(this.showing(origin));
		angle += Math.PI/2;
		origin.x = radius * Math.cos(angle);
		origin.z = radius * Math.sin(angle);
	}
	return grids;
};

Cube.prototype.showing = function(origin) {
	if (!origin) {
		origin = new THREE.Vector3(0, 0, 0);
	}
	var blocks = [];
	this.blocks.forEach(function(block) {
		var showing = block.showing(origin);
		if (showing !== null) {
			blocks.push({
				object  : block,
				showing : showing 
			});
		}
	});

	return blocks;
};

module.exports = Cube;
