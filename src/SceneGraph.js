var SceneGraph, internal = {};

(function ( i ) {

	'use strict';

	SceneGraph = function ( canvas, options ) {
		var dpi;

		this.canvas = canvas;
		this.ctx = canvas.getContext( '2d' );

		this.buffer = document.createElement( 'canvas' );
		this.bufferCtx = this.buffer.getContext( '2d' );

		this.width = this.buffer.width = canvas.width;
		this.height = this.buffer.height = canvas.height;

		this._opacity = 1;

		this.layers = [];
	};

	SceneGraph.prototype = {
		vw: function ( val ) {
			return 0.01 * val * this.width;
		},

		vh: function ( val ) {
			return 0.01 * val * this.height;
		},

		opacity: function ( opacity ) {
			if ( !arguments.length ) {
				return this._opacity;
			}

			this._opacity = this.ctx.globalAlpha = opacity;
			this.dirty = true;
		},

		render: function () {
			var numLayers, layer, i, dirtyLayers;

			numLayers = this.layers.length;

			// see if we actually need to clear the buffer
			for ( i=0; i<numLayers; i+=1 ) {
				if ( this.layers[i].dirty ) {
					dirtyLayers = true;
					break;
				}
			}

			if ( dirtyLayers ) {
				this.bufferCtx.clearRect( 0, 0, this.width, this.height );

				for ( i=0; i<numLayers; i+=1 ) {
					layer = this.layers[i];

					layer.render();
					this.bufferCtx.drawImage(layer.canvas, 0, 0 );
				}
			}

			// if the scene is dirty (i.e. layers have changed, or opacity has changed),
			// paint the buffer to the canvas
			if ( this.dirty ) {
				this.ctx.clearRect( 0, 0, this.width, this.height );
				this.ctx.drawImage( this.buffer, 0, 0 );

				this.dirty = false;
			}
		},

		setSize: function ( width, height ) {
			var i;

			this.width = this.buffer.width = this.canvas.width = width;
			this.height = this.buffer.height = this.canvas.height = height;

			i = this.layers.length;
			while ( i-- ) {
				this.layers[i].setSize( width, height );
			}
		},

		empty: function () {
			this.layers = [];
			this.ctx.clearRect( 0, 0, this.width, this.height );
		},

		layer: function () {
			var layer = new i.Layer( this );

			this.layers[ this.layers.length ] = layer;
			return layer;
		}
	};

}( internal ));
