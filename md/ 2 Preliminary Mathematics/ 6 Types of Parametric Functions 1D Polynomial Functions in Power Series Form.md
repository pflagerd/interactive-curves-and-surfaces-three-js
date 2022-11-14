 ### Types of Parametric Functions: 1D Polynomial Functions in Power Series Form

CAGD deals primarily with *polynomial* or *rational* functions, not trigonometric functions like $sin()$ and $cos()$ as were used in Exercise 2.5. 

One way to represent a polynomial function is using a *power series*, thus:

​	$$P_n(t)=a_0+a_1t+a_2t^2+a_3t^3+...+a_nt^n\tag{2.6a}$$

In this case, $\{a_0, a_1, a_2, a_3, ..., a_n\}$ are scalar real number constants, $t$ is a scalar real number variable, and $P_n(t)$ is a scalar real number function. In mathematical notation:

​	$$a_n, t, P_n(t) \in \mathbb{R}\tag{2.6b}$$

In other words, each scalar real number value of $t$ results in a scalar real number value of $P_n(t)$.  One value in, one value out; A 1D (1 Dimensional) polynomial function.

$\text{2.6a}$ is called a *power* series because it is a series of terms each of which contains a unique *power* of $t$.  For example, in the term $a_0$, the power of $t$ is $t^0=1$. That's why there's no visible $t$ in that term; we write $a_0$ as a short-hand for $a_0t^0$.  In the term $a_1t$, the power of t is $t^1=t$. We don't bother to write $t^1$, because $t$ by itself is sufficient; we write $a_1t$ as a short-hand for $a_1t^1$.  In the term $a_2t^2$, the power of $t$ is $t^2$, for which there is no shorthand, so we write $a_2t^2$.  Similarly, all subsequent terms are written out in full: $a_nt^n$.

In $\Sigma$ notation, $P_n(t)$ may be written thus:

$$P_n(t)=\sum\limits_{\nu=0}^na_{\nu}t^{\nu} {\tag{2.7d}}$$

As well as calling it a *power series*, we say that equation 2.6a is a polynomial written in *Power Series Form*.  As we will see, *Power Series Form* is not the only way to write a polynomial.