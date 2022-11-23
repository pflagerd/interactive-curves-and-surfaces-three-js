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
        this.vertices.push(this.x + this.radius, this.y + this.radius, 0);
        this.setFromPoints( this.vertices );
    }
}

class CenteredRectangleBufferGeometry extends BufferGeometry {
    angle = 0;
    height = 1;
    vertices = [];
    width = 1;
    x = 0;
    y = 0;

    constructor(/* double */ width, /*double */ height, /* double */ x, /* double */ y, /* double */ angle) {
        super();

        if (width)
            this.width = width;

        if (height)
            this.height = height;

        if (x)
            this.x = x;

        if (y)
            this.y = y;

        if (angle)
            this.angle = angle;

        this.vertices.push(new THREE.Vector3(this.x - this.width / 2, this.y + this.height / 2, 0));
        this.vertices.push(new THREE.Vector3(this.x + this.width / 2, this.y + this.height / 2, 0));
        this.vertices.push(new THREE.Vector3(this.x + this.width / 2, this.y - this.height / 2, 0));
        this.vertices.push(new THREE.Vector3(this.x - this.width / 2, this.y - this.height / 2, 0));
        this.vertices.push(new THREE.Vector3(this.x - this.width / 2, this.y + this.height / 2, 0));

        this.setFromPoints( this.vertices );
        this.rotateZ(this.angle);
    }
}

class ThreeLineSegmentBufferGeometry extends BufferGeometry {
    vertices = [];

    constructor() {
        super();
        this.vertices.push( new THREE.Vector3( -8, -6, 0 ) );
        this.vertices.push( new THREE.Vector3( -6, 6, 0 ) );
        this.vertices.push( new THREE.Vector3( 6, 6, 0 ) );
        this.vertices.push( new THREE.Vector3( 8, -6, 0 ) );
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


    const threeLineGeometry = new ThreeLineSegmentBufferGeometry();
    const threeLine = new THREE.Line( threeLineGeometry, material );
    scene.add( threeLine );

    {
        const circleGeometry = new CircleBufferGeometry(0.2, -8, -6);
        const circle = new THREE.Line(circleGeometry, material);
        scene.add(circle);
    }

    {
        const circleGeometry = new CircleBufferGeometry(0.2, -6, 6);
        const circle = new THREE.Line(circleGeometry, material);
        scene.add(circle);
    }

    {
        const circleGeometry = new CircleBufferGeometry(0.2, 6, 6);
        const circle = new THREE.Line(circleGeometry, material);
        scene.add(circle);
    }

    {
        const circleGeometry = new CircleBufferGeometry(0.2, 8, -6);
        const circle = new THREE.Line(circleGeometry, material);
        scene.add(circle);
    }

    {
        const centeredRectangleGeometry = new CenteredRectangleBufferGeometry(18, 16);
        const centeredRectangle = new THREE.Line(centeredRectangleGeometry, material);
        scene.add(centeredRectangle);
    }

    renderer.render( scene, camera );
}

main()
