### Control Points: The Start of CAGD

![1623196134559](.md/5/1623196134559.png)

Take four points in a plane and connect them to form a polygon.  The four points may be called *control points*, in that they *are points in two or more dimensions that define the behavior of the resulting curve*.  The polygon formed by connecting the control points in the "correct" order are called the *control polygon*.  The control polygon provides a crude analogy of the refined curve.  Note that the control polygon is typically open (the ends are not coincident), and it may self-intersect.  The control points and the control polygon determine the approximate shape of the curve to be formed.





#### Exercise 1.5.1

In this exercise, you'll create an application  in threejs using `template/` as a starting point.

1. Follow the detailed instructions in `template/README.md` describing how to create a new application using `template/` as a starting point.
2. Make sure to read the code.  You'll want to keep the threejs documentation for r124 handy.  Look up the classes and methods as you read.  There's no faster way to learn threejs.
3. After completing the instructions you should see a black screen with a sort of rotating cube that looks like this:

<img src=".md/ 5 Control Points The Start of CAGD/1629779170492.png" alt=""></img>

4. Now turn off the animation.
5. Show the result to your tutor.


<br>
<br>

#### Exercise 1.5.2

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

2. Create a new project from `template`, and use this code to render a starscape.

2. You should see something like this when you're done:

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
camera.position.z = 15;

const material = new THREE.LineBasicMaterial({color: 0x0000ff});

const points = [];
points.push( new THREE.Vector3( -10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( geometry, material );
scene.add( line );
```
3. You should now see something like this
<img style="padding-top: 1vmax;" src=".md/ 5 Control Points The Start of CAGD/line.png" alt=""></img>
4. Now draw two more lines so that you see something like this:
5. asdf
6. Now draw a circle of radius 1 something like this:
7. asdf
8. Now change its radius so it is the size of the circles on the little four-control-point image at the top of this page.
9. asdf
10. Now position its center so that it looks like this:
11. asdf
12. Now add a second circle like this:
13. asdf
14. And finally draw a rectangle around it all like this:
15. asdf
16. Show your tutor



#### Exercise 1.5.3

In this section you're going to make your drawing object-oriented (if you haven't already).  You should have a class for a Line, a Circle and a Rectangle.  These should not conflict with anything of the same name in three.js

1. Create a Line class
2. Create three instances of the class, one for each of the three lines from 1.5.2
3. Create a Circle class
4. Create two instances of the class, one for each of the circles from 1.5.2
5. Create a Rectangle class
6. Create one instance of the class for the rectangle from 1.5.2
7. Your result should look the same as that of 1.5.2
8. asdf
9. Show your tutor your code and your drawing.