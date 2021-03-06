
function loadCTM_Files() {
    console.log("CTM files is now loading!");

    var meshMaterial = new THREE.MeshPhongMaterial({
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading
    });


    for (var l = 1; l <= 6; l++) {
        for (var h = 1; h <= 6; h++) {
            for (var v = 1; v <= 6; v++) {

                (function () {

                    var meshName = 'L' + l + '_H' + h + '_V' + v;

                    var loader = new THREE.CTMLoader();
                    loader.load('CTM/' + meshName + '.ctm', function (geometry) {
                        var mesh = new THREE.Mesh(geometry, meshMaterial);

                        var obj = new THREE.Object3D();
                        obj.name = meshName;

                        obj.add(mesh);
                        obj.visible = false;
                        if(meshName == 'L1_H1_V1') obj.visible = true;

                        my3DObjects.add(obj);
                    });

                })();
            }
        }
    }

    scene.add(my3DObjects);
    ctmIsLoaded = true;
    console.log("Loading is done!");
}

function updateGeometry() {

    var selectedObject = scene.getObjectByName(previousSelectedName);
    if(selectedObject) selectedObject.visible = false;

    var objName = 'L' + data.L + '_H' + data.H + '_V' + data.V;

    var newSelectedObject = scene.getObjectByName(objName);
    if(newSelectedObject){
        newSelectedObject.visible = true;
    }

    previousSelectedName = objName;

}


// GUI folders
function initGUI() {

    gui.add(data, 'L', 1, 6).step(1).onChange(updateGeometry);
    gui.add(data, 'H', 1, 6).step(1).onChange(updateGeometry);
    gui.add(data, 'V', 1, 6).step(1).onChange(updateGeometry);

}