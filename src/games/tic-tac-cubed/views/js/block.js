function Block(size) {
	this.size     = size || 100;
	this.index    = 0;
	this.offColor = 0x006666;
	this.bgColor  = 0xcccccc;
	this.xColor   = 0xcc0000;
	this.oColor   = 0x0000cc;
};

Block.prototype = Object.create(THREE.Mesh.prototype);
Block.prototype.constructor = Block;

Block.prototype.init = function() {
	this.makeBox();
	this.makeX();
	this.makeO();
};

Block.prototype.makeBox = function() {
	var geometry = new THREE.BoxGeometry(this.size, this.size, this.size);

	// Shade the top and bottom face
	[4, 5, 6, 7].forEach(function(f) {
		geometry.faces[f].color.setHex(this.offColor);
	}, this);

	var material = new THREE.MeshLambertMaterial({
		color: this.bgColor, 
		vertexColors: THREE.FaceColors
	});
	THREE.Mesh.call(this, geometry, material);
};

Block.prototype.makeX = function() {
	this.x = new THREE.Object3D();

	var geometry = new THREE.CylinderGeometry(this.size/10, this.size/10, this.size);
	var material = new THREE.MeshPhongMaterial({color: this.xColor});

	var x1 = new THREE.Mesh(geometry.clone(), material.clone());
	x1.position.x = this.size/2;
	x1.rotation.x = -Math.PI/4;
	this.x.add(x1);

	var x2 = new THREE.Mesh(geometry.clone(), material.clone());
	x2.position.x = this.size/2;
	x2.rotation.x = Math.PI/4;
	this.x.add(x2);

	this.add(this.x);
	this.xFace = 1;
};

Block.prototype.makeO = function() {
	var geometry = new THREE.TorusGeometry(this.size/3, this.size/10, 8, 50);
	var material = new THREE.MeshPhongMaterial({color: this.oColor});

	this.o = new THREE.Mesh(geometry, material);
	this.o.position.z = -this.size/2;

	this.add(this.o);
	this.oFace = 2;
};

// Determines which face is visible from the origin
Block.prototype.showing = function(origin) {
	if (!origin) {
		origin = new THREE.Vector3(0, 0, 0);
	}
	var target = new THREE.Vector3();
	target.setFromMatrixPosition(this.matrixWorld).sub(origin).normalize();

	raycaster.set(origin, target);
	var intersection = raycaster.intersectObject(this, true);

	if (!intersection.length) {
		return null;
	}

	var indices = [];
	intersection.forEach(function(i) {
		indices.push(i.faceIndex);
	});
	return indices;
};
