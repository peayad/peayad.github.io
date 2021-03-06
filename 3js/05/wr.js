function loadCTM_Files() {

    //console.log("CTM files is now loading!");
    // main material (applied to all objects)
    var meshMaterial = new THREE.MeshPhongMaterial({
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading
    });


    // looping throw parameters and load them all
    var loader = new THREE.CTMLoader();

    for (var l = 1; l <= 6; l++) {
        for (var h = 1; h <= 6; h++) {
            for (var v = 1; v <= 6; v++) {

                (function () {

                    var meshName = 'L' + l + '_H' + h + '_V' + v;

                    loader.load('CTM/' + meshName + '.ctm', function (geometry) {
                        var mesh = new THREE.Mesh(geometry, meshMaterial);
                        //mesh.setRotationFromAxisAngle(new THREE.Vector3(-1,0,0),90);
                        var obj = new THREE.Object3D();
                        obj.name = meshName;

                        obj.add(mesh);
                        obj.visible = false;

                        // make sure the obj corresponding the selected parameters only show up
                        if (meshName == 'L' + guiData.L + '_H' + guiData.H + '_V' + guiData.V) obj.visible = true;

                        my3DObjects.add(obj);
                    });

                })();
            }
        }
    }

    scene.add(my3DObjects);

    //console.log("Loading is done!");
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


