# Theano
* Python library for mathematical expressions.

## Installation
```
pip install Theano
```

## Prerequisite
* numpy
* Adding two Scalars

```
import numpy
import theano.tensor as T
from theano import function
x = T.dscalar('x')
y = T.dscalar('y')
z = x + y
f = function([x, y], z)

f(2, 3)
array(5.0)

numpy.allclose(f(16.3, 12.1), 28.4)
True
numpy.allclose(f(16.3, 12.1), 28.3)
False

type(x)
<class 'theano.tensor.var.TensorVariable'>

x.type
TensorType(float64, scalar)

T.dscalar
TensorType(float64, scalar)

x.type is T.dscalar
True

```

```
from theano import pp
print(pp(z))
(x + y)
```

```
numpy.allclose(z.eval({x : 16.3, y : 12.1}), 28.4)
True
```

* Adding two Matrices

```
x = T.dmatrix('x')
y = T.dmatrix('y')
z = x + y
f = function([x, y], z)
f([[1, 2], [3, 4]], [[10, 20], [30, 40]])
array([[ 11.,  22.],
       [ 33.,  44.]])
```
* more
  * http://deeplearning.net/software/theano/tutorial/examples.html


## Tutorial
```
from theano import *
import theano.tensor as T
```

## 참고
* Theano basic tutorial
  * http://deeplearning.net/software/theano/tutorial/
* http://deeplearning.net/tutorial/