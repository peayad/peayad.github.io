var meshMaterial = new THREE.MeshPhongMaterial({
    color: 0x156289,
    emissive: 0x072534,
    side: THREE.DoubleSide,
    shading: THREE.FlatShading
});


function updateGeometry() {
    var selectedObject = scene.getObjectByName("finial_mesh");
    if (selectedObject != null) scene.remove(selectedObject);

    var sphereMesh = new THREE.Mesh(new THREE.SphereGeometry(data.radius, data.widthSegments, data.heightSegments));
    var sphereBSP = new ThreeBSP(sphereMesh);


    var result = sphereBSP;

    for (var i = -data.radius; i <= data.radius; i++) {
        var boxMesh = new THREE.Mesh(new THREE.BoxGeometry(data.radius * 2, data.knifesHeight, data.radius * 2));
        boxMesh.position.y = i * data.knifesSpacing;

        var boxBSP = new ThreeBSP(boxMesh);
        result = result.subtract(boxBSP);
    }

    result = result.toMesh(meshMaterial);

    /*
     var boxMesh_1 = new THREE.Mesh(new THREE.BoxGeometry(data.radius * 2, 0.5, data.radius * 2));
     var boxMesh_2 = new THREE.Mesh(new THREE.BoxGeometry(data.radius * 2, 0.5, data.radius * 2));

     boxMesh_1.position.y += 3;
     boxMesh_2.position.y -= 3;

     var boxes = [];
     boxes[0] = (boxMesh_1);
     boxes[1] = (boxMesh_2);


     var boxBSP_1 = new ThreeBSP(boxMesh_1);
     var boxBSP_2 = new ThreeBSP(boxMesh_2);


     var subtraction = sphereBSP.subtract(boxBSP_1);
     subtraction = subtraction.subtract(boxBSP_2);


     var result = subtraction.toMesh(meshMaterial);
     */

    result.name = "finial_mesh";
    scene.add(result);
}


// GUI folders
function initGUI() {

    var sphereFolder = gui.addFolder('Sphere');

    sphereFolder.add(data, 'radius', 1, 30).onChange(updateGeometry);
    sphereFolder.add(data, 'widthSegments', 1, 20).step(1).onChange(updateGeometry);
    sphereFolder.add(data, 'heightSegments', 1, 20).step(1).onChange(updateGeometry);

    var knifesFolder = gui.addFolder("Knifes");

    knifesFolder.add(data, 'knifesSpacing', 0.1, 5).onChange(updateGeometry);
    knifesFolder.add(data, 'knifesHeight', 0.05,2).onChange(updateGeometry);

}