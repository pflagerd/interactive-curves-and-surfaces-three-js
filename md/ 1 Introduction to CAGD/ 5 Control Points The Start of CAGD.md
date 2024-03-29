### Control Points: The Start of CAGD

![1623196134559](.md/5/1623196134559.png)

Take four points in a plane and connect them to form a polygon.  The four points may be called *control points*, in that they *are points in two or more dimensions that define the behavior of the resulting curve*.  The polygon formed by connecting the control points in the "correct" order are called the *control polygon*.  The control polygon provides a crude analogy of the refined curve.  Note that the control polygon is typically open (the ends are not coincident), and it may self-intersect.  The control points and the control polygon determine the approximate shape of the curve to be formed.





#### Exercise 1.5.1

In this exercise, you'll create an application  in threejs using `template/` as a starting point.1.5.2

1. Follow the detailed instructions in `template/README.md` describing how to create a new application using `template/` as a starting point.
2. Make sure to read the code.  You'll want to keep the threejs documentation for r124 handy.  Look up the classes and methods as you read.  There's no faster way to learn threejs.
3. After completing the instructions you should see a black screen with a sort of rotating cube that looks like this:

<img src=".md/ 5 Control Points The Start of CAGD/1629779170492.png" alt=""></img>

4. Now turn off the animation.
5. Show the result to your tutor.


<br>
<br>

#### Exercise 1.5.2

1. Create a new project from `template/`, and use this code to render a starscape.

1. Here is some sample code which you can use to create a kind of starscape.
```javascript
const vertices = [];

for ( let i = 0; i < 10000; i ++ ) {

const x = THREE.MathUtils.randFloatSpread( 2000 );
const y = THREE.MathUtils.randFloatSpread( 2000 );
const z = THREE.MathUtils.randFloatSpread( 2000 );

vertices.push( x, y, z );

}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

const material = new THREE.PointsMaterial( { color: 0x888888 } );

const points = new THREE.Points( geometry, material );

scene.add( points );
```

3. You should see something like this when you're done:

   <img src=".md/ 5 Control Points The Start of CAGD/starscape.png"></img>

7. Show your tutor.

<br>
<br>

#### Exercise 1.5.3

In this exercise, you're going to draw the little four-control-point image at the top of this page.

1. Create a new project from `template/`.
2. Draw a single black line on a white background. Here's some code to get you started:
```javascript
// Notice the change in camera position here.
// Without this, you won't be able to see much (or any) of the line segment.
scene.background = new THREE.Color(0xFFFFFF)

camera.position.z = 15;

const material = new THREE.LineBasicMaterial({color: 0x000000});

const points = [];
points.push( new THREE.Vector3( -10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( geometry, material );
scene.add( line );
```
3. You should now see something like this
   <img src=".md/ 5 Control Points The Start of CAGD/line-touches-left-and-top.png"></img>
5. Up to now, we've been using a PerspectiveCamera, but for most of our examples, we'll be working in 2D, so let's replace our PerspectiveCamera with an Orthographic Camera. In 2D, perspective is kind of irrelevant.  An Orthographic Camera is essentially a camera WITHOUT perspective.
```javascript
   const camera = new THREE.OrthographicCamera( -10, 10, 10, -10, 1, 1000 );
```
5. This will establish an origin in the center of your browser. The x and y scales go from -10 to 10 so the line you drew before will touch the left and top of the screen:
<img src=".md/ 5 Control Points The Start of CAGD/line-touches-left-and-top.png"></img>
6. If you've begun to notice that the line is a big jaggy and awfully thin, try not to freak.  We'll get to that.
6. Adjust the position of the end-points of the line to make it take the position approximately like that shown in the image at the top of page.
<img src=".md/ 5 Control Points The Start of CAGD/top-line.png"></img>
8. Can you figure out how to draw the remaining lines?  Don't worry about the little circles yet. Hint: Lines are drawn from vertex to vertex, and the order of the vertices matters.
   <img src=".md/ 5 Control Points The Start of CAGD/all-the-lines.png"></img>
9. Now you might be tempted to surf the three.js documentation, find and use the CircleBufferGeometry class to create a circle and add it to the scene, but this won't be very satisfying, because the CircleBufferGeometry displays a filled circle rather than a line circle. THREE.CircleBufferGeometry should probably be named THREE.DiscBufferGeometry. Sadly, no appropriate CircleBufferGeometry exists, so we'll have to make our own.
9. To create our own CircleBufferGeometry, we can define our own class extending BufferGeometry.  The syntax for javascript classes may be found in the Mozilla Development Network (MDN) site [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).
10. Here's some code to use to get started with our own CircleBufferGeometry:
```javascript
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
```
12. As a last finishing touch (assuming you have the three lines and four little circles), can you draw a rectangle around the whole thing?
10. For extra karma, can you adapt the circle class to make a rectangle class?
![img_2.png](.md/ 5 Control Points The Start of CAGD/img_2.png)

11. For extra extra karma, can you make your original 3-line-segments into a class?
