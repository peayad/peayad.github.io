var meshMaterial = new THREE.MeshPhongMaterial({
    color: 0x156289,
    emissive: 0x072534,
    side: THREE.DoubleSide,
    shading: THREE.FlatShading
});


function updateGeometry() {
    var selectedObject = scene.getObjectByName("finial_mesh");
    if (selectedObject != null) {
        scene.remove(selectedObject);
    };

    var loader = new THREE.STLLoader();
    loader.load( 'STL/R' + data.R + '_H' + data.H + '_O' + data.O + '.stl', function ( geometry ) {

        var material = new THREE.MeshPhongMaterial( { color: 0x156289 } );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.name = 'finial_mesh';
        mesh.position.set(0,0,0);
        scene.add( mesh );

    } );

}


// GUI folders
function initGUI() {

    gui.add(data, 'R', 1, 6).step(1).onFinishChange(updateGeometry);
    gui.add(data, 'H', 1, 6).step(1).onFinishChange(updateGeometry);
    gui.add(data, 'O', 1, 6).step(1).onFinishChange(updateGeometry);

}