import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import dat from "dat-gui";

class XYAxes extends THREE.Group {

    constructor(container) {
        super();

        this.xAxis = true;
        this.yAxis = true;

        this.container = container;

        const xMaterial = new THREE.LineBasicMaterial( { color: 0xFF0000, linewidth: 2 } );
        const xGeometry = new THREE.BufferGeometry();
        xGeometry.setFromPoints([
            new THREE.Vector2(-9, 0),
            new THREE.Vector2(-8.7, -0.2),
            new THREE.Vector2(-8.8, 0),
            new THREE.Vector2(-8.7, 0.2),
            new THREE.Vector2(-9, 0),
            new THREE.Vector2(9, 0),
            new THREE.Vector2(8.7, 0.2),
            new THREE.Vector2(8.8, 0),
            new THREE.Vector2(8.7, -0.2),
            new THREE.Vector2(9, 0),
        ]);
        const xLine = new THREE.Line( xGeometry, xMaterial );
        this.add(xLine);

        this.xLabelElement = document.createElement('div');
        document.body.appendChild(this.xLabelElement);
        this.xLabelElement.style.position = 'absolute';
        this.xLabelElement.style.zIndex = '10';
        this.xLabelElement.textContent = 'x';
        this.xLabelElement.style.fontFamily = 'Arial';
        this.xLabelElement.style.fontSize = '14pt';
        xLine.onAfterRender = function() {
            const screenPosition = this.container.getScreenPosition(9, 0);
            this.xLabelElement.style.left = (screenPosition.x + 5) + 'px';
            console.log(this.xLabelElement.offsetHeight + 2);
            this.xLabelElement.style.top = (screenPosition.y - (this.xLabelElement.offsetHeight + 2) / 2) + 'px';
        }.bind(this);

        const yMaterial = new THREE.LineBasicMaterial( { color: 0x00FF00, linewidth: 2 } );
        const yGeometry = new THREE.BufferGeometry();
        yGeometry.setFromPoints([
            new THREE.Vector2(0, -9),
            new THREE.Vector2(-0.2, -8.7),
            new THREE.Vector2(0, -8.8),
            new THREE.Vector2(0.2, -8.7),
            new THREE.Vector2(0, -9),
            new THREE.Vector2(0, 9),
            new THREE.Vector2(0.2, 8.7),
            new THREE.Vector2(0, 8.8),
            new THREE.Vector2(-0.2, 8.7),
            new THREE.Vector2(0, 9),
        ]);

        const yLine = new THREE.Line( yGeometry, yMaterial );

        this.add(yLine);

        this.yLabelElement = document.createElement('div');
        document.body.appendChild(this.yLabelElement);
        this.yLabelElement.style.position = 'absolute';
        this.yLabelElement.style.zIndex = '10';
        this.yLabelElement.textContent = 'y = f(x)';
        this.yLabelElement.style.fontFamily = 'Arial';
        this.yLabelElement.style.fontSize = '14pt';
        yLine.onAfterRender = function() {
            const screenPosition = this.container.getScreenPosition(0, 9);
            this.yLabelElement.style.left = (screenPosition.x - (this.yLabelElement.offsetWidth + 2) / 2) + 'px';
            console.log(this.yLabelElement.offsetHeight + 2);
            this.yLabelElement.style.top = (screenPosition.y - this.yLabelElement.offsetHeight - 5) + 'px';
        }.bind(this);

        const geometry = new THREE.BufferGeometry();
        geometry.setFromPoints([new THREE.Vector2(0, 0)]);
        const material = new THREE.PointsMaterial({color: 0x888888, size: 6});
        const points = new THREE.Points(geometry, material);

        this.add(points);
    }
}

