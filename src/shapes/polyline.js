(function ( S ) {

	'use strict';

	S.defineShape( 'polyline', {
		render: function ( ctx ) {
			var points, numPoints, i;

			points = this.transformedPoints;
			numPoints = points.length;

			ctx.beginPath();
			ctx.moveTo( points[0][0], points[0][1] );

			for ( i=1; i<numPoints; i+=1 ) {
				ctx.lineTo( points[i][0], points[i][1] );
			}

			ctx.lineTo( points[0][0], points[0][1] );

			ctx.stroke();
			ctx.fill();
		}
	});
}( SceneGraph ));