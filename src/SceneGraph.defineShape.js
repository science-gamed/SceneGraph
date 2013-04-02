(function ( S, i ) {

	'use strict';

	S.defineShape = function ( name, properties ) {
		var DefinedShape = i.Shape.extend( properties );

		i.Group.prototype[ name ] = function ( options ) {
			var child;

			options = options || {};

			options.scene = this.scene;
			options.layer = this.layer;
			options.parent = this;

			child = new DefinedShape( options );

			this.children[ this.children.length ] = child;
			this.length = this.children.length;

			// dirty layer
			this.layer.dirty = true;

			return child;
		};

		// allow same methods on layer, without needing to access root
		i.Layer.prototype[ name ] = function ( options ) {
			return this.root[ name ].apply( this.root, arguments );
		};
	};

}( SceneGraph, internal ));