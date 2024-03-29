import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {TeapotBufferGeometry} from 'three/examples/jsm/geometries/TeapotBufferGeometry';
import dat from "dat-gui";

import UV_Grid_Sm from '../textures/UV_Grid_Sm.jpg';
import nx from '../textures/cube/skybox/nx.jpg';
import ny from '../textures/cube/skybox/ny.jpg';
import nz from '../textures/cube/skybox/nz.jpg';
import px from '../textures/cube/skybox/px.jpg';
import py from '../textures/cube/skybox/py.jpg';
import pz from '../textures/cube/skybox/pz.jpg';

function main() {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";

    // CAMERA
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    let camera, scene;
    let cameraControls;
    let effectController;
    let teapotSize = 400;
    let ambientLight, light;

    let tess = -1;	// force initialization
    let bBottom ;
    let bLid;
    let bBody;
    let bFitLid;
    let bNonBlinn;
    let shading;
    let wireMaterial, flatMaterial, gouraudMaterial, phongMaterial, texturedMaterial, reflectiveMaterial;

    let teapot, textureCube;

    // allocate these just once
    let diffuseColor = new THREE.Color();
    let specularColor = new THREE.Color();

    init();
    render();

    function init() {

        // CAMERA
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 80000 );
        camera.position.set( -600, 550, 1300 );

        // LIGHTS
        ambientLight = new THREE.AmbientLight( 0x333333 );	// 0.2

        light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
        // direction is set in GUI

        // RENDERER
        renderer.setClearColor( 0xAAAAAA );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        // EVENTS
        window.addEventListener( 'resize', onWindowResize, false );

        // CONTROLS
        cameraControls = new OrbitControls( camera, renderer.domElement );
        cameraControls.target.set( 0, 0, 0 );
        cameraControls.addEventListener( 'change', render );

        // TEXTURE MAP
        let textureMap = new THREE.TextureLoader().load( UV_Grid_Sm );
        textureMap.wrapS = textureMap.wrapT = THREE.RepeatWrapping;
        textureMap.anisotropy = 16;

        // REFLECTION MAP
        let urls = [
            px, nx, py, ny, pz, nz
        ];

        textureCube = new THREE.CubeTextureLoader().load( urls );

        // MATERIALS
        let materialColor = new THREE.Color();
        materialColor.setRGB( 1.0, 1.0, 1.0 );

        wireMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFFFF, wireframe: true } ) ;

        flatMaterial = new THREE.MeshPhongMaterial( { color: materialColor, specular: 0x0, shading: THREE.FlatShading, side: THREE.DoubleSide } );

        gouraudMaterial = new THREE.MeshLambertMaterial( { color: materialColor, side: THREE.DoubleSide } );

        phongMaterial = new THREE.MeshPhongMaterial( { color: materialColor, shading: THREE.SmoothShading, side: THREE.DoubleSide } );

        texturedMaterial = new THREE.MeshPhongMaterial( { color: materialColor, map: textureMap, shading: THREE.SmoothShading, side: THREE.DoubleSide } );

        reflectiveMaterial = new THREE.MeshPhongMaterial( { color: materialColor, envMap: textureCube, shading: THREE.SmoothShading, side: THREE.DoubleSide } );

        // scene itself
        scene = new THREE.Scene();

        scene.add( ambientLight );
        scene.add( light );

        // GUI
        setupGui();

    }

    // EVENT HANDLERS

    function onWindowResize() {

        let canvasWidth = window.innerWidth;
        let canvasHeight = window.innerHeight;

        renderer.setSize( canvasWidth, canvasHeight );

        camera.aspect = canvasWidth / canvasHeight;
        camera.updateProjectionMatrix();

        render();

    }

    function setupGui() {

        effectController = {

            shininess: 40.0,
            ka: 0.17,
            kd: 0.51,
            ks: 0.2,
            metallic: true,

            hue:		0.121,
            saturation: 0.73,
            lightness:  0.66,

            lhue:		 0.04,
            lsaturation: 0.01,	// non-zero so that fractions will be shown
            llightness:  1.0,

            // bizarrely, if you initialize these with negative numbers, the sliders
            // will not show any decimal places.
            lx: 0.32,
            ly: 0.39,
            lz: 0.7,
            newTess: 15,
            bottom: true,
            lid: true,
            body: true,
            fitLid: false,
            nonblinn: false,
            newShading: "glossy"
        };

        let h;

        let gui = new dat.GUI();

        // material (attributes)

        h = gui.addFolder( "Material control" );

        h.add( effectController, "shininess", 1.0, 400.0, 1.0 ).name( "shininess" ).onChange( render );
        h.add( effectController, "kd", 0.0, 1.0, 0.025 ).name( "diffuse strength" ).onChange( render );
        h.add( effectController, "ks", 0.0, 1.0, 0.025 ).name( "specular strength" ).onChange( render );
        h.add( effectController, "metallic" ).onChange( render );

        // material (color)

        h = gui.addFolder( "Material color" );

        h.add( effectController, "hue", 0.0, 1.0, 0.025 ).name( "hue" ).onChange( render );
        h.add( effectController, "saturation", 0.0, 1.0, 0.025 ).name( "saturation" ).onChange( render );
        h.add( effectController, "lightness", 0.0, 1.0, 0.025 ).name( "lightness" ).onChange( render );

        // light (point)

        h = gui.addFolder( "Lighting" );

        h.add( effectController, "lhue", 0.0, 1.0, 0.025 ).name( "hue" ).onChange( render );
        h.add( effectController, "lsaturation", 0.0, 1.0, 0.025 ).name( "saturation" ).onChange( render );
        h.add( effectController, "llightness", 0.0, 1.0, 0.025 ).name( "lightness" ).onChange( render );
        h.add( effectController, "ka", 0.0, 1.0, 0.025 ).name( "ambient" ).onChange( render );

        // light (directional)

        h = gui.addFolder( "Light direction" );

        h.add( effectController, "lx", -1.0, 1.0, 0.025 ).name( "x" ).onChange( render );
        h.add( effectController, "ly", -1.0, 1.0, 0.025 ).name( "y" ).onChange( render );
        h.add( effectController, "lz", -1.0, 1.0, 0.025 ).name( "z" ).onChange( render );

        h = gui.addFolder( "Tessellation control" );
        h.add( effectController, "newTess", [ 2, 3, 4, 5, 6, 8, 10, 15, 20, 30, 40, 50 ] ).name( "Tessellation Level" ).onChange( render );
        h.add( effectController, "lid" ).name( "display lid" ).onChange( render );
        h.add( effectController, "body" ).name( "display body" ).onChange( render );
        h.add( effectController, "bottom" ).name( "display bottom" ).onChange( render );
        h.add( effectController, "fitLid" ).name( "snug lid" ).onChange( render );
        h.add( effectController, "nonblinn" ).name( "original scale" ).onChange( render );

        // shading
        gui.add( effectController, "newShading", [ "wireframe", "flat", "smooth", "glossy", "textured", "reflective" ] ).name( "Shading" ).onChange( render );

    }


    //

    function render() {

        if ( effectController.newTess !== tess ||
            effectController.bottom !== bBottom ||
            effectController.lid !== bLid ||
            effectController.body !== bBody ||
            effectController.fitLid !== bFitLid ||
            effectController.nonblinn !== bNonBlinn ||
            effectController.newShading !== shading )
        {

            tess = effectController.newTess;
            bBottom = effectController.bottom;
            bLid = effectController.lid;
            bBody = effectController.body;
            bFitLid = effectController.fitLid;
            bNonBlinn = effectController.nonblinn;
            shading = effectController.newShading;

            createNewTeapot();

        }

        // We're a bit lazy here. We could check to see if any material attributes changed and update
        // only if they have. But, these calls are cheap enough and this is just a demo.
        phongMaterial.shininess = effectController.shininess;
        texturedMaterial.shininess = effectController.shininess;

        diffuseColor.setHSL( effectController.hue, effectController.saturation, effectController.lightness );
        if ( effectController.metallic )
        {

            // make colors match to give a more metallic look
            specularColor.copy( diffuseColor );

        }
        else
        {

            // more of a plastic look
            specularColor.setRGB( 1, 1, 1 );

        }

        diffuseColor.multiplyScalar( effectController.kd );
        flatMaterial.color.copy( diffuseColor );
        gouraudMaterial.color.copy( diffuseColor );
        phongMaterial.color.copy( diffuseColor );
        texturedMaterial.color.copy( diffuseColor );

        specularColor.multiplyScalar( effectController.ks );
        phongMaterial.specular.copy( specularColor );
        texturedMaterial.specular.copy( specularColor );

        // Ambient's actually controlled by the light for this demo
        ambientLight.color.setHSL( effectController.hue, effectController.saturation, effectController.lightness * effectController.ka );

        light.position.set( effectController.lx, effectController.ly, effectController.lz );
        light.color.setHSL( effectController.lhue, effectController.lsaturation, effectController.llightness );

        // skybox is rendered separately, so that it is always behind the teapot.
        if ( shading === "reflective" ) {

            scene.background = textureCube;

        } else {

            scene.background = null;

        }

        renderer.render( scene, camera );

    }

    // Whenever the teapot changes, the scene is rebuilt from scratch (not much to it).
    function createNewTeapot() {

        if ( teapot !== undefined ) {

            teapot.geometry.dispose();
            scene.remove( teapot );

        }

        let teapotGeometry = new TeapotBufferGeometry( teapotSize,
            tess,
            effectController.bottom,
            effectController.lid,
            effectController.body,
            effectController.fitLid,
            ! effectController.nonblinn );

        teapot = new THREE.Mesh(
            teapotGeometry,
            shading === "wireframe" ? wireMaterial : (
                shading === "flat" ? flatMaterial : (
                    shading === "smooth" ? gouraudMaterial : (
                        shading === "glossy" ? phongMaterial : (
                            shading === "textured" ? texturedMaterial : reflectiveMaterial ) ) ) ) );	// if no match, pick Phong

        scene.add( teapot );

    }
}

main()
