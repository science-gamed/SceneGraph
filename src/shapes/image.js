(function ( S ) {

	'use strict';

	S.defineShape( 'image', {
		render: function ( ctx ) {
			ctx.drawImage( this.image, this.x, this.y, this.width, this.height );
		}
	});

}( SceneGraph ));