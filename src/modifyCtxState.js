(function ( i ) {

	'use strict';

	var properties;

	properties = [
		"strokeStyle",
		"fillStyle",
		"lineWidth",
		"lineCap",
		"lineJoin",
		"miterLimit",
		"shadowOffsetX",
		"shadowOffsetY",
		"shadowBlur",
		"shadowColor",
		"globalCompositeOperation"
	];

	i.modifyCtxState = function ( ctx, shape ) {
		var prop, mat;

		properties.forEach( function ( prop ) {
			if ( shape.hasOwnProperty( prop ) ) {
				ctx[ prop ] = shape[ prop ];
			}
		});

		if ( shape.hasOwnProperty( 'opacity' ) ) {
			ctx.globalAlpha = shape.opacity;
		}

		// apply local transform matrix
		mat = shape.LTM;
		ctx.transform( mat.a, mat.b, mat.c, mat.d, mat.e, mat.f );
	};

}( internal ));

