import * as THREE from 'three';

function main() {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF)

    // CAMERA
    const camera = new THREE.OrthographicCamera( -10, 10, 10, -10, 1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    camera.position.z = 20;

    const material = new THREE.LineBasicMaterial({color: 0x000000});

    const points = [];
    points.push( new THREE.Vector3( -8, -6, 0 ) );
    points.push( new THREE.Vector3( -6, 6, 0 ) );
    points.push( new THREE.Vector3( 6, 6, 0 ) );
    points.push( new THREE.Vector3( 8, -6, 0 ) );
    points.push( new THREE.Vector3( -8, -6, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const line = new THREE.Line( geometry, material );
    scene.add( line );

    const circleGeometry = new THREE.CircleBufferGeometry( 5, 100 );
    //circleGeometry.vertices.splice(0, 1);
    const circle = new THREE.LineLoop( circleGeometry, material );
    scene.add( circle );

    renderer.render( scene, camera );
}

main()
