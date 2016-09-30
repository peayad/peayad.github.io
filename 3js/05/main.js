// global variables
var scene,camera,renderer;
var controls, stats;
var ambientLight, lights;

// gui data
var gui;
var data = {
    L: 1,
    H: 1,
    V: 1
};

// variables for loading the CTM files
var my3DObjects = new THREE.Object3D();     // a parent to all loaded CTM files
var previousSelectedName = 'L1_H1_V1';

function initGUI(){
    gui = new dat.GUI();
    gui.add(data, 'L', 1, 6).step(1).onChange(updateGeometry);
    gui.add(data, 'H', 1, 6).step(1).onChange(updateGeometry);
    gui.add(data, 'V', 1, 6).step(1).onChange(updateGeometry);
}

function initScene(){

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.set( 0, 0, 250 );

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild( stats.dom );

    orbit = new THREE.OrbitControls(camera, renderer.domElement);
    orbit.enableZoom = true;
    orbit.enablePan = true;

    ambientLight = new THREE.AmbientLight(0x000000);
    scene.add(ambientLight);

    lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    initGUI();


    THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
    };
}


function render() {

    requestAnimationFrame(render);

    renderer.render(scene, camera);

    stats.update();

}

window.addEventListener('resize', function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}, false);


// calling main function in order
initScene();
loadCTM_Files();
updateGeometry();
render();