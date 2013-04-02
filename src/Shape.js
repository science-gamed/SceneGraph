(function ( i ) {

	'use strict';

	i.Shape = function ( options ) {
		var key;

		for ( key in options ) {
			if ( options.hasOwnProperty( key ) ) {
				this[ key ] = options[ key ];
			}
		}

		// get current transform matrix
		if ( !this.LTM ) {
			this.LTM = new i.Matrix(); // create identity matrix
			this.CTM = this.parent.CTM.clone();
		} else {
			this.CTM = options.parent.CTM.multiply( this.LTM );
		}
	};

	i.Shape.prototype = {
		set: function ( property, value ) {
			this[ property ] = value;
			this.layer.dirty = true;
		},

		scale: function ( factor ) {
			this.LTM = this.LTM.scale( factor );
			this.updateCTM();
		},

		rotate: function ( angle ) {
			this.LTM = this.LTM.rotate( angle );
			this.updateCTM();
		},

		updateCTM: function () {
			this.CTM = this.parent.CTM.multiply( this.LTM );
		}
	};

	i.Shape.extend = function ( childProps ) {
		var Parent, Child, key;

		Parent = this;

		Child = function () {
			this._super = Parent.prototype;

			i.Shape.apply( this, arguments );

			if ( this.init ) {
				this.init.apply( this, arguments );
			}
		};

		// extend child with parent methods
		for ( key in Parent.prototype ) {
			if ( Parent.prototype.hasOwnProperty( key ) ) {
				Child.prototype[ key ] = Parent.prototype[ key ];
			}
		}

		// extend child with specified methods
		for ( key in childProps ) {
			if ( childProps.hasOwnProperty( key ) ) {
				Child.prototype[ key ] = childProps[ key ];
			}
		}

		Child.extend = Parent.extend;

		return Child;
	};


}( internal ));