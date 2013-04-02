module.exports = function ( grunt ) {

	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),

		concat: {
			options: {
				banner: '// SceneGraph v<%= pkg.version %>\n// Copyright (2013) Rich Harris\n// Released under the MIT License\n\n// https://github.com/science-gamed/SceneGraph\n\n(function ( global ) {\n\n',
				footer: '\n\nif ( typeof global.module !== "undefined" && global.module.exports ) { global.module.exports = SceneGraph; }\n' +
					'else if ( typeof global.define !== "undefined" && global.define.amd ) { global.define( function () { return SceneGraph; }); }\n' +
					'else { global.SceneGraph = SceneGraph; }\n\n}( this ));'
			},
			files: {
				dest: 'build/SceneGraph.js',
				src: [
					// public API
					'src/SceneGraph.js',
					'src/SceneGraph.defineShape.js',

					// internal helpers
					'src/Layer.js',
					'src/modifyCtxState.js',
					'src/Matrix.js',
					'src/Shape.js',
					'src/Group.js',

					// default shapes
					'src/shapes/polygon.js',
					'src/shapes/rect.js',
					'src/shapes/image.js',
					'src/shapes/text.js',
					'src/shapes/circle.js'
				]
			}
		},

		uglify: {
			files: {
				src: '<%= concat.files.dest %>',
				dest: 'build/SceneGraph.min.js'
			}
		}
	});

	grunt.loadNpmTasks( 'grunt-contrib-concat' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );

	grunt.registerTask( 'default', [ 'concat', 'uglify' ] );
};