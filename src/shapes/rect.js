(function ( S ) {

	'use strict';

	S.defineShape( 'rect', {
		render: function ( ctx ) {
			ctx.fillRect( this.x, this.y, this.width, this.height );
			ctx.strokeRect( this.x, this.y, this.width, this.height );
		}
	});

}( SceneGraph ));