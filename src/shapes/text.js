(function ( S ) {

	'use strict';

	S.defineShape( 'text', {
		render: function ( ctx ) {
			ctx.font = this.fontSize + 'px ' + this.fontFace;
			ctx.textAlign = this.align || 'start';
			ctx.textBaseline = this.baseline || 'alphabetic';

			ctx.fillText( this.content, this.x, this.y );
			ctx.stroke();
		}
	});

}( SceneGraph ));