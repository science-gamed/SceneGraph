(function ( S ) {

	'use strict';

	var PIx2 = Math.PI * 2;

	S.defineShape( 'circle', {
		render: function ( ctx ) {
			ctx.beginPath();
			ctx.arc( this.x, this.y, this.r, 0, PIx2 );

			ctx.fill();
			ctx.stroke();
		}
	});

}( SceneGraph ));