class TwoD {
    constructor() {
        document.head.insertAdjacentHTML("beforeEnd", "<link rel=\"icon\" href=\"data:image/x-icon;base64,AA\">");

        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.position = 'relative';
        document.body.style.overflow = "hidden";

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onWindowResize.bind(this), false);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xFFFFFF)

        // CAMERA
        this.camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 1, 1000);
        this.camera.position.z = 20;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.cameraControls.target.set(0, 0, 0);
        this.cameraControls.addEventListener('change', this.render.bind(this));

        let xyAxes = new XYAxes(this);

        // little control dialog
        let gui = new dat.GUI();
        let h = gui.addFolder( "Axes" );
        h.add( xyAxes, "xAxis", false, true, true ).name( "xAxis" ).onChange( this.render );
        h.add( xyAxes, "yAxis", false, true, true ).name( "yAxis" ).onChange( this.render );
        h.open();

        this.scene.add(xyAxes);

    }

    getScreenPosition(x, y, z) {
        let vector = new THREE.Vector3( x, y, z );

        vector.project(this.camera);

        vector.x = Math.round( (  vector.x + 1 ) * window.innerWidth / 2 );
        vector.y = Math.round( ( -vector.y + 1 ) * window.innerHeight / 2 );

        return vector;
    }

    onWindowResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.render();
    }

    setupGui() {


        //     effectController = {
        //
        //         shininess: 40.0,
        //         ka: 0.17,
        //         kd: 0.51,
        //         ks: 0.2,
        //         metallic: true,
        //
        //         hue:		0.121,
        //         saturation: 0.73,
        //         lightness:  0.66,
        //
        //         lhue:		 0.04,
        //         lsaturation: 0.01,	// non-zero so that fractions will be shown
        //         llightness:  1.0,
        //
        //         // bizarrely, if you initialize these with negative numbers, the sliders
        //         // will not show any decimal places.
        //         lx: 0.32,
        //         ly: 0.39,
        //         lz: 0.7,
        //         newTess: 15,
        //         bottom: true,
        //         lid: true,
        //         body: true,
        //         fitLid: false,
        //         nonblinn: false,
        //         newShading: "glossy"
        //     };
        //
        //     let h;
        //
        //     let gui = new dat.GUI();
        //
        //     // material (attributes)
        //
        //     h = gui.addFolder( "Material control" );
        //
        //     h.add( effectController, "shininess", 1.0, 400.0, 1.0 ).name( "shininess" ).onChange( render );
        //     h.add( effectController, "kd", 0.0, 1.0, 0.025 ).name( "diffuse strength" ).onChange( render );
        //     h.add( effectController, "ks", 0.0, 1.0, 0.025 ).name( "specular strength" ).onChange( render );
        //     h.add( effectController, "metallic" ).onChange( render );
        //
        //     // material (color)
        //
        //     h = gui.addFolder( "Material color" );
        //
        //     h.add( effectController, "hue", 0.0, 1.0, 0.025 ).name( "hue" ).onChange( render );
        //     h.add( effectController, "saturation", 0.0, 1.0, 0.025 ).name( "saturation" ).onChange( render );
        //     h.add( effectController, "lightness", 0.0, 1.0, 0.025 ).name( "lightness" ).onChange( render );
        //
        //     // light (point)
        //
        //     h = gui.addFolder( "Lighting" );
        //
        //     h.add( effectController, "lhue", 0.0, 1.0, 0.025 ).name( "hue" ).onChange( render );
        //     h.add( effectController, "lsaturation", 0.0, 1.0, 0.025 ).name( "saturation" ).onChange( render );
        //     h.add( effectController, "llightness", 0.0, 1.0, 0.025 ).name( "lightness" ).onChange( render );
        //     h.add( effectController, "ka", 0.0, 1.0, 0.025 ).name( "ambient" ).onChange( render );
        //
        //     // light (directional)
        //
        //     h = gui.addFolder( "Light direction" );
        //
        //     h.add( effectController, "lx", -1.0, 1.0, 0.025 ).name( "x" ).onChange( render );
        //     h.add( effectController, "ly", -1.0, 1.0, 0.025 ).name( "y" ).onChange( render );
        //     h.add( effectController, "lz", -1.0, 1.0, 0.025 ).name( "z" ).onChange( render );
        //
        //     h = gui.addFolder( "Tessellation control" );
        //     h.add( effectController, "newTess", [ 2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 40, 50 ] ).name( "Tessellation Level" ).onChange( render );
        //     h.add( effectController, "lid" ).name( "display lid" ).onChange( render );
        //     h.add( effectController, "body" ).name( "display body" ).onChange( render );
        //     h.add( effectController, "bottom" ).name( "display bottom" ).onChange( render );
        //     h.add( effectController, "fitLid" ).name( "snug lid" ).onChange( render );
        //     h.add( effectController, "nonblinn" ).name( "original scale" ).onChange( render );
        //
        //     // shading
        //     gui.add( effectController, "newShading", [ "wireframe", "flat", "smooth", "glossy", "textured", "reflective" ] ).name( "Shading" ).onChange( render );

    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }


}

new TwoD().render();
