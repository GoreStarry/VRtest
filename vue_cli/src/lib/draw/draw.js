module.exports.component = {
	schema: {
		width: {
			default: 800
		},
		height: {
			default: 200
		},
		background: {
			default: "green"
		}
	},

	init: function () {
		this.registers = []; //order of eventing after render
	},

	register: function(render) {
		this.registers.push(render);
	},

	update: function (oldData) {
		this.createCanvas(this.data.width, this.data.height, this.data.text);
	},

	createCanvas: function (w, h, text) {
		var _ = this;
		var canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		canvas.text = text;
		// canvas.style = "display: none"; //make safari err for ?
		_.canvas = canvas;
		_.ctx = canvas.getContext("2d");

		this.texture = new THREE.Texture(_.canvas); //renders straight from a canvas
		if(this.el.object3D.children.length > 0) { //backwards compatibility
			this.el.object3D.children[0].material = new THREE.MeshBasicMaterial();
			this.el.object3D.children[0].material.map = this.texture;
		}
		else { //backwards compatibility
			this.el.object3D.children[0].material = new THREE.MeshBasicMaterial();
			this.el.object3D.children[0].material.map = this.texture;
		}
		if(!this.el.hasLoaded) this.el.addEventListener("loaded", function() {
			_.render();
		});
		else _.render();
	},

	render: function() {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.fillStyle = '#FDFAFA';
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.fillStyle = 'black';
			this.ctx.font = 'italic 50px Calibri';
			if(this.registers.length > 0) { //backwards compatibility
				this.registers.forEach(function(item) {
					item();
				});
			}else{
				this.ctx.fillText(this.canvas.text, 10, 60);
			}
			this.texture.needsUpdate = true;
	},

	//not the most removable component out there, so will leave blank for now
	remove: function () {}
};
