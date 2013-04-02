(function ( i ) {

	'use strict';

	i.Group = i.Shape.extend({
		init: function () {
			this.children = [];
			this.length = 0;
		},

		render: function ( ctx ) {
			var childNum, child;

			ctx.save();

			// apply group styles
			i.modifyCtxState( ctx, this );

			for ( childNum=0; childNum<this.length; childNum+=1 ) {
				child = this.children[ childNum ];

				ctx.save();
				i.modifyCtxState( ctx, child );

				child.render( ctx );

				ctx.restore();
			}

			ctx.restore();
		},

		updateCTM: function () {
			var i;

			this.CTM = this.parent.CTM.multiply( this.LTM );

			i = this.length;
			while ( i-- ) {
				this.children[i].updateCTM();
			}
		}
	});

}( internal ));
