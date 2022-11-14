 ### Types of Parametric Functions: 1D Polynomial Functions in Bernstein Form

There are other ways to express polynomials besides Power Series Form.  Another of these forms, the *Bernstein Form*, is used often in numerical analysis and Computer Aided Geometric Design, because the form has properties that make it better than the Power Series Form for numerical analysis and CAGD applications.

In future chapters we will discover how these properties make the Bernstein Form better than the Power Series form for CAGD, but for now suffice it to say that polynomials expressed in Bernstein Form may be algebraically converted to and from polynomials in Power Series Form; the two forms are equivalent.

This may be a little hard to believe when you see the equation for a single term of the Bernstein polynomial:

$$b_{\nu,n}(t)={n \choose \nu}t^{\nu}(1 - t)^{n - \nu}		{\tag{2.7a}}$$

2.7a is clearly quite different from a single term of the Power Series polynomial:

​		$$p_{\nu}(t)=t^{\nu}	{\tag{2.7b}}$$

But, believe it or not, both forms are *basis polynomials* for the *vector space* ${\Pi}_n$.  That means that they can both represent any polynomial function.  We're not going to prove this fact here, nor do we expect this fact to mean much to you right now, but it is an important fact all the same.

In $\Sigma​$ notation the Bernstein polynomial form is written thus:

$$B_n(t)=\sum\limits_{\nu=0}^{n}\beta_{\nu}b_{\nu,n}(t) \tag{2.7c}$$

For comparison, in $\Sigma$ notation the Power Series polynomial form is written thus:

$$P_n(t)=\sum\limits_{\nu=0}^na_{\nu}t^{\nu} {\tag{2.7d}}$$

A polynomial in Bernstein Form may be referred to as a "Bernstein polynomial".



