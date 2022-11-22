import * as THREE from 'three';
import { BufferGeometry } from 'three';

class CircleBufferGeometry extends BufferGeometry {
    radius = 1;
    x = 0; y = 0;
    segments = 32;
    vertices = [];

    constructor(/* double */ radius, /* double */ x, /* double */ y, /* int */ segments) {
        super();

        if (radius)
            this.radius = radius;

        if (x)
            this.x = x;

        if (y)
            this.y = y;

        if (segments)
            this.segments = segments;

        for (let angle = 0, segment = 0; segment <= this.segments; angle = segment * 2 * Math.PI / this.segments, segment++) {
            this.vertices.push( new THREE.Vector3( this.x + this.radius * Math.cos(angle), this.y + this.radius * Math.sin(angle), 0 ) );
        }
        this.setFromPoints( this.vertices );
    }
}

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

    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const line = new THREE.Line( geometry, material );
    scene.add( line );

    {
        const circleGeometry = new CircleBufferGeometry(0.2, -8, -6);
        const circle = new THREE.LineLoop(circleGeometry, material);
        scene.add(circle);
    }

    {
        const circleGeometry = new CircleBufferGeometry(0.2, -6, 6);
        const circle = new THREE.LineLoop(circleGeometry, material);
        scene.add(circle);
    }

    {
        const circleGeometry = new CircleBufferGeometry(0.2, 6, 6);
        const circle = new THREE.LineLoop(circleGeometry, material);
        scene.add(circle);
    }

    {
        const circleGeometry = new CircleBufferGeometry(0.2, 8, -6);
        const circle = new THREE.LineLoop(circleGeometry, material);
        scene.add(circle);
    }

    renderer.render( scene, camera );
}

main()
