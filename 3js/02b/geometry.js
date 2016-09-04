
var twoPi = Math.PI * 2;

function updateGroupGeometry( mesh, geometry ) {

	mesh.children[ 0 ].geometry.dispose();
	mesh.children[ 1 ].geometry.dispose();

	mesh.children[ 0 ].geometry = new THREE.WireframeGeometry( geometry );
	mesh.children[ 1 ].geometry = geometry;

	// these do not update nicely together if shared
}

var guis = {

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
