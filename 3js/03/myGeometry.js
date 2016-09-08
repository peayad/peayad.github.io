var meshMaterial = new THREE.MeshPhongMaterial({
    color: 0x156289,
    emissive: 0x072534,
    side: THREE.DoubleSide,
    shading: THREE.FlatShading
});


function updateGeometry() {
    var selectedObject = scene.getObjectByName("finial_mesh");
    if (selectedObject != null) scene.remove(selectedObject);

    var extrudeSettings =
    {
        amount: data.thickness,
        bevelEnabled: false,
        bevelSegments: 2,
        steps: 1,
        extrudePath: null
    };


    //resulting geometry
    var result = new THREE.Object3D();

    // building a series of circles
    var circles = new THREE.Object3D();
    var spacing = data.height / data.numberOfSections;

    if (data.displayHorizontalSections) {
        for (var i = 0; i < data.numberOfSections; i++) {

            // sine wave manipulation
            // f(x) = A sin(B*x - C) + D
            var radius = data.A * Math.sin(data.B * i - data.C) + data.radius;

            var arcShape = new THREE.Shape();
            arcShape.absarc(0, 0, radius + 3, 0, Math.PI * 2, false);

            var holePath = new THREE.Path();
            holePath.absarc(0, 0, radius, 0, Math.PI * 2, true);
            arcShape.holes.push(holePath);

            var geometry = new THREE.ExtrudeGeometry(arcShape, extrudeSettings);
            var mesh = new THREE.Mesh(geometry, meshMaterial);
            mesh.position.set(0, 0, i * spacing);
            circles.add(mesh);
        }
        result.add(circles);
    }

    if (data.displayVerticalSections) {

        // building sections
        var innerPoints = [];
        var outerPoints = [];

        for (var i = 0; i < data.numberOfSections; i++) {
            var radius = data.A * Math.sin(data.B * i - data.C) + data.radius;
            var x = radius * Math.cos(0);
            var y = radius * Math.sin(0);
            var z = i * spacing;
            //points.push(new THREE.Vector3(x,y,z));
            innerPoints.push(new THREE.Vector2(x, z));

            x += 3;
            outerPoints.push(new THREE.Vector2(x, z));
        }

        var points = innerPoints.concat(outerPoints.reverse());
        points.push(innerPoints[0]);
        var completeGeom = new THREE.LatheGeometry(points, 25, 0, 2 * Math.PI);
        var completeLathe = new THREE.Mesh(completeGeom, meshMaterial);
        completeLathe.rotation.set(Math.PI / 2, 0, 0);
        if (data.displayVerticalSections) result.add(completeLathe);
        var skinBSP = new ThreeBSP(completeLathe);


        var triangleMeshes = new THREE.Object3D();
        var step = Math.PI / data.numberOfVerticalSectinos;
        for (var i = -2 * step; i < data.numberOfVerticalSectinos; i += step) {
            var radius = 50;
            x1 = radius * Math.cos(i + data.verticalThickness);
            y1 = radius * Math.sin(i + data.verticalThickness);


            x2 = radius * Math.cos(i + step - data.verticalThickness);
            y2 = radius * Math.sin(i + step - data.verticalThickness);

            var triangleShape = new THREE.Shape();
            triangleShape.moveTo(0, 0);
            triangleShape.lineTo(x1, y1);
            triangleShape.lineTo(x2, y2);
            triangleShape.lineTo(0, 0); // close path

            var extrudeSettingsN = {
                amount: data.height / 2,
                bevelEnabled: true,
                bevelSegments: 2,
                steps: 2,
                bevelSize: 1,
                bevelThickness: 1
            };

            var triangleGeometry = new THREE.ExtrudeGeometry(triangleShape, extrudeSettingsN);
            var triangleMesh = new THREE.Mesh(triangleGeometry, meshMaterial);

            var triangleBSP = new ThreeBSP(triangleMesh);
            skinBSP = skinBSP.subtract(triangleBSP);
        }

        var skin = skinBSP.toMesh(meshMaterial);

        result.add(skin);
    }

    result.name = "finial_mesh";
    scene.add(result);
}


// GUI folders
function initGUI() {

    var mainFolder = gui.addFolder('Main');

    mainFolder.add(data, 'radius', 5.0, 30.0).step(0.1).onChange(updateGeometry);
    mainFolder.add(data, 'height', 3.0, 30.0).step(0.1).onChange(updateGeometry);
    mainFolder.add(data, 'thickness', 0.1, 1.0).step(0.1).onChange(updateGeometry);
    mainFolder.add(data, 'numberOfSections', 3, 10).step(1).onChange(updateGeometry);
    mainFolder.open();

    var curveFolder = gui.addFolder('CurveFolder');

    curveFolder.add(data, 'A', 1.0, 3.0).step(0.1).onChange(updateGeometry);
    curveFolder.add(data, 'B', 1.0, 3.0).step(0.1).onChange(updateGeometry);
    curveFolder.add(data, 'C', 1.0, 3.0).step(0.1).onChange(updateGeometry);
    //curveFolder.open();

    gui.add(data, 'displayHorizontalSections').onChange(updateGeometry);
    gui.add(data, 'displayVerticalSections').onChange(updateGeometry);
}