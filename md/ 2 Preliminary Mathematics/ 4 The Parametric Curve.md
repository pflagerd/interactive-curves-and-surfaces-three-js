# The Parametric Curve

Typically, when a student takes mathematics, a curve is presented as a graph of a function $f(x)$.



As $x$ is varied, $y = f(x)$ is computed by the function $f$, and the pair of coordinates $(x, y)$ sweeps out the curve. This is called the *explicit* form of the curve.

From a design standpoint the explicit form is deficient in several ways:

* Single-Valued
  The curve is single-valued along any line parallel to the y axis. For example, only parts of the circle may be defined explicitly.

  ![1623258117854](.md/ 4 The Parametric Curve/1623258117854.png)

* Infinite Slope

  ![1623258156537](.md/ 4 The Parametric Curve/1623258156537.png)

  An explicit curve cannot have infinite slope; the derivative f' (x) is not defined parallel to the y axis. Hence there are two points on the circle that cannot be defined.

* Transformation Problems
  Any transformation, such as rotation or shear, may cause an explicit curve to violate the two points above.

The parametric form of a curve is not subject to these limitations. Moreover, it provides a method, known as *parameterization*, that defines motion on the curve. Motion on the curve refers to the way that the point $(x, y)$ traces out the curve .

Parametrization uses an independent parameter (aka variable) to compute points on the curve.  It gives the "motion" of a point on the curve.



#### Exercise 2.4.1

1. Copy the template/twod project. Run it.
2. Observe that there is a coordinate system centered at the origin.
3. Observe that there is a label for the x axis and for the y axis, and both are defined in the coordinate system class.
4. Using only the fact that a circle is defined thus $x^2 + y^2 = r^2$, draw a circle like the one in the diagrams above by designing a circle class.  Make the circle class extend `THREE.LineLoop` so that instances of it may be added directly to the scene (similar to the coordinate system)
5. Create a single instance and add it to the scene.
6. Add a vertical line with two small circles as shown in the top diagram above.
7. Don't forget the text "The circle has two values along this line".  You can use the labels defined in the coordinate system class as an example.

