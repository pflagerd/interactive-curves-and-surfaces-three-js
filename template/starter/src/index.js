import * as THREE from 'three';
import dat from 'dat-gui';


function main() {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    const scene = new THREE.Scene();

    // LIGHTS
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.physicallyCorrectLights = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    // CAMERA
    const camera = new THREE.PerspectiveCamera( 75, renderer.domElement.clientWidth / renderer.domElement.clientHeight, 0.1, 1000 );
    camera.aspect = renderer.domElement.clientWidth / renderer.domElement.clientHeight;
    camera.position.z = 5;

    const animate = function () {
        if (animation.animate) {

            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        }

        renderer.render( scene, camera );
    };

    let gui = new dat.GUI();
    let animation = {
        animate: true
    }
    gui.add(animation , "animate", false, true, true ).name( "animate" ).onChange( animate );

    // ACTION
    animate();
}

main()
