function loadCTM_Files() {

    //console.log("CTM files is now loading!");
    // main material (applied to all objects)
    var meshMaterial = new THREE.MeshPhongMaterial({
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading
    });



    var loader = new THREE.ColladaLoader(loadingManager);

    loader.load('test.dae', function (geometry) {
        var mesh = new THREE.Mesh(geometry, meshMaterial);
        scene.add(mesh);
    });

}


function updateGeometry() {
    /*
     it's called each time the slider are changed to load a different object,
     but it doesn't really reload, it just makes the previous one not visible the newly selected becomes visible
     */

    var selectedObject = scene.getObjectByName(previousSelectedName);
    if (selectedObject) selectedObject.visible = false;

    var objName = 'L' + guiData.L + '_H' + guiData.H + '_V' + guiData.V;

    var newSelectedObject = scene.getObjectByName(objName);
    if (newSelectedObject) {
        newSelectedObject.visible = true;
    }

    previousSelectedName = objName;

}


