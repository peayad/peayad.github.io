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

    var loader = new THREE.CTMLoader();
    loader.load( 'CTM/L' + data.L + '_H' + data.H + '_V' + data.V + '.ctm', function ( geometry ) {

        var material = new THREE.MeshPhongMaterial( { color: 0x156289 } );

        var mesh = new THREE.Mesh( geometry, meshMaterial );
        mesh.name = 'finial_mesh';
        mesh.position.set(0,0,0);
        scene.add( mesh );

    } );

}


// GUI folders
function initGUI() {

    gui.add(data, 'L', 1, 6).step(1).onFinishChange(updateGeometry);
    gui.add(data, 'H', 1, 6).step(1).onFinishChange(updateGeometry);
    gui.add(data, 'V', 1, 6).step(1).onFinishChange(updateGeometry);

}