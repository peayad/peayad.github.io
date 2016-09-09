var meshMaterial = new THREE.MeshPhongMaterial({
    color: 0x156289,
    emissive: 0x072534,
    side: THREE.DoubleSide,
    shading: THREE.FlatShading
});


function updateGeometry() {
    // if there is any pervious geometry delete it
    var selectedObject = scene.getObjectByName("finial_mesh");
    if (selectedObject != null) scene.remove(selectedObject);

    //declaring resulting geometry
    var result = new THREE.Object3D();


    // starting with the rings
    var circleSrfs_Three = new THREE.Object3D();        //the converted circle surfaces
    var circleSrfs_Verb = [];                           //keeping it for intersecting lofts later on
    var verticalSpacing = data.height / data.numberOfSections;
    for (var i = 0; i <= data.numberOfSections; i++) {
        // sine wave manipulation
        // f(x) = A sin(B*x - C) + D
        var radius = data.A * Math.sin(data.B * i - data.C) + data.radius;

        var innerCircleVerb = new verb.geom.Circle([0, 0, i * verticalSpacing], [1, 0, 0], [0, 1, 0], radius);
        var outerCircleVerb = new verb.geom.Circle([0, 0, i * verticalSpacing], [1, 0, 0], [0, 1, 0], radius + 3);
        var loftedCircle = verb.geom.NurbsSurface.byLoftingCurves([innerCircleVerb, outerCircleVerb], 1);
        var circleThree = new THREE.Mesh(loftedCircle.toThreeGeometry(), meshMaterial);

        circleSrfs_Three.add(circleThree);
        circleSrfs_Verb.push(loftedCircle);

    }

    if(data.horizontalSections) result.add(circleSrfs_Three);


    if(data.verticalSections) {
        // building vertical knifes
        var knifes_Three = new THREE.Object3D();
        var knifes_Verb = [];
        var angularSpacing = Math.PI * 2 / data.numberOfVerticalSections;
        for (var i = 0; i < data.numberOfVerticalSections; i++) {

            var r = data.radius + 10;
            var x = r * Math.cos(i * angularSpacing);
            var y = r * Math.sin(i * angularSpacing);

            var baseLine = new verb.geom.BezierCurve([[0, 0, -1], [0, 0, data.height + 1]]);
            var knifeSrf = new verb.geom.ExtrudedSurface(baseLine, [x, y, 0]);
            var knifesSrf_Three = new THREE.Mesh(knifeSrf.toThreeGeometry(), meshMaterial);

            knifes_Three.add(knifesSrf_Three);
            knifes_Verb.push(knifeSrf)
        }

        // calling for intersection between knifes and circles
        var verticalSections_Verb = [];
        var verticalSections_Three = new THREE.Object3D();
        for (var j = 0; j < knifes_Verb.length; j++) {
            var intersectionCurves = [];
            for (var i = 0; i < circleSrfs_Verb.length; i++) {
                console.log("hi there")
                var intersectionCrv = new verb.geom.Intersect.surfaces(circleSrfs_Verb[i], knifes_Verb[j], 1e-6);
                intersectionCurves.push(intersectionCrv[0]);
            }

            var loftedIntersection = verb.geom.NurbsSurface.byLoftingCurves(intersectionCurves, 1);
            var loftedIntersection_Three = new THREE.Mesh(loftedIntersection.toThreeGeometry(), meshMaterial);

            verticalSections_Verb.push(loftedIntersection);
            verticalSections_Three.add(loftedIntersection_Three);
        }

        result.add(verticalSections_Three);
    }

    //declaring resulting geometry name, so we can find it later
    result.name = "finial_mesh";
    scene.add(result);
}


// GUI folders
function initGUI() {

    var mainFolder = gui.addFolder('Main');

    mainFolder.add(data, 'radius', 3.0, 30.0).step(0.1).onChange(updateGeometry);
    mainFolder.add(data, 'height', 3.0, 30.0).step(0.1).onChange(updateGeometry);
    mainFolder.add(data, 'thickness', 0.1, 1.0).step(0.1).onChange(updateGeometry);
    mainFolder.add(data, 'numberOfSections', 3, 10).step(1).onChange(updateGeometry);
    mainFolder.add(data, 'numberOfVerticalSections', 3, 10).step(1).onChange(updateGeometry);
    mainFolder.open();

    var curveFolder = gui.addFolder('CurveFolder');

    curveFolder.add(data, 'A', 1.0, 3.0).step(0.1).onChange(updateGeometry);
    curveFolder.add(data, 'B', 1.0, 3.0).step(0.1).onChange(updateGeometry);
    curveFolder.add(data, 'C', 1.0, 3.0).step(0.1).onChange(updateGeometry);
    //curveFolder.open();

    var performanceFolder = gui.addFolder('Performance');
    performanceFolder.add(data, 'horizontalSections').onChange(updateGeometry);
    performanceFolder.add(data, 'verticalSections').onChange(updateGeometry);
    //performanceFolder.open();
}