
var twoPi = Math.PI * 2;

function updateGroupGeometry( mesh, geometry ) {

	mesh.children[ 0 ].geometry.dispose();
	mesh.children[ 1 ].geometry.dispose();

	mesh.children[ 0 ].geometry = new THREE.WireframeGeometry( geometry );
	mesh.children[ 1 ].geometry = geometry;

	// these do not update nicely together if shared
}

var guis = {

	BoxGeometry : function( mesh ) {

		var data = {
			width : 15,
			height : 15,
			depth : 15,
			widthSegments : 1,
			heightSegments : 1,
			depthSegments : 1
		};

		function generateGeometry() {

			updateGroupGeometry( mesh,
				new THREE.BoxGeometry(
					data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments
				)
			);

		}

		var folder = gui.addFolder( 'THREE.BoxGeometry' );

		folder.add( data, 'width', 1, 30 ).onChange( generateGeometry );
		folder.add( data, 'height', 1, 30 ).onChange( generateGeometry );
		folder.add( data, 'depth', 1, 30 ).onChange( generateGeometry );
		folder.add( data, 'widthSegments', 1, 10 ).step( 1 ).onChange( generateGeometry );
		folder.add( data, 'heightSegments', 1, 10 ).step( 1 ).onChange( generateGeometry );
		folder.add( data, 'depthSegments', 1, 10 ).step( 1 ).onChange( generateGeometry );

		generateGeometry();

	}  ,

	MySphere : function( mesh ) {

		var data = {
			radius : 5,
			widthSegments : 13,
			heightSegments : 13,
			spacing: 3
		};

		function generateGeometry() {

			updateGroupGeometry( mesh,
				new THREE.SphereGeometry(
					data.radius, data.widthSegments, data.heightSegments
				)
			);

		}

		var folder = gui.addFolder( 'MySphere' );

		folder.add( data, 'radius', 1, 30 ).onChange( generateGeometry );
		folder.add( data, 'widthSegments', 1, 20 ).step( 1 ).onChange( generateGeometry );
		folder.add( data, 'heightSegments', 1, 20 ).step( 1 ).onChange( generateGeometry );

		generateGeometry();

	}

};

function chooseFromHash ( mesh ) {

	var selectedGeometry = "MySphere";

	guis[ selectedGeometry ]( mesh );

	//No configuration options
	return {};

}
