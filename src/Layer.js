(function ( i ) {

	'use strict';

	i.Layer = function ( scene ) {
		this.scene = scene;

		this.canvas = document.createElement( 'canvas' );
		this.canvas.width = scene.width;
		this.canvas.height = scene.height;

		this.ctx = this.canvas.getContext( '2d' );

		this.CTM = new i.Matrix();

		this.root = new i.Group({
			scene: scene,
			layer: this,
			parent: this
		});
	};

	i.Layer.prototype = {
		setSize: function ( width, height ) {
			this.width = this.canvas.width = width;
			this.height = this.canvas.height = height;
		},

		render: function () {
			if ( this.dirty ) {
				this.ctx.clearRect( 0, 0, this.width, this.height );
				this.root.render( this.ctx );
				this.dirty = false;

				this.scene.dirty = true;
			}
		}
	};

}( internal ));