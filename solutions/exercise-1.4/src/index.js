import * as THREE from 'three';

function main() {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 0, 0, 0));

    const material = new THREE.PointsMaterial( { size: 10, sizeAttenuation: false, color: 0xFFFFFF } );

    const points = new THREE.Points( geometry, material );

    scene.add( points );

    camera.position.z = 5;

    renderer.render( scene, camera );
}

main()
